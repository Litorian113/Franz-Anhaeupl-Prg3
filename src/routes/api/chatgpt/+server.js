import { OPENAI_API_KEY } from '$env/static/private';

// Hier z.B. Fetch zu ChatGPT
export async function POST({ request }) {
  const body = await request.json();

  const chatgptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: body.messages
    })
  });

  const data = await chatgptResponse.json();
  return new Response(JSON.stringify(data), {
    status: 200
  });
}
