// src/lib/canonical.ts
export const SITE_ORIGIN = 'https://certusengine.ia.br';

export type Lang = 'pt' | 'es' | 'en';
export type Assunto = 'soberana' | 'latam' | 'global';

// Consistência esperada (Fail-Closed): cada locale tem UM assunto certo.
export const EXPECTED_ASSUNTO_BY_LOCALE: Record<Lang, Assunto> = {
  pt: 'soberana',
  es: 'latam',
  en: 'global',
};

/** Canonical auto-referente = URL real publicada. */
export function buildCanonicalUrl(locale: Lang, assunto: Assunto, slug: string): string {
  return `${SITE_ORIGIN}/${locale}/${assunto}/${slug}`;
}

/** Injeta url + mainEntityOfPage no JSON-LD, preservando os campos originais. */
export function buildArticleJsonLd(
  existing: Record<string, unknown>,
  canonicalUrl: string,
): Record<string, unknown> {
  return {
    ...existing,
    '@id': `${canonicalUrl}#article`,
    url: canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
  };
}

/** Isola só o CORPO (remove canonical + JSON-LD) para validar integridade byte a byte. */
export function bodyOnly(content: string): string {
  return content
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, '')
    .trim();
}

/**
 * Função cirúrgica reutilizável: sobrescreve APENAS canonical + JSON-LD.
 * Usada tanto pelo fix-canonical (219) quanto pelo forge-writer (futuros).
 */
export function normalizeHeaders(
  contentMarkdown: string,
  locale: Lang,
  assunto: Assunto,
  slug: string,
): { content: string; changed: boolean; oldCanonical: string | null; newCanonical: string; prependedCanonical: boolean } {
  const newCanonical = buildCanonicalUrl(locale, assunto, slug);

  // 1) Canonical
  const canonMatch = contentMarkdown.match(/<link rel="canonical" href="([^"]*)"\s*\/?>/);
  const oldCanonical = canonMatch ? canonMatch[1] : null;
  let prependedCanonical = false;
  let content: string;
  if (canonMatch) {
    content = contentMarkdown.replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${newCanonical}" />`,
    );
  } else {
    content = `<link rel="canonical" href="${newCanonical}" />\n` + contentMarkdown;
    prependedCanonical = true;
  }

  // 2) JSON-LD (enriquece; não inventa se não existir)
  const jsonMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (jsonMatch) {
    const json = JSON.parse(jsonMatch[1]) as Record<string, unknown>;
    const enriched = buildArticleJsonLd(json, newCanonical);
    content = content.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">${JSON.stringify(enriched)}</script>`,
    );
  }

  return { content, changed: content !== contentMarkdown, oldCanonical, newCanonical, prependedCanonical };
}

/** Validação Fail-Closed do resultado. */
export function validateArticleHtml(
  content: string,
  locale: Lang,
  assunto: Assunto,
  slug: string,
): { ok: boolean; reasons: string[] } {
  const reasons: string[] = [];
  const expected = buildCanonicalUrl(locale, assunto, slug);

  if (!content.includes(`<link rel="canonical" href="${expected}" />`))
    reasons.push(`canonical esperado ausente: ${expected}`);
  if (!content.includes('"mainEntityOfPage"')) reasons.push('JSON-LD sem mainEntityOfPage');
  if (!/"url"\s*:\s*"/.test(content)) reasons.push('JSON-LD sem campo url');

  const m = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!m) reasons.push('bloco JSON-LD ausente');
  else { try { JSON.parse(m[1]); } catch { reasons.push('JSON-LD inválido'); } }

  return { ok: reasons.length === 0, reasons };
}
