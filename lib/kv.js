const DB = process.env.FIREBASE_DB_URL || '';
const API = process.env.FIREBASE_API_KEY || '';
const EMAIL = process.env.FIREBASE_ADMIN_EMAIL || '';
const SENHA = process.env.FIREBASE_ADMIN_PASSWORD || '';

let authCache = null;

async function authToken() {
  const agora = Date.now();
  if (authCache && authCache.exp > agora + 60000) return authCache.tok;
  if (!API || !EMAIL || !SENHA) return '';
  const r = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: EMAIL, password: SENHA, returnSecureToken: true }),
    }
  );
  if (!r.ok) return '';
  const j = await r.json();
  authCache = { tok: j.idToken, exp: Date.now() + Number(j.expiresIn || 3600) * 1000 };
  return authCache.tok;
}

function urlDe(chave) {
  return `${DB}/${chave.split(':').map(encodeURIComponent).join('/')}.json`;
}

function envelope(valor, ex) {
  return { v: valor, exp: ex ? Date.now() + ex * 1000 : 0 };
}

function vivo(env) {
  if (!env || typeof env !== 'object') return null;
  if (env.exp && env.exp < Date.now()) return null;
  return env.v;
}

async function kvGet(chave) {
  if (!DB) return null;
  try {
    const t = await authToken();
    if (!t) return null;
    const r = await fetch(`${urlDe(chave)}?auth=${t}`);
    if (!r.ok) return null;
    return vivo(await r.json());
  } catch {
    return null;
  }
}

async function kvSet(chave, valor, ex) {
  if (!DB) return null;
  try {
    const t = await authToken();
    if (!t) return null;
    const r = await fetch(`${urlDe(chave)}?auth=${t}`, {
      method: 'PUT',
      body: JSON.stringify(envelope(valor, ex)),
    });
    return r.ok ? r.json() : null;
  } catch {
    return null;
  }
}

async function kvDel(chave) {
  if (!DB) return null;
  try {
    const t = await authToken();
    if (!t) return null;
    const r = await fetch(`${urlDe(chave)}?auth=${t}`, { method: 'DELETE' });
    return r.ok ? r.json() : null;
  } catch {
    return null;
  }
}

async function kvIncr(chave) {
  if (!DB) return null;
  try {
    const t = await authToken();
    if (!t) return null;
    const u = `${urlDe(chave)}?auth=${t}`;
    const r = await fetch(u);
    let env = null;
    try {
      env = await r.json();
    } catch {}
    const atual = Number(vivo(env)) || 0;
    const exSeg = env && env.exp ? Math.max(1, Math.round((env.exp - Date.now()) / 1000)) : 0;
    const w = await fetch(u, { method: 'PUT', body: JSON.stringify(envelope(atual + 1, exSeg)) });
    return w.ok ? w.json() : null;
  } catch {
    return null;
  }
}

async function msgsLista(limite) {
  const t = await authToken();
  const r = await fetch(`${DB}/msgs.json?auth=${t}`);
  const j = await r.json();
  const itens = j && typeof j === 'object' ? Object.entries(j) : [];
  itens.sort((a, b) => {
    const ta = a[1] && a[1].quando ? new Date(a[1].quando).getTime() : 0;
    const tb = b[1] && b[1].quando ? new Date(b[1].quando).getTime() : 0;
    return tb - ta;
  });
  return itens.slice(0, limite);
}

async function kvPipeline(cmds) {
  if (!DB) return [];
  const saida = [];
  for (const c of cmds) {
    const [op, chave, arg] = c;
    try {
      if (op === 'GET') {
        saida.push({ result: await kvGet(chave) });
      } else if (op === 'RPUSH') {
        const t = await authToken();
        const r = await fetch(`${DB}/${chave}.json?auth=${t}`, {
          method: 'POST',
          body: arg,
        });
        const j = await r.json();
        saida.push({ result: j && j.name });
      } else if (op === 'LTRIM') {
        const t = await authToken();
        const r = await fetch(`${DB}/msgs.json?auth=${t}`);
        const j = await r.json();
        const todas = j && typeof j === 'object' ? Object.entries(j) : [];
        todas.sort((a, b) => {
          const ta = a[1] && a[1].quando ? new Date(a[1].quando).getTime() : 0;
          const tb = b[1] && b[1].quando ? new Date(b[1].quando).getTime() : 0;
          return tb - ta;
        });
        for (const [id, _] of todas.slice(100)) {
          await fetch(`${DB}/msgs/${id}.json?auth=${t}`, { method: 'DELETE' });
        }
        saida.push({ result: 'OK' });
      } else if (op === 'LRANGE') {
        const itens = await msgsLista(100);
        saida.push({ result: itens.map(([id, v]) => JSON.stringify({ id, ...v })) });
      } else {
        saida.push({ result: null });
      }
    } catch {
      saida.push({ result: null });
    }
  }
  return saida;
}

async function kvMsgsVisto(id, visto) {
  if (!DB) return null;
  try {
    const t = await authToken();
    if (!t) return null;
    const r = await fetch(`${DB}/msgs/${id}.json?auth=${t}`, {
      method: 'PATCH',
      body: JSON.stringify({ visto: Boolean(visto) }),
    });
    return r.ok ? r.json() : null;
  } catch {
    return null;
  }
}

async function kvMsgsDel(id) {
  if (!DB) return null;
  try {
    const t = await authToken();
    if (!t) return null;
    const r = await fetch(`${DB}/msgs/${id}.json?auth=${t}`, { method: 'DELETE' });
    return r.ok ? r.json() : null;
  } catch {
    return null;
  }
}

module.exports = { kvGet, kvSet, kvDel, kvIncr, kvPipeline, kvMsgsVisto, kvMsgsDel };
