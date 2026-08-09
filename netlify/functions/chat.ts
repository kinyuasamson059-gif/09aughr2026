import type { Handler } from '@netlify/functions';
import { AzureOpenAI } from '@azure/openai';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message, history = [] } = JSON.parse(event.body || '{}');
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

    if (!endpoint || !apiKey || !deployment) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: 'I can help with leave balances, payroll timing, benefits, and company policies. For example, ask me about upcoming paydays or time-off rules.' })
      };
    }

    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion: '2024-10-21' });
    const messages = [
      { role: 'system', content: 'You are an HR assistant for leave, payroll, benefits, and policies. Keep responses helpful and concise. Politely redirect off-topic questions back to HR topics.' },
      ...history
        .filter((entry: any) => entry && entry.content)
        .map((entry: any) => ({ role: entry.role === 'user' ? 'user' : 'assistant', content: entry.content })),
      { role: 'user', content: message }
    ];

    const response = await client.chat.completions.create({
      model: deployment,
      messages,
      temperature: 0.6
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.choices?.[0]?.message?.content || 'I can help with HR topics like leave, payroll, and policies.' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: 'The Azure assistant is unavailable right now. Please try again later.' })
    };
  }
};
