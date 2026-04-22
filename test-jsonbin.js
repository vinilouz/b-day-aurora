import https from 'https';

const data = JSON.stringify({ rsvps: [] });

const req = https.request({
  hostname: 'api.jsonbin.io',
  path: '/v3/b',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Bin-Private': 'false'
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Response:', body));
});

req.write(data);
req.end();
