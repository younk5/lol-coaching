// lib/kv.js — acesso ao Vercel KV (banco chave-valor da própria Vercel)
// As variáveis KV_REST_API_URL e KV_REST_API_TOKEN são injetadas
// automaticamente quando o storage é conectado ao projeto.
// Sem storage conectado, as funções viram no-op (nada quebra).

const BASE = process.env.KV_REST_API_URL || '';
const TOKEN = process.env.KV_REST_API_TOKEN || '';

function headers() {
  return { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };
}

// GET de uma chave (retorna null se não existir ou sem storage)
async function kvGet(key) {
  if (!BASE) return null;
  const r = await fetch(`${BASE}/get/${encodeURIComponent(key)}`, { headers: headers() });
  const j = await r.json();
  return j.result;
}

// SET com expiração em segundos
async function kvSet(key, value, ex) {
  if (!BASE) return null;
  const r = await fetch(`${BASE}/set/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ value, ex }),
  });
  return r.json();
}

// DELETE de uma chave
async function kvDel(key) {
  if (!BASE) return null;
  const r = await fetch(`${BASE}/del/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: headers(),
  });
  return r.json();
}

// INCR (incrementa 1) — usado nos contadores de cliques
async function kvIncr(key) {
  if (!BASE) return null;
  const r = await fetch(`${BASE}/incr/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: headers(),
  });
  return r.json();
}

// Vários comandos de uma vez (ex.: pegar todos os contadores)
async function kvPipeline(cmds) {
  if (!BASE) return null;
  const r = await fetch(`${BASE}/pipeline`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(cmds),
  });
  return r.json();
}

module.exports = { kvGet, kvSet, kvDel, kvIncr, kvPipeline };
