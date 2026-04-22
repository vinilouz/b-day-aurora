import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_FILE = '/tmp/rsvps.json';

interface Rsvp {
  id: number;
  name: string;
  created_at: string;
}

function readData(): Rsvp[] {
  try {
    if (existsSync(DATA_FILE)) {
      return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch {
    // ignore
  }
  return [];
}

function writeData(data: Rsvp[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export function getRsvps(): Rsvp[] {
  return readData();
}

export function addRsvp(name: string): Rsvp {
  const data = readData();
  const newRsvp: Rsvp = {
    id: data.length > 0 ? Math.max(...data.map(r => r.id)) + 1 : 1,
    name: name.trim(),
    created_at: new Date().toISOString()
  };
  data.push(newRsvp);
  writeData(data);
  return newRsvp;
}