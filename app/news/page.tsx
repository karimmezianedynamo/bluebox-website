"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import t from "@/lib/translations";

export default function NewsPage() {
  const { lang } = useLanguage();
  const p = t[lang].newsPage;
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
            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white leading-[1.1]">
              {p.title.split(" ").slice(0,-2).join(" ")} <span className="text-[#E8231A]">{p.title.split(" ").slice(-2).join(" ")}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">{p.sub}</p>
          </div>
        </section>

        <section className="bg-[#EEF1F8] px-6 py-20">
          <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {p.articles.map((article) => (
              <article key={article.title} className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:border-[#E8231A]/20 hover:shadow-md transition-all">
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="rounded-full bg-[#EEF1F8] border border-[#1B2B5E]/10 px-3 py-1 text-xs font-bold text-[#1B2B5E]">{article.category}</span>
                    <span className="text-xs text-slate-400">{article.date}</span>
                  </div>
                  <h2 className="text-base font-bold text-[#1B2B5E] leading-6">{article.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 flex-1">{article.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-400">{article.readTime}</span>
                    <a href="/contact" className="text-sm font-bold text-[#E8231A] hover:text-[#C41C14] transition-colors">{p.readMore}</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#1B2B5E] px-6 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold text-white">{p.newsletterTitle}</h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">{p.newsletterSub}</p>
            <a href="/contact" className="mt-8 inline-block rounded-xl bg-[#E8231A] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#C41C14] transition-colors">{p.newsletterBtn}</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
