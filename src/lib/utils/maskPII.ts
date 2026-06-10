export function maskPII(name: string | null | undefined): string {
  if (!name) return '***';
  
  // Exemplo: "Prefeitura de Xinguara-PA" -> "Prefeitura de ***-PA"
  // Exemplo genérico: mostra os primeiros 14 chars, esconde o meio, mostra os últimos 3.
  const lower = name.toLowerCase();
  
  if (lower.includes('prefeitura de')) {
    const parts = name.split('-');
    if (parts.length > 1) {
      return `Prefeitura de ***-${parts[parts.length - 1]}`;
    }
  }

  if (name.length <= 6) return '***';

  const firstPart = name.substring(0, 4);
  const lastPart = name.substring(name.length - 3);
  
  return `${firstPart}***${lastPart}`;
}
