import fs from 'node:fs'
import path from 'node:path'
import DocumentViewer from '@/components/studio/DocumentViewer'

export default function WhitepaperPage() {
  let content = ''
  try {
    const filePath = path.join(process.cwd(), '..', 'docs', 'WHITEPAPER_CERTUS_ENGINE_v2_4_1.md')
    content = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    content = '# Erro: Documento não encontrado no cofre soberano.'
  }

  return <DocumentViewer content={content} title="Whitepaper Técnico v2.4.1" />
}
