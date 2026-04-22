import { getRsvps } from '../db';

export async function GET() {
  try {
    const rsvps = getRsvps();
    return new Response(JSON.stringify({ rsvps }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to fetch RSVPs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}