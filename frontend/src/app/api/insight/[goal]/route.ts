import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-pro";

// Map SDG -> table + columns (fallback minimal; adjust to your schema if needed)
const TABLE_BY_GOAL: Record<number, { table: string; valueCols: string[] }> = {
  1: { table: "sdgs_1", valueCols: ["r710","r1502_7","r1502_8","r1502_4","r1502_9"] },
  2: { table: "sdgs_2", valueCols: [] },
  3: { table: "sdgs_3", valueCols: [] },
  4: { table: "sdgs_4", valueCols: [] },
  5: { table: "sdgs_5", valueCols: [] },
  6: { table: "sdgs_6", valueCols: [] },
  7: { table: "sdgs_7", valueCols: [] },
  8: { table: "sdgs_8", valueCols: [] },
  9: { table: "sdgs_9", valueCols: [] },
  10: { table: "sdgs_10", valueCols: [] },
  11: { table: "sdgs_11", valueCols: [] },
  12: { table: "sdgs_12", valueCols: [] },
  13: { table: "sdgs_13", valueCols: [] },
  14: { table: "sdgs_14", valueCols: [] },
  15: { table: "sdgs_15", valueCols: [] },
  16: { table: "sdgs_16", valueCols: [] },
  17: { table: "sdgs_17", valueCols: [] },
};

export async function GET(_req: Request, { params }: { params: { goal: string } }) {
  try {
    const goal = parseInt(params.goal, 10);
    if (!goal || !TABLE_BY_GOAL[goal]) {
      return NextResponse.json({ error: "Invalid goal" }, { status: 400 });
    }

    const { table, valueCols } = TABLE_BY_GOAL[goal];
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // Fetch data: nama_desa, cluster, arti_cluster, and numeric columns
    const { data, error } = await supabase
      .from(table)
      .select("*");
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Compute light stats
    type Row = Record<string, any>;
    const rows = (data as Row[]) || [];
    const villages = rows.map(r => r.nama_desa);
    const clusters = rows.map(r => r.cluster);
    const artiClusters = rows.map(r => r.arti_cluster);
    const summaryCols = valueCols.length ? valueCols : Object.keys(rows[0] || {}).filter(k => k not in ["nama_desa","cluster","arti_cluster"]);

    const colStats: Record<string, { avg: number, max: { desa: string, val: number }, min: { desa: string, val: number } }> = {};
    for (const c of summaryCols) {
      const vals = rows.map(r => Number(r[c])).filter(v => Number.isFinite(v));
      if (!vals.length) continue;
      const avg = vals.reduce((a,b)=>a+b,0) / vals.length;
      let maxIdx = 0, minIdx = 0;
      vals.forEach((v,i)=>{
        if (v > vals[maxIdx]) maxIdx = i;
        if (v < vals[minIdx]) minIdx = i;
      });
      colStats[c] = {
        avg,
        max: { desa: rows[maxIdx]?.nama_desa || "-", val: vals[maxIdx] },
        min: { desa: rows[minIdx]?.nama_desa || "-", val: vals[minIdx] },
      };
    }

    // Prepare prompt
    const prompt = [
      `Anda adalah analis data SDGs yang ringkas dan to-the-point.`,
      `Tugas: buat insight singkat berbentuk poin untuk SDGs ${goal}.`,
      `Data ringkas:`,
      `- Jumlah desa: ${villages.length}`,
      `- Cluster unik: ${Array.from(new Set(clusters)).filter(Boolean).join(", ") || "-"}`,
      `- Arti cluster (contoh): ${Array.from(new Set(artiClusters)).filter(Boolean).slice(0,2).join(" | ") || "-"}`,
      `- Statistik indikator (rata-rata, desa tertinggi & terendah):`,
      ...Object.entries(colStats).map(([k, v]) => `  • ${k}: avg=${v.avg.toFixed(2)}, max=${v.max.desa} (${v.max.val}), min=${v.min.desa} (${v.min.val})`),
      ``,
      `Format keluaran:`,
      `- 3–6 poin insight (singkat, actionable, bahasa Indonesia)`, 
      `- 1 kalimat rekomendasi singkat di akhir (diawali "Rekomendasi:")`
    ].join("\n");

    let llmText = "";
    if (GOOGLE_API_KEY) {
      const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
      const resp = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });
      llmText = resp?.response?.text?.() || "";
    }

    return NextResponse.json({
      goal,
      table,
      stats: colStats,
      llm: llmText,
    });
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || "Unexpected error" }, { status: 500 });
  }
}
