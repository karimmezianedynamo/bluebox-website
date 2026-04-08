"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import t from "@/lib/translations";

/* ── Per-service SVG illustrations ──────────────────────────────────────── */

function DataIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Grid lines */}
      <line x1="20" y1="140" x2="180" y2="140" stroke="white" strokeOpacity="0.15" strokeWidth="1"/>
      <line x1="20" y1="110" x2="180" y2="110" stroke="white" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 4"/>
      <line x1="20" y1="80"  x2="180" y2="80"  stroke="white" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 4"/>
      <line x1="20" y1="50"  x2="180" y2="50"  stroke="white" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 4"/>
      {/* Bar chart */}
      <rect x="32"  y="90"  width="22" height="50" rx="3" fill="#E8231A" fillOpacity="0.7"/>
      <rect x="64"  y="65"  width="22" height="75" rx="3" fill="#E8231A"/>
      <rect x="96"  y="78"  width="22" height="62" rx="3" fill="#E8231A" fillOpacity="0.5"/>
      <rect x="128" y="48"  width="22" height="92" rx="3" fill="#E8231A"/>
      <rect x="160" y="60"  width="22" height="80" rx="3" fill="#E8231A" fillOpacity="0.7"/>
      {/* Trend line */}
      <polyline points="43,90 75,65 107,72 139,48 171,55" stroke="white" strokeWidth="2" strokeOpacity="0.6" strokeLinejoin="round" fill="none"/>
      {/* Dots */}
      {[[43,90],[75,65],[107,72],[139,48],[171,55]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="white" fillOpacity="0.9"/>
      ))}
      {/* Data nodes top */}
      <circle cx="100" cy="22" r="8" fill="#E8231A" fillOpacity="0.9"/>
      <circle cx="122" cy="22" r="5" fill="white" fillOpacity="0.3"/>
      <circle cx="78"  cy="22" r="5" fill="white" fillOpacity="0.3"/>
    </svg>
  );
}

function AIIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Central brain / neural net */}
      {/* Outer ring */}
      <circle cx="100" cy="80" r="50" stroke="white" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="3 3"/>
      <circle cx="100" cy="80" r="34" stroke="#E8231A" strokeOpacity="0.25" strokeWidth="1"/>
      {/* Core */}
      <circle cx="100" cy="80" r="14" fill="#E8231A" fillOpacity="0.9"/>
      <circle cx="100" cy="80" r="8"  fill="white" fillOpacity="0.9"/>
      {/* Satellite nodes */}
      {[
        [100, 38], [136, 59], [136, 101], [100, 122], [64, 101], [64, 59]
      ].map(([nx, ny], i) => (
        <g key={i}>
          <line x1="100" y1="80" x2={nx} y2={ny} stroke="#E8231A" strokeOpacity="0.35" strokeWidth="1.5"/>
          <circle cx={nx} cy={ny} r="6" fill="#E8231A" fillOpacity="0.6"/>
          <circle cx={nx} cy={ny} r="3" fill="white" fillOpacity="0.8"/>
        </g>
      ))}
      {/* Outer nodes */}
      {[
        [100, 14], [155, 45], [155, 115], [100, 146], [45, 115], [45, 45]
      ].map(([nx, ny], i) => (
        <g key={i}>
          <line x1={[100,136,136,100,64,64][i]} y1={[38,59,101,122,101,59][i]} x2={nx} y2={ny}
            stroke="white" strokeOpacity="0.15" strokeWidth="1"/>
          <circle cx={nx} cy={ny} r="4" fill="white" fillOpacity="0.25"/>
        </g>
      ))}
      {/* Pulse ring */}
      <circle cx="100" cy="80" r="22" stroke="#E8231A" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="6 3"/>
    </svg>
  );
}

function CloudIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Main cloud shape */}
      <path d="M60 105 Q38 105 38 85 Q38 68 54 65 Q54 42 74 42 Q82 30 100 33 Q116 22 130 33 Q150 33 152 52 Q168 55 168 72 Q168 88 150 88 L60 105Z"
        fill="white" fillOpacity="0.12" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
      {/* Inner cloud glow */}
      <path d="M68 98 Q50 98 50 82 Q50 68 63 66 Q63 48 80 48 Q87 38 102 40 Q116 32 128 40 Q145 40 146 56 Q160 58 160 72 Q160 84 144 84 L68 98Z"
        fill="#E8231A" fillOpacity="0.15"/>
      {/* Connection lines down */}
      <line x1="80"  y1="100" x2="60"  y2="130" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 3"/>
      <line x1="100" y1="100" x2="100" y2="135" stroke="#E8231A" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="4 3"/>
      <line x1="120" y1="100" x2="140" y2="130" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 3"/>
      {/* Server boxes */}
      <rect x="48"  y="130" width="24" height="16" rx="3" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
      <rect x="88"  y="135" width="24" height="16" rx="3" fill="#E8231A" fillOpacity="0.6" stroke="#E8231A" strokeOpacity="0.8" strokeWidth="1"/>
      <rect x="128" y="130" width="24" height="16" rx="3" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
      {/* Upload arrows */}
      <path d="M96 22 L100 14 L104 22" stroke="#E8231A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="100" y1="14" x2="100" y2="30" stroke="#E8231A" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function SAPIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Hexagonal grid — SAP enterprise feel */}
      {/* Center hex */}
      <polygon points="100,55 118,65 118,85 100,95 82,85 82,65" fill="#E8231A" fillOpacity="0.85"/>
      <text x="100" y="78" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="system-ui">SAP</text>
      {/* Surrounding hexagons */}
      {[
        [100, 20, "BTP"],
        [134, 38, "FI"],
        [134, 75, "MM"],
        [100, 93, "SD"],
        [66,  75, "HR"],
        [66,  38, "PP"],
      ].map(([cx, cy, label], i) => (
        <g key={i}>
          <line x1={100} y1={[55,65,85,95,85,65][i]} x2={cx as number} y2={[20,38,75,93,75,38][i] + (i < 3 ? 10 : -10)}
            stroke="white" strokeOpacity="0.2" strokeWidth="1.5"/>
          <polygon
            points={`${cx},${(cy as number)-16} ${cx as number+14},${(cy as number)-8} ${cx as number+14},${cy as number+8} ${cx},${(cy as number)+16} ${cx as number-14},${cy as number+8} ${cx as number-14},${(cy as number)-8}`}
            fill="white" fillOpacity="0.07" stroke="white" strokeOpacity="0.25" strokeWidth="1"/>
          <text x={cx} y={(cy as number)+4} textAnchor="middle" fill="white" fontSize="8" fontWeight="600" fontFamily="system-ui" fillOpacity="0.7">{label}</text>
        </g>
      ))}
      {/* Bottom integration arrow */}
      <path d="M72 120 Q100 110 128 120" stroke="#E8231A" strokeOpacity="0.5" strokeWidth="1.5" fill="none" strokeDasharray="4 3"/>
      <path d="M70 128 L100 118 L130 128" stroke="white" strokeOpacity="0.2" strokeWidth="1" fill="none"/>
      <text x="100" y="145" textAnchor="middle" fill="white" fontSize="7" fontFamily="system-ui" fillOpacity="0.4" letterSpacing="2">INTEGRATION</text>
    </svg>
  );
}

function DeliveryIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Globe */}
      <circle cx="100" cy="80" r="52" stroke="white" strokeOpacity="0.15" strokeWidth="1.5"/>
      <circle cx="100" cy="80" r="52" stroke="white" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 6"/>
      {/* Latitude lines */}
      <ellipse cx="100" cy="80" rx="52" ry="20" stroke="white" strokeOpacity="0.12" strokeWidth="1"/>
      <ellipse cx="100" cy="62" rx="44" ry="10" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>
      <ellipse cx="100" cy="98" rx="44" ry="10" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>
      {/* Vertical axis */}
      <line x1="100" y1="28" x2="100" y2="132" stroke="white" strokeOpacity="0.12" strokeWidth="1"/>
      {/* City markers */}
      <circle cx="78"  cy="68" r="5" fill="#E8231A" fillOpacity="0.9"/>
      <circle cx="122" cy="75" r="5" fill="#E8231A" fillOpacity="0.9"/>
      {/* Connection arc between cities */}
      <path d="M78 68 Q100 42 122 75" stroke="#E8231A" strokeWidth="2" strokeOpacity="0.7" fill="none" strokeDasharray="5 3"/>
      {/* Plane icon on the arc */}
      <circle cx="100" cy="52" r="4" fill="white" fillOpacity="0.9"/>
      {/* City labels */}
      <text x="72" y="85" textAnchor="middle" fill="white" fontSize="7" fontFamily="system-ui" fillOpacity="0.6">Paris</text>
      <text x="128" y="92" textAnchor="middle" fill="white" fontSize="7" fontFamily="system-ui" fillOpacity="0.6">Casablanca</text>
      {/* Pulse rings */}
      <circle cx="78"  cy="68" r="10" stroke="#E8231A" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 2"/>
      <circle cx="122" cy="75" r="10" stroke="#E8231A" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 2"/>
    </svg>
  );
}

const serviceIllustrations: Record<string, React.ReactNode> = {
  data:            <DataIllustration />,
  ai:              <AIIllustration />,
  cloud:           <CloudIllustration />,
  sap:             <SAPIllustration />,
  "delivery-center": <DeliveryIllustration />,
};

const bgColors: Record<string, string> = {
  data:              "#1B2B5E",
  ai:                "#0F1A3A",
  cloud:             "#1B2B5E",
  sap:               "#0F1A3A",
  "delivery-center": "#1B2B5E",
};

export default function ServicesPage() {
  const { lang } = useLanguage();
  const p = t[lang].servicesPage;

  return (
    <>
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative bg-[#1B2B5E] overflow-hidden px-6 py-28">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#2C3E7A] opacity-40 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl">
            <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/20 bg-white/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#E8231A]" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">{p.badge}</span>
            </div>
            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white leading-[1.1]">
              {p.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#E8231A]">{p.title.split(" ").slice(-1)}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">{p.sub}</p>
          </div>
        </section>

        {/* Services list */}
        <section className="bg-[#EEF1F8] px-6 py-20">
          <div className="mx-auto max-w-7xl space-y-8">
            {p.items.map((s) => (
              <div
                key={s.slug}
                className="rounded-2xl bg-white shadow-sm overflow-hidden flex flex-col md:flex-row border border-slate-100 hover:border-[#E8231A]/20 hover:shadow-md transition-all group"
              >
                {/* Illustration panel */}
                <div
                  className="md:w-64 shrink-0 flex items-center justify-center p-8 min-h-[180px]"
                  style={{ backgroundColor: bgColors[s.slug] ?? "#1B2B5E" }}
                >
                  <div className="w-full max-w-[180px] aspect-[5/4]">
                    {serviceIllustrations[s.slug]}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A] mb-1">{s.tagline}</p>
                    <h2 className="text-2xl font-bold text-[#1B2B5E] group-hover:text-[#E8231A] transition-colors">{s.title}</h2>
                    <p className="mt-4 text-slate-600 leading-7">{s.desc}</p>
                    <ul className="mt-6 grid grid-cols-2 gap-2">
                      {s.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-[#1B2B5E]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#E8231A] shrink-0" />{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-[#1B2B5E] px-5 py-2 text-sm font-semibold text-[#1B2B5E] hover:bg-[#1B2B5E] hover:text-white transition-colors"
                    >
                      {p.learnMore}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1B2B5E] px-6 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold text-white">{p.ctaTitle}</h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">{p.ctaSub}</p>
            <a href="/contact" className="mt-8 inline-block rounded-xl bg-[#E8231A] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#C41C14] transition-colors">
              {p.ctaBtn}
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
