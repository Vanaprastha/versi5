
// @ts-nocheck
"use client";

import { useState, useEffect } from "react";

type Props = {
  goal: number; // SDG ke berapa (1-17)
};

export default function InsightCard({ goal }: Props) {
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: `Berikan insight singkat dari data SDG ${goal}.`
      }),
    })
      .then(res => res.json())
      .then(d => {
        setInsight(d.answer || "Tidak ada insight.");
      })
      .catch(() => {
        setInsight("Gagal memuat insight.");
      })
      .finally(() => setLoading(false));
  }, [goal]);

  return (
    <div className="glass-2 p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-3">
        Insight Otomatis SDG {goal}
      </h3>
      {loading ? (
        <p className="italic text-gray-400">Sedang menganalisis dengan Gemini...</p>
      ) : (
        <p className="text-sm text-gray-100 whitespace-pre-line">{insight}</p>
      )}
    </div>
  );
}
