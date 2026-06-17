'use client'

import type { FormEvent, ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertTriangle,
  Archive,
  ArchiveRestore,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Columns3,
  Download,
  ExternalLink,
  Eye,
  FileDown,
  GripVertical,
  Info,
  Lock,
  LogOut,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCcw,
  Save,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  UserRound,
  X,
} from 'lucide-react'
import { trackEvent } from '@/lib/tracking'
import styles from './AdminDashboard.module.css'

type Tab = 'candidatos' | 'empresas' | 'interesses' | 'kanban'
type LeadType = 'candidato' | 'empresa' | 'interesse'
type LeadAction = 'archive' | 'restore'
type LeadTab = 'candidatos' | 'empresas' | 'interesses'
type ToastTone = 'success' | 'error' | 'info'

type BaseLead = {
  id?: string
  created_at?: string
  updated_at?: string
  archived_at?: string | null
  admin_notes?: string | null
  nome?: string | null
  email?: string | null
  whatsapp?: string | null
  status?: string | null
  origem?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_term?: string | null
  utm_content?: string | null
  landing_path?: string | null
  referrer?: string | null
  user_agent?: string | null
}

type EmpresaLead = BaseLead & {
  empresa?: string | null
  vaga?: string | null
  quantidade_colaboradores?: string | null
  prazo?: string | null
  mensagem?: string | null
}

type InteresseLead = BaseLead & {
  servico?: string | null
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

type KanbanCard = {
  id: string
  board_id: string
  stage_id: string
  candidate_id?: string | null
  position?: number | null
  notes?: string | null
  candidato?: CandidatoLead | null
}

type KanbanStage = {
  id: string
  board_id: string
  title: string
  position?: number | null
  cards: KanbanCard[]
}

type KanbanBoard = {
  id: string
  title: string
  created_at?: string
  archived_at?: string | null
  stages: KanbanStage[]
}

type LeadsResponse = {
  candidatos: CandidatoLead[]
  empresas: EmpresaLead[]
  interesses: InteresseLead[]
  serviceRole: boolean
  message?: string
}

type KanbanResponse = {
  boards: KanbanBoard[]
  message?: string
}

type CurriculoViewer = {
  url: string
  nome: string
}

type LeadDetail = {
  type: LeadType
  lead: BaseLead
}

type ConfirmationState = {
  title: string
  message: string
  warning?: string
  confirmLabel: string
  tone?: 'danger' | 'warning' | 'neutral'
  onConfirm: () => Promise<void> | void
}

type ToastState = {
  id: number
  tone: ToastTone
  message: string
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

const isArchived = (lead: BaseLead) => normalize(lead.status) === 'arquivado' || Boolean(lead.archived_at)

const getLeadLabel = (type: LeadType, lead: BaseLead) => {
  const name = getText(lead.nome, '')

  if (type === 'candidato') {
    return name ? `currículo de ${name}` : 'currículo'
  }

  if (type === 'interesse') {
    return name ? `interesse de ${name}` : 'interesse em serviço'
  }

  return name ? `solicitação de ${name}` : 'solicitação da empresa'
}

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

const csvCell = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`

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

const isRecentLead = (lead: BaseLead) => {
  const createdAt = new Date(lead.created_at || 0).getTime()
  if (Number.isNaN(createdAt)) return false
  return createdAt >= Date.now() - 7 * 24 * 60 * 60 * 1000
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const selected = options.find(o => o.value === value)

  return (
    <div className={styles.customSelect}>
      <button
        type="button"
        className={styles.customSelectTrigger}
        onClick={() => setOpen(prev => !prev)}
        onBlur={() => window.setTimeout(() => setOpen(false), 140)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected?.label ?? placeholder ?? '—'}</span>
        <ChevronDown size={15} className={open ? styles.customSelectChevronOpen : undefined} />
      </button>
      {open && (
        <div className={styles.customSelectMenu} role="listbox">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={value === opt.value}
              className={`${styles.customSelectOption} ${value === opt.value ? styles.customSelectOptionActive : ''}`}
              onMouseDown={event => event.preventDefault()}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
            >
              {value === opt.value && <Check size={13} />}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ActionLink({
  href,
  icon,
  label,
  variant = 'neutral',
  iconOnly = false,
  onClick,
}: {
  href: string
  icon: ReactNode
  label: string
  variant?: 'neutral' | 'success'
  iconOnly?: boolean
  onClick?: () => void
}) {
  if (!href) {
    return (
      <button
        aria-label={label}
        className={`${iconOnly ? styles.actionIconButton : styles.actionButton} ${styles.actionButtonDisabled}`}
        disabled
        title={label}
        type="button"
      >
        {icon}
        {!iconOnly && label}
      </button>
    )
  }

  return (
    <a
      aria-label={label}
      className={`${iconOnly ? styles.actionIconButton : styles.actionButton} ${variant === 'success' ? styles.actionButtonSuccess : ''}`}
      href={href}
      target="_blank"
      title={label}
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {icon}
      {!iconOnly && label}
    </a>
  )
}

function ActionMenu({
  open,
  onToggle,
  children,
}: {
  open: boolean
  onToggle: () => void
  children: ReactNode
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [menuPos, setMenuPos] = useState<{ top?: number; bottom?: number; right: number }>({ right: 0 })

  const handleToggle = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      if (spaceBelow < 220) {
        setMenuPos({ bottom: window.innerHeight - rect.top + 8, right: window.innerWidth - rect.right })
      } else {
        setMenuPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right })
      }
    }
    onToggle()
  }

  return (
    <div className={styles.actionMenu}>
      <button
        ref={buttonRef}
        aria-expanded={open}
        aria-label="Mais acoes"
        className={styles.actionIconButton}
        title="Mais acoes"
        type="button"
        onClick={handleToggle}
      >
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <div
          className={styles.actionMenuPanel}
          style={{ position: 'fixed', top: menuPos.top, bottom: menuPos.bottom, right: menuPos.right }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

function RowActionButton({
  icon,
  label,
  onClick,
  disabled,
  variant = 'neutral',
  iconOnly = false,
}: {
  icon: ReactNode
  label: string
  onClick: () => void
  disabled?: boolean
  variant?: 'neutral' | 'warning' | 'danger'
  iconOnly?: boolean
}) {
  const variantClass =
    variant === 'danger'
      ? styles.actionButtonDanger
      : variant === 'warning'
        ? styles.actionButtonWarning
        : ''

  return (
    <button
      aria-label={label}
      className={`${iconOnly ? styles.actionIconButton : styles.actionButton} ${variantClass}`}
      disabled={disabled}
      title={label}
      type="button"
      onClick={onClick}
    >
      {icon}
      {!iconOnly && label}
    </button>
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
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [openActionMenuId, setOpenActionMenuId] = useState('')
  const [showArchived, setShowArchived] = useState(false)
  const [showArchivedBoards, setShowArchivedBoards] = useState(false)
  const [candidatos, setCandidatos] = useState<CandidatoLead[]>([])
  const [empresas, setEmpresas] = useState<EmpresaLead[]>([])
  const [interesses, setInteresses] = useState<InteresseLead[]>([])
  const [boards, setBoards] = useState<KanbanBoard[]>([])
  const [activeBoardsCount, setActiveBoardsCount] = useState(0)
  const [archivedBoardsCount, setArchivedBoardsCount] = useState(0)
  const [boardSearch, setBoardSearch] = useState('')
  const [activeBoardId, setActiveBoardId] = useState('')
  const [loading, setLoading] = useState(false)
  const [kanbanLoading, setKanbanLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [kanbanError, setKanbanError] = useState('')
  const [serviceRole, setServiceRole] = useState(true)
  const [curriculoLoadingId, setCurriculoLoadingId] = useState('')
  const [curriculoViewer, setCurriculoViewer] = useState<CurriculoViewer | null>(null)
  const [mutatingLeadId, setMutatingLeadId] = useState('')
  const [draggedCardId, setDraggedCardId] = useState('')
  const [dragOverStageId, setDragOverStageId] = useState('')
  const [newBoardTitle, setNewBoardTitle] = useState('')
  const [newStageTitle, setNewStageTitle] = useState('')
  const [selectedCandidateId, setSelectedCandidateId] = useState('')
  const [candidateSearch, setCandidateSearch] = useState('')
  const [candidateSearchOpen, setCandidateSearchOpen] = useState(false)
  const [selectedStageId, setSelectedStageId] = useState('')
  const [selectedLead, setSelectedLead] = useState<LeadDetail | null>(null)
  const [notesDraft, setNotesDraft] = useState('')
  const [selectedCandidatoIds, setSelectedCandidatoIds] = useState<string[]>([])
  const [selectedEmpresaIds, setSelectedEmpresaIds] = useState<string[]>([])
  const [selectedInteresseIds, setSelectedInteresseIds] = useState<string[]>([])
  const [confirmation, setConfirmation] = useState<ConfirmationState | null>(null)
  const [toasts, setToasts] = useState<ToastState[]>([])
  const [editingBoardTitle, setEditingBoardTitle] = useState(false)
  const [boardTitleDraft, setBoardTitleDraft] = useState('')
  const [editingStageId, setEditingStageId] = useState('')
  const [stageTitleDraft, setStageTitleDraft] = useState('')
  const toastCounter = useRef(0)

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

  const [interesseFilters, setInteresseFilters] = useState({
    nome: '',
    email: '',
    servico: '',
  })

  const visibleCandidatos = useMemo(
    () => candidatos.filter(candidato => showArchived ? isArchived(candidato) : !isArchived(candidato)),
    [candidatos, showArchived]
  )
  const visibleEmpresas = useMemo(
    () => empresas.filter(empresa => showArchived ? isArchived(empresa) : !isArchived(empresa)),
    [empresas, showArchived]
  )
  const visibleInteresses = useMemo(
    () => interesses.filter(interesse => showArchived ? isArchived(interesse) : !isArchived(interesse)),
    [interesses, showArchived]
  )

  const areaOptions = useMemo(
    () => uniqueOptions(visibleCandidatos.map(candidato => candidato.area_atuacao)),
    [visibleCandidatos]
  )
  const experienciaOptions = useMemo(
    () => uniqueOptions(visibleCandidatos.map(candidato => candidato.experiencia)),
    [visibleCandidatos]
  )

  const filteredCandidatos = useMemo(
    () =>
      visibleCandidatos.filter(candidato =>
        matchesText(candidato.nome, candidatoFilters.nome) &&
        matchesText(candidato.cargo_atual, candidatoFilters.cargo) &&
        matchesText(candidato.area_atuacao, candidatoFilters.area) &&
        matchesText(candidato.experiencia, candidatoFilters.experiencia) &&
        matchesText(candidato.pretensao_salarial, candidatoFilters.salario)
      ),
    [visibleCandidatos, candidatoFilters]
  )

  const filteredEmpresas = useMemo(
    () =>
      visibleEmpresas.filter(empresa =>
        matchesText(empresa.nome, empresaFilters.nome) &&
        matchesText(empresa.email, empresaFilters.email) &&
        matchesText(empresa.whatsapp, empresaFilters.whatsapp) &&
        matchesText(empresa.empresa, empresaFilters.empresa)
      ),
    [visibleEmpresas, empresaFilters]
  )

  const filteredInteresses = useMemo(
    () =>
      visibleInteresses.filter(interesse =>
        matchesText(interesse.nome, interesseFilters.nome) &&
        matchesText(interesse.email, interesseFilters.email) &&
        matchesText(interesse.servico, interesseFilters.servico)
      ),
    [visibleInteresses, interesseFilters]
  )

  const activeBoard = useMemo(
    () => boards.find(board => board.id === activeBoardId) ?? boards[0] ?? null,
    [activeBoardId, boards]
  )
  const boardCandidateIds = useMemo(
    () =>
      new Set(
        (activeBoard?.stages ?? [])
          .flatMap(stage => stage.cards)
          .map(card => card.candidate_id)
          .filter(Boolean)
      ),
    [activeBoard]
  )
  const effectiveSelectedStageId = useMemo(
    () =>
      activeBoard?.stages.some(stage => stage.id === selectedStageId)
        ? selectedStageId
        : activeBoard?.stages[0]?.id || '',
    [activeBoard, selectedStageId]
  )
  const filteredBoards = useMemo(
    () =>
      boardSearch.trim()
        ? boards.filter(b => normalize(b.title).includes(normalize(boardSearch)))
        : boards,
    [boards, boardSearch]
  )
  const kanbanCandidates = useMemo(
    () =>
      candidatos.filter(candidato =>
        candidato.id &&
        !isArchived(candidato) &&
        !boardCandidateIds.has(candidato.id)
      ),
    [boardCandidateIds, candidatos]
  )
  const filteredKanbanCandidates = useMemo(() => {
    const query = normalize(candidateSearch)
    const candidates = query
      ? kanbanCandidates.filter(candidato =>
          matchesText(candidato.nome, candidateSearch) ||
          matchesText(candidato.cargo_atual, candidateSearch) ||
          matchesText(candidato.email, candidateSearch) ||
          matchesText(candidato.whatsapp, candidateSearch)
        )
      : kanbanCandidates

    return candidates.slice(0, 8)
  }, [candidateSearch, kanbanCandidates])
  const selectedKanbanCandidate = useMemo(
    () => kanbanCandidates.find(candidato => candidato.id === selectedCandidateId) ?? null,
    [kanbanCandidates, selectedCandidateId]
  )
  const currentLeadType: LeadType =
    activeTab === 'empresas' ? 'empresa' : activeTab === 'interesses' ? 'interesse' : 'candidato'
  const currentSelectedIds =
    activeTab === 'empresas'
      ? selectedEmpresaIds
      : activeTab === 'interesses'
        ? selectedInteresseIds
        : selectedCandidatoIds
  const currentFilteredRows =
    activeTab === 'empresas'
      ? filteredEmpresas
      : activeTab === 'interesses'
        ? filteredInteresses
        : filteredCandidatos
  const currentFilteredIds = useMemo(
    () =>
      currentFilteredRows
        .map(item => item.id)
        .filter(Boolean) as string[],
    [currentFilteredRows]
  )
  const allCurrentFilteredSelected =
    currentFilteredIds.length > 0 && currentFilteredIds.every(id => currentSelectedIds.includes(id))
  const activeFiltersCount =
    activeTab === 'empresas'
      ? Object.values(empresaFilters).filter(Boolean).length
      : activeTab === 'interesses'
        ? Object.values(interesseFilters).filter(Boolean).length
        : Object.values(candidatoFilters).filter(Boolean).length
  const currentFilteredLeads = currentFilteredRows
  const currentRecentCount = currentFilteredLeads.filter(lead => !isArchived(lead) && isRecentLead(lead)).length
  const currentArchivedCount = currentFilteredLeads.filter(isArchived).length
  const currentPanelTitle =
    activeTab === 'empresas'
      ? 'Solicitações de empresas'
      : activeTab === 'interesses'
        ? 'Interesses em serviços'
        : 'Currículos recebidos'
  const currentPanelDescription =
    activeTab === 'empresas'
      ? 'Leads comerciais recebidos pelo formulário de empresas.'
      : activeTab === 'interesses'
        ? 'Cadastros do CTA de gestão e desenvolvimento de equipes comerciais.'
        : 'Candidatos cadastrados pelo formulário do site.'

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
        setInteresses([])
        return
      }

      if (!response.ok) {
        setServiceRole(Boolean(data.serviceRole))
        throw new Error(data.message || 'Não foi possível carregar o painel.')
      }

      const nextCandidatos = sortByCreatedAt(data.candidatos || [])
      const nextEmpresas = sortByCreatedAt(data.empresas || [])
      const nextInteresses = sortByCreatedAt(data.interesses || [])
      setCandidatos(nextCandidatos)
      setEmpresas(nextEmpresas)
      setInteresses(nextInteresses)
      setSelectedCandidatoIds(ids => ids.filter(id => nextCandidatos.some(candidato => candidato.id === id)))
      setSelectedEmpresaIds(ids => ids.filter(id => nextEmpresas.some(empresa => empresa.id === id)))
      setSelectedInteresseIds(ids => ids.filter(id => nextInteresses.some(interesse => interesse.id === id)))
      setServiceRole(Boolean(data.serviceRole))
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Erro inesperado ao carregar dados.')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadKanban = useCallback(async (archived = false, countOnly = false) => {
    if (!countOnly) {
      setKanbanLoading(true)
      setKanbanError('')
    }

    try {
      const url = archived ? '/api/admin/kanban?archived=true' : '/api/admin/kanban'
      const response = await fetch(url, { cache: 'no-store' })
      const data = (await response.json()) as KanbanResponse

      if (response.status === 401) {
        setAuthenticated(false)
        if (!countOnly) setBoards([])
        return
      }

      if (!response.ok) {
        if (!countOnly) throw new Error(data.message || 'Não foi possível carregar o kanban.')
        return
      }

      const count = (data.boards || []).length
      if (archived) {
        setArchivedBoardsCount(count)
      } else {
        setActiveBoardsCount(count)
      }
      if (!countOnly) setBoards(data.boards || [])
    } catch (error) {
      if (!countOnly) setKanbanError(error instanceof Error ? error.message : 'Erro inesperado ao carregar o kanban.')
    } finally {
      if (!countOnly) setKanbanLoading(false)
    }
  }, [])

  const refreshAll = useCallback(async () => {
    await Promise.all([
      loadData(),
      loadKanban(showArchivedBoards),
      loadKanban(!showArchivedBoards, true),
    ])
  }, [loadData, loadKanban, showArchivedBoards])

  useEffect(() => {
    if (!authenticated) return

    const timeout = window.setTimeout(() => {
      void refreshAll()
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [authenticated, refreshAll])

  const showToast = useCallback((message: string, tone: ToastTone = 'success') => {
    const id = Date.now() + toastCounter.current++
    setToasts(items => [...items, { id, tone, message }])
    window.setTimeout(() => {
      setToasts(items => items.filter(item => item.id !== id))
    }, 4200)
  }, [])

  const askConfirmation = useCallback((config: ConfirmationState) => {
    setConfirmation(config)
  }, [])

  const setSelectedIdsForTab = (tab: LeadTab, updater: (ids: string[]) => string[]) => {
    if (tab === 'candidatos') {
      setSelectedCandidatoIds(updater)
      return
    }

    if (tab === 'empresas') {
      setSelectedEmpresaIds(updater)
      return
    }

    setSelectedInteresseIds(updater)
  }

  const toggleLeadSelection = (tab: LeadTab, id?: string) => {
    if (!id) return
    setSelectedIdsForTab(tab, ids => ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id])
  }

  const toggleAllCurrentSelection = () => {
    if (activeTab === 'kanban') return
    const tab = activeTab as LeadTab

    setSelectedIdsForTab(tab, ids => {
      if (allCurrentFilteredSelected) {
        return ids.filter(id => !currentFilteredIds.includes(id))
      }

      return Array.from(new Set([...ids, ...currentFilteredIds]))
    })
  }

  const openLeadDetails = (type: LeadType, lead: BaseLead) => {
    setSelectedLead({ type, lead })
    setNotesDraft(getText(lead.admin_notes, ''))
  }

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
    setInteresses([])
    setBoards([])
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

  const updateLeadStatus = async (type: LeadType, lead: BaseLead, action: LeadAction) => {
    if (!lead.id) return
    const label = getLeadLabel(type, lead)
    const actionText = action === 'archive' ? 'arquivar' : 'restaurar'
    const warning =
      action === 'archive'
        ? 'O registro sairá da lista principal e ficará visível apenas quando "Mostrar arquivados" estiver marcado.'
        : 'O registro voltará para a lista principal.'
    askConfirmation({
      title: `Confirmar ${actionText}`,
      message: `Você está prestes a ${actionText} este ${label}.`,
      warning,
      confirmLabel: action === 'archive' ? 'Arquivar' : 'Restaurar',
      tone: action === 'archive' ? 'warning' : 'neutral',
      onConfirm: async () => {
        setMutatingLeadId(lead.id!)
        setLoadError('')

        try {
          const response = await fetch('/api/admin/leads', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, id: lead.id, action }),
          })
          const data = await response.json().catch(() => ({}))

          if (!response.ok) {
            throw new Error(data.message || 'Não foi possível atualizar o registro.')
          }

          const updater = (item: BaseLead) => item.id === lead.id ? { ...item, ...data.lead } : item

          if (type === 'candidato') {
            setCandidatos(items => sortByCreatedAt(items.map(item => updater(item) as CandidatoLead)))
          } else if (type === 'empresa') {
            setEmpresas(items => sortByCreatedAt(items.map(item => updater(item) as EmpresaLead)))
          } else {
            setInteresses(items => sortByCreatedAt(items.map(item => updater(item) as InteresseLead)))
          }
          showToast(action === 'archive' ? 'Registro arquivado.' : 'Registro restaurado.')
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Não foi possível atualizar o registro.'
          setLoadError(message)
          showToast(message, 'error')
        } finally {
          setMutatingLeadId('')
        }
      },
    })
  }

  const deleteLead = async (type: LeadType, lead: BaseLead) => {
    if (!lead.id) return
    const label = getLeadLabel(type, lead)
    const extraWarning =
      type === 'candidato'
        ? 'Se houver arquivo de currículo anexado, ele também será removido quando possível.'
        : type === 'empresa'
          ? 'A solicitação da empresa será removida do painel.'
          : 'O interesse em serviço será removido do painel.'
    askConfirmation({
      title: 'Excluir permanentemente',
      message: `Você está prestes a excluir este ${label}.`,
      warning: `Essa ação não pode ser desfeita. ${extraWarning}`,
      confirmLabel: 'Excluir',
      tone: 'danger',
      onConfirm: async () => {
        setMutatingLeadId(lead.id!)
        setLoadError('')

        try {
          const response = await fetch('/api/admin/leads', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, id: lead.id }),
          })
          const data = await response.json().catch(() => ({}))

          if (!response.ok) {
            throw new Error(data.message || 'Não foi possível excluir o registro.')
          }

          if (type === 'candidato') {
            setCandidatos(items => items.filter(item => item.id !== lead.id))
            setSelectedCandidatoIds(ids => ids.filter(id => id !== lead.id))
            await loadKanban()
          } else if (type === 'empresa') {
            setEmpresas(items => items.filter(item => item.id !== lead.id))
            setSelectedEmpresaIds(ids => ids.filter(id => id !== lead.id))
          } else {
            setInteresses(items => items.filter(item => item.id !== lead.id))
            setSelectedInteresseIds(ids => ids.filter(id => id !== lead.id))
          }
          setSelectedLead(current => current?.lead.id === lead.id ? null : current)
          showToast('Registro excluído.')
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Não foi possível excluir o registro.'
          setLoadError(message)
          showToast(message, 'error')
        } finally {
          setMutatingLeadId('')
        }
      },
    })
  }

  const saveLeadNotes = async () => {
    if (!selectedLead?.lead.id) return
    const leadId = selectedLead.lead.id
    const { type, lead } = selectedLead
    setMutatingLeadId(leadId)
    setLoadError('')

    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id: leadId, action: 'update_notes', notes: notesDraft }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Não foi possível salvar as observações.')
      }

      const updater = (item: BaseLead) => item.id === lead.id ? { ...item, ...data.lead } : item
      if (type === 'candidato') {
        setCandidatos(items => sortByCreatedAt(items.map(item => updater(item) as CandidatoLead)))
      } else if (type === 'empresa') {
        setEmpresas(items => sortByCreatedAt(items.map(item => updater(item) as EmpresaLead)))
      } else {
        setInteresses(items => sortByCreatedAt(items.map(item => updater(item) as InteresseLead)))
      }
      setSelectedLead({ type, lead: { ...lead, ...data.lead } })
      showToast('Observações salvas.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível salvar as observações.'
      setLoadError(message)
      showToast(message, 'error')
    } finally {
      setMutatingLeadId('')
    }
  }

  const exportCurrentCsv = () => {
    if (activeTab === 'kanban') return

    const headers =
      activeTab === 'empresas'
        ? ['Nome', 'Email', 'WhatsApp', 'Empresa', 'Vaga', 'Quantidade de colaboradores', 'Prazo', 'Mensagem', 'Status', 'Recebido', 'UTM source', 'UTM campaign']
        : activeTab === 'interesses'
          ? ['Nome', 'Email', 'Serviço', 'Origem', 'Status', 'Recebido', 'UTM source', 'UTM campaign']
          : ['Nome', 'Email', 'WhatsApp', 'Cidade', 'Cargo', 'Área', 'Experiência', 'Salário', 'LinkedIn', 'Status', 'Recebido', 'UTM source', 'UTM campaign']
    const bodyRows =
      activeTab === 'empresas'
        ? filteredEmpresas.map(item => [
            item.nome,
            item.email,
            item.whatsapp,
            item.empresa,
            item.vaga,
            item.quantidade_colaboradores,
            item.prazo,
            item.mensagem,
            item.status,
            formatDate(item.created_at),
            item.utm_source,
            item.utm_campaign,
          ])
        : activeTab === 'interesses'
          ? filteredInteresses.map(item => [
              item.nome,
              item.email,
              item.servico,
              item.origem,
              item.status,
              formatDate(item.created_at),
              item.utm_source,
              item.utm_campaign,
            ])
          : filteredCandidatos.map(item => [
              item.nome,
              item.email,
              item.whatsapp,
              item.cidade_estado,
              item.cargo_atual,
              item.area_atuacao,
              item.experiencia,
              item.pretensao_salarial,
              item.linkedin,
              item.status,
              formatDate(item.created_at),
              item.utm_source,
              item.utm_campaign,
            ])

    const csv = [headers, ...bodyRows].map(row => row.map(csvCell).join(';')).join('\n')
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `porto-talent-${activeTab}-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    showToast('CSV exportado.')
  }

  const exportKanbanCsv = () => {
    if (!activeBoard) return
    const headers = ['Etapa', 'Candidato', 'Cargo', 'WhatsApp', 'E-mail', 'Cidade', 'Experiência', 'Salário', 'Observações']
    const rows = activeBoard.stages.flatMap(stage =>
      stage.cards.map(card => [
        stage.title,
        getText(card.candidato?.nome),
        getText(card.candidato?.cargo_atual),
        getText(card.candidato?.whatsapp),
        getText(card.candidato?.email),
        getText(card.candidato?.cidade_estado),
        getText(card.candidato?.experiencia),
        getText(card.candidato?.pretensao_salarial),
        getText(card.notes),
      ])
    )
    const csv = [headers, ...rows].map(row => row.map(csvCell).join(';')).join('\n')
    const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `kanban-${activeBoard.title.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    showToast('Kanban exportado.')
  }

  const bulkUpdateLeadStatus = (type: LeadType, action: LeadAction) => {
    const selectedIds =
      type === 'candidato'
        ? selectedCandidatoIds
        : type === 'empresa'
          ? selectedEmpresaIds
          : selectedInteresseIds
    if (selectedIds.length === 0) return
    const actionText = action === 'archive' ? 'arquivar' : 'restaurar'

    askConfirmation({
      title: `Confirmar ${actionText}`,
      message: `Você está prestes a ${actionText} ${selectedIds.length} registros selecionados.`,
      warning: action === 'archive' ? 'Eles sairão da lista principal.' : 'Eles voltarão para a lista principal.',
      confirmLabel: action === 'archive' ? 'Arquivar selecionados' : 'Restaurar selecionados',
      tone: action === 'archive' ? 'warning' : 'neutral',
      onConfirm: async () => {
        setLoadError('')
        try {
          const responses = await Promise.all(
            selectedIds.map(id =>
              fetch('/api/admin/leads', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, id, action }),
              }).then(async response => {
                const data = await response.json().catch(() => ({}))
                if (!response.ok) throw new Error(data.message || 'Não foi possível atualizar os registros.')
                return data.lead as BaseLead
              })
            )
          )
          const updated = new Map(responses.map(lead => [lead.id, lead]))
          const updater = (item: BaseLead) => updated.has(item.id) ? { ...item, ...updated.get(item.id) } : item

          if (type === 'candidato') {
            setCandidatos(items => sortByCreatedAt(items.map(item => updater(item) as CandidatoLead)))
            setSelectedCandidatoIds([])
          } else if (type === 'empresa') {
            setEmpresas(items => sortByCreatedAt(items.map(item => updater(item) as EmpresaLead)))
            setSelectedEmpresaIds([])
          } else {
            setInteresses(items => sortByCreatedAt(items.map(item => updater(item) as InteresseLead)))
            setSelectedInteresseIds([])
          }
          showToast(`${selectedIds.length} registros atualizados.`)
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Não foi possível atualizar os registros.'
          setLoadError(message)
          showToast(message, 'error')
        }
      },
    })
  }

  const bulkDeleteLeads = (type: LeadType) => {
    const selectedIds =
      type === 'candidato'
        ? selectedCandidatoIds
        : type === 'empresa'
          ? selectedEmpresaIds
          : selectedInteresseIds
    if (selectedIds.length === 0) return

    askConfirmation({
      title: 'Excluir selecionados',
      message: `Você está prestes a excluir ${selectedIds.length} registros selecionados.`,
      warning: 'Essa ação não pode ser desfeita.',
      confirmLabel: 'Excluir selecionados',
      tone: 'danger',
      onConfirm: async () => {
        setLoadError('')
        try {
          await Promise.all(
            selectedIds.map(id =>
              fetch('/api/admin/leads', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, id }),
              }).then(async response => {
                const data = await response.json().catch(() => ({}))
                if (!response.ok) throw new Error(data.message || 'Não foi possível excluir os registros.')
              })
            )
          )
          if (type === 'candidato') {
            setCandidatos(items => items.filter(item => !selectedIds.includes(item.id || '')))
            setSelectedCandidatoIds([])
            await loadKanban()
          } else if (type === 'empresa') {
            setEmpresas(items => items.filter(item => !selectedIds.includes(item.id || '')))
            setSelectedEmpresaIds([])
          } else {
            setInteresses(items => items.filter(item => !selectedIds.includes(item.id || '')))
            setSelectedInteresseIds([])
          }
          showToast(`${selectedIds.length} registros excluídos.`)
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Não foi possível excluir os registros.'
          setLoadError(message)
          showToast(message, 'error')
        }
      },
    })
  }

  const kanbanRequest = async (method: 'POST' | 'PATCH' | 'DELETE', payload: Record<string, unknown>) => {
    const response = await fetch('/api/admin/kanban', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await response.json().catch(() => ({}))

    if (response.status === 401) {
      setAuthenticated(false)
      throw new Error('Sessão expirada.')
    }

    if (!response.ok) {
      throw new Error(data.message || 'Não foi possível atualizar o kanban.')
    }

    return data
  }

  const createBoard = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = newBoardTitle.trim()
    if (!title) return

    setKanbanError('')
    setKanbanLoading(true)

    try {
      const data = await kanbanRequest('POST', { action: 'create_board', title })
      setNewBoardTitle('')
      await loadKanban()
      if (data.board?.id) setActiveBoardId(data.board.id)
    } catch (error) {
      setKanbanError(error instanceof Error ? error.message : 'Não foi possível criar a seleção.')
    } finally {
      setKanbanLoading(false)
    }
  }

  const createStage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const title = newStageTitle.trim()
    if (!activeBoard || !title) return

    setKanbanError('')
    setKanbanLoading(true)

    try {
      await kanbanRequest('POST', { action: 'create_stage', boardId: activeBoard.id, title })
      setNewStageTitle('')
      await loadKanban()
    } catch (error) {
      setKanbanError(error instanceof Error ? error.message : 'Não foi possível criar a etapa.')
    } finally {
      setKanbanLoading(false)
    }
  }

  const updateBoardTitle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!activeBoard || !boardTitleDraft.trim()) return

    setKanbanError('')
    setKanbanLoading(true)

    try {
      await kanbanRequest('PATCH', {
        action: 'update_board',
        boardId: activeBoard.id,
        title: boardTitleDraft.trim(),
      })
      setEditingBoardTitle(false)
      await loadKanban()
      showToast('Título da seleção atualizado.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível atualizar a seleção.'
      setKanbanError(message)
      showToast(message, 'error')
    } finally {
      setKanbanLoading(false)
    }
  }

  const updateStageTitle = async (stage: KanbanStage) => {
    if (!stageTitleDraft.trim()) return

    setKanbanError('')
    setKanbanLoading(true)

    try {
      await kanbanRequest('PATCH', {
        action: 'update_stage',
        stageId: stage.id,
        title: stageTitleDraft.trim(),
      })
      setEditingStageId('')
      setStageTitleDraft('')
      await loadKanban()
      showToast('Etapa atualizada.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível atualizar a etapa.'
      setKanbanError(message)
      showToast(message, 'error')
    } finally {
      setKanbanLoading(false)
    }
  }

  const moveStage = async (stage: KanbanStage, direction: 'up' | 'down') => {
    if (!activeBoard) return
    setKanbanError('')
    setKanbanLoading(true)

    try {
      await kanbanRequest('PATCH', {
        action: 'move_stage',
        boardId: activeBoard.id,
        stageId: stage.id,
        direction,
      })
      await loadKanban()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível mover a etapa.'
      setKanbanError(message)
      showToast(message, 'error')
    } finally {
      setKanbanLoading(false)
    }
  }

  const updateCardNotes = async (card: KanbanCard, notes: string) => {
    setKanbanError('')

    try {
      await kanbanRequest('PATCH', {
        action: 'update_card',
        cardId: card.id,
        notes,
      })
      showToast('Observação do card salva.', 'info')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível salvar a observação.'
      setKanbanError(message)
      showToast(message, 'error')
    }
  }

  const addCandidateToBoard = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!activeBoard || !selectedCandidateId || !effectiveSelectedStageId) return

    setKanbanError('')
    setKanbanLoading(true)

    try {
      await kanbanRequest('POST', {
        action: 'create_card',
        boardId: activeBoard.id,
        stageId: effectiveSelectedStageId,
        candidateId: selectedCandidateId,
      })
      setSelectedCandidateId('')
      setCandidateSearch('')
      setCandidateSearchOpen(false)
      await loadKanban()
    } catch (error) {
      setKanbanError(error instanceof Error ? error.message : 'Não foi possível adicionar o candidato.')
    } finally {
      setKanbanLoading(false)
    }
  }

  const moveCard = async (cardId: string, stageId: string) => {
    if (!activeBoard || !cardId || !stageId) {
      setDraggedCardId('')
      setDragOverStageId('')
      return
    }

    const sourceStage = activeBoard.stages.find(stage =>
      stage.cards.some(card => card.id === cardId)
    )
    const movingCard = sourceStage?.cards.find(card => card.id === cardId)

    setDraggedCardId('')
    setDragOverStageId('')

    if (!sourceStage || !movingCard || sourceStage.id === stageId) {
      return
    }

    const targetBoardId = activeBoard.id
    const previousBoards = boards

    setBoards(prev =>
      prev.map(board => {
        if (board.id !== targetBoardId) return board
        return {
          ...board,
          stages: board.stages.map(stage => {
            if (stage.id === sourceStage.id) {
              return { ...stage, cards: stage.cards.filter(card => card.id !== cardId) }
            }
            if (stage.id === stageId) {
              return {
                ...stage,
                cards: [...stage.cards, { ...movingCard, stage_id: stageId }],
              }
            }
            return stage
          }),
        }
      })
    )

    setKanbanError('')

    try {
      await kanbanRequest('PATCH', {
        action: 'move_card',
        boardId: targetBoardId,
        cardId,
        stageId,
      })
      await loadKanban()
    } catch (error) {
      setBoards(previousBoards)
      const message =
        error instanceof Error ? error.message : 'Não foi possível mover o candidato.'
      setKanbanError(message)
      showToast(message, 'error')
    }
  }

  const archiveBoard = async (board: KanbanBoard) => {
    askConfirmation({
      title: 'Arquivar seleção',
      message: `Você está prestes a arquivar "${board.title}".`,
      warning: 'A seleção sairá da tela principal do Kanban, sem excluir candidatos ou currículos.',
      confirmLabel: 'Arquivar seleção',
      tone: 'warning',
      onConfirm: async () => {
        setKanbanError('')
        setKanbanLoading(true)

        try {
          await kanbanRequest('PATCH', { action: 'archive_board', boardId: board.id })
          if (activeBoardId === board.id) setActiveBoardId('')
          await loadKanban()
          showToast('Seleção arquivada.')
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Não foi possível arquivar a seleção.'
          setKanbanError(message)
          showToast(message, 'error')
        } finally {
          setKanbanLoading(false)
        }
      },
    })
  }

  const restoreBoard = async (board: KanbanBoard) => {
    askConfirmation({
      title: 'Restaurar seleção',
      message: `Você está prestes a restaurar "${board.title}".`,
      warning: 'A seleção voltará para a tela principal do Kanban.',
      confirmLabel: 'Restaurar seleção',
      tone: 'neutral',
      onConfirm: async () => {
        setKanbanError('')
        setKanbanLoading(true)

        try {
          await kanbanRequest('PATCH', { action: 'restore_board', boardId: board.id })
          if (activeBoardId === board.id) setActiveBoardId('')
          await loadKanban(true)
          showToast('Seleção restaurada.')
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Não foi possível restaurar a seleção.'
          setKanbanError(message)
          showToast(message, 'error')
        } finally {
          setKanbanLoading(false)
        }
      },
    })
  }

  const deleteBoard = async (board: KanbanBoard) => {
    askConfirmation({
      title: 'Excluir seleção',
      message: `Você está prestes a excluir "${board.title}" e todas as etapas deste kanban.`,
      warning: 'Essa ação não pode ser desfeita.',
      confirmLabel: 'Excluir seleção',
      tone: 'danger',
      onConfirm: async () => {
        setKanbanError('')
        setKanbanLoading(true)

        try {
          await kanbanRequest('DELETE', { action: 'delete_board', boardId: board.id })
          if (activeBoardId === board.id) setActiveBoardId('')
          await loadKanban()
          showToast('Seleção excluída.')
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Não foi possível excluir a seleção.'
          setKanbanError(message)
          showToast(message, 'error')
        } finally {
          setKanbanLoading(false)
        }
      },
    })
  }

  const deleteStage = async (stage: KanbanStage) => {
    askConfirmation({
      title: 'Excluir etapa',
      message: `Você está prestes a excluir "${stage.title}" e todos os cards dentro dela.`,
      warning: 'Essa ação não pode ser desfeita.',
      confirmLabel: 'Excluir etapa',
      tone: 'danger',
      onConfirm: async () => {
        setKanbanError('')
        setKanbanLoading(true)

        try {
          await kanbanRequest('DELETE', { action: 'delete_stage', stageId: stage.id })
          await loadKanban()
          showToast('Etapa excluída.')
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Não foi possível excluir a etapa.'
          setKanbanError(message)
          showToast(message, 'error')
        } finally {
          setKanbanLoading(false)
        }
      },
    })
  }

  const deleteCard = async (card: KanbanCard) => {
    const candidateName = getText(card.candidato?.nome, 'este candidato')
    askConfirmation({
      title: 'Remover candidato da etapa',
      message: `Você está prestes a remover ${candidateName} deste kanban.`,
      warning: 'O currículo não será excluído, apenas removido da etapa.',
      confirmLabel: 'Remover',
      tone: 'warning',
      onConfirm: async () => {
        setKanbanError('')
        setKanbanLoading(true)

        try {
          await kanbanRequest('DELETE', { action: 'delete_card', cardId: card.id })
          await loadKanban()
          showToast('Candidato removido da etapa.')
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Não foi possível remover o candidato da etapa.'
          setKanbanError(message)
          showToast(message, 'error')
        } finally {
          setKanbanLoading(false)
        }
      },
    })
  }

  const clearCandidatoFilters = () =>
    setCandidatoFilters({ nome: '', cargo: '', area: '', experiencia: '', salario: '' })

  const clearEmpresaFilters = () =>
    setEmpresaFilters({ nome: '', email: '', whatsapp: '', empresa: '' })

  const clearInteresseFilters = () =>
    setInteresseFilters({ nome: '', email: '', servico: '' })

  if (!authenticated) {
    return (
      <main className={styles.loginShell}>
        <form className={styles.loginCard} onSubmit={handleLogin}>
          <div className={styles.loginIcon}>
            <Lock size={22} />
          </div>
          <h1>Painel Porto Talent</h1>
          <p>Acesse currículos, solicitações de empresas e interesses em serviços.</p>

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
        <div className={styles.headerTop}>
          <div>
            <span className={styles.kicker}>Porto Talent</span>
            <h1>Painel administrativo</h1>
            <p>Consulta e atendimento dos leads recebidos pelo site.</p>
          </div>

          <div className={styles.headerActions}>
            <button className={styles.secondaryButton} type="button" onClick={refreshAll} disabled={loading || kanbanLoading}>
              <RefreshCcw size={16} />
              {loading || kanbanLoading ? 'Atualizando' : 'Atualizar'}
            </button>
            <button className={styles.secondaryButton} type="button" onClick={handleLogout}>
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </div>

        <nav className={styles.headerMenu} aria-label="Telas do painel administrativo">
          <button
            className={activeTab === 'candidatos' ? styles.headerMenuActive : ''}
            type="button"
            onClick={() => {
              setOpenActionMenuId('')
              setActiveTab('candidatos')
            }}
          >
            <UserRound size={16} />
            Currículos
          </button>
          <button
            className={activeTab === 'empresas' ? styles.headerMenuActive : ''}
            type="button"
            onClick={() => {
              setOpenActionMenuId('')
              setActiveTab('empresas')
            }}
          >
            <Building2 size={16} />
            Empresas
          </button>
          <button
            className={activeTab === 'interesses' ? styles.headerMenuActive : ''}
            type="button"
            onClick={() => {
              setOpenActionMenuId('')
              setActiveTab('interesses')
            }}
          >
            <Sparkles size={16} />
            Interesses
          </button>
          <button
            className={activeTab === 'kanban' ? styles.headerMenuActive : ''}
            type="button"
            onClick={() => {
              setOpenActionMenuId('')
              setActiveTab('kanban')
            }}
          >
            <Columns3 size={16} />
            Kanban
          </button>
        </nav>
      </header>

      {!serviceRole && (
        <div className={styles.warningBox}>
          Configure <strong>SUPABASE_SERVICE_ROLE_KEY</strong> no <strong>.env.local</strong> para o painel ler dados
          com RLS e gerar links de currículo privado.
        </div>
      )}

      {loadError && <div className={styles.errorBox}>{loadError}</div>}
      {kanbanError && <div className={styles.errorBox}>{kanbanError}</div>}

      <section className={`${styles.metricsGrid} ${activeTab === 'kanban' ? styles.metricsGridTwo : ''}`}>
        {activeTab === 'candidatos' && (
          <>
            <MetricCard label="currículos ativos" value={candidatos.filter(c => !isArchived(c)).length} icon={<UserRound size={18} />} />
            <MetricCard label="novos esta semana" value={candidatos.filter(c => !isArchived(c) && isRecentLead(c)).length} icon={<UserRound size={18} />} />
            <MetricCard label="arquivados" value={candidatos.filter(isArchived).length} icon={<Archive size={18} />} />
            <MetricCard label="total recebido" value={candidatos.length} icon={<UserRound size={18} />} />
          </>
        )}
        {activeTab === 'empresas' && (
          <>
            <MetricCard label="empresas ativas" value={empresas.filter(e => !isArchived(e)).length} icon={<Building2 size={18} />} />
            <MetricCard label="novas esta semana" value={empresas.filter(e => !isArchived(e) && isRecentLead(e)).length} icon={<Building2 size={18} />} />
            <MetricCard label="arquivadas" value={empresas.filter(isArchived).length} icon={<Archive size={18} />} />
            <MetricCard label="total recebido" value={empresas.length} icon={<Building2 size={18} />} />
          </>
        )}
        {activeTab === 'interesses' && (
          <>
            <MetricCard label="interesses ativos" value={interesses.filter(i => !isArchived(i)).length} icon={<Sparkles size={18} />} />
            <MetricCard label="novos esta semana" value={interesses.filter(i => !isArchived(i) && isRecentLead(i)).length} icon={<Sparkles size={18} />} />
            <MetricCard label="arquivados" value={interesses.filter(isArchived).length} icon={<Archive size={18} />} />
            <MetricCard label="total recebido" value={interesses.length} icon={<Sparkles size={18} />} />
          </>
        )}
        {activeTab === 'kanban' && (
          <>
            <MetricCard label="seleções ativas" value={activeBoardsCount} icon={<Columns3 size={18} />} />
            <MetricCard label="seleções arquivadas" value={archivedBoardsCount} icon={<Archive size={18} />} />
          </>
        )}
      </section>

      {activeTab !== 'kanban' && (
        <div className={styles.screenToolbar}>
          <div className={styles.toolbarGroup}>
            <button
              className={`${styles.secondaryButton} ${filtersOpen ? styles.secondaryButtonActive : ''}`}
              type="button"
              onClick={() => setFiltersOpen(open => !open)}
            >
              <SlidersHorizontal size={15} />
              Filtros
              {activeFiltersCount > 0 && <span className={styles.activeFiltersPill}>{activeFiltersCount}</span>}
            </button>
            <label className={styles.archiveToggle}>
              <input
                type="checkbox"
                checked={showArchived}
                onChange={event => setShowArchived(event.target.checked)}
              />
              Mostrar arquivados
            </label>
            <span className={styles.selectionHint}>{currentSelectedIds.length} selecionados</span>
          </div>
          <div className={styles.toolbarGroup}>
            <button className={styles.secondaryButton} type="button" onClick={exportCurrentCsv}>
              <FileDown size={16} />
              Exportar CSV
            </button>
            {currentSelectedIds.length > 0 && (
              <>
                {!showArchived && (
                  <button className={styles.secondaryButton} type="button" onClick={() => bulkUpdateLeadStatus(currentLeadType, 'archive')}>
                    <Archive size={16} />
                    Arquivar
                  </button>
                )}
                {showArchived && (
                  <button className={styles.secondaryButton} type="button" onClick={() => bulkUpdateLeadStatus(currentLeadType, 'restore')}>
                    <ArchiveRestore size={16} />
                    Restaurar
                  </button>
                )}
                <button className={`${styles.secondaryButton} ${styles.actionButtonDanger}`} type="button" onClick={() => bulkDeleteLeads(currentLeadType)}>
                  <Trash2 size={16} />
                  Excluir
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <section className={styles.panel}>
        {activeTab === 'candidatos' && (
          <>
            <div className={styles.tableMetaBar}>
              <div>
                <h2>{currentPanelTitle}</h2>
                <p>{currentPanelDescription}</p>
              </div>
              <div className={styles.tableStats}>
                <span>{filteredCandidatos.length} exibidos</span>
                <span>{currentRecentCount} novos em 7 dias</span>
                <span>{currentArchivedCount} arquivados</span>
              </div>
            </div>

            {filtersOpen && (
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
                <CustomSelect
                  value={candidatoFilters.area}
                  onChange={value => setCandidatoFilters(filters => ({ ...filters, area: value }))}
                  options={[{ value: '', label: 'Todas' }, ...areaOptions.map(a => ({ value: a, label: a }))]}
                  placeholder="Todas"
                />
              </label>
              <label>
                Experiência
                <CustomSelect
                  value={candidatoFilters.experiencia}
                  onChange={value => setCandidatoFilters(filters => ({ ...filters, experiencia: value }))}
                  options={[{ value: '', label: 'Todas' }, ...experienciaOptions.map(e => ({ value: e, label: e }))]}
                  placeholder="Todas"
                />
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
            )}

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>
                      <input
                        aria-label="Selecionar currículos filtrados"
                        type="checkbox"
                        checked={allCurrentFilteredSelected}
                        onChange={toggleAllCurrentSelection}
                      />
                    </th>
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
                    const archived = isArchived(candidato)
                    const whatsappUrl = getWhatsAppUrl(
                      candidato.whatsapp,
                      `Olá, ${getText(candidato.nome, '')}! Recebemos seu currículo pela Porto Talent.`
                    )
                    const mailUrl = getMailUrl(candidato.email, 'Porto Talent - currículo recebido')
                    const hasCv = Boolean(getText(candidato.cv_url, ''))
                    const rowId = candidato.id || `${candidato.email}-${candidato.created_at}`
                    const cvButtonId = candidato.id || getText(candidato.cv_url, '')

                    return (
                      <tr key={rowId} className={archived ? styles.archivedRow : ''}>
                        <td data-label="Selecionar">
                          <input
                            aria-label={`Selecionar ${getText(candidato.nome, 'candidato')}`}
                            type="checkbox"
                            checked={Boolean(candidato.id && selectedCandidatoIds.includes(candidato.id))}
                            onChange={() => toggleLeadSelection('candidatos', candidato.id)}
                          />
                        </td>
                        <td className={styles.primaryCell} data-label="Candidato">
                          <strong>{getText(candidato.nome)}</strong>
                          <span>{getText(candidato.email)}</span>
                          <span>{getText(candidato.whatsapp)}</span>
                        </td>
                        <td data-label="Cargo / área">
                          <strong>{getText(candidato.cargo_atual)}</strong>
                          <span>{getText(candidato.area_atuacao)}</span>
                          <span>{getText(candidato.cidade_estado)}</span>
                        </td>
                        <td data-label="Experiência">{getText(candidato.experiencia)}</td>
                        <td className={styles.moneyCell} data-label="Salário">{getText(candidato.pretensao_salarial)}</td>
                        <td className={styles.dateCell} data-label="Recebido">{formatDate(candidato.created_at)}</td>
                        <td data-label="Ações">
                          <div className={styles.rowActions}>
                            <ActionLink
                              href={whatsappUrl}
                              icon={<MessageCircle size={15} />}
                              label="WhatsApp"
                              variant="success"
                              iconOnly
                            />
                            <button
                              aria-label="Ver detalhes"
                              className={styles.actionIconButton}
                              title="Ver detalhes"
                              type="button"
                              onClick={() => {
                                setOpenActionMenuId('')
                                openLeadDetails('candidato', candidato)
                              }}
                            >
                              <Info size={15} />
                            </button>
                            <ActionMenu
                              open={openActionMenuId === rowId}
                              onToggle={() => setOpenActionMenuId(openActionMenuId === rowId ? '' : rowId)}
                            >
                              <ActionLink
                                href={mailUrl}
                                icon={<Mail size={15} />}
                                label="E-mail"
                                onClick={() => setOpenActionMenuId('')}
                              />
                              <RowActionButton
                                icon={<Eye size={15} />}
                                label={curriculoLoadingId === cvButtonId ? 'Abrindo curriculo' : 'Abrir curriculo'}
                                disabled={!hasCv || curriculoLoadingId === cvButtonId}
                                onClick={() => {
                                  setOpenActionMenuId('')
                                  openCurriculo(candidato)
                                }}
                              />
                              <RowActionButton
                                icon={archived ? <ArchiveRestore size={15} /> : <Archive size={15} />}
                                label={archived ? 'Restaurar' : 'Arquivar'}
                                disabled={mutatingLeadId === candidato.id}
                                variant="warning"
                                onClick={() => {
                                  setOpenActionMenuId('')
                                  updateLeadStatus('candidato', candidato, archived ? 'restore' : 'archive')
                                }}
                              />
                              <RowActionButton
                                icon={<Trash2 size={15} />}
                                label="Excluir"
                                disabled={mutatingLeadId === candidato.id}
                                variant="danger"
                                onClick={() => {
                                  setOpenActionMenuId('')
                                  deleteLead('candidato', candidato)
                                }}
                              />
                            </ActionMenu>
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
        )}

        {activeTab === 'empresas' && (
          <>
            <div className={styles.tableMetaBar}>
              <div>
                <h2>{currentPanelTitle}</h2>
                <p>{currentPanelDescription}</p>
              </div>
              <div className={styles.tableStats}>
                <span>{filteredEmpresas.length} exibidas</span>
                <span>{currentRecentCount} novas em 7 dias</span>
                <span>{currentArchivedCount} arquivadas</span>
              </div>
            </div>

            {filtersOpen && (
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
            )}

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>
                      <input
                        aria-label="Selecionar empresas filtradas"
                        type="checkbox"
                        checked={allCurrentFilteredSelected}
                        onChange={toggleAllCurrentSelection}
                      />
                    </th>
                    <th>Contato</th>
                    <th>Empresa</th>
                    <th>Vaga</th>
                    <th>Qtd.</th>
                    <th>Prazo</th>
                    <th>Mensagem</th>
                    <th>Recebido</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmpresas.map(empresa => {
                    const archived = isArchived(empresa)
                    const whatsappUrl = getWhatsAppUrl(
                      empresa.whatsapp,
                      `Olá, ${getText(empresa.nome, '')}! Recebemos sua solicitação de contato pela Porto Talent.`
                    )
                    const mailUrl = getMailUrl(empresa.email, 'Porto Talent - solicitação de contato')
                    const rowId = empresa.id || `${empresa.email}-${empresa.created_at}`

                    return (
                      <tr key={rowId} className={archived ? styles.archivedRow : ''}>
                        <td data-label="Selecionar">
                          <input
                            aria-label={`Selecionar ${getText(empresa.nome, 'empresa')}`}
                            type="checkbox"
                            checked={Boolean(empresa.id && selectedEmpresaIds.includes(empresa.id))}
                            onChange={() => toggleLeadSelection('empresas', empresa.id)}
                          />
                        </td>
                        <td className={styles.primaryCell} data-label="Contato">
                          <strong>{getText(empresa.nome)}</strong>
                          <span>{getText(empresa.email)}</span>
                          <span>{getText(empresa.whatsapp)}</span>
                        </td>
                        <td data-label="Empresa">
                          <strong>{getText(empresa.empresa)}</strong>
                        </td>
                        <td data-label="Vaga">{getText(empresa.vaga)}</td>
                        <td data-label="Qtd.">{getText(empresa.quantidade_colaboradores)}</td>
                        <td data-label="Prazo">
                          <span className={getPrazoBadgeClass(empresa.prazo)}>{getText(empresa.prazo)}</span>
                        </td>
                        <td className={styles.messageCell} data-label="Mensagem">{getText(empresa.mensagem)}</td>
                        <td className={styles.dateCell} data-label="Recebido">{formatDate(empresa.created_at)}</td>
                        <td data-label="Ações">
                          <div className={styles.rowActions}>
                            <ActionLink
                              href={whatsappUrl}
                              icon={<MessageCircle size={15} />}
                              label="WhatsApp"
                              variant="success"
                              iconOnly
                            />
                            <button
                              aria-label="Ver detalhes"
                              className={styles.actionIconButton}
                              title="Ver detalhes"
                              type="button"
                              onClick={() => {
                                setOpenActionMenuId('')
                                openLeadDetails('empresa', empresa)
                              }}
                            >
                              <Info size={15} />
                            </button>
                            <ActionMenu
                              open={openActionMenuId === rowId}
                              onToggle={() => setOpenActionMenuId(openActionMenuId === rowId ? '' : rowId)}
                            >
                              <ActionLink
                                href={mailUrl}
                                icon={<Mail size={15} />}
                                label="E-mail"
                                onClick={() => setOpenActionMenuId('')}
                              />
                              <RowActionButton
                                icon={archived ? <ArchiveRestore size={15} /> : <Archive size={15} />}
                                label={archived ? 'Restaurar' : 'Arquivar'}
                                disabled={mutatingLeadId === empresa.id}
                                variant="warning"
                                onClick={() => {
                                  setOpenActionMenuId('')
                                  updateLeadStatus('empresa', empresa, archived ? 'restore' : 'archive')
                                }}
                              />
                              <RowActionButton
                                icon={<Trash2 size={15} />}
                                label="Excluir"
                                disabled={mutatingLeadId === empresa.id}
                                variant="danger"
                                onClick={() => {
                                  setOpenActionMenuId('')
                                  deleteLead('empresa', empresa)
                                }}
                              />
                            </ActionMenu>
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

        {activeTab === 'interesses' && (
          <>
            <div className={styles.tableMetaBar}>
              <div>
                <h2>{currentPanelTitle}</h2>
                <p>{currentPanelDescription}</p>
              </div>
              <div className={styles.tableStats}>
                <span>{filteredInteresses.length} exibidos</span>
                <span>{currentRecentCount} novos em 7 dias</span>
                <span>{currentArchivedCount} arquivados</span>
              </div>
            </div>

            {filtersOpen && (
            <div className={styles.filterGrid}>
              <label>
                Nome
                <input
                  value={interesseFilters.nome}
                  onChange={event => setInteresseFilters(filters => ({ ...filters, nome: event.target.value }))}
                  placeholder="Buscar por nome"
                />
              </label>
              <label>
                E-mail
                <input
                  value={interesseFilters.email}
                  onChange={event => setInteresseFilters(filters => ({ ...filters, email: event.target.value }))}
                  placeholder="contato@email.com"
                />
              </label>
              <label>
                Serviço
                <input
                  value={interesseFilters.servico}
                  onChange={event => setInteresseFilters(filters => ({ ...filters, servico: event.target.value }))}
                  placeholder="Gestão comercial"
                />
              </label>
              <button className={styles.clearButton} type="button" onClick={clearInteresseFilters}>
                Limpar filtros
              </button>
            </div>
            )}

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>
                      <input
                        aria-label="Selecionar interesses filtrados"
                        type="checkbox"
                        checked={allCurrentFilteredSelected}
                        onChange={toggleAllCurrentSelection}
                      />
                    </th>
                    <th>Contato</th>
                    <th>Serviço</th>
                    <th>Origem</th>
                    <th>Recebido</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInteresses.map(interesse => {
                    const archived = isArchived(interesse)
                    const mailUrl = getMailUrl(interesse.email, 'Porto Talent - gestão comercial')
                    const rowId = interesse.id || `${interesse.email}-${interesse.created_at}`

                    return (
                      <tr key={rowId} className={archived ? styles.archivedRow : ''}>
                        <td data-label="Selecionar">
                          <input
                            aria-label={`Selecionar ${getText(interesse.nome, 'interesse')}`}
                            type="checkbox"
                            checked={Boolean(interesse.id && selectedInteresseIds.includes(interesse.id))}
                            onChange={() => toggleLeadSelection('interesses', interesse.id)}
                          />
                        </td>
                        <td className={styles.primaryCell} data-label="Contato">
                          <strong>{getText(interesse.nome)}</strong>
                          <span>{getText(interesse.email)}</span>
                        </td>
                        <td data-label="Serviço">
                          <strong>{getText(interesse.servico)}</strong>
                        </td>
                        <td data-label="Origem">{getText(interesse.origem)}</td>
                        <td className={styles.dateCell} data-label="Recebido">{formatDate(interesse.created_at)}</td>
                        <td data-label="Ações">
                          <div className={styles.rowActions}>
                            <ActionLink
                              href={mailUrl}
                              icon={<Mail size={15} />}
                              label="E-mail"
                              iconOnly
                            />
                            <button
                              aria-label="Ver detalhes"
                              className={styles.actionIconButton}
                              title="Ver detalhes"
                              type="button"
                              onClick={() => {
                                setOpenActionMenuId('')
                                openLeadDetails('interesse', interesse)
                              }}
                            >
                              <Info size={15} />
                            </button>
                            <ActionMenu
                              open={openActionMenuId === rowId}
                              onToggle={() => setOpenActionMenuId(openActionMenuId === rowId ? '' : rowId)}
                            >
                              <RowActionButton
                                icon={archived ? <ArchiveRestore size={15} /> : <Archive size={15} />}
                                label={archived ? 'Restaurar' : 'Arquivar'}
                                disabled={mutatingLeadId === interesse.id}
                                variant="warning"
                                onClick={() => {
                                  setOpenActionMenuId('')
                                  updateLeadStatus('interesse', interesse, archived ? 'restore' : 'archive')
                                }}
                              />
                              <RowActionButton
                                icon={<Trash2 size={15} />}
                                label="Excluir"
                                disabled={mutatingLeadId === interesse.id}
                                variant="danger"
                                onClick={() => {
                                  setOpenActionMenuId('')
                                  deleteLead('interesse', interesse)
                                }}
                              />
                            </ActionMenu>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {!loading && filteredInteresses.length === 0 && (
                <div className={styles.emptyState}>Nenhum interesse encontrado com esses filtros.</div>
              )}
            </div>
          </>
        )}

        {activeTab === 'kanban' && (
          <div className={styles.kanbanShell}>
            <aside className={styles.boardSidebar}>
              <form className={styles.boardCreateForm} onSubmit={createBoard}>
                <label>
                  Nova seleção
                  <input
                    value={newBoardTitle}
                    onChange={event => setNewBoardTitle(event.target.value)}
                    placeholder="Ex: Seleção vendedor"
                  />
                </label>
                <button className={styles.primaryMiniButton} type="submit" disabled={kanbanLoading || !newBoardTitle.trim()}>
                  <Plus size={15} />
                  Criar
                </button>
              </form>

              <div className={styles.boardSearch}>
                <input
                  value={boardSearch}
                  onChange={event => setBoardSearch(event.target.value)}
                  placeholder="Buscar seleção..."
                />
              </div>

              <div className={styles.boardList}>
                {filteredBoards.map(board => (
                  <button
                    key={board.id}
                    className={activeBoard?.id === board.id ? styles.boardButtonActive : styles.boardButton}
                    type="button"
                    onClick={() => {
                      setActiveBoardId(board.id)
                      setEditingBoardTitle(false)
                      setEditingStageId('')
                    }}
                  >
                    <Columns3 size={15} />
                    <span>{board.title}</span>
                  </button>
                ))}
                {filteredBoards.length === 0 && (
                  <p className={styles.boardListEmpty}>
                    {boardSearch ? 'Nenhuma seleção encontrada.' : showArchivedBoards ? 'Nenhuma seleção arquivada.' : 'Nenhuma seleção ativa.'}
                  </p>
                )}
              </div>

              <div className={styles.boardListDivider} />
              <button
                type="button"
                className={`${styles.boardArchivedToggle} ${showArchivedBoards ? styles.boardArchivedToggleActive : ''}`}
                onClick={() => {
                  const next = !showArchivedBoards
                  setShowArchivedBoards(next)
                  setActiveBoardId('')
                  void loadKanban(next)
                }}
              >
                <Archive size={14} />
                {showArchivedBoards ? 'Ver seleções ativas' : 'Ver seleções arquivadas'}
              </button>
            </aside>

            <div className={styles.kanbanMain}>
              {activeBoard ? (
                <>
                  <div className={styles.kanbanHeader}>
                    <div>
                      <span className={styles.kicker}>Seleção</span>
                      {editingBoardTitle ? (
                        <form className={styles.titleEditForm} onSubmit={updateBoardTitle}>
                          <input
                            value={boardTitleDraft}
                            onChange={event => setBoardTitleDraft(event.target.value)}
                            aria-label="Título da seleção"
                          />
                          <button className={styles.iconButton} type="submit" aria-label="Salvar título">
                            <Save size={15} />
                          </button>
                          <button className={styles.iconButton} type="button" aria-label="Cancelar edição" onClick={() => setEditingBoardTitle(false)}>
                            <X size={15} />
                          </button>
                        </form>
                      ) : (
                        <div className={styles.titleRow}>
                          <h2>{activeBoard.title}</h2>
                          <button
                            className={styles.iconButton}
                            type="button"
                            aria-label="Editar título da seleção"
                            onClick={() => {
                              setBoardTitleDraft(activeBoard.title)
                              setEditingBoardTitle(true)
                            }}
                          >
                            <Pencil size={15} />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className={styles.headerActions}>
                      <button className={styles.secondaryButton} type="button" onClick={exportKanbanCsv} disabled={activeBoard.stages.every(s => s.cards.length === 0)}>
                        <FileDown size={15} />
                        Exportar Excel
                      </button>
                      {activeBoard.archived_at ? (
                        <button className={styles.secondaryButton} type="button" onClick={() => restoreBoard(activeBoard)}>
                          <ArchiveRestore size={15} />
                          Restaurar seleção
                        </button>
                      ) : (
                        <button className={`${styles.secondaryButton} ${styles.actionButtonWarning}`} type="button" onClick={() => archiveBoard(activeBoard)}>
                          <Archive size={15} />
                          Arquivar seleção
                        </button>
                      )}
                      <button className={`${styles.secondaryButton} ${styles.actionButtonDanger}`} type="button" onClick={() => deleteBoard(activeBoard)}>
                        <Trash2 size={15} />
                        Excluir seleção
                      </button>
                    </div>
                  </div>

                  {!activeBoard.archived_at && <div className={styles.kanbanForms}>
                    <form className={styles.inlineForm} onSubmit={createStage}>
                      <input
                        value={newStageTitle}
                        onChange={event => setNewStageTitle(event.target.value)}
                        placeholder="Nome da nova etapa"
                      />
                      <button className={styles.secondaryButton} type="submit" disabled={kanbanLoading || !newStageTitle.trim()}>
                        <Plus size={15} />
                        Etapa
                      </button>
                    </form>

                    <form className={styles.inlineForm} onSubmit={addCandidateToBoard}>
                      <div className={styles.candidateSearchWrap}>
                        <input
                          value={candidateSearch}
                          onFocus={() => setCandidateSearchOpen(true)}
                          onBlur={() => window.setTimeout(() => setCandidateSearchOpen(false), 140)}
                          onChange={event => {
                            setCandidateSearch(event.target.value)
                            setSelectedCandidateId('')
                            setCandidateSearchOpen(true)
                          }}
                          placeholder="Pesquisar candidato por nome, cargo, e-mail ou WhatsApp"
                          aria-label="Pesquisar candidato"
                          autoComplete="off"
                        />
                        {candidateSearchOpen && (
                          <div className={styles.candidateSearchResults}>
                            {filteredKanbanCandidates.length > 0 ? (
                              filteredKanbanCandidates.map(candidato => (
                                <button
                                  key={candidato.id}
                                  type="button"
                                  onMouseDown={event => event.preventDefault()}
                                  onClick={() => {
                                    setSelectedCandidateId(candidato.id || '')
                                    setCandidateSearch(`${getText(candidato.nome)} - ${getText(candidato.cargo_atual)}`)
                                    setCandidateSearchOpen(false)
                                  }}
                                >
                                  <strong>{getText(candidato.nome)}</strong>
                                  <span>{getText(candidato.cargo_atual)} · {getText(candidato.whatsapp)}</span>
                                </button>
                              ))
                            ) : (
                              <div className={styles.candidateSearchEmpty}>Nenhum candidato disponível para esta seleção.</div>
                            )}
                          </div>
                        )}
                        {selectedKanbanCandidate && (
                          <span className={styles.selectedCandidatePill}>
                            Selecionado: {getText(selectedKanbanCandidate.nome)}
                          </span>
                        )}
                      </div>
                      <CustomSelect
                        value={effectiveSelectedStageId}
                        onChange={value => setSelectedStageId(value)}
                        options={activeBoard.stages.map(stage => ({ value: stage.id, label: stage.title }))}
                      />
                      <button
                        className={styles.secondaryButton}
                        type="submit"
                        disabled={kanbanLoading || !selectedCandidateId || !effectiveSelectedStageId}
                      >
                        <Plus size={15} />
                        Adicionar
                      </button>
                    </form>
                  </div>}

                  <div className={styles.kanbanColumns}>
                    {activeBoard.stages.map((stage, stageIndex) => (
                      <section
                        key={stage.id}
                        className={`${styles.kanbanColumn} ${dragOverStageId === stage.id ? styles.kanbanColumnDropTarget : ''}`}
                        onDragOver={event => {
                          if (!draggedCardId) return
                          event.preventDefault()
                          if (dragOverStageId !== stage.id) {
                            setDragOverStageId(stage.id)
                          }
                        }}
                        onDragLeave={event => {
                          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                            setDragOverStageId(current => (current === stage.id ? '' : current))
                          }
                        }}
                        onDrop={event => {
                          event.preventDefault()
                          if (draggedCardId) void moveCard(draggedCardId, stage.id)
                          setDragOverStageId('')
                        }}
                      >
                        <header className={styles.kanbanColumnHeader}>
                          <div>
                            {editingStageId === stage.id ? (
                              <form
                                className={styles.titleEditForm}
                                onSubmit={event => {
                                  event.preventDefault()
                                  void updateStageTitle(stage)
                                }}
                              >
                                <input
                                  value={stageTitleDraft}
                                  onChange={event => setStageTitleDraft(event.target.value)}
                                  aria-label="Título da etapa"
                                />
                                <button className={styles.iconButton} type="submit" aria-label="Salvar etapa">
                                  <Save size={14} />
                                </button>
                                <button className={styles.iconButton} type="button" aria-label="Cancelar edição" onClick={() => setEditingStageId('')}>
                                  <X size={14} />
                                </button>
                              </form>
                            ) : (
                              <strong>{stage.title}</strong>
                            )}
                            <span>{stage.cards.length} candidatos</span>
                          </div>
                          <div className={styles.columnActions}>
                            <button
                              className={styles.iconButton}
                              type="button"
                              onClick={() => moveStage(stage, 'up')}
                              disabled={stageIndex === 0 || kanbanLoading}
                              aria-label="Mover etapa para a esquerda"
                            >
                              <ArrowLeft size={15} />
                            </button>
                            <button
                              className={styles.iconButton}
                              type="button"
                              onClick={() => moveStage(stage, 'down')}
                              disabled={stageIndex === activeBoard.stages.length - 1 || kanbanLoading}
                              aria-label="Mover etapa para a direita"
                            >
                              <ArrowRight size={15} />
                            </button>
                            <button
                              className={styles.iconButton}
                              type="button"
                              onClick={() => {
                                setEditingStageId(stage.id)
                                setStageTitleDraft(stage.title)
                              }}
                              aria-label="Editar etapa"
                            >
                              <Pencil size={15} />
                            </button>
                            <button className={styles.iconButton} type="button" onClick={() => deleteStage(stage)} aria-label="Excluir etapa">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </header>

                        <div className={styles.kanbanCards}>
                          {stage.cards.map(card => {
                            const candidato = card.candidato
                            const name = getText(candidato?.nome, 'Candidato excluído')

                            return (
                              <article
                                key={card.id}
                                className={`${styles.kanbanCard} ${draggedCardId === card.id ? styles.kanbanCardDragging : ''}`}
                                draggable
                                onDragStart={event => {
                                  setDraggedCardId(card.id)
                                  event.dataTransfer.effectAllowed = 'move'
                                  try {
                                    event.dataTransfer.setData('text/plain', card.id)
                                  } catch {}
                                }}
                                onDragEnd={() => {
                                  setDraggedCardId('')
                                  setDragOverStageId('')
                                }}
                              >
                                <div className={styles.kanbanCardHandle}>
                                  <GripVertical size={15} />
                                </div>
                                <div>
                                  <button
                                    className={styles.kanbanCardInfoButton}
                                    type="button"
                                    disabled={!candidato}
                                    onClick={() => {
                                      if (candidato) openLeadDetails('candidato', candidato)
                                    }}
                                  >
                                    <strong>{name}</strong>
                                    <span>{getText(candidato?.cargo_atual)}</span>
                                    <span>{getText(candidato?.whatsapp)}</span>
                                  </button>
                                  <textarea
                                    className={styles.cardNotes}
                                    defaultValue={getText(card.notes, '')}
                                    placeholder="Observação interna"
                                    onBlur={event => {
                                      if (event.target.value.trim() !== getText(card.notes, '')) {
                                        void updateCardNotes(card, event.target.value)
                                      }
                                    }}
                                  />
                                </div>
                                <button className={styles.iconButton} type="button" onClick={() => deleteCard(card)} aria-label="Remover candidato da etapa">
                                  <X size={14} />
                                </button>
                              </article>
                            )
                          })}

                          {stage.cards.length === 0 && (
                            <div className={styles.kanbanEmpty}>Arraste candidatos para esta etapa.</div>
                          )}
                        </div>
                      </section>
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles.emptyState}>Crie uma seleção para começar a montar o kanban.</div>
              )}
            </div>
          </div>
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

      {selectedLead && (
        <div className={styles.drawerBackdrop} role="dialog" aria-modal="true" aria-label="Detalhes do lead">
          <aside className={styles.detailDrawer}>
            <header className={styles.drawerHeader}>
              <div>
                <span>
                  {selectedLead.type === 'candidato'
                    ? 'Currículo'
                    : selectedLead.type === 'interesse'
                      ? 'Interesse'
                      : 'Empresa'}
                </span>
                <strong>{getText(selectedLead.lead.nome)}</strong>
                <div className={styles.drawerHeaderMeta}>
                  <small>{formatDate(selectedLead.lead.created_at)}</small>
                </div>
              </div>
              <button className={styles.iconButton} type="button" onClick={() => setSelectedLead(null)} aria-label="Fechar detalhes">
                <X size={18} />
              </button>
            </header>

            <div className={styles.drawerSection}>
              <h3>Contato rapido</h3>
              <div className={styles.drawerActions}>
                {selectedLead.type !== 'interesse' && (
                  <ActionLink
                    href={getWhatsAppUrl(selectedLead.lead.whatsapp, `Olá, ${getText(selectedLead.lead.nome, '')}! Aqui é da Porto Talent.`)}
                    icon={<MessageCircle size={15} />}
                    label="WhatsApp"
                    variant="success"
                  />
                )}
                <ActionLink
                  href={getMailUrl(selectedLead.lead.email, 'Porto Talent')}
                  icon={<Mail size={15} />}
                  label="E-mail"
                />
                {selectedLead.type === 'candidato' && Boolean((selectedLead.lead as CandidatoLead).cv_url) && (
                  <button className={styles.actionButton} type="button" onClick={() => openCurriculo(selectedLead.lead as CandidatoLead)}>
                    <Eye size={15} />
                    Currículo
                  </button>
                )}
              </div>
            </div>

            <div className={styles.drawerSection}>
              <h3>Dados principais</h3>
              <dl className={styles.detailGrid}>
                <div><dt>E-mail</dt><dd>{getText(selectedLead.lead.email)}</dd></div>
                {selectedLead.type !== 'interesse' && (
                  <div><dt>WhatsApp</dt><dd>{getText(selectedLead.lead.whatsapp)}</dd></div>
                )}
                <div><dt>Recebido</dt><dd>{formatDate(selectedLead.lead.created_at)}</dd></div>
                {selectedLead.type === 'empresa' ? (
                  <>
                    <div><dt>Empresa</dt><dd>{getText((selectedLead.lead as EmpresaLead).empresa)}</dd></div>
                    <div><dt>Vaga</dt><dd>{getText((selectedLead.lead as EmpresaLead).vaga)}</dd></div>
                    <div><dt>Colaboradores</dt><dd>{getText((selectedLead.lead as EmpresaLead).quantidade_colaboradores)}</dd></div>
                    <div><dt>Prazo</dt><dd>{getText((selectedLead.lead as EmpresaLead).prazo)}</dd></div>
                    <div><dt>Mensagem</dt><dd>{getText((selectedLead.lead as EmpresaLead).mensagem)}</dd></div>
                  </>
                ) : selectedLead.type === 'interesse' ? (
                  <>
                    <div><dt>Serviço</dt><dd>{getText((selectedLead.lead as InteresseLead).servico)}</dd></div>
                  </>
                ) : (
                  <>
                    <div><dt>Cidade</dt><dd>{getText((selectedLead.lead as CandidatoLead).cidade_estado)}</dd></div>
                    <div><dt>Cargo</dt><dd>{getText((selectedLead.lead as CandidatoLead).cargo_atual)}</dd></div>
                    <div><dt>Área</dt><dd>{getText((selectedLead.lead as CandidatoLead).area_atuacao)}</dd></div>
                    <div><dt>Experiência</dt><dd>{getText((selectedLead.lead as CandidatoLead).experiencia)}</dd></div>
                    <div><dt>Salário</dt><dd>{getText((selectedLead.lead as CandidatoLead).pretensao_salarial)}</dd></div>
                    <div><dt>LinkedIn</dt><dd>{getText((selectedLead.lead as CandidatoLead).linkedin)}</dd></div>
                  </>
                )}
              </dl>
            </div>

            <div className={styles.drawerSection}>
              <h3>Origem</h3>
              <dl className={styles.detailGrid}>
                <div><dt>Origem</dt><dd>{getText(selectedLead.lead.origem)}</dd></div>
                <div><dt>UTM source</dt><dd>{getText(selectedLead.lead.utm_source)}</dd></div>
                <div><dt>UTM medium</dt><dd>{getText(selectedLead.lead.utm_medium)}</dd></div>
                <div><dt>UTM campaign</dt><dd>{getText(selectedLead.lead.utm_campaign)}</dd></div>
                <div><dt>Página</dt><dd>{getText(selectedLead.lead.landing_path)}</dd></div>
                <div><dt>Referência</dt><dd>{getText(selectedLead.lead.referrer)}</dd></div>
              </dl>
            </div>

            <div className={styles.drawerSection}>
              <h3>Observações internas</h3>
              <textarea
                className={styles.notesTextarea}
                value={notesDraft}
                onChange={event => setNotesDraft(event.target.value)}
                placeholder="Adicione observações sobre atendimento, triagem ou próximos passos."
              />
              <button className={styles.primaryMiniButton} type="button" onClick={saveLeadNotes} disabled={mutatingLeadId === selectedLead.lead.id}>
                <Save size={15} />
                Salvar observações
              </button>
            </div>
          </aside>
        </div>
      )}

      {confirmation && (
        <div className={styles.confirmBackdrop} role="dialog" aria-modal="true" aria-label={confirmation.title}>
          <div className={styles.confirmModal}>
            <div className={styles.confirmIcon}>
              <AlertTriangle size={24} />
            </div>
            <h2>{confirmation.title}</h2>
            <p>{confirmation.message}</p>
            {confirmation.warning && <strong>{confirmation.warning}</strong>}
            <div className={styles.confirmActions}>
              <button className={styles.secondaryButton} type="button" onClick={() => setConfirmation(null)}>
                Cancelar
              </button>
              <button
                className={`${styles.secondaryButton} ${
                  confirmation.tone === 'danger'
                    ? styles.actionButtonDanger
                    : confirmation.tone === 'warning'
                      ? styles.actionButtonWarning
                      : ''
                }`}
                type="button"
                onClick={() => {
                  const onConfirm = confirmation.onConfirm
                  setConfirmation(null)
                  void onConfirm()
                }}
              >
                {confirmation.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {toasts.length > 0 && (
        <div className={styles.toastStack} aria-live="polite">
          {toasts.map(toast => (
            <div
              className={`${styles.toast} ${
                toast.tone === 'success'
                  ? styles.toastSuccess
                  : toast.tone === 'error'
                    ? styles.toastError
                    : styles.toastInfo
              }`}
              key={toast.id}
            >
              {toast.tone === 'success' ? <CheckCircle2 size={16} /> : toast.tone === 'error' ? <AlertTriangle size={16} /> : <Info size={16} />}
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
