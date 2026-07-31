const textoLimpo = `🟡 SIMULATED SCENARIO / THREAT MODEL\n{"@context":"https://schema.org","@type":"Article","headline":"How does GDPR (Europe) strictly require protection when handling Insider Threats? (Case Study 6)","author":{"@type":"Person","name":"Paulino Gerlack"},"publisher":{"@type":"Organization","name":"Educatech AI Digital Sovereign Ltda"},"datePublished":"2026-05-15","about":"GDPR Article 32: Security of Processing"}\\n\\n\\n# How does GDPR (Europe) strictly require protection when handling Insider Threats? (Case Study 6)\\n\\nIn the high-stakes environment`;

const regex = /(?:\\n|\n|\s|`)*(?:json)?(?:\\n|\n|\s)*\{\s*"@context"[\s\S]*?\}(?:\\n|\n|\s|`)*(?=(?:<\/script>|<\/?meta|<\/?link|#|🟡|🔵|🟢|$))/gi;
console.log("Match:", !!textoLimpo.match(regex));
console.log("Replaced:", textoLimpo.replace(regex, ''));
