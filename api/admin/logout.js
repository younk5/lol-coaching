// api/admin/logout.js — encerra a sessão da área do admin

const { kvDel } = require('../lib/kv.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Método não permitido.' });
    return;
  }

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (token) {
    await kvDel(`admin:sessao:${token}`);
  }

  res.json({ ok: true });
};
