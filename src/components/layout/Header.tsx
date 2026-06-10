import { Bell } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 bg-navy-800 border-b border-navy-700 flex items-center justify-between px-8 ml-64 fixed top-0 right-0 left-0 z-10">
      <h1 className="text-xl font-semibold text-gray-100">Visão Geral</h1>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-400 hover:text-gray-100 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
