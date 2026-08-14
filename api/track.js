const { kvIncr } = require('../lib/kv.js');

const PERMITIDOS = new Set([
  'pageview',
  'discord',
  'twitch',
  'liquipedia',
  'deeplol',
  'instagram',
  'x',
  'form',
]);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Método não permitido.' });
    return;
  }

  let nome = null;
  try {
    nome = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body).name;
  } catch {
    res.status(400).end();
    return;
  }

  if (!PERMITIDOS.has(nome)) {
    res.status(400).end();
    return;
  }

  const chave = nome === 'pageview' ? 'stats:pv' : `stats:click:${nome}`;

  await kvIncr(chave);

  res.status(204).end();
};
