import type { ModuleContent } from "../types";

export const m4: ModuleContent = {
  moduleId: "m4",
  activities: [
    // ───────────── Semaine 3 · Jour 3 : Concevoir un RFI ─────────────
    {
      id: "m4-s3-j3-a1",
      moduleId: "m4",
      week: 3,
      day: 3,
      kind: "lecon",
      title: "Le RFI : qualifier le marché avant de consulter",
      level: "intermediaire",
      durationMin: 25,
      objective: "Savoir quand et comment construire un RFI efficace dans Ariba Sourcing : contenu, types de questions, pre-requisites et exploitation.",
      content: `## Le RFI dans la séquence de sourcing

Le **RFI (Request for Information)** est l'événement d'**exploration** : il ne demande pas de prix engageant mais des informations permettant de **qualifier** un panel, de **comprendre** une offre de marché ou de **préparer** le cahier des charges du RFP. Séquence type : RFI → RFP → (enchère) → attribution. Sauter le RFI sur un marché inconnu, c'est publier un RFP mal calibré que la moitié des fournisseurs ne comprendront pas.

> Règle de consultant : si vous ne savez pas combien de fournisseurs sont capables de répondre, commencez par un RFI.

## Construire le contenu

Le contenu d'un RFI est organisé en **sections** qui contiennent :

| Élément | Rôle | Réponse fournisseur |
|---|---|---|
| **Question** | Collecter une information | Oui (texte, nombre, liste, date, pièce jointe) |
| **Requirement** | Informer, poser une exigence | Non (lecture seule) |
| **Attachment** | Joindre un document | Non |
| **Line item** | Décrire un besoin | Rarement dans un RFI (pas de prix engageant) |

Les **types de réponse** d'une question sont déterminants pour l'exploitation : une question **à choix unique** (Yes/No, liste de valeurs) se note et se filtre automatiquement ; une question **texte libre** demande une lecture humaine. Un RFI bien conçu contient 70 % de questions fermées et 30 % de questions ouvertes.

## Les pre-requisites

Les **pre-requisites** sont des questions placées avant l'accès au contenu : acceptation d'un accord de confidentialité, confirmation d'un chiffre d'affaires minimal, certification obligatoire. Un fournisseur qui répond « Non » à une question **éliminatoire** peut être automatiquement exclu de la suite (option *disqualify*). C'est le filtre le plus efficace pour éviter de dépouiller des offres hors cible.

## Les questions à portée stratégique

Un RFI de qualité couvre :

- **Capacité** : volumes, sites de production, effectifs dédiés, références clients comparables ;
- **Conformité** : certifications (ISO 9001, 14001, 27001), assurances, RSE, sanctions ;
- **Technique** : adéquation aux spécifications, innovations proposées, roadmap ;
- **Commercial indicatif** : structure de coûts, modèle de prix envisagé (sans montant engageant) ;
- **Organisation** : équipe projet, modalités de support, langues.

## Exploiter les réponses

À la clôture, le **rapport de réponses** (Response report / Bid comparison) met côte à côte toutes les réponses par question. Les questions fermées peuvent être **pré-notées** (pre-grading) : une réponse « Non » à « Disposez-vous de la certification ISO 13485 ? » vaut 0, « Oui » vaut 10. Les résultats alimentent la **short-list** du RFP et, dans les projets intégrés à **SLP**, peuvent mettre à jour le profil de qualification du fournisseur.

## Erreurs fréquentes

1. Trop de questions ouvertes : 200 pages à lire pour 15 fournisseurs.
2. Pas de pre-requisites : des fournisseurs hors périmètre répondent et contestent leur exclusion.
3. Confusion RFI / RFP : demander des prix engageants dans un RFI décourage les fournisseurs sérieux.
4. Pas de délai de questions : le fournisseur découvre une ambiguïté la veille de la clôture.`,
      keyPoints: [
        "Le RFI explore et qualifie sans prix engageant ; il précède le RFP sur un marché mal connu.",
        "Le contenu se compose de sections, questions (avec réponse), requirements (lecture seule) et attachments.",
        "Privilégier les questions fermées (listes, Oui/Non) : elles se pré-notent et se filtrent automatiquement.",
        "Les pre-requisites filtrent à l'entrée ; une question éliminatoire peut disqualifier automatiquement.",
        "Le rapport de réponses alimente la short-list du RFP et peut mettre à jour la qualification SLP.",
      ],
    },
    {
      id: "m4-s3-j3-a2",
      moduleId: "m4",
      week: 3,
      day: 3,
      kind: "exercice",
      title: "Rédiger la structure d'un RFI « Externalisation de la logistique »",
      level: "intermediaire",
      durationMin: 40,
      objective: "Construire un RFI exploitable : pre-requisites éliminatoires, sections, questions typées et règles d'événement.",
      context: `## Situation

**Veltis Cosmétiques** (1 200 salariés, 3 entrepôts) envisage d'externaliser sa logistique à un prestataire 3PL. Le marché compte une trentaine d'acteurs, de la PME régionale au groupe international. La direction supply chain ne sait pas lesquels sont capables de gérer des produits cosmétiques (traçabilité des lots, conditions de température, préparation e-commerce). Elle veut un RFP avec **6 à 8 fournisseurs qualifiés** dans deux mois.

Contraintes : chiffre d'affaires minimal 20 M€, certification ISO 9001 obligatoire, présence d'un entrepôt à moins de 150 km de Lyon, acceptation d'un NDA.`,
      steps: [
        "Rédigez les 4 pre-requisites, indiquez pour chacun le type de réponse et s'il est éliminatoire (disqualify).",
        "Définissez 4 à 5 sections de contenu et donnez 3 questions par section en précisant le type de réponse (Oui/Non, liste, nombre, texte, pièce jointe).",
        "Identifiez les questions à pré-noter (pre-grading) et proposez le barème de chacune.",
        "Ajoutez 2 requirements (informations sans réponse) et 1 attachment.",
        "Paramétrez les règles : durée de preview, durée d'ouverture, date limite de questions, visibilité des réponses.",
        "Décrivez comment vous construirez la short-list de 6 à 8 fournisseurs à partir du rapport de réponses.",
      ],
      deliverable: "Un plan de RFI structuré (pre-requisites, sections, questions typées, barèmes) et les règles d'événement.",
      solution: `## Corrigé type

**Pre-requisites (tous éliminatoires sauf le dernier)**

| Pre-requisite | Type | Éliminatoire |
|---|---|---|
| Acceptez-vous l'accord de confidentialité joint ? | Oui/Non | Oui (Non = disqualifié) |
| Votre CA 2025 est-il supérieur à 20 M€ ? | Oui/Non | Oui |
| Détenez-vous la certification ISO 9001 en vigueur ? | Oui/Non + pièce jointe | Oui |
| Disposez-vous d'un entrepôt à moins de 150 km de Lyon ? | Oui/Non | Oui |

**Sections et questions typées**

1. **Entreprise et références** : effectifs logistiques (nombre) ; 3 références cosmétique/pharma (texte + pièce jointe) ; part du CA en 3PL (liste : < 25 %, 25–50 %, > 50 %).
2. **Capacités opérationnelles** : surface disponible m² (nombre) ; zones température contrôlée 15–25 °C (Oui/Non) ; capacité de préparation e-commerce colis/jour (nombre).
3. **Qualité et conformité** : traçabilité par lot et DLU (Oui/Non) ; certifications complémentaires (liste multiple : ISO 14001, GDP, IFS Logistics) ; procédure de rappel produit (pièce jointe).
4. **Systèmes d'information** : WMS utilisé (liste) ; interfaces EDI/API avec SAP (Oui/Non) ; délai de mise en œuvre d'une interface (nombre de semaines).
5. **Modèle économique indicatif** : structure tarifaire envisagée (liste : au colis, à la palette, mixte) ; durée minimale d'engagement (nombre de mois) — sans montant.

**Pre-grading** : température contrôlée Oui = 10 / Non = 0 ; traçabilité lot Oui = 10 / Non = 0 ; interfaces SAP Oui = 8 / Non = 2 ; part CA 3PL > 50 % = 10, 25–50 % = 6, < 25 % = 2 ; capacité e-commerce > 5 000 colis/jour = 10, 2 000–5 000 = 6, < 2 000 = 2.

**Requirements** : « Les volumes annuels sont de 1,2 M de colis et 18 000 palettes » ; « Le démarrage est envisagé au 1er trimestre N+1 ». **Attachment** : présentation du périmètre et des flux.

**Règles** : preview 3 jours, ouverture 15 jours, date limite de questions à J-5 avec réponses diffusées à tous, réponses des fournisseurs **invisibles** entre participants.

**Short-list** : filtre 1 = pre-requisites validés ; filtre 2 = score pré-noté ≥ 36/50 ; lecture humaine des références et procédures pour les 10 meilleurs ; comité de 1 heure avec la supply chain pour retenir 6 à 8 noms. Le résultat est consigné dans une tâche Review du projet.`,
      tips: [
        "Chaque question fermée vous fait gagner une heure de dépouillement : convertissez les questions ouvertes dès que possible.",
        "Testez le RFI en répondant vous-même en mode test : les ambiguïtés sautent aux yeux.",
        "La date limite de questions protège l'équité : au-delà, plus aucune information nouvelle n'est donnée.",
      ],
    },
    {
      id: "m4-s3-j3-a3",
      moduleId: "m4",
      week: 3,
      day: 3,
      kind: "quiz",
      title: "Quiz : concevoir un RFI",
      level: "intermediaire",
      durationMin: 15,
      objective: "Valider la compréhension du RFI, de son contenu et de ses pre-requisites.",
      questions: [
        {
          id: "m4-s3-j3-q1",
          question: "Quelle est la finalité principale d'un RFI dans Ariba Sourcing ?",
          options: [
            "Obtenir des prix fermes et engageants.",
            "Collecter des informations pour qualifier et présélectionner des fournisseurs.",
            "Négocier en temps réel les prix unitaires.",
            "Signer électroniquement le contrat.",
          ],
          answer: 1,
          explanation:
            "Le RFI est l'événement d'exploration : il sert à comprendre le marché et à qualifier un panel sans engagement de prix. Les prix fermes relèvent du RFP ou du RFQ, qui comportent des termes de prix engageants. La négociation en temps réel est le domaine des enchères. La signature électronique appartient au module Contracts et n'a aucun lien avec un événement de sourcing.",
          concept: "RFI : finalité et place dans la séquence de sourcing",
        },
        {
          id: "m4-s3-j3-q2",
          question: "Quelle différence sépare une Question d'un Requirement dans le contenu d'un événement ?",
          options: [
            "La Question est payante, le Requirement est gratuit.",
            "La Question attend une réponse du fournisseur, le Requirement est une information en lecture seule.",
            "Le Requirement est obligatoire, la Question est facultative.",
            "Il n'y a aucune différence.",
          ],
          answer: 1,
          explanation:
            "Une Question attend une réponse typée (texte, nombre, liste, Oui/Non, pièce jointe) qui pourra être notée ; un Requirement expose une exigence ou une information sans champ de réponse. La notion de coût n'existe pas pour ces éléments. Le caractère obligatoire est un attribut d'une Question (réponse requise ou non), pas ce qui la distingue d'un Requirement. Les deux éléments sont bien différents dans la structure du contenu.",
          concept: "Contenu d'événement : questions, requirements, attachments",
        },
        {
          id: "m4-s3-j3-q3",
          question: "Que permet un pre-requisite configuré comme éliminatoire ?",
          options: [
            "D'augmenter automatiquement le prix de réserve.",
            "De disqualifier automatiquement le fournisseur qui donne la réponse non attendue.",
            "D'envoyer un rappel au fournisseur.",
            "De pré-remplir les réponses du fournisseur.",
          ],
          answer: 1,
          explanation:
            "Un pre-requisite éliminatoire (option disqualify) exclut automatiquement un fournisseur dont la réponse ne correspond pas à la valeur attendue, par exemple le refus du NDA ; il n'accède pas au contenu. Le prix de réserve est un paramètre d'enchère sans rapport avec les pre-requisites. Les rappels sont envoyés via la messagerie d'événement ou les notifications planifiées. Aucun mécanisme de pré-remplissage des réponses fournisseur n'existe dans un pre-requisite.",
          concept: "Pre-requisites et disqualification",
        },
        {
          id: "m4-s3-j3-q4",
          question: "Pourquoi privilégier les questions fermées (Oui/Non, liste) dans un RFI ?",
          options: [
            "Parce qu'elles sont les seules autorisées par Ariba.",
            "Parce qu'elles se pré-notent et se filtrent automatiquement dans le rapport de réponses.",
            "Parce qu'elles obligent le fournisseur à joindre un document.",
            "Parce qu'elles réduisent la durée de preview.",
          ],
          answer: 1,
          explanation:
            "Les questions fermées acceptent un barème de pré-notation (pre-grading) et permettent tri et filtre immédiats dans le rapport de comparaison, ce qui accélère la short-list. Ariba autorise aussi les questions texte, nombre, date et pièce jointe. L'ajout de pièce jointe est un type de réponse distinct, non lié au caractère fermé d'une question. La durée de preview est une règle de timing indépendante du contenu.",
          concept: "Types de réponse et pré-notation (pre-grading)",
        },
        {
          id: "m4-s3-j3-q5",
          question: "À quoi sert la date limite de questions (question deadline) dans un RFI ?",
          options: [
            "À clôturer définitivement l'événement.",
            "À fixer le moment au-delà duquel les fournisseurs ne peuvent plus poser de questions, garantissant l'équité d'information.",
            "À déclencher la notation automatique.",
            "À inviter de nouveaux fournisseurs.",
          ],
          answer: 1,
          explanation:
            "La date limite de questions laisse à l'acheteur le temps de diffuser les réponses à tous avant la clôture ; après cette date, aucune information nouvelle n'est communiquée, ce qui préserve l'égalité de traitement. La clôture de l'événement est une date distincte. La notation intervient en Pending Selection, après clôture. L'invitation de fournisseurs est une action manuelle de l'onglet Suppliers, sans lien avec cette date.",
          concept: "Messagerie d'événement et égalité de traitement",
        },
      ],
    },

    // ───────────── Semaine 3 · Jour 4 : RFP/RFQ : grilles de notation ─────────────
    {
      id: "m4-s3-j4-a1",
      moduleId: "m4",
      week: 3,
      day: 4,
      kind: "lecon",
      title: "RFP et RFQ : termes, pondérations et grille de notation",
      level: "intermediaire",
      durationMin: 30,
      objective: "Construire une grille de notation pondérée cohérente dans un RFP et comprendre les spécificités du RFQ.",
      content: `## RFP ou RFQ ?

- **RFQ (Request for Quotation)** : le besoin est spécifié, on cherche le **meilleur prix** sur des line items définis. Peu de questions, beaucoup de termes chiffrés. Dans Ariba, c'est un RFP centré sur les lignes, souvent créé en Quick project.
- **RFP (Request for Proposal)** : la **valeur globale** compte (technique, service, prix). Questions pondérées + termes de prix. Nécessite une **grille de notation**.

## Les termes de ligne

Chaque **line item** porte des **termes** : les termes standards **Price**, **Quantity**, **Extended Price** et des termes personnalisés (délai, garantie, coût de transport). Un terme peut être :

- **saisi par le fournisseur** (Price),
- **défini par l'acheteur** (Quantity, Historic Price),
- **calculé** (Extended Price = Price × Quantity, Total Cost = Extended Price + Transport).

> Le **Total Cost** calculé est le terme à comparer, pas le prix facial : un fournisseur moins cher à l'unité peut coûter plus cher livré.

## La hiérarchie de pondération

La notation d'un RFP fonctionne en cascade :

\`\`\`
Événement 100 %
├── Section Technique 45 %
│   ├── Question 1 (poids 30)
│   └── Question 2 (poids 70)
├── Section Service 20 %
└── Section Commercial 35 %
    └── Terme Price (poids 100)
\`\`\`

Les **poids** se saisissent au niveau des sections et, à l'intérieur, au niveau des questions ou termes. Ariba normalise les poids au sein d'un même niveau : une question de poids 70 face à une question de poids 30 compte pour 70 % de sa section. Le **score pondéré** final est la somme des scores de section × poids de section.

## Notes (grades) et pré-notation

Chaque question notable reçoit une **grade** de 0 à 10 (barème par défaut, ajustable). Deux modes :

| Mode | Fonctionnement | Quand |
|---|---|---|
| **Pre-grading** | Barème défini avant publication pour les réponses fermées | Questions Oui/Non, listes, seuils numériques |
| **Notation manuelle** | Évaluateurs notent après clôture | Questions ouvertes, pièces jointes, mémoire technique |

Les **évaluateurs** (graders) sont des membres de l'équipe projet affectés à des sections : le bureau d'études note la section technique, les achats le commercial. Ariba calcule la **moyenne** des notes des évaluateurs par question.

## Noter le prix

Le prix se note par **formule** : la méthode la plus courante attribue 10 au moins cher et aux autres une note proportionnelle (Prix le plus bas ÷ Prix du fournisseur × 10). D'autres approches : écart au budget, écart à la moyenne. La formule doit être **écrite dans le document de consultation** pour la transparence.

## Envelope bidding

Lorsque la gouvernance impose de ne pas voir les prix avant d'avoir noté la technique, on active l'**envelope bidding** : l'enveloppe commerciale reste scellée jusqu'à ce que l'enveloppe technique soit notée et « ouverte ». C'est une exigence fréquente dans les secteurs régulés et les marchés publics.

## Les pièges de la grille

1. Trop de critères (> 25) : l'effet de dilution rend la grille insensible.
2. Pondération décidée après lecture des offres : perte de crédibilité, risque juridique.
3. Barèmes non documentés : deux évaluateurs notent 4 et 9 la même réponse.
4. Oublier le poids du prix : un RFP noté 90 % technique devient un concours de beauté.`,
      keyPoints: [
        "RFQ = meilleur prix sur lignes spécifiées ; RFP = valeur globale avec grille de notation pondérée.",
        "Les termes de ligne sont saisis (Price), définis (Quantity) ou calculés (Extended Price, Total Cost) ; comparer le coût total.",
        "La pondération est en cascade : sections → questions/termes ; les poids sont normalisés au sein d'un niveau.",
        "Pre-grading pour les réponses fermées, notation manuelle par évaluateurs affectés aux sections pour les réponses ouvertes.",
        "La formule de notation du prix doit être écrite dans la consultation ; l'envelope bidding scelle le commercial jusqu'à la notation technique.",
      ],
    },
    {
      id: "m4-s3-j4-a2",
      moduleId: "m4",
      week: 3,
      day: 4,
      kind: "simulation",
      title: "Simulation : atelier de construction de la grille de notation",
      level: "intermediaire",
      durationMin: 45,
      objective: "Animer un atelier avec les parties prenantes pour arbitrer pondérations, barèmes et affectation des évaluateurs.",
      context: `## Mise en situation

Vous animez pour **Castel Ingénierie** (bureau d'études, 900 salariés) l'atelier de notation du RFP **« Infogérance du poste de travail »** (1 500 postes, 3 ans, 2,4 M€ estimés). Autour de la table :

- **La DSI** veut 70 % de poids sur la technique « parce que la qualité prime ».
- **Les achats** veulent 50 % sur le prix « parce que le marché est mature ».
- **Les RH** veulent des critères sur la satisfaction utilisateur et l'accompagnement au changement.
- **La direction juridique** exige que les prix ne soient pas vus avant la notation technique.

Le cahier des charges comporte 180 exigences techniques détaillées. La DSI voudrait les noter toutes une par une.`,
      steps: [
        "Reformulez l'objectif de l'atelier et proposez une méthode d'arbitrage des pondérations (ex. : vote pondéré, répartition de 100 points) applicable en 20 minutes.",
        "Proposez une structure de sections (4 à 5) avec un poids de section arbitré, en justifiant chaque poids face aux parties prenantes.",
        "Réduisez les 180 exigences à un nombre gérable de critères notables : indiquez la technique (regroupement, exigences éliminatoires en pre-requisites, requirements informatifs).",
        "Définissez les barèmes de 3 questions clés (une pré-notée, deux manuelles) avec descripteurs de notes 0 / 5 / 10.",
        "Proposez la formule de notation du prix et montrez son effet sur un exemple à trois offres (1,9 M€, 2,2 M€, 2,6 M€).",
        "Affectez les évaluateurs aux sections et indiquez le paramétrage Ariba répondant à l'exigence juridique.",
        "Rédigez les trois phrases que vous dites à la DSI quand elle insiste pour noter les 180 exigences.",
      ],
      deliverable: "La grille de notation arbitrée (sections, poids, critères, barèmes), la formule prix, l'affectation des évaluateurs et le paramétrage d'envelope bidding.",
      solution: `## Corrigé type

**Méthode d'arbitrage** : chaque partie prenante répartit 100 points entre les sections proposées ; on affiche la moyenne, on discute uniquement les écarts supérieurs à 10 points, puis on arrête les poids. L'objectif reformulé : « choisir le prestataire qui maximise la valeur pour l'entreprise, pas le meilleur dossier technique ni le moins cher ».

**Sections et poids arbitrés**

| Section | Poids | Justification |
|---|---|---|
| Conformité technique et architecture | 30 % | Les exigences éliminatoires sont déjà filtrées en pre-requisites |
| Qualité de service et SLA | 20 % | Ce qui est vécu par les 1 500 utilisateurs |
| Transition et accompagnement au changement | 10 % | Demande RH, risque majeur des 6 premiers mois |
| Organisation, gouvernance et références | 10 % | Capacité à tenir sur 3 ans |
| Commercial (coût total 3 ans) | 30 % | Marché mature, mais pas au point de dominer |

**Réduire les 180 exigences** : 40 exigences « indispensables » deviennent des **pre-requisites** éliminatoires (Oui/Non) ; 90 exigences descriptives deviennent des **requirements** informatifs ; les 50 restantes sont regroupées en **12 questions notables** par thème (ex. : « Décrivez votre dispositif de gestion des incidents niveau 1 et 2 », pièce jointe + texte).

**Barèmes**

- Pré-notée : « Délai de prise en charge d'un incident bloquant » — liste : < 15 min = 10 ; 15–30 min = 6 ; 30–60 min = 3 ; > 60 min = 0.
- Manuelle : « Plan de transition » — 0 : absent ou générique ; 5 : planning crédible mais sans gestion des risques ; 10 : planning détaillé, risques identifiés, ressources nommées.
- Manuelle : « Dispositif de mesure de la satisfaction utilisateur » — 0 : aucun ; 5 : enquête annuelle ; 10 : mesure continue par ticket avec plan d'action mensuel.

**Formule prix** : note = (Prix le plus bas ÷ Prix de l'offre) × 10. Exemple : 1,9 M€ → 10 ; 2,2 M€ → 8,64 ; 2,6 M€ → 7,31. Pondérée à 30 %, l'écart entre la moins chère et la plus chère vaut 0,81 point sur 10 au score final : la technique peut le compenser, le prix reste discriminant.

**Évaluateurs** : DSI → sections 1 et 2 ; RH → section 3 ; Achats → section 4 et section commerciale ; Direction juridique en lecture seule. **Envelope bidding** activé : l'enveloppe commerciale est scellée ; les achats ne l'ouvrent qu'après validation de la notation technique par une tâche d'approbation.

**Face à la DSI** : « Les 40 exigences non négociables seront éliminatoires : aucun fournisseur non conforme ne sera noté. » « Noter 180 lignes donne une moyenne qui écrase les différences : 12 questions bien choisies discriminent mieux. » « Vous notez seules les sections technique et service, soit 50 % du score : votre poids réel est préservé. »`,
      tips: [
        "Faites arbitrer les poids avant toute lecture d'offre et consignez-les dans la tâche d'approbation du projet.",
        "Testez la grille sur deux offres fictives : si elles obtiennent le même score, la grille ne discrimine pas.",
        "L'envelope bidding rassure le juridique ; expliquez-le avec le vocabulaire des marchés publics qu'il connaît.",
      ],
    },
    {
      id: "m4-s3-j4-a3",
      moduleId: "m4",
      week: 3,
      day: 4,
      kind: "quiz",
      title: "Quiz : RFP, RFQ et notation",
      level: "intermediaire",
      durationMin: 15,
      objective: "Valider la maîtrise des termes, pondérations, barèmes et de l'envelope bidding.",
      questions: [
        {
          id: "m4-s3-j4-q1",
          question: "Dans un RFP Ariba, comment sont pris en compte les poids saisis sur les questions d'une même section ?",
          options: [
            "Ils sont additionnés au poids de la section.",
            "Ils sont normalisés entre eux à l'intérieur de la section, puis la section est pondérée dans l'événement.",
            "Ils remplacent le poids de la section.",
            "Ils ne sont utilisés que pour les enchères.",
          ],
          answer: 1,
          explanation:
            "La notation fonctionne en cascade : les poids des questions sont normalisés au sein de leur section (70 et 30 donnent 70 % et 30 %), puis le score de section est multiplié par le poids de la section dans l'événement. Les poids de questions ne s'additionnent pas au poids de la section et ne le remplacent pas : les deux niveaux sont indépendants. Les enchères n'utilisent pas de grille de notation pondérée mais des termes chiffrés.",
          concept: "Pondération en cascade : sections, questions, termes",
        },
        {
          id: "m4-s3-j4-q2",
          question: "Quel terme de ligne est le plus pertinent pour comparer des offres incluant des frais de transport différents ?",
          options: ["Price", "Quantity", "Total Cost calculé (Extended Price + Transport)", "Historic Price"],
          answer: 2,
          explanation:
            "Un terme calculé Total Cost agrège le prix étendu et les coûts annexes saisis par le fournisseur, ce qui permet de comparer le coût réellement supporté par l'acheteur. Le Price seul ignore le transport et peut favoriser une offre finalement plus chère. La Quantity est définie par l'acheteur et identique pour tous. L'Historic Price est une référence de baseline utile pour les économies, pas un élément de comparaison des offres entre elles.",
          concept: "Lots, line items et termes (Price, Quantity, Extended Price)",
        },
        {
          id: "m4-s3-j4-q3",
          question: "Qu'est-ce que l'envelope bidding ?",
          options: [
            "Une enchère où les offres sont envoyées par courrier.",
            "La séparation des enveloppes technique et commerciale, la seconde restant scellée jusqu'à la notation de la première.",
            "Un mode où le fournisseur ne voit pas les questions.",
            "La notation automatique de toutes les réponses.",
          ],
          answer: 1,
          explanation:
            "L'envelope bidding reproduit la logique des plis séparés : les réponses commerciales ne sont visibles qu'après ouverture explicite de l'enveloppe, généralement conditionnée à la fin de la notation technique. Il ne s'agit pas d'un envoi papier. Le fournisseur voit bien toutes les questions, il répond simplement dans des enveloppes distinctes. La notation automatique correspond au pre-grading, un mécanisme différent.",
          concept: "Envelope bidding",
        },
        {
          id: "m4-s3-j4-q4",
          question: "Avec la formule (Prix le plus bas ÷ Prix de l'offre) × 10, quelle note obtient une offre à 2,5 M€ si la moins chère est à 2,0 M€ ?",
          options: ["10", "8", "5", "2"],
          answer: 1,
          explanation:
            "2,0 ÷ 2,5 = 0,8, multiplié par 10 donne 8. La note 10 est réservée à l'offre la moins chère. La note 5 correspondrait à une offre deux fois plus chère que la moins chère (4,0 M€). La note 2 correspondrait à une offre cinq fois plus chère, ce qui n'est pas le cas ici. La formule proportionnelle est linéaire en inverse du prix, d'où l'importance de la publier dans la consultation.",
          concept: "Notation du prix par formule",
        },
        {
          id: "m4-s3-j4-q5",
          question: "Quelle différence principale sépare un RFQ d'un RFP ?",
          options: [
            "Le RFQ se concentre sur le prix de lignes spécifiées, le RFP évalue la valeur globale avec une grille pondérée.",
            "Le RFQ est réservé aux fournisseurs étrangers.",
            "Le RFP ne contient jamais de prix.",
            "Le RFQ n'existe pas dans Ariba.",
          ],
          answer: 0,
          explanation:
            "Le RFQ répond à un besoin déjà spécifié : les termes de prix dominent et la notation est quasi exclusivement commerciale. Le RFP combine questions pondérées (technique, service) et termes de prix pour juger la valeur globale. L'origine géographique des fournisseurs n'intervient pas dans le choix du type. Un RFP contient bien des termes de prix, c'est la différence avec le RFI. Dans Ariba, le RFQ est un événement de type RFP centré sur les lignes, souvent en Quick project.",
          concept: "RFQ vs RFP",
        },
      ],
    },

    // ───────────── Semaine 3 · Jour 5 : Dépouillement et attribution ─────────────
    {
      id: "m4-s3-j5-a1",
      moduleId: "m4",
      week: 3,
      day: 5,
      kind: "lecon",
      title: "Dépouiller, comparer et attribuer : du Bid comparison aux scénarios d'award",
      level: "avance",
      durationMin: 30,
      objective: "Exploiter le rapport de comparaison des offres, construire des scénarios d'attribution (dont le split award) et clôturer l'événement.",
      content: `## Pending Selection : la phase d'analyse

À la clôture, l'événement entre en **Pending Selection**. L'acheteur dispose de trois outils :

1. le **Bid comparison report** (rapport de comparaison) : toutes les offres côte à côte, par ligne, par terme et par question, exportable Excel ;
2. la **console de notation** : saisie des grades par les évaluateurs, calcul des scores pondérés ;
3. les **scénarios d'attribution** (Award scenarios) : simulation de la répartition des lignes entre fournisseurs.

## Lire le Bid comparison report

Le rapport présente pour chaque line item : le prix de chaque fournisseur, l'Extended Price, le classement, l'écart au meilleur prix, l'Historic Price si renseigné, et les **économies** calculées. Les colonnes sont filtrables par lot ou section. Points de vigilance :

- une offre **incomplète** (ligne non cotée) fausse le total : vérifier la colonne « lignes répondues » ;
- une **devise** différente est convertie au taux de l'événement : vérifier la date du taux ;
- les **conditions** saisies en texte (« prix valable pour 100 % des volumes ») ne sont pas dans les chiffres.

## Construire les scénarios d'attribution

Un **scénario** est une hypothèse d'attribution ligne par ligne. Ariba propose plusieurs méthodes :

| Scénario | Principe | Usage |
|---|---|---|
| **Lowest price** | Chaque ligne au moins cher | RFQ simple, lignes indépendantes |
| **Best score** | Chaque ligne au meilleur score pondéré | RFP avec grille |
| **Single supplier** | Toutes les lignes à un seul fournisseur | Besoin de simplicité, effet volume |
| **Split award** | Répartition des volumes entre 2 ou plus fournisseurs | Sécuriser l'approvisionnement, maintenir la concurrence |
| **Optimisation (avec contraintes)** | Minimiser le coût sous contraintes (max fournisseurs, part minimale, exclusions) | Portefeuilles complexes |

Les scénarios se **comparent** entre eux : coût total, nombre de fournisseurs, écart au scénario « tout au moins cher » (coût de la décision). C'est ce **coût de la décision** qu'il faut documenter quand on ne retient pas le moins cher.

## Le split award en pratique

Attribuer 70 % à un fournisseur A et 30 % à B sécurise l'approvisionnement, mais A n'a cotté son prix que « pour 100 % du volume ». Deux parades : prévoir dès le RFP un **terme « prix par tranche de volume »**, ou organiser un **second tour** (reopen) auprès des deux finalistes avec les volumes cibles. Un split award non anticipé est la première source de renégociation post-attribution.

## Formaliser l'attribution

L'**Award** dans Ariba met à jour le statut de chaque ligne (attribuée / non attribuée) et passe l'événement en **Completed**. Il déclenche :

- la notification aux fournisseurs (gagnants et perdants, avec message personnalisable) ;
- le pré-remplissage du **Savings form** ;
- optionnellement, la création d'un **Contract Workspace** ou l'envoi des prix vers **Buying** (catalogue, contrat de prix).

## Gérer les contestations

Le fournisseur perdant demande des explications : le **Bid history**, les **grades** et la **grille publiée** constituent le dossier. Bonne pratique : un **debrief** structuré par fournisseur (points forts, points faibles, position relative sans divulguer les prix des autres). Le debrief est aussi un investissement : il améliore les offres de la prochaine consultation.`,
      keyPoints: [
        "En Pending Selection : Bid comparison report, console de notation et scénarios d'attribution.",
        "Vérifier l'exhaustivité des lignes cotées, les conversions de devise et les conditions textuelles avant de comparer.",
        "Scénarios : lowest price, best score, single supplier, split award, optimisation sous contraintes ; documenter le coût de la décision.",
        "Anticiper le split award dès le RFP (prix par tranche de volume) ou via un second tour ciblé.",
        "L'Award clôture l'événement, notifie les fournisseurs, pré-remplit le Savings form et peut initier contrat ou catalogue.",
      ],
    },
    {
      id: "m4-s3-j5-a2",
      moduleId: "m4",
      week: 3,
      day: 5,
      kind: "exercice",
      title: "Analyser trois offres et recommander un scénario d'attribution",
      level: "avance",
      durationMin: 45,
      objective: "Croiser scores pondérés et coûts, construire deux scénarios d'attribution et justifier le coût de la décision.",
      context: `## Situation

RFP **« Fournitures d'emballage »** pour **Primavera Agro** (agroalimentaire, 2 000 salariés), 3 line items annuels, grille : technique 40 %, service 20 %, prix 40 %. Trois offres complètes :

| Ligne | Quantité | Alpha Pack | BoxEurope | Cartonis |
|---|---|---|---|---|
| L1 Caisses carton | 400 000 | 0,62 € | 0,58 € | 0,66 € |
| L2 Films étirables (rouleaux) | 25 000 | 7,40 € | 8,10 € | 6,90 € |
| L3 Étiquettes (mille) | 12 000 | 4,10 € | 3,80 € | 4,50 € |

Scores hors prix (sur 10) : technique Alpha 8,5 / BoxEurope 6,0 / Cartonis 9,0 ; service Alpha 8,0 / BoxEurope 7,0 / Cartonis 6,5.

Contraintes métier : la direction supply chain veut **au maximum 2 fournisseurs** et une **part minimale de 30 %** pour un second fournisseur sur L1 (ligne critique). BoxEurope précise dans un commentaire : « prix L1 valable pour un volume minimal de 300 000 caisses ».`,
      steps: [
        "Calculez l'Extended Price par ligne et le total par fournisseur ; identifiez le scénario « tout au moins cher ligne par ligne » et son coût.",
        "Calculez la note prix de chaque fournisseur sur le total avec la formule (moins cher ÷ offre) × 10, puis le score pondéré global (technique 40 %, service 20 %, prix 40 %).",
        "Construisez le scénario « best score » (toutes les lignes au meilleur score global) et son coût.",
        "Construisez un scénario « split award » respectant les contraintes : max 2 fournisseurs, 30 % minimum pour un second fournisseur sur L1. Vérifiez la contrainte de volume minimal de BoxEurope.",
        "Comparez les trois scénarios : coût total, écart au scénario le moins cher (coût de la décision), risques.",
        "Rédigez la recommandation d'attribution pour le comité (10 lignes) et indiquez l'action Ariba à mener si un second tour est nécessaire.",
      ],
      deliverable: "Un tableau comparatif des trois scénarios (coût, fournisseurs, coût de la décision) et une recommandation argumentée.",
      solution: `## Corrigé type

**Extended Price et totaux**

| Ligne | Alpha Pack | BoxEurope | Cartonis |
|---|---|---|---|
| L1 | 248 000 € | 232 000 € | 264 000 € |
| L2 | 185 000 € | 202 500 € | 172 500 € |
| L3 | 49 200 € | 45 600 € | 54 000 € |
| **Total** | **482 200 €** | **480 100 €** | **490 500 €** |

**Scénario 1 — Lowest price ligne par ligne** : L1 BoxEurope (232 000), L2 Cartonis (172 500), L3 BoxEurope (45 600) = **450 100 €**, 2 fournisseurs. Attention : L1 à 100 % chez BoxEurope respecte son minimum de 300 000 caisses.

**Notes prix sur le total** : BoxEurope 10 ; Alpha 480 100 ÷ 482 200 × 10 = 9,96 ; Cartonis 480 100 ÷ 490 500 × 10 = 9,79.

**Scores pondérés** : Alpha = 8,5 × 0,4 + 8,0 × 0,2 + 9,96 × 0,4 = 3,40 + 1,60 + 3,98 = **8,98** ; BoxEurope = 2,40 + 1,40 + 4,00 = **7,80** ; Cartonis = 3,60 + 1,30 + 3,92 = **8,82**.

**Scénario 2 — Best score (single supplier Alpha)** : 482 200 €, 1 fournisseur. Coût de la décision vs scénario 1 : **+32 100 €** (+7,1 %). Ne respecte pas la contrainte de second fournisseur sur L1.

**Scénario 3 — Split award** : L1 : 70 % Alpha (280 000 × 0,62 = 173 600 €) + 30 % Cartonis (120 000 × 0,66 = 79 200 €) = 252 800 € ; L2 : 100 % Cartonis = 172 500 € ; L3 : 100 % Alpha = 49 200 €. Total **474 500 €**, 2 fournisseurs (Alpha, Cartonis), les deux meilleurs scores techniques. BoxEurope est écarté : avec 30 % de L1 (120 000 caisses) son prix ne serait pas valable (minimum 300 000), et son score technique de 6,0 est le plus faible. Coût de la décision vs scénario 1 : **+24 400 €** (+5,4 %).

**Comparaison**

| Scénario | Coût | Fournisseurs | Coût de la décision | Risque |
|---|---|---|---|---|
| 1 Lowest price | 450 100 € | BoxEurope, Cartonis | — | Technique BoxEurope faible sur la ligne critique |
| 2 Best score | 482 200 € | Alpha | +32 100 € | Mono-source sur L1, contrainte non respectée |
| 3 Split award | 474 500 € | Alpha, Cartonis | +24 400 € | Prix Alpha coté pour 100 % du volume à confirmer |

**Recommandation** : retenir le scénario 3, qui respecte les contraintes métier avec les deux meilleurs profils techniques pour un surcoût de 5,4 % justifié par la sécurisation de la ligne critique. Avant attribution, **ré-ouvrir l'événement (reopen) en second tour** pour Alpha et Cartonis uniquement, avec les volumes cibles de L1 (280 000 / 120 000), afin de confirmer ou améliorer leurs prix. Documenter le coût de la décision dans le Savings form et le scénario retenu dans la tâche d'approbation d'attribution.`,
      tips: [
        "Faites toujours le scénario « tout au moins cher » en premier : il est la référence du coût de la décision.",
        "Lisez les commentaires des fournisseurs avant de simuler : un volume minimal invalide un split award.",
        "Un second tour ciblé coûte 48 heures et évite trois mois de renégociation.",
      ],
    },
    {
      id: "m4-s3-j5-a3",
      moduleId: "m4",
      week: 3,
      day: 5,
      kind: "quiz",
      title: "Quiz : dépouillement et attribution",
      level: "avance",
      durationMin: 15,
      objective: "Valider la maîtrise du Bid comparison, des scénarios d'attribution et de la clôture d'événement.",
      questions: [
        {
          id: "m4-s3-j5-q1",
          question: "Quel outil présente côte à côte les prix, l'Extended Price et le classement de chaque fournisseur par ligne ?",
          options: ["Savings form", "Bid comparison report", "Project template", "Event messages"],
          answer: 1,
          explanation:
            "Le Bid comparison report est le rapport de comparaison des offres : il aligne pour chaque line item les prix, prix étendus, classements et écarts, avec export Excel. Le Savings form documente les économies après attribution. Le Project template structure le projet mais ne contient aucune offre. La messagerie d'événement sert à la communication avec les fournisseurs, pas à l'analyse comparative.",
          concept: "Bid comparison report",
        },
        {
          id: "m4-s3-j5-q2",
          question: "Qu'appelle-t-on le « coût de la décision » dans l'analyse des scénarios d'attribution ?",
          options: [
            "Le coût des licences Ariba.",
            "L'écart de coût total entre le scénario retenu et le scénario « tout au moins cher ».",
            "Les frais de transport des fournisseurs.",
            "Le montant des économies déclarées.",
          ],
          answer: 1,
          explanation:
            "Comparer le scénario retenu au scénario qui attribue chaque ligne au moins cher révèle ce que l'organisation accepte de payer pour ses critères non-prix (qualité, sécurisation, nombre de fournisseurs). C'est cet écart qu'il faut justifier au comité. Les licences, les frais de transport et le montant des économies sont des notions distinctes ; les économies se calculent par rapport à une baseline, non par rapport à un autre scénario.",
          concept: "Scénarios d'attribution et coût de la décision",
        },
        {
          id: "m4-s3-j5-q3",
          question: "Quel risque principal présente un split award non anticipé dans le RFP ?",
          options: [
            "L'événement ne peut pas être clôturé.",
            "Les fournisseurs ont coté pour 100 % du volume et peuvent renégocier leurs prix pour une part réduite.",
            "Le Savings form est supprimé.",
            "Les évaluateurs perdent leurs notes.",
          ],
          answer: 1,
          explanation:
            "Un prix coté pour la totalité du volume n'est pas garanti pour 30 % ou 50 % ; sans terme de prix par tranche ni second tour, le fournisseur peut légitimement revoir son offre. La clôture de l'événement reste techniquement possible quel que soit le scénario. Le Savings form n'est jamais supprimé par un choix de scénario. Les notes des évaluateurs sont conservées indépendamment de l'attribution.",
          concept: "Split award et prix par tranche de volume",
        },
        {
          id: "m4-s3-j5-q4",
          question: "Que déclenche l'Award (attribution) d'un événement dans Ariba Sourcing ?",
          options: [
            "La suppression des offres non retenues.",
            "Le passage en Completed, la notification des fournisseurs et le pré-remplissage du Savings form.",
            "La création automatique d'un bon de commande dans S/4HANA.",
            "La réouverture de l'événement pour un second tour.",
          ],
          answer: 1,
          explanation:
            "L'attribution met à jour le statut des lignes, passe l'événement en Completed, envoie les notifications aux gagnants et perdants et pré-remplit le Savings form ; elle peut en option initier un Contract Workspace. Les offres non retenues sont conservées pour l'audit. Aucun bon de commande n'est créé automatiquement : l'exécution des achats passe par Buying ou le contrat. La réouverture est une action distincte, antérieure à l'attribution.",
          concept: "Award et clôture d'événement",
        },
        {
          id: "m4-s3-j5-q5",
          question: "Quelle bonne pratique recommande-t-on pour répondre à un fournisseur non retenu qui conteste ?",
          options: [
            "Lui transmettre le prix de tous les concurrents.",
            "Un debrief structuré fondé sur la grille publiée, ses notes et sa position relative, sans divulguer les prix des autres.",
            "Ne pas répondre pour éviter tout risque.",
            "Rouvrir l'événement pour lui seul.",
          ],
          answer: 1,
          explanation:
            "Le debrief s'appuie sur des éléments tracés et objectifs — grille publiée, grades, Bid history — et donne au fournisseur sa position relative et ses axes d'amélioration, ce qui protège l'acheteur et améliore les offres futures. Divulguer les prix des concurrents viole la confidentialité. Le silence alimente les soupçons et les recours. Rouvrir l'événement pour un seul fournisseur romprait l'égalité de traitement.",
          concept: "Debrief fournisseur et gestion des contestations",
        },
      ],
    },
  ],

  useCases: [
    {
      id: "m4-uc1",
      moduleId: "m4",
      title: "Un RFI pour cartographier un marché inconnu",
      client: "Groupe hospitalier privé, 8 000 salariés",
      situation: "La direction achats devait consulter pour une solution de stérilisation externalisée sans connaître les acteurs ni les modèles économiques du marché.",
      challenge: "Éviter un RFP mal calibré que seuls deux fournisseurs auraient compris, tout en respectant un calendrier de 4 mois.",
      approach: [
        "RFI de 3 semaines auprès de 22 prestataires identifiés via la base SLP et des annuaires professionnels.",
        "Pre-requisites éliminatoires : certification ISO 13485, capacité à traiter 15 000 unités/jour, acceptation du NDA.",
        "Questions fermées pré-notées sur les capacités ; questions ouvertes limitées aux modèles tarifaires.",
        "Atelier de lecture des 11 réponses recevables avec les pharmaciens pour affiner le cahier des charges.",
        "Short-list de 6 fournisseurs et RFP publié avec un cahier des charges enrichi des enseignements du RFI.",
      ],
      outcome: "6 offres RFP complètes et comparables, écart de prix entre offres réduit de 60 % à 18 %, attribution dans les délais.",
      lesson: "Le RFI n'est pas une perte de temps : il transforme un RFP approximatif en consultation que les fournisseurs peuvent réellement chiffrer.",
    },
    {
      id: "m4-uc2",
      moduleId: "m4",
      title: "Sauver une consultation dont la grille avait été pondérée après lecture des offres",
      client: "Collectivité et société d'économie mixte, 1 500 agents",
      situation: "Les évaluateurs avaient ajusté les pondérations après avoir lu les offres ; un fournisseur écarté menaçait d'un recours.",
      challenge: "Rétablir la régularité de la procédure sans tout recommencer et sans perdre la confiance des fournisseurs.",
      approach: [
        "Audit de l'Audit log Ariba pour dater précisément les modifications de poids et constater qu'elles étaient postérieures à la clôture.",
        "Décision avec le juridique d'annuler la notation et de rouvrir un second tour (reopen) avec grille publiée et verrouillée par une tâche d'approbation.",
        "Activation de l'envelope bidding pour séparer technique et commercial.",
        "Formation des évaluateurs aux barèmes avec descripteurs 0/5/10 et notation en aveugle des noms de fournisseurs.",
        "Debrief individuel de tous les fournisseurs à l'issue du second tour.",
      ],
      outcome: "Second tour mené en 3 semaines, aucun recours, grille et barèmes réutilisés comme standard dans le template.",
      lesson: "La pondération se fige avant publication et se verrouille par une approbation : l'Audit log d'Ariba finit toujours par raconter la vraie chronologie.",
    },
    {
      id: "m4-uc3",
      moduleId: "m4",
      title: "Split award sur des composants critiques",
      client: "Équipementier automobile, 6 500 salariés",
      situation: "Un RFQ sur 40 références de connecteurs faisait ressortir un fournisseur asiatique 14 % moins cher mais la direction industrielle refusait le mono-sourcing.",
      challenge: "Concilier l'exigence d'économies des achats et la sécurisation de l'approvisionnement, sans renégociation sauvage post-attribution.",
      approach: [
        "Ajout, avant publication, d'un terme « prix par tranche de volume » (100 %, 70 %, 30 %) sur chaque ligne.",
        "Scénario d'optimisation sous contraintes dans Ariba : maximum 2 fournisseurs par référence, part minimale de 30 % pour le second sur les 12 références critiques.",
        "Comparaison documentée de 4 scénarios et calcul du coût de la décision présenté au comité.",
        "Second tour ciblé auprès des deux finalistes avec les volumes du scénario retenu.",
      ],
      outcome: "Économies de 9,8 % contre 14 % en mono-source, surcoût de sécurisation de 4,2 % accepté par le comité, zéro rupture sur 24 mois.",
      lesson: "Le split award se prépare dans le contenu du RFQ ; sans prix par tranche, il n'est qu'une intention que les fournisseurs renégocient.",
    },
  ],

  glossary: [
    { term: "RFI (Request for Information)", definition: "Événement d'exploration sans prix engageant, destiné à collecter des informations et qualifier un panel avant le RFP.", moduleId: "m4" },
    { term: "RFP (Request for Proposal)", definition: "Événement combinant questions pondérées et termes de prix pour évaluer la valeur globale d'une offre à l'aide d'une grille de notation.", moduleId: "m4" },
    { term: "RFQ (Request for Quotation)", definition: "Consultation centrée sur le prix de line items spécifiés ; dans Ariba, un RFP focalisé sur les lignes, souvent en Quick project.", moduleId: "m4" },
    { term: "Pre-requisite", definition: "Question placée avant l'accès au contenu (NDA, certification) pouvant disqualifier automatiquement un fournisseur.", moduleId: "m4" },
    { term: "Pre-grading", definition: "Barème de notation défini avant publication pour les réponses fermées, appliqué automatiquement au dépouillement.", moduleId: "m4" },
    { term: "Grade / Évaluateur", definition: "Note de 0 à 10 attribuée à une réponse ; les évaluateurs (graders) sont affectés à des sections et leurs notes sont moyennées.", moduleId: "m4" },
    { term: "Pondération (Weight)", definition: "Poids attribué aux sections puis aux questions et termes, normalisés à chaque niveau pour calculer le score pondéré.", moduleId: "m4" },
    { term: "Envelope bidding", definition: "Séparation des enveloppes technique et commerciale ; la seconde reste scellée jusqu'à son ouverture explicite après notation technique.", moduleId: "m4" },
    { term: "Bid comparison report", definition: "Rapport comparant les offres ligne par ligne : prix, Extended Price, classement, écarts, économies.", moduleId: "m4" },
    { term: "Award scenario", definition: "Hypothèse d'attribution des lignes aux fournisseurs : lowest price, best score, single supplier, split award, optimisation sous contraintes.", moduleId: "m4" },
    { term: "Split award", definition: "Répartition d'une ligne ou d'un lot entre plusieurs fournisseurs pour sécuriser l'approvisionnement ; à anticiper par des prix par tranche de volume.", moduleId: "m4" },
    { term: "Coût de la décision", definition: "Écart de coût entre le scénario retenu et le scénario « tout au moins cher », à justifier devant le comité d'attribution.", moduleId: "m4" },
  ],

  faq: [
    { q: "Peut-on demander des prix dans un RFI ?", a: "On peut demander des prix indicatifs ou une structure tarifaire, jamais un prix engageant. Si vous avez besoin d'un prix ferme, c'est un RFP ou un RFQ. Mélanger les deux décourage les fournisseurs sérieux et fausse la qualification.", moduleId: "m4" },
    { q: "Combien de critères notables faut-il dans un RFP ?", a: "Entre 10 et 20 critères notables suffisent dans la plupart des cas. Au-delà, l'effet de dilution rend la grille insensible. Les exigences non négociables doivent être traitées en pre-requisites éliminatoires, et les informations descriptives en requirements.", moduleId: "m4" },
    { q: "Peut-on modifier les pondérations après la clôture ?", a: "Techniquement, un propriétaire d'événement peut le faire, mais c'est une faute de procédure tracée dans l'Audit log. La bonne pratique consiste à verrouiller la grille par une tâche d'approbation avant publication et à publier la méthode de notation dans la consultation.", moduleId: "m4" },
    { q: "Comment Ariba calcule-t-il la note de prix ?", a: "Il n'y a pas de formule unique imposée : l'acheteur choisit une formule, la plus courante étant (prix le plus bas ÷ prix de l'offre) × 10. La formule doit être annoncée dans le document de consultation pour la transparence.", moduleId: "m4" },
    { q: "Quand utiliser un second tour (reopen) plutôt qu'une enchère ?", a: "Le second tour convient lorsque deux ou trois finalistes doivent confirmer ou améliorer une offre sur un périmètre ajusté (volumes d'un split award, option retirée). L'enchère convient quand un nombre suffisant de fournisseurs est techniquement comparable et que le prix est le levier principal.", moduleId: "m4" },
    { q: "Que dire à un fournisseur non retenu ?", a: "Un debrief structuré : ses notes par section, sa position relative, ses axes d'amélioration, sans divulguer les prix ou les notes des concurrents. Le Bid history et la grille publiée sont vos preuves.", moduleId: "m4" },
  ],
};
