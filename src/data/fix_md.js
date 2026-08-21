const fs = require('fs');
const path = require('path');

const seedsPath = path.join(__dirname, 'seeds.json');
let seeds = JSON.parse(fs.readFileSync(seedsPath, 'utf8'));

for (let i = seeds.length - 5; i < seeds.length; i++) {
    const seed = seeds[i];
    
    // Find the first occurrence of "---" which separates the headers from the body
    let md = seed.contentMarkdown;
    const splitIndex = md.indexOf('---');
    
    if (splitIndex !== -1 && !md.startsWith('```html')) {
        // Extract the head part (which is raw HTML)
        const head = md.substring(0, splitIndex).trim();
        const body = md.substring(splitIndex);
        
        // Wrap the head in an html code block
        seed.contentMarkdown = `\`\`\`html\n${head}\n\`\`\`\n\n${body}`;
    }
}

fs.writeFileSync(seedsPath, JSON.stringify(seeds, null, 2), 'utf8');
console.log('Fixed markdown formatting in the last 5 articles!');
