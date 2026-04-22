import https from 'https';
import fs from 'fs';

https.get('https://b-day-aurora.vercel.app/assets/1-DvxuOHEF.png', (res) => {
  let size = 0;
  res.on('data', chunk => size += chunk.length);
  res.on('end', () => console.log('Downloaded Vercel 1.png size:', size));
});
