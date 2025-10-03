// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend, LabelList } from "recharts";

export default function SDG3Page() {{
  const [dataSDG3, setDataSDG3] = useState<any[]>([]);
  const [insight, setInsight] = useState<string>("");

  useEffect(() => {{
    fetch("/api/sdgs3")
      .then(res => res.json())
      .then(d => setDataSDG3(d))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {{
    fetch("/api/insight?sdg=3")
      .then(res => res.json())
      .then(d => setInsight(d.insight || "sedang memberikan insight berdasarkan data...."))
      .catch(err => setInsight("sedang memberikan insight berdasarkan data...."));
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="glass-4 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold drop-shadow text-blue-400">
          SDG 3
        </h2>
      </div>

      <div className="glass-4 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Visualisasi Data SDG 3</h3>
        <div className="w-full h-96">
          <ResponsiveContainer>
            <BarChart data={{dataSDG3}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
              <XAxis dataKey="nama_desa" stroke="#fff" tick={{{{ fill: "#fff" }}}} />
              <YAxis stroke="#fff" tick={{{{ fill: "#fff" }}}} />
              <Tooltip />
              <Legend />
              <Bar dataKey={{Object.keys(dataSDG3[0] || {{}})[1]}} fill="#22c55e" radius={[6, 6, 0, 0]}>
                <LabelList dataKey={{Object.keys(dataSDG3[0] || {{}})[1]}} position="top" fill="#fff" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-4 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-2 text-blue-400">Insight Otomatis</h3>
        <p className="text-sm text-gray-100 whitespace-pre-line">
          {{insight || "sedang memberikan insight berdasarkan data...."}}
        </p>
      </div>
    </div>
  );
}}
