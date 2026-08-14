const { validateForm } = require('./validate.js');
const { kvPipeline } = require('../lib/kv.js');

function webhookUrl() {
  return process.env.DISCORD_WEBHOOK_URL || '';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Método não permitido.' });
    return;
  }

  if (!webhookUrl()) {
    res.status(500).json({ ok: false, error: 'Serviço indisponível.' });
    return;
  }

  let payload = req.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      res.status(400).json({ ok: false, error: 'JSON inválido.' });
      return;
    }
  }

  const result = validateForm(payload);
  if (!result.ok) {
    res.status(400).json({ ok: false, errors: result.errors });
    return;
  }

  const { data } = result;

  const message = [
    '**Novo contato pelo site**',
    `**Nome:** ${data.nome}`,
    `**Discord:** ${data.discord}`,
    data.whatsapp ? `**WhatsApp:** +${data.whatsapp}` : null,
    `**Elo atual:** ${data.elo}`,
    `**Servidor:** ${data.servidor}`,
    `**Experiência na jungle:** ${data.experiencia}`,
    data.campeoes ? `**Campeões:** ${data.campeoes}` : null,
    data.horas ? `**Horas/semana:** ${data.horas}` : null,
    `**Interesse:** ${data.interesse}`,
    data.origem ? `**Conheceu via:** ${data.origem}` : null,
    `**Objetivo:** ${data.objetivo}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const response = await fetch(webhookUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    });

    if (!response.ok) {
      throw new Error(`discord ${response.status}`);
    }

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
