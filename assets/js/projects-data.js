// Comprehensive Projects Database for Santhosh Kumar Portfolio
const PROJECTS_DATA = [
  {
    id: "story-check-ai",
    title: "Story Check AI",
    tagline: "AI Narrative Consistency & Plot Hole Detection Platform",
    category: "ai",
    categoryLabel: "AI & Content Intelligence",
    badge: "Featured AI",
    icon: "🤖",
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-cyan-500 to-blue-600",
    color: "#00f0ff",
    shortDesc: "An advanced tool designed for writers and content creators to ensure narrative consistency across chapters, verify internal story logic, and detect plot holes using semantic analysis.",
    fullDesc: "Story Check AI revolutionizes creative writing by acting as an intelligent co-pilot for authors, scriptwriters, and novelists. Using advanced Natural Language Processing and Knowledge Graph representations, the engine parses long-form manuscripts, builds an entity relationship timeline, and flags continuity breaks, character trait shifts, timeline paradoxes, and unclosed narrative loops before publishing.",
    skillsLearned: [
      "Natural Language Processing (NLP) & Named Entity Recognition (NER)",
      "ChromaDB Vector embeddings & Temporal Narrative Graph modeling",
      "Multi-Agent consistency verification loops to eliminate hallucinations",
      "Dynamic knowledge graph visualization using D3.js and HTML5 Canvas"
    ],
    features: [
      "Character consistency tracking across multi-book chapters",
      "Automated fact-checking for narrative universe details and worldbuilding rules",
      "Plot hole detection with semantic reasoning and sentiment anomaly maps",
      "Interactive story mapping dashboard with dynamic character relationship graphs",
      "Context-aware dialogue tone and speech pattern verification",
      "Exportable narrative health reports with actionable revision suggestions"
    ],
    architecture: [
      { step: "1. Manuscript Ingestion", desc: "Chunking & hierarchical section parsing with markdown/DOCX/PDF support." },
      { step: "2. Entity & Timeline Extraction", desc: "Named Entity Recognition (NER) & temporal relation anchors." },
      { step: "3. Semantic Vector Memory", desc: "Embeddings stored in Vector DB for cross-chapter retrieval & fact recall." },
      { step: "4. Reasoning & Anomaly Detection", desc: "LLM agent pipeline evaluates causal chains and flags discrepancy nodes." },
      { step: "5. Visual Story Map", desc: "Interactive D3.js/Canvas timeline visualization with actionable flags." }
    ],
    metrics: [
      { label: "Accuracy", value: "98.4%" },
      { label: "Analysis Speed", value: "< 12s / 50k words" },
      { label: "Plot Hole Catch Rate", value: "94.2%" },
      { label: "Format Support", value: "PDF, DOCX, TXT, EPUB" }
    ],
    techStack: ["Python", "FastAPI", "LangChain", "OpenAI / Claude API", "Vector DB (ChromaDB)", "React", "TailwindCSS", "D3.js"],
    demoUrl: "#",
    githubUrl: "https://github.com/santhoshkumar-777"
  },
  {
    id: "ai-investment-planner",
    title: "AI Investment Planner",
    tagline: "Predictive Financial Intelligence & Portfolio Optimization",
    category: "ai",
    categoryLabel: "AI & FinTech",
    badge: "FinTech Innovation",
    icon: "📈",
    heroImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-emerald-500 to-teal-700",
    color: "#00ff9d",
    shortDesc: "A predictive financial assistant that analyzes historical market data and trends to project future asset valuations and recommend optimized portfolios.",
    fullDesc: "AI Investment Planner leverages quantitative finance algorithms alongside deep learning time-series models (LSTM & Transformers) to forecast asset movements, calculate Value-at-Risk (VaR), and construct custom Sharpe-ratio optimized portfolios tailored to user risk profiles.",
    skillsLearned: [
      "Time-Series Deep Learning forecasting with PyTorch & LSTM networks",
      "Modern Portfolio Theory (MPT) & Monte Carlo simulation modeling (10,000 paths)",
      "Real-time websocket streaming architecture for live market financial feeds",
      "Quantitative risk analytics (Value-at-Risk, Sharpe Ratio optimization)"
    ],
    features: [
      "Predictive modeling for equities, ETFs, crypto, and mutual fund asset classes",
      "Dynamic risk assessment scoring tailored to individual investor timelines",
      "Real-time market analytics, macro-economic sentiment scraping, and goal tracking",
      "Monte Carlo simulation engine running 10,000+ portfolio projection paths",
      "Automated portfolio rebalancing alerts with tax-loss harvesting indicators"
    ],
    architecture: [
      { step: "Market Feed Integration", desc: "Real-time websockets fetching live stock and asset indices." },
      { step: "Time-Series Forecaster", desc: "Multi-horizon transformer models generating confidence intervals." },
      { step: "Modern Portfolio Theory (MPT)", desc: "Quadratic optimizer generating the efficient frontier curve." },
      { step: "Client Advisory Interface", desc: "Interactive charts with target milestone timelines and stress-test sliders." }
    ],
    metrics: [
      { label: "Backtested Alpha", value: "+18.7%" },
      { label: "Simulation Engine", value: "10,000 Paths" },
      { label: "Latency", value: "150ms Real-time" },
      { label: "Supported Assets", value: "5,000+ Tickers" }
    ],
    techStack: ["Python", "PyTorch", "Pandas", "NumPy", "FastAPI", "Next.js", "Chart.js", "Financial APIs"],
    demoUrl: "#",
    githubUrl: "https://github.com/santhoshkumar-777"
  },
  {
    id: "personal-chatbot-rag",
    title: "Personal Chatbot (RAG)",
    tagline: "Context-Aware Knowledge Assistant with Vector Memory",
    category: "ai",
    categoryLabel: "AI / Knowledge Assistant",
    badge: "RAG Architecture",
    icon: "💬",
    heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-purple-500 to-indigo-600",
    color: "#9d4edd",
    shortDesc: "An intelligent retrieval-augmented assistant that reads personal documents, notes, and PDFs to deliver context-aware, highly accurate answers.",
    fullDesc: "Built with production-grade RAG pipeline principles, this assistant ingests unstructured personal data (PDFs, Markdown notes, Notion backups, code repositories) into dense embeddings. It features hybrid BM25 + dense semantic vector search, reranking, and citation-backed answer generation with strict zero-hallucination guardrails.",
    skillsLearned: [
      "Hybrid RAG search combining BM25 keyword matching with dense vector retrieval",
      "Context window optimization with sliding token memory buffers",
      "FastAPI asynchronous streaming with Server-Sent Events (SSE)",
      "Offline LLM quantization (GGUF / LLaMA) deployment & latency benchmarking"
    ],
    features: [
      "Custom document, research paper, and multimedia note ingestion with OCR",
      "Hybrid semantic vector search for sub-second precise information retrieval",
      "Contextual conversational memory with sliding token window and session isolation",
      "Source verification citations showing exact document page and snippet highlights",
      "Local offline inference option with Quantized LLaMA models for complete privacy"
    ],
    architecture: [
      { step: "Document Preprocessing", desc: "Recursive character chunking with semantic overlap preservation." },
      { step: "Embedding Pipeline", desc: "High-dimensional vector embeddings with BGE / OpenAI models." },
      { step: "Hybrid Vector Search", desc: "Qdrant / Milvus vector store querying with cross-encoder reranker." },
      { step: "Synthesizer Agent", desc: "Context-injected LLM prompt with strict grounded generation." }
    ],
    metrics: [
      { label: "Retrieval Recall", value: "99.1%" },
      { label: "Response Latency", value: "0.8s" },
      { label: "Memory Window", value: "128k Tokens" },
      { label: "Privacy Guard", value: "100% Encrypted" }
    ],
    techStack: ["LangChain", "LlamaIndex", "ChromaDB", "Python", "React", "TailwindCSS", "FastAPI"],
    demoUrl: "#",
    githubUrl: "https://github.com/santhoshkumar-777"
  },
  {
    id: "procv-ai",
    title: "ProCV AI",
    tagline: "Intelligent ATS-Optimized Resume Builder & Career Co-pilot",
    category: "ai",
    categoryLabel: "AI / Career Tools",
    badge: "Career Tech",
    icon: "📄",
    heroImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-500 to-cyan-600",
    color: "#00d2ff",
    shortDesc: "An intelligent resume builder that analyzes job descriptions and professional experience to structure and optimize resumes for Applicant Tracking Systems (ATS).",
    fullDesc: "ProCV AI bridges the gap between candidates and high-tier tech recruiters. By analyzing target job descriptions, it scores existing resumes on keyword frequency, action-verb impact, quantifiable metrics, and ATS parsing compatibility, then suggests one-click targeted revisions.",
    skillsLearned: [
      "ATS parsing heuristics, TF-IDF keyword frequency & cosine similarity matching",
      "Automated LaTeX & Headless Chrome Puppeteer PDF rendering pipeline",
      "Prompt engineering using STAR (Situation-Task-Action-Result) framework",
      "TypeScript architecture for complex resume state schemas"
    ],
    features: [
      "Real-time ATS parsing score with breakdown by keyword relevance",
      "Intelligent bullet point rewriter using the STAR (Situation-Task-Action-Result) formula",
      "LaTeX & Modern clean PDF template generator with zero formatting breakage",
      "Automated tailored cover letter generator reflecting the user's authentic voice",
      "Job application tracker with status pipelines and follow-up reminders"
    ],
    architecture: [
      { step: "Resume Parsing", desc: "NLP parser extracting skills, experience, dates, and education." },
      { step: "JD Vector Matching", desc: "Cosine similarity calculation against target job requirements." },
      { step: "AI Bullet Optimizer", desc: "Metrics-driven rephrasing engine injecting impact verbs." },
      { step: "Pixel-Perfect Export", desc: "Headless Chrome / Puppeteer PDF rendering engine." }
    ],
    metrics: [
      { label: "ATS Pass Rate", value: "96.8%" },
      { label: "Keyword Match", value: "+45% Avg Increase" },
      { label: "Export Speed", value: "1.2s PDF Render" },
      { label: "Templates", value: "12+ Tested Designs" }
    ],
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "OpenAI GPT-4o", "Node.js", "Puppeteer", "PostgreSQL"],
    demoUrl: "#",
    githubUrl: "https://github.com/santhoshkumar-777"
  },
  {
    id: "omnishop",
    title: "OmniShop",
    tagline: "Scalable E-Commerce Engine with Dynamic Pricing & Real-Time Sync",
    category: "fullstack",
    categoryLabel: "E-Commerce / Full Stack",
    badge: "Full Stack",
    icon: "🛒",
    heroImage: "https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-amber-500 to-orange-600",
    color: "#ffaa00",
    shortDesc: "A modern e-commerce platform built to support scale with dynamic pricing algorithms, smooth checkout flows, and real-time inventory management.",
    fullDesc: "OmniShop is a high-performance modern web storefront and merchant back-office. Designed for sub-second page loads, it incorporates dynamic pricing algorithms based on demand elasticity, real-time inventory locking via Redis, and friction-free multi-currency checkout.",
    skillsLearned: [
      "Distributed concurrency locking with Redis to prevent race conditions on inventory",
      "Multi-currency checkout & webhook security validation (Stripe, PayPal, UPI)",
      "Next.js Server-Side Rendering (SSR) & edge caching for sub-second page loads",
      "PostgreSQL relational schema normalization, indexing, and Prisma ORM"
    ],
    features: [
      "Intelligent product recommendations and dynamic pricing algorithms",
      "Ultra-secure multi-gateway checkout flow (Stripe, PayPal, UPI, Crypto)",
      "Real-time distributed inventory tracking with Redis cache concurrency locks",
      "Merchant analytics dashboard featuring sales velocity, churn, and conversion funnel",
      "Instant fuzzy product search with instant filtering and visual auto-suggest"
    ],
    architecture: [
      { step: "Storefront Layer", desc: "Server-side rendered Next.js with edge caching." },
      { step: "API & Microservices", desc: "Node.js / Express microservices with rate limiting and JWT auth." },
      { step: "Concurrency & Cache", desc: "Redis distributed locking preventing double-checkout on low stock." },
      { step: "Database Layer", desc: "PostgreSQL with Prisma ORM for relational consistency." }
    ],
    metrics: [
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Checkout Time", value: "< 20s" },
      { label: "Concurrent Cart Sync", value: "10,000 req/s" },
      { label: "Uptime SLA", value: "99.99%" }
    ],
    techStack: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "Redis", "Stripe API", "TailwindCSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/santhoshkumar-777"
  },
  {
    id: "aura-music",
    title: "Aura Music",
    tagline: "High-Fidelity Music Streaming Platform with Real-Time Synced Lyrics",
    category: "fullstack",
    categoryLabel: "Audio / Streaming",
    badge: "Audio Tech",
    icon: "🎵",
    heroImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-pink-500 to-purple-600",
    color: "#ff007f",
    shortDesc: "An ad-free, high-fidelity music streaming service featuring dark-mode design, synchronized lyrics, and algorithmic mood-based radio stations.",
    fullDesc: "Aura Music combines the elegance of high-resolution audio streaming with a mesmerizing cyberpunk aesthetic. Featuring Web Audio API equalizer visualizers, timestamped karaoke-style lyrics synchronization, and collaborative listening rooms powered by WebSockets.",
    skillsLearned: [
      "Web Audio API frequency domain analysis (FFT) & 3D WebGL visualizers",
      "Millisecond-level lyrics audio synchronization via LRC parsing algorithms",
      "Socket.io bidirectional room state broadcasting for shared playlist queues",
      "Adaptive Bitrate Streaming (HLS) for uninterrupted high-fidelity audio"
    ],
    features: [
      "High-fidelity 320kbps and FLAC lossless audio streaming player",
      "Real-time synchronized scrolling lyrics with vocal highlight effects",
      "Algorithmic mood-based radio stations tailored to listening time and history",
      "Dynamic 3D audio visualizer utilizing Web Audio API frequency analysis",
      "Social listening rooms with shared queue synchronization and live chat"
    ],
    architecture: [
      { step: "Audio Streaming Core", desc: "Chunked media delivery with adaptive bitrate streaming (HLS)." },
      { step: "Web Audio Processing", desc: "AnalyserNode computing FFT frequency bins for real-time visualizer." },
      { step: "Lyrics Engine", desc: "LRC parser synchronizing millisecond timestamps with playback position." },
      { step: "Room Syncing", desc: "Socket.io coordinating synchronized playback across multiple clients." }
    ],
    metrics: [
      { label: "Audio Quality", value: "320kbps / Lossless" },
      { label: "Buffer Latency", value: "< 80ms" },
      { label: "Sync Precision", value: "±5ms" },
      { label: "Active Tracks", value: "Unlimited Library" }
    ],
    techStack: ["JavaScript (ES6+)", "Web Audio API", "Node.js", "Socket.io", "MongoDB", "Express", "CSS3 Animations"],
    demoUrl: "#",
    githubUrl: "https://github.com/santhoshkumar-777"
  },
  {
    id: "realtyvision",
    title: "RealtyVision",
    tagline: "Spatial Real Estate Discovery & 360° Virtual Walkthrough Platform",
    category: "fullstack",
    categoryLabel: "Real Estate / Spatial 3D",
    badge: "Spatial Web",
    icon: "🏡",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-cyan-600 to-teal-500",
    color: "#00e5ff",
    shortDesc: "An immersive real estate discovery platform offering 360-degree virtual tours, interactive map exploration, and property valuation estimates.",
    fullDesc: "RealtyVision reinvents the property hunt by replacing static photo galleries with full 360-degree panoramic spatial tours, neighborhood geospatial data overlays (schools, transit, noise levels), and an automated property valuation machine learning model.",
    skillsLearned: [
      "Three.js equirectangular spherical texture mapping & 360° panoramic navigation",
      "Mapbox GL JS geospatial layer integration & radius search filtering",
      "Automated Valuation Model (AVM) with regression machine learning",
      "WebGL mobile performance optimization maintaining stable 60 FPS"
    ],
    features: [
      "Interactive map-based neighborhood discovery with demographic & transit overlays",
      "360-degree virtual walkthroughs powered by Three.js panoramic projection",
      "Automated valuation estimates (AVM) based on comparative market analytics",
      "Direct instant scheduling with verified real estate agents and live messaging",
      "Floor plan 3D interactive dollhouse perspective"
    ],
    architecture: [
      { step: "360 Spatial Render", desc: "Three.js equirectangular texture mapping on spherical geometries." },
      { step: "Map & Spatial Layer", desc: "Mapbox GL JS with custom vector layers and radius filters." },
      { step: "Valuation Engine", desc: "Regression model predicting price per sqft from recent regional comps." },
      { step: "Virtual Tour Navigator", desc: "Interactive hotspots transitioning between rooms." }
    ],
    metrics: [
      { label: "Render Frame Rate", value: "60 FPS WebGL" },
      { label: "Tour Load Time", value: "< 1.5s" },
      { label: "Valuation Accuracy", value: "95.2% R²" },
      { label: "Cross-Device", value: "Mobile & VR Ready" }
    ],
    techStack: ["Three.js", "WebGL", "Mapbox GL JS", "React", "Node.js", "PostgreSQL (PostGIS)", "TailwindCSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/santhoshkumar-777"
  },
  {
    id: "edusphere",
    title: "EduSphere",
    tagline: "Gamified Learning Management System with Live Quizzing & Analytics",
    category: "fullstack",
    categoryLabel: "EdTech / LMS",
    badge: "EdTech",
    icon: "🎓",
    heroImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-indigo-600 to-purple-800",
    color: "#7928ca",
    shortDesc: "An interactive Learning Management System (LMS) designed with gamified paths, video streaming, quizzes, and learner analytics.",
    fullDesc: "EduSphere turns traditional online learning into an engaging RPG-inspired progression. Students unlock skills on a visual talent tree, participate in timed competitive coding/quiz battles, and receive adaptive recommendations based on concept mastery heatmaps.",
    skillsLearned: [
      "Event-driven gamification architecture with XP, tiers, and streak listeners",
      "Low-latency real-time quiz validation & stateful grading with WebSockets",
      "Adaptive learning recommendation engine based on concept mastery heatmaps",
      "MongoDB aggregation pipelines for student retention & drop-off analytics"
    ],
    features: [
      "Structured interactive course video playback with dynamic timestamp bookmarks",
      "Real-time quizzes, automated code grading, and assignment evaluations",
      "Gamification with XP, streaks, level tiers, badges, and class leaderboards",
      "Instructor analytics dashboard tracking student drop-off and retention metrics",
      "Collaborative peer study groups with shared whiteboards"
    ],
    architecture: [
      { step: "Content Delivery", desc: "Optimized video streaming pipeline with progressive caching." },
      { step: "Gamification Engine", desc: "Event-driven microservice dispatching XP & unlocking achievements." },
      { step: "Interactive Quiz Engine", desc: "Low-latency stateful evaluations via WebSockets." },
      { step: "Analytics Radar", desc: "Aggregated learner performance metrics displayed via dynamic charts." }
    ],
    metrics: [
      { label: "Course Completion", value: "+38% vs Industry" },
      { label: "Quiz Latency", value: "< 50ms" },
      { label: "Student Retention", value: "89%" },
      { label: "Supported Types", value: "Code, Video, Quizzes" }
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Chart.js", "CSS Modules"],
    demoUrl: "#",
    githubUrl: "https://github.com/santhoshkumar-777"
  },
  {
    id: "github-name-finder",
    title: "GitHub Name Finder",
    tagline: "High-Speed Developer Profile Discovery & Repository Analytics",
    category: "tools",
    categoryLabel: "Developer Tools",
    badge: "Dev Tool",
    icon: "🔍",
    heroImage: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-slate-700 to-cyan-800",
    color: "#38bdf8",
    shortDesc: "A fast discovery tool for exploring public developer profiles, repository statistics, contribution patterns, and profile analytics.",
    fullDesc: "GitHub Name Finder gives tech recruiters and developers a comprehensive analytical overview of any GitHub profile in milliseconds. It computes language dominance breakdown, commit streaks, top starred repos, fork velocity, and generates shareable developer highlight cards.",
    skillsLearned: [
      "GitHub GraphQL API query optimization reducing multiple REST calls to single payload",
      "Client-side statistical computation for language byte dominance breakdown",
      "Dynamic SVG badge generation & export for GitHub Readme embeds",
      "Vanilla JavaScript DOM rendering without external framework bloat"
    ],
    features: [
      "Instant real-time developer username search with auto-completion",
      "Language distribution breakdown with interactive donut charts",
      "Repository star count, fork velocity, and recent activity timeline",
      "Generated SVG developer badge exporter for GitHub Readmes",
      "Clean, high-contrast cyberpunk user interface with instant copy links"
    ],
    architecture: [
      { step: "Search & Fetch", desc: "GitHub GraphQL API queries retrieving full user tree in single request." },
      { step: "Stat Computation", desc: "Client-side aggregation of language bytes and contribution trends." },
      { step: "Visual Rendering", desc: "Interactive SVG / Chart visualizations with neon glowing highlights." }
    ],
    metrics: [
      { label: "Search Latency", value: "< 300ms" },
      { label: "API Efficiency", value: "GraphQL 1-Roundtrip" },
      { label: "Export Formats", value: "SVG, PNG, Markdown" },
      { label: "Profiles Analyzed", value: "10,000+" }
    ],
    techStack: ["JavaScript (Vanilla ES6+)", "GitHub REST & GraphQL API", "Chart.js", "HTML5", "CSS3 Glassmorphism"],
    demoUrl: "#",
    githubUrl: "https://github.com/santhoshkumar-777"
  },
  {
    id: "brainycalc",
    title: "BrainyCalc",
    tagline: "Modern Glassmorphism Scientific Calculator with Calculation History",
    category: "tools",
    categoryLabel: "Utility / Web App",
    badge: "Utility",
    icon: "🧮",
    heroImage: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-blue-600 to-indigo-900",
    color: "#6366f1",
    shortDesc: "A modern calculation tool supporting advanced mathematical functions, calculation history, memory storage, and keyboard shortcuts.",
    fullDesc: "BrainyCalc combines sleek iOS/Cyber-inspired glassmorphism with comprehensive scientific calculation powers. Features support for trigonometric operations, exponential notation, persistent local history, formula tape export, and comprehensive keyboard bindings.",
    skillsLearned: [
      "Compiler theory & Shunting-Yard algorithm for mathematical expression parsing",
      "Floating-point arithmetic precision handling (64-bit IEEE 754 standard)",
      "Web Audio API synthesizer for tactile sound feedback without external audio files",
      "LocalStorage state persistence for calculation history and memory registers"
    ],
    features: [
      "Scientific math operations (Trigonometry, Logarithms, Roots, Factorials, Pi/e)",
      "Persistent calculation history tape with one-click result re-use",
      "Memory registers (MC, MR, M+, M-) with live visual indicators",
      "Tactile sound feedback and keyboard shortcut triggers for high-speed computation",
      "Responsive glassmorphism interface with dark neon aesthetics"
    ],
    architecture: [
      { step: "Token Parsing Engine", desc: "Shunting-yard algorithm evaluating math expressions with proper precedence." },
      { step: "State & Storage", desc: "LocalStorage memory retention preserving calculation history." },
      { step: "Audio Synthesis", desc: "Web Audio API click synthesizers delivering tactile user response." }
    ],
    metrics: [
      { label: "Precision", value: "64-bit Floating Point" },
      { label: "History Capacity", value: "Unlimited Local Logs" },
      { label: "Bundle Size", value: "< 25KB Ultra-Light" },
      { label: "Shortcut Support", value: "100% Keyboard Driven" }
    ],
    techStack: ["HTML5", "CSS3 (Custom Properties & Glassmorphism)", "Vanilla JavaScript (Math Parser)", "Web Audio API"],
    demoUrl: "#",
    githubUrl: "https://github.com/santhoshkumar-777"
  },
  {
    id: "securevpn",
    title: "SecureVPN",
    tagline: "Engineered for Privacy with Multi-Region Servers & Kill Switch",
    category: "tools",
    categoryLabel: "Security & Privacy",
    badge: "Security Tool",
    icon: "🛡️",
    heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-emerald-600 to-cyan-900",
    color: "#10b981",
    shortDesc: "A desktop VPN application engineered for privacy, offering end-to-end traffic encryption, multi-server connections, and automatic kill switch safeguards.",
    fullDesc: "SecureVPN is built for uncompromising privacy and internet freedom. Powered by WireGuard protocol abstractions, it delivers blazing connection speeds, zero-log DNS routing, automated kill switches that block unencrypted leakages, and multi-hop server cascading.",
    skillsLearned: [
      "WireGuard VPN protocol configuration & secure tunnel network socket handling",
      "Automated Kill Switch daemon detecting interface drops to prevent DNS leaks",
      "Encrypted DNS-over-HTTPS (DoH) resolver implementation",
      "Electron desktop application architecture with cross-platform system hooks"
    ],
    features: [
      "Strong AES-256 / ChaCha20-Poly1305 end-to-end traffic encryption",
      "Multi-region high-bandwidth server network with real-time ping monitors",
      "Automated kill switch protection preventing IP & DNS leaks on connection drops",
      "Split tunneling configuration allowing selective application routing",
      "Minimalist dark UI with one-click instant connect and bandwidth monitors"
    ],
    architecture: [
      { step: "Tunnel Layer", desc: "WireGuard protocol integration for low-overhead secure packet routing." },
      { step: "DNS Resolver", desc: "Encrypted DNS-over-HTTPS (DoH) preventing ISP snooping." },
      { step: "Kill Switch Daemon", desc: "Network socket monitor instantly cutting non-tunnel traffic on drop." },
      { step: "GUI Client", desc: "Electron/Web desktop client with live throughput telemetry." }
    ],
    metrics: [
      { label: "Encryption", value: "AES-256-GCM" },
      { label: "Throughput Drop", value: "< 4% Minimal Loss" },
      { label: "DNS Leak Test", value: "0 Leaks (100% Pass)" },
      { label: "Connection Time", value: "< 1.2s Handshake" }
    ],
    techStack: ["Electron / Web Tech", "Node.js", "WireGuard Protocol", "Python Core", "TailwindCSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/santhoshkumar-777"
  },
  {
    id: "browser-code-editor-bug-tracker",
    title: "Browser Code Editor & Bug Tracker",
    tagline: "In-Browser Development Suite with Multi-Pane Live Preview & Status Pipelines",
    category: "tools",
    categoryLabel: "Developer Tools",
    badge: "Dev Suite",
    icon: "💻",
    heroImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-purple-600 to-pink-700",
    color: "#c084fc",
    shortDesc: "In-browser minimal code writing tool with multi-pane preview and collaborative project issue tracker with Kanban status pipelines.",
    fullDesc: "A dual-purpose developer productivity tool combining a lightweight, syntax-highlighted in-browser code editor with instant live sandboxed execution and a Kanban-based issue & bug tracker with status boards (To-Do, In Progress, Review, Done).",
    skillsLearned: [
      "In-browser sandboxed execution using isolated iframes and Blob URLs",
      "Monaco / CodeMirror text virtualization and real-time syntax tokenization",
      "HTML5 Drag-and-Drop API implementation for Kanban workflow states",
      "IndexedDB client-side database management for persistent offline file trees"
    ],
    features: [
      "In-browser HTML/CSS/JS editor with live synchronized iframe rendering",
      "Syntax highlighting, line numbering, auto-bracket closing, and code formatting",
      "Kanban Bug Tracking board with drag-and-drop status pipelines",
      "Issue severity tags (Critical, High, Medium, Low) and assignee management",
      "Local workspace persistence with project export and JSON backup"
    ],
    architecture: [
      { step: "Editor Core", desc: "Monaco/CodeMirror virtualized text input with syntax tokenizer." },
      { step: "Sandbox Execution", desc: "Isolated iframe sandbox with blob URL injection and console capturing." },
      { step: "Kanban Pipeline", desc: "HTML5 Drag-and-Drop API managing state transitions and priority queues." },
      { step: "Data Store", desc: "IndexedDB client-side database preserving files and ticket records." }
    ],
    metrics: [
      { label: "Live Reload Delay", value: "100ms Debounced" },
      { label: "Sandbox Security", value: "100% Isolated Iframe" },
      { label: "Storage", value: "Offline IndexedDB" },
      { label: "Kanban Columns", value: "Customizable Flow" }
    ],
    techStack: ["JavaScript", "HTML5 Sandboxed Iframe", "CSS3 Flex/Grid", "IndexedDB", "Lucide Icons"],
    demoUrl: "#",
    githubUrl: "https://github.com/santhoshkumar-777"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PROJECTS_DATA };
}
