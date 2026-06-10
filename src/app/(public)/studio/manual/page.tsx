import fs from 'node:fs'
import path from 'node:path'
import DocumentViewer from '@/components/studio/DocumentViewer'

export default function ManualPage() {
  let content = ''
  try {
    const filePath = path.join(process.cwd(), '..', 'docs', 'MANUAL_SOBERANO_STUDIO.md')
    content = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    content = '# Erro: Documento não encontrado no cofre soberano.'
  }

  return <DocumentViewer content={content} title="Manual do Arquiteto Studio" />
}
