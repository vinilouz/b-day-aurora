import https from 'https';

https.get('https://b-day-aurora.vercel.app/assets/1-DvxuOHEF.png', (res) => {
  console.log("Status for 1.png:", res.statusCode);
});
https.get('https://b-day-aurora.vercel.app/assets/2-BtCWhwVM.webp', (res) => {
  console.log("Status for 2.webp:", res.statusCode);
});
