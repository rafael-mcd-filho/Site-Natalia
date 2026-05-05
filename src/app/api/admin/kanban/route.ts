import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-session'
import { createSupabaseAdminClient, hasSupabaseServiceRole } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

const defaultStages = ['Triagem', 'Entrevista', 'Finalistas']

const requireAdmin = (request: NextRequest) => {
  const token = request.cookies.get(ADMIN_COOKIE)?.value

  if (!isValidAdminSession(token)) {
    return NextResponse.json({ message: 'Sessão expirada.' }, { status: 401 })
  }

  return null
}

const cleanText = (value: unknown) => String(value ?? '').trim()

const getNextPosition = async (
  supabase: ReturnType<typeof createSupabaseAdminClient>,
  table: string,
  filters: Record<string, string>
) => {
  let query = supabase.from(table).select('position').order('position', { ascending: false }).limit(1)

  Object.entries(filters).forEach(([key, value]) => {
    query = query.eq(key, value)
  })

  const { data } = await query
  return Number(data?.[0]?.position ?? -1) + 1
}

export async function GET(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  try {
    const supabase = createSupabaseAdminClient()

    const { data: boards, error: boardsError } = await supabase
      .from('recruitment_boards')
      .select('*')
      .is('archived_at', null)
      .order('created_at', { ascending: false })

    if (boardsError) {
      return NextResponse.json(
        { message: boardsError.message, serviceRole: hasSupabaseServiceRole() },
        { status: 500 }
      )
    }

    const boardIds = (boards ?? []).map(board => board.id)

    if (boardIds.length === 0) {
      return NextResponse.json({ boards: [], serviceRole: hasSupabaseServiceRole() })
    }

    const [stagesResult, cardsResult] = await Promise.all([
      supabase
        .from('recruitment_stages')
        .select('*')
        .in('board_id', boardIds)
        .order('position', { ascending: true }),
      supabase
        .from('recruitment_cards')
        .select('*, candidato:leads_candidato(*)')
        .in('board_id', boardIds)
        .order('position', { ascending: true }),
    ])

    if (stagesResult.error || cardsResult.error) {
      return NextResponse.json(
        {
          message: stagesResult.error?.message || cardsResult.error?.message || 'Não foi possível carregar o kanban.',
          serviceRole: hasSupabaseServiceRole(),
        },
        { status: 500 }
      )
    }

    const cardsByStage = new Map<string, unknown[]>()
    ;(cardsResult.data ?? []).forEach(card => {
      const current = cardsByStage.get(card.stage_id) ?? []
      current.push(card)
      cardsByStage.set(card.stage_id, current)
    })

    const stagesByBoard = new Map<string, unknown[]>()
    ;(stagesResult.data ?? []).forEach(stage => {
      const current = stagesByBoard.get(stage.board_id) ?? []
      current.push({
        ...stage,
        cards: cardsByStage.get(stage.id) ?? [],
      })
      stagesByBoard.set(stage.board_id, current)
    })

    return NextResponse.json({
      boards: (boards ?? []).map(board => ({
        ...board,
        stages: stagesByBoard.get(board.id) ?? [],
      })),
      serviceRole: hasSupabaseServiceRole(),
    })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Erro inesperado.' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const body = await request.json().catch(() => ({}))
  const action = cleanText(body.action)

  try {
    const supabase = createSupabaseAdminClient()

    if (action === 'create_board') {
      const title = cleanText(body.title)

      if (!title) {
        return NextResponse.json({ message: 'Informe o título da seleção.' }, { status: 400 })
      }

      const { data: board, error } = await supabase
        .from('recruitment_boards')
        .insert({ title })
        .select('*')
        .single()

      if (error || !board) {
        return NextResponse.json({ message: error?.message || 'Não foi possível criar a seleção.' }, { status: 500 })
      }

      const { error: stagesError } = await supabase.from('recruitment_stages').insert(
        defaultStages.map((stageTitle, index) => ({
          board_id: board.id,
          title: stageTitle,
          position: index,
        }))
      )

      if (stagesError) {
        return NextResponse.json({ message: stagesError.message }, { status: 500 })
      }

      return NextResponse.json({ board })
    }

    if (action === 'create_stage') {
      const boardId = cleanText(body.boardId)
      const title = cleanText(body.title)

      if (!boardId || !title) {
        return NextResponse.json({ message: 'Informe seleção e título da etapa.' }, { status: 400 })
      }

      const position = await getNextPosition(supabase, 'recruitment_stages', { board_id: boardId })
      const { data, error } = await supabase
        .from('recruitment_stages')
        .insert({ board_id: boardId, title, position })
        .select('*')
        .single()

      if (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
      }

      return NextResponse.json({ stage: data })
    }

    if (action === 'create_card') {
      const boardId = cleanText(body.boardId)
      const stageId = cleanText(body.stageId)
      const candidateId = cleanText(body.candidateId)

      if (!boardId || !stageId || !candidateId) {
        return NextResponse.json({ message: 'Informe seleção, etapa e candidato.' }, { status: 400 })
      }

      const position = await getNextPosition(supabase, 'recruitment_cards', {
        board_id: boardId,
        stage_id: stageId,
      })

      const { data, error } = await supabase
        .from('recruitment_cards')
        .insert({ board_id: boardId, stage_id: stageId, candidate_id: candidateId, position })
        .select('*')
        .single()

      if (error) {
        const message = error.code === '23505'
          ? 'Este candidato já está nesta seleção.'
          : error.message
        return NextResponse.json({ message }, { status: 500 })
      }

      return NextResponse.json({ card: data })
    }

    return NextResponse.json({ message: 'Ação inválida.' }, { status: 400 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Erro inesperado.' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const body = await request.json().catch(() => ({}))
  const action = cleanText(body.action)

  try {
    const supabase = createSupabaseAdminClient()

    if (action === 'update_board') {
      const boardId = cleanText(body.boardId)
      const title = cleanText(body.title)

      if (!boardId || !title) {
        return NextResponse.json({ message: 'Informe seleção e título.' }, { status: 400 })
      }

      const { data, error } = await supabase
        .from('recruitment_boards')
        .update({ title })
        .eq('id', boardId)
        .select('*')
        .single()

      if (error) return NextResponse.json({ message: error.message }, { status: 500 })
      return NextResponse.json({ board: data })
    }

    if (action === 'archive_board') {
      const boardId = cleanText(body.boardId)

      if (!boardId) {
        return NextResponse.json({ message: 'Seleção não informada.' }, { status: 400 })
      }

      const { data, error } = await supabase
        .from('recruitment_boards')
        .update({ archived_at: new Date().toISOString() })
        .eq('id', boardId)
        .select('*')
        .single()

      if (error) return NextResponse.json({ message: error.message }, { status: 500 })
      return NextResponse.json({ board: data })
    }

    if (action === 'update_stage') {
      const stageId = cleanText(body.stageId)
      const title = cleanText(body.title)

      if (!stageId || !title) {
        return NextResponse.json({ message: 'Informe etapa e título.' }, { status: 400 })
      }

      const { data, error } = await supabase
        .from('recruitment_stages')
        .update({ title })
        .eq('id', stageId)
        .select('*')
        .single()

      if (error) return NextResponse.json({ message: error.message }, { status: 500 })
      return NextResponse.json({ stage: data })
    }

    if (action === 'move_stage') {
      const boardId = cleanText(body.boardId)
      const stageId = cleanText(body.stageId)
      const direction = cleanText(body.direction)

      if (!boardId || !stageId || (direction !== 'up' && direction !== 'down')) {
        return NextResponse.json({ message: 'Informe seleção, etapa e direção.' }, { status: 400 })
      }

      const { data: stages, error: stagesError } = await supabase
        .from('recruitment_stages')
        .select('id, position')
        .eq('board_id', boardId)
        .order('position', { ascending: true })

      if (stagesError) return NextResponse.json({ message: stagesError.message }, { status: 500 })

      const currentIndex = (stages ?? []).findIndex(stage => stage.id === stageId)
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
      const current = stages?.[currentIndex]
      const target = stages?.[targetIndex]

      if (!current || !target) {
        return NextResponse.json({ ok: true })
      }

      const [first, second] = await Promise.all([
        supabase.from('recruitment_stages').update({ position: target.position }).eq('id', current.id),
        supabase.from('recruitment_stages').update({ position: current.position }).eq('id', target.id),
      ])

      if (first.error || second.error) {
        return NextResponse.json({ message: first.error?.message || second.error?.message }, { status: 500 })
      }

      return NextResponse.json({ ok: true })
    }

    if (action === 'move_card') {
      const cardId = cleanText(body.cardId)
      const stageId = cleanText(body.stageId)
      const boardId = cleanText(body.boardId)

      if (!cardId || !stageId || !boardId) {
        return NextResponse.json({ message: 'Informe card, seleção e etapa.' }, { status: 400 })
      }

      const position = await getNextPosition(supabase, 'recruitment_cards', {
        board_id: boardId,
        stage_id: stageId,
      })

      const { data, error } = await supabase
        .from('recruitment_cards')
        .update({ stage_id: stageId, position })
        .eq('id', cardId)
        .eq('board_id', boardId)
        .select('*')
        .single()

      if (error) return NextResponse.json({ message: error.message }, { status: 500 })
      return NextResponse.json({ card: data })
    }

    if (action === 'update_card') {
      const cardId = cleanText(body.cardId)
      const notes = cleanText(body.notes)

      if (!cardId) {
        return NextResponse.json({ message: 'Card não informado.' }, { status: 400 })
      }

      const { data, error } = await supabase
        .from('recruitment_cards')
        .update({ notes: notes || null })
        .eq('id', cardId)
        .select('*')
        .single()

      if (error) return NextResponse.json({ message: error.message }, { status: 500 })
      return NextResponse.json({ card: data })
    }

    return NextResponse.json({ message: 'Ação inválida.' }, { status: 400 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Erro inesperado.' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const body = await request.json().catch(() => ({}))
  const action = cleanText(body.action)

  try {
    const supabase = createSupabaseAdminClient()

    if (action === 'delete_board') {
      const boardId = cleanText(body.boardId)
      if (!boardId) return NextResponse.json({ message: 'Seleção não informada.' }, { status: 400 })

      const { error } = await supabase.from('recruitment_boards').delete().eq('id', boardId)
      if (error) return NextResponse.json({ message: error.message }, { status: 500 })
      return NextResponse.json({ ok: true })
    }

    if (action === 'delete_stage') {
      const stageId = cleanText(body.stageId)
      if (!stageId) return NextResponse.json({ message: 'Etapa não informada.' }, { status: 400 })

      const { error } = await supabase.from('recruitment_stages').delete().eq('id', stageId)
      if (error) return NextResponse.json({ message: error.message }, { status: 500 })
      return NextResponse.json({ ok: true })
    }

    if (action === 'delete_card') {
      const cardId = cleanText(body.cardId)
      if (!cardId) return NextResponse.json({ message: 'Card não informado.' }, { status: 400 })

      const { error } = await supabase.from('recruitment_cards').delete().eq('id', cardId)
      if (error) return NextResponse.json({ message: error.message }, { status: 500 })
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ message: 'Ação inválida.' }, { status: 400 })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Erro inesperado.' },
      { status: 500 }
    )
  }
}
