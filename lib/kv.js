const BASE =
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.REDIS_REST_API_URL ||
  '';
const TOKEN =
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.REDIS_REST_API_TOKEN ||
  '';

function headers() {
  return { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };
}

async function kvGet(key) {
  if (!BASE) return null;
  const r = await fetch(`${BASE}/get/${encodeURIComponent(key)}`, { headers: headers() });
  const j = await r.json();
  return j.result;
}

async function kvSet(key, value, ex) {
  if (!BASE) return null;
  const r = await fetch(`${BASE}/set/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ value, ex }),
  });
  return r.json();
}

async function kvDel(key) {
  if (!BASE) return null;
  const r = await fetch(`${BASE}/del/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: headers(),
  });
  return r.json();
}

async function kvIncr(key) {
  if (!BASE) return null;
  const r = await fetch(`${BASE}/incr/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: headers(),
  });
  return r.json();
}

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
