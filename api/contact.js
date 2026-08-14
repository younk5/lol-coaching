// api/contact.js — função serverless da Vercel
// Recebe o formulário, valida DE NOVO no servidor e envia ao Discord.
// O webhook vive SOMENTE na variável de ambiente DISCORD_WEBHOOK_URL
// (configurada no painel da Vercel) — nunca aparece no frontend.

const { validateForm } = require('./validate.js');
const { kvPipeline } = require('../lib/kv.js');

// Lê a variável de ambiente no momento da chamada (mais seguro e testável)
function webhookUrl() {
  return process.env.DISCORD_WEBHOOK_URL || '';
}

module.exports = async function handler(req, res) {
  // Apenas POST
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Método não permitido.' });
    return;
  }

  // Sem webhook configurado: recusa educadamente (nunca vaza o erro real)
  if (!webhookUrl()) {
    res.status(500).json({ ok: false, error: 'Serviço indisponível.' });
    return;
  }

  // Corpo pode chegar como string ou já parseado (depende do runtime)
  let payload = req.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      res.status(400).json({ ok: false, error: 'JSON inválido.' });
      return;
    }
  }

  // Validação server-side (nunca confiar apenas no navegador)
  const result = validateForm(payload);
  if (!result.ok) {
    res.status(400).json({ ok: false, errors: result.errors });
    return;
  }

  const { data } = result;

  const message = [
    '**Novo contato pelo site**',
    `**Nome:** ${data.nome}`,
    `**Elo atual:** ${data.elo}`,
    `**Objetivo:** ${data.objetivo}`,
    `**Servidor:** ${data.servidor}`,
    `**Experiência na jungle:** ${data.experiencia}`,
  ].join('\n');

  try {
    const response = await fetch(webhookUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    });

    if (!response.ok) {
      throw new Error(`discord ${response.status}`);
    }

    // Guarda a mensagem no KV para aparecer na área do admin.
    // Se o KV falhar, o envio ao Discord já aconteceu — segue normal.
    try {
      await kvPipeline([
        ['RPUSH', 'msgs', JSON.stringify({ quando: new Date().toISOString(), ...data })],
        ['LTRIM', 'msgs', '-100', '-1'],
      ]);
    } catch {}

    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ ok: false, error: 'Não foi possível enviar a mensagem.' });
  }
};
