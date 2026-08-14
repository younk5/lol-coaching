# PRD — Hyoga | Coaching Profissional de Jungle (LoL)

| Campo | Valor |
|---|---|
| **Produto** | Landing page de conversão — site profissional de ex-jogador profissional de LoL |
| **Atleta** | Hyoga (IGN) — ex-jogador profissional de League of Legends, especialista em jungle |
| **Stack** | HTML5 + CSS3 + JavaScript puro (site estático) + 1 função serverless (formulário) |
| **Deploy** | Vercel |
| **Canal de conversão** | Discord (CTA principal) |
| **Status** | Rascunho v0.1 — aguardando aprovação |
| **Data** | 2026-08-13 |

---

## 1. Visão geral

Site de **uma única página** que apresenta o Hyoga como jungler profissional de alto nível e converte visitantes em contato no **Discord** para coaching especializado de jungle. O site responde em segundos a seis perguntas: quem é o atleta, por que ele é qualificado, o que oferece, para quem é, como funciona e como entrar em contato.

Direção visual: **premium esports** — fundo azul escuro profundo quase preto, detalhes em ciano para energia, tipografia em branco/prata. Inspiração *conceitual* nos Kindred (dualidade, caça, precisão, silêncio, execução), **sem nenhum asset do jogo** (sem splash arts, personagens, skins ou ícones oficiais) e sem estética infantil ou teatral.

Regra de ouro do projeto: **nunca inventar informação**. Tudo que não estiver confirmado aparece como `[PENDENTE]` ou `[PLACEHOLDER]` claramente identificado.

---

## 2. Definição do problema

**Problema:** um jogador que descobre o Hyoga (Twitch, indicação, Liquipedia, DeepLol) não encontra em um único lugar quem ele é, por que pode ensinar, o que o coaching inclui e como falar com ele. Sem isso, o visitante hesita, adia a decisão ou fecha com um coach sem credencial comprovada.

**Consequência:** a autoridade real do atleta existe, mas não é apresentada de forma organizada e conversível — o interesse se perde no caminho.

**Job-to-be-done (o "trabalho" que o visitante quer contratar):**

> "Quando quero subir de elo na jungle e já esgotei o que consigo sozinho, preciso de alguém que já viveu o nível mais alto do jogo para enxergar o que eu não vejo e me dar um plano — então contrato um ex-pro player de jungle, não um guia genérico."

---

## 3. Personas

> Elos e faixas abaixo são hipóteses de PM — confirmar com o atleta antes de publicar.

### Persona A — "O Jungler travado"
- **Perfil:** main jungle, joga há anos no servidor BR, travado no elo atual há meses.
- **Dores:** joga muito mas sem método; erra tomada de decisão; assiste pro play e não consegue aplicar; não sabe o que corrigir primeiro.
- **Objetivo:** sair do elo atual com um plano claro, não com dicas soltas.
- **Elo atual:** `[PENDENTE — confirmar faixas atendidas]`

### Persona B — "Migrando para a jungle"
- **Perfil:** jogador de outra rota querendo trocar para jungle, ou jungle iniciante buscando base sólida.
- **Dores:** não domina rotas, tempo de rotação, leitura do jogo; apanha de junglers experientes.
- **Objetivo:** construir fundamento correto desde o início, sem vícios.

### Persona C — "Ambição competitiva"
- **Perfil:** jogador de elo alto que quer ir além do solo queue.
- **Dores:** falta estrutura de treino, rotina e mentalidade de alto nível.
- **Objetivo:** desenvolver padrão profissional de jogo e preparação.

---

## 4. Escopo do MVP

### Dentro do escopo
- Landing page única com as seções: Header, Hero, Autoridade/Carreira, Sobre, Coaching, Como funciona, Para quem é, Para quem não é, Twitch/Conteúdo, Provas sociais, FAQ, CTA final, Footer.
- Conversão via Discord com CTAs estratégicos (header, hero, pós-autoridade, seção coaching, CTA final — sem exagero).
- Provas de autoridade: links oficiais para Twitch, Liquipedia e DeepLol (o que estiver disponível; o resto `[LINK PENDENTE]`).
- Formulário de contato **opcional e discreto** (nome, elo atual, objetivo, servidor, experiência na jungle) enviando para o Discord via função serverless — webhook **nunca** no frontend.
- SEO técnico (title, meta description, canonical, Open Graph, Twitter Cards, JSON-LD apenas com dados reais, robots.txt, sitemap.xml, favicon).
- Analytics: Vercel Analytics + eventos de clique (Discord, Twitch, Liquipedia, DeepLol, formulário).
- Acessibilidade, responsividade (360px → 1280px+) e performance (LCP/CLS/INP).

### Fora do escopo (MVP)
- Pagamentos, checkout e precificação online.
- Agendamento (Calendly ou similar) e sistema próprio de agendamento.
- Login, cadastro e área do aluno.
- WhatsApp como canal.
- Blog, múltiplas páginas, CMS.
- Multi-idioma (site 100% PT-BR no MVP; versão EN avaliada depois).
- Sistema próprio de analytics.

---

## 5. User stories (priorização MoSCoW)

### MUST — essencial para o MVP
| ID | História | Critério principal |
|---|---|---|
| US-01 | Como visitante, quero entender em poucos segundos **quem é** o Hyoga e **por que ele é qualificado**, para decidir se vale a pena continuar. | Hero + seção Autoridade com conteúdo real |
| US-02 | Como visitante, quero chegar ao **Discord com 1 clique** a partir dos pontos estratégicos da página. | CTA Discord funcional em 5 posições |
| US-03 | Como visitante, quero entender **exatamente o que o coaching inclui** (formato, duração, o que recebo), para decidir com segurança. | Seção Coaching com oferta clara |
| US-04 | Como visitante, quero **verificar as provas de autoridade** (Twitch, Liquipedia, DeepLol) com links oficiais. | Links reais ou `[LINK PENDENTE]` visível |
| US-05 | Como visitante no **celular**, quero a mesma experiência e o CTA do Discord sempre acessível. | Responsividade + CTA mobile fixo/visível |
| US-06 | Como dono do site, quero **medir cliques no Discord** e nos demais links-chave. | Analytics com eventos |
| US-07 | Como visitante, quero navegar e usar o site **sem barreiras** (teclado, leitor de tela, contraste). | Acessibilidade WCAG AA |

### SHOULD — importante, mas pode vir logo depois
| ID | História | Critério principal |
|---|---|---|
| US-08 | Como visitante, quero **enviar um formulário curto** de interesse em vez de só entrar no Discord. | Formulário discreto + serverless seguro |
| US-09 | Como visitante, quero tirar **dúvidas comuns** (FAQ) sem precisar perguntar no Discord. | Accordion acessível (ARIA) |
| US-10 | Como visitante, quero uma experiência com **animações sutis** que não atrapalhem a leitura. | IntersectionObserver + `prefers-reduced-motion` |

### COULD — quando houver conteúdo real
| ID | História | Critério principal |
|---|---|---|
| US-11 | Como visitante, quero ver **depoimentos e resultados reais** de alunos. | Somente com conteúdo autêntico |
| US-12 | Como visitante, quero ver **clipes/vídeos** de jogadas e conteúdo. | Área "Em breve" ou conteúdo real |

### WON'T — explicitamente fora deste MVP
Pagamentos, agendamento, login, área do aluno, blog, CMS, multi-idioma, páginas extras, WhatsApp.

---

## 6. Requisitos funcionais

| ID | Requisito |
|---|---|
| RF-01 | Página única com as 13 seções na ordem aprovada (ajustável com justificativa de UX). |
| RF-02 | Header com identidade, navegação por âncoras e CTA do Discord; menu mobile funcional. |
| RF-03 | Hero com composição forte (tipografia + luz) e card de credenciais (ficha do jogador) — **sem foto do atleta** (decisão do atleta). |
| RF-04 | Seções Autoridade/Provas com links reais; links ausentes exibem `[LINK PENDENTE]`. |
| RF-05 | Seção Coaching descreve a oferta **apenas com dados confirmados** (preço, duração, formato). |
| RF-06 | FAQ em accordion com ARIA correto (expandir/recolher, `aria-expanded`, teclado). |
| RF-07 | Formulário: nome, elo atual, objetivo, servidor, experiência na jungle; validação client-side; feedback de sucesso/erro claro. |
| RF-08 | Função serverless `api/contact.js`: valida de novo no servidor e envia ao webhook do Discord (variável de ambiente). |
| RF-09 | Tracking de cliques via atributos `data-*` (Discord, Twitch, Liquipedia, DeepLol, formulário). |
| RF-10 | Conteúdo futuro sem dado real exibe "Em breve" ou placeholder identificado. |
| RF-11 | Skip link, headings em ordem, `alt` adequado, `focus-visible` visível. |

---

## 7. Requisitos não funcionais

| ID | Requisito |
|---|---|
| RNF-01 | **Performance:** site estático, sem bibliotecas JS; imagens WebP/AVIF, `loading="lazy"` fora da viewport; 1 fonte externa no máximo; sem embeds pesados (Twitch = preview + link). |
| RNF-02 | **Responsividade:** mobile-first; 360 / 480 / 768 / 1024 / 1280+ px; CTA do Discord acessível no mobile. |
| RNF-03 | **Acessibilidade:** HTML semântico, contraste AA, navegação por teclado, ARIA no FAQ, `prefers-reduced-motion` respeitado. |
| RNF-04 | **SEO:** title, meta description, canonical, Open Graph, Twitter Cards, JSON-LD (somente dados verdadeiros), robots.txt, sitemap.xml. |
| RNF-05 | **Segurança:** nenhum segredo no frontend; validação e sanitização client-side **e** server-side; webhook do Discord exclusivamente em variável de ambiente. |
| RNF-06 | **Manutenibilidade:** CSS organizado por seções com variáveis; JS separado por módulo (navegação, FAQ, tracking, formulário, animações); funções pequenas; Conventional Commits. |
| RNF-07 | **Design system:** paleta fixa (fundo `#05070A` / `#0B0F16`, acento Kindred `#8ED0C2` com hover `#6FB8A8`, texto `#F2F5F7` / `#9AA6B2`, bordas `#202B31`, sucesso `#3DDC84`, erro `#FF5C5C`); container ~1200px; escala de espaçamento 8/16/24/32/48/64/96; tipografia com `clamp()`. |

---

## 8. Métricas de sucesso

| Métrica | Tipo | Meta |
|---|---|---|
| **Cliques no Discord** | KPI principal | `[PENDENTE]` — hipótese inicial: 1,5–2% de conversão visita→clique; revisar após 2–4 semanas de dados reais |
| Cliques Twitch / Liquipedia / DeepLol | Secundária | Acompanhar tendência (sem meta inicial) |
| Envios do formulário | Secundária | Acompanhar (não pode competir com o Discord) |
| Scroll depth | Diagnóstico | Entender até onde a página segura atenção |
| Pageviews | Diagnóstico | Vercel Analytics |

**Instrumentação:** Vercel Analytics (pageviews) + eventos de clique nos botões — sem sistema próprio de analytics.

---

## 9. Riscos mapeados

| # | Risco | Impacto | Mitigação |
|---|---|---|---|
| R-01 | Informações pendentes atrasam a copy final | Alto | Placeholders `[PENDENTE]` visíveis; preenchimento incremental a qualquer momento |
| R-02 | Convite do Discord expira | Alto (mata a conversão) | Usar convite **permanente**; testar o link antes do deploy e documentar no README |
| R-03 | Oferta/preços indefinidos | Médio | Seção pronta com `[PENDENTE]`; estrutura não bloqueia o lançamento |
| R-04 | SEO limitado por ser página única | Médio | Headings corretos, meta tags fortes, sitemap; avaliar páginas futuras depois |
| R-05 | Dependência de plataformas terceiras (Twitch, Liquipedia, DeepLol) | Baixo | Links diretos, sem embeds; qualquer link ausente vira `[LINK PENDENTE]` |
| R-06 | Webhook do Discord exposto por engano | Alto | Revisão de segurança obrigatória antes do deploy (Etapa 7); segredo só em variável de ambiente |

---

## 10. Critérios de aceite (checklist do MVP)

- [ ] Site 100% estático (HTML/CSS/JS puro), abre sem erros no console.
- [ ] CTA do Discord presente em: header, hero, pós-autoridade, seção coaching e CTA final.
- [ ] Todos os links/dados não confirmados exibem `[PENDENTE]` ou `[LINK PENDENTE]` visível — nenhuma informação inventada.
- [ ] Lighthouse mobile ≥ 90 em performance, acessibilidade, boas práticas e SEO.
- [ ] Navegação 100% por teclado; contraste AA; FAQ com ARIA correto; `prefers-reduced-motion` respeitado.
- [ ] Funciona em 360, 480, 768, 1024 e 1280+ px; CTA do Discord acessível no mobile.
- [ ] Formulário valida no navegador E no servidor; webhook apenas em variável de ambiente.
- [ ] Cliques no Discord rastreáveis no Vercel Analytics.
- [ ] SEO: title, meta description, canonical, OG, Twitter Cards, JSON-LD real, robots.txt, sitemap.xml.
- [ ] Deploy funcional na Vercel; domínio final `[PENDENTE]`.
- [ ] `README.md` com guia simples de edição (textos, cores, imagens, links) para pessoa não desenvolvedora.

---

## 11. Dados confirmados vs. pendentes

### Confirmados
| Dado | Valor | Fonte |
|---|---|---|
| IGN | Hyoga | Atleta |
| Nome real | Benjamin de Barbi — **confidencial: NÃO exibir no site (decisão do atleta); usar apenas "Hyoga"** | DeepLol + Leaguepedia |
| Região | Brasil (servidor BR) | DeepLol + Leaguepedia |
| Função | Jungle (Jungler) | DeepLol + Leaguepedia |
| Classificação | PRO player | DeepLol |
| Time atual | Não listado ("-") | DeepLol |
| Atividade recente | Partidas em alto elo (oponentes Grandmaster/Challenger) no BR | DeepLol — rank atual do atleta `[PENDENTE confirmar]` |
| Carreira (times) | **CNB** (2017–2019: Trinity Blue, Infinity e e-Sports Club, com empréstimo à Uppercut esports em 2019) e **Santos e-Sports** (dez/2019 – dez/2020) | Leaguepedia |
| Nick anterior / ID competitivo | Hy0g4 | Leaguepedia |
| Posição soloQ (BR) | Desde 2018, top 1 da soloQ BR durante a maior parte de cada ano; terminou a season 2019 em 1º lugar | Atleta |
| Recorde soloQ | 3 contas Challenger simultâneas ocupando top 1/2/3; 5 contas Challenger ao mesmo tempo | Atleta |
| Times (confirmação do atleta) | CNB, Uppercut (org hoje conhecida como FURIA) e Santos e-Sports | Atleta (confere com Leaguepedia) |
| Técnicos/mentores | Turtle (ex-técnico na LCS), Belze (participou de Mundial; hoje na LOUD), Mora (ex-técnico do Santos, liga britânica), Scrappydoo (ex-técnico da Uppercut) | Atleta |
| Oferta de coaching | Sessão individual de 1h–1h30 com VOD review e/ou análise ao vivo (escolha do aluno); conteúdo: macro, mecânica, builds, conceitos da jg (tempo na jg, pathing, plano de jogo), postura por campeão, tomada de decisão e execução | Atleta |
| Preço | 1ª sessão: R$ 110 · sessões seguintes: R$ 80 | Atleta |
| Torneios recentes | Qualificatórias CD 2025 Split 1 (time LIBI); LigaGG CELOL A 2024 Split 2 — 12º lugar (time STW) | Leaguepedia |
| Discord | https://discord.gg/8HQFCRyN2 | Atleta |
| Twitch | https://www.twitch.tv/hyoga | Perfil DeepLol |
| Liquipedia (Leaguepedia) | https://lol.fandom.com/wiki/Hyoga | Perfil DeepLol |
| DeepLol (pro player) | https://www.deeplol.gg/pro/Hyoga | Atleta |
| X (Twitter) | https://x.com/hyogalol1 | Perfil DeepLol |
| Instagram | https://www.instagram.com/hyogalol | Perfil DeepLol |
| Facebook | https://www.facebook.com/Hy0g4TM | Perfil DeepLol |

### Pendentes — `[PENDENTE]` até confirmação
| Dado | Por que importa |
|---|---|
| Nome/tratamento comercial no site (ex.: usar só "Hyoga"?) | Marca e identidade |
| Elos atendidos | Para quem é / não é |
| Servidores atendidos (só BR?) | Escopo |
| Procedimento no Discord após o clique (ex.: abrir ticket? mensagem direta?) | Fluxo de conversão |
| Idioma (apenas PT-BR?) | Escopo |
| Foto oficial | **Decidido: não usar** — o Hero usa painel de identidade (emblema + badge + trajetória) |
| Domínio final | Canonical, sitemap, branding |
| Depoimentos reais | Provas sociais (seção fica pronta para receber) |
| Meta numérica de conversão | KPIs |

---

## 12. Stack e estrutura do projeto

**Stack:** HTML5 · CSS3 · JavaScript ES6+ puro · [1 função serverless na Vercel — apenas o formulário] · Vercel Analytics.

**Estrutura prevista:**

```
lol-coaching/
├── index.html
├── style.css
├── app.js
├── api/
│   └── contact.js          → serverless do formulário (webhook protegido)
├── assets/
│   ├── images/
│   └── icons/
├── docs/
│   └── PRD.md
├── robots.txt
├── sitemap.xml
├── favicon.svg
└── README.md               → guia de edição para não-dev
```

---

## 13. Anexo A — Textos brutos do atleta (fonte para a copy do site)

> Material preservado **exatamente como fornecido** pelo atleta. A copy final do site será redigida a partir daqui, sem acrescentar fatos.

### Apresentação (biografia)
> Eu sou o Hyoga, comecei a jogar lol no beta e meu sonho sempre foi ser proplayer. Desde 2018 sempre fui top 1 da SOLOQ, única season que terminei top 1 foi em 2019 e fora as outras sempre fiquei top 1 durante maior parte do ano disputando com outros jogadores. Inclusive já coloquei contas challenger top 1 2 e 3 na soloq simultaneamente e 5 contas challenger também, joguei em 3 times (CNB, uppercut (atualmente furia) e Santos) e em cada 1 deles tive técnicos gringos e muitos nomes de referência como por exemplo o Turtle (foi técnico na LCS), belze (foi pro mundial e atualmente está na LOUD), Mora (foi meu treinador no santos e ele era da liga britânica, na minha opinião meu melhor técnico e que mais me passou visão da jg) e scrappydoo (foi o coach gringo que tive na Uppercut). Sempre fui um jogador esforçado e criativo e nunca parei de me esforçar para a aprender e melhorar mais.

### Conteúdo do coaching
> Passo todo meu aprendizado dentro e fora de jogo, desde o meu começo em que peguei top 1 e só sabia ganhar soloq e a carregar mesmo não tendo quase nenhuma base do jogo e até depois de ter me tornado um jogador com mais conhecimento após minhas passagens por todos esses times, entendo bastante de como funciona a jg e como funciona a soloq. Meu coach é focado em quem quer ser alguém excepcional e não apenas um simples jg que faz o mínimo e não tem destaque, passo todo meu conhecimento sobre macro, mecânica, builds, conceito da jg (tempo na jg, pathing, plano de jogo, etc.), como se comportar como um jg dependendo do seu campeão e a maneira que você deve jogar, quais decisões vc deve tomar e quando tomar e como executar e muito mais.

### Valores
> 110 reais e a duração do coach varia entre 1h~1h30, nesse meio tempo assisto partidas e vod review (o que você preferir, se preferir que so veja você jogando ao vivo e não veja review fica de sua escolha) e faço uma analise precisa e completa de todas as informações que consigo lhe passar sobre a sua gameplay, após a primeira sessão as próximas aulas ficam por 80 reais e com a mesma duração.

---

# Área do admin (adicionada depois do MVP — pedido do dono)

- **URL:** `/hyoga/area` (link discreto no rodapé do site)
- **Login:** senha única (`ADMIN_PASSWORD`, variável de ambiente na Vercel); token de sessão com validade de 12h; bloqueio de 15 min após 5 tentativas erradas (por IP)
- **O que mostra:** visitas, cliques (Discord, Twitch, Liquipedia, DeepLol, Instagram, X), envios do formulário e as últimas 100 mensagens recebidas
- **Como funciona:** contadores e mensagens ficam no Vercel KV (storage da própria Vercel, conectado ao projeto; sem segredo no código). O site registra visitas/cliques via `/api/track` (sendBeacon, não bloqueia nada); o formulário guarda a mensagem no KV depois de enviá-la ao Discord
- **Arquivos:** `hyoga/area/` (página), `api/admin/` (login, stats, logout), `api/track.js`, `lib/kv.js`
- **Segurança:** página com `X-Robots-Tag: noindex`; APIs exigem token; senha nunca está no código

---

*Este documento é a fonte da verdade do projeto. Qualquer alteração de escopo passa por atualização deste PRD e aprovação do atleta.*
