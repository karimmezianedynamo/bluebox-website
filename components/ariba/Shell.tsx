"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { BASE } from "@/lib/ariba/program";
import { useProgress } from "@/lib/ariba/progress";
import { computeStats } from "@/lib/ariba/stats";
import { ProgressBar } from "./ui";

const NAV: { href: string; label: string; icon: string; match?: (p: string) => boolean }[] = [
  { href: BASE, label: "Tableau de bord", icon: "⌂", match: (p) => p === BASE },
  { href: `${BASE}/planning`, label: "Planning", icon: "▦" },
  { href: `${BASE}/modules`, label: "Modules", icon: "◈", match: (p) => p.startsWith(`${BASE}/modules`) || p.startsWith(`${BASE}/activite`) },
  { href: `${BASE}/revision`, label: "Notions à revoir", icon: "↻" },
  { href: `${BASE}/cas-usage`, label: "Cas d'usage consultant", icon: "◉" },
  { href: `${BASE}/questions`, label: "Espace questions", icon: "?" },
  { href: `${BASE}/glossaire`, label: "Glossaire", icon: "A" },
  { href: `${BASE}/cas-final`, label: "Cas final", icon: "★" },
  { href: `${BASE}/synthese`, label: "Synthèse certification", icon: "✓" },
];

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? BASE;
  const [open, setOpen] = useState(false);
  const { state, hydrated } = useProgress();
  const stats = useMemo(() => computeStats(state), [state]);

  const isActive = (item: (typeof NAV)[number]) => (item.match ? item.match(pathname) : pathname.startsWith(item.href));

  const nav = (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = isActive(item);
        return (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${active ? "bg-[#E8231A] text-white shadow-sm" : "text-white/80 hover:bg-white/10 hover:text-white"}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-md text-xs ${active ? "bg-white/20" : "bg-white/10"}`}>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-[#F6F7FB] text-[#0F1A3A]">
      {/* Sidebar desktop */}
      <aside className="hidden w-72 shrink-0 flex-col bg-[#1B2B5E] px-4 py-6 lg:flex lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <Link href="/" className="mb-6 flex items-center gap-3 rounded-xl bg-white/95 px-3 py-2">
          <Image src="/LogoBlueBox.png" alt="BlueBox" width={120} height={40} />
        </Link>
        <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">BlueBox Academy</p>
          <p className="mt-1 text-sm font-bold text-white">Parcours SAP Ariba</p>
          <p className="text-xs text-white/60">Technico-fonctionnel · 8 semaines</p>
          <div className="mt-3 flex items-center justify-between text-xs text-white/70">
            <span>Progression</span>
            <span className="font-bold text-white">{hydrated ? `${stats.pct}%` : "…"}</span>
          </div>
          <ProgressBar value={hydrated ? stats.pct : 0} className="mt-1.5 bg-white/15" />
        </div>
        {nav}
        <div className="mt-auto pt-6 text-[11px] text-white/40">
          <Link href="/academy" className="hover:text-white/80">← Retour à BlueBox Academy</Link>
        </div>
      </aside>

      {/* Contenu */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Barre mobile */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
          <Link href={BASE} className="flex items-center gap-2">
            <Image src="/LogoBlueBox.png" alt="BlueBox" width={96} height={32} />
            <span className="text-xs font-bold text-[#1B2B5E]">Parcours SAP Ariba</span>
          </Link>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-[#1B2B5E]">
            {open ? "Fermer" : "Menu"}
          </button>
        </header>
        {open && (
          <div className="border-b border-slate-200 bg-[#1B2B5E] p-4 lg:hidden">
            <div className="mb-3 flex items-center justify-between text-xs text-white/70">
              <span>Progression globale</span><span className="font-bold text-white">{stats.pct}%</span>
            </div>
            <ProgressBar value={stats.pct} className="mb-4 bg-white/15" />
            {nav}
          </div>
        )}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        <footer className="px-4 py-6 text-center text-[11px] text-slate-400">
          BlueBox Academy · Parcours de formation SAP Ariba · Votre progression est enregistrée localement dans ce navigateur.
        </footer>
      </div>
    </div>
  );
}
