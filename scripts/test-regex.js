const txt = `{"@context": "https://schema.org", "@type": "Article", "headline": "Como podemos provar conformidade com LGPD (Art. 46) sem expor dados sensíveis?", "author": {"@type": "Person", "name": "Paulino Gerlack"}, "publisher": {"@type": "Organization", "name": "Educatech AI Digital Sovereign Ltda"}, "datePublished": "2026-05-22", "about": "LGPD Artigo 46"}</script>

# Como podemos provar conformidade com LGPD (Art. 46) sem expor dados sensíveis?
🟡 CENÁRIO SIMULADO / THREAT MODEL

A segurança da informação no setor público municipal enfrenta um desafio paradoxal: a exigência de transparência na gestão versus a proteção rigorosa de dados pessoais.`;

let textoLimpo = txt;

// Limpeza garantida de JSON-LD alucinado fechando no script tag
textoLimpo = textoLimpo.replace(/\{[\s\S]*?"@context"[\s\S]*?<\/script>/gi, '');

// Se ainda sobrar script ou outras tags HTML
textoLimpo = textoLimpo.replace(/<\/?(script|meta|link|style)[^>]*>/gi, '');

// Rótulos
textoLimpo = textoLimpo.replace(/[^\n]*[🟡🔵🟢][^\n]*/gi, '');

console.log(textoLimpo);
