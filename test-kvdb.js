import https from 'https';

const req = https.request({
  hostname: 'kvdb.io',
  path: '/',
  method: 'POST'
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Response:', body));
});
req.end();
