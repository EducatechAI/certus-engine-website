import React from 'react';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { DocsTOC } from '@/components/docs/DocsTOC';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#000402] text-slate-300 font-sans pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#000402] to-[#000402] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
        <DocsSidebar />
        <main className="flex-1 min-w-0 py-8">
          {children}
        </main>
        <DocsTOC />
      </div>
    </div>
  );
}
