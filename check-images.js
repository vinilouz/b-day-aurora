import https from 'https';

https.get('https://b-day-aurora.vercel.app/1.png', (res) => {
  console.log('Status code for /1.png:', res.statusCode);
});
https.get('https://b-day-aurora.vercel.app/assets/1.png', (res) => {
  console.log('Status code for /assets/1.png:', res.statusCode);
});
