import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Live GitHub contribution calendar. GitHub only exposes this to authenticated clients, so the
// data comes from the public jogruber.de proxy (CORS-enabled, refreshed from GitHub).
const API = 'https://github-contributions-api.jogruber.de/v4'

const dayFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
const monthFmt = new Intl.DateTimeFormat('en-GB', { month: 'short' })
const parse = (iso) => new Date(`${iso}T00:00:00`)

function analyse(days) {
  // weeks start on Sunday, matching GitHub's own calendar
  const lead = parse(days[0].date).getDay()
  const cells = [...Array(lead).fill(null), ...days]
  const weeks = Math.ceil(cells.length / 7)

  const months = []
  let lastCol = -4
  days.forEach((d, i) => {
    const date = parse(d.date)
    const col = Math.floor((i + lead) / 7)
    // skip a label that would be clipped at the right edge
    if (date.getDate() === 1 && col - lastCol >= 3 && col <= weeks - 3) {
      months.push({ col, label: monthFmt.format(date) })
      lastCol = col
    }
  })

  let best = days[0]
  days.forEach((d) => {
    if (d.count > best.count) best = d
  })

  let longest = 0
  let run = 0
  days.forEach((d) => {
    run = d.count > 0 ? run + 1 : 0
    longest = Math.max(longest, run)
  })

  // current streak: count back from today; an empty "today" does not break it yet
  let current = 0
  let i = days.length - 1
  if (days[i].count === 0) i -= 1
  while (i >= 0 && days[i].count > 0) {
    current += 1
    i -= 1
  }

  return { cells, weeks, months, best, longest, current }
}

export default function ActivityGraph({ user }) {
  const [state, setState] = useState({ status: 'loading', days: [], total: 0, at: null })
  const [hot, setHot] = useState(null)
  const ref = useRef(null)
  const scroller = useRef(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  const load = useCallback(
    (signal) => {
      fetch(`${API}/${user}?y=last`, { signal })
        .then((r) => {
          if (!r.ok) throw new Error(String(r.status))
          return r.json()
        })
        .then((d) => {
          if (!d.contributions?.length) throw new Error('empty')
          const total = d.contributions.reduce((n, x) => n + x.count, 0)
          setState({ status: 'ready', days: d.contributions, total, at: new Date() })
        })
        .catch((e) => {
          if (e.name !== 'AbortError') setState((s) => (s.status === 'ready' ? s : { ...s, status: 'error' }))
        })
    },
    [user],
  )

  // live: load now, every 5 minutes, and whenever the tab becomes visible again
  useEffect(() => {
    const ctl = new AbortController()
    load(ctl.signal)
    const id = window.setInterval(() => load(ctl.signal), 5 * 60 * 1000)
    const onVis = () => document.visibilityState === 'visible' && load(ctl.signal)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      ctl.abort()
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [load])

  const info = useMemo(() => (state.status === 'ready' ? analyse(state.days) : null), [state])

  // on narrow screens the grid scrolls sideways: open on the most recent weeks
  useEffect(() => {
    if (info && scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth
  }, [info])
  const profile = `https://github.com/${user}`

  return (
    <div className="act" ref={ref} data-in={seen}>
      <div className="act-head">
        <p className="act-total">
          {info ? (
            <>
              <span>{state.total.toLocaleString('en-US')}</span> contributions in the last year
            </>
          ) : state.status === 'error' ? (
            'Live contribution data is unavailable right now.'
          ) : (
            'Loading contributions'
          )}
        </p>
        <a className="mono u" href={profile} target="_blank" rel="noreferrer">
          View on GitHub
        </a>
      </div>

      <div className="act-scroll" ref={scroller}>
        <div className="act-inner" style={{ '--weeks': info ? info.weeks : 53 }}>
          <div className="act-months mono" aria-hidden="true">
            {info?.months.map((m) => (
              <span key={m.col} style={{ gridColumn: m.col + 1 }}>
                {m.label}
              </span>
            ))}
          </div>
          <div
            className="act-grid"
            data-loading={!info}
            role="img"
            aria-label={info ? `${state.total} GitHub contributions in the last year` : 'GitHub contribution graph'}
            onMouseLeave={() => setHot(null)}
          >
            {info
              ? info.cells.map((d, i) =>
                  d ? (
                    <span
                      key={d.date}
                      className="cell"
                      data-l={d.level}
                      style={{ '--i': Math.floor(i / 7) }}
                      onMouseEnter={() => setHot(d)}
                    />
                  ) : (
                    <span key={`pad-${i}`} className="cell" data-l="pad" />
                  ),
                )
              : Array.from({ length: 53 * 7 }, (_, i) => <span key={i} className="cell" data-l="0" />)}
          </div>
        </div>
      </div>

      <div className="act-foot mono">
        <span className="act-readout" aria-live="polite">
          {hot ? `${dayFmt.format(parse(hot.date))}: ${hot.count} ${hot.count === 1 ? 'contribution' : 'contributions'}` : info ? `Live from GitHub, updated ${state.at.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}` : ''}
        </span>
        <span className="act-legend" aria-hidden="true">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <i key={l} className="cell" data-l={l} />
          ))}
          More
        </span>
      </div>

      {info && (
        <dl className="act-stats">
          <div>
            <dt className="mono">Current streak</dt>
            <dd>
              {info.current} {info.current === 1 ? 'day' : 'days'}
            </dd>
          </div>
          <div>
            <dt className="mono">Longest streak</dt>
            <dd>
              {info.longest} {info.longest === 1 ? 'day' : 'days'}
            </dd>
          </div>
          <div>
            <dt className="mono">Busiest day</dt>
            <dd>{info.best.count} contributions</dd>
          </div>
        </dl>
      )}
    </div>
  )
}
