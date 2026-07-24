import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (path: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.next' || f === '.git') return;
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const targetExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md'];
const searchStr = 'certusengine.ia.br';
const replaceStr = 'certusengine.ia.br';

walkDir(__dirname, (filePath) => {
  const ext = path.extname(filePath);
  if (targetExtensions.includes(ext)) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content.includes(searchStr)) {
        const newContent = content.split(searchStr).join(replaceStr);
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Updated: ${filePath}`);
      }
    } catch (e) {
      // ignore read errors for binaries or unreadable files
    }
  }
});

console.log('Domain replacement complete!');
