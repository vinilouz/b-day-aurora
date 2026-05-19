import https from 'https';

const data = JSON.stringify([]);

const options = {
  hostname: 'jsonblob.com',
  path: '/api/jsonBlob',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'Accept': 'application/json'
  }
};

const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  if (res.headers.location) {
    console.log('Location:', res.headers.location);
  }
});

req.on('error', (e) => {
  console.error(e);
});

req.write(data);
req.end();
