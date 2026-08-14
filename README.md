# Hyoga — Coaching de Jungle (site oficial)

Site profissional do **Hyoga**, ex-jogador profissional de League of Legends (jungle), com passagens por CNB, Uppercut e Santos e-Sports — hoje oferecendo coaching individual de jungle.

Este guia foi escrito para você, que **não é desenvolvedor(a)**. Ele explica o que cada arquivo faz e como fazer as mudanças mais comuns sem quebrar nada.

---

## 1. O que é este projeto

Um **site de uma página só** (landing page), feito com as tecnologias mais simples que existem para a web:

- **HTML** = o conteúdo (textos, imagens, botões) — `index.html`
- **CSS** = a aparência (cores, fontes, tamanhos) — `style.css`
- **JavaScript** = os comportamentos (menu, perguntas frequentes, formulário) — `app.js`

Não existe "sistema" por trás: quando alguém acessa o site, o navegador baixa esses arquivos e monta a página. Simples e rápido.

---

## 2. Estrutura de pastas

| Arquivo/Pasta | O que é | Quando você vai mexer |
|---|---|---|
| `index.html` | A página inteira — todos os textos e links | **Sempre**: para trocar qualquer texto |
| `style.css` | Cores, fontes, espaçamentos, botões | Para mudar a aparência |
| `app.js` | Menu, FAQ, formulário, contagem de cliques | Raramente (só se pedir ajuda) |
| `assets/images/` | Fotos e imagens do site | Para trocar imagens |
| `assets/icons/` | Ícones (Discord, Twitch, setas...) | Raramente |
| `api/contact.js` | "Porteiro" do formulário — envia mensagens ao seu Discord com segurança | Nunca (segredo protegido) |
| `api/track.js` | Conta visitas e cliques no site | Nunca |
| `api/admin/` | Login, estatísticas e sair da área admin | Nunca |
| `lib/kv.js` | Guarda os números e mensagens no banco de dados (Firebase) | Nunca |
| `hyoga/area/` | Página secreta do dono — `hyogacoach.vercel.app/hyoga/area` | Raramente |
| `docs/PRD.md` | Documento do projeto (o "contrato" do site) | Para consultar decisões |
| `docs/UI-UX-BRIEFING.md` | Manual de design (cores, fontes, regras) | Para consultar |
| `robots.txt` / `sitemap.xml` | Instruções para o Google | Raramente |
| `favicon.svg` | Ícone que aparece na aba do navegador | Quando tiver um desenho melhor |

---

## 3. Como ver o site na sua máquina

**Dois jeitos:**

1. **Duplo clique** no arquivo `index.html` — abre no navegador (o mais simples, mas alguns recursos funcionam melhor com o jeito 2).
2. **Com servidor local** (recomendado): abra o terminal na pasta do projeto e rode:

   ```
   python -m http.server 8080
   ```

   Depois abra `http://localhost:8080` no navegador. Para parar: `Ctrl + C`.

> 💡 **Dica:** as animações do site ficam **ligadas por padrão** — mesmo que o Windows tenha "Efeitos de animação" desligados (Configurações → Acessibilidade → Efeitos visuais). Só use `?motion=off` no endereço se quiser ver o site no modo sem animações (acessível).

---

## 4. Como fazer as mudanças mais comuns

> Dica geral: use um editor de texto simples como o **VS Code** (gratuito) para abrir os arquivos. Antes de mudar algo, **copie o arquivo para outro lugar** como segurança. E faça **uma mudança por vez**.

### Trocar um texto (ex.: um título)

1. Abra `index.html`.
2. Procure o texto atual (Ctrl + F no VS Code).
3. Substitua pelo novo texto, mantendo as tags ao redor intactas.

```html
<!-- ANTES -->
<h2>Coaching de Jungle</h2>

<!-- DEPOIS (só mudou o texto, as tags <h2> ficaram iguais) -->
<h2>Treinamento de Jungle</h2>
```

### Trocar uma cor

1. Abra `style.css` e vá até o topo, na seção `:root` (é o "painel de controle" das cores).
2. Mude o valor de uma variável — **todo o site atualiza de uma vez**.

```css
:root {
  --cyan: #00E5FF;   /* ciano principal */
  --bg: #05070A;     /* fundo */
}
```

### Trocar uma imagem

1. Coloque a nova imagem em `assets/images/` **com o mesmo nome** do arquivo atual (ex.: `assets/images/sua-imagem.webp`).
2. Pronto — o site já usa a nova. (Para trocar o nome também, procure o arquivo no `index.html`.)

### Trocar um link (ex.: seu Discord)

1. Abra `index.html`.
2. Procure `discord.gg/...` (Ctrl + F).
3. Substitua a URL dentro das aspas `href="..."` — **não mude nada fora das aspas**.

### Ajustar preços ou oferta

1. Abra `index.html` e procure por "R$" (Ctrl + F).
2. Edite os valores. Verifique se o texto continua fazendo sentido junto (ex.: "1ª sessão R$ 110").

---

## 5. Como publicar na internet (Vercel)

O site **já está publicado** em: **https://hyogacoach.vercel.app** 🎉

**Como funciona a partir de agora:**
- Qualquer mudança que você fizer nos arquivos e **enviar para o GitHub** (ou que eu fizer por você) é publicada **automaticamente** em ~1 minuto. Nada de passos manuais.
- Para enviar mudanças, usamos o Git: `git add .` → `git commit -m "mensagem"` → `git push`.

**Onde está cada coisa (conta Vercel, logada como younk5):**
| Item | Onde |
|---|---|
| Painel do projeto | vercel.com → Project **lol-coaching** |
| Segredo do Discord (webhook) | Project → **Settings** → **Environment Variables** → `DISCORD_WEBHOOK_URL` |
| Chaves do Firebase (banco de dados da área admin) | Project → **Settings** → **Environment Variables** → `FIREBASE_API_KEY`, `FIREBASE_DB_URL`, `FIREBASE_ADMIN_EMAIL`, `FIREBASE_ADMIN_PASSWORD` |
| Analytics (visitas) | Project → **Analytics** |
| Performance | Project → **Speed Insights** |

**Área admin (só sua):** `https://hyogacoach.vercel.app/hyoga/area` — entre com o e-mail e a senha que você recebeu no chat. Lá você vê visitas, cliques e as mensagens do formulário. Para trocar a senha: console.firebase.google.com → projeto **hyoga-admin** → **Authentication** → usuário → editar senha.

**Trocar o webhook do Discord** (se quiser): edite `DISCORD_WEBHOOK_URL` nas variáveis de ambiente e clique em **Redeploy** (botão nos Deployments).

---

## 6. Regras de ouro deste projeto

- **Nunca inventar informação.** Tudo que ainda não foi confirmado aparece como `[PENDENTE]` no site — e continua visível até você confirmar. Isso protege sua credibilidade.
- **Nunca colocar senhas/segredos no site** (ex.: o endereço secreto do Discord fica guardado na Vercel, fora do site).
- **Uma mudança por vez** e teste antes de publicar.
- **Git**: mensagens de commit no padrão do projeto (`feat:`, `fix:`, `docs:`...).

---

## 7. Status do projeto

- [x] Documento do projeto (PRD)
- [x] Memória técnica (CLAUDE.md)
- [x] Briefing de UI/UX
- [x] Design system (cores, fontes, botões)
- [x] Seções da página (Hero, Autoridade, Sobre, Coaching...)
- [x] Responsividade e performance
- [x] SEO e analytics
- [x] Formulário + segurança
- [x] Deploy na Vercel
- [x] Área admin (login, visitas, cliques e mensagens)

*Última atualização: 2026-08-14*
