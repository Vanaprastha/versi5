import InsightsLLM from "@/components/InsightsLLM";


export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Peta SDGs 1 dengan Cluster</h1>
      <section className="mt-8">
    <h2 className="text-lg font-bold mb-2">Insight Otomatis (LLM)</h2>
    <InsightsLLM />
  </section>
</main>
  );
}