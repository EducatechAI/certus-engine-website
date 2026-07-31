const fs = require('fs');
const db = JSON.parse(fs.readFileSync('C:\\Users\\pauli\\OneDrive\\Documentos\\Google Antigravity\\certus-engine-website\\src\\data\\seeds.json', 'utf8'));
const art = db.find(a => String(a.id) === '142');
if (art) {
    console.log("Found article 142!");
    console.log("Status:", art.status);
    console.log("Content:", art.contentMarkdown.substring(0, 300));
    console.log("Date:", art.forgeMeta ? art.forgeMeta.data_geracao : 'unknown');
} else {
    console.log("Article 142 not found.");
}
