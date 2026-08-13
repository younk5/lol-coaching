# Spec — Autoridade + Sobre

> Data: 2026-08-13 · Status: implementado · Fonte: PRD §11 + Anexo A + Leaguepedia/DeepLol

## 1. Objetivo

**Autoridade:** responder "por que ele é qualificado para ensinar?" com provas verificáveis: topo da soloQ, 5 contas Challenger, 3 times profissionais, técnicos de referência e links oficiais (Liquipedia, DeepLol, Twitch).

**Sobre:** contar a história em primeira pessoa (voz do Hyoga), do beta ao profissionalismo — matéria-prima: Anexo A do PRD, apenas reescrita, sem fatos novos.

## 2. Contrato de conteúdo

### Autoridade
| Elemento | Texto | Fonte |
|---|---|---|
| Título | "O currículo de quem viveu o topo." | Redação |
| Subtítulo | "Mais de 7 anos no topo da soloQ brasileira e 3 times profissionais — tudo verificável em Liquipedia e DeepLol." | ⚠️ **"mais de 7 anos" NÃO usado** — texto real: "Desde 2018 disputando o topo da soloQ brasileira e 3 times profissionais — tudo verificável em Liquipedia e DeepLol." | 
| Stat 1 | 1º da soloQ BR / season 2019 | Atleta |
| Stat 2 | 5× Challenger / 5 contas no elo máximo | Atleta |
| Stat 3 | 3 times / CNB · Uppercut · Santos | Atleta + Leaguepedia |
| Stat 4 | Desde 2018 / top 1 na maior parte de cada ano | Atleta |
| Timeline | CNB 2017–2019 (Trinity Blue → Infinity → e-Sports Club) · Uppercut 2019 (empréstimo; org hoje é FURIA) · Santos 2019–2020 | Leaguepedia |
| Referências | Turtle (técnico na LCS) · Belze (Mundial; hoje LOUD) · Mora (liga britânica; no Santos) · Scrappydoo (coach da Uppercut) | Atleta |
| Links de prova | Liquipedia (lol.fandom.com/wiki/Hyoga) · DeepLol (deeplol.gg/pro/Hyoga) · Twitch (twitch.tv/hyoga) — `data-track` respectivo | Atleta |

### Sobre
| Elemento | Texto | Fonte |
|---|---|---|
| Título | "Começou no beta. Chegou ao topo." | Redação |
| P1 | Começo no beta, sonho de pro player, topo da soloQ desde 2018, season 2019 em 1º | Anexo A |
| P2 | 3 contas top 1/2/3 simultâneas, 5 contas Challenger, times e técnicos | Anexo A |
| P3 | Esforço, criatividade e método de estudo — ponte para o coaching | Anexo A |
| Ficha (aside) | Nome: Hyoga (nome real confidencial — não exibir) · Função: Jungle · Servidor: Brasil (BR) · Times: CNB · Uppercut · Santos · SoloQ: Top 1 (2019) · Classificação: Pro Player (DeepLol) | PRD §11 |

## 3. Casos de borda

- **Links oficiais quebrados no futuro:** comportamento padrão (nova aba + `noopener`); sem embeds.
- **Timeline longa:** 3 marcos apenas (CNB, Uppercut, Santos) — sem detalhar todas as idas e vindas da CNB (simplicidade > exaustão).
- **Mobile:** stat-band 4→2→1 colunas; grid de 2 colunas vira 1; ficha do jogador abaixo do texto.
- **Ciano:** dots da timeline (3) e links — sem exageros; stat values em branco.

## 4. Critérios de aceite

- [ ] Todos os fatos rastreáveis no PRD §11; nenhuma invenção ("mais de 7 anos" foi descartado).
- [ ] Links Liquipedia/DeepLol/Twitch com `target="_blank" rel="noopener"` + `data-track`.
- [ ] Timeline com 3 marcos e datas da Leaguepedia.
- [ ] `dl` na ficha do jogador (semântica correta).
- [ ] Sem overflow horizontal em 360px; reveal funcionando; console limpo.
