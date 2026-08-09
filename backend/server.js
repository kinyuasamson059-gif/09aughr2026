const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { AzureOpenAI } = require('@azure/openai');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message, history = [] } = req.body;
  const systemPrompt = 'You are an HR assistant for leave, payroll, benefits, and policies. Keep responses helpful and concise. Politely redirect off-topic questions back to HR topics.';

  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

  if (!endpoint || !apiKey || !deployment) {
    res.json({ reply: 'I can help with leave balances, payroll timing, benefits, and company policies. For example, ask me about upcoming paydays or time-off rules.' });
    return;
  }

  try {
    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion: '2024-10-21' });
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history
        .filter((entry) => entry && entry.content)
        .map((entry) => ({ role: entry.role === 'user' ? 'user' : 'assistant', content: entry.content })),
      { role: 'user', content: message }
    ];

    const response = await client.chat.completions.create({
      model: deployment,
      messages,
      temperature: 0.6
    });

    const reply = response.choices?.[0]?.message?.content || 'I can help with HR topics like leave, payroll, and policies.';
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: 'The Azure assistant is unavailable right now. Please try again later.' });
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
