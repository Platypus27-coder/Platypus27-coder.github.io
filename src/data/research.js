// Định hướng nghiên cứu & kỹ thuật chuyên sâu của Ngô Gia Huy
export const researchData = {
  primaryTopic: 'Intelligent LLM, RAG & Neurosymbolic Agentic Systems',
  summary:
    'Nghiên cứu và phát triển các hệ thống mô hình ngôn ngữ lớn (LLM), kỹ thuật truy xuất tăng cường sinh (RAG đa ngôn ngữ & bảo mật) và kiến trúc Agent tự hành (AI Agents, Neurosymbolic Reasoning), giải quyết bài toán thực tế với độ chính xác và độ tin cậy cao.',
  keywords: [
    'Large Language Models (LLM)',
    'RAG Systems',
    'AI Agents',
    'LangGraph',
    'Neurosymbolic AI',
    'Speech AI',
    'Vector DB & Retrieval',
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
      title: 'LLM Acceleration & Inference',
      description:
        'Tối ưu hóa hiệu năng suy luận và nén mô hình trên GPU phân vùng NVIDIA H200 MiG, quản trị bộ đệm KV-cache và kỹ thuật quantization tiên tiến.',
    },
    {
      title: 'Multi-Agent 3D Simulation & Control',
      description:
        'Trọng tâm hiện tại — điều phối đa tác nhân tự hành (multi-agent orchestration) kết hợp trực quan hóa không gian làm việc số 3D.',
      current: true,
    },
  ],
}
