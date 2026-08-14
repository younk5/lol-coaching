const { test } = require('node:test');
const assert = require('node:assert');

function mockRes() {
  const res = { statusCode: 0, body: null };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    res.body = body;
    if (!res.statusCode) res.statusCode = 200;
    return res;
  };
  return res;
}

function carregarHandler() {
  const chamadas = { visto: [], excluir: [] };
  const kvMock = {
    kvGet: async () => ({ ok: true }),
    kvMsgsVisto: async (id, visto) => {
      chamadas.visto.push({ id, visto });
      return null;
    },
    kvMsgsDel: async (id) => {
      chamadas.excluir.push(id);
      return null;
    },
  };
  delete require.cache[require.resolve('../../lib/kv.js')];
  require.cache[require.resolve('../../lib/kv.js')] = { exports: kvMock };
  delete require.cache[require.resolve('./msgs.js')];
  return { handler: require('./msgs.js'), chamadas };
}

test('rejeita método GET com 405', async () => {
  const { handler } = carregarHandler();
  const res = mockRes();
  await handler({ method: 'GET' }, res);
  assert.equal(res.statusCode, 405);
});

test('sem token → 401', async () => {
  const { handler } = carregarHandler();
  const res = mockRes();
  await handler({ method: 'POST', body: { id: 'x', acao: 'visto' } }, res);
  assert.equal(res.statusCode, 401);
});

test('sem id ou ação inválida → 400', async () => {
  const { handler } = carregarHandler();
  const res = mockRes();
  await handler({ method: 'POST', headers: { authorization: 'Bearer tok' }, body: { acao: 'visto' } }, res);
  assert.equal(res.statusCode, 400);
  const res2 = mockRes();
  await handler({ method: 'POST', headers: { authorization: 'Bearer tok' }, body: { id: 'x', acao: 'apagar' } }, res2);
  assert.equal(res2.statusCode, 400);
});

test('marcar como visto chama kvMsgsVisto com o valor certo', async () => {
  const { handler, chamadas } = carregarHandler();
  const res = mockRes();
  await handler({ method: 'POST', headers: { authorization: 'Bearer tok' }, body: { id: 'abc', acao: 'visto', visto: true } }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(chamadas.visto.length, 1);
  assert.equal(chamadas.visto[0].id, 'abc');
  assert.equal(chamadas.visto[0].visto, true);
});

test('excluir chama kvMsgsDel com o id certo', async () => {
  const { handler, chamadas } = carregarHandler();
  const res = mockRes();
  await handler({ method: 'POST', headers: { authorization: 'Bearer tok' }, body: { id: 'xyz', acao: 'excluir' } }, res);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(chamadas.excluir, ['xyz']);
});
