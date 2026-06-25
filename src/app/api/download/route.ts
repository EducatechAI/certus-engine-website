import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const REPO_OWNER = 'EducatechAI';
const REPO_NAME = 'Certus-Engine';
const TAG_NAME = 'v1.3.4'; // A tag exata onde estão os arquivos LIMPA

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform')?.toLowerCase();

  const headers = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  if (platform !== 'sovereign' && platform !== 'command') {
    return NextResponse.json(
      { error: 'Plataforma não suportada. Use: ?platform=sovereign ou ?platform=command' },
      { status: 400, headers }
    );
  }

  const targetFileName = platform === 'sovereign' 
    ? 'Certus_Studio_Sovereign_SDK_v1.3.4_LIMPA.zip'
    : 'Certus_Studio_Command_SDK_v1.3.4_LIMPA.zip';

  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return NextResponse.json(
      { error: 'GITHUB_TOKEN não configurado na Vercel. Não é possível acessar o repositório privado.' },
      { status: 500, headers }
    );
  }

  try {
    // 1. Busca os metadados da Release específica (v1.3.4) no repositório privado
    const releaseRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/tags/${TAG_NAME}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        cache: 'no-store'
      }
    );

    if (!releaseRes.ok) {
      console.error('Falha ao buscar release:', await releaseRes.text());
      return NextResponse.json(
        { error: `Falha ao acessar a release ${TAG_NAME} no GitHub. Verifique o GITHUB_TOKEN ou se a tag existe.` },
        { status: 500, headers }
      );
    }

    const releaseData = await releaseRes.json();
    
    // 2. Encontra o asset correto pelo nome
    const asset = releaseData.assets.find((a: any) => a.name === targetFileName);

    if (!asset) {
      return NextResponse.json(
        { error: `Arquivo ${targetFileName} não encontrado na release ${TAG_NAME}.` },
        { status: 404, headers }
      );
    }

    // 3. Solicita o link de download direto temporário da Amazon S3 do GitHub
    // Para baixar, precisamos enviar um GET para asset.url com Accept: application/octet-stream
    const assetRes = await fetch(asset.url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/octet-stream',
      },
      redirect: 'manual', // Impede que o Node siga o redirecionamento automaticamente
    });

    // O GitHub retorna um 302 Found com o link público temporário no header 'Location'
    if (assetRes.status === 302 || assetRes.status === 301) {
      const downloadUrl = assetRes.headers.get('location');
      
      if (downloadUrl) {
        return NextResponse.redirect(downloadUrl, { status: 302, headers });
      }
    }

    // Se o fetch falhar ou não retornar 302
    console.error('Falha ao obter URL de download S3:', await assetRes.text());
    return NextResponse.json(
      { error: 'Não foi possível obter o link temporário do GitHub.' },
      { status: 500, headers }
    );

  } catch (error) {
    console.error('Erro no Proxy Autenticado do GitHub:', error);
    return NextResponse.json(
      { error: 'Erro interno no Proxy de Download.' },
      { status: 500, headers }
    );
  }
}
