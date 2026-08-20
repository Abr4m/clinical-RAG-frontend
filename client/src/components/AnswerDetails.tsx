// Clinical Evidence Observatory: everything that is NOT the short recommendation lives here —
// supporting evidence text, citation list, and validation/quality signals. Rendered inside a
// collapsible "sources & details" panel so the chat bubble (AnswerSurface) can stay short.
import { CheckCircle2, FileText, Hash, MapPin } from "lucide-react";
import type { QueryResponse } from "@/types/clinical";

interface AnswerDetailsProps {
  result: QueryResponse;
}

export function AnswerDetails({ result }: AnswerDetailsProps) {
  return (
    <div className="space-y-5">
      {result.generated_answer.supporting_evidence && (
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Supporting evidence</p>
          <p className="mt-2 text-sm leading-7 text-slate-600">{result.generated_answer.supporting_evidence}</p>
        </div>
      )}

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#13213a]">
          <CheckCircle2 className="size-4 text-[#0B9D95]" /> Citation validation: {result.citation_validation.valid ? "passed" : "needs review"}
        </div>
        <p className="mt-1 text-xs text-slate-500">{result.citations.length} citations · Unsupported claim rate {result.unsupported_claim_rate.toFixed(2)}</p>
      </div>

      {result.citations.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Citations</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {result.citations.map((c) => (
              <span key={c.chunk_id} className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 font-mono text-[10px] font-semibold text-slate-500">
                <FileText className="size-3" />
                {c.guideline_id}
                <MapPin className="ml-1 size-3" />
                pp. {c.page_start}–{c.page_end}
                <Hash className="ml-1 size-3" />
                {c.chunk_id}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
