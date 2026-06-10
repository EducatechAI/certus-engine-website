import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://certus.engine.ai'),
  title: {
    default: 'Certus Engine v2.4.1 — Tiered Intelligence & Governança de IA',
    template: '%s | Certus Engine v2.4.1',
  },
  description:
    'Alcance o determinismo absoluto com o Certus Engine v2.4.1 Tiered Intelligence Edition. Governança Tier A+, PII-Zero e orquestração multi-motor para codebases complexas.',
  keywords: [
    'governança de IA', 'controle de tokens', 'IA para empresas', 'PII-Zero', 'eliminar alucinação IA',
    'AI compliance LGPD', 'inteligência artificial determinística', 'certus engine', 'custo de API IA',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://certus.engine.ai',
    siteName: 'Certus Engine',
    title: 'Certus Engine — A Certeza no Meio do Caos da IA',
    description: 'Mais de centenas de horas de trabalho sem uma única falha em milhares de linhas de código+ linhas de código. O motor de governança que transforma IAs probabilísticas em engenharia determinística.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Certus Engine' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certus Engine — Pare de Torcer para a sua IA',
    description: 'Determinismo, PII-Zero e controle de custos. centenas de horas sem falhas em milhares de linhas de código+ linhas. Comece grátis.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="bg-[#000804] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        {children}
        {/* Chatbot Sovereign Agent Widget */}
        <Script src="/chat-widget.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
