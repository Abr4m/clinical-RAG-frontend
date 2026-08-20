import { BrainCircuit, Database, FileStack, Layers3 } from "lucide-react";
import type { HealthResponse } from "@/types/clinical";

export function SystemStats({ health }: { health: HealthResponse | null }) {
  const stats = [
    { label: "Medical conditions", value: "2", note: "Focused scope", icon: BrainCircuit },
    { label: "Knowledge chunks", value: health ? `${health.indexed_chunks}` : "—", note: "Indexed evidence", icon: FileStack },
    { label: "Vector store", value: health?.vector_store || "—", note: "Active retrieval", icon: Database },
    { label: "AI retrieval", value: "Hybrid", note: "Dense + lexical", icon: Layers3 },
  ];
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{stats.map((stat) => { const Icon = stat.icon; return <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{stat.label}</p><Icon className="size-4 text-teal-600" /></div><p className="mt-3 font-display text-2xl font-semibold capitalize text-[#13213a]">{stat.value}</p><p className="mt-1 text-xs text-slate-500">{stat.note}</p></div>; })}</div>;
}
