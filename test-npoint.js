import https from 'https';

const data = JSON.stringify({ rsvps: [] });

const req = https.request({
  hostname: 'api.npoint.io',
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log('Status', res.statusCode);
    console.log('Headers', res.headers);
    console.log('Body', body);
  });
});
req.write(data);
req.end();
