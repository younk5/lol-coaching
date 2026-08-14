const { kvGet, kvMsgsVisto, kvMsgsDel } = require('../../lib/kv.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Método não permitido.' });
    return;
  }

  const token = ((req.headers || {}).authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) {
    res.status(401).json({ ok: false, error: 'Não autenticado.' });
    return;
  }

  const sessao = await kvGet(`admin:sessao:${token}`);
  if (!sessao) {
    res.status(401).json({ ok: false, error: 'Sessão inválida ou expirada.' });
    return;
  }

  let payload = req.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      res.status(400).json({ ok: false, error: 'JSON inválido.' });
      return;
    }
  }

  const { id, acao, visto } = payload || {};
  if (!id || (acao !== 'visto' && acao !== 'excluir')) {
    res.status(400).json({ ok: false, error: 'Ação inválida.' });
    return;
  }

  const chave = String(id);
  if (acao === 'excluir') {
    await kvMsgsDel(chave);
  } else {
    await kvMsgsVisto(chave, Boolean(visto));
  }

  res.json({ ok: true });
};
