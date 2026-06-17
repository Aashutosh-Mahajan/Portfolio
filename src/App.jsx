import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  DatabaseZap,
  GitBranch,
  GraduationCap,
  Mail,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react'

const projects = [
  {
    title: 'ArogyaTrack',
    category: 'Healthcare / ML / Full-Stack',
    metric: '101 APIs',
    description:
      'Multi-platform healthcare OS for disease surveillance, prescriptions, adherence, and 4-model ML forecasting across web and mobile workflows.',
    tech: ['Django', 'Next.js', 'Flutter', 'PostgreSQL', 'Redis', 'Celery', 'XGBoost'],
    github: 'https://github.com/Aashutosh-Mahajan/ArogyaTrack',
  },
  {
    title: 'FinBuddy',
    category: 'Agentic AI / FinTech',
    metric: '13 agents',
    description:
      'AI finance coach with orchestrated LangChain agents, OCR transaction capture, tax comparison, portfolio analysis, and ChromaDB memory.',
    tech: ['FastAPI', 'Next.js', 'LangChain', 'GPT-5.1', 'ChromaDB', 'Redis'],
    github: 'https://github.com/Aashutosh-Mahajan/Finbuddy-AI-Based-Financial-Assistant',
  },
  {
    title: 'BlueQuant',
    category: 'Climate Tech / Blockchain',
    metric: 'SIH Top 45',
    description:
      'Decentralized blue-carbon MRV platform that estimates biomass, converts CO2 equivalents, and mints ERC-20 credits on Ethereum.',
    tech: ['Django', 'Solidity', 'Web3.py', 'Flutter', 'Scikit-learn', 'PostgreSQL'],
    github: 'https://github.com/Aashutosh-Mahajan/BlueQuant',
  },
  {
    title: 'VisionProbe AI',
    category: 'Agentic AI / Computer Vision',
    metric: '5 agents',
    description:
      'Visual product intelligence system where a central brain coordinates agents for identification, enrichment, impact analysis, and decision support.',
    tech: ['Django', 'React', 'Vite', 'OpenAI', 'Neon Auth', 'Framer Motion'],
    github: 'https://github.com/Aashutosh-Mahajan/VisionProbe-AI',
  },
  {
    title: 'Code MRI',
    category: 'Developer Tools / AI',
    metric: '<30 sec',
    description:
      'Static repo health scanner for maintainability, complexity, documentation quality, security posture, and RAG-powered repo chat.',
    tech: ['FastAPI', 'Next.js', 'Gemini', 'FAISS', 'LangChain', 'Radon'],
    github: 'https://github.com/priy-anshugupta/Code-MRI',
  },
  {
    title: 'Spectra',
    category: 'Agentic AI / Developer Tools',
    metric: 'Audit OS',
    description:
      'Autonomous codebase auditor that maps architecture and reports quality, security, dead-code, and refactoring opportunities.',
    tech: ['Python', 'LangChain', 'OpenAI', 'FastAPI'],
    github: 'https://github.com/Aashutosh-Mahajan/Spectra',
  },
  {
    title: 'Platforma',
    category: 'Web Development / DBMS',
    metric: 'BCNF',
    description:
      'Event and course management platform with normalized relational schema, stored procedures, triggers, reports, and enrollment workflows.',
    tech: ['Django', 'PostgreSQL', 'SQL Server', 'Python'],
    github: 'https://github.com/Aashutosh-Mahajan/Platforma',
  },
  {
    title: 'SportsDeck',
    category: 'Web Development',
    metric: 'Slots',
    description:
      'Django ground reservation system with booking slots, conflict handling, and admin-first college sports operations.',
    tech: ['Django', 'PostgreSQL', 'HTML/CSS', 'Python'],
    github: 'https://github.com/Aashutosh-Mahajan/Ground-Booking-System',
  },
  {
    title: 'Audio Translator AI',
    category: 'AI / Web App',
    metric: 'Whisper',
    description:
      'Near real-time browser audio translation using Whisper speech-to-text and GPT-4o powered multilingual output.',
    tech: ['Flask', 'OpenAI', 'Whisper', 'GPT-4o', 'Python'],
    github: 'https://github.com/Aashutosh-Mahajan/Real-Time-Audio-Translation-Web-App-using-OpenAI-Whisper-and-GPT-Models',
  },
]

const skillGroups = [
  {
    title: 'AI + Agents',
    icon: BrainCircuit,
    skills: ['LangChain', 'Multi-Agent Systems', 'RAG', 'FAISS', 'ChromaDB', 'OpenAI API', 'Gemini API'],
  },
  {
    title: 'Backend Systems',
    icon: DatabaseZap,
    skills: ['Django', 'FastAPI', 'Flask', 'Celery', 'Redis', 'REST APIs', 'JWT / OAuth', 'WebSockets'],
  },
  {
    title: 'Frontend Craft',
    icon: Code2,
    skills: ['React.js', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'TypeScript'],
  },
  {
    title: 'ML + Data',
    icon: Sparkles,
    skills: ['TensorFlow', 'Scikit-learn', 'PyTorch', 'XGBoost', 'Prophet', 'Pandas', 'NumPy'],
  },
  {
    title: 'Soft Skills',
    icon: ShieldCheck,
    skills: ['Problem Solving', 'Leadership', 'Communication', 'Teamwork', 'Adaptability', 'Critical Thinking'],
  },
]

const projectDossiers = {
  ArogyaTrack: {
    detail:
      'ArogyaTrack is a multi-role healthcare platform built around disease surveillance, digital prescriptions, medication adherence, and predictive healthcare analytics. It combines web and mobile workflows so administrators, doctors, field teams, and patients can work from one connected system.',
    highlights: [
      '101 API endpoints across healthcare, auth, analytics, and operations workflows.',
      '4-model ML pipeline for disease forecasting and health-risk intelligence.',
      'Django REST backend with Next.js web app, Flutter mobile app, Redis, Celery, and PostgreSQL.',
    ],
  },
  FinBuddy: {
    detail:
      'FinBuddy is an agentic personal finance assistant that turns raw financial activity into guided decisions. It uses a coordinated agent architecture for transaction extraction, recurring payment detection, tax comparison, portfolio review, and contextual advice.',
    highlights: [
      '3-orchestrator, 13-agent LangChain architecture for finance workflows.',
      'OCR extraction from receipts and SMS-like financial records.',
      'ChromaDB memory layer for contextual, user-aware financial recommendations.',
    ],
  },
  BlueQuant: {
    detail:
      'BlueQuant is a decentralized MRV platform for blue-carbon ecosystems such as mangroves and coastal restoration projects. It estimates biomass from satellite or drone evidence, converts it into CO2 equivalents, and connects the result to tokenized carbon credits.',
    highlights: [
      'ML-assisted biomass estimation for blue-carbon reporting.',
      'ERC-20 carbon credit minting through Solidity, Hardhat, Sepolia, and Web3.py.',
      'Role-based workflows for NGO, field officer, admin, and corporate users.',
    ],
  },
  'VisionProbe AI': {
    detail:
      'VisionProbe AI is a visual product intelligence system where a central brain coordinates specialized agents. A user can provide visual input and the system moves through identification, enrichment, impact analysis, use-case guidance, and buy-link decisions.',
    highlights: [
      'Sequential multi-agent pipeline for product intelligence.',
      'React and Vite interface with Django backend and OpenAI-powered reasoning.',
      'Designed for visual identification, enrichment, and recommendation workflows.',
    ],
  },
  'Code MRI': {
    detail:
      'Code MRI is a collaborative developer tool that performs static analysis on public GitHub repositories without executing code. It examines complexity, maintainability, documentation quality, and security posture, then supports repo chat through a RAG layer.',
    highlights: [
      'Static repo analysis using Radon and AI-generated explanations.',
      'LangChain and FAISS powered conversational "chat with repo" experience.',
      'Multi-branch analysis, secret scanning, and per-file complexity color coding.',
    ],
  },
  'Codebase Audit Agent': {
    detail:
      'Codebase Audit Agent is an autonomous audit system for codebases. It crawls project structure, maps architecture, and produces structured reports that call out quality issues, security risks, dead code, and refactoring opportunities.',
    highlights: [
      'Autonomous audit workflow for repository quality and maintainability.',
      'LangChain and OpenAI based reasoning over code architecture.',
      'FastAPI service surface for audit execution and report delivery.',
    ],
  },
  Platforma: {
    detail:
      'Platforma is an academic DBMS and web platform for event and course management. It focuses on clean relational modeling, enrollment operations, scheduling, reporting, and database-level logic.',
    highlights: [
      'Schema designed to Boyce-Codd Normal Form.',
      'Stored procedures, triggers, and 30+ reporting queries.',
      'Django and SQL-backed workflows for event and course operations.',
    ],
  },
  SportsDeck: {
    detail:
      'SportsDeck is a Django platform for college sports ground reservations. It handles slot booking, conflict control, and admin-first operations to keep sports infrastructure scheduling simple and reliable.',
    highlights: [
      'Ground booking slot workflow with conflict prevention.',
      'Admin-oriented reservation management for college operations.',
      'Django and PostgreSQL stack focused on practical scheduling needs.',
    ],
  },
  'Audio Translator AI': {
    detail:
      'Audio Translator AI is a Flask web application for near real-time audio translation. It transcribes spoken input with Whisper and translates the result into multilingual natural language output.',
    highlights: [
      'Whisper-powered speech-to-text transcription.',
      'GPT-4o powered translation layer for multilingual output.',
      'Clean browser upload flow for instant translated results.',
    ],
  },
}

const stats = [
  ['9.67', 'CGPA'],
  ['6x', 'National finalist'],
  ['9', 'Flagship builds'],
  ['10+', 'Hackathons'],
]

const achievements = [
  {
    icon: Trophy,
    event: 'TechSprint 2026',
    result: 'Runner-Up',
    project: 'CODE MRI',
    note: 'AI-powered repository analysis and code health platform built for fast, explainable engineering reviews.',
    span: 'lg:col-span-3',
    featured: true,
  },
  {
    icon: ShieldCheck,
    event: 'HackAxios',
    result: 'Rank 19 Nationally',
    project: 'BlueQuant',
    note: 'Blue-carbon MRV and blockchain credit system recognized in a national competitive field.',
    span: 'lg:col-span-3',
  },
  {
    icon: BrainCircuit,
    event: 'Code-A-Thon',
    result: 'Top 14',
    project: 'FinBuddy',
    note: 'Agentic finance assistant with OCR, portfolio intelligence, and personalized planning flows.',
    span: 'lg:col-span-2',
  },
  {
    icon: DatabaseZap,
    event: 'Loop 1.0',
    result: 'Top 30',
    project: 'ArogyaTrack',
    note: 'Healthcare tracking and ML forecasting system shaped under rapid prototype constraints.',
    span: 'lg:col-span-2',
  },
  {
    icon: GitBranch,
    event: 'Invasion Hack The Ghost',
    result: 'Top 25',
    project: 'Competitive build',
    note: 'Placed among the top teams through quick product thinking, collaboration, and execution.',
    span: 'lg:col-span-2',
  },
  {
    icon: Sparkles,
    event: 'Maximally Vibe-a-thon',
    result: '175th Internationally',
    project: 'VisionProbe',
    note: 'Global run with VisionProbe, a multi-agent product intelligence and computer vision system.',
    span: 'lg:col-span-4',
  },
  {
    icon: RadioTower,
    event: 'Mumbai Hacks',
    result: 'Finalist',
    project: 'Finalist build',
    note: 'Reached finalist stage by presenting an impact-focused solution under strict deadline pressure.',
    span: 'lg:col-span-2',
  },
]

const firstStrip = projects.slice(0, 5)
const secondStrip = projects.slice(5)

const education = [
  {
    degree: 'B.Tech — Information Technology',
    institution: 'Vidyalankar Institute of Technology',
    university: 'Mumbai University',
    location: 'Mumbai, India',
    period: '2024 — 2028',
    cgpa: '9.67',
    year: '2nd Year',
    type: 'Full-Time',
    focus: 'AI · ML · Full-Stack',
    highlights: [
      'Specialization in AI, ML, and Full-Stack Systems',
      'Active participant in national hackathons and tech competitions',
      'Built 9+ production-grade projects across healthcare, fintech, and developer tooling',
    ],
  },
]

function CustomCursor() {
  const [position, setPosition] = useState({ x: -80, y: -80 })
  const [isVisible, setIsVisible] = useState(false)
  const [clicks, setClicks] = useState([])

  useEffect(() => {
    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY })
      setIsVisible(true)
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`)
    }

    const handlePointerDown = (event) => {
      const isProjectClick = event.target instanceof Element && Boolean(event.target.closest('[data-project-card]'))
      const click = {
        id: `${event.timeStamp}-${event.clientX}-${event.clientY}`,
        x: event.clientX,
        y: event.clientY,
        variant: isProjectClick ? 'project' : 'default',
      }

      setClicks((current) => [...current, click].slice(-8))
      window.setTimeout(() => {
        setClicks((current) => current.filter((item) => item.id !== click.id))
      }, 620)
    }

    const handleLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('pointerdown', handlePointerDown)
    document.documentElement.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <>
      <div
        className={`custom-cursor-ring ${isVisible ? 'cursor-visible' : ''}`}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
      <div
        className={`custom-cursor-dot ${isVisible ? 'cursor-visible' : ''}`}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
      {clicks.map((click) => (
        <div
          key={click.id}
          className={`custom-cursor-click ${click.variant === 'project' ? 'project-click' : ''}`}
          style={{ left: click.x, top: click.y }}
        />
      ))}
    </>
  )
}

function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="hero-halo" />
      <div className="hero-scan" />
      <div className="hero-grid" />

      {/* Large Hacker Character Image */}
      <div className="absolute inset-0 flex items-end justify-center md:justify-end md:pr-[10%] lg:pr-[12%] pointer-events-none mix-blend-lighten opacity-90">
        <img
          src="/static/image1.png"
          alt="Hero Character"
          className="h-[70vh] md:h-[85vh] w-auto max-w-none object-contain grayscale-[0.1] contrast-125"
        />
      </div>
    </div>
  )
}

function BackgroundEnvironment() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Subtle Dust Particles & Scanline */}
      <div className="dynamic-particle-layer" />
      <div className="scanline" />
    </div>
  )
}

function SectionTitle({ eyebrow, title, align = 'left' }) {
  return (
    <div className={`mb-10 flex flex-col gap-3 ${align === 'right' ? 'items-end text-right' : ''}`}>
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#ff4655]">{eyebrow}</p>
      <h2 className="font-valorant text-4xl uppercase leading-none text-paper md:text-6xl">{title}</h2>
    </div>
  )
}

function ProjectTickerCard({ project, onOpen }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen(project)
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      data-project-card
      onClick={() => onOpen(project)}
      onKeyDown={handleKeyDown}
      className="group relative flex h-[320px] w-[330px] shrink-0 flex-col justify-between overflow-hidden border border-paper/10 bg-[#11100f]/90 p-5 text-left shadow-[0_20px_70px_rgba(0,0,0,0.35)] outline-none backdrop-blur transition-colors hover:border-[#ff4655]/45 focus-visible:border-[#ff4655] md:w-[390px]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4655]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute -right-10 -top-10 h-36 w-36 rotate-45 border border-[#ff4655]/20 transition-transform duration-500 group-hover:rotate-[58deg]" />
      <div>
        <div className="mb-6 flex items-start justify-between gap-5">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#ff4655]">{project.category}</p>
            <h3 className="font-valorant text-2xl uppercase leading-tight text-paper transition-colors group-hover:text-white">
              {project.title}
            </h3>
          </div>
          <span className="shrink-0 border border-paper/20 bg-paper/5 px-3 py-2 font-mono text-xs text-paper/80">
            {project.metric}
          </span>
        </div>
        <p className="line-clamp-4 text-sm leading-7 text-paper/70">{project.description}</p>
      </div>
      <div>
        <div className="mb-5 mt-7 flex flex-wrap gap-2">
          {project.tech.slice(0, 5).map((item) => (
            <span key={item} className="border border-paper/10 bg-paper/[0.03] px-2.5 py-1 font-mono text-[11px] text-paper/60">
              {item}
            </span>
          ))}
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-paper transition-colors hover:text-[#ff4655]"
        >
          Repository <ArrowUpRight size={15} />
        </a>
        <span className="ml-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-paper/45 transition-colors group-hover:text-[#ff4655]">
          Open Dossier
        </span>
      </div>
    </article>
  )
}

function ProjectStrip({ items, reverse = false, onOpen }) {
  const repeated = [...items, ...items, ...items]

  return (
    <div className="marquee-row">
      <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
        {repeated.map((project, index) => (
          <ProjectTickerCard key={`${project.title}-${index}`} project={project} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  const dossier = projectDossiers[project.title]

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/78 px-4 py-6 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="presentation"
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-[#ff4655]/35 bg-[#0d0c0b] p-5 shadow-[0_30px_140px_rgba(0,0,0,0.75)] md:p-8"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-paper/15 bg-paper/[0.04] text-paper transition-colors hover:border-[#ff4655] hover:text-[#ff4655]"
        >
          <X size={18} />
        </button>

        <div className="mb-7 flex flex-col gap-5 border-b border-paper/10 pb-7 pr-12 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#ff4655]">{project.category}</p>
            <h3 id="project-modal-title" className="font-valorant text-4xl uppercase leading-none text-paper md:text-6xl">
              {project.title}
            </h3>
          </div>
          <span className="w-fit border border-paper/15 bg-paper/[0.04] px-4 py-3 font-mono text-xs uppercase tracking-[0.22em] text-paper/75">
            {project.metric}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-lg leading-9 text-paper/78">{dossier?.detail || project.description}</p>
            <div className="mt-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-[#ff4655]">Key Highlights</p>
              <div className="space-y-3">
                {(dossier?.highlights || [project.description]).map((item) => (
                  <div key={item} className="border border-paper/10 bg-paper/[0.035] p-4 text-sm leading-7 text-paper/70">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="border border-paper/10 bg-paper/[0.035] p-5">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-[#ff4655]">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span key={item} className="border border-paper/10 bg-ink/40 px-3 py-2 font-mono text-[11px] text-paper/65">
                  {item}
                </span>
              ))}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-[#ff4655] px-5 py-4 font-valorant text-sm uppercase tracking-[0.24em] text-white transition-transform hover:-translate-y-1"
            >
              Open Repo <ArrowUpRight size={17} />
            </a>
          </aside>
        </div>
      </motion.article>
    </motion.div>
  )
}

// Global Haptics Hook for mobile devices
function useGlobalHaptics() {
  useEffect(() => {
    const handleInteraction = (e) => {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        // Find if we clicked on or inside an interactive element
        const target = e.target.closest('a, button, [role="button"], .cursor-pointer');
        if (target) {
          // Trigger a light haptic feedback tap (15ms)
          navigator.vibrate(15);
        }
      }
    };
    
    // pointerdown provides immediate feedback as soon as the user touches the screen
    document.addEventListener('pointerdown', handleInteraction, { passive: true });
    
    return () => {
      document.removeEventListener('pointerdown', handleInteraction);
    };
  }, []);
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  useGlobalHaptics()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }

    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

  return (
    <>
      <BackgroundEnvironment />
      <main className="relative z-10 min-h-screen overflow-x-hidden text-paper selection:bg-[#ff4655] selection:text-white">
        <CustomCursor />
        <AnimatePresence>
          {selectedProject ? <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} /> : null}
        </AnimatePresence>

        <div className="fixed inset-0 -z-10 bg-paper-noise" />
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(245,239,226,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(245,239,226,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <nav className="fixed inset-x-0 top-0 z-50 border-b border-paper/10 bg-ink/80 px-5 py-4 backdrop-blur-xl md:px-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <a href="#top" className="font-valorant text-2xl uppercase tracking-[0.28em] text-paper">
              AM<span className="text-[#ff4655]">.</span>
            </a>
            <div className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.24em] text-paper/60 md:flex">
              <a className="hover:text-paper" href="#about">
                About
              </a>
              <a className="hover:text-paper" href="#education">
                Education
              </a>
              <a className="hover:text-paper" href="#systems">
                Skills
              </a>
              <a className="hover:text-paper" href="#work">
                Work
              </a>
              <a className="hover:text-paper" href="#record">
                Achievements
              </a>
              <a className="hover:text-paper" href="#contact">
                Contact
              </a>
            </div>
          </div>
        </nav>

        <section id="top" className="relative min-h-[100svh] px-5 pt-28 md:px-10">
          <HeroBackdrop />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_35%_45%,transparent_0%,rgba(7,7,6,0.24)_48%,rgba(7,7,6,0.9)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-7rem)] max-w-7xl items-center pb-20">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="h-px w-14 bg-[#ff4655]" />
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#ff4655]">Ink Protocol / Online</span>
              </div>

              <h1 className="max-w-6xl font-valorant text-[4rem] uppercase leading-[0.82] tracking-wide text-paper sm:text-[5.8rem] md:text-[7.4rem] lg:text-[9rem]">
                Aashutosh
                <span className="block text-transparent [-webkit-text-stroke:1.5px_#ff4655]">Mahajan</span>
              </h1>

              <p className="mt-8 max-w-2xl font-scifi text-lg leading-8 text-paper/75 md:text-xl">
                AI and backend engineer building multi-agent systems, ML pipelines, and production-grade full-stack products under real hackathon pressure.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-3 bg-[#ff4655] px-7 py-4 font-valorant text-sm uppercase tracking-[0.28em] text-white transition-transform hover:-translate-y-1"
                >
                  View Work <ArrowUpRight size={18} />
                </a>
                <a
                  href="mailto:aashutoshmahajan.2007@gmail.com"
                  className="inline-flex items-center justify-center gap-3 border border-paper/20 bg-paper/[0.04] px-7 py-4 font-valorant text-sm uppercase tracking-[0.28em] text-paper transition-colors hover:border-paper/50"
                >
                  Contact <Mail size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="relative px-5 py-24 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-4 -top-4 h-full w-full border border-[#ff4655]/35" />
              <div className="group relative overflow-hidden border border-paper/12 bg-paper/[0.035] p-3">
                <img
                  src="/static/image2.jpeg"
                  alt="Aashutosh Mahajan portrait"
                  className="aspect-[4/5] w-full object-cover grayscale contrast-125 transition duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:saturate-125"
                />
                <div className="absolute inset-3 bg-[linear-gradient(180deg,transparent_50%,rgba(7,7,6,0.82))]" />
                <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between border-t border-paper/15 pt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-paper/70">
                  <span>Portrait / AM</span>
                  <span className="text-[#ff4655]">Mumbai</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionTitle eyebrow="01 / About Me" title="Builder At The Edge" />
              <p className="max-w-3xl text-lg leading-9 text-paper/75">
                I am a B.Tech Information Technology student at Vidyalankar Institute of Technology, Mumbai, working at the intersection of backend systems, machine learning, and agentic AI. I like building products that feel sharp on the surface and hold serious engineering underneath.
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-9 text-paper/68">
                My projects span healthcare platforms, financial AI agents, blockchain-based carbon-credit systems, developer tooling, and multilingual audio AI. I am especially drawn to systems that combine fast product execution with clean architecture.
              </p>
              <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map(([value, label]) => (
                  <div key={label} className="border border-paper/10 bg-paper/[0.035] p-4">
                    <p className="font-valorant text-4xl text-paper">{value}</p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Education ── */}
        <section id="education" className="relative px-5 py-24 md:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="02 / Academic Record" title="Education" />
            <div className="grid gap-6">
              {education.map((edu, idx) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative overflow-hidden border border-paper/10 bg-[#11100f]/80 p-8"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4655]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute -right-10 -top-10 h-40 w-40 rotate-45 border border-[#ff4655]/15 transition-transform duration-500 group-hover:rotate-[58deg]" />
                  <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto]">

                    {/* Left: main info + highlights */}
                    <div>
                      <div className="mb-6 flex items-start gap-4">
                        <div className="border border-paper/10 bg-paper/[0.04] p-3 text-[#ff4655]">
                          <GraduationCap size={28} />
                        </div>
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-paper/45">{edu.location} · {edu.university}</p>
                          <h3 className="mt-1 font-valorant text-3xl uppercase leading-tight text-paper">{edu.institution}</h3>
                          <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-[#ff4655]">{edu.degree}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {edu.highlights.map((h) => (
                          <div key={h} className="flex items-start gap-3 border border-paper/10 bg-paper/[0.025] px-4 py-3">
                            <span className="mt-2.5 h-1 w-1 shrink-0 bg-[#ff4655]" />
                            <p className="text-sm leading-7 text-paper/65">{h}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: stats panel */}
                    <div className="flex flex-col gap-4 lg:min-w-[180px]">
                      {[
                        { label: 'CGPA', value: edu.cgpa },
                        { label: 'Period', value: edu.period },
                        { label: 'Focus', value: edu.focus },
                      ].map(({ label, value }) => (
                        <div key={label} className="border border-paper/10 bg-paper/[0.035] px-5 py-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/40">{label}</p>
                          <p className="mt-1 font-valorant text-lg uppercase text-paper">{value}</p>
                        </div>
                      ))}
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="systems" className="relative px-5 py-24 md:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="03 / System Identity" title="Skills Matrix" />
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {skillGroups.map(({ title, icon: Icon, skills }, i) => {
                const bentoClasses = [
                  "sm:col-span-2 md:col-span-2", // Row 1: Left half
                  "sm:col-span-2 md:col-span-2", // Row 1: Right half
                  "sm:col-span-1 md:col-span-2 lg:col-span-1", // Row 2: 1/4 width
                  "sm:col-span-1 md:col-span-2 lg:col-span-1", // Row 2: 1/4 width
                  "sm:col-span-2 md:col-span-4 lg:col-span-2"  // Row 2: 1/2 width
                ];

                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`group relative overflow-hidden border border-paper/10 bg-[#11100f]/80 p-8 flex flex-col transition-all hover:bg-[#11100f] hover:border-[#ff4655]/30 ${bentoClasses[i]}`}
                  >
                    {/* Background Icon Watermark */}
                    <div className="absolute -right-8 -top-8 z-0 opacity-[0.02] transition-transform duration-700 group-hover:scale-110 group-hover:opacity-[0.05] pointer-events-none">
                      <Icon size={180} />
                    </div>

                    <div className="relative z-10 mb-8 flex items-center gap-4">
                      <Icon size={28} className="text-[#ff4655] shrink-0" />
                      <h3 className="font-valorant text-2xl uppercase leading-tight text-paper">{title}</h3>
                    </div>
                    <div className="relative z-10 flex flex-wrap gap-2.5 mt-auto">
                      {skills.map((skill) => (
                        <span key={skill} className="bg-paper/[0.045] px-3.5 py-2 font-mono text-xs text-paper/70 backdrop-blur-sm border border-paper/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="work" className="py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <SectionTitle eyebrow="04 / Archive" title="Projects" align="right" />
          </div>
          <div className="space-y-6 overflow-hidden">
            <ProjectStrip items={firstStrip} onOpen={setSelectedProject} />
            <ProjectStrip items={secondStrip} reverse onOpen={setSelectedProject} />
          </div>
        </section>

        <section id="record" className="px-5 py-24 md:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="05 / Competitive Proof" title="Achievements" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              {achievements.map(({ icon: Icon, event, result, project, note, span, featured }) => (
                <motion.div
                  key={event}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`group relative overflow-hidden border border-paper/10 bg-[#11100f]/85 p-6 transition-colors hover:border-[#ff4655]/50 md:p-7 ${span}`}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4655]/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="border border-paper/10 bg-paper/[0.04] p-3 text-[#ff4655]">
                        <Icon size={featured ? 34 : 26} />
                      </div>
                      <span className="max-w-[11rem] text-right font-mono text-xs uppercase leading-5 tracking-[0.18em] text-[#ff4655]">
                        {result}
                      </span>
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.24em] text-paper/45">{project}</p>
                      <h3 className={`mt-3 font-valorant uppercase leading-none text-paper ${featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
                        {event}
                      </h3>
                      <p className="mt-4 leading-7 text-paper/68 text-sm">{note}</p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -bottom-24 -right-20 h-52 w-52 border border-[#ff4655]/10 bg-[#ff4655]/[0.035] rotate-45 transition-transform duration-500 group-hover:scale-125" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 py-28 md:px-10">
          <div className="mx-auto max-w-5xl border border-[#ff4655]/25 bg-[#11100f]/90 p-7 text-center shadow-[0_30px_120px_rgba(255,70,85,0.08)] md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#ff4655]">06 / Dispatch</p>
            <h2 className="mx-auto mt-5 max-w-3xl font-valorant text-4xl uppercase leading-none text-paper md:text-7xl">
              Build the next intelligent system
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-paper/70">
              Open to AI engineering, backend architecture, full-stack products, and hackathon-grade prototypes that need both speed and taste.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="mailto:aashutoshmahajan.2007@gmail.com"
                className="inline-flex items-center justify-center gap-3 bg-paper px-6 py-4 font-valorant text-sm uppercase tracking-[0.24em] text-ink transition-transform hover:-translate-y-1"
              >
                <Mail size={18} /> Email
              </a>
              <a
                href="https://github.com/Aashutosh-Mahajan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-paper/20 px-6 py-4 font-valorant text-sm uppercase tracking-[0.24em] text-paper hover:border-paper/50"
              >
                <GitBranch size={18} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/aashutosh-mahajan/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-paper/20 px-6 py-4 font-valorant text-sm uppercase tracking-[0.24em] text-paper hover:border-paper/50"
              >
                <RadioTower size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-paper/10 px-5 py-8 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50">
          Aashutosh Mahajan / 2026 / AI + Backend Systems
        </footer>
      </main>
    </>
  )
}
