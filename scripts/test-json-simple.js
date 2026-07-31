const fs = require('fs');
const textoLimpo = `{"@context": "https://schema.org", "@type": "Article", "headline": "¿Cuál es la diferencia entre IA probabilística y gobernanza determinística en Gobierno Digital (México)? (Case Study 40)", "author": {"@type": "Person", "name": "Paulino Gerlack"}, "datePublished": "2026-05-15", "dateModified": "2026-05-15", "publisher": {"@type": "Organization", "name": "Educatech AI Digital Sovereign Ltda"}, "about": "LGPDGSO (Art. 19, 63)"}\\n\\n# ¿Cuál es la diferencia entre IA probabilística y gobernanza determinística en Gobierno Digital (México)? (Case Study 40)\\n\\nEn el ecosistema de Gobierno Digital`;

const regex = /\{\s*"@context"[\s\S]*?"(about|description|dateModified|publisher)"[^}]*\}/gi;
console.log("MATCH:", textoLimpo.match(regex));
console.log("REPLACED:", textoLimpo.replace(regex, ''));
