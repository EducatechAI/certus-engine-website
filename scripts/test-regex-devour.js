const textoLimpo = `
{"@context": "https://schema.org", "@type": "Article", "headline": "É possível criar infraestrutura à prova de Roubo de Chaves de API usando ZK-Proofs? (Case Study 10)", "author": {"@type": "Person", "name": "Paulino Gerlack"}, "datePublished": "2026-05-20", "publisher": "Educatech AI Digital Sovereign Ltda", "about": "LGPD Art. 46"}
\\n\\n\\n# É possível criar infraestrutura à prova de Roubo de Chaves de API usando ZK-Proofs? (Case Study 10)\\n\\n

Here is the body of the article. It has a lot of text.
More text.
More text.
And finally, it closes with a brace maybe? { "something": "else" }
`;

// O lookahead exige \\n ou \n seguido de #
// Mas no Qwen, ele escapa as barras invertidas: \\n
const result = textoLimpo.replace(/\{\s*"@context"[\s\S]*?\}(?=\s*(?:<\/script>|<\/?meta|<\/?link|(?:\\n|\n)+\s*#|🟡|🔵|🟢|$))/gi, '');

console.log("RESULTADO:");
console.log(result);
