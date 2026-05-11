import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

type RateLimitEntry = {
  count: number
  resetAt: number
}

declare global {
  var __portoLeadRateLimit: Map<string, RateLimitEntry> | undefined
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 8
const rateLimitStore = globalThis.__portoLeadRateLimit ?? new Map<string, RateLimitEntry>()
globalThis.__portoLeadRateLimit = rateLimitStore

const consentSchema = z.preprocess(
  value => value === true || value === 'true' || value === 'on',
  z.literal(true, { error: 'É necessário aceitar a política de privacidade.' })
)

const requiredText = (field: string) =>
  z
    .string({ error: `${field} é obrigatório.` })
    .trim()
    .min(1, `${field} é obrigatório.`)
    .max(180, `${field} está muito longo.`)

const phoneSchema = z
  .string({ error: 'WhatsApp é obrigatório.' })
  .trim()
  .refine(value => value.replace(/\D/g, '').length >= 10, 'Informe um WhatsApp válido.')
  .refine(value => value.replace(/\D/g, '').length <= 13, 'Informe um WhatsApp válido.')

const optionalTrackingText = z.string().trim().max(240).optional().or(z.literal(''))
const trackingSchema = {
  utm_source: optionalTrackingText,
  utm_medium: optionalTrackingText,
  utm_campaign: optionalTrackingText,
  utm_term: optionalTrackingText,
  utm_content: optionalTrackingText,
  landing_path: z.string().trim().max(500).optional().or(z.literal('')),
  referrer: z.string().trim().max(500).optional().or(z.literal('')),
}

const companySchema = z.object({
  tipo: z.literal('empresa'),
  nome: requiredText('Nome'),
  empresa: requiredText('Empresa'),
  email: z.email('Informe um e-mail válido.').max(180),
  whatsapp: phoneSchema,
  vaga: requiredText('Vaga'),
  prazo: requiredText('Prazo'),
  mensagem: z.string().trim().max(1200, 'Mensagem está muito longa.').optional().or(z.literal('')),
  website: z.string().trim().optional(),
  lgpd: consentSchema,
  ...trackingSchema,
})

const candidateSchema = z.object({
  tipo: z.literal('candidato'),
  nome: requiredText('Nome'),
  email: z.email('Informe um e-mail válido.').max(180),
  whatsapp: phoneSchema,
  cidade_estado: requiredText('Cidade / Estado'),
  area_atuacao: requiredText('Área de atuação'),
  cargo_atual: requiredText('Cargo'),
  experiencia: requiredText('Experiência'),
  pretensao_salarial: z.string().trim().max(80, 'Pretensão salarial está muito longa.').optional().or(z.literal('')),
  linkedin: z.string().trim().max(240, 'LinkedIn está muito longo.').optional().or(z.literal('')),
  website: z.string().trim().optional(),
  lgpd: consentSchema,
  ...trackingSchema,
})

const allowedCvTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

const LEAD_WEBHOOK_TIMEOUT_MS = 8000
const LEAD_WEBHOOK_URLS = {
  empresa: 'https://webhook.rwsolucoesdigitais.com/webhook/empresanatalia',
  candidato: 'https://webhook.rwsolucoesdigitais.com/webhook/candidatonatalia',
} as const

function getValidationMessage(error: z.ZodError) {
  return error.issues[0]?.message || 'Revise os dados enviados.'
}

function safeFileName(name: string) {
  const extension = name.split('.').pop()?.toLowerCase() || 'pdf'
  return `${Date.now()}-${crypto.randomUUID()}.${extension}`
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'local'
  )
}

function isRateLimited(key: string) {
  const now = Date.now()
  const current = rateLimitStore.get(key)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  current.count += 1
  rateLimitStore.set(key, current)

  return current.count > RATE_LIMIT_MAX
}

function getTrackingInsert(data: object, request: NextRequest) {
  const values = data as Record<string, unknown>
  const text = (key: string, max = 240) => String(values[key] ?? '').trim().slice(0, max) || null

  return {
    utm_source: text('utm_source'),
    utm_medium: text('utm_medium'),
    utm_campaign: text('utm_campaign'),
    utm_term: text('utm_term'),
    utm_content: text('utm_content'),
    landing_path: text('landing_path', 500),
    referrer: text('referrer', 500),
    user_agent: request.headers.get('user-agent')?.slice(0, 500) || null,
  }
}

async function postLeadWebhook(type: keyof typeof LEAD_WEBHOOK_URLS, payload: Record<string, unknown>) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), LEAD_WEBHOOK_TIMEOUT_MS)

  try {
    const response = await fetch(LEAD_WEBHOOK_URLS[type], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Webhook ${type} returned ${response.status}`)
    }
  } finally {
    clearTimeout(timeout)
  }
}

async function safePostLeadWebhook(type: keyof typeof LEAD_WEBHOOK_URLS, payload: Record<string, unknown>) {
  try {
    await postLeadWebhook(type, payload)
  } catch (error) {
    console.error(`Lead webhook failed for ${type}:`, error instanceof Error ? error.message : error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request)
    if (isRateLimited(`lead:${clientIp}`)) {
      return NextResponse.json(
        { message: 'Muitas tentativas em sequência. Tente novamente em alguns minutos.' },
        { status: 429 }
      )
    }

    const contentType = request.headers.get('content-type') || ''
    const supabase = createSupabaseAdminClient()

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const payload = Object.fromEntries(formData.entries())
      const parsed = candidateSchema.safeParse(payload)

      if (!parsed.success) {
        return NextResponse.json({ message: getValidationMessage(parsed.error) }, { status: 400 })
      }

      if (parsed.data.website) {
        return NextResponse.json({ ok: true })
      }

      const file = formData.get('curriculo')
      let cv_url: string | null = null
      let cv_nome: string | null = null

      if (file instanceof File && file.size > 0) {
        if (!allowedCvTypes.has(file.type)) {
          return NextResponse.json({ message: 'Use PDF, DOC ou DOCX.' }, { status: 400 })
        }

        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json({ message: 'Arquivo maior que 5MB.' }, { status: 400 })
        }

        const path = safeFileName(file.name)
        const buffer = Buffer.from(await file.arrayBuffer())
        const { error: uploadError } = await supabase.storage.from('curriculos').upload(path, buffer, {
          contentType: file.type,
          upsert: false,
        })

        if (uploadError) {
          return NextResponse.json({ message: 'Não foi possível enviar o currículo.' }, { status: 500 })
        }

        cv_url = path
        cv_nome = file.name
      }

      const lead = parsed.data
      const leadInsert = {
        nome: lead.nome,
        email: lead.email,
        whatsapp: lead.whatsapp,
        cidade_estado: lead.cidade_estado,
        area_atuacao: lead.area_atuacao,
        cargo_atual: lead.cargo_atual,
        experiencia: lead.experiencia,
        pretensao_salarial: lead.pretensao_salarial || null,
        linkedin: lead.linkedin || null,
        lgpd: lead.lgpd,
        cv_url,
        cv_nome,
        origem: 'site',
        ...getTrackingInsert(lead, request),
      }
      const { data: savedLead, error } = await supabase
        .from('leads_candidato')
        .insert(leadInsert)
        .select('*')
        .single()

      if (error) {
        return NextResponse.json({ message: 'Não foi possível salvar o cadastro.' }, { status: 500 })
      }

      let cv_signed_url: string | null = null
      if (cv_url) {
        const { data } = await supabase.storage.from('curriculos').createSignedUrl(cv_url, 60 * 60 * 24)
        cv_signed_url = data?.signedUrl || null
      }

      await safePostLeadWebhook('candidato', {
        tipo: 'candidato',
        ...savedLead,
        cv_signed_url,
      })

      return NextResponse.json({ ok: true })
    }

    const body = await request.json().catch(() => null)
    const parsed = companySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ message: getValidationMessage(parsed.error) }, { status: 400 })
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true })
    }

    const lead = parsed.data
    const leadInsert = {
      nome: lead.nome,
      empresa: lead.empresa,
      email: lead.email,
      whatsapp: lead.whatsapp,
      vaga: lead.vaga,
      prazo: lead.prazo,
      mensagem: lead.mensagem || null,
      lgpd: lead.lgpd,
      origem: 'site',
      ...getTrackingInsert(lead, request),
    }
    const { data: savedLead, error } = await supabase
      .from('leads_empresa')
      .insert(leadInsert)
      .select('*')
      .single()

    if (error) {
      return NextResponse.json({ message: 'Não foi possível salvar a solicitação.' }, { status: 500 })
    }

    await safePostLeadWebhook('empresa', {
      tipo: 'empresa',
      ...savedLead,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ message: 'Erro inesperado ao enviar os dados.' }, { status: 500 })
  }
}
