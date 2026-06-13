"use client";

import { useState } from "react";
import { Bell, Menu, X, LayoutDashboard, Users, Wallet, GraduationCap, User as UserIcon } from "lucide-react";
import Link from "next/link";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-navy-800 border-b border-navy-700 flex items-center justify-between px-6 md:ml-64 fixed top-0 right-0 left-0 z-20">
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-gray-400 hover:text-gray-100 bg-navy-900 border border-navy-700 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-lg md:text-xl font-semibold text-gray-100">Visão Geral</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-100 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer (shown only on mobile when menu is open) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Overlay background */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Sidebar content */}
          <aside className="fixed top-0 bottom-0 left-0 w-64 bg-navy-800 border-r border-navy-700 flex flex-col z-50 animate-slide-in">
            <div className="h-16 flex items-center justify-between px-6 border-b border-navy-700">
              <span className="text-emerald-500 font-bold text-xl tracking-wider">CERTUS</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="flex-1 py-6 px-4 space-y-2">
              <Link 
                href="/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 bg-emerald-500/10 text-emerald-400 rounded-lg transition-colors"
              >
                <LayoutDashboard size={20} />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link 
                href="/dashboard/leads" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-gray-100 hover:bg-navy-700 rounded-lg transition-colors"
              >
                <Users size={20} />
                <span className="font-medium">Leads</span>
              </Link>
              <Link 
                href="/dashboard/wallet" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-gray-100 hover:bg-navy-700 rounded-lg transition-colors"
              >
                <Wallet size={20} />
                <span className="font-medium">Carteira</span>
              </Link>
              <Link 
                href="/dashboard/academy" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-gray-100 hover:bg-navy-700 rounded-lg transition-colors"
              >
                <GraduationCap size={20} />
                <span className="font-medium">Academy</span>
              </Link>
              <Link 
                href="/dashboard/profile" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-gray-100 hover:bg-navy-700 rounded-lg transition-colors"
              >
                <UserIcon size={20} />
                <span className="font-medium">Perfil</span>
              </Link>
            </nav>
            
            <div className="p-4 border-t border-navy-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center">
                  <UserIcon size={20} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-100">Embaixador</p>
                  <p className="text-xs text-gray-400 font-mono">ID: AMB-XXX</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
