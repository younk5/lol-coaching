# Briefing de UI/UX — Hyoga Coaching de Jungle

| Campo | Valor |
|---|---|
| **Produto** | Landing page de conversão (1 página) |
| **Atleta** | Hyoga (Benjamin de Barbi) — ex-pro player de LoL, jungler |
| **Objetivo** | Transmitir AUTORIDADE + EXPERIÊNCIA + PRECISÃO + EXCLUSIVIDADE + CONFIANÇA e converter visitante → Discord |
| **Status** | Aprovado para implementação |
| **Data** | 2026-08-13 |

---

## 1. Direção criativa (a essência)

**Conceito:** a inspiração vem dos *Kindred* — mas apenas como **ideia**, nunca como tema.

> Dualidade · Caça · Precisão · Silêncio · Foco · Tensão · Execução

O site deve parecer **um site premium de um pro player de esports** — não um dashboard, não um template de coach, não uma página neon genérica, não algo infantil ou teatral.

**Vocabulário visual (regras de linguagem):**
- **Luz dirigida** — o hero usa um "spotlight" radial ciano muito sutil sobre fundo quase preto (como um holofote de palco vazio). Nada de brilho espalhado.
- **Linhas de precisão** — hairlines (linhas de 1px) e filetes diagonais discretos, como marcas de mira/corte. Usados com moderação (divisores, cantos de cards).
- **Contraste extremo** — o ciano é a única cor de energia; tudo o mais é escala de azul-escuro/prata.
- **Espaço negativo** — seções respiráveis; o silêncio é parte do design.
- **Movimento curto e seco** — animações rápidas (≤300ms), sem enfeites.

**O que NUNCA aparece:** splash arts, personagens, skins, ícones do jogo, mascotes, neon exagerado, gradientes arco-íris, emojis, efeitos "gamer" genéricos (partículas, parallax pesado).

---

## 2. Hierarquia e layout

**Princípio:** uma ideia por seção. O visitante deve entender o fluxo em segundos:

> Quem é → Por que ele pode ensinar → O que ele oferece → Como funciona → Para quem é → Contato

**Estrutura da página (13 seções, nesta ordem):**

| # | Seção | Papel na conversão |
|---|---|---|
| 1 | Header (fixo) | Identidade + navegação + CTA Discord sempre visível |
| 2 | Hero | A tese em 5 segundos: *jungler pro, top 1 da soloQ, coach* |
| 3 | Autoridade | Prova: soloQ top 1, Challenger ×5, times, técnicos |
| 4 | Sobre | A história em primeira pessoa (voz do Hyoga) |
| 5 | Coaching | A oferta: conteúdo, formato, preço |
| 6 | Como funciona | O passo a passo até a 1ª sessão |
| 7 | Para quem é | Ajuste de expectativa (quem se beneficia) |
| 8 | Para quem não é | Filtro honesto (protege a credibilidade) |
| 9 | Twitch / Conteúdo | Prova viva + conexão com a comunidade |
| 10 | Provas sociais | Depoimentos/resultados reais — quando existirem |
| 11 | FAQ | Quebra de objeções |
| 12 | CTA final | Último chamado para o Discord |
| 13 | Footer | Links, identidade, créditos |

**Layout:**
- Container: **1200px** máximo; margens laterais 24px (16px no mobile).
- Grid de 12 colunas internas (usado para hero, autoridade, coaching).
- Espaçamento de seção: **96px** desktop / **64px** mobile (variável `--space-section`).
- Escala de espaçamento: **8 · 16 · 24 · 32 · 48 · 64 · 96** — nada de valores aleatórios.

**Hierarquia visual por seção:** eyebrow (rótulo em caixa alta ciano) → título forte → parágrafo curto → ação. O título é o maior elemento; a ação é o mais contrastante.

---

## 3. Tipografia

**1 fonte externa apenas: Space Grotesk** (Google Fonts, pesos 400/500/700) — geométrica, moderna, com personalidade esports. Corpo de texto usa a fonte do sistema (leitura confortável e zero custo de carregamento).

| Papel | Fonte | Tamanho | Peso | Entrelinha | Espaçamento |
|---|---|---|---|---|---|
| Display (h1) | Space Grotesk | `clamp(2.5rem, 6vw, 4.25rem)` | 700 | 1.05 | -0.02em |
| Título de seção (h2) | Space Grotesk | `clamp(1.75rem, 4vw, 2.75rem)` | 700 | 1.1 | -0.015em |
| Subtítulo (h3) | Space Grotesk | `clamp(1.25rem, 2.5vw, 1.6rem)` | 600 | 1.25 | — |
| Corpo | Sistema | 1rem (16px) | 400 | 1.65 | — |
| Texto secundário | Sistema | 0.9375rem | 400 | 1.6 | — |
| Eyebrow/rótulo | Space Grotesk | 0.75rem | 500 | 1 | **+0.14em, CAIXA ALTA** |
| Botão | Space Grotesk | 0.9375rem | 600 | 1 | +0.02em |
| Footer | Sistema | 0.875rem | 400 | 1.6 | — |

**Regras:**
- Eyebrows em ciano `--cyan`; títulos em `--text-primary`; parágrafos em `--text-secondary` (com exceções de destaque).
- Nenhum texto abaixo de 0.75rem. Nenhum parágrafo com mais de ~70 caracteres por linha (max-width ~65ch).
- Títulos nunca em caixa alta (exceto eyebrows).

---

## 4. Paleta

| Variável | Hex | Uso |
|---|---|---|
| `--bg` | `#05070A` | Fundo base (quase preto, azul profundo) |
| `--bg-2` | `#0B0F16` | Fundo secundário (cards, seções alternadas) |
| `--cyan` | `#00E5FF` | Energia: CTAs, eyebrows, destaques, foco |
| `--cyan-hover` | `#00B8CC` | Hover do ciano |
| `--text-primary` | `#F2F5F7` | Títulos e texto principal |
| `--text-secondary` | `#9AA6B2` | Parágrafos, legendas |
| `--border` | `#1C232C` | Bordas, hairlines, divisores |
| `--success` | `#3DDC84` | Feedback positivo (formulário) |
| `--error` | `#FF5C5C` | Feedback de erro (formulário) |

**Derivados (glow e luz):**
- `--glow-soft`: `0 0 24px rgba(0, 229, 255, 0.18)` — sombra dos botões primários
- `--glow-strong`: `0 0 40px rgba(0, 229, 255, 0.3)` — hover do botão primário
- `--spotlight`: `radial-gradient(600px 400px at 70% 0%, rgba(0, 229, 255, 0.07), transparent 70%)` — luz do hero
- Overlay de imagem: `linear-gradient(180deg, transparent 55%, #05070A 100%)`

**Regras de uso do ciano (a mais importante):**
- Proporção visual: **máximo ~5–8% da tela** em ciano puro.
- Ciano para: 1 CTA principal por viewport, eyebrows, detalhes de foco/hover, linhas de precisão.
- Nunca: fundo ciano inteiro, texto longo em ciano, dois CTAs ciano competindo na mesma tela.

**Contraste (AA):** `#F2F5F7` sobre `#05070A` ≈ 17:1 ✅ · `#9AA6B2` sobre `#05070A` ≈ 7:1 ✅ · `#05070A` sobre `#00E5FF` (texto do botão) ≈ 14:1 ✅ · `#00E5FF` sobre `#05070A` ≈ 12:1 ✅

---

## 5. Componentes e estados de interação

### Botão primário (a ação principal — sempre aponta para o Discord)
| Estado | Visual |
|---|---|
| Default | Fundo `--cyan`, texto `--bg` (#05070A), radius 8px, padding 14px 28px, `--glow-soft`, fonte 600 |
| Hover | Fundo `--cyan-hover`, `--glow-strong`, translateY(-1px) |
| Active (pressionado) | translateY(1px), glow reduzido |
| Focus-visible | Outline 2px `--cyan`, offset 3px |
| Disabled | Opacidade 0.45, sem glow, cursor default |

Ícone do Discord (SVG inline) à esquerda do texto — o ícone É parte do CTA.

### Botão secundário (ações de apoio: Twitch, Liquipedia, DeepLol, "ver como funciona")
| Estado | Visual |
|---|---|
| Default | Transparente, borda 1px `rgba(0, 229, 255, 0.35)`, texto `--cyan` |
| Hover | Fundo `rgba(0, 229, 255, 0.08)`, borda `--cyan` |
| Focus-visible | Outline 2px `--cyan`, offset 3px |

### Links de prova de autoridade (Liquipedia, DeepLol)
Links em linha com ícone externo pequeno; hover: sublinhado ciano; sempre com `data-track`.

### Cards (usar com moderação — não transformar tudo em card)
| Propriedade | Valor |
|---|---|
| Fundo | `--bg-2` |
| Borda | 1px `--border` |
| Radius | 12px |
| Padding | 32px (24px mobile) |
| Hover (apenas cards interativos) | translateY(-4px), borda `rgba(0,229,255,0.25)` |

Cantos superiores: filete diagonal de 1px em ciano a 20% de opacidade como detalhe opcional (linha de precisão).

### Accordion (FAQ)
- Pergunta: botão em largura total, texto `--text-primary`, ícone chevron rotaciona.
- Resposta: `--text-secondary`, com transição de altura suave (max-height).
- Estados: `aria-expanded`, focus-visible no botão, hover sutíl.

### Formulário (discreto — metade da largura, sem dominar a página)
| Estado | Visual |
|---|---|
| Default | Fundo `--bg`, borda 1px `--border`, radius 8px, texto `--text-primary` |
| Focus | Borda `--cyan`, glow sutil |
| Erro | Borda `--error`, mensagem `--error` com ícone |
| Sucesso | Borda/mensagem `--success` |

Labels sempre visíveis (nunca só placeholder). Botão de envio: primário. Feedback de sucesso substitui o formulário (sem redirecionamento).

---

## 6. Iconografia e marca

- **Estilo:** SVG inline, traço de 1.5px, cantos retos/geométricos, stroke `currentColor` (herda cor do contexto). Ícones nunca preenchidos com gradiente.
- **Conjunto mínimo:** Discord, Twitch, link-externo, seta, chevron, check, X (fechar menu).
- **Marca (logo):** marca-texto "HYOGA" em Space Grotesk 700 + um **emblema de dualidade** — dois traços geométricos entrelaçados (inspirado no conceito, sem copiar nada). O emblema pode nascer simples e evoluir.
- **Favicon:** o emblema de dualidade em SVG sobre fundo `#05070A`.
- Os ícones são desenhados por nós — **nenhum asset da Riot Games**.

---

## 7. Movimento (animações)

**Regra geral: movimento curto, seco, proposital — e só se melhorar a experiência.**

| Onde | Como |
|---|---|
| Revelação de seção (scroll) | IntersectionObserver: opacity 0→1 + translateY(16px→0), 500ms, ease-out, stagger 80ms entre elementos |
| Hover em botões/cards | ≤200ms, ease-out |
| FAQ | Abertura 250ms (altura), ícone rotaciona 180° |
| Menu mobile | Fade + slide 16px, 250ms |
| Header | Fundo ganha blur + borda inferior após scroll (20px) |

**Proibido:** parallax, partículas, background animado, loops contínuos, pulse infinito, marquee.

**`prefers-reduced-motion`:** todas as animações e transições desativadas (ou reduzidas a fade de 1ms); revelações de scroll mostram tudo imediatamente.

---

## 8. Responsividade (mobile-first)

| Breakpoint | Comportamento |
|---|---|
| ≥ 1280px | Layout completo; hero em 2 colunas (texto 7 / painel 5) |
| 1024px | Grids de 3 colunas viram 2 |
| 768px | Hero em 1 coluna (painel abaixo do texto); grids 2 → 1; menu vira hambúrguer |
| 480px | Tipografia no mínimo do clamp; espaçamentos 64px |
| 360px | Tudo funciona; nenhum overflow horizontal; CTA do Discord em largura total no hero |

**Regra de ouro mobile:** o CTA do Discord está sempre a ≤1 scroll de distância (header fixo com botão compacto + CTA em largura total no hero).

---

## 9. Acessibilidade (checklist obrigatório)

- [ ] HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`) — seções com `aria-labelledby` apontando para seus títulos.
- [ ] Um único `<h1>`; headings em ordem sem pular níveis.
- [ ] **Skip link** ("Pular para o conteúdo") como primeiro elemento focável.
- [ ] `:focus-visible` visível em tudo (2px ciano, offset 3px) — nunca remover outline sem substituição.
- [ ] Contraste AA em todos os textos (verificado na paleta, §4).
- [ ] Alvos de toque ≥ 44×44px no mobile (CTAs e itens do menu).
- [ ] FAQ: `button` + `aria-expanded` + `aria-controls`; região com `role="region"`/`aria-labelledby`.
- [ ] Menu mobile: `aria-expanded`, fechar com Esc, foco retorna ao botão.
- [ ] Imagens: `alt` descritivo (ou `alt=""` para decorativas); sem fotos do atleta no site (decisão do dono).
- [ ] Formulário: `<label for>` em todos os campos, `aria-describedby` para mensagens de erro, `required` + `aria-required`.
- [ ] `prefers-reduced-motion` respeitado (ver §7).
- [ ] Zoom 200% sem quebra de layout; leitura por teclado 100%.
- [ ] Idioma declarado: `<html lang="pt-BR">`.

---

## 10. Referências técnicas de produto

**IDs de seção (âncoras do menu e analytics):**
`#inicio` (hero) · `#autoridade` · `#sobre` · `#coaching` · `#como-funciona` · `#para-quem` · `#twitch` · `#depoimentos` · `#faq` · `#contato` (CTA final)

**Atributos de tracking (`data-track`):**
`discord` (todos os CTAs), `twitch`, `liquipedia`, `deeplol`, `instagram`, `x`, `form` — evento único por clique, via delegação no `app.js`.

**Variáveis CSS (nomes canônicos):** `--bg`, `--bg-2`, `--cyan`, `--cyan-hover`, `--text-primary`, `--text-secondary`, `--border`, `--success`, `--error`, `--glow-soft`, `--glow-strong`, `--spotlight`, `--radius-sm: 8px`, `--radius-md: 12px`, `--container: 1200px`, `--space-section: clamp(64px, 10vw, 96px)`, escala `--space-1..6` (8/16/24/32/48/64).

**Imagens:** WebP (ou AVIF onde suportado) + fallback; `loading="lazy"` fora do hero; dimensões fixas para evitar CLS; nenhuma imagem acima de ~300KB no MVP.

**Fontes:** Google Fonts com `preconnect` + `display=swap`; apenas Space Grotesk 400/500/700.

**SEO visual:** OG image futura — composição tipográfica do próprio site (nunca imagem falsa do atleta).

**JSON-LD:** `Person` (nome real, role, links verificados) — somente dados confirmados no PRD.
