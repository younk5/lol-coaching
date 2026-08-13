// api/contact.handler.test.js — testes do handler completo (sem rede real)
// Rode com: node --test api/contact.handler.test.js

const { test } = require('node:test');
const assert = require('node:assert');

const handler = require('./contact.js');

function mockRes() {
  const res = { statusCode: 0, body: null };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    res.body = body;
    return res;
  };
  return res;
}

const VALIDO = {
  nome: 'João',
  elo: 'ouro',
  objetivo: 'Subir para platina',
  servidor: 'br',
  experiencia: 'intermediario',
};

test('rejeita método GET com 405', async () => {
  const res = mockRes();
  await handler({ method: 'GET' }, res);
  assert.equal(res.statusCode, 405);
});

test('sem webhook configurado → 500 sem vazar detalhes', async () => {
  delete process.env.DISCORD_WEBHOOK_URL;
  const res = mockRes();
  await handler({ method: 'POST', body: VALIDO }, res);
  assert.equal(res.statusCode, 500);
  assert.equal(res.body.error, 'Serviço indisponível.');
});

test('JSON inválido → 400', async () => {
  process.env.DISCORD_WEBHOOK_URL = 'https://exemplo.invalido';
  const res = mockRes();
  await handler({ method: 'POST', body: '{{{nao-json' }, res);
  assert.equal(res.statusCode, 400);
});

test('payload inválido → 400 com erros por campo', async () => {
  process.env.DISCORD_WEBHOOK_URL = 'https://exemplo.invalido';
  const res = mockRes();
  await handler({ method: 'POST', body: { nome: 'X' } }, res);
  assert.equal(res.statusCode, 400);
  assert.ok(res.body.errors.nome);
  assert.ok(res.body.errors.elo);
});

test('payload válido → 200 e mensagem montada (fetch simulado)', async () => {
  process.env.DISCORD_WEBHOOK_URL = 'https://discord.invalido/webhook';
  let captured = null;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    captured = { url, body: JSON.parse(opts.body) };
    return { ok: true };
  };
  try {
    const res = mockRes();
    await handler({ method: 'POST', body: JSON.stringify(VALIDO) }, res);
    assert.equal(res.statusCode, 200);
    assert.equal(captured.url, 'https://discord.invalido/webhook');
    assert.ok(captured.body.content.includes('João'));
    assert.ok(captured.body.content.includes('ouro'));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('webhook recusou → 502', async () => {
  process.env.DISCORD_WEBHOOK_URL = 'https://discord.invalido/webhook';
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: false });
  try {
    const res = mockRes();
    await handler({ method: 'POST', body: VALIDO }, res);
    assert.equal(res.statusCode, 502);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
