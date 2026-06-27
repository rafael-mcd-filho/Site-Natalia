import { Mail, MapPin, Phone } from 'lucide-react'

const navLinks = ['Início', 'Serviços', 'Processo', 'Depoimentos', 'Contato', 'Para candidatos']
const navHrefs = ['#inicio', '#servicos', '#processo', '#depoimentos', '#contato', '#candidatos']
const whatsappHref = 'https://wa.me/558387523450'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--preto)', color: 'var(--bege)', paddingTop: 80 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr', gap: 48 }} className="footer-grid">

          {/* Coluna 1 — Marca */}
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, color: 'var(--bege)', marginBottom: 16 }}>
              Porto Talent
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, color: 'rgba(242,230,216,0.7)', fontStyle: 'italic' }}>
              Recrutamento estratégico para empresas que querem acertar.
            </p>
          </div>

          {/* Coluna 2 — Navegação */}
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,230,216,0.5)', marginBottom: 20 }}>
              NAVEGUE
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map((l, i) => (
                <a key={l} href={navHrefs[i]} className="footer-link">{l}</a>
              ))}
            </div>
          </div>

          {/* Coluna 3 — Contato */}
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,230,216,0.5)', marginBottom: 20 }}>
              CONTATO
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                {
                  icon: <Phone size={16} strokeWidth={1.5} aria-hidden="true" />,
                  text: '(83) 8752-3450', href: whatsappHref,
                },
                {
                  icon: <Mail size={16} strokeWidth={1.5} aria-hidden="true" />,
                  text: 'atendimento@portotalentconsultoria.com', href: 'mailto:atendimento@portotalentconsultoria.com',
                },
                {
                  icon: <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />,
                  text: 'João Pessoa / PB', href: '#',
                },
              ].map(c => (
                <a key={c.text} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="footer-link" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0, color: c.href === whatsappHref ? '#25D366' : undefined }}>{c.icon}</span>
                  <span>{c.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 4 — Redes */}
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,230,216,0.5)', marginBottom: 20 }}>
              REDES
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              {[
                {
                  label: 'Instagram', href: '#',
                  icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
                },
                {
                  label: 'LinkedIn', href: '#',
                  icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                },
              ].map(s => (
                <a
                  key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label} className="social-icon"
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    border: '1px solid rgba(242,230,216,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--bege)', transition: 'border-color 0.25s, transform 0.25s',
                    textDecoration: 'none',
                  }}
                >{s.icon}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div style={{ marginTop: 64 }}>
          <div style={{ height: 1, background: 'rgba(184,147,90,0.4)', marginBottom: 32 }} />
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingBottom: 40, flexWrap: 'wrap', gap: 12,
          }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(242,230,216,0.5)' }}>
              © 2026 Porto Talent. Todos os direitos reservados.
            </p>
            <div style={{ display: 'flex', gap: 24 }}>
              {[
                { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
                { label: 'Termos de Uso', href: '/termos-de-uso' },
              ].map(link => (
                <a key={link.href} href={link.href} className="footer-link" style={{ fontSize: 13 }}>{link.label}</a>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(242,230,216,0.4)' }}>
              Desenvolvido por Plugue MKT
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          font-family: var(--font-sans); font-size: 14px; font-weight: 400;
          color: rgba(242,230,216,0.65); text-decoration: none; cursor: pointer;
          transition: color 0.25s;
          position: relative;
        }
        .footer-link::after {
          content: ''; position: absolute; bottom: -1px; left: 0;
          width: 0; height: 1px; background: var(--bege);
          transition: width 0.25s var(--ease-out);
        }
        .footer-link:hover { color: var(--bege); }
        .footer-link:hover::after { width: 100%; }
        .social-icon:hover { border-color: var(--dourado) !important; transform: rotate(5deg) !important; }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
