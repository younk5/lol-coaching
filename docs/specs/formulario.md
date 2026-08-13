# Spec — Formulário de contato + função serverless

> Data: 2026-08-13 · Status: implementado · Fonte: PRD §5 (formulário opcional) + §7 RNF-05 (segurança)

## 1. Objetivo

Oferecer um canal alternativo **discreto** (nunca competindo com o Discord) para quem prefere escrever antes. A mensagem chega ao Discord do Hyoga **sem expor o webhook** — o segredo vive exclusivamente em variável de ambiente da Vercel.

## 2. Contrato (frontend → serverless → Discord)

**Campos e regras (client + server):**

| Campo | Tipo | Regras |
|---|---|---|
| nome | texto | obrigatório · 2–80 chars · control chars removidos |
| elo | select | obrigatório · whitelist: ferro, bronze, prata, ouro, platina, diamante, mestre, grao-mestre, desafiante, nunca |
| objetivo | texto | obrigatório · 2–300 chars |
| servidor | select | obrigatório · whitelist: br, lan, las, na, euw, outro |
| experiencia | select | obrigatório · whitelist: nunca, iniciante, intermediario, avancado |

**Fluxo:** `POST /api/contact` (JSON) → validação no servidor (nunca confiar só no navegador) → mensagem formatada → webhook do Discord (env var `DISCORD_WEBHOOK_URL`).

**Respostas da API:**
- `200 {ok:true}` — enviado
- `400 {ok:false, errors:{campo:msg}}` — validação falhou (nomes dos campos em pt-BR)
- `405` — método não-POST
- `500` — webhook não configurado no servidor
- `502` — Discord recusou (webhook inválido/rate-limit)

## 3. Casos de borda

- **Payload gigante:** parse com limite de corpo; campos fora do schema são ignorados.
- **Caracteres de controle / quebras de linha:** substituídos por espaço antes da validação (proteção contra injeção de texto no webhook).
- **JS do navegador falhando:** `required` nativo + HTML semântico ainda validam no submit.
- **Sucesso:** formulário é substituído por confirmação (aria-live), sem redirecionamento.
- **Erro:** mensagem visível com `role="alert"`; botão volta ao normal.

## 4. Testes automatizados (`node --test`)

`api/contact.test.js` valida a lógica pura (`api/validate.js` — sem rede):
1. aceita payload válido e retorna dados limpos
2. rejeita nome curto (<2) e longo (>80)
3. rejeita elo/servidor/experiência fora da whitelist
4. rejeita objetivo vazio
5. sanitiza caracteres de controle e espaços duplicados
6. rejeita payload não-objeto (null, array, string)
7. ignora campos desconhecidos sem quebrar

## 5. Critérios de aceite

- [ ] `node --test api/contact.test.js` — todos passando.
- [ ] Nenhum segredo no frontend: webhook só em `process.env.DISCORD_WEBHOOK_URL`.
- [ ] Formulário discreto na seção CTA final (abaixo do botão do Discord, não antes).
- [ ] `data-track="form"` no botão; eventos de clique já cobertos pelo módulo de tracking.
- [ ] Erros/sucesso acessíveis (role=alert / aria-live); teclado OK; sem overflow 360px.
