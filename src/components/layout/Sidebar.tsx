import Link from "next/link";
import { LayoutDashboard, Users, Wallet, GraduationCap, User } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-navy-800 border-r border-navy-700 h-screen flex flex-col fixed left-0 top-0">
      <div className="h-16 flex items-center justify-center border-b border-navy-700">
        <span className="text-emerald-500 font-bold text-xl tracking-wider">CERTUS</span>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 bg-emerald-500/10 text-emerald-400 rounded-lg transition-colors">
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link href="/dashboard/leads" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-gray-100 hover:bg-navy-700 rounded-lg transition-colors">
          <Users size={20} />
          <span className="font-medium">Leads</span>
        </Link>
        <Link href="/dashboard/wallet" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-gray-100 hover:bg-navy-700 rounded-lg transition-colors">
          <Wallet size={20} />
          <span className="font-medium">Carteira</span>
        </Link>
        <Link href="/dashboard/academy" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-gray-100 hover:bg-navy-700 rounded-lg transition-colors">
          <GraduationCap size={20} />
          <span className="font-medium">Academy</span>
        </Link>
        <Link href="/dashboard/profile" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-gray-100 hover:bg-navy-700 rounded-lg transition-colors">
          <User size={20} />
          <span className="font-medium">Perfil</span>
        </Link>
      </nav>
      
      <div className="p-4 border-t border-navy-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center">
            <User size={20} className="text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-100">Embaixador</p>
            <p className="text-xs text-gray-400 font-mono">ID: AMB-XXX</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
