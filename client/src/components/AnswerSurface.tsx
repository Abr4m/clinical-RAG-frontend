// Clinical Evidence Observatory: the recommendation is the "chat bubble" — shown alone, immediately, no gating.
import { ShieldAlert, Sparkles } from "lucide-react";
import type { QueryResponse } from "@/types/clinical";

interface AnswerSurfaceProps {
  result: QueryResponse;
}

export function AnswerSurface({ result }: AnswerSurfaceProps) {
  const isRefused = result.safety_status === "REFUSED";
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,32,58,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B9D95]">
          <Sparkles className="size-3.5" /> Answer
        </div>
        <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${isRefused ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}>{result.safety_status}</span>
      </div>

      <div className="mt-4">
        {isRefused ? (
          <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
            <div className="flex gap-2 text-rose-800">
              <ShieldAlert className="mt-0.5 size-4" />
              <p className="text-sm font-semibold">Safe refusal</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-rose-700">{result.refusal_reason || "The available evidence was insufficient for a safe answer."}</p>
          </div>
        ) : (
          <p className="font-serif text-[17px] leading-8 text-[#13213a]">{result.generated_answer.recommendation || "No recommendation was returned."}</p>
        )}
      </div>
    </section>
  );
}
