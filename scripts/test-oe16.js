let textoLimpo = `
# Exemplo de monitoramento de integridade de log usando a suite Certus
import hashlib
def verify_log_integrity(log_entry, stored_hash):
current_hash = hashlib.sha256(log_entry.encode()).hexdigest()
if current_hash != stored_hash:
    return "ALERTA"
return "Logs validados"
# Verificação com latência de resposta
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
