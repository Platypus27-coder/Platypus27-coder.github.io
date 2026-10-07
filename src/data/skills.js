// Danh mục kỹ năng kỹ thuật trích xuất trực tiếp từ CV & GitHub của Ngô Gia Huy
export const skillCategories = [
  {
    category: 'LLM & Agentic Systems',
    skills: [
      'LangGraph',
      'LangChain',
      'LlamaIndex',
      'Qwen',
      'RAG Architecture',
      'Prompt Engineering',
      'Quantization (GGUF, NF4)',
      'LoRA / QLoRA',
      'Unsloth',
    ],
  },
  {
    category: 'Deep Learning & AI Core',
    skills: [
      'PyTorch',
      'Transformers',
      'Hugging Face',
      'Mamba',
      'CNN / ResNet / U-Net',
      'Scikit-learn',
      'Reinforcement Learning',
      'Speech (ASR, TTS)',
    ],
  },
  {
    category: 'Data Science & Vector DBs',
    skills: [
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'Qdrant',
      'ChromaDB',
      'BAAI/bge-reranker',
      'FAISS',
    ],
  },
  {
    category: 'Ngôn ngữ lập trình',
    skills: [
      'Python',
      'C / C++',
      'SQL (MySQL)',
      'R',
      'TypeScript',
      'JavaScript',
    ],
  },
  {
    category: 'MLOps, Deployment & Frontend',
    skills: [
      'vLLM',
      'FastAPI',
      'Docker',
      'Git / GitHub',
      'CI/CD Workflows',
      'Airflow & MLflow',
      'Three.js & WebGL',
      'React & Vite',
    ],
  },
]

export const allSkills = skillCategories.flatMap((g) => g.skills)
