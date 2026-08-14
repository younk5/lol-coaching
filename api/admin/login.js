const crypto = require('crypto');
const { kvGet, kvSet, kvIncr } = require('../../lib/kv.js');

const MAX_TENTATIVAS = 5;
const BLOQUEIO = 900;
const SESS = 12 * 3600;

function ipDe(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'desconhecido';
}

function senhaConfere(digitada, esperada) {
  const a = crypto.createHash('sha256').update(digitada).digest();
  const b = crypto.createHash('sha256').update(esperada).digest();
  return crypto.timingSafeEqual(a, b);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Método não permitido.' });
    return;
  }

  const esperada = process.env.ADMIN_PASSWORD || '';
  if (!esperada) {
    res.status(500).json({ ok: false, error: 'Serviço indisponível.' });
    return;
  }

  let senha = null;
  try {
    senha = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body).senha;
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

  if (!senha || !senhaConfere(senha, esperada)) {
    if (falhas === 0) {
      await kvSet(chaveFalhas, 1, BLOQUEIO);
    } else {
      await kvIncr(chaveFalhas);
    }
    res.status(401).json({ ok: false, error: 'Senha incorreta.' });
    return;
  }

  await kvSet(chaveFalhas, 0, 1);
  const token = crypto.randomBytes(32).toString('hex');
  await kvSet(`admin:sessao:${token}`, String(Date.now()), SESS);

  res.json({ ok: true, token, expiraEm: SESS });
};
