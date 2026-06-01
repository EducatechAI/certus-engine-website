import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * CERTUS ENGINE — SOVEREIGN DOWNLOAD PROXY (v3.0.0)
 * Gateway soberano com detecção automática da release mais recente via GitHub API.
 * Cache de 1 hora (ISR) para evitar rate-limit sem sacrificar atualização.
 *
 * VULN-005 fix: Links do Google Drive movidos para variáveis de ambiente Vercel.
 * Nunca commitar URLs de acesso a ficheiros no repositório Git.
 * Configure no dashboard Vercel: SDK_SOVEREIGN_LINK e SDK_COMMAND_LINK
 */

const REPO_OWNER = 'EducatechAI';
const REPO_NAME  = 'Certus-Engine';
const RELEASES_PAGE = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`;

// Links lidos exclusivamente de variáveis de ambiente — nunca de ficheiros estáticos no Git
const SDK_LINKS: Record<string, string | undefined> = {
  sovereign: process.env.SDK_SOVEREIGN_LINK,
  command:   process.env.SDK_COMMAND_LINK,
};

const PLATFORM_MATCHERS: Record<string, (name: string) => boolean> = {
  windows:   (n) => /win(32|64|dows)?.*\.exe$/i.test(n) || /\.exe$/i.test(n),
  osx:       (n) => /darwin|mac|osx/i.test(n) && /\.(dmg|zip)$/i.test(n),
  linux:     (n) => /linux/i.test(n) && /\.(AppImage|deb|rpm|tar\.gz)$/i.test(n),
  sovereign: (n) => /Sovereign_SDK/i.test(n),
  command:   (n) => /Command_SDK/i.test(n),
};

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  assets: GitHubAsset[];
}

/**
 * Busca a release mais recente do GitHub com cache de 1 hora (Next.js ISR).
 * Basta criar uma nova tag no repositório e o site se atualiza automaticamente.
 */
async function fetchLatestRelease(): Promise<GitHubRelease | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        // Cache Next.js: revalida a cada 1 hora — zero custo de rate-limit
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;
    return (await res.json()) as GitHubRelease;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform')?.toLowerCase();

  const supportedPlatforms = Object.keys(PLATFORM_MATCHERS);

  if (!platform || !supportedPlatforms.includes(platform)) {
    return NextResponse.json(
      { error: 'Plataforma não suportada. Use: windows | osx | linux | sovereign | command' },
      { status: 400 }
    );
  }

  const matcher = PLATFORM_MATCHERS[platform];

  // 1️⃣ PRIORIDADE: Links soberanos via variáveis de ambiente (Vercel)
  // Configure SDK_SOVEREIGN_LINK e SDK_COMMAND_LINK no dashboard do Vercel.
  if (platform === 'sovereign' && SDK_LINKS.sovereign) {
    console.log('[Certus Proxy] Redirecionando para SDK Sovereign via env var.');
    return NextResponse.redirect(SDK_LINKS.sovereign, 302);
  }

  if (platform === 'command' && SDK_LINKS.command) {
    console.log('[Certus Proxy] Redirecionando para SDK Command via env var.');
    return NextResponse.redirect(SDK_LINKS.command, 302);
  }

  // 2️⃣ SEGUNDA PRIORIDADE (Fallback Resiliente Local): Ler do shared_links_log.json local
  try {
    const logPath = path.join(process.cwd(), 'src/app/api/download/shared_links_log.json');
    if (fs.existsSync(logPath)) {
      const logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
      const entry = logs.find((l: any) => l.file.toLowerCase().includes(platform));
      if (entry && entry.link) {
        console.log(`[Certus Proxy] Redirecionando para ${platform} via shared_links_log fallback local.`);
        return NextResponse.redirect(entry.link, 302);
      }
    }
  } catch (err) {
    console.error('Falha ao ler fallback local:', err);
  }

  // 3️⃣ TERCEIRA OPÇÃO: Buscar release mais recente no GitHub API
  const release = await fetchLatestRelease();

  if (!release) {
    // Fallback seguro: manda para a página de releases do GitHub
    return NextResponse.redirect(RELEASES_PAGE, 302);
  }

  // Encontrar o asset correto para a plataforma
  const asset = release.assets.find((a) => matcher(a.name));

  if (!asset) {
    // Sem binário para esta plataforma nesta release → página de releases
    return NextResponse.redirect(RELEASES_PAGE, 302);
  }

  // 3️⃣ Redirecionar para o binário correto (302 oculta a URL original)
  return NextResponse.redirect(asset.browser_download_url, 302);
}


