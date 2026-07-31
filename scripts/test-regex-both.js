const textoLimpo = `{"@context": "..."}\\n\\n\\n# Heading\\n\\n🟡 CENÁRIO SIMULADO / THREAT MODEL\\n\\nBody text body text body text...`;

let limpo = textoLimpo.replace(/\{\s*"@context"[\s\S]*?\}(?=\s*(?:<\/script>|<\/?meta|<\/?link|(?:\\n|\n)+\s*#|🟡|🔵|🟢|$))/gi, '');
limpo = limpo.replace(/🟡\s*(CENÁRIO|ESCENARIO|SIMULATED|SIMULADO)\s*(SIMULADO|SCENARIO|THREAT|MODEL)?.*/gi, '');

console.log("LIMPO:");
console.log(limpo);
