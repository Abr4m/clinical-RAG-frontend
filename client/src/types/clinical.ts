// Clinical Evidence Observatory: strongly typed contracts mirror the FastAPI evidence-first API.
export type RetrievalMethod = "hybrid" | "semantic" | "bm25";

export interface Citation {
  guideline_id: string;
  page_start: number;
  page_end: number;
  chunk_id: string;
}

export interface RetrievedChunk {
  rank: number;
  score: number;
  method?: string;
  chunk: {
    chunk_id: string;
    guideline_id: string;
    disease: string;
    section: string;
    subsection?: string | null;
    recommendation_id?: string | null;
    page_start: number;
    page_end: number;
    content: string;
  };
}

export interface QueryResponse {
  query: string;
  detected_disease: string;
  classification_confidence: number;
  classification_method: string;
  risk_classification: string;
  retrieved_chunks: RetrievedChunk[];
  retrieval_method: string;
  selected_top_k: number;
  vector_store: string;
  llm_model: string;
  llm_available: boolean;
  confidence: string;
  generated_answer: {
    recommendation?: string;
    supporting_evidence?: string;
  };
  citations: Citation[];
  safety_status: string;
  refusal_reason?: string | null;
  citation_validation: { valid: boolean; errors: string[] };
  unsupported_claim_rate: number;
  unsupported_claims: string[];
  latency_ms?: number;
}

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  corpus: string;
  vector_store: string;
  embedding_model: string;
  llm_provider: string;
  llm_model: string;
  llm_available: boolean;
  indexed_chunks: number;
}

export interface DemoScenario {
  id: string;
  title: string;
  query: string;
  disease: string;
}

export interface MetricsResponse {
  retrieval: Record<string, unknown>;
  final: Record<string, unknown>;
  langchain?: Record<string, unknown> | null;
}
