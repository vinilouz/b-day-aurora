import fs from 'fs';

console.log(fs.statSync('src/assets/1.png').size);
console.log(fs.statSync('src/assets/2.webp').size);
