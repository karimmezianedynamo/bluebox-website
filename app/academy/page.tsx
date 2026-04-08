"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import t from "@/lib/translations";

const levelColors: Record<string, string> = {
  Beginner:     "bg-green-100 text-green-700 border border-green-200",
  Intermediate: "bg-amber-100 text-amber-700 border border-amber-200",
  Advanced:     "bg-red-100 text-[#E8231A] border border-red-200",
};

export default function AcademyPage() {
  const { lang } = useLanguage();
  const p = t[lang].academyPage;
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
              {p.title1}<br /><span className="text-[#E8231A]">{p.title2}</span> {p.title3}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">{p.sub}</p>
            <a href="/contact" className="mt-10 inline-block rounded-xl bg-[#E8231A] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#C41C14] transition-colors">{p.ctaRequest}</a>
          </div>
        </section>

        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-3">
            {p.diff.map((item) => (
              <div key={item.title} className="flex gap-4 items-start p-6 rounded-2xl bg-[#EEF1F8]">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-[#1B2B5E]">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 leading-6">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#EEF1F8] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A] mb-3">{p.catalogueTag}</p>
            <h2 className="text-3xl font-bold text-[#1B2B5E] mb-3">{p.catalogueTitle}</h2>
            <p className="text-slate-600 mb-14">{p.catalogueSub}</p>
            <div className="space-y-12">
              {p.programs.map((program) => (
                <div key={program.category}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-3 w-3 rounded-full bg-[#E8231A]" />
                    <h3 className="text-xl font-bold text-[#1B2B5E]">{program.category}</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {program.courses.map((course) => (
                      <div key={course.title} className="rounded-xl bg-white border border-slate-100 p-6 shadow-sm hover:border-[#E8231A]/20 transition-all">
                        <h4 className="font-bold text-[#1B2B5E] text-sm leading-5">{course.title}</h4>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-slate-400">{course.duration}</span>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${levelColors[course.level]}`}>
                            {p.levels[course.level as keyof typeof p.levels]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1B2B5E] px-6 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold text-white">{p.ctaCustomTitle}</h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">{p.ctaCustomSub}</p>
            <a href="/contact" className="mt-8 inline-block rounded-xl bg-[#E8231A] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#C41C14] transition-colors">{p.ctaCustomBtn}</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
