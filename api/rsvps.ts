import { getRsvps } from '../db';

export function GET() {
  try {
    const rsvps = getRsvps();
    return new Response(JSON.stringify({ rsvps }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to fetch RSVPs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}