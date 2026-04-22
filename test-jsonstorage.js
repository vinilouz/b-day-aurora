import https from 'https';

const data = JSON.stringify({ rsvps: [] });

const req = https.request({
  hostname: 'api.jsonstorage.net',
  path: '/v1/json',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Response:', body));
});
req.write(data);
req.end();
