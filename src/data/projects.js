import { site } from './site'

// Danh sách các dự án thực tế nổi bật từ CV và GitHub @Platypus27-coder
export const projects = [
  {
    id: 1,
    title: 'OneVoice',
    subtitle: 'Hệ thống dịch tiếng nói song ngữ Anh - Việt hai chiều offline',
    description:
      'Hệ thống Speech-to-Speech translator ngoại tuyến trên Windows PC xử lý song song ASR, translation và TTS không phụ thuộc cloud. Fine-tune SenseVoice và EnViT5 với ONNX export; đạt 98.28% functional pass rate trên 4,756 lượt hội thoại, ASR WER đạt 0.55% (EN) và 11.32% (VI).',
    image: null,
    tags: ['Python', 'SenseVoice', 'EnViT5', 'ONNX', 'Speech Processing', 'ASR/TTS'],
    github: 'https://github.com/Platypus27-coder/OneVoice',
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: 'Neurosymbolic STEM Agent',
    subtitle: 'Agent AI lai suy luận logic hình thức & vật lý đại học (EXACT 2026)',
    description:
      'Hệ thống AI Agent lai (Neurosymbolic) sử dụng LangGraph định tuyến câu hỏi: giải logic qua Z3 Theorem Prover, giải vật lý qua SymPy, kết hợp LLM fallback. Tích hợp pipeline tự động phát hiện runtime exceptions và tự sửa lỗi mã nguồn (code-repair), triển khai FastAPI với Qwen-7B 4-bit và RAG Qdrant + bge-reranker.',
    image: null,
    tags: ['LangGraph', 'Z3 Theorem Prover', 'SymPy', 'Qdrant', 'FastAPI', 'Qwen-7B'],
    github: 'https://github.com/Platypus27-coder/EXACT_2026',
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Viettel AI Race: LLM Optimization',
    subtitle: 'Tối ưu hóa suy luận mô hình LiquidAI trên GPU NVIDIA H200',
    description:
      'Nghiên cứu tối ưu hóa suy luận và hiệu năng cho mô hình LiquidAI/LFM2.5-1.2B-Instruct trên phân vùng NVIDIA H200 MiG instance; tập trung giảm thiểu TTFT, TPOT, quản trị bộ đệm KV-cache, continuous batching và quantization cho giải đấu Viettel AI Race 2026.',
    image: null,
    tags: ['vLLM', 'NVIDIA H200', 'KV-Cache', 'Quantization', 'Inference Optimization'],
    github: 'https://github.com/Platypus27-coder/viettel-ai-race-llm-serving',
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: 'Perfect Blue Orchestrator',
    subtitle: 'Trung tâm điều phối đa Agent thời gian thực & mô phỏng văn phòng 3D',
    description:
      'Bespoke multi-agent orchestrator điều phối lên đến 8 agents với dashboard số liệu thời gian thực và không gian mô phỏng văn phòng ảo 3D tương tác sống động được xây dựng bằng React, Vite và Three.js.',
    image: null,
    tags: ['Three.js', 'React', 'Multi-Agent', 'Orchestrator', 'TypeScript', 'WebGL'],
    github: 'https://github.com/Platypus27-coder/perfect-blue-orchestrator',
    demo: null,
    featured: true,
  },
  {
    id: 5,
    title: 'VietMedBridge',
    subtitle: 'Truy xuất thông tin y sinh học đa ngôn ngữ cho truy vấn tiếng Việt',
    description:
      'Hệ thống truy xuất ngữ nghĩa tài liệu y sinh học hỗ trợ xử lý truy vấn lâm sàng tiếng Việt trên các nguồn dữ liệu chuyên ngành tiếng Việt, tiếng Anh và tiếng Trung kết hợp dense-sparse retrieval.',
    image: null,
    tags: ['Biomedical IR', 'Cross-Lingual', 'Dense-Sparse Retrieval', 'Python'],
    github: 'https://github.com/Platypus27-coder/VietMedBridge',
    demo: null,
    featured: false,
  },
  {
    id: 6,
    title: 'Local RAG Chatbot',
    subtitle: 'Chatbot hỏi đáp tài liệu cục bộ bảo mật cao với LangChain & Chainlit',
    description:
      'Chatbot Q&A tài liệu cục bộ bảo đảm quyền riêng tư trên tệp PDF/TXT. Pipeline RAG sử dụng ChromaDB, HuggingFaceEmbeddings trên CPU, kết hợp Qwen2.5-1.5B-Instruct lượng tử hóa 4-bit với ConversationalRetrievalChain và MMR search.',
    image: null,
    tags: ['LangChain', 'ChromaDB', 'Chainlit', 'Qwen2.5', 'RAG', 'Quantization'],
    github: 'https://github.com/Platypus27-coder/RAG_With_ChatUI',
    demo: null,
    featured: false,
  },
]
