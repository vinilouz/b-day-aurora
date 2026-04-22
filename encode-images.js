import fs from 'fs';

const img1 = fs.readFileSync('src/assets/1.png').toString('base64');
const img2 = fs.readFileSync('src/assets/2.webp').toString('base64');

const content = `// Auto-generated file to bypass binary corruption on Github Sync
export const imgTopCharacters = "data:image/png;base64,${img1}";
export const imgBottomPlates = "data:image/webp;base64,${img2}";
`;

fs.writeFileSync('src/assets/images.ts', content);
console.log('Images converted to base64 successfully.');
