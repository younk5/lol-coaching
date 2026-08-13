# Spec — Hero (seção de abertura)

> Data: 2026-08-13 · Status: implementado · Fonte de conteúdo: PRD §11 + Anexo A

## 1. Objetivo

Responder em ≤5 segundos: **quem é** (Hyoga, ex-jogador profissional), **por que ele é qualificado** (top 1 da soloQ BR, 5 contas Challenger, 3 times profissionais) e **qual é a ação** (entrar no Discord). Deve transmitir autoridade + alto nível + exclusividade sem foto real (placeholder premium, sem imagem falsa).

## 2. Contrato de conteúdo

| Elemento | Texto | Fonte |
|---|---|---|
| Eyebrow | "Coaching de Jungle · Ex-Jogador Profissional" | PRD |
| H1 (único da página) | "Domine a jungle. Suba de elo com método." | Redação a partir do Anexo A |
| Subtítulo | "Coaching individual com Hyoga — ex-jogador profissional de League of Legends, top 1 da soloQ brasileira, 5 contas Challenger e passagens por CNB, Uppercut e Santos. Ele já viveu o topo. Agora ele te ensina o caminho." | PRD §11 |
| CTA primário | "Fazer coaching" → https://discord.gg/8HQFCRyN2 (nova aba, `rel="noopener"`, `data-track="discord"`) | Atleta |
| CTA secundário | "Ver como funciona" → `#como-funciona` | Estrutura |
| Stat 1 | "Top 1 soloQ BR" / "season 2019 · topo desde 2018" | Atleta |
| Stat 2 | "3 contas em top 1/2/3" / "simultaneamente no Challenger" | Atleta |
| Stat 3 | "5× Challenger" / "5 contas no elo máximo" | Atleta |
| Stat 4 | "3 times pro" / "CNB · Uppercut · Santos" | Atleta + Leaguepedia |
| Painel de identidade | Marca (emblema dualidade) + badge "Pro Player" (classificação real do DeepLol) + legenda "Ex-jogador profissional — CNB · Uppercut · Santos" | DeepLol + Leaguepedia |

## 3. Casos de borda

- **Sem foto (decisão do atleta):** o painel é de identidade (emblema + badge + trajetória) — não existe área de foto nem imagem falsa.
- **JS desabilitado / IO indisponível:** elementos `data-reveal` ganham `.is-visible` (fallback) — nunca ficam invisíveis.
- **Texto longo:** `max-width: 55ch` no subtítulo; stats quebram linha (`flex-wrap`).
- **Mobile:** grade 7/5 → 1 coluna ≤900px; botões em largura total ≤480px; painel centralizado com `max-width: 460px`.
- **`prefers-reduced-motion`:** revelação desativada (CSS força visível imediato).

## 4. Critérios de aceite

- [ ] Um único `<h1>` na página, com `id="hero-titulo"` ligado ao `aria-labelledby` da seção.
- [ ] CTA do Discord com link real, ícone, nova aba, `noopener` e `data-track="discord"`.
- [ ] Nenhuma informação além das confirmadas no PRD; nada de imagem falsa.
- [ ] Sem overflow horizontal em 360px; painel com `aspect-ratio: 4/5`.
- [ ] Contraste AA; alvos de toque ≥ 44px; foco visível.
- [ ] Console limpo; tracking funcionando (evento registrado no clique).
