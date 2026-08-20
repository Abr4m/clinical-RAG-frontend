import { ArrowRight, BrainCircuit, FileCheck2, LibraryBig, SearchCheck, ShieldCheck } from "lucide-react";

const steps = [
  { label: "Understand", caption: "Question intent", icon: BrainCircuit },
  { label: "Classify", caption: "Medical topic", icon: ShieldCheck },
  { label: "Retrieve", caption: "Disease-aware evidence", icon: SearchCheck },
  { label: "Rerank", caption: "Best supporting sources", icon: LibraryBig },
  { label: "Ground", caption: "Cited answer", icon: FileCheck2 },
];

export function PipelineSteps() {
  return (
    <div className="grid gap-2 sm:grid-cols-5">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div key={step.label} className="relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur-sm sm:block sm:min-h-[112px]">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-teal-300/15 text-teal-200"><Icon className="size-4" /></div>
            <div className="sm:mt-4"><p className="text-xs font-bold text-white">{step.label}</p><p className="mt-1 text-[11px] leading-4 text-slate-400">{step.caption}</p></div>
            {index < steps.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-4 -translate-y-1/2 text-teal-300/70 sm:block" />}
          </div>
        );
      })}
    </div>
  );
}
