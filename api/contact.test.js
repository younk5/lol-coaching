// api/contact.test.js — testes da validação do formulário (node --test)
// Rode com: node --test api/contact.test.js

const { test } = require('node:test');
const assert = require('node:assert');

const { validateForm } = require('./validate.js');

const VALIDO = {
  nome: 'João do Main',
  elo: 'ouro',
  objetivo: 'Subir para platina jogando de jungle',
  servidor: 'br',
  experiencia: 'intermediario',
};

test('aceita payload válido e retorna dados limpos', () => {
  const r = validateForm(VALIDO);
  assert.equal(r.ok, true);
  assert.equal(r.data.nome, 'João do Main');
  assert.equal(r.data.elo, 'ouro');
});

test('rejeita nome curto demais', () => {
  const r = validateForm({ ...VALIDO, nome: 'A' });
  assert.equal(r.ok, false);
  assert.ok(r.errors.nome);
});

test('rejeita nome longo demais', () => {
  const r = validateForm({ ...VALIDO, nome: 'x'.repeat(81) });
  assert.equal(r.ok, false);
  assert.ok(r.errors.nome);
});

test('rejeita elo fora da whitelist', () => {
  const r = validateForm({ ...VALIDO, elo: 'challenger-master-plus' });
  assert.equal(r.ok, false);
  assert.ok(r.errors.elo);
});

test('rejeita servidor fora da whitelist', () => {
  const r = validateForm({ ...VALIDO, servidor: 'oceania' });
  assert.equal(r.ok, false);
  assert.ok(r.errors.servidor);
});

test('rejeita experiência fora da whitelist', () => {
  const r = validateForm({ ...VALIDO, experiencia: 'deus-da-jg' });
  assert.equal(r.ok, false);
  assert.ok(r.errors.experiencia);
});

test('rejeita objetivo vazio', () => {
  const r = validateForm({ ...VALIDO, objetivo: '   ' });
  assert.equal(r.ok, false);
  assert.ok(r.errors.objetivo);
});

test('sanitiza caracteres de controle e espaços duplicados', () => {
  const r = validateForm({ ...VALIDO, nome: 'Jo\u0000ão\n  do  Main' });
  assert.equal(r.ok, true);
  assert.equal(r.data.nome, 'João do Main');
});

test('rejeita payload não-objeto (null, array, string)', () => {
  assert.equal(validateForm(null).ok, false);
  assert.equal(validateForm([1, 2]).ok, false);
  assert.equal(validateForm('texto').ok, false);
  assert.equal(validateForm(undefined).ok, false);
});

test('ignora campos desconhecidos sem quebrar', () => {
  const r = validateForm({ ...VALIDO, hacker: 'payload', admin: true });
  assert.equal(r.ok, true);
  assert.equal(r.data.hacker, undefined);
});

test('aceita todos os elos da lista oficial', () => {
  const elos = ['ferro', 'bronze', 'prata', 'ouro', 'platina', 'diamante', 'mestre', 'grao-mestre', 'desafiante', 'nunca'];
  for (const elo of elos) {
    const r = validateForm({ ...VALIDO, elo });
    assert.equal(r.ok, true, `elo ${elo} deveria passar`);
  }
});
