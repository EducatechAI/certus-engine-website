const textoLimpo = `\\n\`\`\`json\\n{"@context": "https://schema.org", "@type": "Article", "headline": "How to audit, in court, a Smart Contract Exploits incident under GDPR (Europe)? (Case Study 6)", "author": {"@type": "Person", "name": "Paulino Gerlack"}, "datePublished": "2026-05-15", "publisher": {"@type": "Organization", "name": "Educatech AI Digital Sovereign Ltda"}, "about": "GDPR Article 32: Security of processing"}\\n\`\`\`\\n\\n# How to audit, in court, a Smart Contract Exploits incident under GDPR (Europe)? (Case Study 6)\\n\\nIn the landscape of 2026 healthcare informatics`;

const regex1 = /\{\s*"@context"[\s\S]*?\}(?=(?:\\n|\n|\s)*(?:<\/script>|<\/?meta|<\/?link|#|🟡|🔵|🟢|$))/gi;
console.log("Original regex match:", !!textoLimpo.match(regex1));
if (textoLimpo.match(regex1)) {
    console.log("Replaced:", textoLimpo.replace(regex1, ''));
}

const regex2 = /(?:\\n|\n|\s|`)*(?:json)?(?:\\n|\n|\s)*\{\s*"@context"[\s\S]*?\}(?:\\n|\n|\s|`)*(?=(?:<\/script>|<\/?meta|<\/?link|#|🟡|🔵|🟢|$))/gi;
console.log("New regex match:", !!textoLimpo.match(regex2));
if (textoLimpo.match(regex2)) {
    console.log("Replaced:", textoLimpo.replace(regex2, ''));
}
