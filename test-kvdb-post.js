import https from 'https';

const bucket = 'EPL5AqGsaoqnxmggoVgLFk';
const data = JSON.stringify([{ id: 1, name: 'Test' }]);

const req = https.request({
  hostname: 'kvdb.io',
  path: `/${bucket}/rsvps`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
     console.log('Post response:', res.statusCode);
     // Now get it
     https.get(`https://kvdb.io/${bucket}/rsvps`, (resGet) => {
        let b2 = '';
        resGet.on('data', d => b2 += d);
        resGet.on('end', () => console.log('Get response:', b2));
     });
  });
});

req.write(data);
req.end();
