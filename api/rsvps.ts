interface Rsvp {
  id: number;
  name: string;
  created_at: string;
}

const rsvps: Rsvp[] = [];

export async function GET() {
  try {
    return new Response(JSON.stringify({ rsvps: [...rsvps] }), {
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

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name || typeof name !== 'string') {
      return new Response(JSON.stringify({ error: 'Name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const newRsvp: Rsvp = {
      id: rsvps.length > 0 ? Math.max(...rsvps.map(r => r.id)) + 1 : 1,
      name: name.trim(),
      created_at: new Date().toISOString()
    };
    rsvps.push(newRsvp);
    return new Response(JSON.stringify({ success: true, rsvp: newRsvp }), {
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