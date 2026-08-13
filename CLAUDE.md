# CLAUDE.md — Memória Técnica do Projeto

Guia técnico permanente. Leia **antes** de qualquer alteração no repositório.
- Fonte da verdade de **produto**: `docs/PRD.md`
- Fonte da verdade **técnica**: este arquivo
- Idioma dos conteúdos do site: **pt-BR**

---

## 1. Stack (exata — sem exceções)

| Camada | Tecnologia | Versão |
|---|---|---|
| Marcação | HTML5 semântico | — |
| Estilo | CSS3 (variáveis, Grid, Flexbox, `clamp()`) | — |
| Comportamento | JavaScript ES6+ puro (Vanilla JS) | — |
| Serverless (formulário) | Função Node.js na Vercel | Node 20+ (runtime da Vercel), **zero dependências** |
| Analytics | Vercel Analytics (script oficial) | — |
| Fonte externa | 1 família no máximo (proposta: Space Grotesk) + fallback do sistema | — |
| Imagens | WebP/AVIF | — |

**Proibido:** React, Next.js, Vue, Angular, TypeScript, Tailwind, Bootstrap, Vite, Webpack, jQuery, qualquer biblioteca JS, CMS, banco de dados, autenticação. Não existe *build step*: o site é estático.

---

## 2. Arquitetura (concisa)

```
index.html ──► style.css (defer irrelevante — link no <head>)
            └─► app.js   (script clássico com `defer`; NÃO usar ES modules:
                          quebram ao abrir o arquivo direto, sem servidor)
api/contact.js — função serverless da Vercel:
  POST JSON {nome, elo, objetivo, servidor, experiencia}
  → valida no servidor → envia ao webhook do Discord
  → segredo SOMENTE em variável de ambiente (DISCORD_WEBHOOK_URL)
Analytics — script Vercel Analytics no <head> + eventos de clique
  via atributos data-track nos elementos (delegation no app.js)
Deploy — Vercel (git push → auto-deploy; ou `vercel --prod`)
```

**Fluxo de conversão:** visitante → conhece o atleta → entende a autoridade → entende o coaching → clica em "Fazer coaching" → **Discord** (fricção mínima; formulário é secundário e nunca bloqueia o Discord).

---

## 3. Comandos essenciais

| Ação | Comando |
|---|---|
| Rodar localmente | `python -m http.server 8080` (na raiz do projeto) → http://localhost:8080 |
| Build | **Não existe** (site estático) |
| Testes | Sem test runner no momento — verificação: console limpo + checklist de aceite do PRD. (Etapa 4 trará specs + testes `node --test` com zero dependências, se Node disponível) |
| Deploy | `vercel --prod` (CLI) ou dashboard da Vercel |
| Git status | `git status` / `git log --oneline` |
| Pré-deploy | Conferir convite do Discord ativo e link permanente |

---

## 4. Convenções de código e nomenclatura

**HTML**
- Semântico; um único `<h1>` (Hero); headings em ordem sem pular níveis.
- Classes e IDs em `kebab-case`; IDs de seção usados como âncoras (`#como-funciona`).
- `alt` sempre presente e descritivo; `loading="lazy"` fora da viewport.
- Analytics: `data-track="discord|twitch|liquipedia|deeplol|form"` + `data-track-label` opcional.

**CSS**
- Todas as decisões visuais em variáveis no `:root` (paleta fixa do PRD, espaçamento 8/16/24/32/48/64/96, container ~1200px, raios, sombras).
- Organizado por seções com comentário de bloco: `/* ===== HERO ===== */`.
- Mobile-first; tipografia com `clamp()`; sem `!important`; sem estilo por ID.
- Respeitar `prefers-reduced-motion`; `:focus-visible` sempre visível.

**JS (app.js, seções na ordem)**
- Módulos lógicos: navigation → mobile-menu → faq → tracking → form → animations.
- Funções pequenas com responsabilidade única; comentários apenas para decisões não óbvias.
- Event delegation para tracking; nunca `innerHTML` com dados do usuário.

**Imagens**
- WebP/AVIF; dimensões explícitas (evitar CLS); nada de imagens gigantes; sem embeds pesados (Twitch = preview + link).

**Git / commits**
- Conventional Commits: `feat:` `fix:` `refactor:` `perf:` `style:` `docs:` `chore:` (tipo em inglês, mensagem em pt-BR).
- Commits atômicos: 1 mudança lógica = 1 commit.
- Antes de commitar: remover arquivos mortos e rodar `git diff` conferindo que **nenhum segredo** entrou.

---

## 5. O que NUNCA deve ser feito

1. Adicionar framework, biblioteca, banco, CMS, servidor ou API sem necessidade real e aprovação explícita.
2. Colocar qualquer segredo no frontend: webhook do Discord, tokens, API keys, credenciais. O webhook vive **exclusivamente** em variável de ambiente da Vercel.
3. Inventar conteúdo: títulos, times, campeonatos, elos, números, preços, durações, depoimentos, datas. Sem confirmação → `[PENDENTE]` / `[LINK PENDENTE]` / `[PLACEHOLDER]` visível.
4. Usar assets do League of Legends (splash arts, skins, ícones oficiais, capturas do cliente) ou estética infantil/teatral. A inspiração Kindred é **conceitual** (dualidade, precisão, silêncio, caça).
5. Reescrever arquivo inteiro sem antes lê-lo e preservar o que funciona — menor alteração possível.
6. Remover `outline`/`:focus-visible` sem substituição; ignorar `prefers-reduced-motion`; usar `!important`.
7. Criar páginas além da landing page sem aprovação.
8. Adicionar WhatsApp, Calendly, checkout, login, área do aluno ou pagamentos no MVP.
9. Usar embeds pesados (ex.: embed de stream da Twitch) — sempre preview + link.
10. Commitar com arquivos mortos, segredos no diff ou mensagens fora do padrão.

---

## 6. Ambiente (Windows desta máquina)

- Shell: git-bash (MSYS). Programas nativos (git, python, node) exigem caminhos nativos `C:/Users/vinic/...` — caminhos MSYS `/c/...` falham neles.
- `python` no PATH é o venv do Hermes; `py` é o Python do sistema. Para servir arquivos estáticos, qualquer um serve.
- Automação de navegador exige permissão manual "Allow remote debugging" no Chrome (chrome://inspect) — esperada, não é erro.
- Pasta do projeto: `C:\Users\vinic\lol-coaching`

---

## 7. Comandos de uso frequente

```bash
cd /c/Users/vinic/lol-coaching          # entrar no projeto (bash)
python -m http.server 8080              # servir local
git status && git log --oneline -10     # estado e histórico
vercel --prod                           # deploy de produção
```
