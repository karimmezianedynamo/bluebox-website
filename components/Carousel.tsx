"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import t from "@/lib/translations";

export default function Carousel() {
  const { lang } = useLanguage();
  const slides = t[lang].carousel;

  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const [progress, setProgress] = useState(0);

  // Reset to slide 0 when language changes
  useEffect(() => { setCurrent(0); setProgress(0); }, [lang]);

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const DURATION = 3000;
    const TICK = 30;
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += TICK;
      setProgress((elapsed / DURATION) * 100);
      if (elapsed >= DURATION) {
        setCurrent((c) => (c + 1) % slides.length);
        elapsed = 0;
        setProgress(0);
      }
    }, TICK);
    return () => clearInterval(interval);
  }, [current, paused, slides.length]);

  const slide = slides[current];

  return (
    <section className="relative bg-[#0F1A3A] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 transition-all duration-700"
          style={{ backgroundColor: slide.accent }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div key={`${lang}-${current}`} className="animate-fadeIn">
            <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-white mb-5 inline-block"
              style={{ backgroundColor: slide.accent }}>
              {slide.tag}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">{slide.title}</h2>
            <p className="mt-5 text-white/60 leading-relaxed text-sm md:text-base">{slide.body}</p>
            <Link href={slide.cta.href}
              className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-6 py-2.5 text-sm font-bold text-white hover:border-white hover:bg-white/10 transition-all">
              {slide.cta.label} →
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {slides.map((s, i) => (
              <button key={i} onClick={() => { setCurrent(i); setProgress(0); }}
                className={`group text-left rounded-xl p-4 border transition-all duration-300 ${i === current ? "bg-white/10 border-white/20" : "border-transparent hover:bg-white/5 hover:border-white/10"}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold transition-colors ${i === current ? "text-[#E8231A]" : "text-white/30"}`}>{s.index}</span>
                  <p className={`text-sm font-semibold transition-colors leading-tight ${i === current ? "text-white" : "text-white/40 group-hover:text-white/70"}`}>{s.title}</p>
                </div>
                {i === current && (
                  <div className="mt-3 ml-6 h-0.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full transition-none" style={{ width: `${progress}%`, backgroundColor: slide.accent }} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
