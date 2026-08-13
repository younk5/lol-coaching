# Spec — Para quem é / não é · Twitch · Provas sociais

> Data: 2026-08-13 · Status: implementado · Fonte: PRD §3 (personas) + links confirmados

## 1. Objetivo

- **Para quem é / não é:** alinhar expectativa (filtro honesto) e reforçar o posicionamento "para quem quer ser excepcional".
- **Twitch:** prova viva + ponte para a comunidade, sem embed pesado (preview + link, conforme briefing).
- **Provas sociais:** área preparada para receber conteúdo real futuro, honestamente marcada como "Em breve".

## 2. Contrato de conteúdo

### Para quem é (personas aprovadas no PRD)
| Item | Título | Texto |
|---|---|---|
| 1 | Jungler travado | "Você joga bastante, mas o elo não sobe: faltam método e leitura de jogo." |
| 2 | Migrando para a jungle | "Você vem de outra rota ou está começando e quer aprender do jeito certo, sem criar vícios." |
| 3 | Ambição competitiva | "Você quer jogar em outro nível, com rotina e mentalidade de alto rendimento." |

Nota visível: "Elos atendidos: [INFORMAÇÃO PENDENTE] — pergunte no Discord para confirmar se o coaching é para o seu elo." (honestidade; elos ainda não definidos pelo atleta)

### Para quem não é
| Item | Título | Texto |
|---|---|---|
| 1 | Quem espera um atalho | "Não existe mágica: o método exige análise, prática e constância." |
| 2 | Quem não vai aplicar | "Evoluir exige jogar com intenção depois de cada sessão." |
| 3 | Quem procura boost | "Aqui o elo se constrói jogando — não se compra." |

### Twitch
| Elemento | Texto | Fonte |
|---|---|---|
| Subtítulo | "Acompanhe o Hyoga aplicando o método ao vivo: pathing, decisões e leitura de jogo no alto elo do servidor brasileiro." | Redação (atividade em alto elo confirmada no DeepLol) |
| CTA | "Assistir na Twitch" → twitch.tv/hyoga (nova aba, `noopener`, `data-track="twitch"`) | Atleta |
| Área futura | "Clipes e destaques — em breve" | Estrutura (sem conteúdo real ainda) |

### Provas sociais
| Elemento | Texto |
|---|---|
| Subtítulo | "Depoimentos de alunos e evolução de elo entram aqui assim que existirem." |
| Área futura | "Em breve — depoimentos e resultados reais de alunos." |

## 3. Casos de borda

- **Elo mínimo `[PENDENTE]`:** linha visível na seção orientando a perguntar no Discord — nunca inventar faixa.
- **Sem conteúdo real (clipes/depoimentos):** caixas "Em breve" com chip — sem imagens falsas.
- **Mobile:** duo-grid 2→1 coluna; CTA da Twitch largura total em telas pequenas.
- **Ciano:** ícones de check (é) e X (não é em `--error`) — pequenos, moderados.

## 4. Critérios de aceite

- [ ] 3+3 itens honestos; elos pendentes visíveis como `[PENDENTE]`.
- [ ] Twitch: link real, ícone próprio, tracking, sem embed.
- [ ] Áreas "Em breve" claramente identificadas (chip).
- [ ] Sem overflow 360px; reveal OK; console limpo.
