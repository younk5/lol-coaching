(() => {
  'use strict';

  const $ = (sel) => document.querySelector(sel);

  const telaLogin = $('#tela-login');
  const telaPainel = $('#tela-painel');
  const formLogin = $('#form-login');
  const erroLogin = $('#erro-login');
  const btnEntrar = $('#btn-entrar');
  const btnSair = $('#btn-sair');

  const KV_TOKEN = 'hyoga_admin_token';
  let token = sessionStorage.getItem(KV_TOKEN) || '';

  const dataBr = (iso) => {
    try {
      return new Date(iso).toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: '2-digit',
        hour: '2-digit', minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

  async function api(caminho, opcoes = {}) {
    const headers = { ...(opcoes.headers || {}) };
    if (token) headers.Authorization = `Bearer ${token}`;
    const r = await fetch(caminho, { ...opcoes, headers });
    if (r.status === 401) {
      sessionStorage.removeItem(KV_TOKEN);
      token = '';
      mostrarLogin();
      throw new Error('Sessão expirada');
    }
    return r.json();
  }

  function mostrarLogin() {
    telaPainel.hidden = true;
    telaLogin.hidden = false;
    $('#senha').focus();
  }

  function mostrarPainel(dados) {
    telaLogin.hidden = true;
    telaPainel.hidden = false;
    renderizar(dados);
  }

  function renderizar(dados) {
    const grade = $('#grade-stats');
    grade.innerHTML = Object.entries(dados.stats || {})
      .map(([nome, valor]) => `
        <div class="stat">
          <p class="stat-numero">${valor}</p>
          <p class="stat-nome">${esc(nome)}</p>
        </div>`)
      .join('');

    const lista = $('#lista-msgs');
    const semMsgs = $('#sem-msgs');
    const msgs = dados.msgs || [];

    semMsgs.hidden = msgs.length > 0;
    lista.innerHTML = msgs.map((m) => `
      <div class="msg">
        <div class="msg-topo">
          <span class="msg-nome">${esc(m.nome)}</span>
          <span class="msg-data">${dataBr(m.quando)}</span>
        </div>
        <p class="msg-linha"><strong>Elo:</strong> ${esc(m.elo)}</p>
        <p class="msg-linha"><strong>Objetivo:</strong> ${esc(m.objetivo)}</p>
        <p class="msg-linha"><strong>Servidor:</strong> ${esc(m.servidor)}</p>
        <p class="msg-linha"><strong>Experiência:</strong> ${esc(m.experiencia)}</p>
      </div>`)
      .join('');
  }

  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    erroLogin.hidden = true;

    const senha = $('#senha').value;
    if (!senha) return;

    btnEntrar.disabled = true;
    btnEntrar.textContent = 'Entrando...';

    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha }),
      });
      const j = await r.json();

      if (!r.ok) {
        erroLogin.textContent = j.error || 'Não foi possível entrar.';
        erroLogin.hidden = false;
        return;
      }

      token = j.token;
      sessionStorage.setItem(KV_TOKEN, token);
      const dados = await api('/api/admin/stats');
      mostrarPainel(dados);
    } catch {
      erroLogin.textContent = 'Falha de conexão. Tente de novo.';
      erroLogin.hidden = false;
    } finally {
      btnEntrar.disabled = false;
      btnEntrar.textContent = 'Entrar';
    }
  });

  btnSair.addEventListener('click', async () => {
    try {
      await api('/api/admin/logout', { method: 'POST' });
    } catch {}
    sessionStorage.removeItem(KV_TOKEN);
    token = '';
    mostrarLogin();
  });

  if (token) {
    api('/api/admin/stats')
      .then((dados) => {
        if (dados.ok) mostrarPainel(dados);
        else mostrarLogin();
      })
      .catch(() => mostrarLogin());
  } else {
    mostrarLogin();
  }
})();
