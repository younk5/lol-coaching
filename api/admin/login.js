const crypto = require('crypto');
const { kvGet, kvSet, kvIncr } = require('../../lib/kv.js');

const MAX_TENTATIVAS = 5;
const BLOQUEIO = 900;
const SESS = 12 * 3600;

function ipDe(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'desconhecido';
}

async function registrarFalha(chave, falhas) {
  if (falhas === 0) {
    await kvSet(chave, 1, BLOQUEIO);
  } else {
    await kvIncr(chave);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Método não permitido.' });
    return;
  }

  const apiKey = process.env.FIREBASE_API_KEY || '';
  if (!apiKey) {
    res.status(500).json({ ok: false, error: 'Serviço indisponível.' });
    return;
  }

  let idToken = null;
  try {
    idToken = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body).idToken;
  } catch {
    res.status(400).json({ ok: false, error: 'Requisição inválida.' });
    return;
  }

  const chaveFalhas = `admin:falhas:${ipDe(req)}`;
  const falhas = Number((await kvGet(chaveFalhas)) || 0);

  if (falhas >= MAX_TENTATIVAS) {
    res.status(429).json({ ok: false, error: 'Muitas tentativas. Aguarde alguns minutos.' });
    return;
  }

  if (!idToken) {
    await registrarFalha(chaveFalhas, falhas);
    res.status(401).json({ ok: false, error: 'Não autenticado.' });
    return;
  }

  let valido = false;
  try {
    const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
    const j = await r.json();
    valido = r.ok && Array.isArray(j.users) && j.users.length > 0;
  } catch {}

  if (!valido) {
    await registrarFalha(chaveFalhas, falhas);
    res.status(401).json({ ok: false, error: 'Sessão do Firebase inválida.' });
    return;
  }

  await kvSet(chaveFalhas, 0, 1);
  const token = crypto.randomBytes(32).toString('hex');
  await kvSet(`admin:sessao:${token}`, String(Date.now()), SESS);

  res.json({ ok: true, token, expiraEm: SESS });
};
