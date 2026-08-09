export async function postChat(message: string, history: Array<{ role: string; content: string }>) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history })
  });

  if (!response.ok) {
    throw new Error('Chat request failed');
  }

  return response.json() as Promise<{ reply: string }>;
}
