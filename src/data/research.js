// Định hướng nghiên cứu & kỹ thuật chuyên sâu của Ngô Gia Huy
export const researchData = {
  primaryTopic: 'High-Performance Inference & Neurosymbolic Agentic Systems',
  summary:
    'Nghiên cứu kết hợp suy luận mô hình ngôn ngữ lớn tốc độ cao (High-Performance LLM Serving & Quantization) với kiến trúc Agent lai biểu tượng (Neurosymbolic Reasoning - Z3 Prover, SymPy), giúp nâng cao độ chính xác bài toán STEM và tối ưu hóa hạ tầng tính toán cục bộ.',
  keywords: [
    'LLM Serving',
    'Neurosymbolic AI',
    'vLLM',
    'LangGraph',
    'Model Quantization',
    'Speech Processing',
    'Z3 Prover',
  ],
  milestones: [
    {
      title: 'Offline Speech & Audio AI',
      description:
        'Nghiên cứu và tối ưu hóa pipeline dịch thuật giọng nói song ngữ ngoại tuyến với ONNX runtime, SenseVoice và EnViT5.',
    },
    {
      title: 'Privacy-Preserving RAG',
      description:
        'Thiết kế pipeline truy xuất tăng cường RAG cục bộ tiết kiệm tài nguyên phần cứng với ChromaDB, CPU embeddings và MMR reranking.',
    },
    {
      title: 'Neurosymbolic Reasoning',
      description:
        'Định tuyến bài toán logic qua Z3 Theorem Prover và bài toán vật lý qua SymPy, kết hợp cơ chế fallback LLM linh hoạt.',
    },
    {
      title: 'Autonomous Code-Repair Loops',
      description:
        'Cơ chế phản hồi tự động phát hiện runtime exceptions và tái sinh mã solver hoàn chỉnh trên nền tảng LangGraph.',
    },
    {
      title: 'High-Throughput LLM Serving',
      description:
        'Tối ưu hóa throughput và TTFT/TPOT trên GPU NVIDIA H200 MiG với vLLM, quản trị bộ đệm KV-cache và quantization tiên tiến.',
    },
    {
      title: 'Multi-Agent 3D Simulation & Control',
      description:
        'Trọng tâm hiện tại — điều phối đa tác nhân tự hành (multi-agent orchestration) kết hợp trực quan hóa không gian làm việc số 3D.',
      current: true,
    },
  ],
}
