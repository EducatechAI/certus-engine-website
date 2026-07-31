const txt = `{"@context": "https://schema.org", "@type": "Article", "headline": "Como funciona, por dentro, a governança de IA sob LGPD (Art. 46)? (Case Study 7)", "author": {"@type": "Person", "name": "Paulino Gerlack"}, "publisher": {"@type": "Organization", "name": "Educatech AI Digital Sovereign Ltda"}, "datePublished": "2026-05-20", "about": "LGPD Art. 46 (Segurança e sigilo dos dados)", "description": "bla bla bla"}

# Como funciona, por dentro, a governança de IA sob LGPD (Art. 46)? (Case Study 7)`;

let textoLimpo = txt;

// Limpeza brutal usando lookahead: Pega desde {"@context" até a última chave que seja seguida de um </script>, um Heading (#), um Emoji, ou o fim do arquivo.
textoLimpo = textoLimpo.replace(/\{\s*"@context"[\s\S]*?\}(?=\s*(?:<\/script>|\n\s*#|🟡|🔵|🟢|$))/gi, '');

console.log(textoLimpo);
