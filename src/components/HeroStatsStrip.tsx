import { BriefcaseBusiness, Clock, MapPin, ShieldCheck, UsersRound, type LucideIcon } from 'lucide-react'

type StatItem = {
  icon: LucideIcon
  value: string
  label: string
}

const stats: StatItem[] = [
  { icon: ShieldCheck, value: '97%', label: 'taxa de adaptação' },
  { icon: Clock, value: 'até 24h', label: 'tempo de resposta' },
  { icon: UsersRound, value: '3 a 5', label: 'finalistas por processo' },
  { icon: MapPin, value: 'JP', label: 'João Pessoa e região' },
  { icon: BriefcaseBusiness, value: 'B2B', label: 'recrutamento consultivo' },
]

export default function HeroStatsStrip() {
  const marqueeStats = [...stats, ...stats, ...stats]
  const renderStat = (item: StatItem, index: number) => {
    const Icon = item.icon

    return (
      <div className="hero-stats-item" key={`${item.value}-${item.label}-${index}`}>
        <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
        <strong>{item.value}</strong>
        <span>{item.label}</span>
      </div>
    )
  }

  return (
    <section className="hero-stats-strip" aria-label="Indicadores da Porto Talent">
      <div className="hero-stats-viewport">
        <div className="hero-stats-track">
          <div className="hero-stats-group">
            {marqueeStats.map(renderStat)}
          </div>
          <div className="hero-stats-group" aria-hidden="true">
            {marqueeStats.map(renderStat)}
          </div>
        </div>
      </div>

      <style>{`
        .hero-stats-strip {
          background: var(--bege);
          border-top: 1px solid rgba(14,14,14,0.08);
          border-bottom: 1px solid rgba(14,14,14,0.08);
          overflow: hidden;
        }

        .hero-stats-viewport {
          overflow: hidden;
          width: 100%;
          background: rgba(14,14,14,0.08);
        }

        .hero-stats-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: hero-stats-marquee 42s linear infinite;
        }

        .hero-stats-viewport:hover .hero-stats-track {
          animation-play-state: paused;
        }

        .hero-stats-group {
          display: flex;
          flex: 0 0 auto;
          gap: 1px;
        }

        .hero-stats-item {
          min-height: 88px;
          width: 236px;
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-areas:
            "icon value"
            "icon label";
          align-content: center;
          column-gap: 12px;
          row-gap: 2px;
          padding: 18px 22px;
          background: rgba(255,255,255,0.28);
          color: var(--preto);
        }

        .hero-stats-item svg {
          grid-area: icon;
          align-self: center;
          color: var(--dourado);
        }

        .hero-stats-item strong {
          grid-area: value;
          font-family: var(--font-serif);
          font-size: clamp(24px, 2.4vw, 34px);
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0;
        }

        .hero-stats-item span {
          grid-area: label;
          font-family: var(--font-sans);
          font-size: 12px;
          line-height: 1.35;
          color: var(--cinza-escuro);
        }

        @keyframes hero-stats-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 1024px) {
          .hero-stats-track { animation-duration: 34s; }
          .hero-stats-item { width: 210px; }
        }

        @media (max-width: 768px) {
          .hero-stats-item {
            min-height: 76px;
            width: 192px;
            padding: 14px 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-stats-track { animation: none; }
        }
      `}</style>
    </section>
  )
}
