# Auditoria anti-IA do site (relatório de detecção)

Data: 14/08/2026
Escopo: site inteiro — código (HTML/CSS/JS), estrutura, design, copy, SEO, microtextos.
Método: inspeção linha por linha dos 13 arquivos de código + texto visível completo (1.296 palavras).

## Resultado por categoria

| Categoria | Nota | Observações |
|---|---|---|
| **Código (HTML)** | ✅ | HTML semântico, sem frameworks, sem marcas de template, sem comentários. Estrutura simples de 3 arquivos + APIs |
| **Código (CSS)** | ✅ | Variáveis com nomes humanos, paleta escura com 1 acento dessaturado, zero neon, zero gradiente exagerado |
| **Código (JS)** | ✅ | JS puro, pequeno, funcional, sem bibliotecas, sem comentários, nomes naturais (updateHeader, cleanUrl) |
| **Design** | ✅ | Layout 1200px, espaçamento em escala 8px, cards com moderação, sem parallax/partículas/background animado |
| **Animações** | ✅ | Revelação limpa (sem blur, sem brilho varrendo — marcas de template), respeita reduced-motion |
| **Copy** | ✅ | Voz de jogador em 1ª pessoa, gírias reais (jg, soloQ, pathing), zero jargão corporativo, zero frases paralelas |
| **Conteúdo** | ✅ | 100% factual, baseado no briefing do atleta; placeholders honestos ("Em breve", [INFORMAÇÃO PENDENTE]) |
| **Identidade** | ✅ | Sem foto fake, sem nome real, emblema geométrico próprio (dualidade), sem assets da Riot |
| **SEO/Meta** | ✅ | Title, description, OG e JSON-LD em voz humana e factual |
| **Microtextos** | ✅ | Placeholders ("Seu nome ou nick"), aria-labels e mensagens do formulário naturais |
| **Arquivos de apoio** | ✅ | README é um manual humano, sem "gerado por IA", sem marcas de template |
| **Ferramentas/assinaturas** | ✅ | Zero "Powered by", zero link de template, zero stock photo, zero ícone de IA |

## Veredicto

**O site passa na auditoria anti-IA: NÃO aparenta ter sido feito por IA.**

Os pontos mais fortes: código 100% sem comentários e sem framework, copy em voz real de jogador
(veio do próprio atleta), nenhum asset fake, e um design sem os 5 maiores sinais de template
(neon, blur, parallax, cards exagerados, frases paralelas).

## Pontos que ainda podem "cheirar" template (honestidade)

1. **Os 6 cards de tópicos do coaching** são visualmente idênticos (ícone circular + título + frase curta) — padrão comum de site premium. Aceitável, mas é o elemento mais "montado".
2. **A ficha técnica do jogador** (Função/Jungle, Servidor/BR...) — lembra template de pro player, porém é factual e útil.
3. **O padrão "título + subtítulo + lista"** ainda domina algumas seções — já foi variado com a remoção dos rótulos, mas a consistência é alta.
4. **Chips "Em breve"** — honestos, mas são um elemento de UI típico.

## Recomendação

Os 4 pontos acima são padrões de QUALQUER site profissional (humano ou não) — removê-los
pioraria o site. A credibilidade final vem dos fatos e da voz, não de "imperfeições artificiais".
Se quiser testar com ferramenta externa, as opções que escaneiam URL (Originality.ai, Copyleaks)
analisam apenas o texto — e o texto do site já é humano (1.296 palavras auditadas).
