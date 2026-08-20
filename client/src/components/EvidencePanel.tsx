// Clinical Evidence Observatory: source evidence is visually primary and always rendered before the answer surface.
import { useState } from "react";
import { BookOpenText, ChevronDown, FileText, Hash, MapPin, ScanSearch } from "lucide-react";
import type { RetrievedChunk } from "@/types/clinical";

interface EvidencePanelProps {
  chunks: RetrievedChunk[];
  isLoading: boolean;
}

function MetaStamp({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 font-mono text-[10px] font-semibold tracking-wide text-slate-500">{children}</span>;
}

export function EvidencePanel({ chunks, isLoading }: EvidencePanelProps) {
  const [openChunk, setOpenChunk] = useState<number | null>(chunks[0]?.rank ?? null);

  if (isLoading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6"><div className="h-5 w-40 animate-pulse rounded bg-slate-100" /><div className="mt-5 h-28 animate-pulse rounded-xl bg-slate-50" /><div className="mt-3 h-28 animate-pulse rounded-xl bg-slate-50" /></div>;
  }

  if (!chunks.length) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,32,58,0.06)]">
        <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-[#0B9D95]" />
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 pl-3">
          <div><div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B9D95]"><ScanSearch className="size-3.5" /> Evidence review queue</div><h3 className="mt-1 font-display text-lg font-semibold text-[#13213a]">Awaiting a traceable retrieval.</h3></div>
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[10px] font-bold text-slate-500">SOURCE QUEUE / 00</span>
        </div>
        <div className="mt-4 space-y-3 pl-3">
          {["Guideline · section · subsection", "Recommendation · page range · chunk ID", "Retrieved clinical source text"].map((label, index) => <div key={label} className="flex items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-3 py-3"><span className="flex size-6 items-center justify-center rounded-full border border-teal-200 bg-white font-mono text-[10px] font-bold text-[#0B9D95]">0{index + 1}</span><div className="flex-1"><div className="h-2 w-28 rounded bg-slate-200" /><p className="mt-2 text-xs text-slate-400">{label}</p></div><span className="rounded border border-slate-200 bg-white px-2 py-1 font-mono text-[9px] text-slate-400">TRACEABLE</span></div>)}
        </div>
        <p className="mt-5 pl-3 text-sm leading-6 text-slate-500">Submit a clinical question to populate this review queue with the exact NICE chunks that will support any later answer.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,32,58,0.06)]">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B9D95]"><BookOpenText className="size-3.5" /> Retrieved source evidence</div>
          <p className="mt-1 text-sm text-slate-500">Every row below is an actual retrieved chunk from the active FastAPI response.</p>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-[#087d76]">{chunks.length} verified chunks</span>
      </div>
      <div className="divide-y divide-slate-100">
        {chunks.map((item) => {
          const { chunk } = item;
          const open = openChunk === item.rank;
          return (
            <article key={chunk.chunk_id} className="group relative pl-5">
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#0B9D95] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <button type="button" onClick={() => setOpenChunk(open ? null : item.rank)} className="flex w-full items-start gap-4 px-5 py-4 text-left">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#13213a] font-mono text-xs font-bold text-white">{item.rank}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-display text-sm font-semibold text-[#13213a]">{chunk.guideline_id}</span>
                    <span className="text-xs text-slate-500">{chunk.disease}</span>
                    <span className="ml-auto font-mono text-xs font-semibold text-[#0B9D95]">score {item.score.toFixed(4)}</span>
                  </span>
                  <span className="mt-1 block truncate text-sm text-slate-600">{chunk.section}{chunk.subsection ? ` / ${chunk.subsection}` : ""}</span>
                </span>
                <ChevronDown className={`mt-1 size-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && (
                <div className="px-5 pb-5 pl-16">
                  <div className="flex flex-wrap gap-1.5">
                    <MetaStamp><FileText className="mr-1 size-3" />{chunk.guideline_id}</MetaStamp>
                    <MetaStamp><MapPin className="mr-1 size-3" />pp. {chunk.page_start}–{chunk.page_end}</MetaStamp>
                    {chunk.recommendation_id && <MetaStamp>Rec. {chunk.recommendation_id}</MetaStamp>}
                    <MetaStamp><Hash className="mr-1 size-3" />{chunk.chunk_id}</MetaStamp>
                  </div>
                  <p className="mt-4 border-l-2 border-[#0B9D95] pl-4 font-serif text-[15px] leading-7 text-slate-700">{chunk.content}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
