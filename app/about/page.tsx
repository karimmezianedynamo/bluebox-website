"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/LanguageContext";

const content = {
  en: {
    badge: "About BlueBox",
    title: "Born from the field.",
    titleRed: "Built for impact.",
    sub: "BlueBox was not founded in a boardroom. It was born from two consultants who spent years in the trenches of enterprise transformation — and decided it was time to do it better.",

    founders: {
      tag: "The Founders",
      title: "Two complementary visions. One shared ambition.",
      intro: "BlueBox was co-founded in 2018 by two senior consultants who met on a large-scale data transformation project for a European financial institution. Their complementary expertise — one deeply rooted in Data, the other in SAP — gave birth to a firm built on execution, trust and long-term client value.",
      profiles: [
        {
          initials: "Co-founder",
          role: "Co-founder & Chief Data Officer",
          expertise: "Data & Analytics",
          bio: "With 12 years designing and delivering data platforms for Tier-1 banks, insurers and retailers across France, Belgium and Morocco, our CDO is a recognized expert in data architecture, BI transformation and the industrialisation of analytics. His conviction: data is only valuable when it drives decisions — not when it sits in dashboards nobody reads.",
          tags: ["Data Strategy", "Lakehouse Architecture", "Business Intelligence", "DataOps"],
        },
        {
          initials: "Co-founder",
          role: "Co-founder & Chief SAP Officer",
          expertise: "SAP & Business Transformation",
          bio: "Having led over 20 SAP transformation programmes across manufacturing, retail and public sector before co-founding BlueBox, our CSO brings a rare combination of deep functional knowledge across FI, MM and SD modules with a track record of delivering complex S/4HANA migrations on time and on budget. His belief: technology is only as good as the process it supports.",
          tags: ["S/4HANA Migration", "SAP BTP", "Business Process Re-engineering", "ERP Governance"],
        },
      ],
    },

    timeline: {
      tag: "Our Journey",
      title: "Seven years of intentional growth",
      sub: "From a two-person boutique to a multi-practice firm with offices in Paris and Casablanca — every step was deliberate.",
      steps: [
        {
          year: "2018",
          label: "Foundation",
          title: "BlueBox is born",
          body: "Alexandre and Sofiane co-found BlueBox in Paris with a clear mandate: build a consulting firm that actually delivers. First office opened in the 8th arrondissement. First two clients signed within 30 days.",
          accent: true,
        },
        {
          year: "2019",
          label: "Data Practice",
          title: "Launching our Data offering",
          body: "BlueBox formalises its Data practice with a dedicated team of data engineers, BI developers and data architects. First large-scale data platform project delivered for a French Tier-1 bank. The team grows to 15 consultants.",
          accent: false,
        },
        {
          year: "2020",
          label: "SAP Practice",
          title: "Expanding into SAP transformation",
          body: "Two years after founding, BlueBox launches its SAP practice — combining Sofiane's deep expertise with new senior hires from Big Four firms. First S/4HANA Greenfield migration delivered in 11 months for a retail group.",
          accent: false,
        },
        {
          year: "2022",
          label: "Casablanca",
          title: "Opening our Delivery Center",
          body: "BlueBox opens its nearshore Delivery Center in Casablanca, Morocco — creating a hub of senior engineers operating in full European timezone alignment. The center enables faster staffing, higher quality delivery and competitive pricing for clients.",
          accent: false,
        },
        {
          year: "2023",
          label: "AI Practice",
          title: "Embracing the AI era",
          body: "BlueBox launches its AI practice, combining machine learning expertise with GenAI capabilities. First enterprise LLM deployment delivered for a logistics group. The firm hires AI specialists from leading research institutions and cloud providers.",
          accent: true,
        },
        {
          year: "2024",
          label: "Cloud Practice",
          title: "Full-stack cloud expertise",
          body: "Cloud becomes BlueBox's fourth practice — formalising years of cloud delivery work across AWS, Azure and GCP. Platform engineering, FinOps and cloud security now available as standalone offerings.",
          accent: false,
        },
        {
          year: "2026",
          label: "Today",
          title: "60+ experts. Two continents. One mission.",
          body: "BlueBox today employs over 60 senior consultants across Paris and Casablanca. We operate across four practices — Data, AI, Cloud and SAP — and serve clients ranging from mid-market companies to CAC 40 groups across Europe and North Africa.",
          accent: true,
        },
      ],
    },

    values: {
      tag: "What We Stand For",
      title: "The principles that never change",
      items: [
        { icon: "⚡", title: "Execution over slides", body: "We are a delivery firm. Every engagement ends with something in production, not a recommendation deck." },
        { icon: "🤝", title: "Partnership over transactions", body: "Our client relationships average 3+ years. We measure our success by the outcomes our clients achieve — not the hours we bill." },
        { icon: "🎯", title: "Expertise over generalism", body: "We hire the best specialists in their domain. We don't believe in consultants who do everything — we believe in teams that master their craft." },
        { icon: "🌍", title: "Proximity over offshore", body: "Our Casablanca center is not a cost-cutting exercise — it's a proximity model. Same timezone, same culture, same quality standards." },
      ],
    },

    cta: {
      title: "Want to build something together?",
      sub: "Whether you're looking for a long-term partner or a specific project, let's start with a conversation.",
      btn: "Get in Touch",
    },
  },

  fr: {
    badge: "À propos de BlueBox",
    title: "Née du terrain.",
    titleRed: "Construite pour l'impact.",
    sub: "BlueBox n'a pas été fondée dans une salle de conseil d'administration. Elle est née de deux consultants qui ont passé des années dans les tranchées de la transformation d'entreprise — et ont décidé qu'il était temps de faire mieux.",

    founders: {
      tag: "Les Fondateurs",
      title: "Deux visions complémentaires. Une ambition commune.",
      intro: "BlueBox a été co-fondée en 2018 par deux consultants seniors qui se sont rencontrés sur un projet de transformation data à grande échelle pour une institution financière européenne. Leur expertise complémentaire — l'un profondément ancré dans la Data, l'autre dans SAP — a donné naissance à une société construite sur l'exécution, la confiance et la création de valeur durable pour ses clients.",
      profiles: [
        {
          initials: "Co-fondateur",
          role: "Co-fondateur & Chief Data Officer",
          expertise: "Data & Analytics",
          bio: "Fort de 12 ans à concevoir et livrer des plateformes data pour des banques, assureurs et retailers de premier rang en France, Belgique et Maroc, notre CDO est un expert reconnu en architecture data, transformation BI et industrialisation de l'analytics. Sa conviction : la donnée n'a de valeur que lorsqu'elle oriente les décisions — pas quand elle dort dans des dashboards que personne ne lit.",
          tags: ["Stratégie Data", "Architecture Lakehouse", "Business Intelligence", "DataOps"],
        },
        {
          initials: "Co-fondateur",
          role: "Co-fondateur & Chief SAP Officer",
          expertise: "SAP & Transformation Métier",
          bio: "Ayant dirigé plus de 20 programmes de transformation SAP dans les secteurs industriel, retail et public avant de co-fonder BlueBox, notre CSO combine une connaissance fonctionnelle approfondie des modules FI, MM et SD avec un track record de migrations S/4HANA livrées dans les délais et les budgets. Sa conviction : la technologie n'est aussi bonne que le processus qu'elle supporte.",
          tags: ["Migration S/4HANA", "SAP BTP", "Réingénierie des Processus", "Gouvernance ERP"],
        },
      ],
    },

    timeline: {
      tag: "Notre Parcours",
      title: "Sept ans de croissance intentionnelle",
      sub: "D'un cabinet à deux personnes à une société multi-pratiques avec des bureaux à Paris et Casablanca — chaque étape a été délibérée.",
      steps: [
        {
          year: "2018",
          label: "Création",
          title: "BlueBox voit le jour",
          body: "Alexandre et Sofiane co-fondent BlueBox à Paris avec un mandat clair : construire un cabinet de conseil qui délivre vraiment. Premier bureau ouvert dans le 8ème arrondissement. Deux premiers clients signés en 30 jours.",
          accent: true,
        },
        {
          year: "2019",
          label: "Offre Data",
          title: "Lancement de la pratique Data",
          body: "BlueBox formalise sa pratique Data avec une équipe dédiée d'ingénieurs data, développeurs BI et architectes. Premier projet de plateforme data à grande échelle livré pour une banque française de premier rang. L'équipe passe à 15 consultants.",
          accent: false,
        },
        {
          year: "2020",
          label: "Offre SAP",
          title: "Extension à la transformation SAP",
          body: "Deux ans après la fondation, BlueBox lance sa pratique SAP — combinant l'expertise de Sofiane avec de nouveaux recrutements seniors issus des Big Four. Première migration S/4HANA Greenfield livrée en 11 mois pour un groupe retail.",
          accent: false,
        },
        {
          year: "2022",
          label: "Casablanca",
          title: "Ouverture du Centre de Service",
          body: "BlueBox ouvre son Centre de Service nearshore à Casablanca, Maroc — créant un hub d'ingénieurs seniors opérant en parfait alignement avec les fuseaux horaires européens. Le centre permet un staffing plus rapide, une meilleure qualité de delivery et des tarifs compétitifs.",
          accent: false,
        },
        {
          year: "2023",
          label: "Offre IA",
          title: "L'ère de l'IA",
          body: "BlueBox lance sa pratique IA, combinant expertise machine learning et capacités GenAI. Premier déploiement LLM en entreprise livré pour un groupe logistique. Le cabinet recrute des spécialistes IA issus d'institutions de recherche et de cloud providers.",
          accent: true,
        },
        {
          year: "2024",
          label: "Offre Cloud",
          title: "Expertise cloud complète",
          body: "Le Cloud devient la quatrième pratique de BlueBox — formalisant des années de delivery cloud sur AWS, Azure et GCP. Platform engineering, FinOps et sécurité cloud disponibles en offres autonomes.",
          accent: false,
        },
        {
          year: "2026",
          label: "Aujourd'hui",
          title: "60+ experts. Deux continents. Une mission.",
          body: "BlueBox emploie aujourd'hui plus de 60 consultants seniors entre Paris et Casablanca. Nous opérons sur quatre pratiques — Data, IA, Cloud et SAP — et accompagnons des clients allant des ETI aux groupes du CAC 40 en Europe et en Afrique du Nord.",
          accent: true,
        },
      ],
    },

    values: {
      tag: "Ce en Quoi Nous Croyons",
      title: "Les principes qui ne changent jamais",
      items: [
        { icon: "⚡", title: "L'exécution avant les slides", body: "Nous sommes un cabinet de delivery. Chaque mission se conclut par quelque chose en production, pas par un deck de recommandations." },
        { icon: "🤝", title: "Le partenariat avant les transactions", body: "Nos relations clients durent en moyenne 3+ ans. Nous mesurons notre succès aux résultats que nos clients obtiennent — pas aux heures que nous facturons." },
        { icon: "🎯", title: "L'expertise avant le généralisme", body: "Nous recrutons les meilleurs spécialistes dans leur domaine. Nous ne croyons pas aux consultants qui font tout — nous croyons aux équipes qui maîtrisent leur métier." },
        { icon: "🌍", title: "La proximité avant l'offshore", body: "Notre centre de Casablanca n'est pas un exercice de réduction des coûts — c'est un modèle de proximité. Même fuseau horaire, même culture, mêmes standards qualité." },
      ],
    },

    cta: {
      title: "Vous voulez construire quelque chose ensemble ?",
      sub: "Que vous cherchiez un partenaire long terme ou un projet spécifique, commençons par une conversation.",
      btn: "Nous contacter",
    },
  },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const p = content[lang];

  return (
    <>
      <Header />
      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────── */}
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
          </div>
        </section>

        {/* ── Founders ─────────────────────────────────── */}
        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A] mb-3">{p.founders.tag}</p>
            <h2 className="text-3xl font-bold text-[#1B2B5E] mb-4">{p.founders.title}</h2>
            <p className="text-slate-600 max-w-3xl leading-relaxed mb-14">{p.founders.intro}</p>

            <div className="grid gap-8 md:grid-cols-2">
              {p.founders.profiles.map((founder, i) => (
                <div key={founder.role}
                  className={`rounded-2xl p-10 border-2 flex flex-col gap-6 ${
                    i === 0
                      ? "border-[#1B2B5E]/10 bg-[#EEF1F8]"
                      : "border-[#E8231A]/10 bg-white shadow-sm"
                  }`}>
                  {/* Avatar + name */}
                  <div className="flex items-center gap-5">
                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-black text-white shrink-0 ${
                      i === 0 ? "bg-[#1B2B5E]" : "bg-[#E8231A]"
                    }`}>
                      {founder.initials}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#1B2B5E]">{founder.role}</p>
                      <p className="text-sm font-semibold text-[#E8231A]">{founder.role}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{founder.expertise}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-slate-600 leading-7">{founder.bio}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                    {founder.tags.map((tag) => (
                      <span key={tag}
                        className="rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-[#1B2B5E]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Vertical timeline ────────────────────────── */}
        <section className="bg-[#EEF1F8] px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A] mb-3">{p.timeline.tag}</p>
            <h2 className="text-3xl font-bold text-[#1B2B5E] mb-4">{p.timeline.title}</h2>
            <p className="text-slate-600 max-w-2xl mb-16">{p.timeline.sub}</p>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical spine */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#1B2B5E] via-[#E8231A]/60 to-[#1B2B5E]/20" />

              <div className="space-y-0">
                {p.timeline.steps.map((step, i) => (
                  <div key={step.year} className="relative flex gap-8 pb-12 last:pb-0">

                    {/* Node on the spine */}
                    <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: "48px" }}>
                      <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#EEF1F8] shadow-md transition-all ${
                        step.accent
                          ? "bg-[#E8231A]"
                          : "bg-[#1B2B5E]"
                      }`}>
                        <span className="text-xs font-black text-white leading-none">{step.year.slice(2)}</span>
                      </div>
                    </div>

                    {/* Card */}
                    <div className={`flex-1 rounded-2xl p-7 shadow-sm border transition-all hover:shadow-md mb-4 ${
                      step.accent
                        ? "bg-white border-[#E8231A]/20"
                        : "bg-white border-slate-100"
                    }`}>
                      {/* Year + label */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-2xl font-black ${step.accent ? "text-[#E8231A]" : "text-[#1B2B5E]"}`}>
                          {step.year}
                        </span>
                        <span className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-widest ${
                          step.accent
                            ? "bg-[#E8231A]/10 text-[#E8231A]"
                            : "bg-[#EEF1F8] text-[#1B2B5E]"
                        }`}>
                          {step.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1B2B5E] mb-3">{step.title}</h3>
                      <p className="text-sm text-slate-600 leading-7">{step.body}</p>

                      {/* Connector to next item */}
                      {i < p.timeline.steps.length - 1 && (
                        <div className="mt-5 flex items-center gap-2">
                          <div className="h-px flex-1 bg-slate-200" />
                          <span className="text-slate-300 text-xs">▼</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────── */}
        <section className="bg-[#1B2B5E] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A] mb-3">{p.values.tag}</p>
            <h2 className="text-3xl font-bold text-white mb-14">{p.values.title}</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {p.values.items.map((v) => (
                <div key={v.title}
                  className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-sm text-white/60 leading-7">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold text-[#1B2B5E]">{p.cta.title}</h2>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto">{p.cta.sub}</p>
            <a href="/contact"
              className="mt-8 inline-block rounded-full bg-[#E8231A] px-10 py-4 text-sm font-bold text-white hover:bg-[#C41C14] transition-colors shadow-lg shadow-red-100">
              {p.cta.btn}
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
