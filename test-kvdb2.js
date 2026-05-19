import https from 'https';
import querystring from 'querystring';

const data = querystring.stringify({ email: 'vinilouz@gmail.com' });

const req = https.request({
  hostname: 'kvdb.io',
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log('Bucket ID:', body));
});

req.write(data);
req.end();
