"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/LanguageContext";

const content = {
  en: {
    badge: "Our Services — Delivery Center",
    title: "Senior engineering talent,",
    titleRed: "delivered from proximity.",
    sub: "BlueBox's Delivery Center combines the strategic proximity of a European partner with the talent density and cost efficiency of Morocco's leading tech hub — giving your projects the best of both worlds.",
    ctaBtn: "Talk to Our Team",
    allServices: "All Services",

    pillars: [
      {
        icon: "📍",
        title: "Strategic Proximity",
        sub: "Same timezone. Same culture. Zero friction.",
        body: "Our Delivery Center is based in Casablanca — a 2-hour flight from Paris, within CET/CEST working hours and aligned with European business culture. Daily standups, sprint reviews and escalations happen in real time, not across a 6-hour lag. No project management overhead. No cultural misalignment. Just seamless collaboration.",
        stats: [
          { value: "2h", label: "Flight from Paris" },
          { value: "0–1h", label: "Time zone difference" },
          { value: "5 days", label: "Avg. onboarding time" },
        ],
      },
      {
        icon: "🏆",
        title: "Senior Engineering Excellence",
        sub: "We hire the top 5%. You get the results.",
        body: "BlueBox engineers are not freelancers sourced from a marketplace. They are permanent, senior consultants — vetted through a rigorous multi-stage selection process. Our teams hold certifications from AWS, Azure, Databricks, SAP and more. They work exclusively on client projects with full accountability, embedded in your delivery culture.",
        stats: [
          { value: "Top 5%", label: "Talent selection rate" },
          { value: "6+ yrs", label: "Avg. seniority level" },
          { value: "98%", label: "Sprint commitment rate" },
        ],
      },
      {
        icon: "💶",
        title: "Compelling Cost Efficiency",
        sub: "Up to 50% savings vs. Western European rates.",
        body: "Our Delivery Center model allows you to staff high-calibre engineering teams at a fraction of the cost of equivalent profiles in France, Germany or the UK — without compromising on quality, communication or accountability. Transparent, all-inclusive daily rates. No hidden fees, no surprise invoices.",
        stats: [
          { value: "–40/50%", label: "vs. Western European rates" },
          { value: "All-in", label: "Transparent pricing" },
          { value: "Flex", label: "Scale up or down in days" },
        ],
      },
      {
        icon: "🔒",
        title: "Governance & Security",
        sub: "Your IP stays yours. Always.",
        body: "All BlueBox engineers sign comprehensive NDAs and IP assignment agreements. Our security posture is aligned with ISO 27001 standards. We operate on your tooling (Jira, Confluence, GitHub, etc.), within your security perimeter. Dedicated project managers provide weekly reporting and full transparency on deliverables.",
        stats: [
          { value: "ISO", label: "27001-aligned practices" },
          { value: "100%", label: "IP ownership retained" },
          { value: "Weekly", label: "Reporting & governance" },
        ],
      },
    ],

    profiles: {
      tag: "Engineering Profiles",
      title: "The expertise you need, when you need it",
      sub: "From individual contributors to full squads, we staff the right profiles for your project — with a typical time-to-onboard of 5 business days.",
      items: [
        { role: "Data Engineer", skills: ["Spark", "dbt", "Airflow", "Kafka", "SQL"] },
        { role: "AI / ML Engineer", skills: ["Python", "PyTorch", "LangChain", "MLflow", "Hugging Face"] },
        { role: "Cloud / DevOps Engineer", skills: ["Terraform", "Kubernetes", "AWS", "Azure", "GitHub Actions"] },
        { role: "SAP Technical Consultant", skills: ["ABAP", "SAP BTP", "Fiori", "SAPUI5", "Integration Suite"] },
        { role: "Full-Stack Developer", skills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"] },
        { role: "Tech Lead / Architect", skills: ["System Design", "DDD", "API Design", "Security", "Mentoring"] },
      ],
    },

    models: {
      tag: "Engagement Models",
      title: "A model that fits your needs",
      sub: "Whether you need a single expert or a full product squad, we adapt to your delivery context.",
      items: [
        {
          name: "Staff Augmentation",
          desc: "One or several BlueBox engineers embedded in your team. You manage the work, we handle HR, payroll and career development. Minimum 3-month engagement.",
          ideal: "Ideal for: teams lacking specific skills, ongoing development capacity",
        },
        {
          name: "Managed Squad",
          desc: "A complete, autonomous delivery team — tech lead, engineers, QA — managed by BlueBox. We commit to deliverables and velocity. You focus on the roadmap.",
          ideal: "Ideal for: product development, platform engineering, dedicated workstreams",
        },
        {
          name: "Project-Based",
          desc: "A fixed-scope engagement with defined deliverables, timeline and budget. Full accountability on our side — we guarantee the outcome, not just the effort.",
          ideal: "Ideal for: well-defined migrations, integrations, PoCs, MVP builds",
        },
      ],
    },

    process: {
      tag: "How It Works",
      title: "From brief to delivery in 5 days",
      steps: [
        { n: "01", title: "Discovery Call", desc: "We understand your technical needs, stack, culture and timeline." },
        { n: "02", title: "Profile Matching", desc: "Our talent team selects 2–3 pre-vetted candidates matching your requirements." },
        { n: "03", title: "Technical Interview", desc: "You interview and validate the profiles. We guarantee a fit or we replace." },
        { n: "04", title: "Onboarding", desc: "Contracts signed, tools access granted, team ceremonies joined — in 5 business days." },
        { n: "05", title: "Delivery & Reporting", desc: "Weekly reporting, dedicated PM support and quarterly business reviews included." },
      ],
    },

    ctaTitle: "Ready to build your high-performance nearshore team?",
    ctaSub: "Let's talk about your project, your stack and your timeline. We'll propose a tailored team within 48 hours.",
    ctaContact: "Request a Team",
  },

  fr: {
    badge: "Nos Services — Centre de Service",
    title: "Des ingénieurs seniors,",
    titleRed: "livrés en proximité.",
    sub: "Le Centre de Service BlueBox combine la proximité stratégique d'un partenaire européen avec la densité de talents et l'efficacité économique du premier hub tech du Maroc — le meilleur des deux mondes pour vos projets.",
    ctaBtn: "Parler à notre équipe",
    allServices: "Tous les services",

    pillars: [
      {
        icon: "📍",
        title: "Proximité Stratégique",
        sub: "Même fuseau horaire. Même culture. Zéro friction.",
        body: "Notre Centre de Service est basé à Casablanca — à 2h de Paris, dans les mêmes heures de travail CET/CEST et aligné avec la culture business européenne. Daily standups, sprint reviews et escalades se font en temps réel, sans décalage de 6 heures. Aucun overhead de coordination. Aucun désalignement culturel. Une collaboration fluide.",
        stats: [
          { value: "2h", label: "De vol depuis Paris" },
          { value: "0–1h", label: "Décalage horaire" },
          { value: "5 jours", label: "Délai d'onboarding moyen" },
        ],
      },
      {
        icon: "🏆",
        title: "Excellence Technique Senior",
        sub: "Nous recrutons le top 5%. Vous bénéficiez des résultats.",
        body: "Les ingénieurs BlueBox ne sont pas des freelances issus d'une marketplace. Ce sont des consultants seniors permanents, sélectionnés via un processus rigoureux en plusieurs étapes. Nos équipes sont certifiées AWS, Azure, Databricks, SAP et plus. Ils travaillent exclusivement sur des projets clients avec une pleine accountability, intégrés dans votre culture delivery.",
        stats: [
          { value: "Top 5%", label: "Taux de sélection des talents" },
          { value: "6+ ans", label: "Séniorité moyenne" },
          { value: "98%", label: "Taux d'engagement sprint" },
        ],
      },
      {
        icon: "💶",
        title: "Compétitivité Économique",
        sub: "Jusqu'à 50% d'économies vs. les tarifs Europe de l'Ouest.",
        body: "Notre modèle Centre de Service vous permet de constituer des équipes d'ingénierie de haut niveau à un coût nettement inférieur à celui de profils équivalents en France, en Allemagne ou au Royaume-Uni — sans compromis sur la qualité, la communication ou l'accountability. Tarifs journaliers all-inclusive et transparents. Aucun frais caché.",
        stats: [
          { value: "–40/50%", label: "vs. tarifs Europe de l'Ouest" },
          { value: "All-in", label: "Tarification transparente" },
          { value: "Flex", label: "Scale en quelques jours" },
        ],
      },
      {
        icon: "🔒",
        title: "Gouvernance & Sécurité",
        sub: "Votre propriété intellectuelle vous appartient. Toujours.",
        body: "Tous les ingénieurs BlueBox signent des NDA complets et des accords de cession de droits. Notre posture sécurité est alignée sur les standards ISO 27001. Nous opérons sur vos outils (Jira, Confluence, GitHub, etc.), dans votre périmètre de sécurité. Des chefs de projet dédiés assurent un reporting hebdomadaire et une transparence totale.",
        stats: [
          { value: "ISO", label: "Pratiques alignées 27001" },
          { value: "100%", label: "PI conservée côté client" },
          { value: "Hebdo", label: "Reporting & gouvernance" },
        ],
      },
    ],

    profiles: {
      tag: "Profils d'Ingénierie",
      title: "L'expertise dont vous avez besoin, quand vous en avez besoin",
      sub: "Du contributeur individuel à la squad complète, nous staffons les bons profils pour votre projet — avec un délai d'onboarding moyen de 5 jours ouvrés.",
      items: [
        { role: "Ingénieur Data", skills: ["Spark", "dbt", "Airflow", "Kafka", "SQL"] },
        { role: "Ingénieur IA / ML", skills: ["Python", "PyTorch", "LangChain", "MLflow", "Hugging Face"] },
        { role: "Ingénieur Cloud / DevOps", skills: ["Terraform", "Kubernetes", "AWS", "Azure", "GitHub Actions"] },
        { role: "Consultant SAP Technique", skills: ["ABAP", "SAP BTP", "Fiori", "SAPUI5", "Integration Suite"] },
        { role: "Développeur Full-Stack", skills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"] },
        { role: "Tech Lead / Architecte", skills: ["System Design", "DDD", "API Design", "Sécurité", "Mentoring"] },
      ],
    },

    models: {
      tag: "Modèles d'Engagement",
      title: "Un modèle adapté à vos besoins",
      sub: "Que vous ayez besoin d'un expert unique ou d'une squad produit complète, nous nous adaptons à votre contexte de delivery.",
      items: [
        {
          name: "Régie / Staff Augmentation",
          desc: "Un ou plusieurs ingénieurs BlueBox intégrés dans votre équipe. Vous pilotez les travaux, nous gérons les RH, la paie et le développement de carrière. Engagement minimum 3 mois.",
          ideal: "Idéal pour : équipes manquant de compétences spécifiques, capacité de développement continue",
        },
        {
          name: "Squad Managée",
          desc: "Une équipe de delivery complète et autonome — tech lead, ingénieurs, QA — pilotée par BlueBox. Nous nous engageons sur les livrables et la vélocité. Vous vous concentrez sur la roadmap.",
          ideal: "Idéal pour : développement produit, platform engineering, workstreams dédiés",
        },
        {
          name: "Forfait Projet",
          desc: "Un engagement à périmètre fixe avec des livrables, un calendrier et un budget définis. Full accountability de notre côté — nous garantissons le résultat, pas seulement les efforts.",
          ideal: "Idéal pour : migrations, intégrations, PoC, builds MVP bien définis",
        },
      ],
    },

    process: {
      tag: "Comment ça marche",
      title: "Du brief à la livraison en 5 jours",
      steps: [
        { n: "01", title: "Appel de Découverte", desc: "Nous comprenons vos besoins techniques, votre stack, votre culture et votre calendrier." },
        { n: "02", title: "Matching de Profils", desc: "Notre équipe talent sélectionne 2 à 3 candidats pré-validés correspondant à vos exigences." },
        { n: "03", title: "Entretien Technique", desc: "Vous interviewez et validez les profils. Nous garantissons un match ou nous remplaçons." },
        { n: "04", title: "Onboarding", desc: "Contrats signés, accès outils accordés, cérémonies d'équipe rejointes — en 5 jours ouvrés." },
        { n: "05", title: "Delivery & Reporting", desc: "Reporting hebdomadaire, support d'un PM dédié et business reviews trimestriels inclus." },
      ],
    },

    ctaTitle: "Prêt à constituer votre équipe nearshore haute performance ?",
    ctaSub: "Parlons de votre projet, de votre stack et de votre calendrier. Nous vous proposons une équipe sur mesure sous 48 heures.",
    ctaContact: "Demander une Équipe",
  },
};

export default function DeliveryCenterPage() {
  const { lang } = useLanguage();
  const p = content[lang];

  return (
    <>
      <Header />
      <main className="flex-1">

        {/* ── Hero ───────────────────────────────────────── */}
        <section className="relative bg-[#1B2B5E] overflow-hidden px-6 py-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#2C3E7A] opacity-40" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#0F1A3A] opacity-60" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/20 bg-white/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#E8231A]" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">{p.badge}</span>
            </div>
            <h1 className="max-w-3xl text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              {p.title}<br />
              <span className="text-[#E8231A]">{p.titleRed}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-white/70 leading-relaxed">{p.sub}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="/contact"
                className="rounded-full bg-[#E8231A] px-8 py-3.5 text-sm font-bold text-white hover:bg-[#C41C14] transition-colors shadow-xl shadow-red-900/30">
                {p.ctaBtn}
              </a>
              <a href="/services"
                className="rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-8 py-3.5 text-sm font-bold text-white hover:bg-white/15 transition-colors">
                {p.allServices}
              </a>
            </div>
          </div>
        </section>

        {/* ── 4 Pillars ──────────────────────────────────── */}
        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2">
            {p.pillars.map((pillar, i) => (
              <div key={pillar.title}
                className={`rounded-2xl p-10 border transition-all hover:shadow-lg ${
                  i % 2 === 0 ? "bg-[#EEF1F8] border-transparent" : "bg-white border-slate-100"
                }`}>
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A] mb-1">{pillar.sub}</p>
                <h2 className="text-2xl font-bold text-[#1B2B5E] mb-4">{pillar.title}</h2>
                <p className="text-slate-600 leading-relaxed text-sm">{pillar.body}</p>
                <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                  {pillar.stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-2xl font-bold text-[#E8231A]">{s.value}</p>
                      <p className="mt-1 text-xs text-slate-500 leading-4">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Engineering Profiles ───────────────────────── */}
        <section className="bg-[#1B2B5E] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A] mb-3">{p.profiles.tag}</p>
            <h2 className="text-3xl font-bold text-white mb-4">{p.profiles.title}</h2>
            <p className="text-white/60 max-w-2xl mb-14">{p.profiles.sub}</p>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {p.profiles.items.map((profile) => (
                <div key={profile.role}
                  className="rounded-2xl bg-white/5 border border-white/10 p-7 hover:bg-white/10 hover:border-white/20 transition-all">
                  <h3 className="font-bold text-white text-lg mb-4">{profile.role}</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span key={skill}
                        className="rounded-full bg-[#E8231A]/15 border border-[#E8231A]/30 px-3 py-1 text-xs font-semibold text-white/80">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Engagement Models ──────────────────────────── */}
        <section className="bg-[#EEF1F8] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A] mb-3">{p.models.tag}</p>
            <h2 className="text-3xl font-bold text-[#1B2B5E] mb-4">{p.models.title}</h2>
            <p className="text-slate-600 max-w-2xl mb-14">{p.models.sub}</p>
            <div className="grid gap-6 md:grid-cols-3">
              {p.models.items.map((model, i) => (
                <div key={model.name}
                  className={`rounded-2xl p-8 border-2 flex flex-col ${
                    i === 1
                      ? "border-[#E8231A] bg-white shadow-xl shadow-red-100"
                      : "border-slate-200 bg-white"
                  }`}>
                  {i === 1 && (
                    <span className="self-start mb-4 rounded-full bg-[#E8231A] px-3 py-1 text-xs font-bold text-white uppercase tracking-widest">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-[#1B2B5E] mb-4">{model.name}</h3>
                  <p className="text-sm text-slate-600 leading-7 flex-1">{model.desc}</p>
                  <p className="mt-6 text-xs text-[#E8231A] font-semibold border-t border-slate-100 pt-4">{model.ideal}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ───────────────────────────────── */}
        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A] mb-3">{p.process.tag}</p>
            <h2 className="text-3xl font-bold text-[#1B2B5E] mb-14">{p.process.title}</h2>
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#E8231A]/30 to-transparent" />
              <div className="grid gap-6 md:grid-cols-5">
                {p.process.steps.map((step) => (
                  <div key={step.n} className="relative flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#1B2B5E] border-4 border-white shadow-lg mb-5">
                      <span className="text-sm font-bold text-[#E8231A]">{step.n}</span>
                    </div>
                    <h3 className="font-bold text-[#1B2B5E] mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-6">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────── */}
        <section className="bg-[#1B2B5E] px-6 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold text-white">{p.ctaTitle}</h2>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto text-lg">{p.ctaSub}</p>
            <a href="/contact"
              className="mt-10 inline-block rounded-full bg-[#E8231A] px-10 py-4 text-sm font-bold text-white hover:bg-[#C41C14] transition-colors shadow-xl shadow-red-900/30">
              {p.ctaContact}
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
