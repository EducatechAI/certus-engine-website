const txt = `{"@context": "https://schema.org", "@type": "Article", "headline": "Qual a diferença entre IA probabilística e governança determinística em Prefeituras?", "author": {"@type": "Person", "name": "Paulino Gerlack"}, "publisher": {"@type": "Organization", "name": "Educatech AI Digital Sovereign Ltda"}, "about": "LGPD Art. 46"}\\n\\n# Qual a diferença entre IA probabilística e governança determinística em Prefeituras?\\n\\n`;

let textoLimpo = txt;

let testeCorrigido = textoLimpo.replace(/\{\s*"@context"[\s\S]*?\}(?=\s*(?:<\/script>|<\/?meta|<\/?link|(?:\\n|\n)+\s*#|🟡|🔵|🟢|$))/gi, '');
console.log("Teste Corrigido (Aceita literal \\n):");
console.log(testeCorrigido);
