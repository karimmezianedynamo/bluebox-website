"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import t from "@/lib/translations";

export default function Services() {
  const { lang } = useLanguage();
  const s = t[lang].services;

  return (
    <section id="services" className="bg-[#EEF1F8] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A] mb-3">{s.tag}</p>
            <h2 className="text-4xl font-bold text-[#1B2B5E]">{s.title}</h2>
            <p className="mt-4 max-w-xl text-slate-600 leading-relaxed">{s.sub}</p>
          </div>
          <Link href="/services" className="shrink-0 rounded-lg border-2 border-[#1B2B5E] px-6 py-2.5 text-sm font-semibold text-[#1B2B5E] hover:bg-[#1B2B5E] hover:text-white transition-colors">
            {s.viewAll}
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {s.items.map((item) => (
            <Link key={item.slug} href={`/services/${item.slug}`}
              className="group rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg border border-transparent hover:border-[#E8231A]/20 transition-all">
              <div className="mb-5 text-3xl text-[#E8231A]">{item.icon}</div>
              <h3 className="text-xl font-bold text-[#1B2B5E] group-hover:text-[#E8231A] transition-colors">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
              <p className="mt-5 text-sm font-semibold text-[#E8231A] flex items-center gap-1">
                {s.learn}
                <span className="group-hover:translate-x-1 transition-transform inline-block"> </span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
