// Every project's start/end are the repo's GitHub created_at and last-push dates.

export const TYPES = {
  agent: { label: 'Agents', color: 'var(--agent)' },
  tool: { label: 'Dev tools', color: 'var(--tool)' },
  ml: { label: 'ML & data', color: 'var(--ml)' },
  sys: { label: 'Systems', color: 'var(--sys)' },
}

const gh = (path) => `https://github.com/${path}`

const raw = [
  {
    id: 'lunar',
    title: 'Lunar Mission Simulator',
    type: 'sys',
    category: 'Simulation / WebGL',
    metric: '6-DOF lander',
    start: '2026-09-04',
    end: '2026-10-01',
    description:
      'Browser-based 3D Apollo mission flown end to end: Saturn V launch, gravity turn, trans-lunar coast, powered descent and landing.',
    detail:
      'A full Apollo-style lunar mission in the browser, from Saturn V launch to touchdown. Built on Three.js and Cannon-es with hand-rolled physics and no game engine. There are no binary assets: every texture, mesh and sound is generated procedurally at load time.',
    highlights: [
      'Six-degree-of-freedom Lunar Module flown by hand: throttle, attitude and fuel on the way down.',
      'Three flight phases plus a campaign that chains them; each phase is playable alone, with difficulty levels, autoplay and multiple landing sites.',
      'Procedural everything (textures, meshes, audio), CI on GitHub Actions, deployed on Vercel.',
    ],
    tech: ['Three.js', 'WebGL', 'Cannon-es', 'JavaScript', 'Vite', 'GitHub Actions'],
    github: gh('Aashutosh-Mahajan/lunar-mission-simulator'),
    live: 'https://lunar-mission-simulator.vercel.app/',
  },
  {
    id: 'audita',
    title: 'AUDITA',
    type: 'agent',
    category: 'Agentic AI / Data',
    metric: 'LLM never runs code',
    start: '2026-08-08',
    end: '2026-10-01',
    description:
      'A LangGraph pipeline that turns raw CSVs into cleaned datasets and verified dashboards. The LLM proposes, code executes, code verifies.',
    detail:
      'AUDITA is a self-verifying data cleaning and visualization agent. The model never writes or executes code: it proposes structured actions from fixed enums, every proposal is schema-validated against the real DataFrame, hand-written tested functions execute it, and a separate layer re-verifies every chart before you see it.',
    highlights: [
      'Pydantic validates each proposal against the actual columns and dtypes before anything runs.',
      'Every chart is independently re-verified by code recomputation plus LLM grounding.',
      'Immutable audit trail for every decision, human or AI. LangGraph orchestration, Streamlit and Plotly UI, OpenAI API.',
    ],
    tech: ['LangGraph', 'Pydantic', 'OpenAI', 'Streamlit', 'Plotly', 'Multi-agent', 'Python', 'GitHub Actions'],
    github: gh('Aashutosh-Mahajan/AUDITA'),
  },
  {
    id: 'prism',
    title: 'PRISM',
    type: 'tool',
    category: 'Developer Tools / MCP',
    metric: '-92% tokens, 305 files',
    start: '2026-09-27',
    end: '2026-09-27',
    description:
      'A persistent, local context layer for AI coding agents. Maps a codebase once and lets any agent jump straight to the files, functions and lines a task touches.',
    detail:
      'Every new agent session starts blind and pays an orientation tax in tokens. PRISM maps the repository once, keeps the map fresh as code changes, and exposes it through a CLI, an MCP server and skills so Claude Code, Cursor or Codex can start from a focused working set. It is local, offline and deterministic: the same code always produces the same bytes.',
    highlights: [
      'Measured on a 305-file Django + React app: 356,657 tokens down to 28,202 (92% saved); 73% saved on PRISM itself.',
      'Queries answer in 1-3 ms; a one-file update takes about 0.4 s on a 50k-line repo.',
      'Honest about limits: on a 12-file fixture the fixed cost makes it worse, so it targets real projects.',
    ],
    tech: ['Python', 'MCP', 'CLI', 'Static analysis'],
    github: gh('Aashutosh-Mahajan/prism'),
  },
  {
    id: 'ohnoo',
    title: 'ohnoo',
    type: 'tool',
    category: 'Developer Tools / CLI',
    metric: '102 known errors',
    start: '2026-09-14',
    end: '2026-09-14',
    description:
      'A terminal companion that catches your crash, roasts it in one funny line, and prints the fix command.',
    detail:
      'When a command exits non-zero, ohnoo reads the wall of red for you, matches it against a local database of 102 known ways your code embarrasses you, and hands back one joke and the real fix. No account, no API key, no config file.',
    highlights: [
      'pip install ohnoo && ohnoo init is the whole setup.',
      'Offline by default: zero network calls, nothing leaves the machine.',
      'Python 3.9+, MIT licensed, with a live site on Vercel.',
    ],
    tech: ['Python', 'CLI', 'Pattern matching'],
    github: gh('Aashutosh-Mahajan/ohnoo'),
    live: 'https://ohnoo.vercel.app',
  },
  {
    id: 'weaver',
    title: 'Weaver',
    type: 'tool',
    category: 'Agent Infrastructure / MCP',
    metric: 'Self-healing MCP',
    start: '2026-08-23',
    end: '2026-08-23',
    description:
      'Turns any website into a typed, self-healing MCP server on Bright Data Scraper Studio. Scrapers get rewritten under a live session and the agent never notices.',
    detail:
      'MCP clients cache tool definitions, so changing a signature breaks every connected agent. Bright Data heal rewrites a scraper but preserves its Collector ID, which is exactly what an MCP tool identity is built on. Weaver crawls a site, discovers its page families, generates a collector per family, exposes each as a tool and runs a daemon that detects drift and re-heals without touching names or schemas.',
    highlights: [
      'A scraper can be rewritten mid-conversation with no error, reconnect or tool-definition change for the agent.',
      'Pipeline: cartographer, spec-writer, golden tests, drift-detecting heal daemon.',
      'Built for Into the Scrape-Verse (WeMakeDevs x Bright Data).',
    ],
    tech: ['TypeScript', 'MCP', 'Bright Data', 'Node.js'],
    github: gh('Aashutosh-Mahajan/weaver'),
  },
  {
    id: 'spectra',
    title: 'Spectra',
    type: 'agent',
    category: 'Agentic AI / Developer Tools',
    metric: 'Audit OS',
    start: '2026-04-26',
    end: '2026-08-17',
    description:
      'Multi-agent platform that audits GitHub repositories with parallel domain-specific analysis, then dedupes and severity-scores the findings.',
    detail:
      'Spectra maps a repository and fans out parallel agents, one per domain (quality, security, dead code, refactoring). Findings are aggregated, deduplicated and severity-scored, then rendered as structured Markdown and PDF reports.',
    highlights: [
      'Parallel domain-specific agents instead of one long prompt.',
      'Deduplication and severity scoring across agents.',
      'Markdown and PDF reports built for engineering review.',
    ],
    tech: ['Python', 'LangChain', 'OpenAI', 'FastAPI', 'Multi-agent'],
    github: gh('Aashutosh-Mahajan/Spectra'),
  },
  {
    id: 'platforma',
    title: 'Platforma',
    type: 'sys',
    category: 'Web / DBMS',
    metric: 'BCNF',
    start: '2026-03-31',
    end: '2026-10-02',
    description:
      'Event and course management platform with a normalized relational schema, stored procedures, triggers and reporting.',
    detail:
      'An academic DBMS and web platform for event and course management, built around clean relational modeling, enrollment operations, scheduling, reporting and database-level logic.',
    highlights: [
      'Schema designed to Boyce-Codd Normal Form.',
      'Stored procedures, triggers and 30+ reporting queries.',
      'Django and SQL-backed workflows for event and course operations.',
    ],
    tech: ['Django', 'PostgreSQL', 'SQL Server', 'Python'],
    github: gh('Aashutosh-Mahajan/Platforma'),
  },
  {
    id: 'arogya',
    title: 'ArogyaTrack',
    type: 'ml',
    category: 'Healthcare / ML / Full-Stack',
    metric: '101 APIs',
    start: '2026-02-10',
    end: '2026-09-27',
    description:
      'Multi-platform healthcare OS for disease surveillance, prescriptions, adherence and 4-model ML forecasting across web and mobile.',
    detail:
      'A multi-role healthcare platform built around disease surveillance, digital prescriptions, medication adherence and predictive analytics. Web and mobile workflows let administrators, doctors, field teams and patients work from one connected system.',
    highlights: [
      '101 API endpoints across healthcare, auth, analytics and operations workflows.',
      '4-model ML pipeline for disease forecasting and health-risk intelligence.',
      'Django REST backend, Next.js web app, Flutter mobile app, Redis, Celery and PostgreSQL.',
    ],
    tech: ['Django', 'Next.js', 'Flutter', 'PostgreSQL', 'Redis', 'Celery', 'XGBoost', 'REST APIs'],
    github: gh('Aashutosh-Mahajan/ArogyaTrack'),
  },
  {
    id: 'finbuddy',
    title: 'FinBuddy',
    type: 'agent',
    category: 'Agentic AI / FinTech',
    metric: '13 agents',
    start: '2026-01-30',
    end: '2026-04-15',
    description:
      'AI finance coach with orchestrated LangChain agents, OCR transaction capture, tax comparison, portfolio analysis and ChromaDB memory.',
    detail:
      'An agentic personal finance assistant that turns raw financial activity into guided decisions. A coordinated agent architecture handles transaction extraction, recurring payment detection, tax comparison, portfolio review and contextual advice.',
    highlights: [
      '3-orchestrator, 13-agent LangChain architecture for finance workflows.',
      'OCR extraction from receipts and SMS-like financial records.',
      'ChromaDB memory layer for contextual, user-aware recommendations.',
    ],
    tech: ['FastAPI', 'Next.js', 'LangChain', 'OpenAI', 'ChromaDB', 'Redis', 'Multi-agent'],
    github: gh('Aashutosh-Mahajan/Finbuddy-AI-Based-Financial-Assistant'),
  },
  {
    id: 'visionprobe',
    title: 'VisionProbe AI',
    type: 'agent',
    category: 'Agentic AI / Computer Vision',
    metric: '5 agents',
    start: '2025-12-27',
    end: '2026-03-31',
    description:
      'Visual product intelligence where a central brain coordinates agents for identification, enrichment, impact analysis and decision support.',
    detail:
      'A visual product intelligence system. A user provides an image and the pipeline moves through identification, enrichment, impact analysis, use-case guidance and buy-link decisions, each handled by a specialist agent.',
    highlights: [
      'Sequential multi-agent pipeline for product intelligence.',
      'React and Vite interface with a Django backend and OpenAI-powered reasoning.',
      'Built for visual identification, enrichment and recommendation workflows.',
    ],
    tech: ['Django', 'React', 'Vite', 'OpenAI', 'Framer Motion', 'Multi-agent'],
    github: gh('Aashutosh-Mahajan/VisionProbe-AI'),
  },
  {
    id: 'bluequant',
    title: 'BlueQuant',
    type: 'ml',
    category: 'Climate Tech / Blockchain',
    metric: 'SIH Top 45',
    start: '2025-12-29',
    end: '2025-12-30',
    description:
      'Decentralized blue-carbon MRV platform that estimates biomass, converts CO2 equivalents and mints ERC-20 credits on Ethereum.',
    detail:
      'A decentralized MRV platform for blue-carbon ecosystems such as mangroves. It estimates biomass from satellite or drone evidence, converts it into CO2 equivalents and connects the result to tokenized carbon credits.',
    highlights: [
      'ML-assisted biomass estimation for blue-carbon reporting.',
      'ERC-20 carbon credit minting through Solidity, Hardhat, Sepolia and Web3.py.',
      'Role-based workflows for NGO, field officer, admin and corporate users.',
    ],
    tech: ['Django', 'Solidity', 'Web3.py', 'Flutter', 'scikit-learn', 'PostgreSQL'],
    github: gh('Aashutosh-Mahajan/BlueQuant'),
  },
  {
    id: 'codemri',
    title: 'Code MRI',
    type: 'tool',
    category: 'Developer Tools / AI',
    metric: '<30 sec scans',
    start: '2025-12-13',
    end: '2026-01-24',
    description:
      'Static repo health scanner for maintainability, complexity, documentation and security posture, with RAG-powered chat over the repo.',
    detail:
      'A collaborative developer tool that statically analyses public GitHub repositories without executing code. It scores complexity, maintainability, documentation quality and security posture, then supports chat with the repo through a RAG layer. TechSprint 2026 Runner-Up.',
    highlights: [
      'Static analysis with Radon plus AI-generated explanations.',
      'LangChain and FAISS powered "chat with repo".',
      'Multi-branch analysis, secret scanning and per-file complexity colour coding.',
    ],
    tech: ['FastAPI', 'Next.js', 'Gemini', 'FAISS', 'LangChain', 'RAG', 'Radon'],
    github: gh('priy-anshugupta/Code-MRI'),
  },
  {
    id: 'sportsdeck',
    title: 'SportsDeck',
    type: 'sys',
    category: 'Web Development',
    metric: 'Slot booking',
    start: '2025-08-13',
    end: '2026-04-09',
    description:
      'Django ground reservation system with booking slots, timetable conflict checks and an admin approval flow for college sports.',
    detail:
      'A Django platform for college sports ground reservations: a student portal for booking requests, an admin panel for approvals, an allotted-grounds dashboard and a timetable check that prevents scheduling conflicts.',
    highlights: [
      'Booking slot workflow with conflict prevention.',
      'Admin-first approval flow for college operations.',
      'Django and PostgreSQL stack focused on practical scheduling.',
    ],
    tech: ['Django', 'PostgreSQL', 'Python'],
    github: gh('Aashutosh-Mahajan/Ground-Booking-System'),
  },
  {
    id: 'audio',
    title: 'Audio Translator AI',
    type: 'ml',
    category: 'AI / Web App',
    metric: 'Whisper + GPT',
    start: '2025-07-13',
    end: '2025-08-16',
    description:
      'Upload audio in any language and get translated text, using Whisper for speech-to-text and GPT models for multilingual output.',
    detail:
      'A Flask web app that transcribes spoken input with OpenAI Whisper and translates the result into the target language with a GPT model, for multilingual communication, education and accessibility.',
    highlights: [
      'Whisper-powered speech-to-text transcription.',
      'GPT-powered translation layer for multilingual output.',
      'Simple browser upload flow with instant translated results.',
    ],
    tech: ['Flask', 'OpenAI', 'Whisper', 'Python'],
    github: gh('Aashutosh-Mahajan/Real-Time-Audio-Translation-Web-App-using-OpenAI-Whisper-and-GPT-Models'),
  },
]

export const projects = raw.map((p) => ({
  ...p,
  startDate: new Date(p.start),
  endDate: new Date(p.end),
}))

// Skill groups. A skill's count is computed from the projects' tech arrays,
// so every tick on the matrix is real. `also` lists skills without a featured project.
export const skillGroups = [
  {
    id: 'agent',
    title: 'Agents & LLMs',
    skills: ['LangGraph', 'LangChain', 'Multi-agent', 'RAG', 'MCP', 'OpenAI', 'Gemini', 'FAISS', 'ChromaDB', 'Pydantic'],
  },
  {
    id: 'sys',
    title: 'Backend & systems',
    skills: ['Django', 'FastAPI', 'Flask', 'PostgreSQL', 'Redis', 'Celery', 'REST APIs', 'Solidity', 'Web3.py', 'GitHub Actions', 'Bright Data'],
  },
  {
    id: 'ml',
    title: 'ML & data',
    skills: ['XGBoost', 'scikit-learn', 'Whisper', 'Streamlit', 'Plotly', 'Static analysis'],
  },
  {
    id: 'tool',
    title: 'Interfaces & 3D',
    skills: ['React', 'Next.js', 'TypeScript', 'Three.js', 'WebGL', 'Cannon-es', 'Vite', 'Flutter', 'Framer Motion'],
  },
]

export const alsoWorkingWith = [
  'Docker',
  'Ollama',
  'Supabase',
  'Prisma',
  'Tailwind CSS',
  'TensorFlow',
  'PyTorch',
  'Prophet',
  'Pandas',
  'NumPy',
  'WebSockets',
  'JWT / OAuth',
]

export const achievements = [
  { event: 'HackerRank Orchestrate, Aug 2026', result: 'Rank 324 of 1,983', project: 'AI agent', note: 'Top 16.3% internationally, by building and deploying an AI agent.' },
  { event: 'HackerRank Orchestrate, Jun 2026', result: 'Rank 587 of 1,773', project: 'AI agent', note: 'Top 33.1% internationally, by building and deploying an AI agent.' },
  { event: 'TechSprint 2026', result: 'Runner-Up', project: 'Code MRI', note: 'AI-powered repository analysis and code health platform.' },
  { event: 'HackAxios', result: 'Rank 19 nationally', project: 'BlueQuant', note: 'Blue-carbon MRV and blockchain credit system.' },
  { event: 'Smart India Hackathon', result: 'Top 45', project: 'BlueQuant', note: 'Decentralized blue-carbon MRV platform.' },
  { event: 'Code-A-Thon', result: 'Top 14', project: 'FinBuddy', note: 'Agentic finance assistant with OCR and portfolio intelligence.' },
  { event: 'Loop 1.0', result: 'Top 30', project: 'ArogyaTrack', note: 'Healthcare tracking and ML forecasting built under prototype constraints.' },
  { event: 'Invasion: Hack The Ghost', result: 'Top 25', project: null, note: 'Placed among the top teams on product thinking and execution.' },
  { event: 'Maximally Vibe-a-thon', result: '175th internationally', project: 'VisionProbe AI', note: 'Global run with a multi-agent computer-vision system.' },
  { event: 'Mumbai Hacks', result: 'Finalist', project: null, note: 'Impact-focused solution presented under strict deadline pressure.' },
]

export const education = {
  degree: 'B.Tech, Information Technology',
  institution: 'Vidyalankar Institute of Technology',
  university: 'Mumbai University',
  location: 'Mumbai, India',
  start: new Date('2024-08-01'),
  end: new Date('2028-06-01'),
  cgpa: '9.67',
  focus: 'AI, ML and full-stack systems',
}

export const links = {
  email: 'aashutoshmahajan.2007@gmail.com',
  github: 'https://github.com/Aashutosh-Mahajan',
  linkedin: 'https://www.linkedin.com/in/aashutosh-mahajan/',
}

// The six flagship builds that get a full-screen stage. Everything else is listed under "Also shipped".
export const flagshipIds = ['lunar', 'prism', 'audita', 'codemri', 'arogya', 'finbuddy']
