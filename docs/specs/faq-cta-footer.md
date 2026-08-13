# Spec — FAQ + CTA final + Footer

> Data: 2026-08-13 · Status: implementado · Fonte: PRD (oferta confirmada)

## 1. Objetivo

- **FAQ:** quebrar objeções com respostas curtas e **100% ancoradas nos dados confirmados** — nada de respostas inventadas.
- **CTA final:** último chamado para o Discord com fricção zero.
- **Footer:** identidade, links oficiais e créditos — encerramento limpo.

## 2. Contrato de conteúdo (FAQ — 5 perguntas)

| # | Pergunta | Resposta (fonte) |
|---|---|---|
| 1 | O que acontece na primeira sessão? | "Você escolhe o formato: VOD review (partidas que você já jogou) ou sessão ao vivo, com você jogando enquanto o Hyoga analisa. São 1h a 1h30 de análise precisa e completa da sua gameplay." (Anexo A) |
| 2 | VOD review ou sessão ao vivo: qual escolher? | "Você decide, e a escolha vale por sessão: no VOD review o foco é destrinchar partidas já jogadas; ao vivo, você recebe a orientação durante o jogo. As duas funcionam." (Anexo A) |
| 3 | Quanto custa? | "Primeira sessão: R$ 110. Sessões seguintes: R$ 80, com a mesma duração (1h a 1h30)." (Atleta) |
| 4 | Como combino horário e pagamento? | "Direto no Discord, conversando com o próprio Hyoga — sem sistemas de agendamento ou checkout." (fluxo real do projeto) |
| 5 | O coaching serve para o meu elo? | "Os elos atendidos ainda estão em definição. Fale com o Hyoga no Discord para confirmar se o coaching é para o seu momento — sem compromisso." (honestidade — `[PENDENTE]` sem inventar) |

Rodapé do FAQ: "Ficou com outra dúvida? Pergunte no Discord." (link + tracking)

## 3. CTA final

- Eyebrow "Pronto para evoluir?" · Título "O próximo passo é um clique." · Sub "Entre no Discord, converse com o Hyoga e descubra o que a sua jungle precisa melhorar."
- Botão primário grande: "Fazer coaching no Discord" → link real, `data-track="discord"`.

## 4. Footer

- Marca + nav com 6 links oficiais (Discord, Twitch, Liquipedia, DeepLol, X, Instagram — todos com `data-track` e nova aba).
- Nota: "© 2026 Hyoga. Ex-jogador profissional de League of Legends." (nome real não é exibido — decisão do atleta)

## 5. Acessibilidade do FAQ (contrato ARIA)

- Pergunta = `<button>` com `aria-expanded` + `aria-controls`; resposta = `<div role="region" aria-labelledby="id-do-botao">`.
- Fechar com Esc (comportamento global); um item aberto por vez; foco visível no botão.
- `hidden` controla visibilidade (sem conteúdo falso para leitores de tela).

## 6. Critérios de aceite

- [ ] Accordion: clique alterna `aria-expanded`, abre/fecha corretamente, teclado OK.
- [ ] 5 respostas 100% ancoradas nos dados confirmados.
- [ ] CTA final + 6 links do footer com tracking.
- [ ] Sem overflow 360px; console limpo.
