import https from 'https';

https.get('https://b-day-aurora.vercel.app/assets/1-DvxuOHEF.png', (res) => {
  let chunks = [];
  res.on('data', chunk => chunks.push(chunk));
  res.on('end', () => {
    let buf = Buffer.concat(chunks);
    console.log("First 10 bytes hex:");
    console.log(buf.slice(0, 10).toString('hex'));
    console.log("String representation of first 50 bytes (in case it is text):", buf.slice(0, 50).toString());
  });
});
