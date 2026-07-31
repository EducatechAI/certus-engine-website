const fs = require('fs');

const content = fs.readFileSync('qwen_bug.txt', 'utf-8');
const regex = /\{\s*"@context"[\s\S]*?\}(?=\s*(?:<\/script>|<\/?meta|<\/?link|(?:\\n|\n)+\s*#|🟡|🔵|🟢|$))/gi;

let limpo = content.replace(regex, '');

console.log("Limpo:\n" + limpo);
