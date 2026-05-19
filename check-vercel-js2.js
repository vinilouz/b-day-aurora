import https from 'https';

https.get('https://b-day-aurora.vercel.app/assets/index-COUs0G4K.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/assets\/[a-zA-Z0-9_\-]+\.(png|webp|jpg|jpeg)/g);
    console.log("Images found in NEW JS bundle:", matches);
  });
});
