(() => {
  'use strict';

  const FIREBASE_KEY = 'AIzaSyDcVErt8QYPhHecLa622-XeuSuhT6CZ6jQ';

  const $ = (sel) => document.querySelector(sel);

  const telaLogin = $('#tela-login');
  const telaPainel = $('#tela-painel');
  const formLogin = $('#form-login');
  const erroLogin = $('#erro-login');
  const btnEntrar = $('#btn-entrar');
  const btnSair = $('#btn-sair');

  const KV_TOKEN = 'hyoga_admin_token';
  let token = sessionStorage.getItem(KV_TOKEN) || '';

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
    $('#email').focus();
  }

  function mostrarPainel(dados) {
    telaLogin.hidden = true;
    telaPainel.hidden = false;
    renderizar(dados);
  }

  const REDES = ['Discord', 'Twitch', 'Kick', 'Liquipedia', 'DeepLol', 'Instagram', 'X'];

  const ELO_LABEL = {
    ferro: 'Ferro', bronze: 'Bronze', prata: 'Prata', ouro: 'Ouro',
    platina: 'Platina', diamante: 'Diamante', mestre: 'Mestre',
    'grao-mestre': 'Grão-Mestre', desafiante: 'Desafiante',
    nunca: 'Ainda não joga ranqueado',
  };

  const ELO_COR = {
    ferro: '#8A8F98', bronze: '#B0785A', prata: '#B8C0CC', ouro: '#D9B44A',
    platina: '#4FD1B5', diamante: '#5B8DEF', mestre: '#B36BDF',
    'grao-mestre': '#E05B8A', desafiante: '#E8A33D', nunca: '#9AA6B2',
  };

  const SERVIDOR_LABEL = { br: 'Brasil', lan: 'LAN', las: 'LAS', na: 'NA', euw: 'EUW', outro: 'Outro' };

  const EXP_LABEL = { nunca: 'Nunca jogou', iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado' };

  const HORAS_LABEL = { 'menos-5': 'Menos de 5 h', '5-15': '5 a 15 h', '15-30': '15 a 30 h', 'mais-30': 'Mais de 30 h' };

  const INTERESSE_LABEL = { 'aula-avulsa': 'Aula avulsa', pacote: 'Pacote de aulas', 'vod-review': 'VOD review', conversar: 'Só conversar' };

  const ORIGEM_LABEL = { discord: 'Discord', twitch: 'Twitch', kick: 'Kick', instagram: 'Instagram', indicacao: 'Indicação', outro: 'Outro' };

  const SVGS = {
    olho: '<svg viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    form: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>',
    discord: '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    twitch: '<svg viewBox="0 0 24 24"><path d="M4 2h16v11l-4 4h-4l-4 4v-4H4z"/><path d="M14 6v5M10 6v5"/></svg>',
    kick: '<svg viewBox="0 0 24 24"><path d="M6 3v18"/><path d="M6 12l12-9"/><path d="M18 12L6 21"/></svg>',
    liquipedia: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    deeplol: '<svg viewBox="0 0 24 24"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M4 4l16 16M20 4L4 20"/></svg>',
    globo: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/></svg>',
    pulso: '<svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    calendario: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    relogio: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    trofeu: '<svg viewBox="0 0 24 24"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v7a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 6"/><path d="M17 6h3a3 3 0 0 1-3 6"/></svg>',
    estrela: '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
    mira: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 12h.01"/></svg>',
    megafone: '<svg viewBox="0 0 24 24"><path d="M3 10v4a1 1 0 0 0 1 1h2l5 4V5L6 9H4a1 1 0 0 0-1 1z"/><path d="M15 8a5 5 0 0 1 0 8"/></svg>',
    lixeira: '<svg viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
  };

  let msgsCache = [];
  let soNaoVistas = false;

  const lixeiraSvg = '<svg viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>';

  function tempoRelativo(iso) {
    if (!iso) return '';
    const t = new Date(iso).getTime();
    if (Number.isNaN(t)) return '';
    const diff = Date.now() - t;
    const min = 60000;
    const hora = 3600000;
    const dia = 86400000;
    if (diff < min) return 'agora mesmo';
    if (diff < hora) return `há ${Math.floor(diff / min)} min`;
    if (diff < dia) return `há ${Math.floor(diff / hora)} h`;
    if (diff < 7 * dia) {
      const dias = Math.floor(diff / dia);
      return `há ${dias} ${dias === 1 ? 'dia' : 'dias'}`;
    }
    return new Date(t).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  }

  const iniciais = (nome) => (String(nome || '?').trim()[0] || '?').toUpperCase();

  function cardMsg(m) {
    const elo = m.elo || '';
    const servidor = m.servidor ? SERVIDOR_LABEL[m.servidor] || m.servidor : '';
    const experiencia = m.experiencia ? EXP_LABEL[m.experiencia] || m.experiencia : '';
    const campeoes = m.campeoes ? esc(m.campeoes) : '';
    const horas = m.horas ? HORAS_LABEL[m.horas] || m.horas : '';
    const interesse = m.interesse ? INTERESSE_LABEL[m.interesse] || m.interesse : '';
    const origem = m.origem ? ORIGEM_LABEL[m.origem] || m.origem : '';
    const naoVista = !m.visto;
    const id = esc(m.id || '');
    return `
      <article class="msg ${naoVista ? 'msg--nao-vista' : ''}">
        <div class="msg-topo">
          <div class="msg-autor">
            <span class="avatar">${iniciais(m.nome)}</span>
            <div class="msg-autor-info">
              <p class="msg-nome">${esc(m.nome)}</p>
              <p class="msg-data">${tempoRelativo(m.quando)}</p>
            </div>
          </div>
          <div class="msg-topo-lado">
            ${naoVista ? '<span class="badge-nova">Não vista</span>' : ''}
            ${elo ? `<span class="badge-elo" style="--cor-elo:${ELO_COR[elo] || '#9AA6B2'}">${esc(ELO_LABEL[elo] || elo)}</span>` : ''}
          </div>
        </div>
        <div class="msg-contatos">
          ${m.discord ? `<span class="meta"><span class="meta-icone">${SVGS.discord}</span><b>Discord</b>${esc(m.discord)}</span>` : ''}
        </div>
        <p class="msg-objetivo">${esc(m.objetivo)}</p>
        <div class="msg-metas">
          ${servidor ? `<span class="meta"><span class="meta-icone">${SVGS.globo}</span><b>Servidor</b>${esc(servidor)}</span>` : ''}
          ${experiencia ? `<span class="meta"><span class="meta-icone">${SVGS.pulso}</span><b>Experiência</b>${esc(experiencia)}</span>` : ''}
          ${campeoes ? `<span class="meta"><span class="meta-icone">${SVGS.estrela}</span><b>Campeões</b>${campeoes}</span>` : ''}
          ${horas ? `<span class="meta"><span class="meta-icone">${SVGS.relogio}</span><b>Horas/semana</b>${esc(horas)}</span>` : ''}
        </div>
        <div class="msg-rodape">
          <div class="msg-rodape-info">
            ${interesse ? `<span class="badge-interesse">${esc(interesse)}</span>` : ''}
            ${origem ? `<span class="meta"><span class="meta-icone">${SVGS.megafone}</span>${esc(origem)}</span>` : ''}
          </div>
          <div class="msg-acoes">
            <button type="button" class="acao acao-visto" data-msg-id="${id}" data-visto="${m.visto ? '1' : ''}" title="${m.visto ? 'Marcar como não vista' : 'Marcar como vista'}">
              ${SVGS.olho}<span>${m.visto ? 'Vista' : 'Marcar vista'}</span>
            </button>
            <button type="button" class="acao acao-excluir" data-msg-id="${id}" title="Excluir mensagem">
              ${lixeiraSvg}<span>Excluir</span>
            </button>
          </div>
        </div>
      </article>`;
  }

  function aplicarFiltro() {
    const termo = $('#busca-msgs').value.trim().toLowerCase();
    let lista = soNaoVistas ? msgsCache.filter((m) => !m.visto) : msgsCache;
    if (termo) {
      lista = lista.filter((m) => [m.nome, m.objetivo, m.elo, m.servidor, m.experiencia].join(' ').toLowerCase().includes(termo));
    }
    $('#lista-msgs').innerHTML = lista.map(cardMsg).join('');
    const vazio = $('#sem-msgs');
    if (msgsCache.length === 0) {
      vazio.hidden = false;
      $('#sem-msgs-titulo').textContent = 'Nenhuma mensagem ainda';
      $('#sem-msgs-texto').textContent = 'As mensagens enviadas pelo formulário do site aparecem aqui.';
    } else if (lista.length === 0) {
      vazio.hidden = false;
      if (soNaoVistas && !termo) {
        $('#sem-msgs-titulo').textContent = 'Tudo em dia';
        $('#sem-msgs-texto').textContent = 'Nenhuma mensagem não vista.';
      } else {
        $('#sem-msgs-titulo').textContent = 'Nada encontrado';
        $('#sem-msgs-texto').textContent = `Nenhuma mensagem corresponde a “${termo}”.`;
      }
    } else {
      vazio.hidden = true;
    }
  }

  function renderizar(dados) {
    const stats = dados.stats || {};
    $('#skeleton-stats').hidden = true;
    $('#conteudo-stats').hidden = false;

    const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    $('#data-hoje').textContent = hoje.charAt(0).toUpperCase() + hoje.slice(1);

    msgsCache = dados.msgs || [];
    const agoraMs = Date.now();
    const diaMs = 86400000;
    const numeroBr = (v) => Number(v).toLocaleString('pt-BR');
    const contaRecentes = (dias) => msgsCache.filter((m) => {
      const t = new Date(m.quando).getTime();
      return !Number.isNaN(t) && agoraMs - t < dias * diaMs;
    }).length;
    const maisComum = (campo) => {
      const contagem = {};
      msgsCache.forEach((m) => {
        const v = m[campo];
        if (v) contagem[v] = (contagem[v] || 0) + 1;
      });
      let topo = null;
      let max = 0;
      Object.keys(contagem).forEach((v) => {
        if (contagem[v] > max) {
          max = contagem[v];
          topo = v;
        }
      });
      return topo;
    };

    const cardDestaque = (nome, icone, numero, sub, classe) => `
      <div class="stat stat-destaque">
        <div class="stat-topo">
          <span class="stat-icone">${icone}</span>
          <p class="stat-nome">${esc(nome)}</p>
        </div>
        <p class="stat-numero ${classe || ''}">${numero}</p>
        <p class="stat-sub">${esc(sub)}</p>
      </div>`;

    $('#stats-destaque').innerHTML = [
      ['Visitas', SVGS.olho, numeroBr(stats['Visitas'] || 0), 'Acessos ao site'],
      ['Cliques em links', SVGS.link, numeroBr(stats['Cliques em links'] || 0), 'Total de cliques nas redes'],
      ['Envios do formulário', SVGS.form, numeroBr(stats['Envios do formulário'] || 0), 'Leads recebidos'],
    ]
      .filter(([nome]) => nome in stats)
      .map(([nome, icone, numero, sub]) => cardDestaque(nome, icone, numero, sub, ''))
      .join('');

    $('#grade-leads').innerHTML = [
      ['Leads em 7 dias', SVGS.calendario, numeroBr(contaRecentes(7)), 'Nos últimos 7 dias', ''],
      ['Leads em 30 dias', SVGS.calendario, numeroBr(contaRecentes(30)), 'Nos últimos 30 dias', ''],
      ['Última mensagem', SVGS.relogio, msgsCache.length ? tempoRelativo(msgsCache[0].quando) : '—', 'Tempo desde o último contato', 'texto'],
    ]
      .map(([nome, icone, numero, sub, classe]) => cardDestaque(nome, icone, numero, sub, classe))
      .join('');

    $('#grade-redes').innerHTML = REDES
      .filter((nome) => nome in stats)
      .map((nome) => `
        <div class="stat stat-rede">
          <span class="stat-icone">${SVGS[nome.toLowerCase()] || SVGS.olho}</span>
          <p class="stat-nome">${esc(nome)}</p>
          <p class="stat-numero">${numeroBr(stats[nome])}</p>
        </div>`)
      .join('');

    const eloTopo = maisComum('elo');
    $('#grade-perfil').innerHTML = [
      ['Elo mais comum', SVGS.trofeu, ELO_LABEL[eloTopo] || '—', eloTopo ? ELO_COR[eloTopo] : ''],
      ['Servidor mais comum', SVGS.globo, SERVIDOR_LABEL[maisComum('servidor')] || '—', ''],
      ['Experiência mais comum', SVGS.pulso, EXP_LABEL[maisComum('experiencia')] || '—', ''],
      ['Interesse mais comum', SVGS.mira, INTERESSE_LABEL[maisComum('interesse')] || '—', ''],
      ['Origem mais comum', SVGS.megafone, ORIGEM_LABEL[maisComum('origem')] || '—', ''],
    ]
      .map(([nome, icone, valor, cor]) => `
        <div class="stat stat-perfil">
          <span class="stat-icone">${icone}</span>
          <p class="stat-nome">${esc(nome)}</p>
          <p class="stat-perfil-valor" ${cor ? `style="--cor-elo:${cor}"` : ''}>${esc(valor)}</p>
        </div>`)
      .join('');

    const total = msgsCache.length;
    const naoVistas = msgsCache.filter((m) => !m.visto).length;
    $('#msgs-sub').textContent = total === 1
      ? `1 mensagem${naoVistas ? ` · ${naoVistas} não vista` : ''}`
      : `${total} mensagens${naoVistas ? ` · ${naoVistas} não vistas` : ''}`;
    aplicarFiltro();

    const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    $('#ultima-atualizacao').textContent = `Atualizado às ${agora}`;
    $('#ultima-atualizacao').hidden = false;
  }

  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    erroLogin.hidden = true;

    if (!FIREBASE_KEY) {
      erroLogin.textContent = 'Área admin ainda não configurada (falta a chave do Firebase).';
      erroLogin.hidden = false;
      return;
    }

    const email = $('#email').value.trim();
    const senha = $('#senha').value;
    if (!email || !senha) return;

    btnEntrar.disabled = true;
    btnEntrar.textContent = 'Entrando...';

    try {
      const rFirebase = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: senha, returnSecureToken: true }),
        }
      );

      if (!rFirebase.ok) {
        const j = await rFirebase.json().catch(() => ({}));
        const codigo = j.error?.message || '';
        if (codigo === 'EMAIL_NOT_FOUND' || codigo === 'INVALID_PASSWORD' || codigo === 'INVALID_LOGIN_CREDENTIALS') {
          erroLogin.textContent = 'E-mail ou senha incorretos.';
        } else if (codigo === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
          erroLogin.textContent = 'Muitas tentativas erradas. O Firebase bloqueou o login por um tempo.';
        } else {
          erroLogin.textContent = 'Não foi possível entrar. Tente de novo.';
        }
        erroLogin.hidden = false;
        return;
      }

      const { idToken } = await rFirebase.json();

      const rSessao = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      const jSessao = await rSessao.json();

      if (!rSessao.ok) {
        erroLogin.textContent = jSessao.error || 'Não foi possível entrar.';
        erroLogin.hidden = false;
        return;
      }

      token = jSessao.token;
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

  $('#btn-ver-senha').addEventListener('click', () => {
    const campo = $('#senha');
    const visivel = campo.type === 'text';
    campo.type = visivel ? 'password' : 'text';
    const btn = $('#btn-ver-senha');
    btn.setAttribute('aria-pressed', String(!visivel));
    btn.classList.toggle('ativo', !visivel);
  });

  $('#btn-atualizar').addEventListener('click', async () => {
    const btn = $('#btn-atualizar');
    btn.disabled = true;
    btn.classList.add('girando');
    try {
      const dados = await api('/api/admin/stats');
      if (dados.ok) renderizar(dados);
    } catch {}
    btn.disabled = false;
    btn.classList.remove('girando');
  });

  $('#busca-msgs').addEventListener('input', aplicarFiltro);

  $('#filtro-nao-vistas').addEventListener('click', () => {
    soNaoVistas = !soNaoVistas;
    const btn = $('#filtro-nao-vistas');
    btn.classList.toggle('ativo', soNaoVistas);
    btn.setAttribute('aria-pressed', String(soNaoVistas));
    aplicarFiltro();
  });

  $('#lista-msgs').addEventListener('click', async (e) => {
    const btn = e.target.closest('.acao');
    if (!btn) return;
    const id = btn.dataset.msgId;
    if (!id) return;

    if (btn.classList.contains('acao-excluir') && !btn.classList.contains('confirmando')) {
      btn.classList.add('confirmando');
      btn.querySelector('span').textContent = 'Confirmar exclusão';
      setTimeout(() => {
        if (btn.isConnected && btn.classList.contains('confirmando')) {
          btn.classList.remove('confirmando');
          btn.querySelector('span').textContent = 'Excluir';
        }
      }, 3000);
      return;
    }

    btn.disabled = true;
    const acao = btn.classList.contains('acao-excluir') ? 'excluir' : 'visto';
    const visto = acao === 'visto' ? btn.dataset.visto !== '1' : undefined;
    try {
      const r = await api('/api/admin/msgs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, acao, visto }),
      });
      if (r.ok) {
        const dados = await api('/api/admin/stats');
        if (dados.ok) renderizar(dados);
      }
    } catch {}
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
