import { lazy, Suspense, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Name from './Name'
import ActivityGraph from './ActivityGraph'
import Cursor from './Cursor'

const Orb = lazy(() => import('./Orb'))
import { achievements, alsoWorkingWith, education, flagshipIds, links, projects, skillGroups } from './data'

const INK = { light: '#0a0a0a', dark: '#f1f1ee' }

const order = [
  ...flagshipIds.map((id) => projects.find((p) => p.id === id)),
  ...projects.filter((p) => !flagshipIds.includes(p.id)).sort((a, b) => b.startDate - a.startDate),
]

const spring = { type: 'spring', stiffness: 420, damping: 38, mass: 0.8 }

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') return saved
    } catch {
      /* storage unavailable */
    }
    return 'light'
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage unavailable */
    }
  }, [theme])

  const toggle = (e) => {
    const next = theme === 'light' ? 'dark' : 'light'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) {
      setTheme(next)
      return
    }
    const r = e?.currentTarget?.getBoundingClientRect()
    const x = r ? r.left + r.width / 2 : window.innerWidth - 40
    const y = r ? r.top + r.height / 2 : 40
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const t = document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })
    t.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 800, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
      .catch(() => {})
  }
  return [theme, toggle]
}

function GlassDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <filter id="lg" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.011 0.019" numOctaves="2" seed="4" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="12" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}

function Pane({ id }) {
  return (
    <motion.span
      layoutId={id}
      className="glass-pane"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.22 } }}
      transition={spring}
      aria-hidden="true"
    />
  )
}

const navItems = [
  ['about', 'about'],
  ['skills', 'skills'],
  ['work', 'projects'],
  ['achievements', 'achievements'],
  ['contact', 'contact'],
]

function Header({ theme, onToggle }) {
  const [active, setActive] = useState(null)
  const [hover, setHover] = useState(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === 'top' ? null : e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['top', ...navItems.map(([id]) => id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const lens = hover ?? active
  const lensEl = <motion.span layoutId="lens" className="lens" transition={spring} />

  return (
    <header className="bar">
      <a href="#top" className="bar-mark glass mono" aria-label="Aashutosh Mahajan, top of page">
        AM
      </a>
      <nav className="bar-nav glass mono" aria-label="Sections" onMouseLeave={() => setHover(null)}>
        <LayoutGroup id="nav">
          {navItems.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onMouseEnter={() => setHover(id)}
              onFocus={() => setHover(id)}
              onBlur={() => setHover(null)}
              data-on={lens === id}
            >
              {lens === id && lensEl}
              <span>{label}</span>
            </a>
          ))}
          <button
            type="button"
            onClick={onToggle}
            onMouseEnter={() => setHover('invert')}
            onFocus={() => setHover('invert')}
            onBlur={() => setHover(null)}
            aria-pressed={theme === 'dark'}
            data-on={lens === 'invert'}
          >
            {lens === 'invert' && lensEl}
            <span>invert</span>
          </button>
        </LayoutGroup>
      </nav>
    </header>
  )
}

function useMedia(query) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

const mumbaiTime = () =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }).format(new Date())

function Hero({ theme }) {
  const [status, setStatus] = useState('loading')
  const [time, setTime] = useState(mumbaiTime)
  const [layout, setLayout] = useState(null)
  const slot = useMedia('(max-width: 799px) and (min-height: 700px)')
  const narrow = useMedia('(max-width: 799px)')
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70])
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0.15])

  useEffect(() => {
    const id = window.setInterval(() => setTime(mumbaiTime()), 20000)
    return () => window.clearInterval(id)
  }, [])

  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  // fill the space the name leaves free on wide screens; hide when there is no room
  let orb = null
  if (layout) {
    const free = layout.w - layout.textW - 64
    if (free >= 230) {
      const size = Math.min(free - 28, layout.h * 0.82)
      orb = { size, bottom: layout.h * 0.14 }
    }
  }

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero-top mono">
        <span>AI and backend engineer</span>
        <span>Mumbai, {time} IST</span>
      </div>
      <h1 className={status === 'fail' ? 'hero-fallback' : 'sr'}>
        Aashutosh
        <br />
        Mahajan
      </h1>
      {slot && (
        <div className="hero-slot" aria-hidden="true">
          <Suspense fallback={null}>
            <Orb reduce={Boolean(reduce)} visible={visible} theme={theme} />
          </Suspense>
        </div>
      )}
      <motion.div className="hero-stage" style={{ y, opacity: fade }}>
        {status !== 'fail' && <Name lines={['Aashutosh', 'Mahajan']} ink={INK[theme]} onStatus={setStatus} onLayout={setLayout} />}
        {orb && !narrow && (
          <div className="hero-orb" style={{ width: orb.size, height: orb.size, bottom: orb.bottom }}>
            <Suspense fallback={null}>
              <Orb reduce={Boolean(reduce)} visible={visible} theme={theme} />
            </Suspense>
          </div>
        )}
      </motion.div>
      <div className="hero-info">
        <div>
          <p className="mono">Recent</p>
          <p>Lunar Mission Simulator, PRISM, AUDITA and Weaver.</p>
        </div>
        <div>
          <p className="mono">Recognition</p>
          <p>25+ hackathons, 6 national finals and rank 324 of 1,983 at HackerRank Orchestrate.</p>
        </div>
        <div>
          <p className="mono">Elsewhere</p>
          <p className="hero-links">
            <a href={`mailto:${links.email}`} className="u">
              Email
            </a>
            <a href={links.github} target="_blank" rel="noreferrer" className="u">
              GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="u">
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

function Row({ p, open, onToggle, i, hovered, onHover }) {
  const reduce = useReducedMotion()
  return (
    <motion.li
      className="row"
      data-open={open}
      onMouseEnter={onHover}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay: Math.min(i, 5) * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence>{hovered && <Pane id="glass-work" />}</AnimatePresence>
      <button
        type="button"
        className="row-head"
        aria-expanded={open}
        aria-controls={`d-${p.id}`}
        onClick={onToggle}
        onFocus={onHover}
      >
        <span className="row-title">{p.title}</span>
        <span className="row-meta mono">
          <span className="row-cat">{p.category}</span>
          <span>{p.startDate.getFullYear()}</span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`d-${p.id}`}
            className="row-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="row-inner">
              <p className="row-detail">{p.detail}</p>
              <ul className="row-points">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="row-tech mono">{p.tech.join(', ')}</p>
              <p className="row-links">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="u">
                    Open live
                  </a>
                )}
                <a href={p.github} target="_blank" rel="noreferrer" className="u">
                  Source
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

function Work() {
  const [open, setOpen] = useState(null)
  const [hover, setHover] = useState(null)
  return (
    <section id="work" className="block">
      <h2 className="label mono">
        Projects <span>{order.length}</span>
      </h2>
      <div className="work-main">
      <ActivityGraph user={links.github.split('/').pop()} />
      <LayoutGroup id="work">
        <ul className="rows" onMouseLeave={() => setHover(null)}>
          {order.map((p, i) => (
            <Row
              key={p.id}
              p={p}
              i={i}
              open={open === p.id}
              hovered={hover === p.id}
              onHover={() => setHover(p.id)}
              onToggle={() => setOpen(open === p.id ? null : p.id)}
            />
          ))}
        </ul>
      </LayoutGroup>
      </div>
    </section>
  )
}

const norm = (s) => s.toLowerCase()

function Skills() {
  const [hot, setHot] = useState(null)
  const groups = useMemo(
    () =>
      skillGroups.map((g) => ({
        title: g.title,
        rows: g.skills
          .map((name) => ({ name, users: projects.filter((p) => p.tech.some((t) => norm(t) === norm(name))) }))
          .filter((r) => r.users.length)
          .sort((a, b) => b.users.length - a.users.length),
      })),
    [],
  )
  return (
    <section id="skills" className="block">
      <h2 className="label mono">Skills</h2>
      <div className="skills">
        <p className="skills-note mono">Weight shows how many projects used it.</p>
        {groups.map((g) => (
          <div key={g.title} className="skill-group">
            <h3 className="mono">{g.title}</h3>
            <p>
              {g.rows.map((r) => (
                <span
                  key={r.name}
                  className="skill"
                  tabIndex={0}
                  style={{ '--w': r.users.length }}
                  onMouseEnter={() => setHot(r)}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot(r)}
                  onBlur={() => setHot(null)}
                >
                  {r.name}
                </span>
              ))}
            </p>
          </div>
        ))}
        <p className="skills-also mono">Also working with {alsoWorkingWith.join(', ')}.</p>
        <div className="skill-dock glass" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={hot ? hot.name : 'idle'}
              initial={{ opacity: 0, y: 6, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(5px)' }}
              transition={{ duration: 0.22 }}
            >
              {hot ? (
                <>
                  <strong>{hot.name}</strong> shipped in {hot.users.map((u) => u.title).join(', ')}.
                </>
              ) : (
                'Hover a skill to see where it shipped.'
              )}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Awards() {
  return (
    <section id="achievements" className="block">
      <h2 className="label mono">Achievements</h2>
      <ul className="awards">
        {achievements.map((a) => (
          <li key={a.event}>
            <span className="aw-event">{a.event}</span>
            <span className="aw-project">{a.project ?? 'Team build'}</span>
            <span className="aw-result">{a.result}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Portrait() {
  const [view, setView] = useState({ on: false, x: 50, y: 50 })
  const click = (e) => {
    if (view.on) {
      setView((v) => ({ ...v, on: false }))
      return
    }
    const r = e.currentTarget.getBoundingClientRect()
    setView({ on: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }
  return (
    <figure className="frame">
      <button
        type="button"
        className="frame-pic"
        aria-pressed={view.on}
        aria-label={view.on ? 'Portrait of Aashutosh Mahajan in colour. Click for black and white.' : 'Portrait of Aashutosh Mahajan in black and white. Click for colour.'}
        onClick={click}
      >
        <img className="frame-base" src="/static/image2.jpeg" alt="" width="1496" height="1496" loading="lazy" />
        <img
          className="frame-color"
          src="/static/image2.jpeg"
          alt=""
          width="1496"
          height="1496"
          loading="lazy"
          style={{ clipPath: `circle(${view.on ? 150 : 0}% at ${view.x}% ${view.y}%)` }}
        />
      </button>
      <figcaption className="mono">
        <span>Mumbai</span>
        <span>{view.on ? 'Back to mono' : 'Click for colour'}</span>
      </figcaption>
    </figure>
  )
}

function About() {
  return (
    <section id="about" className="block">
      <h2 className="label mono">About</h2>
      <div className="about">
        <Portrait />
        <div>
          <p className="about-lead">
            B.Tech student in Mumbai and 25+ hackathon participant. I build agentic workflows, ML systems and backend services.
          </p>
          <dl className="about-facts">
            <div>
              <dt className="mono">Degree</dt>
              <dd>{education.degree}</dd>
            </div>
            <div>
              <dt className="mono">College</dt>
              <dd>{education.institution}</dd>
            </div>
            <div>
              <dt className="mono">Years</dt>
              <dd>2024 to 2028</dd>
            </div>
            <div>
              <dt className="mono">CGPA</dt>
              <dd>{education.cgpa}</dd>
            </div>
            <div>
              <dt className="mono">Finals</dt>
              <dd>6 national finals</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

const contactRows = [
  { label: 'Email', text: links.email, href: `mailto:${links.email}` },
  { label: 'GitHub', text: 'github.com/Aashutosh-Mahajan', href: links.github },
  { label: 'LinkedIn', text: 'linkedin.com/in/aashutosh-mahajan', href: links.linkedin },
]

function Contact() {
  const [hover, setHover] = useState(null)
  const reduce = useReducedMotion()
  return (
    <section id="contact" className="block contact">
      <h2 className="label mono">Contact</h2>
      <LayoutGroup id="reach">
        <ul className="reach" onMouseLeave={() => setHover(null)}>
          {contactRows.map((r) => (
            <li key={r.label} onMouseEnter={() => setHover(r.label)}>
              <AnimatePresence>{hover === r.label && <Pane id="glass-reach" />}</AnimatePresence>
              <a
                href={r.href}
                target={r.label === 'Email' ? undefined : '_blank'}
                rel="noreferrer"
                className="reach-link"
                onFocus={() => setHover(r.label)}
                onBlur={() => setHover(null)}
              >
                <span className="reach-label mono">{r.label}</span>
                <span className="reach-text">{r.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </LayoutGroup>
      <motion.figure
        className="quote"
        initial={reduce ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <blockquote>
          <p>Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.</p>
        </blockquote>
        <figcaption className="mono">Antoine de Saint-Exupéry</figcaption>
      </motion.figure>
      <footer className="foot mono">
        <span>Aashutosh Mahajan, 2026</span>
        <a href="https://github.com/Aashutosh-Mahajan/Portfolio" target="_blank" rel="noreferrer" className="u">
          source
        </a>
      </footer>
    </section>
  )
}

export default function App() {
  const [theme, toggle] = useTheme()
  return (
    <>
      <GlassDefs />
      <Cursor />
      <Header theme={theme} onToggle={toggle} />
      <main>
        <Hero theme={theme} />
        <About />
        <Skills />
        <Work />
        <Awards />
        <Contact />
      </main>
    </>
  )
}
