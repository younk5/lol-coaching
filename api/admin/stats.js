const { kvGet, kvPipeline } = require('../../lib/kv.js');

const CONTADORES = [
  ['stats:pv', 'Visitas'],
  ['stats:click:discord', 'Cliques no Discord'],
  ['stats:click:twitch', 'Cliques na Twitch'],
  ['stats:click:kick', 'Cliques na Kick'],
  ['stats:click:liquipedia', 'Cliques na Liquipedia'],
  ['stats:click:deeplol', 'Cliques no DeepLol'],
  ['stats:click:instagram', 'Cliques no Instagram'],
  ['stats:click:x', 'Cliques no X'],
  ['stats:click:form', 'Envios do formulário'],
];

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ ok: false, error: 'Método não permitido.' });
    return;
  }

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) {
    res.status(401).json({ ok: false, error: 'Não autenticado.' });
    return;
  }

  const sessao = await kvGet(`admin:sessao:${token}`);
  if (!sessao) {
    res.status(401).json({ ok: false, error: 'Sessão inválida ou expirada.' });
    return;
  }

  const chaves = CONTADORES.map(([k]) => k);
  const resKv = await kvPipeline([
    ...chaves.map((k) => ['GET', k]),
    ['LRANGE', 'msgs', '-100', '-1'],
  ]);

  const stats = {};
  CONTADORES.forEach(([k, nome], i) => {
    stats[nome] = Number(resKv[i]?.result || 0);
  });

  const CLICKS = [1, 2, 3, 4, 5, 6, 7];
  stats['Cliques em links'] = CLICKS.reduce((total, i) => total + Number(resKv[i]?.result || 0), 0);

  let msgs = [];
  try {
    msgs = (resKv[resKv.length - 1]?.result || []).map((m) => JSON.parse(m));
  } catch {
    msgs = [];
  }

  res.json({ ok: true, stats, msgs: msgs.reverse() });
};
