"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import t from "@/lib/translations";

const BLOCKED_DOMAINS = ["gmail.com","googlemail.com","hotmail.com","hotmail.fr","hotmail.co.uk","outlook.com","outlook.fr","yahoo.com","yahoo.fr","live.com","live.fr","icloud.com","me.com","msn.com","laposte.net","free.fr","orange.fr","sfr.fr","wanadoo.fr"];

export default function ContactPage() {
  const { lang } = useLanguage();
  const p = t[lang].contactPage;

  const [form, setForm] = useState({ fullName: "", companyName: "", email: "", phone: "", message: "" });
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      const domain = value.split("@")[1]?.toLowerCase();
      setEmailError(domain && BLOCKED_DOMAINS.includes(domain) ? p.emailErr : "");
    }
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (emailError) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setErrorDetail(data.error ?? "Unknown error"); throw new Error(); }
      setStatus("success");
      setForm({ fullName: "", companyName: "", email: "", phone: "", message: "" });
    } catch { setStatus("error"); }
  }

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
            <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-white leading-[1.1]">
              {p.title1} <span className="text-[#E8231A]">{p.highlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">{p.sub}</p>
          </div>
        </section>

        <section className="bg-[#EEF1F8] px-6 py-20">
          <div className="mx-auto max-w-2xl">
            {status === "success" ? (
              <div className="rounded-2xl bg-white border border-green-200 p-12 text-center shadow-sm">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">✓</div>
                <p className="text-xl font-bold text-[#1B2B5E]">{p.successTitle}</p>
                <p className="mt-2 text-slate-500">{p.successSub}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#1B2B5E] mb-2">{p.fullName} *</label>
                    <input type="text" name="fullName" required value={form.fullName} onChange={handleChange} placeholder={p.fullNamePh}
                      className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#1B2B5E] focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#1B2B5E] mb-2">{p.companyName} *</label>
                    <input type="text" name="companyName" required value={form.companyName} onChange={handleChange} placeholder={p.companyPh}
                      className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#1B2B5E] focus:outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#1B2B5E] mb-2">{p.email} *</label>
                  <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder={p.emailPh}
                    className={`w-full rounded-lg border-2 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${emailError ? "border-[#E8231A]" : "border-slate-200 focus:border-[#1B2B5E]"}`} />
                  {emailError && <p className="mt-1.5 text-xs font-medium text-[#E8231A]">{emailError}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#1B2B5E] mb-2">{p.phone}</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={p.phonePh}
                    className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#1B2B5E] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#1B2B5E] mb-2">{p.message} *</label>
                  <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder={p.messagePh}
                    className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#1B2B5E] focus:outline-none transition-colors resize-none" />
                </div>
                {status === "error" && <p className="text-sm font-medium text-[#E8231A]">{p.errorMsg}{errorDetail && ` — ${errorDetail}`}</p>}
                <button type="submit" disabled={status === "loading" || !!emailError}
                  className="w-full rounded-xl bg-[#E8231A] px-6 py-4 text-sm font-bold text-white hover:bg-[#C41C14] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {status === "loading" ? p.sendingBtn : p.submitBtn}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
