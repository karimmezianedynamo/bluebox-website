"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import t from "@/lib/translations";

export default function Header() {
  const { lang, setLang } = useLanguage();
  const n = t[lang].nav;

  const [megaOpen, setMegaOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const services = [
    { ...n.mega.data,     href: "/services/data",             icon: "◈" },
    { ...n.mega.ai,       href: "/services/ai",               icon: "◎" },
    { ...n.mega.cloud,    href: "/services/cloud",            icon: "◇" },
    { ...n.mega.sap,      href: "/services/sap",              icon: "▣" },
    { ...n.mega.delivery, href: "/services/delivery-center",  icon: "◉" },
  ];

  const navItems = [
    { label: n.about,      href: "/about" },
    { label: n.philosophy, href: "/our-philosophy" },
    { label: n.services,   href: "/services", hasMega: true },
    { label: n.academy,    href: "/academy" },
    { label: n.news,       href: "/news" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"}`}>
        {/* Top accent line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-[#1B2B5E] via-[#E8231A] to-[#1B2B5E]" />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image src="/LogoBlueBox.png" alt="BlueBox" width={160} height={54} priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.hasMega ? (
                <div key={item.label} className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}>
                  <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-[#1B2B5E] hover:text-[#E8231A] hover:bg-[#EEF1F8] transition-colors">
                    {item.label}
                    <svg className={`w-3 h-3 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              ) : (
                <Link key={item.label} href={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-[#1B2B5E] hover:text-[#E8231A] hover:bg-[#EEF1F8] transition-colors">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right: Language switcher + CTA + burger */}
          <div className="flex items-center gap-3">

            {/* ── Language switcher ── */}
            <div className="hidden lg:flex items-center rounded-full border-2 border-[#EEF1F8] overflow-hidden text-xs font-bold">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-[#1B2B5E] text-white" : "text-[#1B2B5E] hover:bg-[#EEF1F8]"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("fr")}
                className={`px-3 py-1.5 transition-colors ${lang === "fr" ? "bg-[#E8231A] text-white" : "text-[#1B2B5E] hover:bg-[#EEF1F8]"}`}
              >
                FR
              </button>
            </div>

            <Link href="/contact"
              className="hidden lg:flex items-center gap-2 rounded-full bg-[#E8231A] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#C41C14] transition-colors shadow-sm shadow-red-200">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-pulse" />
              {n.contact}
            </Link>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden flex flex-col gap-1.5 p-2">
              <span className={`h-0.5 w-6 bg-[#1B2B5E] rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 w-6 bg-[#1B2B5E] rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 bg-[#1B2B5E] rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <div
          className={`hidden lg:block border-t border-slate-100 bg-white transition-all duration-300 overflow-hidden ${megaOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="grid grid-cols-5 gap-4">
              {services.map((s) => (
                <Link key={s.label} href={s.href}
                  className="group rounded-xl border border-slate-100 bg-[#EEF1F8] p-5 hover:border-[#E8231A]/30 hover:bg-white hover:shadow-md transition-all">
                  <div className="mb-3 text-2xl text-[#E8231A]">{s.icon}</div>
                  <p className="font-bold text-[#1B2B5E] group-hover:text-[#E8231A] transition-colors">{s.label}</p>
                  <p className="mt-1 text-xs text-slate-500 leading-5">{s.desc}</p>
                  <p className="mt-3 text-xs font-bold text-[#E8231A] flex items-center gap-1">
                    {lang === "en" ? "Learn more" : "En savoir plus"}
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
              <p className="text-sm text-slate-500">{n.mega.tagline}</p>
              <Link href="/services" className="text-sm font-bold text-[#1B2B5E] hover:text-[#E8231A] transition-colors">
                {n.mega.viewAll}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6 pt-20 space-y-1">
            {/* Mobile lang switcher */}
            <div className="flex items-center gap-2 mb-4 p-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-1">Lang:</span>
              <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${lang === "en" ? "bg-[#1B2B5E] text-white" : "border border-slate-200 text-[#1B2B5E]"}`}>EN</button>
              <button onClick={() => setLang("fr")} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${lang === "fr" ? "bg-[#E8231A] text-white" : "border border-slate-200 text-[#1B2B5E]"}`}>FR</button>
            </div>
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-[#EEF1F8] transition-colors font-semibold text-[#1B2B5E]">
                {item.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 px-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#E8231A]">{n.services}</p>
            </div>
            {services.map((s) => (
              <Link key={s.label} href={s.href} onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl p-3 pl-6 hover:bg-[#EEF1F8] transition-colors">
                <span className="text-[#E8231A]">{s.icon}</span>
                <span className="text-sm text-slate-600">{s.label}</span>
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#E8231A] px-5 py-3 text-sm font-bold text-white hover:bg-[#C41C14] transition-colors">
              {n.contact}
            </Link>
          </div>
        </div>
      </div>

      <div className="h-[73px]" />
    </>
  );
}
