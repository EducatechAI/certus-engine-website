const textoLimpo = `\\n{"@context": "https://schema.org", "@type": "Article", "headline": "Title"}\\n\\n🟡 ESCENARIO SIMULADO / THREAT MODEL\\n\\n# ¿Cuál es la diferencia`;

const regex = /\{\s*"@context"[\s\S]*?\}(?=(?:\\n|\n|\s)*(?:#|🟡|🔵|🟢|<\/?script>|<\/?meta>|<\/?link>|$))/gi;
console.log("MATCH:", textoLimpo.match(regex));
console.log("REPLACED:", textoLimpo.replace(regex, ''));
