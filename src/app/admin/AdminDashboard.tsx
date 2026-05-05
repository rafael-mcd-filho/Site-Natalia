'use client'

import type { FormEvent, ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Building2,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Lock,
  LogOut,
  Mail,
  MessageCircle,
  RefreshCcw,
  Search,
  UserRound,
  X,
} from 'lucide-react'
import { trackEvent } from '@/lib/tracking'
import styles from './AdminDashboard.module.css'

type Tab = 'candidatos' | 'empresas'

type BaseLead = {
  id?: string
  created_at?: string
  updated_at?: string
  nome?: string | null
  email?: string | null
  whatsapp?: string | null
  status?: string | null
}

type EmpresaLead = BaseLead & {
  empresa?: string | null
  vaga?: string | null
  prazo?: string | null
  mensagem?: string | null
}

type CandidatoLead = BaseLead & {
  cidade_estado?: string | null
  area_atuacao?: string | null
  cargo_atual?: string | null
  experiencia?: string | null
  pretensao_salarial?: string | null
  linkedin?: string | null
  cv_url?: string | null
  cv_nome?: string | null
}

type LeadsResponse = {
  candidatos: CandidatoLead[]
  empresas: EmpresaLead[]
  serviceRole: boolean
  message?: string
}

type CurriculoViewer = {
  url: string
  nome: string
}

const normalize = (value: unknown) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

const matchesText = (value: unknown, query: string) => {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return true
  return normalize(value).includes(normalizedQuery)
}

const getText = (value: unknown, fallback = '-') => {
  const text = String(value ?? '').trim()
  return text || fallback
}

const onlyDigits = (value: unknown) => String(value ?? '').replace(/\D/g, '')

const sortByCreatedAt = <T extends BaseLead>(items: T[]) =>
  [...items].sort((a, b) => {
    const dateA = new Date(a.created_at || 0).getTime()
    const dateB = new Date(b.created_at || 0).getTime()
    return dateB - dateA
  })

const uniqueOptions = (values: Array<string | null | undefined>) =>
  Array.from(new Set(values.map(value => getText(value, '')).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, 'pt-BR')
  )

const formatDate = (value?: string) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}

const getWhatsAppUrl = (phone: unknown, message: string) => {
  const digits = onlyDigits(phone)
  if (!digits) return ''

  const withCountryCode = digits.startsWith('55') ? digits : `55${digits}`
  return `https://wa.me/${withCountryCode}?text=${encodeURIComponent(message)}`
}

const getMailUrl = (email: unknown, subject: string) => {
  const address = getText(email, '')
  if (!address) return ''
  return `mailto:${address}?subject=${encodeURIComponent(subject)}`
}

const getPrazoBadgeClass = (prazo: unknown) => {
  const value = normalize(prazo)

  if (value.includes('urgente')) return `${styles.badge} ${styles.badgeUrgent}`
  if (value.includes('30')) return `${styles.badge} ${styles.badgeSoon}`
  if (value.includes('60')) return `${styles.badge} ${styles.badgeLater}`
  return `${styles.badge} ${styles.badgePlanning}`
}

function ActionLink({
  href,
  icon,
  label,
  variant = 'neutral',
}: {
  href: string
  icon: ReactNode
  label: string
  variant?: 'neutral' | 'success'
}) {
  if (!href) {
    return (
      <button className={`${styles.actionButton} ${styles.actionButtonDisabled}`} disabled type="button">
        {icon}
        {label}
      </button>
    )
  }

  return (
    <a
      className={`${styles.actionButton} ${variant === 'success' ? styles.actionButtonSuccess : ''}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
      {label}
    </a>
  )
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string
  value: number
  icon: ReactNode
}) {
  return (
    <div className={styles.metricCard}>
      <span className={styles.metricIcon}>{icon}</span>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  )
}

export default function AdminDashboard({
  initialAuthenticated,
}: {
  initialAuthenticated: boolean
}) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [activeTab, setActiveTab] = useState<Tab>('candidatos')
  const [candidatos, setCandidatos] = useState<CandidatoLead[]>([])
  const [empresas, setEmpresas] = useState<EmpresaLead[]>([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [serviceRole, setServiceRole] = useState(true)
  const [curriculoLoadingId, setCurriculoLoadingId] = useState('')
  const [curriculoViewer, setCurriculoViewer] = useState<CurriculoViewer | null>(null)

  const [candidatoFilters, setCandidatoFilters] = useState({
    nome: '',
    cargo: '',
    area: '',
    experiencia: '',
    salario: '',
  })

  const [empresaFilters, setEmpresaFilters] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    empresa: '',
  })

  const areaOptions = useMemo(
    () => uniqueOptions(candidatos.map(candidato => candidato.area_atuacao)),
    [candidatos]
  )
  const experienciaOptions = useMemo(
    () => uniqueOptions(candidatos.map(candidato => candidato.experiencia)),
    [candidatos]
  )

  const filteredCandidatos = useMemo(
    () =>
      candidatos.filter(candidato =>
        matchesText(candidato.nome, candidatoFilters.nome) &&
        matchesText(candidato.cargo_atual, candidatoFilters.cargo) &&
        matchesText(candidato.area_atuacao, candidatoFilters.area) &&
        matchesText(candidato.experiencia, candidatoFilters.experiencia) &&
        matchesText(candidato.pretensao_salarial, candidatoFilters.salario)
      ),
    [candidatos, candidatoFilters]
  )

  const filteredEmpresas = useMemo(
    () =>
      empresas.filter(empresa =>
        matchesText(empresa.nome, empresaFilters.nome) &&
        matchesText(empresa.email, empresaFilters.email) &&
        matchesText(empresa.whatsapp, empresaFilters.whatsapp) &&
        matchesText(empresa.empresa, empresaFilters.empresa)
      ),
    [empresas, empresaFilters]
  )

  const loadData = useCallback(async () => {
    setLoading(true)
    setLoadError('')

    try {
      const response = await fetch('/api/admin/leads', { cache: 'no-store' })
      const data = (await response.json()) as LeadsResponse

      if (response.status === 401) {
        setAuthenticated(false)
        setCandidatos([])
        setEmpresas([])
        return
      }

      if (!response.ok) {
        setServiceRole(Boolean(data.serviceRole))
        throw new Error(data.message || 'Não foi possível carregar o painel.')
      }

      setCandidatos(sortByCreatedAt(data.candidatos || []))
      setEmpresas(sortByCreatedAt(data.empresas || []))
      setServiceRole(Boolean(data.serviceRole))
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Erro inesperado ao carregar dados.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!authenticated) return

    const timeout = window.setTimeout(() => {
      void loadData()
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [authenticated, loadData])

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoginLoading(true)
    setLoginError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Senha inválida.')
      }

      setPassword('')
      setAuthenticated(true)
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Não foi possível entrar.')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => null)
    setAuthenticated(false)
    setCandidatos([])
    setEmpresas([])
  }

  const openCurriculo = async (candidato: CandidatoLead) => {
    const path = getText(candidato.cv_url, '')
    if (!path) return

    const loadingId = candidato.id || path
    setCurriculoLoadingId(loadingId)
    setLoadError('')

    try {
      const response = await fetch(`/api/admin/curriculo?path=${encodeURIComponent(path)}`, {
        cache: 'no-store',
      })
      const data = (await response.json()) as { url?: string; message?: string }

      if (!response.ok || !data.url) {
        throw new Error(data.message || 'Não foi possível abrir o currículo.')
      }

      setCurriculoViewer({
        url: data.url,
        nome: getText(candidato.cv_nome, 'Currículo'),
      })
      trackEvent('admin_curriculo_open', {
        candidate_id: candidato.id || null,
        has_email: Boolean(candidato.email),
      })
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Não foi possível abrir o currículo.')
    } finally {
      setCurriculoLoadingId('')
    }
  }

  const clearCandidatoFilters = () =>
    setCandidatoFilters({ nome: '', cargo: '', area: '', experiencia: '', salario: '' })

  const clearEmpresaFilters = () =>
    setEmpresaFilters({ nome: '', email: '', whatsapp: '', empresa: '' })

  if (!authenticated) {
    return (
      <main className={styles.loginShell}>
        <form className={styles.loginCard} onSubmit={handleLogin}>
          <div className={styles.loginIcon}>
            <Lock size={22} />
          </div>
          <h1>Painel Porto Talent</h1>
          <p>Acesse os currículos recebidos e as solicitações de contato das empresas.</p>

          <label>
            Senha administrativa
            <input
              autoFocus
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Digite a senha"
            />
          </label>

          {loginError && <span className={styles.errorText}>{loginError}</span>}

          <button className={styles.primaryButton} disabled={loginLoading} type="submit">
            {loginLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div>
          <span className={styles.kicker}>Porto Talent</span>
          <h1>Painel administrativo</h1>
          <p>Consulta e atendimento dos leads recebidos pelo site.</p>
        </div>

        <div className={styles.headerActions}>
          <button className={styles.secondaryButton} type="button" onClick={loadData} disabled={loading}>
            <RefreshCcw size={16} />
            {loading ? 'Atualizando' : 'Atualizar'}
          </button>
          <button className={styles.secondaryButton} type="button" onClick={handleLogout}>
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </header>

      {!serviceRole && (
        <div className={styles.warningBox}>
          Configure <strong>SUPABASE_SERVICE_ROLE_KEY</strong> no <strong>.env.local</strong> para o painel ler dados
          com RLS e gerar links de currículo privado.
        </div>
      )}

      {loadError && <div className={styles.errorBox}>{loadError}</div>}

      <section className={styles.metricsGrid}>
        <MetricCard label="currículos recebidos" value={candidatos.length} icon={<UserRound size={18} />} />
        <MetricCard label="empresas em contato" value={empresas.length} icon={<Building2 size={18} />} />
        <MetricCard
          label="currículos filtrados"
          value={filteredCandidatos.length}
          icon={<FileText size={18} />}
        />
        <MetricCard label="empresas filtradas" value={filteredEmpresas.length} icon={<Search size={18} />} />
      </section>

      <section className={styles.panel}>
        <div className={styles.tabs}>
          <button
            className={activeTab === 'candidatos' ? styles.tabActive : ''}
            type="button"
            onClick={() => setActiveTab('candidatos')}
          >
            <UserRound size={16} />
            Currículos
          </button>
          <button
            className={activeTab === 'empresas' ? styles.tabActive : ''}
            type="button"
            onClick={() => setActiveTab('empresas')}
          >
            <Building2 size={16} />
            Empresas
          </button>
        </div>

        {activeTab === 'candidatos' ? (
          <>
            <div className={styles.filterGrid}>
              <label>
                Nome
                <input
                  value={candidatoFilters.nome}
                  onChange={event =>
                    setCandidatoFilters(filters => ({ ...filters, nome: event.target.value }))
                  }
                  placeholder="Buscar por nome"
                />
              </label>
              <label>
                Cargo
                <input
                  value={candidatoFilters.cargo}
                  onChange={event =>
                    setCandidatoFilters(filters => ({ ...filters, cargo: event.target.value }))
                  }
                  placeholder="Cargo atual"
                />
              </label>
              <label>
                Área
                <select
                  value={candidatoFilters.area}
                  onChange={event =>
                    setCandidatoFilters(filters => ({ ...filters, area: event.target.value }))
                  }
                >
                  <option value="">Todas</option>
                  {areaOptions.map(area => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Experiência
                <select
                  value={candidatoFilters.experiencia}
                  onChange={event =>
                    setCandidatoFilters(filters => ({ ...filters, experiencia: event.target.value }))
                  }
                >
                  <option value="">Todas</option>
                  {experienciaOptions.map(experiencia => (
                    <option key={experiencia} value={experiencia}>
                      {experiencia}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Salário
                <input
                  value={candidatoFilters.salario}
                  onChange={event =>
                    setCandidatoFilters(filters => ({ ...filters, salario: event.target.value }))
                  }
                  placeholder="Pretensão salarial"
                />
              </label>
              <button className={styles.clearButton} type="button" onClick={clearCandidatoFilters}>
                Limpar filtros
              </button>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Candidato</th>
                    <th>Cargo / área</th>
                    <th>Experiência</th>
                    <th>Salário</th>
                    <th>Recebido</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidatos.map(candidato => {
                    const whatsappUrl = getWhatsAppUrl(
                      candidato.whatsapp,
                      `Olá, ${getText(candidato.nome, '')}! Recebemos seu currículo pela Porto Talent.`
                    )
                    const mailUrl = getMailUrl(candidato.email, 'Porto Talent - currículo recebido')
                    const hasCv = Boolean(getText(candidato.cv_url, ''))
                    const rowId = candidato.id || `${candidato.email}-${candidato.created_at}`
                    const cvButtonId = candidato.id || getText(candidato.cv_url, '')

                    return (
                      <tr key={rowId}>
                        <td>
                          <strong>{getText(candidato.nome)}</strong>
                          <span>{getText(candidato.email)}</span>
                          <span>{getText(candidato.whatsapp)}</span>
                        </td>
                        <td>
                          <strong>{getText(candidato.cargo_atual)}</strong>
                          <span>{getText(candidato.area_atuacao)}</span>
                          <span>{getText(candidato.cidade_estado)}</span>
                        </td>
                        <td>{getText(candidato.experiencia)}</td>
                        <td>{getText(candidato.pretensao_salarial)}</td>
                        <td>{formatDate(candidato.created_at)}</td>
                        <td>
                          <div className={styles.rowActions}>
                            <ActionLink
                              href={whatsappUrl}
                              icon={<MessageCircle size={15} />}
                              label="WhatsApp"
                              variant="success"
                            />
                            <ActionLink href={mailUrl} icon={<Mail size={15} />} label="E-mail" />
                            <button
                              className={styles.actionButton}
                              disabled={!hasCv || curriculoLoadingId === cvButtonId}
                              type="button"
                              onClick={() => openCurriculo(candidato)}
                            >
                              <Eye size={15} />
                              {curriculoLoadingId === cvButtonId ? 'Abrindo' : 'Currículo'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {!loading && filteredCandidatos.length === 0 && (
                <div className={styles.emptyState}>Nenhum currículo encontrado com esses filtros.</div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={styles.filterGrid}>
              <label>
                Nome
                <input
                  value={empresaFilters.nome}
                  onChange={event => setEmpresaFilters(filters => ({ ...filters, nome: event.target.value }))}
                  placeholder="Responsável"
                />
              </label>
              <label>
                E-mail
                <input
                  value={empresaFilters.email}
                  onChange={event => setEmpresaFilters(filters => ({ ...filters, email: event.target.value }))}
                  placeholder="contato@empresa.com"
                />
              </label>
              <label>
                Número
                <input
                  value={empresaFilters.whatsapp}
                  onChange={event =>
                    setEmpresaFilters(filters => ({ ...filters, whatsapp: event.target.value }))
                  }
                  placeholder="WhatsApp"
                />
              </label>
              <label>
                Empresa
                <input
                  value={empresaFilters.empresa}
                  onChange={event =>
                    setEmpresaFilters(filters => ({ ...filters, empresa: event.target.value }))
                  }
                  placeholder="Nome da empresa"
                />
              </label>
              <button className={styles.clearButton} type="button" onClick={clearEmpresaFilters}>
                Limpar filtros
              </button>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Contato</th>
                    <th>Empresa</th>
                    <th>Vaga</th>
                    <th>Prazo</th>
                    <th>Mensagem</th>
                    <th>Recebido</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmpresas.map(empresa => {
                    const whatsappUrl = getWhatsAppUrl(
                      empresa.whatsapp,
                      `Olá, ${getText(empresa.nome, '')}! Recebemos sua solicitação de contato pela Porto Talent.`
                    )
                    const mailUrl = getMailUrl(empresa.email, 'Porto Talent - solicitação de contato')

                    return (
                      <tr key={empresa.id || `${empresa.email}-${empresa.created_at}`}>
                        <td>
                          <strong>{getText(empresa.nome)}</strong>
                          <span>{getText(empresa.email)}</span>
                          <span>{getText(empresa.whatsapp)}</span>
                        </td>
                        <td>
                          <strong>{getText(empresa.empresa)}</strong>
                        </td>
                        <td>{getText(empresa.vaga)}</td>
                        <td>
                          <span className={getPrazoBadgeClass(empresa.prazo)}>{getText(empresa.prazo)}</span>
                        </td>
                        <td className={styles.messageCell}>{getText(empresa.mensagem)}</td>
                        <td>{formatDate(empresa.created_at)}</td>
                        <td>
                          <div className={styles.rowActions}>
                            <ActionLink
                              href={whatsappUrl}
                              icon={<MessageCircle size={15} />}
                              label="WhatsApp"
                              variant="success"
                            />
                            <ActionLink href={mailUrl} icon={<Mail size={15} />} label="E-mail" />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {!loading && filteredEmpresas.length === 0 && (
                <div className={styles.emptyState}>Nenhuma solicitação encontrada com esses filtros.</div>
              )}
            </div>
          </>
        )}
      </section>

      {curriculoViewer && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <span>Currículo</span>
                <strong>{curriculoViewer.nome}</strong>
              </div>
              <div className={styles.modalActions}>
                <a
                  className={styles.secondaryButton}
                  href={curriculoViewer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  Nova aba
                </a>
                <a className={styles.secondaryButton} href={curriculoViewer.url} download>
                  <Download size={16} />
                  Baixar
                </a>
                <button className={styles.iconButton} type="button" onClick={() => setCurriculoViewer(null)}>
                  <X size={18} />
                </button>
              </div>
            </div>
            <iframe className={styles.curriculoFrame} src={curriculoViewer.url} title={curriculoViewer.nome} />
          </div>
        </div>
      )}
    </main>
  )
}
