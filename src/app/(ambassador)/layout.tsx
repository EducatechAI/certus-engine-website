import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { I18nProvider } from "@/i18n/I18nProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <div className="flex bg-navy-900 min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="ml-64 pt-24 px-8 pb-8">
            {children}
          </main>
        </div>
      </div>
    </I18nProvider>
  );
}
