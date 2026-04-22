import { addRsvp } from '../db';

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name || typeof name !== 'string') {
      return new Response(JSON.stringify({ error: 'Name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const rsvp = addRsvp(name.trim());
    return new Response(JSON.stringify({ success: true, rsvp }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}