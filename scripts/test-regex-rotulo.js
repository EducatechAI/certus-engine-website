const textoLimpo = `{"@context": "..."}\\n\\n\\n# Heading\\n\\n🟡 CENÁRIO SIMULADO / THREAT MODEL\\n\\nBody text body text body text...`;

// 3. ANIQUILAR TODAS as ocorrências dos rótulos
let limpo = textoLimpo.replace(/🟡\s*(CENÁRIO|ESCENARIO|SIMULATED|SIMULADO)\s*(SIMULADO|SCENARIO|THREAT|MODEL)?.*/gi, '');

console.log("LIMPO:");
console.log(limpo);
