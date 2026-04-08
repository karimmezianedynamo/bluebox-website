"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import t from "@/lib/translations";
const techStack = ["Databricks","Snowflake","BigQuery","dbt","Apache Spark","Kafka","Airflow","Power BI","Tableau","Looker"];
export default function DataPage() {
  const { lang } = useLanguage();
  const p = t[lang].dataPage;
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative bg-[#1B2B5E] overflow-hidden px-6 py-28">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#2C3E7A] opacity-40 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl">
            <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/20 bg-white/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#E8231A]" /><span className="text-xs font-bold uppercase tracking-widest text-white/80">{p.badge}</span>
            </div>
            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white leading-[1.1]">{p.title.split(" ").slice(0,-2).join(" ")} <span className="text-[#E8231A]">{p.title.split(" ").slice(-2).join(" ")}</span></h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">{p.sub}</p>
            <div className="mt-10 flex gap-4">
              <a href="/contact" className="rounded-xl bg-[#E8231A] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#C41C14] transition-colors">{p.ctaBtn}</a>
              <a href="/services" className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors">{p.allServices}</a>
            </div>
          </div>
        </section>
        <section className="bg-[#EEF1F8] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A] mb-3">{p.offeringsTag}</p>
            <h2 className="text-3xl font-bold text-[#1B2B5E] mb-14">{p.offeringsTitle}</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {p.offerings.map((o) => (
                <div key={o.title} className="rounded-2xl bg-white p-8 shadow-sm border border-transparent hover:border-[#E8231A]/20 transition-all">
                  <div className="mb-4 h-1 w-10 rounded-full bg-[#E8231A]" />
                  <h3 className="text-lg font-bold text-[#1B2B5E]">{o.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A] mb-3">{p.techTag}</p>
            <h2 className="text-2xl font-bold text-[#1B2B5E] mb-8">{p.techTitle}</h2>
            <div className="flex flex-wrap gap-3">{techStack.map((t) => <span key={t} className="rounded-full border-2 border-[#EEF1F8] bg-[#EEF1F8] px-4 py-2 text-sm font-semibold text-[#1B2B5E] hover:border-[#1B2B5E] transition-colors">{t}</span>)}</div>
          </div>
        </section>
        <section className="bg-[#1B2B5E] px-6 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold text-white">{p.ctaTitle}</h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">{p.ctaSub}</p>
            <a href="/contact" className="mt-8 inline-block rounded-xl bg-[#E8231A] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#C41C14] transition-colors">{p.ctaBtn}</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
