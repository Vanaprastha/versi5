"use client";
import React from "react";
import useSWR from "swr";
import InsightCard from "./InsightCard";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function InsightsLLM({ goals = Array.from({length:17},(_,i)=>i+1) }: { goals?: number[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {goals.map(g => <InsightPerGoal key={g} goal={g} />)}
    </div>
  );
}

function InsightPerGoal({ goal }: { goal: number }) {
  const { data, error, isLoading } = useSWR(`/api/insight/${goal}`, fetcher);
  const txt = error ? `Gagal memuat insight: ${error?.message || ""}` : (data?.llm || "");
  return <InsightCard goal={goal} text={txt} loading={isLoading} />;
}
