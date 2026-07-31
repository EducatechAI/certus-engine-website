const textoLimpo = `🟡 ESCENARIO SIMULADO / THREAT MODEL\n\n{"@context": "https://schema.org", "@type": "Article"}\n\n# ¿Cuál es la diferencia`;
const regex = /\{\s*"@context"[\s\S]*?\}(?=\s*(?:<\/script>|<\/?meta|<\/?link|(?:\\n|\n)+\s*#|🟡|🔵|🟢|$))/gi;
console.log('Original:');
console.log(textoLimpo);
console.log('Replaced:');
console.log(textoLimpo.replace(regex, ''));
