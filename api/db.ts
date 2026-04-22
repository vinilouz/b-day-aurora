interface Rsvp {
  id: number;
  name: string;
  created_at: string;
}

const rsvps: Rsvp[] = [];

export function getRsvps(): Rsvp[] {
  return [...rsvps];
}

export function addRsvp(name: string): Rsvp {
  const newRsvp: Rsvp = {
    id: rsvps.length > 0 ? Math.max(...rsvps.map(r => r.id)) + 1 : 1,
    name: name.trim(),
    created_at: new Date().toISOString()
  };
  rsvps.push(newRsvp);
  return newRsvp;
}