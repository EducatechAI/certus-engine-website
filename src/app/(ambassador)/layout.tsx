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
      <div className="flex bg-navy-900 min-h-screen relative overflow-x-hidden">
        {/* Sidebar hides on mobile, shown on md and larger */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1 md:pl-64">
          <Header />
          {/* pt-24 standard header padding, adjust px on mobile to not break edge grids */}
          <main className="pt-24 px-4 sm:px-8 pb-8">
            {children}
          </main>
        </div>
      </div>
    </I18nProvider>
  );
}
