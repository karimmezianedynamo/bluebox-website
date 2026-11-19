import type { ModuleMeta } from "./types";

export const MODULES: ModuleMeta[] = [
  { id: "m1", slug: "fondamentaux", title: "Fondamentaux SAP Ariba & Procurement", short: "Fondamentaux", icon: "◈", weeks: [1], color: "bg-sky-500",
    description: "Panorama de la suite SAP Ariba, positionnement dans le paysage SAP (S/4HANA, Business Network), architecture cloud, rôles et vocabulaire achats." },
  { id: "m2", slug: "p2p", title: "Procure-to-Pay (Buying & Invoicing)", short: "P2P", icon: "▣", weeks: [1, 2], color: "bg-indigo-500",
    description: "Demande d'achat, approbations, bons de commande, réception, facturation, rapprochement et paiement dans Ariba Buying & Invoicing et Guided Buying." },
  { id: "m3", slug: "sourcing", title: "Sourcing stratégique", short: "Sourcing", icon: "◎", weeks: [2, 3], color: "bg-violet-500",
    description: "Projets de sourcing, événements, enchères, bibliothèque de documents, équipes projet et suivi des économies." },
  { id: "m4", slug: "rfi-rfq", title: "RFI, RFP & RFQ", short: "RFI/RFQ", icon: "◇", weeks: [3], color: "bg-fuchsia-500",
    description: "Construire, publier et dépouiller des appels d'offres : questionnaires, grilles de notation, scénarios d'attribution." },
  { id: "m5", slug: "contrats-slp", title: "Contrats (CLM) & SLP", short: "Contrats & SLP", icon: "▤", weeks: [4], color: "bg-rose-500",
    description: "Gestion du cycle de vie des contrats, clauses, workflow de signature ; Supplier Lifecycle & Performance : enregistrement, qualification, risque." },
  { id: "m6", slug: "ariba-network", title: "Ariba Network / SAP Business Network", short: "Ariba Network", icon: "◉", weeks: [5], color: "bg-amber-500",
    description: "Comptes fournisseurs, enablement, flux PO/ASN/facture, règles de transaction, portail fournisseur et onboarding." },
  { id: "m7", slug: "catalogues", title: "Catalogues & Guided Buying", short: "Catalogues", icon: "▦", weeks: [5], color: "bg-lime-600",
    description: "Catalogues CIF et PunchOut, cXML, gestion de contenu, vues de catalogue, politiques Guided Buying." },
  { id: "m8", slug: "integration", title: "Intégration S/4HANA, CIG & cXML", short: "Intégration", icon: "⬡", weeks: [6, 7], color: "bg-teal-600",
    description: "Données de base, flux transactionnels, Cloud Integration Gateway, mappings, cXML, monitoring et résolution d'erreurs." },
  { id: "m9", slug: "administration", title: "Administration Ariba", short: "Administration", icon: "⚙", weeks: [7], color: "bg-slate-600",
    description: "Utilisateurs et groupes, flux d'approbation, champs personnalisés, imports de données, paramétrage et support." },
  { id: "m10", slug: "certification", title: "Préparation certification & cas final", short: "Certification", icon: "★", weeks: [8], color: "bg-[#E8231A]",
    description: "Révisions structurées, examen blanc, cas final intégration + configuration et synthèse de préparation." },
];

export const MODULE_BY_ID: Record<string, ModuleMeta> = Object.fromEntries(MODULES.map((m) => [m.id, m]));

export const LEVEL_LABEL: Record<string, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

export const KIND_LABEL: Record<string, string> = {
  lecon: "Leçon",
  exercice: "Exercice",
  simulation: "Simulation métier",
  quiz: "Quiz",
  cas: "Cas pratique",
};

/** Titre de chaque journée : [semaine][jour] */
export const DAY_TITLES: Record<string, string> = {
  "1-1": "Découvrir l'écosystème SAP Ariba",
  "1-2": "Architecture, rôles et vocabulaire",
  "1-3": "La demande d'achat et Guided Buying",
  "1-4": "Approbations et bon de commande",
  "1-5": "Réception et bilan de la semaine",
  "2-1": "Facturation et rapprochement",
  "2-2": "Exceptions, paiement et reporting P2P",
  "2-3": "Simulation : déployer un flux P2P",
  "2-4": "Projets de sourcing : fondations",
  "2-5": "Événements de sourcing et enchères",
  "3-1": "Pilotage d'un projet de sourcing",
  "3-2": "Suivi des économies et bonnes pratiques",
  "3-3": "Concevoir un RFI",
  "3-4": "RFP/RFQ : grilles de notation",
  "3-5": "Dépouillement et attribution",
  "4-1": "Contrats : espace de travail et clauses",
  "4-2": "Workflow contractuel et signature",
  "4-3": "Contrats opérationnels et conformité",
  "4-4": "SLP : enregistrement et qualification",
  "4-5": "SLP : performance et risque fournisseur",
  "5-1": "Ariba Network : fondamentaux",
  "5-2": "Flux documentaires et règles de transaction",
  "5-3": "Enablement fournisseurs",
  "5-4": "Catalogues CIF et PunchOut",
  "5-5": "Guided Buying et gouvernance des catalogues",
  "6-1": "Architecture d'intégration S/4HANA",
  "6-2": "Données de base et réplication",
  "6-3": "Cloud Integration Gateway (CIG)",
  "6-4": "Flux transactionnels PO et facture",
  "6-5": "Mappings et paramétrage CIG",
  "7-1": "cXML en profondeur",
  "7-2": "Monitoring et résolution d'erreurs",
  "7-3": "Administration : utilisateurs et groupes",
  "7-4": "Flux d'approbation et champs personnalisés",
  "7-5": "Imports de données et support",
  "8-1": "Révision générale : P2P, Sourcing, Contrats",
  "8-2": "Révision générale : Network, Intégration, Admin",
  "8-3": "Cas final : conception",
  "8-4": "Cas final : configuration et intégration",
  "8-5": "Examen blanc et synthèse",
};

export const WEEK_THEMES: Record<number, string> = {
  1: "Fondamentaux et démarrage du P2P",
  2: "P2P avancé et introduction au Sourcing",
  3: "Sourcing, RFI, RFP et RFQ",
  4: "Contrats et cycle de vie fournisseur",
  5: "Ariba Network et Catalogues",
  6: "Intégration S/4HANA et CIG",
  7: "cXML, monitoring et Administration",
  8: "Certification et cas final",
};
