# Spec — Coaching + Como funciona

> Data: 2026-08-13 · Status: implementado · Fonte: PRD §11 (oferta confirmada) + Anexo A

## 1. Objetivo

**Coaching:** apresentar a oferta exata — o que o aluno aprende (6 pilares), o formato (1h–1h30, VOD review ou análise ao vivo), os preços (R$ 110 / R$ 80) e o CTA para o Discord.

**Como funciona:** remover a fricção da decisão com 5 passos claros até a primeira sessão.

## 2. Contrato de conteúdo

### Coaching
| Elemento | Texto | Fonte |
|---|---|---|
| Título | "Jungle com método — para quem quer ser excepcional." | Anexo A (posicionamento) |
| Subtítulo | "Não é dica solta: é tudo o que o Hyoga aprendeu dentro e fora das partidas — do topo da soloQ aos anos de competitivo." | Redação |
| 6 pilares | Macro · Mecânica · Builds · Conceitos da jg (tempo, pathing, plano de jogo) · Comportamento por campeão · Decisão e execução | Anexo A (lista literal do atleta) |
| Preço 1 | "Primeira sessão — R$ 110 — 1h a 1h30 · VOD review ou análise ao vivo, você escolhe" | Atleta |
| Preço 2 | "Sessões seguintes — R$ 80 — mesma duração" | Atleta |
| Nota | "Análise precisa e completa da sua gameplay. Formato, horário e pagamento combinados direto com o Hyoga." | Anexo A + fluxo real (sem sistema de agendamento) |
| CTA | "Fazer coaching" → Discord, `data-track="discord"` | Estrutura |

### Como funciona
| Passo | Título | Texto |
|---|---|---|
| 01 | Entre no Discord | "Um clique no botão — sem cadastro, sem burocracia." |
| 02 | Converse sobre seu momento | "Elo, rota e objetivo — para o coaching ser direcionado a você." |
| 03 | Escolha o formato | "VOD review ou sessão ao vivo — você decide como prefere aprender." |
| 04 | Primeira sessão | "1h a 1h30 de análise precisa e completa da sua gameplay." |
| 05 | Continue evoluindo | "Sessões seguintes por R$ 80, com a mesma duração." |

## 3. Casos de borda

- **Preços futuros:** texto marcado em locais óbvios do HTML (Ctrl+F "R$") — README já documenta.
- **Procedimento pós-clique no Discord `[PENDENTE]`:** os passos 02–05 descrevem o fluxo de coaching, sem prometer estrutura do servidor (ticket etc.) que ainda não existe.
- **Mobile:** topic-grid 3→2→1 colunas; price-grid 2→1; steps em coluna única.
- **Ciano:** números dos passos + ícones — moderado.

## 4. Critérios de aceite

- [ ] Todos os pilares são a lista literal do atleta (Anexo A) — nenhum conteúdo inventado.
- [ ] Preços exatos (R$ 110 / R$ 80) e duração (1h–1h30) como confirmados.
- [ ] 2 CTAs Discord com link real e tracking.
- [ ] `<ol>` nos passos (ordem é significativa).
- [ ] Sem overflow em 360px; reveal OK; console limpo.
