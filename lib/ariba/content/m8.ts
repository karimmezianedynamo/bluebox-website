import type { ModuleContent } from "../types";

export const m8: ModuleContent = {
  moduleId: "m8",
  activities: [
    // ───────────────────────── Semaine 6 · Jour 1 ─────────────────────────
    {
      id: "m8-s6-j1-a1",
      moduleId: "m8",
      week: 6,
      day: 1,
      kind: "lecon",
      title: "Les scénarios d'intégration SAP Ariba ↔ S/4HANA",
      level: "intermediaire",
      durationMin: 25,
      objective: "Distinguer les grands scénarios d'intégration Ariba / S/4HANA et savoir lequel recommander selon le contexte client.",
      content: `## Pourquoi intégrer ?

SAP Ariba est une suite cloud multi-tenant : elle ne connaît ni les centres de coûts, ni les comptes généraux, ni les fournisseurs du client tant qu'on ne les lui transmet pas. L'intégration a deux finalités : **alimenter Ariba en données de base** (master data) venant de l'ERP, et **échanger des documents transactionnels** (demandes d'achat, bons de commande, réceptions, factures) entre Ariba, SAP Business Network et S/4HANA. Le consultant technico-fonctionnel doit cadrer ces flux avant toute configuration.

## Les trois grands scénarios

| Scénario | Où est créé le PO ? | Où est comptabilisée la facture ? | Cas d'usage typique |
|---|---|---|---|
| **Ariba Buying standalone** | Ariba Buying & Invoicing | Ariba (puis export comptable) | Client sans ERP SAP ou en multi-ERP hétérogène |
| **Ariba Buying integrated with S/4HANA** (dit « ERP-integrated ») | Ariba crée la réquisition, le PO est généré dans S/4HANA (ou dans Ariba puis répliqué) | S/4HANA (MM-IV) | Client SAP voulant Guided Buying en frontal et la comptabilité dans l'ERP |
| **Ariba Network Supplier Collaboration** (sans Ariba Buying) | S/4HANA (ME21N, Fiori) | S/4HANA | Client qui veut dématérialiser PO/ASN/factures avec ses fournisseurs via SAP Business Network |

> Retenez la question clé à poser au client : « Quel système est le **système maître du bon de commande** ? » La réponse détermine presque tout le reste : numérotation, approbations, rapprochement de facture, reporting.

## Variantes fréquentes

- **Central Procurement** (S/4HANA) peut aussi s'articuler avec Ariba Sourcing et Contracts pour centraliser les achats de plusieurs ERP.
- **Ariba Sourcing / Contracts intégrés** : les attributions (awards) créent des contrats ou des fiches infos / contrats cadres dans S/4HANA ; les fournisseurs créés dans SLP sont répliqués vers le Business Partner de S/4HANA via **Master Data Integration**.
- **Guided Buying avec « Procurement Content »** : l'utilisateur achète dans Ariba, le PO naît dans S/4HANA ; le ressenti métier est « Ariba », la vérité comptable est « SAP ».

## Les briques techniques

Trois mécanismes coexistent dans un projet :

1. **Imports batch** (fichiers CSV) via l'**Ariba Integration Toolkit (ITK)** ou des tâches d'import planifiées pour les données de base.
2. **Services web SOAP / API REST** pour les échanges synchrones (ex. vérification de budget, validation de compte).
3. **Middleware** : **SAP Ariba Cloud Integration Gateway (CIG)**, renommé *SAP Integration Suite, managed gateway for spend management and SAP Business Network* (dit « Managed Gateway »), ou **SAP Integration Suite (Cloud Integration)** quand le client veut maîtriser lui-même ses iFlows.

## Côté S/4HANA

L'ERP embarque un **add-on** (ARBCIG, remplacé par ARBCI1 sur les versions récentes) qui expose les flux vers CIG : il convertit les documents SAP (IDoc ORDERS, INVOIC, ou proxies) et pilote les paramètres de connexion (endpoint, certificat, Buyer ANID). Sans cet add-on, aucun flux transactionnel standard n'est possible.

## Ce que fait le consultant

- Il formalise une **matrice des flux** : objet, source, cible, fréquence, technologie, responsable.
- Il identifie les **écarts** entre le standard SAP et les besoins (champs custom, règles d'approbation hybrides).
- Il choisit le **réalm de test** pour valider chaque flux avant le cutover.

L'intégration n'est pas un sujet « technique » annexe : c'est la colonne vertébrale du projet.`,
      keyPoints: [
        "Trois scénarios : Buying standalone, Buying intégré S/4HANA, Network Supplier Collaboration.",
        "La question clé est « quel système est maître du bon de commande ? »",
        "Données de base en batch (ITK/CSV), documents transactionnels via CIG / Managed Gateway.",
        "L'add-on ARBCIG / ARBCI1 côté S/4HANA est indispensable aux flux standard.",
        "Le livrable n°1 du consultant est la matrice des flux d'intégration.",
      ],
    },
    {
      id: "m8-s6-j1-a2",
      moduleId: "m8",
      week: 6,
      day: 1,
      kind: "simulation",
      title: "Atelier d'architecture d'intégration avec l'équipe SAP du client",
      level: "intermediaire",
      durationMin: 45,
      objective: "Animer un atelier de cadrage et produire une matrice des flux d'intégration argumentée.",
      context: `## Situation

Vous êtes consultant Ariba chez **Nordelec**, distributeur de matériel électrique (1 800 salariés, 3 sociétés, S/4HANA 2023 on-premise). Le DSI veut déployer **Guided Buying** pour 900 demandeurs, dématérialiser les factures de 400 fournisseurs et garder la **comptabilité fournisseurs dans S/4HANA**. L'équipe SAP interne (un basis, un fonctionnel MM, un ABAP) est méfiante : « on ne veut pas d'une deuxième base fournisseurs ».

Vous animez l'atelier d'architecture de 2 heures. Les participants : DSI, responsable achats, comptable fournisseurs, équipe SAP.`,
      steps: [
        "Reformulez en 3 phrases l'objectif métier et identifiez le système maître du PO et celui de la facture.",
        "Choisissez le scénario d'intégration (standalone / ERP-integrated / Network Supplier Collaboration) et justifiez-le face à l'objection « deuxième base fournisseurs ».",
        "Listez les données de base à répliquer de S/4HANA vers Ariba (au moins 8 objets) et proposez une fréquence et une technologie pour chacune.",
        "Dessinez (en texte) le flux PO et le flux facture bout en bout, en nommant chaque composant traversé (S/4, add-on, CIG, Business Network, fournisseur).",
        "Identifiez 3 risques ou points d'arbitrage (ex. gestion des commandes de service, comptabilisation des factures sans PO, numérotation) et proposez une décision pour chacun.",
        "Rédigez la matrice des flux au format tableau : Objet | Source | Cible | Fréquence | Technologie | Responsable.",
      ],
      deliverable: "Une matrice des flux d'intégration (tableau) accompagnée d'une note d'architecture d'une page justifiant le scénario retenu et listant les décisions d'atelier.",
      solution: `## Scénario retenu

**Ariba Buying integrated with S/4HANA (ERP-integrated)** avec **SAP Business Network** pour la collaboration fournisseur. Le PO est créé dans S/4HANA à partir de la réquisition Ariba approuvée ; la facture arrive par le Network, transite par CIG et est comptabilisée dans **MM-IV**. La base fournisseurs reste maîtrisée dans S/4HANA (Business Partner) et **répliquée vers Ariba** : il n'y a pas de deuxième base, il y a une copie synchronisée, ce qui répond à l'objection.

## Matrice des flux (extrait)

| Objet | Source | Cible | Fréquence | Technologie | Responsable |
|---|---|---|---|---|---|
| Fournisseurs + adresses | S/4HANA (BP) | Ariba Buying | Quotidien + delta | CIG (Master data) | Fonctionnel MM |
| Centres de coûts, GL, Company codes, Plants | S/4HANA (CO/FI) | Ariba | Quotidien | CIG / ITK CSV | Fonctionnel FI |
| Utilisateurs | Azure AD / SAP IAS | Ariba | Quotidien | SCIM / ITK | Équipe IAM |
| Commodity codes (UNSPSC ↔ groupe marchandises) | Référentiel achats | Ariba + S/4 | Mensuel | ITK CSV | Achats |
| Réquisition approuvée | Ariba Buying | S/4HANA (PO) | Temps réel | CIG, add-on ARBCI1 | Intégration |
| Bon de commande | S/4HANA | Business Network → fournisseur | Temps réel | IDoc ORDERS → cXML OrderRequest | Intégration |
| Confirmation / ASN | Fournisseur (Network) | S/4HANA | Temps réel | cXML ConfirmationRequest / ShipNoticeRequest | Intégration |
| Réception (GR) | S/4HANA (MIGO) | Network | Temps réel | cXML ReceiptRequest | Logistique |
| Facture | Fournisseur (Network) | S/4HANA MM-IV | Temps réel | cXML InvoiceDetailRequest → IDoc INVOIC | Compta fournisseurs |
| Statut facture / paiement | S/4HANA | Network | Quotidien | StatusUpdateRequest / PaymentRemittanceRequest | Compta |

## Décisions d'atelier

- **Commandes de service** : traiter via Service Entry Sheet (SES) dans S/4 et feuilles de service sur le Network, phase 2.
- **Factures sans PO** : interdites sur le Network pour le périmètre pilote (règle de transaction), circuit papier maintenu 6 mois.
- **Numérotation** : le numéro S/4 est la référence unique ; Ariba affiche le numéro ERP dans la réquisition.

## Risques identifiés

1. Qualité des données fournisseurs (doublons BP) → nettoyage avant réplication.
2. Add-on ARBCI1 absent en production → planning basis.
3. 400 fournisseurs à enabler → campagne d'onboarding Network à démarrer dès la conception.`,
      tips: [
        "Face à une équipe SAP méfiante, parlez « réplication » et « système maître », jamais « migration vers le cloud ».",
        "Dessinez toujours deux flux séparés : le PO (sortant) et la facture (entrant), ils n'empruntent pas les mêmes mécanismes de contrôle.",
        "Faites valider la matrice par écrit : c'est votre base pour le plan de tests d'intégration.",
      ],
    },
    {
      id: "m8-s6-j1-a3",
      moduleId: "m8",
      week: 6,
      day: 1,
      kind: "quiz",
      title: "Quiz : scénarios d'intégration",
      level: "intermediaire",
      durationMin: 12,
      objective: "Vérifier la compréhension des scénarios d'intégration et des composants impliqués.",
      questions: [
        {
          id: "m8-s6-j1-q1",
          question: "Dans le scénario « Ariba Buying integrated with S/4HANA », où la facture fournisseur est-elle généralement comptabilisée ?",
          options: [
            "Dans Ariba Buying & Invoicing, puis exportée vers la comptabilité",
            "Dans S/4HANA via le rapprochement de factures MM-IV",
            "Directement sur SAP Business Network",
            "Dans SAP Concur",
          ],
          answer: 1,
          explanation: "Dans le scénario ERP-integrated, le PO vit dans S/4HANA et la facture, reçue via le Business Network et CIG, est comptabilisée dans la vérification de factures logistique (MM-IV) de S/4HANA. La première option décrit le scénario Buying standalone, où Ariba rapproche la facture (Invoice Reconciliation) avant export comptable. Le Business Network transporte et valide la facture mais n'est pas un système comptable. SAP Concur gère les notes de frais et les voyages, pas les factures fournisseurs.",
          concept: "Scénarios d'intégration Ariba / S/4HANA",
        },
        {
          id: "m8-s6-j1-q2",
          question: "Quel composant doit être installé côté S/4HANA pour permettre les flux transactionnels standard vers CIG ?",
          options: [
            "L'add-on ARBCIG / ARBCI1",
            "SAP GUI version 8",
            "Le module SAP Concur Connector",
            "L'Ariba Integration Toolkit",
          ],
          answer: 0,
          explanation: "L'add-on ARBCIG (ou ARBCI1 sur les versions récentes) est le composant livré par SAP qui expose les documents S/4HANA (PO, réceptions, factures) vers CIG et gère les paramètres de connexion. SAP GUI est un client d'accès utilisateur sans rôle d'intégration. Le « SAP Concur Connector » n'est pas un composant Ariba. L'Ariba Integration Toolkit (ITK) sert aux imports batch de fichiers CSV côté Ariba, pas aux flux transactionnels depuis S/4HANA.",
          concept: "Add-on ARBCIG / ARBCI1 côté S/4HANA",
        },
        {
          id: "m8-s6-j1-q3",
          question: "Un client sans Ariba Buying veut dématérialiser PO, ASN et factures avec ses fournisseurs depuis S/4HANA. Quel scénario correspond ?",
          options: [
            "Ariba Buying standalone",
            "Ariba Sourcing intégré",
            "Ariba Network Supplier Collaboration (intégration S/4HANA ↔ Business Network)",
            "Guided Buying avec Procurement Content",
          ],
          answer: 2,
          explanation: "Le scénario Ariba Network Supplier Collaboration connecte S/4HANA directement au SAP Business Network pour échanger PO, confirmations, ASN et factures sans module Ariba Buying. Buying standalone implique de créer les PO dans Ariba, ce que le client ne souhaite pas. Ariba Sourcing intégré concerne les appels d'offres et contrats, pas les flux PO/facture. Guided Buying avec Procurement Content suppose Ariba Buying en frontal des demandeurs.",
          concept: "Scénarios d'intégration Ariba / S/4HANA",
        },
        {
          id: "m8-s6-j1-q4",
          question: "Quel outil est le plus adapté pour charger en masse des centres de coûts au format CSV dans Ariba ?",
          options: [
            "Le cXML CopyRequest",
            "L'Ariba Integration Toolkit (ITK) ou une tâche d'import de données",
            "Un IDoc ORDERS",
            "SAP Fiori Launchpad",
          ],
          answer: 1,
          explanation: "L'ITK et les tâches d'import de données (Data Import) sont conçus pour charger des fichiers CSV de données de base (centres de coûts, comptes, fournisseurs…) dans Ariba. Le CopyRequest cXML sert à transmettre une copie de document (par ex. un PO) à un tiers, pas à importer des référentiels. L'IDoc ORDERS véhicule un bon de commande, pas des centres de coûts. Fiori Launchpad est l'interface utilisateur de S/4HANA.",
          concept: "Imports de données de base (ITK, CSV)",
        },
        {
          id: "m8-s6-j1-q5",
          question: "Quel est le nouveau nom de SAP Ariba Cloud Integration Gateway (CIG) ?",
          options: [
            "SAP Process Orchestration",
            "SAP Integration Suite, managed gateway for spend management and SAP Business Network",
            "SAP Data Intelligence",
            "SAP Business Technology Platform Core",
          ],
          answer: 1,
          explanation: "CIG a été rebaptisé « SAP Integration Suite, managed gateway for spend management and SAP Business Network » (souvent abrégé « Managed Gateway ») ; la fonction reste la même : un middleware géré par SAP avec des mappings standard. SAP Process Orchestration est l'ancien middleware on-premise (PI/PO), différent de CIG. SAP Data Intelligence est une plateforme de données et de machine learning. « SAP BTP Core » n'est pas un produit d'intégration Ariba.",
          concept: "CIG / Managed Gateway : rôle et positionnement",
        },
      ],
    },
    // ───────────────────────── Semaine 6 · Jour 2 ─────────────────────────
    {
      id: "m8-s6-j2-a1",
      moduleId: "m8",
      week: 6,
      day: 2,
      kind: "lecon",
      title: "Données de base : quoi répliquer, comment et à quelle fréquence",
      level: "intermediaire",
      durationMin: 25,
      objective: "Connaître les objets de données de base nécessaires à Ariba Buying et les mécanismes de réplication depuis S/4HANA.",
      content: `## Sans données de base, pas de réquisition

Une demande d'achat Ariba doit porter une **imputation comptable** (centre de coûts, compte général, société, éventuellement ordre interne ou WBS), un **fournisseur** et une **adresse de livraison**. Toutes ces valeurs proviennent de S/4HANA. Si la réplication est incomplète, l'utilisateur ne peut pas soumettre sa demande ou le PO sera rejeté par l'ERP.

## Les objets de données de base d'Ariba Buying

| Objet Ariba | Source S/4HANA | Remarque |
|---|---|---|
| Company Code | T001 | Sociétés autorisées à acheter |
| Cost Center | CSKS | Avec validité et responsable |
| General Ledger (Account) | SKA1 / SKB1 | Par société |
| Internal Order / WBS Element | AUFK / PRPS | Si imputation projet |
| Plant / Purchasing Unit | T001W / T024E | Détermine l'organisation d'achat |
| Purchasing Organization / Group | T024E / T024 | Obligatoires sur le PO S/4 |
| Supplier (Common Supplier) + Supplier Location | LFA1 / BP | Lien avec l'ANID du Network |
| Payment Terms | T052 | Repris sur PO et facture |
| Currency / Exchange Rates | TCURC / TCURR | Conversions |
| Unit of Measure | T006 | Mapping ISO (EA, PCE, H87…) |
| Commodity Code ↔ Material Group | T023 | Pont entre UNSPSC et groupes de marchandises |
| Material Master (si achats sur article) | MARA | Souvent restreint à un sous-ensemble |
| Account Assignment Category | T163K | Type d'imputation (K, F, P…) |
| Users | IAS / Azure AD | Souvent via SCIM plutôt que par l'ERP |

> Un oubli classique : la **Supplier Location**. Un fournisseur Ariba sans Supplier Location ne peut pas recevoir de PO. Chaque adresse de commande doit être renseignée et rattachée à l'ANID (Ariba Network ID) correspondant.

## Trois mécanismes de réplication

1. **CIG / Managed Gateway – Master Data** : l'add-on S/4 extrait les objets (programmes d'extraction, ex. ARBCIG_MASTER_DATA_EXPORT) et CIG les pousse vers Ariba en initial load puis en delta.
2. **Ariba Integration Toolkit (ITK)** : outil Java en ligne de commande qui zippe des fichiers CSV et appelle les tâches d'import Ariba (Import Users, Import Cost Centers, etc.). Utile pour les objets non couverts ou pour un client sans CIG.
3. **Import manuel / tâches planifiées** : dans Ariba Administrator → Site Manager → Data Import/Export, pour les correctifs.

## Les règles d'import

- Les fichiers CSV ont un **en-tête obligatoire** et un encodage UTF-8 ; le séparateur et la première ligne (« UTF8 ») sont imposés par Ariba.
- L'import **incrémental** (Delta) ajoute ou modifie ; l'import **complet** (Full load) remplace et désactive ce qui n'est plus dans le fichier : mal utilisé en production, il désactive des centaines d'objets.
- L'ordre d'import compte : sociétés avant centres de coûts, fournisseurs avant Supplier Locations, utilisateurs avant groupes.
- Chaque import génère un **journal de tâche** (Task Status) à vérifier.

## Fréquence recommandée

| Objet | Fréquence |
|---|---|
| Fournisseurs, Supplier Locations | Quotidien (delta), plus à la demande |
| Centres de coûts, GL, ordres internes | Quotidien |
| Users | Quotidien ou temps réel (SCIM) |
| Commodity codes, unités, devises | Mensuel ou à la demande |
| Taux de change | Quotidien si achats multi-devises |

## Points de vigilance du consultant

- **Validité temporelle** : un centre de coûts clôturé dans S/4 doit être désactivé dans Ariba, sinon le PO est rejeté.
- **Clés composites** : Ariba identifie souvent un objet par UniqueName + Company Code ; un changement de clé crée un doublon.
- **Environnements** : les données du réalm test doivent venir du S/4 de qualité, jamais de production.`,
      keyPoints: [
        "Les imputations (Company Code, Cost Center, GL, WBS) et les fournisseurs viennent de S/4HANA.",
        "La Supplier Location relie le fournisseur à l'ANID : sans elle, pas de PO.",
        "Trois mécanismes : CIG master data, ITK (CSV), imports manuels dans Site Manager.",
        "Attention au Full load : il désactive tout ce qui n'est plus dans le fichier.",
        "Respecter l'ordre des imports et contrôler les journaux de tâche.",
      ],
    },
    {
      id: "m8-s6-j2-a2",
      moduleId: "m8",
      week: 6,
      day: 2,
      kind: "exercice",
      title: "Préparer et contrôler un fichier d'import de centres de coûts",
      level: "intermediaire",
      durationMin: 35,
      objective: "Construire un fichier CSV conforme aux attentes d'Ariba et diagnostiquer les erreurs d'import.",
      context: `## Situation

Le client **Nordelec** vous transmet un extrait S/4HANA de 6 centres de coûts à charger dans le réalm de test Ariba Buying. L'extrait contient des anomalies. Vous devez produire le fichier d'import et une liste des corrections.

Extrait reçu :

\`\`\`
CostCenter;Description;CompanyCode;ValidTo;Responsable
1000;Direction Générale;FR01;31.12.9999;DURAND
1010;Achats;FR01;31.12.9999;MARTIN
1020;Logistique Nord;FR01;31.12.2023;LEROY
2000;Direction;FR02;31.12.9999;
2000;Direction;FR02;31.12.9999;PETIT
3000;Maintenance;FR03;31.12.9999;ROUX
\`\`\`

La société FR03 n'existe pas dans Ariba.`,
      steps: [
        "Identifiez les anomalies dans l'extrait (doublon, validité, société inconnue, champ vide).",
        "Rédigez le fichier CSV CostCenter.csv au format Ariba (ligne d'encodage, en-tête, colonnes UniqueName, Name, CompanyCode, PurchasingUnit si requis).",
        "Décidez pour chaque anomalie : charger, corriger, exclure, ou créer un prérequis (ex. import de la société FR03 avant).",
        "Indiquez l'ordre d'import à respecter et le type d'import (Full ou Incrémental) adapté à un réalm de test en construction.",
        "Listez les contrôles post-import à réaliser dans Ariba (Task Status, recherche d'un centre de coûts dans une réquisition de test).",
      ],
      deliverable: "Le fichier CostCenter.csv final, un tableau des anomalies avec la décision prise, et la checklist de contrôle post-import.",
      solution: `## Anomalies et décisions

| Ligne | Anomalie | Décision |
|---|---|---|
| 1020 | Validité expirée (31.12.2023) | Exclure du fichier, ou charger avec statut inactif si l'historique est nécessaire |
| 2000 (2 lignes) | Doublon sur la clé UniqueName + CompanyCode | Conserver une seule ligne (celle avec responsable PETIT), signaler au client |
| 2000 (1re ligne) | Responsable vide | Résolu par la suppression du doublon |
| 3000 | Société FR03 inconnue d'Ariba | Importer d'abord CompanyCode.csv avec FR03, ou exclure si FR03 est hors périmètre |

## Fichier CostCenter.csv

\`\`\`
UTF8
"UniqueName","Name","CompanyCode","PurchasingUnit"
"1000","Direction Générale","FR01","FR01"
"1010","Achats","FR01","FR01"
"2000","Direction","FR02","FR02"
"3000","Maintenance","FR03","FR03"
\`\`\`

La première ligne « UTF8 » indique l'encodage ; les colonnes doivent correspondre exactement aux noms attendus par la tâche **Import Cost Centers**. Le responsable n'est pas une colonne standard : il peut être porté par un champ personnalisé ou ignoré.

## Ordre et type d'import

1. Import Company Codes (si FR03 retenu).
2. Import Purchasing Units.
3. Import Cost Centers.

En réalm de test en construction, un **import complet (Full)** est acceptable car il n'y a pas encore de données à préserver. En production, on privilégie l'**incrémental** pour éviter de désactiver les centres de coûts absents du fichier.

## Contrôles post-import

- Vérifier le statut de la tâche dans *Site Manager → Data Import/Export → Task Status* : aucun « Failed », lire les avertissements.
- Rechercher « 2000 » dans *Core Administration → Cost Centers* et vérifier la société.
- Créer une réquisition de test et sélectionner le centre de coûts 1010 sur une ligne : il doit apparaître dans la liste de valeurs.
- Vérifier que 1020 n'est pas proposé aux demandeurs.`,
      tips: [
        "Ouvrez toujours le fichier dans un éditeur de texte, pas Excel, qui casse les zéros initiaux et l'encodage.",
        "La clé d'un centre de coûts dans Ariba est le couple UniqueName + CompanyCode : deux sociétés peuvent avoir un centre « 1000 ».",
        "Documentez la règle de traitement des objets expirés dans votre spécification d'intégration.",
      ],
    },
    {
      id: "m8-s6-j2-a3",
      moduleId: "m8",
      week: 6,
      day: 2,
      kind: "quiz",
      title: "Quiz : données de base et réplication",
      level: "intermediaire",
      durationMin: 12,
      objective: "Valider la maîtrise des objets de données de base et des règles d'import.",
      questions: [
        {
          id: "m8-s6-j2-q1",
          question: "Quel objet Ariba doit exister pour qu'un fournisseur puisse recevoir un bon de commande via le Network ?",
          options: [
            "Un Commodity Code",
            "Une Supplier Location rattachée à l'ANID du fournisseur",
            "Un Internal Order",
            "Un Payment Term",
          ],
          answer: 1,
          explanation: "La Supplier Location est l'adresse de commande du fournisseur dans Ariba ; elle porte le lien avec l'Ariba Network ID (ANID), ce qui permet d'acheminer le PO. Le Commodity Code classe l'achat mais ne concerne pas le routage du PO. L'Internal Order est une imputation comptable optionnelle. Le Payment Term est repris sur le PO mais n'est pas un prérequis à l'envoi vers le fournisseur.",
          concept: "Supplier Location et ANID",
        },
        {
          id: "m8-s6-j2-q2",
          question: "Quel est le risque d'un import complet (Full load) de centres de coûts en production ?",
          options: [
            "Il n'y a aucun risque, c'est le mode recommandé",
            "Il duplique tous les enregistrements existants",
            "Il désactive les centres de coûts absents du fichier",
            "Il efface les bons de commande en cours",
          ],
          answer: 2,
          explanation: "Un import complet remplace l'ensemble du référentiel : tout objet non présent dans le fichier est désactivé, ce qui peut bloquer les réquisitions en cours d'approbation. Ce n'est donc pas le mode recommandé en production, où l'incrémental est privilégié. L'import ne duplique pas : la clé UniqueName + CompanyCode garantit l'unicité. Il n'efface jamais de documents transactionnels comme les bons de commande.",
          concept: "Imports de données de base (ITK, CSV)",
        },
        {
          id: "m8-s6-j2-q3",
          question: "Dans quel ordre importer les objets suivants dans un réalm vide ?",
          options: [
            "Cost Centers → Company Codes → Users",
            "Company Codes → Cost Centers → Users",
            "Users → Cost Centers → Company Codes",
            "L'ordre est indifférent",
          ],
          answer: 1,
          explanation: "Les centres de coûts référencent une société : la société doit donc exister avant. Les utilisateurs sont souvent rattachés à un centre de coûts par défaut et à une société, donc ils viennent après. Importer les centres de coûts avant les sociétés provoque des erreurs de référence, et les utilisateurs en premier échoue pour la même raison. L'ordre n'est pas indifférent : les dépendances entre objets imposent une séquence.",
          concept: "Imports de données de base (ITK, CSV)",
        },
        {
          id: "m8-s6-j2-q4",
          question: "Quel objet S/4HANA sert de pont entre les Commodity Codes Ariba (UNSPSC) et le bon de commande SAP ?",
          options: [
            "Le groupe de marchandises (Material Group, table T023)",
            "Le centre de profit",
            "Le domaine d'activité",
            "Le code TVA",
          ],
          answer: 0,
          explanation: "Ariba classe les achats par Commodity Code (souvent UNSPSC) alors que S/4HANA utilise le groupe de marchandises (Material Group). Un mapping entre les deux est nécessaire pour générer le PO SAP et dériver le compte général. Le centre de profit et le domaine d'activité sont des objets d'analyse financière sans lien avec la classification des achats. Le code TVA concerne la fiscalité de la ligne, pas sa catégorie d'achat.",
          concept: "Commodity Code et Material Group",
        },
        {
          id: "m8-s6-j2-q5",
          question: "Quelle première ligne un fichier CSV d'import Ariba doit-il contenir ?",
          options: [
            "Le nom de la tâche d'import",
            "La date d'export",
            "L'indicateur d'encodage (ex. UTF8)",
            "Le numéro de version de l'ITK",
          ],
          answer: 2,
          explanation: "Les fichiers CSV Ariba commencent par une ligne indiquant l'encodage, généralement « UTF8 », suivie de la ligne d'en-tête des colonnes. Le nom de la tâche est choisi dans l'outil d'import, pas dans le fichier. La date d'export n'est pas attendue et provoquerait une erreur de format. La version de l'ITK n'apparaît pas dans les fichiers de données.",
          concept: "Imports de données de base (ITK, CSV)",
        },
      ],
    },
    // ───────────────────────── Semaine 6 · Jour 3 ─────────────────────────
    {
      id: "m8-s6-j3-a1",
      moduleId: "m8",
      week: 6,
      day: 3,
      kind: "lecon",
      title: "Cloud Integration Gateway : architecture et cycle projet",
      level: "intermediaire",
      durationMin: 30,
      objective: "Comprendre l'architecture de CIG / Managed Gateway et le déroulement d'un projet CIG en self-service.",
      content: `## Un middleware géré par SAP

**SAP Ariba Cloud Integration Gateway (CIG)**, aujourd'hui *SAP Integration Suite, managed gateway for spend management and SAP Business Network*, est le middleware standard entre l'ERP (S/4HANA, ECC) d'un côté et les solutions Ariba et le SAP Business Network de l'autre. Il est hébergé et exploité par SAP : le client n'installe ni serveur ni licence middleware, il configure des **projets** dans un portail web.

## Architecture en quatre couches

\`\`\`
S/4HANA (add-on ARBCI1) ──HTTPS/certificat──► CIG ──► Ariba Buying / Sourcing / Contracts
                                              │
                                              └──► SAP Business Network ──► Fournisseurs (cXML, EDI, portail)
\`\`\`

1. **ERP + add-on** : convertit les documents SAP (IDoc, proxy ABAP) et les pousse vers l'endpoint CIG. L'add-on contient les transactions de paramétrage (ex. **/ARBA/MAIN_MENU**, configuration des *Buyer ANID*, *System ID*, mapping des codes).
2. **CIG** : reçoit, **mappe** (format SAP → format cXML ou Ariba), enrichit via des **tables de références croisées** (cross-reference), puis route vers la bonne destination.
3. **Solutions Ariba / Business Network** : traitent le document.
4. **Monitoring** : le *Transaction Tracker* de CIG et l'AIF (Application Interface Framework) côté S/4.

## Le portail CIG : notions clés

- **Projet** : conteneur d'une intégration pour un couple ERP ↔ solution Ariba. On y choisit la **solution** (Buying, Network, Sourcing…), le **système ERP** et les **flux** (interfaces) activés.
- **Cycle** : *Project → Configure → Test → Deploy*. Un projet est d'abord construit en **test**, validé via le **CIG Test Central**, puis **déployé en production**. Chaque modification repasse par ce cycle.
- **Mappings standard** : SAP livre pour chaque interface une transformation prête à l'emploi. Pas de code pour le cas nominal.
- **Cross-reference tables** : tables de correspondance (unités de mesure, codes TVA, types de documents, codes devise) que le consultant alimente.
- **Extensions** : champs supplémentaires ajoutés par le client ; **custom mapping** via XSLT quand le standard ne suffit pas (à éviter autant que possible, car cela complexifie les montées de version).
- **Connectivité** : certificats X.509, utilisateur technique, **Buyer ANID**, **System ID** de l'ERP ; en test on utilise le réalm Ariba de test et le Business Network de test (service.ariba.com en mode test).

> La règle d'or : **standard d'abord**. 80 % des projets se font sans custom mapping si le paramétrage S/4 est aligné sur les attentes d'Ariba.

## CIG vs SAP Integration Suite (Cloud Integration)

| Critère | CIG / Managed Gateway | SAP Integration Suite (CPI) |
|---|---|---|
| Qui exploite ? | SAP | Le client (ou son intégrateur) |
| Contenu | Mappings standard Ariba fournis | Packages d'intégration à adapter |
| Flexibilité | Extensions + XSLT limités | Totale (iFlows, scripts) |
| Cas d'usage | Flux standard Ariba ↔ ERP SAP | ERP non-SAP, logiques complexes, orchestration multi-systèmes |

## Déroulé d'un projet CIG en pratique

1. **Prérequis** : add-on installé, réalm Ariba test, compte Business Network acheteur test, certificats.
2. **Création du projet** et choix des interfaces (ex. PO outbound, Invoice inbound).
3. **Configuration** : endpoints, cross-reference, extensions éventuelles.
4. **Tests** : scénarios du Test Central (envoi d'un PO de bout en bout, retour facture), analyse des messages dans le Transaction Tracker.
5. **Déploiement en production** et **cutover** : bascule des endpoints, activation des fournisseurs.

Le consultant technico-fonctionnel pilote les étapes 2 à 5 avec l'équipe SAP et le chef de projet intégration.`,
      keyPoints: [
        "CIG / Managed Gateway est un middleware géré par SAP, configuré par projets dans un portail.",
        "Cycle de vie : Project → Configure → Test → Deploy, avec validation dans le Test Central.",
        "Mappings standard + tables de références croisées couvrent la majorité des besoins ; XSLT en dernier recours.",
        "Connectivité : certificats, utilisateur technique, Buyer ANID, System ID.",
        "SAP Integration Suite (CPI) s'impose pour les ERP non-SAP ou les orchestrations complexes.",
      ],
    },
    {
      id: "m8-s6-j3-a2",
      moduleId: "m8",
      week: 6,
      day: 3,
      kind: "exercice",
      title: "Cadrer un projet CIG : interfaces, prérequis et plan de test",
      level: "intermediaire",
      durationMin: 40,
      objective: "Traduire une matrice de flux en projet CIG : interfaces à activer, prérequis techniques, scénarios de test.",
      context: `## Situation

Suite à l'atelier d'architecture chez **Nordelec**, vous devez préparer la création du projet CIG. Le périmètre du pilote : PO sortant vers 40 fournisseurs, confirmations de commande et factures entrantes, réplication des fournisseurs et imputations. L'équipe basis demande une liste précise de ce qu'elle doit fournir, et le chef de projet veut un plan de test d'intégration.`,
      steps: [
        "Listez les interfaces CIG à activer pour le pilote, en séparant données de base et documents transactionnels, et en indiquant le sens (ERP → Ariba, Ariba/Network → ERP).",
        "Rédigez la liste des prérequis techniques côté S/4HANA (add-on, utilisateur technique, certificats, ports, Buyer ANID, System ID, RFC/ports IDoc).",
        "Identifiez les tables de références croisées à alimenter pour les flux PO et facture (au moins 4).",
        "Construisez un plan de test en 6 scénarios bout en bout (ex. PO matière, PO service, confirmation partielle, facture conforme, facture avec écart de prix, annulation de PO), avec résultat attendu.",
        "Précisez les critères de passage du projet CIG de Test à Deploy.",
      ],
      deliverable: "Un document de cadrage CIG : tableau des interfaces, liste des prérequis, tables de références croisées, plan de test et critères de go/no-go.",
      solution: `## Interfaces à activer

| Type | Interface | Sens |
|---|---|---|
| Données de base | Supplier / Supplier Location | S/4 → Ariba Buying + Network |
| Données de base | Company Code, Cost Center, GL Account, Plant, Purchasing Org/Group, Payment Terms, UoM, Currency | S/4 → Ariba Buying |
| Transactionnel | Requisition export (réquisition approuvée → PO S/4) | Ariba → S/4 |
| Transactionnel | Purchase Order (ORDERS / ORDCHG) | S/4 → Network → fournisseur |
| Transactionnel | Order Confirmation | Network → S/4 |
| Transactionnel | Goods Receipt | S/4 → Network |
| Transactionnel | Invoice (InvoiceDetailRequest → INVOIC) | Network → S/4 |
| Transactionnel | Invoice Status Update | S/4 → Network |

## Prérequis S/4HANA

- Add-on **ARBCI1** installé en DEV/QAS/PRD avec le dernier Support Package.
- Utilisateur technique de type *System* pour les appels CIG, autorisations /ARBA/*.
- Certificat client X.509 signé par une autorité reconnue, chargé dans STRUST ; ouverture flux HTTPS sortants vers les URL CIG (test puis production).
- **Buyer ANID** du compte Business Network (test : suffixe -T) et **System ID** logique saisis dans /ARBA/MAIN_MENU.
- Port IDoc / partenaire logique pour ORDERS, ORDCHG, INVOIC ; type de message et profil partenaire WE20.
- Jobs d'extraction des données de base planifiés.

## Tables de références croisées

1. Unité de mesure SAP ↔ ISO (ST ↔ EA, H ↔ HUR).
2. Code TVA SAP ↔ catégorie de taxe cXML.
3. Type de document d'achat S/4 (NB, FO) ↔ type de commande Ariba (matériel, service).
4. Devise et format de date.
5. Code d'imputation (K, F) ↔ Account Assignment cXML.

## Plan de test (extrait)

| # | Scénario | Résultat attendu |
|---|---|---|
| 1 | PO matière 2 lignes | OrderRequest visible sur le compte fournisseur test, statut « Sent » |
| 2 | PO service avec limite | Document de service reçu, SES possible |
| 3 | Confirmation partielle | Statut PO « Partially Confirmed » dans S/4 (EKES) |
| 4 | Facture conforme | Pièce MM-IV comptabilisée, statut facture « Approved » sur le Network |
| 5 | Facture avec écart de prix hors tolérance | Facture bloquée en paiement dans S/4, statut « Pending approval » |
| 6 | Annulation / modification de PO | ORDCHG transmis, version 2 du PO sur le Network |

## Critères Test → Deploy

- 100 % des scénarios critiques passés sans custom mapping non documenté.
- Aucune erreur ouverte dans le Transaction Tracker sur les 5 derniers jours de test.
- Procédure de monitoring et de reprise rédigée et validée par le support client.
- Fournisseurs pilotes enablés et testés sur le Network de test.`,
      tips: [
        "Faites signer la liste des prérequis par l'équipe basis : les retards de projets CIG viennent presque toujours des certificats et des ouvertures réseau.",
        "Testez d'abord un PO ultra-simple (1 ligne, pas de taxe) avant les scénarios complexes.",
        "Chaque scénario de test doit avoir un identifiant de document à retrouver dans le Transaction Tracker.",
      ],
    },
    {
      id: "m8-s6-j3-a3",
      moduleId: "m8",
      week: 6,
      day: 3,
      kind: "quiz",
      title: "Quiz : Cloud Integration Gateway",
      level: "intermediaire",
      durationMin: 12,
      objective: "Vérifier la compréhension de l'architecture et du cycle projet CIG.",
      questions: [
        {
          id: "m8-s6-j3-q1",
          question: "Quel est le cycle de vie d'un projet dans le portail CIG ?",
          options: [
            "Design → Build → Run",
            "Project → Configure → Test → Deploy",
            "Plan → Do → Check → Act",
            "Extract → Transform → Load",
          ],
          answer: 1,
          explanation: "Un projet CIG se crée (Project), se paramètre (Configure : interfaces, cross-references, extensions), se valide dans le Test Central (Test) puis est déployé en production (Deploy). « Design → Build → Run » est un découpage générique de projet IT, pas celui du portail. PDCA est une méthode d'amélioration continue. ETL décrit un traitement de données, non le cycle d'un projet d'intégration CIG.",
          concept: "Cycle projet CIG (Project → Configure → Test → Deploy)",
        },
        {
          id: "m8-s6-j3-q2",
          question: "À quoi servent les tables de références croisées (cross-reference) dans CIG ?",
          options: [
            "À stocker les factures en attente",
            "À convertir des codes SAP en codes attendus par Ariba ou cXML (unités, taxes, types de documents)",
            "À remplacer l'add-on ARBCI1",
            "À gérer les mots de passe des fournisseurs",
          ],
          answer: 1,
          explanation: "Les cross-reference tables traduisent les valeurs d'un système dans l'autre : unité de mesure ST → EA, code TVA SAP → catégorie fiscale cXML, type de commande, etc. Elles évitent d'écrire du mapping XSLT pour de simples correspondances de codes. CIG ne stocke pas les factures de manière durable : il les transporte et les trace. Elles ne remplacent pas l'add-on, qui reste nécessaire côté ERP. Les identifiants fournisseurs relèvent du Business Network.",
          concept: "Mappings standard et tables de références croisées",
        },
        {
          id: "m8-s6-j3-q3",
          question: "Dans quel cas privilégier SAP Integration Suite (Cloud Integration) plutôt que CIG / Managed Gateway ?",
          options: [
            "Pour un flux PO standard entre S/4HANA et le Business Network",
            "Quand le client n'a pas d'équipe technique",
            "Pour intégrer un ERP non-SAP ou orchestrer une logique complexe multi-systèmes",
            "CIG ne peut jamais être remplacé",
          ],
          answer: 2,
          explanation: "SAP Integration Suite offre une flexibilité totale (iFlows, scripts) adaptée aux ERP non-SAP et aux orchestrations complexes, au prix d'une exploitation par le client. Pour un flux PO standard S/4HANA ↔ Network, CIG avec ses mappings livrés est plus rapide et moins risqué. Un client sans équipe technique a au contraire intérêt au Managed Gateway, exploité par SAP. CIG n'est pas irremplaçable : les deux approches coexistent souvent.",
          concept: "CIG vs SAP Integration Suite",
        },
        {
          id: "m8-s6-j3-q4",
          question: "Quelle information identifie le compte acheteur du Business Network dans la configuration de l'add-on S/4HANA ?",
          options: [
            "Le Buyer ANID",
            "Le numéro DUNS du fournisseur",
            "Le mandant SAP (client)",
            "Le numéro de bon de commande",
          ],
          answer: 0,
          explanation: "Le Buyer ANID (Ariba Network ID du compte acheteur) est saisi dans la configuration de l'add-on avec le System ID de l'ERP ; il identifie le compte vers lequel CIG route les documents. Le DUNS fournisseur identifie un fournisseur, pas l'acheteur. Le mandant SAP est un concept interne à l'ERP sans signification pour le Network. Le numéro de PO est une donnée transactionnelle, pas un paramètre de connexion.",
          concept: "Connectivité CIG : Buyer ANID, System ID, certificats",
        },
        {
          id: "m8-s6-j3-q5",
          question: "Quelle affirmation sur les custom mappings XSLT dans CIG est correcte ?",
          options: [
            "Ils sont obligatoires pour chaque interface",
            "Ils sont à réserver aux cas non couverts par le standard et les extensions, car ils compliquent les montées de version",
            "Ils s'exécutent dans S/4HANA",
            "Ils remplacent les tables de références croisées",
          ],
          answer: 1,
          explanation: "Le principe « standard d'abord » s'applique : mappings livrés, puis extensions de champs, puis cross-references, et XSLT seulement si tout cela ne suffit pas, car un mapping custom doit être retesté à chaque évolution de CIG. Ils ne sont pas obligatoires : la majorité des interfaces fonctionnent sans. Ils s'exécutent dans CIG, pas dans l'ERP. Ils ne remplacent pas les cross-references, qui restent la solution la plus simple pour des correspondances de codes.",
          concept: "Mappings standard et tables de références croisées",
        },
      ],
    },
    // ───────────────────────── Semaine 6 · Jour 4 ─────────────────────────
    {
      id: "m8-s6-j4-a1",
      moduleId: "m8",
      week: 6,
      day: 4,
      kind: "lecon",
      title: "Flux transactionnels : du bon de commande à la facture",
      level: "avance",
      durationMin: 30,
      objective: "Décrire précisément le parcours technique d'un PO sortant et d'une facture entrante entre S/4HANA, CIG et le Business Network.",
      content: `## Le flux PO sortant

\`\`\`
S/4HANA (ME21N / Fiori / PO issu de la réquisition Ariba)
   └─ Message de sortie (NEU) → IDoc ORDERS (ou proxy) → add-on ARBCI1
        └─ HTTPS → CIG : mapping ORDERS → cXML OrderRequest
             └─ SAP Business Network : création du PO, routage selon la méthode du fournisseur
                  └─ Fournisseur : portail, cXML (OrderRequest poussé vers son URL), EDI, e-mail
\`\`\`

Points de contrôle :

- Le **profil partenaire (WE20)** du fournisseur ou du partenaire logique CIG doit avoir le message ORDERS activé ; une **modification** de PO émet **ORDCHG**.
- Le Network ne crée le PO que si le **fournisseur est identifié** : correspondance entre le numéro fournisseur S/4 et l'ANID, portée par la Supplier Location ou par la relation commerciale Network (*trading relationship*).
- Le **statut du document** sur le Network (Sent, Acknowledged, Confirmed, Shipped, Invoiced) est mis à jour par les documents retour.

## Les documents retour du fournisseur

| Document cXML | Effet dans S/4HANA |
|---|---|
| ConfirmationRequest | Confirmation de commande (EKES), statut partiel ou total, écarts de date/prix |
| ShipNoticeRequest (ASN) | Avis de livraison / inbound delivery |
| InvoiceDetailRequest | Facture fournisseur → IDoc INVOIC → MM-IV |
| ServiceEntryRequest | Feuille de saisie de services (SES) pour les PO de service |

## Le flux facture entrant

1. Le fournisseur crée la facture sur le portail (**PO Flip**), ou l'envoie en cXML / EDI / PDF intelligent.
2. Le Business Network applique les **règles de transaction** acheteur (Invoice rules : facture obligatoirement liée à un PO, pas de dépassement de quantité, taxes obligatoires…). Une facture non conforme est **rejetée immédiatement**, sans jamais atteindre l'ERP.
3. CIG mappe l'**InvoiceDetailRequest** vers un IDoc **INVOIC** (ou un message proxy) et l'envoie à l'add-on.
4. S/4HANA tente la **comptabilisation dans MM-IV** : rapprochement avec le PO et la réception (3-way match), contrôle des **tolérances** (OMR6), détermination du compte et de la TVA.
5. Trois issues : facture **comptabilisée** (payable), **bloquée en paiement** (écart de prix/quantité, indicateur R), ou **pré-enregistrée** (parked) si une donnée manque.
6. Le statut remonte vers le Network via **StatusUpdateRequest** (Approved, Rejected, Paid) puis **PaymentRemittanceRequest** après paiement.

> Le fournisseur voit sur le Network l'avancement de sa facture : c'est l'un des bénéfices les plus visibles pour l'équipe comptable, qui reçoit moins de relances.

## Le flux réception

La **réception (MIGO)** dans S/4 peut être envoyée au Network (ReceiptRequest) : le fournisseur voit que la marchandise est acceptée et peut facturer. Dans Guided Buying, le demandeur peut aussi réceptionner dans Ariba ; la réception est alors répliquée vers S/4.

## Points de vigilance avancés

- **Taxes** : le code TVA S/4 doit être dérivé depuis la catégorie et le taux transmis dans la facture ; sans cross-reference fiable, la facture part en erreur de mapping.
- **Fournisseurs multi-adresses** : un fournisseur avec plusieurs Supplier Locations et un seul ANID nécessite une règle de routage.
- **Service procurement** : les PO de service suivent un cycle SES → approbation → facture ; l'erreur classique est d'oublier d'activer l'interface SES côté CIG.
- **Idempotence** : chaque message cXML porte un **payloadID** unique ; le Network rejette les doublons, ce qui protège d'une double facture.`,
      keyPoints: [
        "PO sortant : S/4 → IDoc ORDERS/ORDCHG → add-on → CIG → cXML OrderRequest → Network → fournisseur.",
        "Facture entrante : fournisseur → Network (règles de transaction) → CIG → IDoc INVOIC → MM-IV (3-way match, tolérances).",
        "Les documents retour (confirmation, ASN, SES) mettent à jour le PO et son statut Network.",
        "Statuts et paiements remontent au fournisseur via StatusUpdateRequest et PaymentRemittanceRequest.",
        "Taxes, multi-adresses et commandes de service concentrent les erreurs de mapping.",
      ],
    },
    {
      id: "m8-s6-j4-a2",
      moduleId: "m8",
      week: 6,
      day: 4,
      kind: "exercice",
      title: "Tracer un PO et sa facture de bout en bout",
      level: "avance",
      durationMin: 40,
      objective: "Reconstituer la chaîne de documents et de statuts d'un PO puis d'une facture, et lire un OrderRequest cXML.",
      context: `## Situation

Chez **Nordelec**, le PO **4500012345** (2 lignes : 10 disjoncteurs à 45 EUR, 5 coffrets à 120 EUR, TVA 20 %) a été envoyé au fournisseur **Électro-Distrib** (ANID AN01000012345). Le fournisseur confirme 10 disjoncteurs mais seulement 3 coffrets, livre, puis facture 10 disjoncteurs à 45 EUR et 3 coffrets à 125 EUR. La tolérance de prix S/4 est de 2 %.

Vous devez expliquer au comptable ce qui va se passer et lui montrer à quoi ressemble le message cXML du PO.`,
      steps: [
        "Décrivez étape par étape le parcours du PO 4500012345, du message de sortie S/4 jusqu'au compte Network du fournisseur, en nommant chaque message (IDoc, cXML).",
        "Indiquez les statuts successifs du PO sur le Business Network après la confirmation partielle et la livraison.",
        "Déterminez le sort de la facture dans S/4HANA ligne par ligne (comptabilisée, bloquée, rejetée) et justifiez avec la règle de tolérance.",
        "Expliquez quel document cXML renvoie le statut de la facture au fournisseur et ce qu'il verra sur son portail.",
        "Rédigez un OrderRequest cXML simplifié mais complet (enveloppe, Header, OrderRequestHeader, 2 ItemOut) correspondant au PO.",
        "Listez 3 vérifications à faire dans le Transaction Tracker CIG et dans S/4 (WE02/WE05, AIF) si le fournisseur dit n'avoir rien reçu.",
      ],
      deliverable: "Une fiche de traçabilité (parcours, statuts, sort de la facture) et le fichier OrderRequest.xml commenté.",
      solution: `## Parcours du PO

1. Sauvegarde du PO dans S/4 → message de sortie NEU, médium EDI → **IDoc ORDERS** (type de base ORDERS05) vers le partenaire logique CIG.
2. L'add-on ARBCI1 pousse l'IDoc vers CIG en HTTPS ; CIG le mappe en **cXML OrderRequest** (payloadID unique, From = Buyer ANID, To = AN01000012345).
3. Le Business Network crée le PO, statut **Sent** ; le fournisseur reçoit une notification ou le cXML sur son endpoint.
4. Confirmation partielle → **ConfirmationRequest** (type « detail », 10 disjoncteurs acceptés, 3 coffrets acceptés, 2 rejetés ou en reliquat) → statut **Partially Confirmed** ; S/4 met à jour EKES.
5. Livraison → **ShipNoticeRequest** → statut **Shipped** ; réception MIGO → ReceiptRequest → **Received**.

## Sort de la facture

| Ligne | PO | Facturé | Résultat |
|---|---|---|---|
| Disjoncteurs | 10 × 45 | 10 × 45 | Comptabilisée, conforme |
| Coffrets | 5 × 120 | 3 × 125 | Quantité ≤ reçue : OK ; prix +4,2 % > tolérance 2 % : **facture bloquée en paiement** (indicateur R, motif prix) |

La facture entière passe le Network (une règle de transaction interdisant le dépassement de prix l'aurait rejetée avant l'ERP), est comptabilisée dans MM-IV mais **bloquée en paiement** jusqu'à libération (MRBR) ou avoir fournisseur. Le fournisseur voit via **StatusUpdateRequest** le statut « Approved » puis, une fois le blocage levé et le paiement émis, « Paid » avec un **PaymentRemittanceRequest**.

## OrderRequest simplifié

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.050/cXML.dtd">
<cXML payloadID="20260611153000.4500012345@nordelec.fr" timestamp="2026-06-11T15:30:00+02:00" xml:lang="fr-FR">
  <Header>
    <From><Credential domain="NetworkID"><Identity>AN01000098765</Identity></Credential></From>   <!-- Buyer ANID -->
    <To><Credential domain="NetworkID"><Identity>AN01000012345</Identity></Credential></To>       <!-- Fournisseur -->
    <Sender>
      <Credential domain="NetworkID"><Identity>AN01000098765</Identity><SharedSecret>******</SharedSecret></Credential>
      <UserAgent>SAP S/4HANA via CIG</UserAgent>
    </Sender>
  </Header>
  <Request deploymentMode="test">
    <OrderRequest>
      <OrderRequestHeader orderID="4500012345" orderDate="2026-06-11T15:30:00+02:00" type="new">
        <Total><Money currency="EUR">1050.00</Money></Total>
        <ShipTo><Address addressID="FR01-LYON"><Name xml:lang="fr">Nordelec Lyon</Name>
          <PostalAddress><Street>12 rue de l'Industrie</Street><City>Lyon</City><PostalCode>69007</PostalCode><Country isoCountryCode="FR">France</Country></PostalAddress></Address></ShipTo>
        <BillTo><Address addressID="FR01"><Name xml:lang="fr">Nordelec SAS</Name>
          <PostalAddress><Street>1 avenue du Nord</Street><City>Lille</City><PostalCode>59000</PostalCode><Country isoCountryCode="FR">France</Country></PostalAddress></Address></BillTo>
        <PaymentTerm payInNumberOfDays="30"/>
      </OrderRequestHeader>
      <ItemOut quantity="10" lineNumber="1" requestedDeliveryDate="2026-06-25T00:00:00+02:00">
        <ItemID><SupplierPartID>DJ-C16-2P</SupplierPartID></ItemID>
        <ItemDetail><UnitPrice><Money currency="EUR">45.00</Money></UnitPrice>
          <Description xml:lang="fr">Disjoncteur C16 bipolaire</Description><UnitOfMeasure>EA</UnitOfMeasure>
          <Classification domain="UNSPSC">39121601</Classification></ItemDetail>
        <Tax><Money currency="EUR">90.00</Money><Description xml:lang="fr">TVA 20%</Description></Tax>
      </ItemOut>
      <ItemOut quantity="5" lineNumber="2" requestedDeliveryDate="2026-06-25T00:00:00+02:00">
        <ItemID><SupplierPartID>COF-13M</SupplierPartID></ItemID>
        <ItemDetail><UnitPrice><Money currency="EUR">120.00</Money></UnitPrice>
          <Description xml:lang="fr">Coffret 13 modules</Description><UnitOfMeasure>EA</UnitOfMeasure>
          <Classification domain="UNSPSC">39121300</Classification></ItemDetail>
      </ItemOut>
    </OrderRequest>
  </Request>
</cXML>
\`\`\`

Le **payloadID** garantit l'unicité ; **deploymentMode="test"** cible le Network de test ; **orderID** = numéro S/4 ; **addressID** correspond aux adresses répliquées.

## Si le fournisseur n'a rien reçu

1. **WE02/WE05** côté S/4 : l'IDoc ORDERS est-il en statut 03 (envoyé) ou bloqué en 02/26/29 (erreur de syntaxe ou de port) ?
2. **Transaction Tracker CIG** : rechercher 4500012345 ; statut *Delivered* au Network ou erreur (connectivité, mapping) ?
3. **Business Network, compte acheteur** : le PO existe-t-il ? Est-il routé vers le bon ANID ? Le fournisseur a-t-il configuré sa méthode de routage (e-mail, cXML, portail) ?`,
      tips: [
        "Reconstituez toujours la chaîne dans l'ordre technique : S/4 → add-on → CIG → Network → fournisseur ; l'erreur est au premier maillon qui ne montre rien.",
        "Le numéro de PO S/4 (orderID) est votre clé de recherche partout ; faites-le apparaître dans vos tickets.",
        "Distinguez « rejeté par le Network » (jamais arrivé en ERP) de « bloqué en paiement » (comptabilisé, mais non payable).",
      ],
    },
    {
      id: "m8-s6-j4-a3",
      moduleId: "m8",
      week: 6,
      day: 4,
      kind: "quiz",
      title: "Quiz : flux PO et facture",
      level: "avance",
      durationMin: 12,
      objective: "Vérifier la connaissance des messages et statuts des flux transactionnels.",
      questions: [
        {
          id: "m8-s6-j4-q1",
          question: "Quel IDoc est émis par S/4HANA lors de la modification d'un bon de commande déjà envoyé au Network ?",
          options: ["ORDERS", "ORDCHG", "INVOIC", "DESADV"],
          answer: 1,
          explanation: "ORDCHG (order change) véhicule la modification d'un PO existant et donne lieu à une nouvelle version du document sur le Business Network. ORDERS est émis à la création initiale du PO. INVOIC transporte une facture, dans l'autre sens (entrant vers l'ERP dans ce scénario). DESADV est l'avis d'expédition, équivalent IDoc de l'ASN, émis par le fournisseur ou un WMS, pas par l'acheteur pour modifier un PO.",
          concept: "Flux PO sortant : IDoc ORDERS/ORDCHG et OrderRequest",
        },
        {
          id: "m8-s6-j4-q2",
          question: "Une facture ne respecte pas une règle de transaction du Business Network (facture sans référence PO). Que se passe-t-il ?",
          options: [
            "Elle est comptabilisée en pré-enregistrement dans S/4HANA",
            "Elle est rejetée par le Network et n'atteint jamais l'ERP",
            "Elle est bloquée en paiement dans S/4HANA",
            "CIG la transforme en facture avec PO",
          ],
          answer: 1,
          explanation: "Les règles de transaction (Invoice rules) sont appliquées par le Business Network au moment de la soumission : une facture non conforme est rejetée immédiatement et le fournisseur doit la corriger ; l'ERP n'est jamais sollicité. Le pré-enregistrement et le blocage en paiement sont des issues internes à MM-IV, pour des factures ayant franchi le Network. CIG mappe et route, il ne corrige pas le contenu métier d'une facture.",
          concept: "Flux facture entrant : règles de transaction, MM-IV, tolérances",
        },
        {
          id: "m8-s6-j4-q3",
          question: "Quel document cXML informe le fournisseur que sa facture a été payée ?",
          options: ["ConfirmationRequest", "ReceiptRequest", "PaymentRemittanceRequest", "ProfileRequest"],
          answer: 2,
          explanation: "Le PaymentRemittanceRequest est l'avis de paiement envoyé par l'acheteur (via CIG) après émission du règlement ; le fournisseur voit le statut « Paid » et les détails de la remise. Le ConfirmationRequest est la confirmation de commande émise par le fournisseur. Le ReceiptRequest informe de la réception des marchandises. Le ProfileRequest est un message technique de découverte des capacités d'un endpoint cXML.",
          concept: "Statuts et paiement : StatusUpdateRequest, PaymentRemittanceRequest",
        },
        {
          id: "m8-s6-j4-q4",
          question: "Une facture dépasse la tolérance de prix paramétrée dans S/4HANA (OMR6). Quelle est l'issue la plus probable ?",
          options: [
            "La facture est supprimée automatiquement",
            "La facture est comptabilisée mais bloquée en paiement",
            "Le Network renvoie la facture au fournisseur",
            "Le PO est automatiquement modifié au nouveau prix",
          ],
          answer: 1,
          explanation: "En MM-IV, un écart de prix hors tolérance entraîne la comptabilisation de la facture avec un blocage en paiement (indicateur R) à lever via MRBR ou par avoir. La suppression automatique n'existe pas. Le Network n'intervient pas : la facture a déjà franchi ses règles, sauf si une règle acheteur de contrôle de prix est activée. Le PO n'est jamais modifié automatiquement par une facture : c'est l'acheteur qui décide.",
          concept: "Flux facture entrant : règles de transaction, MM-IV, tolérances",
        },
        {
          id: "m8-s6-j4-q5",
          question: "Quel attribut cXML permet au Business Network de détecter et rejeter un message en doublon ?",
          options: ["timestamp", "payloadID", "deploymentMode", "orderID"],
          answer: 1,
          explanation: "Le payloadID est l'identifiant unique de chaque message cXML ; le Network rejette un second message portant le même payloadID, ce qui protège d'une double facture ou d'un double PO. Le timestamp horodate le message mais n'est pas unique. deploymentMode indique test ou production. orderID identifie le PO métier : plusieurs messages légitimes (création, modification, confirmation) portent le même orderID.",
          concept: "Enveloppe cXML : Header, Credential, payloadID, deploymentMode",
        },
      ],
    },
    // ───────────────────────── Semaine 6 · Jour 5 ─────────────────────────
    {
      id: "m8-s6-j5-a1",
      moduleId: "m8",
      week: 6,
      day: 5,
      kind: "lecon",
      title: "Mappings, extensions et paramétrage CIG",
      level: "avance",
      durationMin: 30,
      objective: "Savoir où et comment intervenir dans CIG quand le standard ne suffit pas : cross-references, extensions, XSLT, paramètres d'interface.",
      content: `## La hiérarchie des interventions

Quand un champ n'arrive pas, ou pas sous la bonne forme, le consultant intervient dans cet ordre :

1. **Paramétrage S/4HANA** : souvent la bonne valeur existe déjà dans l'ERP (unité ISO dans CUNI, code pays, données partenaire). Corriger la source évite tout mapping.
2. **Paramètres d'interface CIG** : chaque interface a des options (ex. envoyer la description longue, inclure les textes d'en-tête, mode de gestion des pièces jointes).
3. **Cross-reference tables** : correspondance de codes.
4. **Extensions** : ajout de champs à l'enveloppe standard via les segments d'extension de l'add-on (**E1EDK** pour l'en-tête, **E1EDP** pour les postes, ou structures d'extension des proxies) et leur reprise dans le cXML (**Extrinsic**).
5. **Custom mapping XSLT** : transformation sur mesure du message, à documenter et à versionner.

> Chaque niveau coûte plus cher à maintenir que le précédent. Un bon consultant épuise les niveaux 1 à 3 avant de parler de XSLT.

## Les Extrinsics cXML

Le cXML permet de transporter des informations hors standard dans des balises \`Extrinsic\` nommées. Exemple : transmettre le numéro de projet interne sur une ligne de PO :

\`\`\`xml
<ItemOut quantity="1" lineNumber="1">
  ...
  <Extrinsic name="ProjectCode">PRJ-2026-017</Extrinsic>
</ItemOut>
\`\`\`

Côté S/4, cette valeur vient d'un champ Z du poste de commande, poussé dans un segment d'extension par une **BAdI** de l'add-on (ex. */ARBA/BADI_OUTBOUND_PO*), puis mappé par CIG dans l'Extrinsic grâce à une **extension de mapping** déclarée dans le projet. Le fournisseur la reprendra dans sa facture, et le flux retour la remettra dans le champ Z.

## Cross-references : exemples concrets

| Table | Valeur SAP | Valeur cXML / Ariba |
|---|---|---|
| Unit of Measure | ST | EA |
| Unit of Measure | H | HUR |
| Tax Code | V1 (20 %) | VAT, 20.0, category standard |
| Document Type | NB | Material order |
| Document Type | FO | Service order (blanket) |
| Payment Terms | Z030 | payInNumberOfDays=30 |
| Country | DE | DE (ISO, pas de mapping mais contrôle) |

Les tables se chargent par fichier CSV dans le projet CIG, puis se **déploient** avec le projet. Une valeur manquante produit une erreur de type **mapping** dans le Transaction Tracker : « Cross reference not found for … ».

## Paramètres clés du projet

- **Connection** : URL d'endpoint, certificat, utilisateur technique, **System ID** (identifiant logique du S/4), **Buyer ANID**.
- **Interfaces** activées et leur **version** (CIG livre plusieurs versions de mapping ; changer de version impose de retester).
- **Options par interface** : par exemple pour la facture entrante, *Tolérance de quantité gérée par l'ERP*, *Création en pré-enregistrement si écart*, *Blocage des factures sans réception*.
- **Routage multi-ERP** : un même compte Network peut alimenter plusieurs System ID ; la règle de routage (par société, par Supplier Location) se définit dans CIG.

## Gestion des versions et transport

- Le projet CIG de **test** est indépendant de celui de **production** ; on déploie le même contenu dans les deux environnements, dans le même ordre que les transports S/4 (DEV → QAS → PRD).
- Les mappings XSLT custom doivent être conservés dans un dépôt (Git) avec la spécification fonctionnelle associée.
- À chaque **release CIG** (mensuelle), relire les notes de version : certaines modifient les mappings standard et peuvent impacter une extension.

## Bonnes pratiques de spécification

Une spécification de mapping efficace contient, pour chaque champ : source S/4 (table/champ), transformation, cible cXML (XPath), obligatoire ou non, valeur par défaut, exemple. C'est ce document que l'on relit en cellule de crise quand une facture tombe en erreur.`,
      keyPoints: [
        "Ordre d'intervention : paramétrage S/4 → options d'interface → cross-reference → extension → XSLT.",
        "Les Extrinsics cXML transportent les champs hors standard, alimentés via BAdI et extension de mapping.",
        "Une cross-reference manquante produit une erreur de mapping explicite dans le Transaction Tracker.",
        "Test et production sont deux projets CIG à déployer de manière synchronisée avec les transports S/4.",
        "La spécification de mapping champ à champ est le document de référence en support.",
      ],
    },
    {
      id: "m8-s6-j5-a2",
      moduleId: "m8",
      week: 6,
      day: 5,
      kind: "exercice",
      title: "Rédiger une spécification de mapping pour un champ custom",
      level: "avance",
      durationMin: 40,
      objective: "Spécifier de bout en bout la transmission d'un champ personnalisé S/4 → cXML → facture → S/4, en choisissant le bon niveau d'intervention.",
      context: `## Situation

Chez **Nordelec**, le contrôle de gestion impose que chaque ligne de PO porte un **code chantier** (champ Z_CHANTIER, 10 caractères, table EKPO étendue) et que ce code revienne sur la facture pour être contrôlé automatiquement : si le code facturé diffère du code commandé, la facture doit être pré-enregistrée (parked) et non comptabilisée. Par ailleurs, l'unité de mesure « JOU » (journée) utilisée pour les prestations n'est pas reconnue par le Network.`,
      steps: [
        "Pour le code chantier, décidez du niveau d'intervention (paramétrage, option, cross-reference, extension, XSLT) et justifiez.",
        "Rédigez la ligne de spécification de mapping du champ sur le flux PO sortant (source, segment d'extension, XPath cXML cible, obligatoire, défaut, exemple).",
        "Rédigez la ligne de spécification pour le flux facture entrant (XPath cXML source, segment IDoc INVOIC cible, traitement si valeur différente du PO).",
        "Pour l'unité « JOU », choisissez la solution la plus simple et indiquez la table et les valeurs à renseigner.",
        "Décrivez les tests à réaliser dans le Test Central et les messages d'erreur attendus en cas de valeur manquante.",
        "Évaluez l'impact en maintenance à chaque release CIG et proposez une mesure de prévention.",
      ],
      deliverable: "Un extrait de spécification de mapping (tableau) couvrant les deux champs, avec la justification des choix et le plan de test associé.",
      solution: `## Code chantier : niveau d'intervention

Le champ n'existe pas dans le standard cXML → ni paramétrage ni cross-reference ne suffisent. La solution est une **extension** : BAdI de l'add-on pour remplir un segment d'extension, extension de mapping CIG vers un \`Extrinsic\`, et symétriquement en retour. Pas besoin de XSLT : l'Extrinsic est le mécanisme prévu.

## Spécification – PO sortant

| Champ | Source S/4 | Segment IDoc / proxy | Cible cXML (XPath) | Oblig. | Défaut | Exemple |
|---|---|---|---|---|---|---|
| Code chantier | EKPO-ZZ_CHANTIER | E1EDP01 → E1EDPT1/ZZ ext. (via /ARBA/BADI_OUTBOUND_PO) | /cXML/Request/OrderRequest/ItemOut/Extrinsic[@name='ChantierCode'] | Oui si commande travaux | – | CH-LYON-07 |

## Spécification – Facture entrante

| Champ | Source cXML (XPath) | Cible IDoc INVOIC | Traitement |
|---|---|---|---|
| Code chantier | /cXML/Request/InvoiceDetailRequest/InvoiceDetailOrder/InvoiceDetailItem/Extrinsic[@name='ChantierCode'] | E1EDP01 extension → champ ZZ_CHANTIER de la ligne de facture | Si vide : reprendre la valeur du PO ; si différent du PO : pré-enregistrement (parking) via BAdI inbound, motif « Écart code chantier » |

Le fournisseur doit recopier l'Extrinsic sur sa facture : lors d'un **PO Flip** sur le portail, les Extrinsics du PO sont repris automatiquement ; en cXML direct, c'est à spécifier dans son guide d'intégration.

## Unité « JOU »

Solution la plus simple : **cross-reference Unit of Measure** dans CIG : JOU → **DAY** (code ISO). Vérifier au préalable dans CUNI (S/4) que l'unité JOU a bien un code ISO associé ; si c'est le cas, l'add-on peut déjà l'envoyer sans mapping.

| Table CIG | SAP | ISO |
|---|---|---|
| UnitOfMeasure | JOU | DAY |

## Tests

1. PO travaux avec code chantier → vérifier dans le Transaction Tracker le cXML sortant et la présence de l'Extrinsic ; sur le compte fournisseur test, l'afficher.
2. PO Flip avec code identique → facture comptabilisée.
3. Facture cXML avec code différent → facture pré-enregistrée, motif visible dans MIR4.
4. PO de prestation en JOU → UnitOfMeasure DAY dans le cXML ; sans cross-reference, erreur attendue : « Cross reference not found for UnitOfMeasure JOU ».

## Maintenance

Chaque release CIG peut modifier le mapping standard de l'interface facture ; l'extension doit être retestée (scénarios 2 et 3). Mesure : inscrire ces deux tests dans la **campagne de non-régression mensuelle** et conserver la spécification dans le dépôt du projet.`,
      tips: [
        "Nommez vos Extrinsics de façon stable et explicite : le nom fait partie du contrat avec les fournisseurs intégrés en cXML.",
        "Avant toute extension, vérifiez si un champ standard proche existe déjà (par ex. Comments, AccountingSegment).",
        "La règle « valeur différente du PO → parking » se code côté S/4, pas dans CIG : le middleware ne doit pas porter de logique métier.",
      ],
    },
    {
      id: "m8-s6-j5-a3",
      moduleId: "m8",
      week: 6,
      day: 5,
      kind: "quiz",
      title: "Quiz : mappings et paramétrage CIG",
      level: "avance",
      durationMin: 12,
      objective: "Valider la maîtrise des niveaux d'intervention et des mécanismes d'extension.",
      questions: [
        {
          id: "m8-s6-j5-q1",
          question: "Quel mécanisme cXML permet de transporter un champ personnalisé non prévu par le standard ?",
          options: ["Un attribut deploymentMode", "Une balise Extrinsic nommée", "Un second Header", "Un SharedSecret supplémentaire"],
          answer: 1,
          explanation: "La balise Extrinsic, avec son attribut name, est l'extension prévue par cXML pour les données hors standard, sur l'en-tête ou les lignes. deploymentMode indique seulement test ou production. Un cXML ne contient qu'un seul Header, sinon le message est invalide. Le SharedSecret est un élément d'authentification du Sender, pas un véhicule de données métier.",
          concept: "Extensions et Extrinsics cXML",
        },
        {
          id: "m8-s6-j5-q2",
          question: "Le Transaction Tracker affiche « Cross reference not found for UnitOfMeasure ST ». Quelle est la correction la plus adaptée ?",
          options: [
            "Écrire un mapping XSLT complet de l'interface",
            "Ajouter la correspondance ST → EA dans la table de références croisées et redéployer",
            "Supprimer l'unité de mesure du PO",
            "Réinstaller l'add-on ARBCI1",
          ],
          answer: 1,
          explanation: "L'erreur indique précisément une valeur absente d'une cross-reference : il suffit d'ajouter ST → EA (code ISO) et de redéployer le projet. Un XSLT complet est disproportionné et coûteux à maintenir pour une simple correspondance de codes. Supprimer l'unité rendrait le PO invalide. L'add-on n'est pas en cause : le message a bien atteint CIG, l'erreur est au niveau du mapping.",
          concept: "Mappings standard et tables de références croisées",
        },
        {
          id: "m8-s6-j5-q3",
          question: "Dans quel ordre un consultant doit-il envisager les interventions pour corriger un champ mal transmis ?",
          options: [
            "XSLT → extension → cross-reference → paramétrage S/4",
            "Paramétrage S/4 → options d'interface → cross-reference → extension → XSLT",
            "Extension → XSLT → paramétrage S/4",
            "Toujours commencer par le XSLT, c'est le plus rapide",
          ],
          answer: 1,
          explanation: "La hiérarchie va du moins coûteux au plus coûteux en maintenance : corriger la source dans S/4, utiliser les options livrées de l'interface, puis les tables de correspondance, puis une extension de champ, et en dernier recours un mapping XSLT. Les ordres inversés conduisent à du code custom là où une correction de paramétrage suffisait. Le XSLT est le plus rapide à écrire mais le plus coûteux à retester à chaque release CIG.",
          concept: "Hiérarchie des interventions de mapping",
        },
        {
          id: "m8-s6-j5-q4",
          question: "Comment un champ Z du poste de commande S/4 est-il généralement alimenté vers CIG ?",
          options: [
            "En modifiant directement le DTD cXML",
            "Via une BAdI de l'add-on qui remplit un segment d'extension de l'IDoc ou du proxy",
            "En saisissant la valeur manuellement sur le Business Network",
            "Via une tâche d'import ITK",
          ],
          answer: 1,
          explanation: "L'add-on fournit des BAdI (par ex. pour le PO sortant) permettant de lire le champ Z et de le placer dans un segment d'extension ; CIG le mappe ensuite vers un Extrinsic. Le DTD cXML est une norme publique que l'on ne modifie pas. Le Business Network ne permet pas de saisir des champs d'un PO émis par l'ERP. L'ITK sert aux imports de données de base, pas aux documents transactionnels.",
          concept: "Extensions et Extrinsics cXML",
        },
        {
          id: "m8-s6-j5-q5",
          question: "Pourquoi faut-il retester les extensions CIG à chaque release mensuelle ?",
          options: [
            "Parce que les releases suppriment toutes les extensions",
            "Parce qu'une release peut modifier les mappings standard sur lesquels s'appuient les extensions",
            "Parce que le certificat expire à chaque release",
            "Ce n'est pas nécessaire, les extensions sont isolées",
          ],
          answer: 1,
          explanation: "Les releases CIG font évoluer les mappings standard ; une extension ou un XSLT greffé sur ces mappings peut être impacté, d'où une campagne de non-régression ciblée. Les releases ne suppriment pas les extensions, qui font partie du projet du client. Les certificats ont leur propre cycle de vie, indépendant des releases. Les extensions ne sont pas isolées : elles s'exécutent sur la structure produite par le standard.",
          concept: "Cycle de vie et releases CIG",
        },
      ],
    },
    // ───────────────────────── Semaine 7 · Jour 1 ─────────────────────────
    {
      id: "m8-s7-j1-a1",
      moduleId: "m8",
      week: 7,
      day: 1,
      kind: "lecon",
      title: "cXML en profondeur : enveloppe, messages et cycle de vie",
      level: "avance",
      durationMin: 30,
      objective: "Lire et écrire un message cXML, connaître les principaux types de messages et le fonctionnement requête/réponse.",
      content: `## Qu'est-ce que cXML ?

**cXML (commerce eXtensible Markup Language)** est le protocole XML standard du SAP Business Network pour échanger des documents commerciaux entre acheteurs, fournisseurs et places de marché. Il est défini par un **DTD public** (version courante 1.2.0xx) et transporté en **HTTPS POST**. Tout document échangé avec le Network (PO, facture, confirmation, catalogue PunchOut) est, en interne, du cXML.

## L'enveloppe

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.050/cXML.dtd">
<cXML payloadID="1718100000.123@buyer.example" timestamp="2026-06-11T10:00:00+02:00" xml:lang="fr-FR">
  <Header>
    <From>…</From>      <!-- Émetteur logique (l'acheteur) -->
    <To>…</To>          <!-- Destinataire logique (le fournisseur) -->
    <Sender>…</Sender>  <!-- Système qui envoie réellement : identité + authentification -->
  </Header>
  <Request deploymentMode="production">
    <!-- un seul document métier ici -->
  </Request>
</cXML>
\`\`\`

- **payloadID** : identifiant unique mondial (convention : horodatage.aléatoire@domaine). Base de l'idempotence.
- **timestamp** : ISO 8601 avec fuseau.
- **From / To / Sender** contiennent des \`Credential\` avec un **domain** : \`NetworkID\` (ANID), \`DUNS\`, \`AribaNetworkUserId\`, ou un domaine privé. Le \`Sender\` porte le **SharedSecret** (mot de passe partagé) ou s'authentifie par certificat client.
- **deploymentMode** : \`test\` ou \`production\` ; un document de test envoyé en production est une erreur classique de cutover.

## Requête, réponse et messages one-way

| Forme | Élément racine | Usage |
|---|---|---|
| Request | \`<Request>\` | Document envoyé, attend une \`<Response>\` synchrone avec un \`<Status code="200" text="OK"/>\` |
| Response | \`<Response>\` | Accusé de réception technique ; code 2xx succès, 4xx erreur du client (400 Bad Request, 401 Unauthorized, 403 Forbidden, 406 Not Acceptable – validation), 5xx erreur serveur |
| Message | \`<Message>\` | Flux one-way asynchrone, par ex. le **PunchOutOrderMessage** qui ramène le panier PunchOut dans Ariba |

> Un **Status 200** signifie « message reçu et syntaxiquement accepté », pas « document traité par le fournisseur ». Les erreurs métier arrivent plus tard, par un document retour ou un statut sur le Network.

## Les principaux messages

| Message | Sens | Rôle |
|---|---|---|
| OrderRequest | Acheteur → Fournisseur | Bon de commande (type new / update / delete) |
| ConfirmationRequest | Fournisseur → Acheteur | Confirmation de commande (accept, reject, detail) |
| ShipNoticeRequest | Fournisseur → Acheteur | Avis d'expédition (ASN) |
| InvoiceDetailRequest | Fournisseur → Acheteur | Facture détaillée (ligne par ligne, taxes, remises) |
| ServiceEntryRequest | Fournisseur → Acheteur | Feuille de service |
| ReceiptRequest | Acheteur → Fournisseur | Réception de marchandises |
| StatusUpdateRequest | Acheteur → Fournisseur | Statut d'une facture (approved, rejected, paid) |
| PaymentRemittanceRequest | Acheteur → Fournisseur | Avis de paiement |
| CopyRequest | Système → Tiers | Copie d'un document à un tiers (ex. vers un ERP d'archivage) |
| ProfileRequest | Tout → Endpoint | Interroge les transactions supportées par l'endpoint (ProfileResponse) |
| PunchOutSetupRequest | Acheteur → Catalogue fournisseur | Ouverture d'une session PunchOut |

## Structure d'une facture

L'**InvoiceDetailRequest** contient un en-tête (\`InvoiceDetailRequestHeader\` : numéro de facture, date, \`InvoicePartner\` billTo / remitTo, \`PaymentTerm\`), puis un ou plusieurs \`InvoiceDetailOrder\` référençant le PO (\`OrderReference orderID\`) et ses \`InvoiceDetailItem\` (quantité, \`UnitPrice\`, \`SubtotalAmount\`, \`Tax\` par ligne), et enfin un \`InvoiceDetailSummary\` (sous-total, taxes, frais de port, **GrossAmount**, **NetAmount**, **DueAmount**). Le Network contrôle la **cohérence arithmétique** : une somme de lignes qui ne correspond pas au total est rejetée.

## cXML vs EDI

Le Network accepte aussi l'**EDI** (ANSI X12 850/855/856/810, EDIFACT ORDERS/INVOIC) pour les fournisseurs qui l'utilisent déjà ; le Network traduit en cXML en interne. Pour l'acheteur intégré via CIG, cela ne change rien : il reçoit toujours des documents normalisés.`,
      keyPoints: [
        "cXML = XML normé par un DTD, transporté en HTTPS POST, avec enveloppe Header (From/To/Sender) et payloadID unique.",
        "Credential domain NetworkID (ANID) ou DUNS ; authentification par SharedSecret ou certificat.",
        "Request → Response synchrone avec Status 2xx/4xx/5xx ; Message pour les flux one-way (PunchOut).",
        "Messages clés : OrderRequest, ConfirmationRequest, ShipNoticeRequest, InvoiceDetailRequest, StatusUpdateRequest, PaymentRemittanceRequest.",
        "Un Status 200 est un accusé technique, pas une validation métier.",
      ],
    },
    {
      id: "m8-s7-j1-a2",
      moduleId: "m8",
      week: 7,
      day: 1,
      kind: "exercice",
      title: "Analyser et corriger une facture cXML rejetée",
      level: "avance",
      durationMin: 40,
      objective: "Lire un InvoiceDetailRequest, repérer les erreurs de structure et de cohérence, et produire la version corrigée.",
      context: `## Situation

Le fournisseur **Électro-Distrib** envoie en cXML une facture pour le PO 4500012345 ; le Business Network la rejette avec « 406 Not Acceptable – Invoice totals do not match line items ; missing Sender credential ». Le fournisseur vous transmet le message et demande de l'aide. Les règles acheteur imposent : référence PO obligatoire, taxe par ligne, écart total nul.

Message reçu (abrégé) :

\`\`\`xml
<cXML payloadID="inv-7788" timestamp="2026-06-20T09:00:00">
  <Header>
    <From><Credential domain="NetworkID"><Identity>AN01000012345</Identity></Credential></From>
    <To><Credential domain="NetworkID"><Identity>AN01000098765</Identity></Credential></To>
  </Header>
  <Request deploymentMode="production">
    <InvoiceDetailRequest>
      <InvoiceDetailRequestHeader invoiceID="F2026-0455" purpose="standard" operation="new" invoiceDate="2026-06-20T09:00:00+02:00">
        <InvoiceDetailHeaderIndicator/>
        <InvoiceDetailLineIndicator isTaxInLine="yes"/>
        <InvoicePartner><Contact role="billTo"><Name xml:lang="fr">Nordelec SAS</Name></Contact></InvoicePartner>
      </InvoiceDetailRequestHeader>
      <InvoiceDetailOrder>
        <InvoiceDetailOrderInfo><OrderReference orderID="4500012345"><DocumentReference payloadID="20260611153000.4500012345@nordelec.fr"/></OrderReference></InvoiceDetailOrderInfo>
        <InvoiceDetailItem invoiceLineNumber="1" quantity="10">
          <UnitOfMeasure>EA</UnitOfMeasure><UnitPrice><Money currency="EUR">45.00</Money></UnitPrice>
          <InvoiceDetailItemReference lineNumber="1"><ItemID><SupplierPartID>DJ-C16-2P</SupplierPartID></ItemID></InvoiceDetailItemReference>
          <SubtotalAmount><Money currency="EUR">450.00</Money></SubtotalAmount>
        </InvoiceDetailItem>
        <InvoiceDetailItem invoiceLineNumber="2" quantity="3">
          <UnitOfMeasure>EA</UnitOfMeasure><UnitPrice><Money currency="EUR">125.00</Money></UnitPrice>
          <InvoiceDetailItemReference lineNumber="2"><ItemID><SupplierPartID>COF-13M</SupplierPartID></ItemID></InvoiceDetailItemReference>
          <SubtotalAmount><Money currency="EUR">375.00</Money></SubtotalAmount>
          <Tax><Money currency="EUR">75.00</Money><Description xml:lang="fr">TVA</Description></Tax>
        </InvoiceDetailItem>
      </InvoiceDetailOrder>
      <InvoiceDetailSummary>
        <SubtotalAmount><Money currency="EUR">825.00</Money></SubtotalAmount>
        <Tax><Money currency="EUR">75.00</Money><Description xml:lang="fr">TVA</Description></Tax>
        <GrossAmount><Money currency="EUR">990.00</Money></GrossAmount>
        <NetAmount><Money currency="EUR">990.00</Money></NetAmount>
        <DueAmount><Money currency="EUR">990.00</Money></DueAmount>
      </InvoiceDetailSummary>
    </InvoiceDetailRequest>
  </Request>
</cXML>
\`\`\``,
      steps: [
        "Relevez les anomalies de l'enveloppe (Header, attributs cXML) et expliquez leur conséquence.",
        "Vérifiez la cohérence arithmétique : sous-totaux, taxes par ligne, totaux du Summary ; identifiez l'écart.",
        "Vérifiez le respect des règles acheteur (référence PO, taxe par ligne).",
        "Expliquez pourquoi le code 406 est renvoyé plutôt qu'un 401 ou un 500.",
        "Rédigez la version corrigée du message (enveloppe complète, lignes et Summary cohérents).",
        "Rédigez le message à envoyer au fournisseur : causes, corrections, et comment vérifier le statut après renvoi.",
      ],
      deliverable: "La liste des anomalies avec leur impact, le cXML corrigé et un court message d'accompagnement au fournisseur.",
      solution: `## Anomalies détectées

| # | Anomalie | Impact |
|---|---|---|
| 1 | \`Sender\` absent du Header | Le Network ne peut pas authentifier l'émetteur : rejet immédiat (« missing Sender credential ») |
| 2 | \`timestamp\` sans fuseau horaire | Non conforme ISO 8601 ; accepté par certains parseurs, à corriger |
| 3 | \`payloadID\` « inv-7788 » trop faible | Risque de collision ; convention horodatage.aléatoire@domaine recommandée |
| 4 | Ligne 1 sans \`Tax\` alors que \`isTaxInLine="yes"\` | Violation de la règle acheteur « taxe par ligne » |
| 5 | Taxe totale 75 ≠ somme des taxes attendues (90 + 75 = 165) | Incohérence arithmétique |
| 6 | GrossAmount 990 = 825 + 165 mais Tax du Summary = 75 | Le Network détecte « totals do not match » |
| 7 | Pas de DOCTYPE | Recommandé pour la validation DTD |

La référence au PO est bien présente (règle respectée) ; la quantité ligne 2 (3) est cohérente avec la confirmation.

## Pourquoi 406 ?

Un **401** signalerait un échec d'authentification pur ; un **500** une erreur interne du Network. Le **406 Not Acceptable** indique que le document est bien reçu mais **échoue aux validations métier** (règles acheteur, cohérence). Ici le Network cumule les deux motifs dans le texte de statut, mais classe l'erreur en 406 car la validation de contenu est la cause principale.

## cXML corrigé

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.050/InvoiceDetail.dtd">
<cXML payloadID="20260620090000.F2026-0455@electro-distrib.fr" timestamp="2026-06-20T09:00:00+02:00" xml:lang="fr-FR">
  <Header>
    <From><Credential domain="NetworkID"><Identity>AN01000012345</Identity></Credential></From>
    <To><Credential domain="NetworkID"><Identity>AN01000098765</Identity></Credential></To>
    <Sender>
      <Credential domain="NetworkID"><Identity>AN01000012345</Identity><SharedSecret>******</SharedSecret></Credential>
      <UserAgent>ElectroDistrib ERP 4.2</UserAgent>
    </Sender>
  </Header>
  <Request deploymentMode="production">
    <InvoiceDetailRequest>
      <InvoiceDetailRequestHeader invoiceID="F2026-0455" purpose="standard" operation="new" invoiceDate="2026-06-20T09:00:00+02:00">
        <InvoiceDetailHeaderIndicator/>
        <InvoiceDetailLineIndicator isTaxInLine="yes"/>
        <InvoicePartner><Contact role="billTo" addressID="FR01"><Name xml:lang="fr">Nordelec SAS</Name></Contact></InvoicePartner>
        <InvoicePartner><Contact role="remitTo"><Name xml:lang="fr">Électro-Distrib</Name></Contact></InvoicePartner>
        <PaymentTerm payInNumberOfDays="30"/>
      </InvoiceDetailRequestHeader>
      <InvoiceDetailOrder>
        <InvoiceDetailOrderInfo><OrderReference orderID="4500012345"><DocumentReference payloadID="20260611153000.4500012345@nordelec.fr"/></OrderReference></InvoiceDetailOrderInfo>
        <InvoiceDetailItem invoiceLineNumber="1" quantity="10">
          <UnitOfMeasure>EA</UnitOfMeasure><UnitPrice><Money currency="EUR">45.00</Money></UnitPrice>
          <InvoiceDetailItemReference lineNumber="1"><ItemID><SupplierPartID>DJ-C16-2P</SupplierPartID></ItemID></InvoiceDetailItemReference>
          <SubtotalAmount><Money currency="EUR">450.00</Money></SubtotalAmount>
          <Tax><Money currency="EUR">90.00</Money><Description xml:lang="fr">TVA 20%</Description>
            <TaxDetail purpose="tax" category="vat" percentageRate="20"><TaxableAmount><Money currency="EUR">450.00</Money></TaxableAmount><TaxAmount><Money currency="EUR">90.00</Money></TaxAmount></TaxDetail></Tax>
        </InvoiceDetailItem>
        <InvoiceDetailItem invoiceLineNumber="2" quantity="3">
          <UnitOfMeasure>EA</UnitOfMeasure><UnitPrice><Money currency="EUR">125.00</Money></UnitPrice>
          <InvoiceDetailItemReference lineNumber="2"><ItemID><SupplierPartID>COF-13M</SupplierPartID></ItemID></InvoiceDetailItemReference>
          <SubtotalAmount><Money currency="EUR">375.00</Money></SubtotalAmount>
          <Tax><Money currency="EUR">75.00</Money><Description xml:lang="fr">TVA 20%</Description>
            <TaxDetail purpose="tax" category="vat" percentageRate="20"><TaxableAmount><Money currency="EUR">375.00</Money></TaxableAmount><TaxAmount><Money currency="EUR">75.00</Money></TaxAmount></TaxDetail></Tax>
        </InvoiceDetailItem>
      </InvoiceDetailOrder>
      <InvoiceDetailSummary>
        <SubtotalAmount><Money currency="EUR">825.00</Money></SubtotalAmount>
        <Tax><Money currency="EUR">165.00</Money><Description xml:lang="fr">TVA 20%</Description>
          <TaxDetail purpose="tax" category="vat" percentageRate="20"><TaxableAmount><Money currency="EUR">825.00</Money></TaxableAmount><TaxAmount><Money currency="EUR">165.00</Money></TaxAmount></TaxDetail></Tax>
        <GrossAmount><Money currency="EUR">990.00</Money></GrossAmount>
        <NetAmount><Money currency="EUR">990.00</Money></NetAmount>
        <DueAmount><Money currency="EUR">990.00</Money></DueAmount>
      </InvoiceDetailSummary>
    </InvoiceDetailRequest>
  </Request>
</cXML>
\`\`\`

## Message au fournisseur

« Votre facture F2026-0455 a été refusée par le Network pour deux raisons : absence de bloc Sender (authentification) et incohérence des taxes (TVA manquante sur la ligne 1, total TVA 75 au lieu de 165). Merci de renvoyer le message corrigé ci-joint avec un nouveau payloadID. Après envoi, vérifiez dans votre boîte d'envoi Network que le statut passe à « Sent » puis « Approved » ; en cas de nouveau rejet, le texte du Status indique la règle en défaut. Notez que le prix de la ligne 2 (125 EUR au lieu de 120) sera bloqué en paiement côté comptabilité : merci de nous adresser un avoir ou de confirmer l'accord commercial. »`,
      tips: [
        "Validez toujours l'arithmétique à la main : somme des SubtotalAmount, somme des Tax, puis GrossAmount = Subtotal + Tax (+ frais).",
        "Un payloadID réutilisé lors du renvoi sera rejeté en doublon : exigez un nouvel identifiant.",
        "Le texte du Status renvoyé par le Network est votre meilleur ami : il cite la règle acheteur en défaut.",
      ],
    },
    {
      id: "m8-s7-j1-a3",
      moduleId: "m8",
      week: 7,
      day: 1,
      kind: "quiz",
      title: "Quiz : cXML",
      level: "avance",
      durationMin: 12,
      objective: "Vérifier la maîtrise de l'enveloppe cXML, des messages et des codes de statut.",
      questions: [
        {
          id: "m8-s7-j1-q1",
          question: "Quel élément du Header cXML porte l'authentification (SharedSecret ou certificat) ?",
          options: ["From", "To", "Sender", "Request"],
          answer: 2,
          explanation: "Le Sender identifie le système qui transmet réellement le message et porte le SharedSecret (ou s'appuie sur le certificat client) ; c'est lui que le Network authentifie. From désigne l'émetteur logique (par ex. l'acheteur) et To le destinataire logique, sans élément d'authentification. Request n'est pas dans le Header : il contient le document métier.",
          concept: "Enveloppe cXML : Header, Credential, payloadID, deploymentMode",
        },
        {
          id: "m8-s7-j1-q2",
          question: "Que signifie un Status code 200 dans la Response cXML du Business Network ?",
          options: [
            "La facture a été payée",
            "Le message a été reçu et accepté syntaxiquement ; le traitement métier suit",
            "Le fournisseur a confirmé la commande",
            "Le document a été comptabilisé dans l'ERP",
          ],
          answer: 1,
          explanation: "Le 200 est un accusé de réception technique synchrone : le document est bien formé et accepté par l'endpoint. Le paiement est signalé bien plus tard par un PaymentRemittanceRequest. La confirmation de commande est un document distinct (ConfirmationRequest). La comptabilisation dans l'ERP est asynchrone et visible via StatusUpdateRequest ou le statut du document sur le Network.",
          concept: "Codes de statut cXML (2xx / 4xx / 5xx)",
        },
        {
          id: "m8-s7-j1-q3",
          question: "Quel message cXML est utilisé par un fournisseur pour envoyer un avis d'expédition ?",
          options: ["ConfirmationRequest", "ShipNoticeRequest", "ReceiptRequest", "StatusUpdateRequest"],
          answer: 1,
          explanation: "Le ShipNoticeRequest est l'ASN (Advance Ship Notice) cXML envoyé par le fournisseur à l'expédition des marchandises. Le ConfirmationRequest confirme la commande avant expédition. Le ReceiptRequest est émis par l'acheteur pour signaler la réception. Le StatusUpdateRequest est émis par l'acheteur pour informer du statut d'une facture.",
          concept: "Messages cXML du cycle commande-facture",
        },
        {
          id: "m8-s7-j1-q4",
          question: "Une facture cXML est refusée avec un code 406. Quelle est la cause la plus probable ?",
          options: [
            "Une panne du Business Network",
            "Un échec de validation du contenu : règle acheteur non respectée ou totaux incohérents",
            "Un mot de passe erroné",
            "Un fichier trop volumineux",
          ],
          answer: 1,
          explanation: "Le 406 Not Acceptable signale un document reçu mais non acceptable au regard des validations : règles de transaction acheteur, incohérence arithmétique, champ obligatoire manquant. Une panne du Network produirait un 5xx. Un mot de passe erroné renvoie un 401 Unauthorized. La taille du message n'est pas la cause typique d'un 406 et donnerait plutôt une erreur HTTP de transport.",
          concept: "Codes de statut cXML (2xx / 4xx / 5xx)",
        },
        {
          id: "m8-s7-j1-q5",
          question: "Quelle différence y a-t-il entre un élément cXML <Request> et <Message> ?",
          options: [
            "Aucune, ce sont des synonymes",
            "Request attend une Response synchrone ; Message est un flux one-way (ex. PunchOutOrderMessage)",
            "Message est réservé aux factures",
            "Request est réservé au mode test",
          ],
          answer: 1,
          explanation: "Un Request est traité en mode requête/réponse : l'endpoint renvoie une Response avec un Status. Un Message est unidirectionnel, sans réponse applicative, typiquement le PunchOutOrderMessage qui renvoie le panier du catalogue fournisseur vers Ariba via le navigateur. Ce ne sont donc pas des synonymes. Les factures utilisent InvoiceDetailRequest, un Request. Le mode test ou production dépend de l'attribut deploymentMode, pas du type d'élément.",
          concept: "Enveloppe cXML : Header, Credential, payloadID, deploymentMode",
        },
      ],
    },
    // ───────────────────────── Semaine 7 · Jour 2 ─────────────────────────
    {
      id: "m8-s7-j2-a1",
      moduleId: "m8",
      week: 7,
      day: 2,
      kind: "lecon",
      title: "Monitoring et résolution d'erreurs d'intégration",
      level: "avance",
      durationMin: 30,
      objective: "Savoir où regarder (CIG, S/4HANA, Network) pour localiser une erreur d'intégration, la classer et la traiter.",
      content: `## Trois postes d'observation

Une chaîne d'intégration Ariba comporte trois systèmes, donc trois consoles de supervision. La compétence clé du consultant est de savoir **dans laquelle regarder en premier** selon le symptôme.

| Console | Où | Ce qu'on y voit |
|---|---|---|
| **Transaction Tracker** (CIG / Managed Gateway) | Portail CIG → Monitoring | Chaque message, son sens, son statut (Received, Processing, Delivered, Failed), le payload source et cible, l'erreur détaillée |
| **AIF – Application Interface Framework** et **WE02/WE05/BD87** | S/4HANA | Statut des IDoc et proxies, erreurs de comptabilisation, reprise après correction |
| **Document status / boîtes d'envoi et de réception** | Business Network (compte acheteur et fournisseur) | Statut du PO (Sent, Confirmed…), de la facture (Sent, Approved, Rejected, Paid), motifs de rejet |

## Les familles d'erreurs

1. **Connectivité** : certificat expiré, URL d'endpoint erronée, pare-feu, utilisateur technique verrouillé. Symptôme : rien ne part ou rien n'arrive ; erreurs HTTP 401/403/5xx ; IDoc en statut 02 (erreur d'envoi).
2. **Mapping** : cross-reference manquante, champ obligatoire vide, format de date ou de nombre incorrect, unité inconnue. Symptôme : message **Failed** dans le Transaction Tracker avec un message explicite (« Cross reference not found », « Mandatory field missing »).
3. **Validation métier** : règle de transaction Network violée, PO inexistant, quantité facturée supérieure à la quantité reçue, tolérance dépassée, fournisseur non trouvé dans S/4. Symptôme : rejet par le Network (4xx) ou IDoc INVOIC en statut 51 (erreur applicative) dans S/4.
4. **Données de base** : fournisseur sans Supplier Location, centre de coûts clôturé, code TVA inactif. Symptôme : rejets récurrents sur un même fournisseur ou une même société.

> Règle de tri : si le message n'est **pas** dans le Transaction Tracker, le problème est **en amont** (S/4 ou fournisseur) ; s'il est **Failed** dans le Tracker, c'est du mapping ou de la connectivité vers la cible ; s'il est **Delivered** mais que la cible se plaint, c'est de la validation métier dans la cible.

## Les statuts IDoc à connaître

| Statut | Signification |
|---|---|
| 03 | IDoc sortant transmis au port |
| 02 / 26 / 29 | Erreur de transmission ou de syntaxe en sortie |
| 53 | IDoc entrant comptabilisé avec succès |
| 51 | IDoc entrant en erreur applicative (ex. facture non rapprochée) |
| 64 | IDoc entrant prêt à être traité (en attente) |

La **reprise** se fait par BD87 (retraitement après correction de la cause) ou via AIF, qui offre une vue métier et des alertes par e-mail.

## Reprise dans CIG

Un message **Failed** peut être **reprocessé** depuis le Transaction Tracker une fois la cause corrigée (ex. cross-reference ajoutée et redéployée). Attention à ne pas reprocesser une facture déjà passée par un autre canal : le payloadID protège côté Network, pas forcément côté ERP.

## Organiser le support

- **Niveau 1** (support applicatif client) : lit le Transaction Tracker et le statut Network, qualifie la famille d'erreur, résout les cas de données de base.
- **Niveau 2** (consultant intégration) : corrige mappings, cross-references, paramétrage S/4, ouvre un incident SAP si le standard est en cause.
- **Niveau 3** (SAP) : correctifs CIG, incidents Network.

Indicateurs à suivre : taux de messages Failed par interface, délai moyen de reprise, top 5 des motifs de rejet de factures, nombre de fournisseurs en erreur répétée. Un **tableau de bord hebdomadaire** sur ces indicateurs réduit fortement les tickets.

## Cutover et hypercare

Au passage en production : basculer les endpoints (test → production), vérifier \`deploymentMode="production"\`, migrer les cross-references, activer les fournisseurs par vagues, et prévoir deux à trois semaines d'**hypercare** avec une cellule quotidienne de revue des erreurs.`,
      keyPoints: [
        "Trois consoles : Transaction Tracker (CIG), AIF / WE02 (S/4), statut de document (Network).",
        "Quatre familles d'erreurs : connectivité, mapping, validation métier, données de base.",
        "Règle de tri : absent du Tracker = amont ; Failed = mapping/connectivité ; Delivered mais rejeté = validation dans la cible.",
        "Statuts IDoc clés : 03, 02/26/29, 53, 51, 64 ; reprise via BD87 ou AIF, reprocess dans CIG.",
        "Un support à trois niveaux et un tableau de bord d'erreurs structurent l'exploitation.",
      ],
    },
    {
      id: "m8-s7-j2-a2",
      moduleId: "m8",
      week: 7,
      day: 2,
      kind: "simulation",
      title: "Cellule de crise : 37 factures bloquées",
      level: "avance",
      durationMin: 45,
      objective: "Conduire une analyse d'incident multi-systèmes, prioriser les corrections et communiquer un plan de résolution.",
      context: `## Situation

Lundi 8 h, chez **Nordelec**, trois semaines après la mise en production. La comptable fournisseurs alerte : **37 factures** envoyées par les fournisseurs depuis vendredi ne sont pas visibles dans S/4HANA ; quatre fournisseurs appellent pour savoir pourquoi leur facture est « Rejected » ; le fournisseur **Électro-Distrib** voit ses factures « Sent » mais la comptabilité ne les trouve pas. Le DSI convoque une cellule de crise à 9 h et attend de vous un diagnostic et un plan à 10 h.

Premiers éléments recueillis :

- Transaction Tracker : 22 messages InvoiceDetailRequest en **Failed** depuis vendredi 16 h, erreur « Cross reference not found for TaxCode: VAT 5.5 ».
- Transaction Tracker : 11 messages **Delivered** vendredi soir à destination de S/4.
- S/4 WE02 : 11 IDoc INVOIC en statut **51**, message « Fournisseur 100234 : aucune commande ouverte pour la référence 4500013001 ».
- Business Network : 4 factures **Rejected** avec le motif « Invoice must reference a purchase order ».
- Vendredi 15 h 30, l'équipe FI a activé le taux de TVA réduit 5,5 % pour les fournitures alimentaires du restaurant d'entreprise.
- Le PO 4500013001 a été modifié samedi (ORDCHG) pour changer la société d'imputation ; l'IDoc ORDCHG est en statut 02.`,
      steps: [
        "Classez les 37 factures en groupes selon la console où elles apparaissent et la famille d'erreur (connectivité, mapping, validation métier, données de base).",
        "Pour chaque groupe, formulez l'hypothèse de cause racine en vous appuyant sur les éléments recueillis.",
        "Définissez l'action corrective de chaque groupe, la console où la reprise se fait et le rôle responsable (N1, N2, FI, basis, fournisseur).",
        "Priorisez : quel groupe traiter d'abord et pourquoi (volume, impact fournisseur, risque de doublon) ?",
        "Rédigez le compte rendu de 10 h pour le DSI : diagnostic en 5 lignes, plan d'action avec échéances, risques résiduels.",
        "Proposez deux mesures préventives pour éviter la récurrence (processus de changement, monitoring).",
      ],
      deliverable: "Un tableau de qualification des 37 factures, le plan d'action priorisé et le compte rendu de cellule de crise.",
      solution: `## Qualification

| Groupe | Nb | Console | Famille | Cause racine probable |
|---|---|---|---|---|
| A | 22 | Transaction Tracker – Failed | Mapping | Nouveau code TVA 5,5 % créé dans S/4 vendredi sans ajout dans la cross-reference TaxCode de CIG |
| B | 11 | Delivered dans CIG, IDoc INVOIC statut 51 dans S/4 | Validation métier | PO 4500013001 modifié (ORDCHG) mais l'IDoc de modification est en erreur (statut 02) : S/4 et Network ne voient pas la même version du PO ; les factures référencent un PO dont la version ERP est incohérente, ou le changement de société rend le PO introuvable pour la société facturée |
| C | 4 | Business Network – Rejected | Validation métier (règle de transaction) | Fournisseurs ayant créé une facture sans référence PO : comportement normal de la règle acheteur |
| Électro-Distrib | inclus dans A | Network « Sent » | Mapping | Vu du fournisseur, la facture est partie ; elle est bloquée dans CIG, d'où l'incompréhension |

Total : 22 + 11 + 4 = 37.

## Plan d'action priorisé

1. **Groupe A (priorité 1, 22 factures, cause unique)** : N2 ajoute la correspondance TaxCode S/4 « V5 » → cXML category vat 5.5 dans la cross-reference, redéploie le projet CIG, puis **reprocess** les 22 messages depuis le Transaction Tracker. Échéance : 11 h. Vérifier ensuite l'arrivée des IDoc en statut 53.
2. **Groupe B (priorité 2, 11 factures)** : basis/N2 analysent l'IDoc ORDCHG en statut 02 (erreur de port ou de syntaxe), le corrigent et le renvoient pour aligner la version du PO sur le Network ; FI vérifie la société d'imputation ; N1 retraite les 11 IDoc INVOIC via BD87. Échéance : 14 h. Risque : si le changement de société était erroné, les factures doivent être rejetées côté Network avec StatusUpdateRequest « Rejected » plutôt que forcées.
3. **Groupe C (priorité 3, 4 factures)** : comportement attendu ; N1 contacte les 4 fournisseurs pour les orienter vers le PO Flip. Aucune action technique. Échéance : fin de journée.
4. **Communication fournisseurs** : message aux fournisseurs du groupe A : « Incident technique interne résolu, vos factures seront visibles d'ici ce soir, aucun renvoi nécessaire » (un renvoi créerait des doublons).

## Compte rendu 10 h (extrait)

« 37 factures impactées, aucune perdue. 22 sont bloquées dans le middleware à cause d'un nouveau taux de TVA activé vendredi sans mise à jour de la table de correspondance : correction en cours, résolution avant midi. 11 sont en erreur dans S/4 à cause d'une modification de commande non transmise au Network : correction par l'équipe basis, résolution dans l'après-midi. 4 sont des rejets légitimes de factures sans commande : accompagnement des fournisseurs. Risque résiduel : factures du groupe B si la modification de société était injustifiée ; décision FI attendue à 14 h. »

## Mesures préventives

- **Processus de changement** : toute création de code TVA, unité, type de document ou condition de paiement dans S/4 déclenche une tâche « mise à jour cross-reference CIG » validée avant transport en production.
- **Monitoring proactif** : alerte e-mail (AIF + Transaction Tracker) dès qu'un message passe en Failed ou qu'un IDoc sortant reste en 02 plus de 30 minutes, et revue quotidienne du tableau de bord pendant l'hypercare.`,
      tips: [
        "Comptez toujours : si vos groupes ne totalisent pas le nombre de factures annoncé, il vous manque une cause.",
        "Interdisez aux fournisseurs de renvoyer leurs factures tant que vous n'avez pas statué : les doublons sont plus longs à traiter que l'incident.",
        "En cellule de crise, distinguez clairement « incident technique » et « comportement normal du système » : cela rassure et évite de sur-corriger.",
      ],
    },
    {
      id: "m8-s7-j2-a3",
      moduleId: "m8",
      week: 7,
      day: 2,
      kind: "quiz",
      title: "Quiz : monitoring et résolution d'erreurs",
      level: "avance",
      durationMin: 12,
      objective: "Vérifier la capacité à localiser et classer une erreur d'intégration.",
      questions: [
        {
          id: "m8-s7-j2-q1",
          question: "Un IDoc INVOIC entrant est en statut 51 dans S/4HANA. Que cela signifie-t-il ?",
          options: [
            "L'IDoc a été comptabilisé avec succès",
            "L'IDoc est en erreur applicative (ex. rapprochement impossible) et peut être retraité après correction",
            "L'IDoc n'a jamais atteint S/4HANA",
            "L'IDoc attend d'être transmis au Network",
          ],
          answer: 1,
          explanation: "Le statut 51 indique qu'un IDoc entrant a été reçu mais que son traitement applicatif a échoué, par exemple parce que le PO référencé n'est pas ouvert ; après correction, il se retraite via BD87 ou AIF. Le statut 53 correspond au succès. Un IDoc en statut 51 a bien atteint S/4HANA, sinon il n'existerait pas dans WE02. Les IDoc en attente de transmission sont des IDoc sortants (statut 30 ou 02), ce qui ne concerne pas une facture entrante.",
          concept: "Statuts IDoc et reprise (WE02, BD87, AIF)",
        },
        {
          id: "m8-s7-j2-q2",
          question: "Une facture n'apparaît pas du tout dans le Transaction Tracker CIG. Où se situe probablement le problème ?",
          options: [
            "Dans le mapping CIG",
            "En amont : le fournisseur ou le Business Network ne l'ont pas transmise, ou elle a été rejetée par le Network",
            "Dans la comptabilisation MM-IV",
            "Dans les tables de références croisées",
          ],
          answer: 1,
          explanation: "Si CIG n'a aucune trace du message, il ne l'a jamais reçu : la cause est en amont, typiquement un rejet par les règles de transaction du Network ou une facture restée en brouillon chez le fournisseur. Un problème de mapping ou de cross-reference produirait un message visible en statut Failed dans le Tracker. Un problème MM-IV se situe en aval, après un message Delivered.",
          concept: "Localiser une erreur : Tracker, S/4, Network",
        },
        {
          id: "m8-s7-j2-q3",
          question: "Quel outil S/4HANA offre une vue métier des interfaces avec alertes et retraitement ?",
          options: ["SE16", "AIF – Application Interface Framework", "SM59", "SU01"],
          answer: 1,
          explanation: "L'AIF centralise le monitoring des interfaces (IDoc, proxies) avec une présentation orientée métier, des alertes et des fonctions de retraitement, utilisées dans les intégrations Ariba. SE16 affiche le contenu brut des tables. SM59 gère les destinations RFC, utile pour la connectivité mais pas pour le suivi des messages. SU01 administre les utilisateurs.",
          concept: "Statuts IDoc et reprise (WE02, BD87, AIF)",
        },
        {
          id: "m8-s7-j2-q4",
          question: "Après avoir ajouté une cross-reference manquante dans CIG, quelle est l'action correcte pour les messages en Failed ?",
          options: [
            "Demander aux fournisseurs de renvoyer toutes leurs factures",
            "Redéployer le projet puis reprocesser les messages depuis le Transaction Tracker",
            "Supprimer les messages et les recréer manuellement dans S/4",
            "Attendre la prochaine release CIG",
          ],
          answer: 1,
          explanation: "La correction d'une cross-reference prend effet après redéploiement du projet ; les messages Failed peuvent alors être reprocessés directement dans le Tracker, sans intervention des fournisseurs. Un renvoi par les fournisseurs créerait des doublons et des conflits de payloadID. Recréer manuellement les factures dans S/4 romprait la traçabilité et le statut Network. Attendre une release n'a aucun rapport avec une table de correspondance gérée par le client.",
          concept: "Reprise des messages dans CIG",
        },
        {
          id: "m8-s7-j2-q5",
          question: "Quelle mesure préventive réduit le plus les erreurs de mapping après la mise en production ?",
          options: [
            "Désactiver les règles de transaction du Network",
            "Intégrer la mise à jour des cross-references CIG dans le processus de gestion des changements S/4 (nouveaux codes TVA, unités, types de documents)",
            "Augmenter la tolérance de prix dans MM-IV",
            "Remplacer CIG par des e-mails",
          ],
          answer: 1,
          explanation: "La plupart des erreurs de mapping post-production viennent de valeurs créées dans S/4 sans mise à jour des tables de correspondance : lier les deux dans le processus de changement supprime la cause. Désactiver les règles de transaction ferait entrer des factures non conformes dans l'ERP. La tolérance de prix concerne le blocage en paiement, pas le mapping. Les e-mails ne constituent pas une intégration.",
          concept: "Exploitation et prévention des erreurs d'intégration",
        },
      ],
    },
  ],
  useCases: [
    {
      id: "m8-uc1",
      moduleId: "m8",
      title: "Choisir le scénario d'intégration pour un groupe multi-ERP",
      client: "Groupe agroalimentaire, 6 000 salariés, S/4HANA pour l'Europe et un ERP non-SAP pour l'Amérique du Nord",
      situation: "Le groupe veut une expérience d'achat unique (Guided Buying) pour toutes ses filiales et dématérialiser les factures de 2 500 fournisseurs.",
      challenge: "Deux ERP, deux équipes IT, un seul réalm Ariba : comment router PO et factures vers le bon ERP et quel middleware utiliser pour l'ERP non-SAP ?",
      approach: [
        "Atelier d'architecture pour fixer le système maître du PO par région et formaliser la matrice des flux.",
        "CIG / Managed Gateway retenu pour S/4HANA (mappings standard) ; SAP Integration Suite pour l'ERP non-SAP avec iFlows sur mesure.",
        "Routage multi-ERP dans CIG par société (Company Code) et Supplier Location.",
        "Plan de test croisé : un même fournisseur facturant les deux régions.",
        "Déploiement par vagues : Europe d'abord, Amérique du Nord six mois plus tard.",
      ],
      outcome: "Un seul portail d'achat, deux chaînes d'intégration maîtrisées ; 92 % des factures dématérialisées à 12 mois.",
      lesson: "Il n'y a pas un seul middleware : on choisit par ERP, mais on garde une seule gouvernance des flux et une seule matrice.",
    },
    {
      id: "m8-uc2",
      moduleId: "m8",
      title: "Reprendre un projet CIG saturé de mappings XSLT",
      client: "Laboratoire pharmaceutique, 3 500 salariés, S/4HANA 1909",
      situation: "L'intégrateur précédent a livré 14 mappings XSLT custom ; chaque release CIG casse une interface et l'équipe passe un tiers de son temps en correctifs.",
      challenge: "Réduire la dette d'intégration sans interrompre les flux de production ni perdre les règles métier légitimes.",
      approach: [
        "Inventaire des 14 XSLT : pour chacun, identifier le besoin d'origine et vérifier s'il est couvert aujourd'hui par le standard, une option d'interface ou une cross-reference.",
        "Neuf XSLT remplacés par des cross-references ou des options ; trois par des extensions Extrinsic ; deux conservés et documentés.",
        "Spécification de mapping champ à champ reconstituée et versionnée dans Git.",
        "Campagne de non-régression automatisée via le Test Central avant chaque release.",
      ],
      outcome: "Temps de correctif divisé par quatre ; aucune régression sur les trois releases suivantes.",
      lesson: "Un XSLT est une dette : avant d'en écrire un, épuiser le paramétrage S/4, les options d'interface et les cross-references.",
    },
    {
      id: "m8-uc3",
      moduleId: "m8",
      title: "Industrialiser la réplication des données de base",
      client: "Collectivité territoriale, 2 200 agents, S/4HANA Public Sector",
      situation: "Les demandeurs ne trouvent pas leurs centres de coûts dans Guided Buying ; les réquisitions sont rejetées par l'ERP pour imputation invalide.",
      challenge: "La réplication des données de base est faite à la main, tous les quinze jours, par import CSV, avec des oublis et des Full load destructeurs.",
      approach: [
        "Audit des écarts entre S/4 et Ariba : 340 centres de coûts manquants ou expirés, 60 fournisseurs sans Supplier Location.",
        "Mise en place de l'extraction standard de l'add-on vers CIG en mode delta quotidien pour les imputations et fournisseurs.",
        "Règle de gestion documentée pour les objets expirés (désactivation, jamais suppression).",
        "Contrôle automatique quotidien : comparaison du nombre d'objets actifs S/4 vs Ariba, alerte au-delà de 1 % d'écart.",
      ],
      outcome: "Taux de rejet des réquisitions passé de 11 % à moins de 1 % en deux mois.",
      lesson: "Les données de base sont un flux d'intégration à part entière, à automatiser et surveiller comme les flux transactionnels.",
    },
    {
      id: "m8-uc4",
      moduleId: "m8",
      title: "Hypercare après cutover : factures bloquées et fournisseurs inquiets",
      client: "Distributeur de matériaux de construction, 1 500 salariés, 120 agences",
      situation: "Deux semaines après la mise en production, 15 % des factures Network tombent en erreur et les fournisseurs menacent de revenir au papier.",
      challenge: "Stabiliser rapidement sans désactiver les règles de transaction, et restaurer la confiance des fournisseurs.",
      approach: [
        "Cellule quotidienne de 30 minutes avec compta, support et consultant intégration, pilotée par le Transaction Tracker et l'AIF.",
        "Classification systématique des erreurs : 60 % mapping (codes TVA et unités), 30 % données de base (Supplier Locations), 10 % validation métier légitime.",
        "Correction des cross-references et des Supplier Locations en 3 jours, reprocess des messages.",
        "Guide fournisseur d'une page sur le PO Flip et webinaire de 45 minutes pour les 50 plus gros fournisseurs.",
        "Tableau de bord hebdomadaire des rejets partagé avec la direction achats.",
      ],
      outcome: "Taux d'erreur ramené à 2 % en trois semaines ; aucun fournisseur revenu au papier.",
      lesson: "L'hypercare se gagne par la classification rigoureuse des erreurs et une communication fournisseur proactive, pas par l'assouplissement des règles.",
    },
  ],
  glossary: [
    { term: "CIG (Cloud Integration Gateway)", moduleId: "m8", definition: "Middleware géré par SAP entre l'ERP et les solutions Ariba / SAP Business Network, avec mappings standard. Renommé SAP Integration Suite, managed gateway for spend management and SAP Business Network." },
    { term: "Managed Gateway", moduleId: "m8", definition: "Nouveau nom commercial de CIG au sein de SAP Integration Suite ; mêmes fonctions de projet, mapping et monitoring." },
    { term: "ARBCIG / ARBCI1", moduleId: "m8", definition: "Add-on installé dans S/4HANA ou ECC pour exposer les documents et données de base vers CIG et gérer la connexion (Buyer ANID, System ID, certificats)." },
    { term: "ITK (Ariba Integration Toolkit)", moduleId: "m8", definition: "Outil Java en ligne de commande pour charger ou extraire en masse des fichiers CSV via les tâches d'import/export Ariba." },
    { term: "cXML", moduleId: "m8", definition: "Protocole XML standard du Business Network pour les documents commerciaux (OrderRequest, InvoiceDetailRequest…), défini par un DTD et transporté en HTTPS." },
    { term: "payloadID", moduleId: "m8", definition: "Identifiant unique d'un message cXML ; permet au Network de rejeter les doublons." },
    { term: "Credential domain", moduleId: "m8", definition: "Type d'identifiant utilisé dans From/To/Sender d'un cXML : NetworkID (ANID), DUNS, AribaNetworkUserId ou domaine privé." },
    { term: "deploymentMode", moduleId: "m8", definition: "Attribut de Request indiquant si le document cible l'environnement de test ou de production du Network." },
    { term: "Cross-reference table", moduleId: "m8", definition: "Table de correspondance CIG entre codes SAP et codes attendus par Ariba ou cXML (unités, taxes, types de documents)." },
    { term: "Extrinsic", moduleId: "m8", definition: "Balise cXML nommée transportant une donnée hors standard, utilisée pour les champs personnalisés." },
    { term: "Transaction Tracker", moduleId: "m8", definition: "Console de monitoring CIG listant chaque message, son statut (Received, Delivered, Failed) et le détail des erreurs, avec possibilité de reprocess." },
    { term: "AIF (Application Interface Framework)", moduleId: "m8", definition: "Outil S/4HANA de supervision des interfaces offrant une vue métier, des alertes et le retraitement des messages en erreur." },
    { term: "IDoc ORDERS / ORDCHG / INVOIC", moduleId: "m8", definition: "Types de messages IDoc SAP pour la création de commande, la modification de commande et la facture, mappés par CIG vers ou depuis le cXML." },
    { term: "Supplier Location", moduleId: "m8", definition: "Adresse de commande d'un fournisseur dans Ariba, rattachée à son ANID ; indispensable pour l'envoi d'un PO." },
    { term: "MM-IV", moduleId: "m8", definition: "Vérification de factures logistique de S/4HANA, où la facture Network est rapprochée du PO et de la réception (3-way match) et soumise aux tolérances." },
    { term: "Hypercare", moduleId: "m8", definition: "Période de support renforcé après la mise en production, avec revue quotidienne des erreurs d'intégration." },
  ],
  faq: [
    { moduleId: "m8", q: "Faut-il obligatoirement CIG pour intégrer Ariba à S/4HANA ?", a: "Non, mais c'est la voie standard et la plus rapide pour un ERP SAP grâce aux mappings livrés. SAP Integration Suite (Cloud Integration) est préféré pour les ERP non-SAP ou les orchestrations complexes ; certains clients historiques utilisent encore PI/PO. Dans tous les cas, l'add-on côté S/4 reste nécessaire pour les flux standard." },
    { moduleId: "m8", q: "Quelle est la différence entre un rejet Network et une facture bloquée dans S/4 ?", a: "Un rejet Network résulte d'une règle de transaction (ex. facture sans PO) et la facture n'atteint jamais l'ERP : le fournisseur doit la corriger. Une facture bloquée en paiement a été comptabilisée dans MM-IV mais présente un écart (prix, quantité) hors tolérance ; elle se libère via MRBR ou par avoir." },
    { moduleId: "m8", q: "À quelle fréquence répliquer les données de base ?", a: "Quotidiennement en delta pour les fournisseurs, Supplier Locations, centres de coûts et comptes ; mensuellement ou à la demande pour les unités, devises et commodity codes. Les utilisateurs sont souvent gérés en temps réel via SCIM depuis l'annuaire." },
    { moduleId: "m8", q: "Comment éviter les doublons de factures lors d'une reprise ?", a: "Ne jamais demander aux fournisseurs de renvoyer une facture déjà transmise ; reprocesser le message depuis le Transaction Tracker. Le payloadID protège côté Network, et le contrôle de numéro de facture fournisseur dans S/4 (référence XBLNR) protège côté ERP." },
    { moduleId: "m8", q: "Que vérifier en premier quand un fournisseur dit n'avoir pas reçu un PO ?", a: "Dans l'ordre : statut de l'IDoc ORDERS dans WE02 (03 = parti), présence et statut du message dans le Transaction Tracker, existence du PO sur le compte acheteur Network et méthode de routage configurée par le fournisseur (e-mail, cXML, portail)." },
    { moduleId: "m8", q: "Les releases CIG mensuelles sont-elles risquées ?", a: "Elles sont automatiques et sans régression pour le standard, mais elles peuvent impacter les extensions et mappings XSLT custom. Il faut lire les notes de version et exécuter une campagne de non-régression ciblée sur les interfaces personnalisées dans le réalm de test." },
  ],
};
