import { Redis } from '@upstash/redis';

// Fallback to Vercel's legacy KV variables just in case
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

// Initialize explicitly if available
const redis = (redisUrl && redisToken) 
  ? new Redis({ url: redisUrl, token: redisToken })
  : null;

export default async function handler(req, res) {
  // Verificação para o usuário
  if (!redis) {
    return res.status(500).json({ 
      error: 'STORAGE_NOT_CONFIGURED',
      message: 'Configure o banco de dados clicando em "Redis" na aba Storage.' 
    });
  }

  if (req.method === 'GET') {
    try {
      const rsvps = await redis.get('rsvps') || [];
      return res.status(200).json(rsvps);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name } = req.body || {};
      if (!name) return res.status(400).json({ error: 'Name is required' });

      const rsvps = await redis.get('rsvps') || [];
      const newRsvp = {
        id: Date.now(),
        name,
        created_at: new Date().toISOString()
      };
      
      rsvps.push(newRsvp);
      await redis.set('rsvps', rsvps);
      
      return res.status(200).json(newRsvp);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  if (req.method === 'DELETE') {
    try {
      const { name } = req.body || {};
      if (!name) return res.status(400).json({ error: 'Name is required' });

      let rsvps = await redis.get('rsvps') || [];
      rsvps = rsvps.filter(r => r.name.toLowerCase().trim() !== name.toLowerCase().trim());
      await redis.set('rsvps', rsvps);
      
      return res.status(200).json({ success: true, name });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
