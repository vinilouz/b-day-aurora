import fs from 'fs';
const buf = fs.readFileSync('src/assets/1.png');
console.log("Local 1.png first 10 bytes:", buf.slice(0, 10).toString('hex'));
