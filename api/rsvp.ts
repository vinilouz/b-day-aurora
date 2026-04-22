import { addRsvp } from '../db';

export function POST(request: Request) {
  try {
    const body = (request as unknown as { json: () => Promise<{ name?: string }> }).json().then;
    return body().then(({ name }: { name?: string }) => {
      if (!name || typeof name !== 'string') {
        return new Response(JSON.stringify({ error: 'Name is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      const rsvp = addRsvp(name);
      return new Response(JSON.stringify({ success: true, rsvp }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }).catch(() => {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}