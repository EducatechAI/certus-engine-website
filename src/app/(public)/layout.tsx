import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Background } from '@/components/Background'
import { I18nProvider } from '@/i18n/I18nProvider'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <Background />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </I18nProvider>
  )
}
