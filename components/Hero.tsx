"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import t from "@/lib/translations";

const slides = [
  {
    src: "/home_page-Bluebox.jpg",
    alt: "Paris skyline — BlueBox Consulting",
    city: "Paris, France",
  },
  {
    src: "/casablanca.jpg",
    alt: "Casablanca skyline — BlueBox Consulting",
    city: "Casablanca, Maroc",
  },
];

export default function Hero() {
  const { lang } = useLanguage();
  const h = t[lang].hero;

  const [current, setCurrent] = useState(0);
  const [visible, setVisible]  = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      // fade out → swap → fade in
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setVisible(true);
      }, 600); // duration of fade-out
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col overflow-hidden bg-[#0F1A3A]">

      {/* ── Background images (crossfade) ─────────────── */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? (visible ? 1 : 0) : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              quality={90}
              className="object-cover object-center"
            />
          </div>
        ))}
        {/* Gradients on top of images */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A3A] via-[#0F1A3A]/85 to-[#1B2B5E]/30" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0F1A3A] to-transparent" />
      </div>

      {/* ── City indicator ─────────────────────────────── */}
      <div className="absolute bottom-36 right-6 lg:right-12 z-10 flex flex-col items-end gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            onClick={() => { setVisible(false); setTimeout(() => { setCurrent(i); setVisible(true); }, 600); }}
            className="flex items-center gap-2 group"
          >
            <span className={`text-xs font-semibold tracking-widest transition-all duration-300 ${
              i === current ? "text-white" : "text-white/30 group-hover:text-white/60"
            }`}>
              {slide.city}
            </span>
            <span className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-[#E8231A]" : "w-1.5 bg-white/30 group-hover:bg-white/60"
            }`} />
          </button>
        ))}
      </div>

      {/* ── Vertical red line ──────────────────────────── */}
      <div className="absolute left-[52%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#E8231A]/40 to-transparent hidden lg:block" />

      {/* ── Content ────────────────────────────────────── */}
      <div className="relative flex-1 flex flex-col justify-center mx-auto max-w-7xl w-full px-6 py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#E8231A] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">{h.badge}</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            {h.line1}<br />
            {h.line2}{" "}
            <span className="text-[#E8231A]">{h.highlight}</span>
            <br />
            <span className="text-white/80">{h.line3}</span>
          </h1>

          <p className="mt-7 text-lg text-white/60 leading-relaxed max-w-lg">{h.sub}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/contact" className="rounded-full bg-[#E8231A] px-8 py-3.5 text-sm font-bold text-white hover:bg-[#C41C14] transition-colors shadow-xl shadow-red-900/40">
              {h.cta1}
            </a>
            <a href="/services" className="rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-8 py-3.5 text-sm font-bold text-white hover:bg-white/15 transition-colors">
              {h.cta2}
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats bar ──────────────────────────────────── */}
      <div className="relative mx-auto max-w-7xl w-full px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {h.stats.map((stat) => (
            <div key={stat.label} className="bg-white/5 backdrop-blur-sm px-8 py-6 text-center hover:bg-white/10 transition-colors">
              <p className="text-3xl font-bold text-white">{stat.number}</p>
              <p className="mt-1 text-xs font-medium text-white/50 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
