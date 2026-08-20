import { Check, Circle, LoaderCircle } from "lucide-react";

const steps = ["Understanding your question", "Identifying medical topic", "Searching knowledge base", "Reranking evidence", "Preparing grounded answer"];

export function ProcessingSteps({ active }: { active: boolean }) {
  return (
    <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-4 shadow-sm" aria-live="polite">
      <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700">AI processing</p><p className="mt-1 text-sm font-semibold text-[#13213a]">Evidence pipeline in progress</p></div>{active ? <LoaderCircle className="size-5 animate-spin text-teal-600" /> : <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-slate-500">READY</span>}</div>
      <div className="mt-4 grid gap-2 sm:grid-cols-5">
        {steps.map((step, index) => <div key={step} className="flex items-center gap-2 text-xs text-slate-600 sm:block"><span className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full ${active && index === 2 ? "bg-teal-600 text-white" : active && index < 2 ? "bg-emerald-100 text-emerald-700" : "bg-white text-slate-400 ring-1 ring-slate-200"}`}>{active && index < 2 ? <Check className="size-3.5" /> : active && index === 2 ? <LoaderCircle className="size-3.5 animate-spin" /> : <Circle className="size-2.5" />}</span><span className="sm:mt-2 sm:block sm:leading-4">{step}</span></div>)}
      </div>
    </div>
  );
}
