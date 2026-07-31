let textoLimpo = `
Here is the code:
\`\`\`bash
# Exemplo de monitoramento
import hashlib
\`\`\`
More text here.
`;

textoLimpo = textoLimpo.replace(/((?:^|\n)(?:bash|python|powershell|javascript|json|sql|#\s[^\n]*|\.[\/\\][^\n]*|def\s[^\n]*|import\s[^\n]*|certus[^\n]*|lazarus[^\n]*|wolfdog[^\n]*){1,})/gm, (match) => {
    if (match.includes('\`\`\`')) return match;
    
    // Se parece código, envelopa
    if (match.trim().length > 10) {
      return `\n\`\`\`bash\n${match.trim()}\n\`\`\`\n`;
    }
    return match;
});

console.log(textoLimpo);
