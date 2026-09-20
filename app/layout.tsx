import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Toaster } from '@/components/ui/sonner';
import React from "react";
import {House, Users} from "lucide-react";


export const metadata: Metadata = {
  title: 'Equi-groom - Dashboard',
  description: 'Interface d\'administration et de gestion des données de test',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="fr" className="h-full bg-slate-50">
      <body className={`h-full flex flex-col md:flex-row text-slate-900`}>

      <aside className="hidden md:flex w-64 flex-col justify-between border-r border-slate-200 bg-slate-900 text-white p-6 shrink-0">
        <div className="space-y-8">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 font-bold text-white shadow-md">
              <House className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">Equi Groom</h2>
              <span className="text-xs text-slate-400">Back-Office</span>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
                href="/dashboard/horses"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white font-medium text-sm transition"
            >
              <House className="h-4 w-4" /> Chevaux
            </Link>
            <Link
                href="/dashboard/users"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white font-medium text-sm transition"
            >
              <Users className="h-4 w-4" /> Utilisateurs
            </Link>
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">


        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      <Toaster />
      </body>
      </html>
  );
}