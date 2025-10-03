"use client";
import React from "react";

export default function InsightCard({ goal, text, loading }: { goal: number; text: string; loading?: boolean; }) {
  return (
    <div className="p-4 rounded-2xl glass-2 shadow-md mt-3 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-white">Insight SDGs {goal}</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/80">LLM</span>
      </div>
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-3 w-3/4 bg-white/10 rounded" />
          <div className="h-3 w-2/3 bg-white/10 rounded" />
          <div className="h-3 w-1/2 bg-white/10 rounded" />
        </div>
      ) : (
        <div className="prose prose-invert max-w-none text-sm text-gray-200 whitespace-pre-line">
          {text || "Tidak ada insight tersedia."}
        </div>
      )}
    </div>
  );
}
