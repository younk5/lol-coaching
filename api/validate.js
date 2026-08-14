const ELOS = ['ferro', 'bronze', 'prata', 'ouro', 'platina', 'diamante', 'mestre', 'grao-mestre', 'desafiante', 'nunca'];
const SERVERS = ['br', 'lan', 'las', 'na', 'euw', 'outro'];
const EXPERIENCIA = ['nunca', 'iniciante', 'intermediario', 'avancado'];

function clean(value) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function validateForm(payload) {
  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    return { ok: false, errors: { _: 'Payload inválido.' } };
  }

  const errors = {};
  const data = {};

  data.nome = clean(payload.nome);
  if (data.nome.length < 2 || data.nome.length > 80) {
    errors.nome = 'Nome deve ter entre 2 e 80 caracteres.';
  }

  data.elo = clean(payload.elo);
  if (!ELOS.includes(data.elo)) {
    errors.elo = 'Elo inválido.';
  }

  data.objetivo = clean(payload.objetivo);
  if (data.objetivo.length < 2 || data.objetivo.length > 300) {
    errors.objetivo = 'Objetivo deve ter entre 2 e 300 caracteres.';
  }

  data.servidor = clean(payload.servidor);
  if (!SERVERS.includes(data.servidor)) {
    errors.servidor = 'Servidor inválido.';
  }

  data.experiencia = clean(payload.experiencia);
  if (!EXPERIENCIA.includes(data.experiencia)) {
    errors.experiencia = 'Experiência inválida.';
  }

  if (Object.keys(errors).length) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}

module.exports = { validateForm, ELOS, SERVERS, EXPERIENCIA };
