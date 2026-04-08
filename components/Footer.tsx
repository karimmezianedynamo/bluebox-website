"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import t from "@/lib/translations";

const offices = [
  {
    country: "France", flag: "🇫🇷",
    address: ["1 rue de Stockholm", "75008 Paris"],
    phone: "+33 1 84 88 00 00",
    email: "paris@blueboxgroup.io",
  },
  {
    country: "Maroc", flag: "🇲🇦",
    address: ["Tour Casablanca Finance City", "Bd Sidi Mohammed Ben Abdallah", "20000 Casablanca"],
    phone: "+212 5 22 00 00 00",
    email: "casablanca@blueboxgroup.io",
  },
];

export default function Footer() {
  const { lang } = useLanguage();
  const f = t[lang].footer;

  return (
    <footer className="bg-[#0F1A3A] px-6 pt-16 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-5 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/">
              <Image src="/LogoBlueBox.png" alt="BlueBox" width={150} height={50} className="brightness-0 invert" />
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-6">Think Up Your Future.<br />Data · AI · Cloud · SAP</p>
            <Link href="/contact" className="mt-6 inline-block rounded-full bg-[#E8231A] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#C41C14] transition-colors">
              {f.contactUs}
            </Link>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#E8231A] mb-5">{f.services}</h4>
            <ul className="space-y-3">
              {[
                { label: "Data", href: "/services/data" },
                { label: "AI",   href: "/services/ai" },
                { label: "Cloud",href: "/services/cloud" },
                { label: "SAP",  href: "/services/sap" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2">
                    <span className="h-px w-3 bg-[#E8231A]/60" />{l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#E8231A] mb-5">{f.company}</h4>
            <ul className="space-y-3">
              {[
                { label: f.links.philosophy, href: "/our-philosophy" },
                { label: f.links.academy,    href: "/academy" },
                { label: f.links.news,       href: "/news" },
                { label: f.links.contact,    href: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2">
                    <span className="h-px w-3 bg-[#E8231A]/60" />{l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          {offices.map((office) => (
            <div key={office.country}>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#E8231A] mb-5">
                {office.flag} {office.country}
              </h4>
              <address className="not-italic space-y-2">
                {office.address.map((line) => (
                  <p key={line} className="text-sm text-white/50 leading-5">{line}</p>
                ))}
                <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="block text-sm text-white/70 hover:text-white transition-colors font-medium pt-1">
                  {office.phone}
                </a>
                <a href={`mailto:${office.email}`} className="block text-sm text-white/50 hover:text-[#E8231A] transition-colors">
                  {office.email}
                </a>
              </address>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">{f.rights}</p>
          <p className="text-xs text-white/20 italic tracking-widest uppercase">Think Up Your Future.</p>
        </div>
      </div>
    </footer>
  );
}
