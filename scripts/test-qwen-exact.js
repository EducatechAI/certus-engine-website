const str = `{"@context": "https://schema.org", "@type": "Article", "headline": "É possível criar infraestrutura à prova de Roubo de Chaves de API usando ZK-Proofs? (Case Study 10)", "author": {"@type": "Person", "name": "Paulino Gerlack"}, "datePublished": "2026-05-20", "publisher": "Educatech AI Digital Sovereign Ltda", "about": "LGPD Art. 46"}\\n\\n\\n# É possível criar infraestrutura à prova de Roubo de Chaves de API usando ZK-Proofs? (Case Study 10)\\n\\n`;

let res = str.replace(/\{\s*"@context"[\s\S]*?\}(?=\s*(?:<\/script>|<\/?meta|<\/?link|(?:\\n|\n)+\s*#|🟡|🔵|🟢|$))/gi, '');
console.log("TESTE DB:");
console.log(res);

console.log("LENGTH OF ORIGINAL:", str.length);
