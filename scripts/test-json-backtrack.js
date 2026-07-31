const texto = `{"@context": "a", "author": {"name": "b"}, "about": "c"}\n\n# Heading`;
const regex = /\{\s*"@context"[\s\S]*?\}(?=\s*(?:<\/?script>|<\/?meta|<\/?link|(?:\\n|\n)+\s*#|🟡|🔵|🟢|$))/gi;
console.log(texto.match(regex));
