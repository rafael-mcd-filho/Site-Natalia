# Porto Talent — Documento de Desenvolvimento do Site

**Cliente:** Porto Talent Consultoria e Recrutamento
**Agência responsável:** Plugue MKT
**Tipo de entregável:** Landing page de alta conversão (single page)
**Objetivo primário:** Captação de empresas interessadas em contratar recrutamento e seleção
**Objetivo secundário:** Captação de candidatos para banco de talentos
**Data da especificação:** Abril de 2026

---

## Sumário

1. Contexto e diretrizes estratégicas
2. Paleta de cores oficial
3. Tipografia
4. Sistema de animações e interações globais
5. Estrutura da página (13 seções)
6. Seção 01 — Header
7. Seção 02 — Hero
8. Seção 03 — Dor
9. Seção 04 — Proposta de valor
10. Seção 05 — Serviços
11. Seção 06 — Processo em etapas
12. Seção 07 — Diferenciais
13. Seção 08 — Prova social
14. Seção 09 — CTA intermediário + formulário empresas
15. Seção 10 — Área do candidato
16. Seção 11 — FAQ
17. Seção 12 — CTA final
18. Seção 13 — Footer
19. Elementos flutuantes e extras
20. Checklist técnico final

---

## 1. Contexto e diretrizes estratégicas

### Sobre a Porto Talent

Consultoria de recrutamento e seleção baseada em João Pessoa/PB que atende empresas de pequeno e médio porte, com foco em vagas comerciais, administrativas e operacionais. O posicionamento é **consultivo e premium**, não de agência de empregos de volume.

### Promessa de valor

> Ajudamos empresas a encontrar o candidato certo para cada vaga, por meio de um processo de recrutamento personalizado e estratégico.

### Frases-âncora da marca

Duas frases atravessam o site, aparecendo em pontos estratégicos para criar eco persuasivo:

- **"Empresas não precisam de mais currículos. Precisam do candidato certo."** (Hero)
- **"Contratar bem não é sorte. É estratégia."** (CTA final)

### Valores da marca

- **Confiança**
- **Assertividade**
- **Profissionalismo**

### Percepção desejada

Consultoria confiável, que entrega candidatos realmente alinhados à necessidade da empresa. Solução estratégica para contratação assertiva — não uma simples agência de currículos.

### Hierarquia dupla de públicos

O site atende dois públicos com pesos diferentes:

- **Público primário (empresas contratantes):** toda a página é construída para converter esse público. Todo o design, copy e CTAs são pensados para o decisor B2B (dono de empresa, gestor, DP).
- **Público secundário (candidatos):** existe uma seção dedicada, mas visualmente separada, sem competir pela atenção do público primário.

Essa hierarquia se reflete no header (botão CTA destacado para empresas, link de texto discreto para candidatos), na ordem das seções (empresas primeiro, candidatos depois da prova social) e no contraste visual da seção de candidatos (cor de fundo diferente para marcar transição).

### Ritmo visual da página

O site todo trabalha com **três camadas de cor alternadas** para manter o olhar engajado:

1. **Branco/claro** — respiro e conteúdo principal
2. **Bege creme** — calor, humanidade, identidade
3. **Preto profundo** — autoridade, momentos de ação

A alternância entre essas três camadas é o que sustenta a leitura até o final sem fadiga visual.

---

## 2. Paleta de cores oficial

### Cores primárias

| Cor | Hex | Uso |
|---|---|---|
| Preto profundo | `#0E0E0E` | Texto principal, botões CTA, logos, autoridade |
| Bege claro | `#F2E6D8` | Fundos de seção, quebra de ritmo, humanidade |
| Branco | `#FFFFFF` | Fundo padrão, cards, respiros |

### Cores de suporte

| Cor | Hex | Uso |
|---|---|---|
| Bege creme claro | `#FAF5EE` | Fundo suave em seções alternadas, cards de depoimentos |
| Bege quente | `#EDE0CC` | Fundo da seção de candidatos (marca transição) |
| Cinza escuro | `#333333` | Texto secundário, descrições |
| Cinza médio | `#8A8A8A` | Microtextos, placeholders, legendas |
| Cinza suave | `#EAEAEA` | Bordas de cards, divisores |
| Cinza claro | `#DCD0BF` | Linhas divisórias sobre fundo bege |
| Cinza muito claro | `#E8E0D4` | Números inativos da timeline de processo |
| Dourado sutil | `#B8935A` | Detalhes, acentos, hovers, linhas decorativas |

### Regras de uso

- Preto puro `#000000` **não** é usado em nenhum lugar. Sempre `#0E0E0E` — menos agressivo, mais elegante.
- Dourado `#B8935A` só aparece em **detalhes pontuais**: linhas decorativas no topo das seções, hovers, ícones ativos, aspas decorativas, acentos editoriais. **Nunca** em blocos grandes ou fundos.
- Fundos das seções alternam entre branco, bege claro e preto — sempre com lógica narrativa, não estética aleatória.

---

## 3. Tipografia

### Combinação oficial

- **Títulos e headlines:** serifa elegante — **Playfair Display**, **Cormorant Garamond** ou **DM Serif Display**. Peso 500-600.
- **Corpo de texto, botões, menus, formulários:** sans-serif limpa — **Inter**, **Manrope** ou **Satoshi**. Peso 400 para corpo, 500 para botões e labels, 600 para destaques.

### Justificativa

Serifa nos títulos comunica posicionamento consultivo e editorial, elevando a marca acima das agências de emprego comuns. Sans-serif no corpo mantém legibilidade moderna e acessibilidade.

### Escala tipográfica (desktop)

| Elemento | Tamanho | Peso | Família |
|---|---|---|---|
| H1 Hero | 64-72px | 500 | Serifa |
| H1 seção | 48-56px | 500 | Serifa |
| H2 | 36-40px | 500 | Serifa |
| H3 / Subheadline | 22-24px | 400 | Sans |
| Corpo | 17-18px | 400 | Sans |
| Small / Legenda | 14px | 400 | Sans |
| Eyebrow / Tag | 12-13px | 600 | Sans (letter-spacing 0.2em, uppercase) |
| Botão | 15-16px | 500 | Sans (letter-spacing 0.02em) |

### Escala tipográfica (mobile)

Todos os tamanhos reduzidos em 25-30%. H1 mobile não ultrapassa 42px.

### Tratamentos especiais

- **Números grandes** (stats, etapas, cards numerados): sempre em serifa, peso 400-500, tamanho entre 72px e 120px dependendo do contexto.
- **Eyebrows**: sempre uppercase, sans-serif, espaçamento entre letras 0.2em-0.3em, cor cinza médio ou dourado.
- **Palavras-destaque** dentro de headlines (ex: "certo", "estratégia"): podem ganhar underline orgânico animado em SVG (desenho à mão).

---

## 4. Sistema de animações e interações globais

### Regra de ouro

**Toda animação é guia de olhar, não decoração.** Nada de animação que atrapalhe leitura ou que sirva apenas para "mostrar que o site tem animação". Cada movimento tem função: revelar, enfatizar, conduzir, confirmar.

### Fade-up on scroll

Todo elemento principal (headlines, parágrafos, cards, imagens) entra no viewport com:

- **Deslocamento vertical:** 20px (de baixo para cima)
- **Duração:** 600ms
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out suave)
- **Implementação:** IntersectionObserver, trigger quando elemento está 10% visível

### Stagger em grupos

Quando vários elementos aparecem juntos (ex: cards em grid), eles entram em sequência com **80-120ms** entre cada. Cria sensação de construção da cena, não aparição simultânea.

### Hovers padrão

- **Botões CTA:** lift de 2px (`translateY(-2px)`), sombra cresce sutilmente, cor de fundo vai para 95% de opacidade. Transição 250ms.
- **Cards:** lift de 4px, sombra mais visível (`0 12px 40px rgba(0,0,0,0.06)`), borda muda de cinza para preta. Transição 300ms.
- **Links de texto:** underline anima da esquerda para a direita (transform scaleX de 0 para 1). 300ms.
- **Ícones:** rotação 8° + troca para cor dourada. 250ms.

### Cursor customizado (opcional, mas recomendado)

Círculo fino de 16px que segue o mouse. Cresce para 40px quando sobre elementos clicáveis. Fica transparente com borda dourada sobre imagens. Remove cursor nativo. Melhora percepção de "agência boutique".

### Scroll suave

Todo scroll do site (links âncora, CTAs que navegam dentro da página) usa `scroll-behavior: smooth` com offset para compensar o header fixo.

### Parallax suave

Imagens principais (hero, seção "Proposta de valor") movem **10-15% mais devagar que o scroll**. Implementação: `transform: translateY()` baseado em `scrollY`. Não aplicar em mobile (performance).

---

## 5. Estrutura da página (ordem obrigatória)

```
01. Header (fixo)
02. Hero
03. Dor — "Contratar no escuro custa caro"
04. Proposta de valor — "Por que Porto Talent"
05. Serviços (3 cards)
06. Processo em etapas (timeline de 5 etapas)
07. Diferenciais (grid 2x3)
08. Prova social (parceiros + depoimentos)
09. CTA intermediário + formulário empresas
10. Área do candidato (formulário secundário)
11. FAQ
12. CTA final
13. Footer
```

Lógica narrativa: **Problema → Solução → Método → Prova → Ação**. Essa ordem é validada para B2B de serviço consultivo e não deve ser alterada.

---

## 6. Seção 01 — Header

### Comportamento

- **Sticky no topo** da página em toda a navegação.
- **Estado inicial (hero visível):** fundo transparente sobre o hero. Altura 88px.
- **Após scroll de 80px:** ganha fundo branco + sombra fina `0 1px 20px rgba(0,0,0,0.04)`. Altura reduz para 68px. Transição de altura e cor em 300ms.

### Estrutura (desktop)

**Lado esquerdo:** logo Porto Talent (36px de altura).

**Centro:** menu horizontal com os itens:

- Início
- Serviços
- Processo
- Depoimentos
- Contato

**Lado direito:**

- Link de texto **"Sou candidato →"** — cor cinza escuro, sans-serif, sem botão (hierarquia secundária). Underline animado no hover.
- Botão CTA **"Quero contratar"** — fundo preto `#0E0E0E`, texto creme `#F2E6D8`, padding 12px 24px, border-radius 4px.

### Micro-interações

- **Itens do menu:** cada um com underline que desliza da esquerda no hover (`transform: scaleX`).
- **Botão CTA:** lift 2px + sombra aumenta + fundo vai para `#1A1A1A`. Transição 250ms.
- **Link "Sou candidato":** seta desliza 4px para a direita no hover.

### Mobile

- Logo + ícone hambúrguer à direita.
- Hambúrguer animado: três linhas finas que viram X com rotação suave (300ms).
- Menu em **overlay full-screen** com fundo bege `#F2E6D8`, fade-in de 400ms.
- Itens do menu entram em stagger de 80ms, tipografia maior (24px).
- Ao final do menu mobile: botão CTA "Quero contratar" grande + link "Sou candidato".

---

## 7. Seção 02 — Hero

### Função

Decidir em 3 segundos se o visitante continua ou sai. Entregar **proposta de valor + diferencial + CTA** imediatamente.

### Layout

- **Split 55/45:** coluna esquerda com texto (55%), coluna direita com imagem (45%).
- **Altura:** 100vh no desktop, min-height 90vh no mobile.
- **Padding:** generoso — 120px horizontal, respiro forte em cima e embaixo.
- **Fundo:** gradiente diagonal de `#FAF5EE` (topo-esquerda) para `#F2E6D8` (baixo-direita). Adiciona profundidade sem parecer colorido demais.

### Elemento decorativo

Linha fina dourada (`#B8935A`) horizontal, com 60px de largura, acima da eyebrow. Essa linha aparece no início de **todas as seções do site** como marca visual da identidade (vira um "tique" da marca).

### Copy

**Eyebrow (badge discreta acima da headline):**
> CONSULTORIA DE RECRUTAMENTO E SELEÇÃO

**Headline (H1) em duas linhas:**
> Empresas não precisam de mais currículos.
> **Precisam do candidato certo.**

- Primeira linha em cinza escuro `#333333`, peso 400.
- Segunda linha em preto `#0E0E0E`, peso 500, tamanho ligeiramente maior.
- Quebra visual entre as duas linhas força a leitura da chave.

**Subheadline:**
> Selecionamos profissionais alinhados à sua vaga, à sua cultura e à sua operação. Você recebe finalistas — não currículos. Assertividade em vez de volume.

**CTA primário (botão grande):**
> Quero contratar com assertividade

**Linha de apoio (abaixo do CTA, cinza médio, com ícones inline pequenos):**
> ⏱ Resposta em até 24h · 🔒 Atendimento personalizado · 📍 João Pessoa e região

### Mídia principal

**Imagem da coluna direita:** foto profissional em enquadramento vertical (proporção 4:5 ou 3:4).

**Direção fotográfica — Opção A (recomendada):**
> Retrato da Porto Talent em ambiente de escritório. Look sóbrio em preto, bege ou branco. Olhar direcionado (para a câmera ou para o lado, como analisando documento). Cria conexão humana imediata.

**Direção fotográfica — Opção B (alternativa):**
> Detalhe de mãos em reunião: caneta, caderno aberto, notebook. Luz natural. Paleta terrosa. Mais minimalista, menos memorável.

**Tratamento visual da foto:**

- **Máscara com border-radius assimétrico:** `120px 8px 120px 8px`. Quebra o retângulo óbvio e dá identidade.
- **Retângulo preto por trás** (`#0E0E0E`), deslocado 20px para baixo e para a direita, criando efeito de camada/profundidade.

### Animações

**On load (sequência):**

1. Eyebrow aparece (fade 200ms, delay 0ms)
2. Headline linha 1 (fade-up 400ms, delay 150ms)
3. Headline linha 2 (fade-up 500ms, delay 300ms)
4. Subheadline (fade-up 600ms, delay 500ms)
5. CTA (fade-up + scale sutil 700ms, delay 700ms)
6. Linha de apoio (fade 800ms, delay 900ms)
7. Imagem entra por último (fade + scale de 1.05 para 1.0 em 900ms, delay 400ms)

**Durante scroll:**

- Parallax suave na imagem: ela se move 10-15% mais devagar que o resto do conteúdo.

### Micro-detalhes

- **Palavra "certo"** na headline recebe um **underline orgânico desenhado à mão** (SVG com `stroke-dasharray` animado). Aparece 1 segundo após o load, desenhando-se da esquerda para a direita em 800ms.
- **CTA respira:** após 2s parado sem interação, aplica pulse infinito muito sutil (`box-shadow` cresce e recolhe em 2.5s). Para imediatamente quando o mouse se aproxima.
- **Badge eyebrow:** tem um ponto animado antes do texto (tipo status "ativo") pulsando suavemente em 1.5s.
- **Cursor sobre a imagem:** cursor custom aparece como círculo pequeno com texto "focus" ou ícone de visualização.

### Pontos de destaque

- Contraste tipográfico entre linha 1 e linha 2 da headline é o elemento mais forte visualmente.
- O underline orgânico na palavra "certo" cria assinatura visual memorável.
- A foto com retângulo preto atrás comunica sofisticação editorial.

---

## 8. Seção 03 — Dor ("Contratar no escuro custa caro")

### Função

Fazer o decisor pensar "é exatamente isso que eu sinto". Validar a dor — não machucar, apenas espelhar. Cria desejo de continuar lendo.

### Layout

- **Grid de 3 colunas** (desktop) → **1 coluna** (mobile, cards empilhados).
- **Fundo branco puro** `#FFFFFF`.
- **Padding vertical:** 120px.
- **Headline centralizada** em cima, cards abaixo.

### Copy

**Eyebrow centralizada:**
> O PROBLEMA

**Headline (H2) centralizada:**
> Contratar no escuro custa caro.

- Palavra "caro" em peso mais forte + ponto dourado `#B8935A` depois do ponto final (tipo pausa decorativa).
- Separador fino dourado horizontal (40px) abaixo da headline, centralizado.

**Subheadline (texto corrido, centralizado, max-width 720px):**
> Toda empresa que já contratou errado conhece o preço: não é só o salário perdido. É o tempo do time treinando alguém que vai embora. O cliente mal atendido. A vaga que volta a ficar em aberto. E a pilha de currículos — de novo — na sua mesa.

### Cards de dor

**Card 01:**
- Ícone SVG custom: papéis empilhados (stroke 1.5px, cor preta)
- Título: **Currículos demais. Tempo de menos.**
- Texto: Dezenas de CVs chegam toda semana. Você não tem horas para avaliar cada um com o cuidado que a vaga exige.

**Card 02:**
- Ícone SVG custom: seta circular (loop de rotatividade)
- Título: **Contrata rápido, perde rápido.**
- Texto: A rotatividade alta drena o time, os custos e a paciência. E o ciclo recomeça em poucos meses.

**Card 03:**
- Ícone SVG custom: alvo descentralizado (indicando desalinhamento)
- Título: **Perfil técnico ≠ perfil de cultura.**
- Texto: O currículo parecia ideal. O dia a dia mostrou que não era. De novo.

### Estilo dos cards

- **Fundo:** branco (igual ao fundo da seção) — o que delimita o card é a borda.
- **Borda:** 1px sólida `#EAEAEA`.
- **Padding interno:** 40px.
- **Ícone:** 32px, cor preta, posicionado no topo do card.
- **Título:** sans-serif peso 600, 18-20px, cor preta.
- **Texto:** sans-serif peso 400, 15-16px, cor cinza escuro `#333333`.
- **Sem sombra no estado normal** — a sombra aparece apenas no hover.

### Biblioteca de ícones

Ícones SVG lineares customizados, com stroke fino 1.5px. **Não** usar Font Awesome genérico. **Não** usar emoji. Base recomendada: **Lucide Icons** customizados, mantendo coerência com todos os outros ícones do site (todos da mesma família).

### Animações

- **Entrada dos cards em stagger de 120ms** (01, 02, 03) com fade-up ao entrar no viewport.
- **Hover do card:**
  - Lift de 4px (`translateY(-4px)`)
  - Sombra aparece suavemente: `box-shadow: 0 12px 40px rgba(0,0,0,0.06)`
  - Borda vira preta `#0E0E0E`
  - Ícone roda 8° e muda cor para dourado `#B8935A`
  - Transição total: 300ms ease-out
- **Headline:** fade-up padrão ao entrar no viewport.

---

## 9. Seção 04 — Proposta de valor ("Por que Porto Talent")

### Função

Explicar o método da Porto Talent de forma humanizada, criando confiança através do detalhe do processo e da atitude consultiva.

### Layout

- **Split 40/60:** imagem à esquerda (40%), bloco de texto à direita (60%).
- **Fundo:** branco `#FFFFFF`.
- **Padding vertical:** 120px.

### Copy

**Eyebrow:**
> A DIFERENÇA

**Headline (H2) em duas linhas:**
> Recrutamento não é preencher uma vaga.
> **É encontrar a pessoa certa.**

- Primeira linha em cinza escuro, peso 400.
- Segunda linha em preto, peso 500.

**Texto (3 parágrafos em prosa, sem bullets):**

**Parágrafo 1:**
> Na Porto Talent, cada processo começa com uma conversa — não com um anúncio. Antes de buscar candidatos, a gente entende a sua empresa por dentro: o que você faz, como o time trabalha, que tipo de pessoa se adapta à sua cultura e o que essa contratação precisa gerar.

**Parágrafo 2:**
> A partir daí, conduzimos uma curadoria criteriosa. Análise de currículos, entrevistas estruturadas, avaliação comportamental. Você não recebe uma lista. Recebe uma **seleção**.

**Parágrafo 3:**
> O resultado: processos mais curtos, contratações que duram mais e menos ruído no seu dia.

### Mídia

**Imagem da coluna esquerda:** foto em orientação vertical, enquadramento próximo.

**Sugestões de cena:**

- Reunião de briefing (3 pessoas ao redor de mesa com documentos, luz natural)
- Aperto de mão entre cliente e candidato em contexto de entrevista
- Detalhe de notebook + caderno + xícara em ambiente organizado

**Tratamento visual da foto:** mesmo da foto do hero — border-radius assimétrico + retângulo bege atrás dela (deslocado), mantendo coerência visual.

### Stat block sobreposto à foto

**Cartão pequeno branco com sombra** (`box-shadow: 0 16px 48px rgba(0,0,0,0.08)`), posicionado no canto inferior direito da imagem, sobreposto parcialmente.

**Conteúdo do cartão:**

```
97%
Taxa de adaptação
dos profissionais
indicados
```

- Número grande "97%" em serifa, 64px, peso 500, cor preta.
- Texto descritivo em sans, 13px, cor cinza escuro, peso 400.
- Padding do cartão: 24px 28px.
- Nota: número pode ser ajustado posteriormente pelo Rafael conforme dados reais. Alternativa se preferir sem número: substituir por frase curta tipo *"Curadoria, não volume"* em serifa.

### Animações

- **Imagem entra** com parallax suave: de baixo para cima, 40px, junto com fade, ao entrar no viewport.
- **Stat card** entra 300ms **depois da imagem**, com scale de 0.9 para 1.0 + fade.
- **Número 97%** usa **count-up animation**: anima de 0 a 97 em 1.2 segundos quando a seção entra no viewport.
- **Texto da coluna direita entra em stagger:**
  1. Eyebrow
  2. Headline linha 1
  3. Headline linha 2
  4. Parágrafo 1
  5. Parágrafo 2
  6. Parágrafo 3
  - Stagger de 100ms entre cada elemento.
- **Palavra "seleção"** no parágrafo 2 tem highlight animado: um fundo dourado se desenha atrás da palavra quando a seção entra no viewport (SVG com `clip-path` animado, 600ms).

### Pontos de destaque

- O **"97%"** é o elemento mais chamativo visualmente da seção.
- O **highlight na palavra "seleção"** cria pausa estratégica e reforça o conceito-chave.
- O contraste tipográfico da headline (cinza → preto) guia o olhar.

---

## 10. Seção 05 — Serviços ("O que a Porto Talent entrega")

### Função

Apresentar as três frentes de serviço de forma direta e escaneável, com visual que comunica organização e método.

### Layout

- **Grid de 3 colunas** (desktop) → 1 coluna (mobile).
- **Fundo:** bege creme claro `#FAF5EE` — transição de cor da seção anterior (branco) para criar respiro.
- **Padding vertical:** 120px.
- **Cabeçalho da seção centralizado em cima, cards abaixo em grid.**

### Copy

**Eyebrow centralizada:**
> SERVIÇOS

**Headline (H2) centralizada:**
> O que a Porto Talent entrega

**Subheadline curta (abaixo da headline, centralizada):**
> Três frentes. Um objetivo: contratação certa, na primeira vez.

### Cards de serviço

Cada card tem:

- **Número grande** em serifa (72px, cor bege escuro `#C4A57B` ou dourado `#B8935A`), peso 400, posicionado no topo.
- **Ícone SVG linear** pequeno ao lado do número (24px).
- **Título do serviço** em sans-serif peso 600, 20-22px.
- **Descrição** em sans-serif peso 400, 15-16px, cor cinza escuro.

**Card 01:**
- Número: **01**
- Ícone: alvo/mira
- Título: **Recrutamento completo**
- Descrição: Do briefing da vaga à apresentação dos finalistas. Cada processo conduzido com estratégia própria e busca ativa no mercado.

**Card 02:**
- Número: **02**
- Ícone: filtro/funil
- Título: **Triagem e avaliação**
- Descrição: Análise de currículos, entrevistas por competência e mapeamento comportamental para identificar o encaixe técnico e cultural.

**Card 03:**
- Número: **03**
- Ícone: check duplo (seleção final)
- Título: **Curadoria de finalistas**
- Descrição: Você recebe apenas candidatos pré-avaliados, com parecer consultivo sobre cada um. Sem volume. Com critério.

### Estilo dos cards

- **Fundo:** branco `#FFFFFF` (contrasta com o bege da seção).
- **Borda:** 1px sólida `#EAEAEA`.
- **Padding interno:** 48px.
- **Border-radius:** 4px (sutil, mantém linguagem minimalista).

### CTA abaixo dos cards

Centralizado, formato **link de texto com seta animada** (não botão — preserva hierarquia do CTA principal do hero):

> Quero saber como funciona para minha empresa →

- Texto em peso 500, cor preta.
- Seta desliza 6px para a direita no hover.
- Underline cresce da esquerda no hover.
- Ao clicar, ancora suavemente para o formulário da Seção 09.

### Animações

- **Entrada dos cards em stagger de 150ms** (01 → 02 → 03).
- **Hover do card (efeito "wow" da seção):**
  - Fundo muda de branco para preto `#0E0E0E` em 400ms.
  - Texto fica creme `#F2E6D8`.
  - Número cresce ligeiramente (`scale(1.05)`).
  - Ícone roda 8° e muda cor.
  - Pequena **seta surge no canto inferior direito** do card (fade + translate de 10px para 0).
- **Cursor custom** sobre o card exibe ícone de expansão ou texto "ver mais".

### Pontos de destaque

- O **número grande** é o elemento dominante de cada card.
- O **hover preto** é o momento visualmente inesperado da seção — em uma paleta clara, um card virar preto chama atenção sem exagero.
- O contraste do fundo bege da seção com o branco dos cards cria profundidade visual natural.

---

## 11. Seção 06 — Processo em etapas ("Como trabalhamos")

### Função

Mostrar o processo de trabalho de forma visual, numerada e construtiva. Transforma "processo" (abstrato) em "método" (concreto). Cria sensação de organização, previsibilidade e profissionalismo.

### Layout

- **Desktop:** timeline **horizontal** com 5 etapas alinhadas em linha.
- **Mobile:** timeline **vertical** com linha conectora lateral à esquerda e etapas à direita.
- **Fundo:** branco `#FFFFFF`.
- **Padding vertical:** 140px (mais generoso — essa seção precisa de ar).

### Copy

**Eyebrow:**
> COMO TRABALHAMOS

**Headline (H2) em duas linhas:**
> Um processo claro.
> **Do briefing à contratação.**

**Subheadline curta:**
> Cinco etapas estruturadas para entregar a pessoa certa sem atalho e sem enrolação.

### Etapas

**Etapa 01 — Diagnóstico da vaga**
> Reunião de briefing para entender a vaga, a cultura e o perfil ideal — técnico e comportamental.

**Etapa 02 — Estratégia de busca**
> Definição das fontes de captação, ativação da nossa rede e construção do anúncio.

**Etapa 03 — Triagem e entrevistas**
> Análise criteriosa de CVs, entrevistas estruturadas e avaliação comportamental.

**Etapa 04 — Apresentação de finalistas**
> Envio de 3 a 5 candidatos com parecer consultivo sobre cada perfil.

**Etapa 05 — Acompanhamento pós-contratação** ⭐ (destaque especial)
> Suporte nos primeiros dias para garantir a adaptação e o encaixe real.

### Estilo de cada etapa

Cada bloco vertical contém:

- **Número grande** em serifa (96px, peso 400):
  - Cor `#E8E0D4` (cinza muito claro) no estado inativo
  - Cor preta `#0E0E0E` quando a linha conectora chega nele
- **Ícone SVG linear** pequeno abaixo do número (sugestões: 💬 briefing, 🔍 busca, 📋 triagem, 👥 finalistas, 🤝 acompanhamento — em versão linear custom, não emoji).
- **Título da etapa** em sans peso 600, 18px.
- **Descrição** em sans peso 400, 14-15px, cor cinza escuro.

### Linha conectora (elemento central da seção)

**SVG path horizontal** conectando os 5 números. Implementação:

- `stroke-dasharray` e `stroke-dashoffset` animados conforme scroll avança.
- Cor da linha: cinza claro `#DCD0BF`.
- Espessura: 2px.
- A linha **se desenha progressivamente** da esquerda para a direita conforme o usuário rola a seção.

**No mobile:** linha vertical à esquerda conectando as etapas empilhadas. Mesmo princípio de animação.

### Destaque especial da Etapa 05

Elemento mais importante estrategicamente (diferencia consultoria de agência):

- **Borda circular dourada** `#B8935A` ao redor do número 05 — se desenha como anel quando a etapa entra em foco.
- Pequeno **selo textual** abaixo da descrição: "*Diferencial Porto Talent*" em uppercase, letter-spacing 0.2em, cor dourada, 11px.

### Animações

- **Linha conectora desenha-se** progressivamente conforme o scroll da seção. Implementação recomendada: **GSAP ScrollTrigger + DrawSVG**, ou alternativa pura em IntersectionObserver + CSS keyframes com `stroke-dashoffset`.
- **Números** mudam de cinza claro para preto quando a linha os atinge (transição 400ms).
- **Cada etapa** (número + título + descrição) entra com fade-up quando a linha conectora chega nela.
- **Etapa 05:**
  - Borda circular dourada desenha-se em 600ms (SVG stroke animation).
  - Selo "Diferencial Porto Talent" entra 300ms depois da borda, com fade.

### Pontos de destaque

- A **linha que se constrói** transforma a seção em experiência narrativa, não apenas informativa.
- O **contraste entre números inativos (cinza) e ativos (preto)** guia o olhar naturalmente.
- A **Etapa 05 com destaque dourado** é o último argumento visual antes da próxima seção.

---

## 12. Seção 07 — Diferenciais ("Por que empresas escolhem a Porto Talent")

### Função

Resumir, em formato escaneável, os 6 maiores motivos pelos quais a Porto Talent se diferencia. Seção de consolidação de argumentos.

### Layout

- **Grid 3×2** (3 colunas × 2 linhas) no desktop.
- **Grid 2×3** no tablet.
- **1 coluna × 6 linhas** no mobile.
- **Fundo:** bege claro `#F2E6D8` — quebra visual forte após o branco da seção anterior.
- **Padding vertical:** 140px.

### Copy

**Eyebrow:**
> DIFERENCIAIS

**Headline (H2) em duas linhas:**
> Por que empresas escolhem
> **a Porto Talent.**

### Grid de diferenciais

**Item 01:**
- Ícone: grade/template
- Título: **Processo sob medida**
- Texto: Cada vaga conduzida com estratégia própria. Nada de template.

**Item 02:**
- Ícone: filtro
- Título: **Curadoria, não volume**
- Texto: Você recebe finalistas, não uma planilha para filtrar.

**Item 03:**
- Ícone: check duplo
- Título: **Encaixe cultural avaliado**
- Texto: Análise comportamental estruturada em todo candidato indicado.

**Item 04:**
- Ícone: pessoa falando / balão
- Título: **Atendimento direto**
- Texto: Você fala com quem conduz o processo, do início ao fim.

**Item 05:**
- Ícone: prédio pequeno
- Título: **Foco em pequenas e médias empresas**
- Texto: Entendemos a realidade de empresas que não têm RH robusto.

**Item 06:**
- Ícone: relógio
- Título: **Tempo otimizado**
- Texto: Processos mais curtos, com menos ruído e mais assertividade.

### Estilo dos itens

Cada item é um bloco **sem card, sem borda, sem fundo próprio** — apenas tipografia e ícone sobre o fundo bege. O espaçamento generoso é o que organiza.

- **Ícone SVG** 48px no topo esquerdo, stroke 1.5px, cor preta.
- **Título** sans peso 600, 18-20px, cor preta.
- **Texto** sans peso 400, 14-15px, cor cinza escuro `#333333`.
- **Espaçamento entre itens:** 48-56px vertical, 48px horizontal.

### Linhas divisórias de grade

**Linha fina** (1px, cor `#DCD0BF`) separa as colunas e linhas do grid — visual de grade editorial tipo jornal premium.

### Destaque de itens estratégicos

Os itens **01, 04 e 05** (Processo sob medida, Atendimento direto, Foco em PMEs) são os diferenciadores mais fortes. Recebem um **ponto dourado** `#B8935A` de 6px ao lado do título, na altura do baseline. Detalhe discreto que chama atenção sem poluir.

### Animações

- **Entrada dos itens em stagger diagonal**: da esquerda-cima para direita-baixo, com delay de 80ms entre cada.
- **Hover em cada item:**
  - Ícone muda para cor dourada `#B8935A` (250ms).
  - Título desloca 4px para a direita.
  - Pequena **linha horizontal dourada** aparece abaixo do título, crescendo de 0 para 32px em 300ms.
- **Sem animações agressivas** — a seção precisa ser escaneável e tranquila.

### Pontos de destaque

- **Grade tipográfica** é o destaque visual — sem elementos decorativos pesados, a organização e o respiro comunicam profissionalismo.
- **Pontos dourados** nos itens estratégicos criam pausa visual que valoriza os diferenciadores mais fortes.

---

## 13. Seção 08 — Prova social (parceiros + depoimentos)

### Função

Comprovar credibilidade através de **marcas atendidas** e **depoimentos** de clientes.

### Sub-seção 8A — Parceiros

#### Layout

- **Fundo:** branco `#FFFFFF`.
- **Padding vertical superior:** 120px.
- **Padding vertical inferior:** 60px (para conectar visualmente com 8B).

#### Copy

**Eyebrow:**
> CONFIANÇA

**Headline (H2) em duas linhas:**
> Empresas que já confiaram
> **na Porto Talent.**

#### Apresentação dos parceiros (sem logos ainda)

Cada parceiro aparece como **"card de selo"** simples e uniforme, mantendo identidade editorial:

- Ícone genérico no topo (padrão único para todos — pode ser: losango, selo, estrela, diamante — em SVG linear).
- Nome da empresa em tipografia serifa medium, 18-20px, uppercase, letter-spacing 0.1em.
- Linha decorativa fina horizontal (cinza claro) abaixo do nome, 40px.

**Lista de parceiros:**

```
◆ ADCOS
◆ ARTE OURO
◆ PANDA POOL
◆ GBELLA
◆ GBELLE BIJOUX
◆ LIFE LASER
```

#### Formato de exibição — Marquee horizontal infinito

- **Scroll lateral automático contínuo** (estilo CNN ticker), da direita para a esquerda.
- **Velocidade:** lenta, 40-50 segundos para completar um ciclo.
- **Loop infinito.**
- **Pausa no hover** do mouse.
- **Gradient fade nas bordas laterais** (fundo branco opaco nas pontas) para criar efeito de "infinito" — o conteúdo parece surgir e desaparecer nas laterais.

**Altura da faixa marquee:** 140px.

#### Implementação técnica

CSS animation pura com `@keyframes translateX` + duplicação do array de parceiros para loop sem saltos, **OU** biblioteca **Swiper** com modo autoplay contínuo.

#### Observação

Assim que o Rafael obtiver os **logos oficiais** dos parceiros, substituir os "cards de selo" pelos logos em escala de cinza, com efeito de ganhar cor no hover. Formato do elemento e animação do marquee permanecem idênticos.

---

### Sub-seção 8B — Depoimentos

#### Layout

- **Continuação da mesma seção** (sem troca de cor de fundo).
- **Padding vertical:** 60px superior, 120px inferior.

#### Copy

**Subheadline (em serifa, peso 400, centralizada, tamanho 28-32px):**
> O que dizem sobre o nosso trabalho

#### Depoimentos (fake por enquanto)

**Depoimento 01:**
> "Contratamos três vendedores pela Porto Talent no último semestre. Os três seguem conosco. Antes, a gente passava meses entrevistando e ainda errava. Hoje a gente foca no que importa — e recebe candidatos prontos para a conversa final."
>
> **Rafaela Mendonça**
> Sócia-diretora — Grupo Mendonça Calçados

**Depoimento 02:**
> "O diferencial foi o briefing. Em vez de pedirem só a descrição da vaga, sentaram com a gente para entender como o escritório funciona. Isso mudou a qualidade dos candidatos que chegaram. É recrutamento com cabeça de consultoria mesmo."
>
> **Thiago Albuquerque**
> Gerente Administrativo — Albuquerque Contabilidade

**Depoimento 03:**
> "A gente tinha medo de contratar consultoria e se sentir só mais um cliente. Não foi o que aconteceu. Atendimento direto, retorno rápido e um candidato que está há um ano e meio conosco. Recomendamos sem pensar."
>
> **Carlos Henrique Souza**
> Gerente de Operações — HS Distribuidora

#### Formato — Carrossel horizontal

- **Desktop:** 3 cards visíveis simultaneamente (largura total dividida por 3), com navegação para ver outros no futuro.
- **Mobile:** 1 card por vez, swipe lateral.
- **Setas de navegação** laterais (círculos finos com ícone de chevron).
- **Dots indicadores** abaixo dos cards.
- **Auto-play lento:** 7 segundos por slide.
- **Pausa no hover.**

#### Estilo de cada card de depoimento

- **Fundo:** bege creme `#FAF5EE`.
- **Borda:** 1px `#EAEAEA`.
- **Border-radius:** 4px.
- **Padding interno:** 40px.
- **Aspas grandes decorativas** no canto superior esquerdo: serifa dourada, 72px, peso 400. Elemento editorial, não conteúdo — reforça linguagem de "revista/jornal".
- **Texto do depoimento:** sans peso 400, 16-17px, cor cinza escuro, line-height 1.6.
- **Separador fino** entre depoimento e autor (1px, 40px de largura, cor cinza suave).
- **Bloco do autor:**
  - Avatar circular à esquerda (48px de diâmetro) com **iniciais** em tipografia elegante (serifa, peso 500, 16px). Fundo do avatar: preto `#0E0E0E`. Cor das iniciais: bege claro `#F2E6D8`. Exemplo: "RM" para Rafaela Mendonça.
  - Nome em sans peso 600, 16px, preto.
  - Cargo/empresa em sans peso 400, 14px, cor cinza médio.

### Animações

- **Marquee de parceiros:** loop infinito horizontal, pausa no hover.
- **Cards de depoimento na troca de slide:** fade + slide suave (sem corte brusco), 500ms.
- **Aspas grandes** no card entram com animação ao viewport: scale de 0.8 para 1.0 + fade, 300ms depois do card aparecer.
- **Avatar circular:** hover aplica scale sutil de 1.05.
- **Setas e dots do carrossel:** hover com mudança de cor para dourado.

### Pontos de destaque

- **Aspas grandes em serifa dourada** elevam o depoimento de "card genérico" para "peça editorial".
- **Avatares com iniciais** mantém elegância mesmo sem foto dos clientes.
- **Marquee infinito** cria sensação de movimento e atividade da marca.

---

## 14. Seção 09 — CTA intermediário + formulário empresas

### Função

Primeiro ponto de conversão forte. Quem rolou até aqui está aquecido — agora é o momento de capturar o lead empresa.

### Layout

- **Split 45/55:** copy + benefícios à esquerda (45%), formulário à direita (55%).
- **Fundo:** preto profundo `#0E0E0E` — contraste máximo com a seção anterior, marcando visualmente "aqui é o momento de agir".
- **Padding vertical:** 120px.
- **Altura:** auto, com padding robusto.

### Elemento decorativo de fundo

**Textura muito sutil** no fundo preto: noise/grain fino a 3% de opacidade. Evita fundo "plano digital" e traz sofisticação. Implementação: SVG com filter `feTurbulence` ou imagem PNG de noise com blend-mode.

### Copy

**Lado esquerdo:**

**Eyebrow (cor dourada):**
> VAMOS CONVERSAR

**Headline (H2) em duas linhas, cor creme `#F2E6D8`:**
> Vamos conversar sobre
> **sua próxima contratação?**

**Subheadline (cor cinza claro):**
> Conte para a gente a vaga que você precisa preencher. Retornamos em até 24h com os próximos passos — sem compromisso.

**Lista de 3 micro-benefícios** (abaixo da subheadline), com ícone de check dourado:

- ✓ Resposta em até 24h
- ✓ Sem compromisso e sem custo inicial
- ✓ Briefing consultivo gratuito

### Formulário (lado direito)

Estilo **formulário editorial premium** — nada de input genérico de WordPress.

#### Estilo dos inputs

- **Border:** apenas `border-bottom: 1px solid #3A3A3A`. Sem borda lateral. Sem border-radius.
- **Fundo:** transparente.
- **Cor do texto digitado:** creme `#F2E6D8`.
- **Cor do label:** cinza médio `#8A8A8A`.
- **Label flutuante:** label fica dentro do input, sobe 20px e reduz tamanho para 12px ao clicar, mudando cor para dourado `#B8935A`.
- **Padding vertical do input:** 14px.
- **Espaçamento entre campos:** 32px.

#### Campos do formulário (na ordem)

1. **Nome completo** (text)
2. **Empresa** (text)
3. **E-mail corporativo** (email, com validação)
4. **WhatsApp** (text, com máscara automática de telefone BR)
5. **Vaga que precisa preencher** (text)
6. **Quando pretende contratar?** (select custom)
   - Opções: Urgente / Em até 30 dias / Em até 60 dias / Ainda planejando
7. **Mensagem** (textarea pequena, altura 80px, **opcional**)

#### Checkbox LGPD

Quadrado custom de 18px × 18px com borda cinza. Ao clicar, desenha checkmark animado (SVG stroke animation, 250ms). Texto ao lado: "Concordo em ser contactado pela Porto Talent."

#### Botão de envio

- **Texto:** `Solicitar contato →`
- **Largura:** 100% do formulário.
- **Fundo:** bege creme `#F2E6D8`.
- **Cor do texto:** preto `#0E0E0E`.
- **Peso:** 500-600.
- **Padding:** 18px vertical.
- **Border-radius:** 4px.
- **Hover:** inverte — fundo fica preto, borda aparece creme, texto vira creme. Transição 350ms.

#### Microtexto abaixo do botão

> 🔒 Seus dados estão seguros. Não enviamos spam.

Cor: cinza médio `#8A8A8A`. Tamanho: 13px.

### Animações

- **Entrada da seção:** fade-up do bloco inteiro ao entrar no viewport.
- **Texto do lado esquerdo** entra em stagger: eyebrow → headline → subheadline → benefícios (cada benefício com delay próprio de 80ms).
- **Formulário** entra 400ms depois do texto.
- **Labels flutuantes:** transição 250ms ao focar.
- **Borda inferior do input no focus:** linha cresce de largura 0 para 100% (esquerda para direita) em 400ms, cor dourada.
- **Botão de envio:**
  - Hover: inversão de cor suave em 350ms.
  - Active: scale 0.98 + flash curto.
- **Checkmark LGPD:** desenho do check em 250ms (SVG stroke dash animation).
- **Envio bem-sucedido:** formulário faz fade, aparece mensagem de confirmação com ícone de check animado + texto "Recebemos sua mensagem. Em até 24h entraremos em contato." em serifa elegante.

### Integração com banco

Os dados são enviados a banco de dados. O formulário precisa separar leads de empresa em **pipeline próprio** (distinto do pipeline de candidatos da Seção 10). Campos armazenados: todos os do formulário + timestamp + origem (landing page).

### Pontos de destaque

- **Contraste total** com a seção anterior (fundo bege para fundo preto) — o visitante sabe que chegou no momento da decisão.
- **Formulário com estilo editorial** comunica que a empresa cuida até dos detalhes.
- **Botão creme sobre preto** destaca-se ao máximo.

---

## 15. Seção 10 — Área do candidato

### Função

Oferecer canal de captação de currículos sem competir com a conversão principal. Marca transição visual clara para evitar confusão de público.

### Divisor de transição (entre Seção 09 e 10)

Faixa horizontal fina preta `#0E0E0E`, altura 60px, com a palavra **"CANDIDATOS"** centralizada:

- Tipografia: sans, peso 600, uppercase.
- Letter-spacing: 0.4em.
- Cor: creme `#F2E6D8`.
- Tamanho: 12-13px.

Funciona como "capítulo novo" do site.

### Layout

- **Split 50/50:** coluna esquerda com copy + ilustração, coluna direita com formulário.
- **Fundo:** bege quente `#EDE0CC` — tom mais escuro que o creme do resto da página, marcando a mudança de contexto/público.
- **Padding vertical:** 120px.

### Copy

**Lado esquerdo:**

**Eyebrow:**
> PARA CANDIDATOS

**Headline (H2) em duas linhas:**
> Você está em busca de
> **uma nova oportunidade?**

**Subheadline:**
> Cadastre seu currículo no nosso banco de talentos. Quando surgir uma vaga com o seu perfil, entramos em contato. Sem custo. Sem enrolação.

### Mídia (lado esquerdo)

**Opção A — Ilustração line-art:**
- Ilustração em estilo editorial, linha preta fina sobre o fundo bege.
- Cena: pessoa usando notebook/celular em contexto de busca de trabalho.
- Pode ser animada: elementos entram como SVG line drawing (stroke-dashoffset animado), 1.5s total.

**Opção B — Foto:**
- Foto candid de alguém usando notebook ou em ambiente de estudo/trabalho.
- Mesmo tratamento visual das outras fotos do site (border-radius assimétrico + retângulo sobreposto).

**Recomendação:** **Opção A (ilustração)** — mais leve, moderno, original. Diferencia da estética fotográfica usada em outras seções para empresas.

### Formulário (lado direito)

Card branco elevado com sombra sobre o fundo bege.

#### Estilo

- **Fundo do card:** branco `#FFFFFF`.
- **Border-radius:** 8px.
- **Box-shadow:** `0 24px 60px rgba(0,0,0,0.08)`.
- **Padding interno:** 40px.

#### Campos (estilo mais tradicional que o formulário empresa — aqui é funcional, não editorial)

1. **Nome completo** (text)
2. **E-mail** (email)
3. **WhatsApp** (text, máscara)
4. **Cidade / Estado** (text)
5. **Área de atuação** (select custom):
   - Comercial
   - Administrativo
   - Operacional
   - Outro
6. **Cargo atual ou mais recente** (text)
7. **Experiência na área** (select):
   - Menos de 1 ano
   - 1 a 3 anos
   - 3 a 5 anos
   - Mais de 5 anos
8. **Pretensão salarial** (text, **opcional**)
9. **LinkedIn** (text, **opcional**)
10. **Upload de currículo** (área especial, detalhada abaixo)
11. **Checkbox LGPD:** "Autorizo o uso dos meus dados pela Porto Talent para processos seletivos."

#### Estilo dos inputs

- **Borda:** 1px sólida `#DCD0BF`, border-radius 4px.
- **Padding:** 14px 16px.
- **Fundo:** branco (entra em contraste com o card se necessário, ou transparente).
- **Focus:** borda muda para preta.
- **Labels tradicionais acima dos inputs** (não flutuantes), em sans peso 500, 13px, cor cinza escuro.

#### Upload de currículo (elemento destaque da seção)

**Área grande** com:

- Borda tracejada (`border: 2px dashed #DCD0BF`).
- Border-radius 8px.
- Padding 32px vertical, 24px horizontal.
- Texto central: **"Arraste seu currículo aqui ou clique para selecionar"** em peso 500.
- Subtexto menor: "PDF, DOC ou DOCX até 5MB" em cinza médio.
- Ícone de upload grande (48px) no centro, acima do texto.
- Aceita **drag-and-drop** + **clique para abrir seletor**.

**Estados do upload:**

- **Hover:** borda tracejada vira cor dourada `#B8935A`. Ícone faz bounce sutil vertical (translateY -4px em loop de 800ms).
- **Arrastando arquivo sobre a área:** fundo muda para bege claro `#FAF5EE`, borda fica **sólida dourada com glow** (`box-shadow: 0 0 0 4px rgba(184, 147, 90, 0.2)`).
- **Arquivo solto com sucesso:** animação de check verde desenhado + nome do arquivo aparece no centro, com opção "Trocar arquivo" em texto pequeno.

#### Botão de envio

- **Texto:** `Enviar currículo`
- **Fundo:** preto `#0E0E0E`.
- **Cor texto:** branco.
- **Largura total** do formulário.
- **Padding:** 18px vertical.
- Hover: lift 2px + fundo `#1A1A1A`.

### Animações

- **Entrada da seção:** fade-up padrão.
- **Ilustração (se Opção A):** SVG line drawing animado, 1.5s de duração total, entradas em sequência.
- **Upload de currículo:** estados de hover e drag detalhados acima.
- **Check verde** ao soltar arquivo: desenho em SVG, 300ms.
- **Envio bem-sucedido:** mensagem "Currículo recebido! Entraremos em contato quando surgir uma oportunidade."

### Integração com banco

Dados salvos em **pipeline separado** dos leads de empresa. Arquivo do CV armazenado em storage com referência no banco. Campos armazenados: todos os do formulário + link do arquivo + timestamp.

### Pontos de destaque

- **Divisor "CANDIDATOS"** deixa claro para o visitante que mudou de contexto.
- **Drag-and-drop elegante** é o elemento moderno que diferencia contra sites genéricos de agência.
- **Ilustração line-art** cria identidade visual própria para essa seção.

---

## 16. Seção 11 — FAQ

### Função

Resolver objeções silenciosas antes do CTA final. Cada pergunta é uma objeção real transformada em resposta clara.

### Layout

- **Uma coluna centralizada** com max-width de 800px.
- **Fundo:** branco `#FFFFFF`.
- **Padding vertical:** 120px.

### Copy

**Eyebrow centralizada:**
> DÚVIDAS COMUNS

**Headline (H2) centralizada, em duas linhas:**
> Perguntas que empresas
> **costumam fazer.**

### Perguntas e respostas

**Pergunta 01:**
> **Como funciona o investimento em um processo de recrutamento?**
>
> O valor varia conforme a complexidade da vaga, o nível do cargo e o prazo. Após entender o perfil que você precisa, enviamos uma proposta personalizada — sem cobrança por orçamento e sem compromisso.

**Pergunta 02:**
> **Em quanto tempo consigo ter candidatos qualificados?**
>
> Processos para vagas operacionais e administrativas costumam apresentar finalistas entre 7 e 15 dias. Vagas mais específicas ou de liderança podem levar de 20 a 40 dias. Tudo é alinhado no briefing inicial.

**Pergunta 03 (destaque especial):** 🛡
> **E se o candidato contratado não se adaptar?**
>
> Oferecemos garantia de reposição. Se o profissional sair dentro do período combinado em contrato, conduzimos um novo processo sem custo adicional.

**Pergunta 04:**
> **Vocês atendem empresas de qualquer porte?**
>
> Nosso foco é em pequenas e médias empresas, especialmente as que não têm estrutura de RH interno ou precisam de apoio consultivo em contratações pontuais ou recorrentes.

**Pergunta 05:**
> **Para quais áreas vocês recrutam?**
>
> Atendemos principalmente as áreas **comercial**, **administrativa** e **operacional**. Se sua vaga é de outro segmento, converse com a gente — avaliamos caso a caso.

**Pergunta 06:**
> **Preciso ter um RH estruturado para contratar a Porto Talent?**
>
> Não. A maior parte dos nossos clientes não tem RH interno. Nosso papel é justamente cumprir esse processo com qualidade, para que a empresa foque no seu negócio.

**Pergunta 07:**
> **O atendimento é feito presencialmente ou à distância?**
>
> Os dois. Em João Pessoa e região conduzimos reuniões presenciais quando faz sentido. Para clientes de outras regiões, todo o processo roda perfeitamente online.

### Estilo do accordion

Cada pergunta é um bloco:

- **Linha horizontal fina superior e inferior** (1px `#EAEAEA`).
- **Padding vertical:** 28px.
- **Pergunta (estado fechado):**
  - Alinhada à esquerda.
  - Peso 500, 17-18px, cor preta.
  - Ícone **+** no lado direito (24px, cor cinza médio, stroke 1.5px).
- **Resposta (estado aberto):**
  - Aparece abaixo da pergunta.
  - Peso 400, 15-16px, cor cinza escuro.
  - Padding-top 16px, padding-bottom 8px.
  - Max-width: deixar ligeiramente menor que a pergunta para dar respiro.

### Destaque da Pergunta 03 (garantia)

Essa é a resposta mais comercial. Recebe tratamento sutil para chamar atenção:

- **Ícone de escudo** pequeno `🛡` ao lado da pergunta (antes do texto).
- **Pergunta** em cor ligeiramente mais escura/bold que as outras.

### Comportamento

- **Uma única pergunta aberta por vez** (fecha as outras automaticamente).
- **Clique na pergunta:** expande a resposta com altura animada.
- **Ícone + gira 45°** para virar ×.

### Animações

- **Abertura do accordion:**
  - Altura anima suavemente de 0 para auto (usar max-height com valor alto ou JS measure), 350ms ease-out.
  - Resposta entra com fade-in 200ms depois da altura começar a crescer.
- **Ícone + → ×:** rotação 45° em 300ms.
- **Hover na pergunta:** texto desloca 6px para a direita, cor fica ligeiramente dourada.
- **Entrada dos itens em stagger de 80ms** ao entrar no viewport.

### Pontos de destaque

- Pergunta 01 (preço) não dá valor mas também não evita a pergunta — converte para o CTA.
- Pergunta 03 (garantia) é argumento de venda forte — merece destaque sutil.

---

## 17. Seção 12 — CTA Final

### Função

Fechamento visual da persuasão. Reforça a frase-âncora do final e oferece última chance de conversão.

### Layout

- **Full-width, centralizada.**
- **Fundo:** bege claro `#F2E6D8` — retorno à paleta calmante, preparando visualmente para o footer preto.
- **Padding vertical:** 160px (robusto, cria momento de "respiro antes do fim").
- **Max-width do conteúdo:** 720px, centralizado.

### Copy

**Elemento decorativo superior:**
Linha dourada horizontal de 80px, centralizada, acima da headline.

**Headline (H2 grande, centralizada, em duas linhas):**
> Contratar bem não é sorte.
> **É estratégia.**

- Primeira linha cinza escuro `#333333`, peso 400.
- Segunda linha preto `#0E0E0E`, peso 500, tamanho ligeiramente maior.
- Tamanho total da headline: 52-64px.

**Subheadline (centralizada, serifa ou sans, 22-24px):**
> A Porto Talent conduz o processo. Você recebe os finalistas. A escolha é sua — com muito mais clareza.

**Botão CTA grande, centralizado:**
> Quero contratar com assertividade →

- **Fundo:** preto `#0E0E0E`.
- **Cor do texto:** creme `#F2E6D8`.
- **Padding:** 20px 40px.
- **Peso do texto:** 500-600.
- **Tamanho:** 17px.
- **Border-radius:** 4px.
- **Âncora:** scrolla suavemente até o formulário da Seção 09.

**Elemento decorativo inferior:**
Linha dourada horizontal de 80px, centralizada, abaixo do botão.

### Animações

- **Entrada:** todos os elementos fazem fade-up com **delay maior que o padrão** — 800ms total do primeiro ao último. Força respiro e importância.
- **Palavra "estratégia"** recebe o **mesmo underline orgânico desenhado à mão** da palavra "certo" no Hero (Seção 02). Desenha-se da esquerda para a direita em 800ms, 1s após a headline aparecer. Fecha o loop visual de persuasão que começou lá no topo.
- **Botão:** aplica mesma respiração sutil do Hero (pulse infinito após 2s parado).
- **Linhas douradas (superior e inferior):** desenham-se como SVG stroke em 600ms cada.

### Pontos de destaque

- **Repetição da frase-âncora** fecha o arco narrativo do site.
- **Underline orgânico em "estratégia"** — espelho simétrico do "certo" no hero — cria sensação de composição completa.
- **Padding generoso** dá ao momento a importância que ele merece.

---

## 18. Seção 13 — Footer

### Layout

- **Fundo:** preto profundo `#0E0E0E`.
- **Texto:** creme `#F2E6D8`.
- **4 colunas no desktop** (com larguras proporcionais), empilhadas no mobile.
- **Padding superior:** 80px.
- **Padding inferior:** 40px.
- **Gap entre colunas:** 48px.

### Coluna 1 — Marca

- **Logo Porto Talent** em versão clara (creme).
- **Tagline curta** abaixo do logo, em serifa:
  > Recrutamento estratégico para empresas que querem acertar.
- Peso 400, 14-15px, cor creme com 80% opacidade.

### Coluna 2 — Navegação

**Título da coluna:**
> NAVEGUE

Links (peso 400, 14px, cor creme com 70% opacidade):

- Início
- Serviços
- Processo
- Depoimentos
- Contato
- Para candidatos

Hover em cada link: underline desliza da esquerda + cor vai para 100% opacidade.

### Coluna 3 — Contato

**Título da coluna:**
> CONTATO

Itens com ícones lineares finos à esquerda:

- 📱 WhatsApp: [número da cliente] — link clicável com deep-link `wa.me/...`
- ✉ E-mail: [email da cliente]
- 📍 João Pessoa / PB

Estilo coerente com os outros itens.

### Coluna 4 — Redes sociais

**Título da coluna:**
> REDES

**Ícones grandes** de Instagram e LinkedIn:

- 40px de diâmetro, formato circular com borda fina creme.
- Ícone em creme no centro.
- Hover: borda vira dourada + ícone rotaciona 5° + borda pulsa ligeiramente.

### Barra inferior

**Separador:** linha fina horizontal dourada `#B8935A` com 50% opacidade, width 100%.

Abaixo da linha, 3 blocos alinhados (flex horizontal):

**Esquerda:**
> © 2026 Porto Talent. Todos os direitos reservados.

**Centro:**
> Política de Privacidade · Termos de Uso

(Cada item é link clicável, cor creme 70%, hover com underline.)

**Direita:**
> Desenvolvido por Plugue MKT

Cor creme 60%, peso 400, 12-13px.

### Animações

- **Entrada:** colunas entram com fade-up em stagger ao rolar até o footer.
- **Hover em links:** underline da esquerda para a direita, 250ms.
- **Ícones sociais:**
  - Hover com rotação de 5° + borda muda para dourada.
  - Micro-pulse contínuo muito sutil (escala 1.0 → 1.03 → 1.0 em 3s) — opcional.
- **WhatsApp:** ícone faz micro-shake horizontal no hover (chamando ação).

---

## 19. Elementos flutuantes e extras

### 19.1 Botão flutuante de WhatsApp

**Essencial** para B2B de serviço local/regional.

**Posição:** fixo no canto inferior direito (`bottom: 32px; right: 32px;`).

**Aparência:**

- Círculo de 60px × 60px.
- Fundo preto `#0E0E0E` (ou verde WhatsApp se preferir convenção — mas preto mantém identidade).
- Ícone WhatsApp em creme, 28px.
- Sombra: `0 12px 32px rgba(0,0,0,0.2)`.
- Pulse contínuo sutil em 2.5s.

**Balão de mensagem animado:**

- Depois de **15 segundos** de navegação sem interação com o botão, aparece balão lateral à esquerda do botão.
- Conteúdo do balão: "Fale com a Porto Talent" + botão × para fechar.
- Fundo branco, sombra, padding 12px 16px, border-radius 8px com cauda apontando para o botão.
- Aparece com slide da direita para a esquerda + fade, 400ms.
- Fica visível até o usuário fechar ou clicar.

**Ao clicar no botão:** abre WhatsApp com mensagem pré-preenchida: "Olá! Vim pelo site da Porto Talent e gostaria de saber mais sobre o serviço de recrutamento."

### 19.2 Pop-up de saída (exit intent) — OPCIONAL

Quando o mouse faz movimento de saída da aba (top: 0 para fora do viewport), dispara pop-up:

- **Fundo semi-transparente** preto sobre o site.
- **Card central branco**, max-width 440px, border-radius 8px, padding 40px.
- **Headline:** "Antes de sair…"
- **Texto:** "Que tal 10 minutos para conversar sobre a vaga que você precisa preencher? Respondemos em até 24h."
- **Botão primário:** "Quero conversar agora" → ancora para formulário da Seção 09.
- **Botão secundário (texto):** "Não, obrigado" → fecha pop-up.
- **Dispara apenas uma vez por sessão** (cookie/localStorage).

**Nota:** pode ser polarizador. O Rafael decide se ativa.

### 19.3 Tela de loading inicial — OPCIONAL

Ao abrir o site pela primeira vez, tela de loading de ~1.5-2 segundos:

- Fundo bege claro `#F2E6D8`.
- Logo Porto Talent centralizada com animação sutil (SVG desenhando ou fade-in com scale).
- Barra fina de progresso abaixo do logo, em preto.
- Desaparece com fade quando carregamento termina.

**Nota:** eleva a experiência, mas adiciona fricção. Usar apenas se performance geral do site for boa (todos assets carregados rapidamente).

### 19.4 Cursor customizado — RECOMENDADO

**Comportamento:**

- Remove cursor nativo (`cursor: none;` no body, com fallback para tablets/mobile).
- **Círculo fino** de 16px que segue o mouse com ligeira defasagem (trailing effect, `transition: transform 0.12s`).
- Borda 1.5px cor preta.
- Fundo transparente.

**Estados:**

- **Sobre elementos clicáveis** (botões, links, cards): círculo cresce para 40px e muda para fundo dourado semi-transparente.
- **Sobre imagens:** círculo pequeno com texto "focus" ou ícone de lupa dentro.
- **Sobre inputs de texto:** cursor vira versão "I-beam" (linha vertical).

**Observação:** detalhe de "agência boutique" que eleva a percepção de qualidade do site.

### 19.5 Sons de interação — OPCIONAL (muito polarizador)

Micro-sons sutis em:

- Hover de botões principais (click suave).
- Envio de formulário (ding discreto de confirmação).
- Abertura de FAQ.

**Volume baixo, sons sintéticos limpos.** Usar apenas se decidir por estética de site premium extremo. Desativado por padrão, botão para ativar no canto. Em muitos casos é melhor **não incluir**.

---

## 20. Checklist técnico final

### Performance

- [ ] Imagens otimizadas: WebP com fallback JPG, lazy loading em todas as fotos abaixo do hero.
- [ ] Fontes: preload das famílias Serif e Sans em `<head>`, `font-display: swap`.
- [ ] CSS e JS minificados, com critical CSS inline no `<head>`.
- [ ] Total de requests abaixo de 40, peso total da página abaixo de 2MB.
- [ ] Lighthouse score: 90+ em Performance, Accessibility e Best Practices.

### SEO

- [ ] Title tag: "Porto Talent | Consultoria de Recrutamento e Seleção em João Pessoa"
- [ ] Meta description: "Consultoria de recrutamento personalizada para empresas que querem contratar com assertividade. Curadoria de candidatos e avaliação comportamental. João Pessoa e região."
- [ ] Open Graph tags (og:title, og:description, og:image) configuradas para compartilhamento em redes.
- [ ] Schema.org: LocalBusiness + Service + Review (quando depoimentos reais estiverem no ar).
- [ ] Sitemap.xml gerado.
- [ ] Robots.txt configurado.
- [ ] URL amigável, HTTPS obrigatório.

### Acessibilidade

- [ ] Contraste mínimo WCAG AA em todos os textos.
- [ ] Todos os inputs com `<label>` associados.
- [ ] Navegação por teclado completa (tab, enter, esc).
- [ ] Alt text em todas as imagens.
- [ ] Estrutura semântica (header, nav, main, section, footer).
- [ ] ARIA labels em componentes interativos (accordion, carrossel, menu mobile).

### Analytics e tracking

- [ ] Google Analytics 4 (ou ferramenta equivalente) instalado.
- [ ] Meta Pixel (Facebook) instalado.
- [ ] Eventos rastreados: submit do formulário de empresa, submit do formulário de candidato, clique no WhatsApp flutuante, clique em cada CTA principal.
- [ ] Conversão principal configurada: submit do formulário de empresa.

### Formulários e banco de dados

- [ ] Formulário de empresa → pipeline empresas (separado).
- [ ] Formulário de candidato → pipeline candidatos (separado).
- [ ] Upload de CV salvo em storage com referência no banco.
- [ ] Notificação por e-mail para a cliente (Porto Talent) a cada nova submissão.
- [ ] Auto-resposta por e-mail ao visitante confirmando recebimento.
- [ ] Proteção reCAPTCHA ou honeypot contra spam.
- [ ] Validação LGPD: consentimento explícito, política de privacidade linkada, opção de exclusão de dados.

### Responsividade

- [ ] Testado em: 1920px, 1440px, 1280px, 1024px, 768px, 414px, 375px.
- [ ] Menu mobile funcional.
- [ ] Timeline do processo (Seção 06) em formato vertical no mobile.
- [ ] Carrossel de depoimentos com 1 card por vez no mobile.
- [ ] Grid de diferenciais (Seção 07) em 1 coluna no mobile.
- [ ] Formulários empilhados em 1 coluna no mobile.

### Segurança

- [ ] HTTPS com certificado SSL válido.
- [ ] Proteção contra XSS e SQL injection nos formulários.
- [ ] Rate limiting nos envios de formulário.
- [ ] Uploads de CV limitados a PDF/DOC/DOCX e tamanho máximo 5MB.

---

## Apêndice A — Resumo de ícones necessários

Todos os ícones seguem mesmo estilo: SVG linear, stroke 1.5px, cor preta (normal) ou dourada (hover/ativo).

**Biblioteca base:** Lucide Icons customizados.

### Lista de ícones por seção

**Seção 03 (Dor):**
- Papéis empilhados (currículos)
- Seta circular / loop (rotatividade)
- Alvo descentralizado (desalinhamento)

**Seção 05 (Serviços):**
- Alvo / mira (recrutamento)
- Filtro / funil (triagem)
- Check duplo (curadoria de finalistas)

**Seção 06 (Processo):**
- Balão de fala (briefing)
- Lupa (busca)
- Lista / prancheta (triagem)
- Usuários / grupo (finalistas)
- Aperto de mãos (acompanhamento)

**Seção 07 (Diferenciais):**
- Grade / template
- Filtro
- Check duplo
- Pessoa falando
- Prédio pequeno
- Relógio

**Seção 08 (Prova social):**
- Losango/selo (marcador dos parceiros — padrão único repetido)
- Aspas decorativas grandes (depoimentos)

**Seção 09 (CTA empresa):**
- Check dourado (benefícios)
- Cadeado (microtexto LGPD)

**Seção 10 (Candidato):**
- Upload/nuvem (área de upload)
- Check verde (sucesso de upload)

**Seção 11 (FAQ):**
- Escudo (destaque da garantia)
- + e × (accordion)

**Footer:**
- WhatsApp
- E-mail
- Pin localização
- Instagram
- LinkedIn

**Flutuantes:**
- WhatsApp (botão flutuante)

---

## Apêndice B — Direção de arte para produção de fotos

Se Rafael optar por produzir fotos originais (recomendado):

### Requisitos técnicos

- **Formato vertical:** 4:5 ou 3:4.
- **Resolução mínima:** 2400px no lado menor.
- **Formato de entrega:** JPG alta qualidade + RAW (backup).
- **Iluminação:** natural ou mista (nunca flash direto).
- **Pós-produção:** correção de cor puxando levemente para tons quentes/terrosos, alinhando com a paleta da marca.

### Direção de estilo

- **Paleta de vestuário:** preto, bege, branco, cinza. Tons terrosos são bem-vindos.
- **Ambiente:** escritório organizado, mesa de madeira clara, detalhes editoriais (livros, caneta, caderno bonito, planta).
- **Expressão:** profissional mas acessível — confiante, sem rigidez.
- **Enquadramento:** alterna entre retrato (close médio) e detalhes de mãos/objetos.

### Sugestões de fotos mínimas

1. Retrato da cliente em enquadramento vertical — uso no hero.
2. Cena de reunião de briefing (pode ser encenada com colaboradores) — uso na proposta de valor.
3. Detalhe de mãos + caderno + notebook em mesa — reserva.
4. Foto ambiente do escritório — reserva.

### Alternativa (se não produzir original)

Bancos recomendados:

- **Unsplash** (filtros: consulting, business meeting, interview)
- **Pexels** (filtros similares)
- **Death to Stock** (estética mais autoral, tons terrosos)

Evitar: imagens óbvias de bancos (aperto de mão com gravata azul sobre fundo azul), fotos com modelos posando para câmera de forma forçada, estética corporativa genérica.

---

## Apêndice C — Frases-âncora e repetições estratégicas

Essas frases são pilares narrativos e devem aparecer **exatamente** como escritas:

1. **Hero:** "Empresas não precisam de mais currículos. Precisam do candidato certo."
2. **CTA Final:** "Contratar bem não é sorte. É estratégia."
3. **Tagline do footer:** "Recrutamento estratégico para empresas que querem acertar."
4. **CTA recorrente:** "Quero contratar com assertividade"
5. **Frase chave da proposta de valor:** "Você não recebe uma lista. Recebe uma seleção."

O **underline orgânico desenhado à mão** aparece em duas palavras estratégicas espelhadas:

- "certo" (Hero)
- "estratégia" (CTA Final)

Essa simetria fecha o arco narrativo do site.

---

**Fim do documento.**

Este é o guia mestre do desenvolvimento. Qualquer decisão durante a implementação que não esteja coberta aqui deve seguir os princípios gerais: minimalismo editorial, hierarquia clara, conversão como foco, humanidade no tom, premium na execução.
