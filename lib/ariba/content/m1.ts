import type { ModuleContent } from "../types";

export const m1: ModuleContent = {
  moduleId: "m1",
  activities: [
    // ───────────── Semaine 1 · Jour 1 : Découvrir l'écosystème SAP Ariba ─────────────
    {
      id: "m1-s1-j1-a1",
      moduleId: "m1",
      week: 1,
      day: 1,
      kind: "lecon",
      title: "Panorama de la suite SAP Ariba",
      level: "debutant",
      durationMin: 25,
      objective: "Situer chaque solution SAP Ariba dans le cycle Source-to-Pay et comprendre ce qu'un consultant technico-fonctionnel est censé maîtriser.",
      content: `## Pourquoi SAP Ariba ?

SAP Ariba est la suite cloud d'achats de SAP. Elle couvre l'intégralité du cycle **Source-to-Pay (S2P)** : de l'identification du besoin et la consultation des fournisseurs jusqu'au paiement de la facture. Elle repose sur deux piliers :

- des **applications acheteur** (Sourcing, Contracts, Buying & Invoicing, Supplier Lifecycle & Performance, Spend Analysis) hébergées sur une instance appelée **realm** ;
- le **SAP Business Network** (historiquement Ariba Network), place de marché B2B où les fournisseurs reçoivent les commandes et envoient leurs factures.

## Les solutions, module par module

| Solution | Étape du cycle | Objet principal |
|---|---|---|
| Spend Analysis | Analyser la dépense | Cubes de dépenses, classification UNSPSC |
| Sourcing | Consulter le marché | Sourcing Project, événements RFI/RFP/RFQ, enchères |
| Contracts (CLM) | Contractualiser | Contract Workspace, clauses, signature électronique |
| Supplier Lifecycle & Performance (SLP) | Gérer les fournisseurs | Registration, Qualification, Preferred status, Risk |
| Buying & Invoicing | Acheter et payer (P2P) | Requisition, Purchase Order, Receipt, Invoice Reconciliation |
| Guided Buying | Simplifier l'achat occasionnel | Tuiles, politiques d'achat, formulaires |
| SAP Business Network | Collaborer avec le fournisseur | Compte fournisseur (ANID), PO, ASN, Invoice |

> À retenir : **Upstream** désigne les activités amont (Sourcing, Contracts, SLP) et **Downstream** les activités aval (Buying, Invoicing, Catalogues). Les deux partagent le même realm mais ont des interfaces d'administration différentes.

## Le rôle du consultant technico-fonctionnel

Un consultant Ariba « technico-fonctionnel » est à la jonction de trois mondes :

- **le métier achats** : il comprend les processus (demande d'achat, appel d'offres, contrat, facture) et sait les challenger ;
- **le paramétrage Ariba** : il configure les workflows d'approbation, les champs, les templates, les règles de transaction ;
- **l'intégration** : il connaît les flux avec **SAP S/4HANA** (données de base, commandes, factures) via **CIG** (Cloud Integration Gateway, devenu SAP Integration Suite, managed gateway) et le format **cXML**.

## Modèle de déploiement

Ariba est du **SaaS multi-tenant** : SAP héberge, met à jour (releases trimestrielles) et sécurise la plateforme. Le client ne touche ni au code ni à la base. Il dispose de plusieurs realms : généralement un **Test realm** (suffixe -T) et un **Production realm**. Toute configuration se fait par paramétrage (self-service) ou par **Service Request (SR)** auprès de SAP pour les paramètres non exposés.

## Ce que l'on attend de vous pendant ces 8 semaines

Chaque semaine suit la logique du cycle S2P. Vous apprendrez à expliquer un processus à un acheteur, à paramétrer la solution et à dialoguer avec une équipe intégration S/4HANA. La certification (SAP Certified Associate – SAP Ariba) valide précisément cette polyvalence.`,
      keyPoints: [
        "SAP Ariba couvre le cycle Source-to-Pay complet : Sourcing, Contracts, SLP (amont) et Buying & Invoicing, Catalogues (aval).",
        "Le SAP Business Network (ex-Ariba Network) est la plateforme collaborative côté fournisseur, distincte des applications acheteur.",
        "Un realm est l'instance cliente ; on distingue généralement un realm de test (-T) et un realm de production.",
        "La solution est SaaS multi-tenant : pas de code custom, du paramétrage et des Service Requests auprès de SAP.",
        "Le consultant technico-fonctionnel combine processus achats, paramétrage et intégration S/4HANA (CIG, cXML).",
      ],
    },
    {
      id: "m1-s1-j1-a2",
      moduleId: "m1",
      week: 1,
      day: 1,
      kind: "exercice",
      title: "Cartographier un processus achats client sur la suite Ariba",
      level: "debutant",
      durationMin: 35,
      objective: "Traduire un processus achats décrit en langage métier en une cartographie des solutions Ariba et des objets manipulés.",
      context: `## Le client

**Novalis Cosmétiques** (industrie, 2 500 salariés, 3 usines en France) vous a transmis la description suivante de son processus achats actuel :

> « Les usines envoient des demandes par e-mail au service achats. Un acheteur négocie par téléphone avec deux ou trois fournisseurs connus, puis saisit une commande dans l'ERP. Les contrats sont des PDF stockés sur un disque partagé. Les factures arrivent par courrier et sont ressaisies en comptabilité ; 30 % d'entre elles sont bloquées faute de commande ou de réception. Nous ne savons pas combien nous dépensons par catégorie. »

La direction achats souhaite déployer SAP Ariba avec un ERP cible **SAP S/4HANA**.`,
      steps: [
        "Découpez le texte du client en étapes du cycle Source-to-Pay (besoin, consultation, contrat, commande, réception, facture, analyse).",
        "Pour chaque étape, identifiez la solution Ariba qui la couvre (Sourcing, Contracts, SLP, Buying & Invoicing, Guided Buying, Business Network, Spend Analysis).",
        "Nommez l'objet Ariba principal manipulé à chaque étape (Requisition, Sourcing Event, Contract Workspace, Purchase Order, Receipt, Invoice, etc.).",
        "Repérez les irritants cités (ressaisie, factures bloquées, absence de visibilité) et associez à chacun la fonctionnalité Ariba qui le résout.",
        "Précisez quelles étapes impliquent le fournisseur et donc le SAP Business Network.",
        "Indiquez les points d'intégration probables avec S/4HANA (données de base fournisseurs, commandes, factures).",
        "Rédigez votre cartographie sous forme de tableau en 4 colonnes : étape métier, solution Ariba, objet, bénéfice attendu.",
      ],
      deliverable: "Un tableau de cartographie (7 à 9 lignes) et un paragraphe de 5 lignes expliquant à la direction achats pourquoi le Business Network est indispensable à la réduction des factures bloquées.",
      solution: `## Cartographie type

| Étape métier | Solution Ariba | Objet | Bénéfice |
|---|---|---|---|
| Demande de l'usine par e-mail | Guided Buying / Buying | Requisition | Demande structurée, workflow d'approbation |
| Négociation téléphonique | Sourcing | Sourcing Project, RFQ | Traçabilité, mise en concurrence élargie |
| Contrat PDF sur disque partagé | Contracts (CLM) | Contract Workspace | Référentiel unique, alertes d'échéance |
| Connaissance des fournisseurs | SLP | Supplier Registration / Qualification | Données fournisseur fiables et partagées |
| Saisie commande ERP | Buying + intégration S/4HANA | Purchase Order | Commande générée automatiquement depuis la Requisition |
| Réception usine | Buying | Receipt | Base du rapprochement 3-way |
| Facture papier ressaisie | Business Network + Invoicing | Invoice, Invoice Reconciliation | Facture électronique, rapprochement automatique |
| Analyse de la dépense | Spend Analysis | Cube de dépenses | Visibilité par catégorie et fournisseur |

## Argumentaire Business Network

Les 30 % de factures bloquées proviennent de factures sans commande ou sans réception. Sur le Business Network, le fournisseur crée sa facture **à partir de la commande reçue** (« PO flip »), ce qui garantit la référence commande, les prix et les quantités. Les **règles de transaction** peuvent même interdire une facture sans commande ou dont le montant dépasse le reste à facturer. La facture arrive donc déjà rapprochable dans **Invoice Reconciliation**, et les exceptions résiduelles sont traitées par un workflow au lieu d'un e-mail.

## Points d'intégration S/4HANA

- Données de base : fournisseurs (Business Partner), articles, centres de coûts, comptes généraux, codes marchandises.
- Transactionnel : commande créée dans Ariba puis répliquée dans S/4HANA (ou inversement selon le scénario), réception, facture rapprochée envoyée en comptabilité fournisseurs pour paiement.`,
      tips: [
        "Partez toujours du vocabulaire du client, puis traduisez-le : c'est exactement la posture d'un atelier de cadrage.",
        "Ne cherchez pas à tout couvrir dès la première vague : un déploiement réel est phasé (souvent P2P + Network d'abord).",
      ],
    },
    {
      id: "m1-s1-j1-a3",
      moduleId: "m1",
      week: 1,
      day: 1,
      kind: "quiz",
      title: "Quiz : l'écosystème SAP Ariba",
      level: "debutant",
      durationMin: 12,
      objective: "Valider la compréhension du périmètre des solutions Ariba et du vocabulaire de base.",
      questions: [
        {
          id: "m1-s1-j1-q1",
          question: "Quelle solution SAP Ariba couvre le processus Procure-to-Pay (demande d'achat, commande, réception, facture) ?",
          options: ["SAP Ariba Sourcing", "SAP Ariba Buying & Invoicing", "SAP Ariba Contracts", "SAP Ariba Spend Analysis"],
          answer: 1,
          explanation: "Buying & Invoicing est la solution P2P : elle gère la Requisition, le Purchase Order, le Receipt et l'Invoice Reconciliation. Sourcing est une solution amont dédiée aux appels d'offres et enchères ; Contracts gère le cycle de vie contractuel (Contract Workspace, clauses) ; Spend Analysis analyse la dépense historique à partir de données consolidées mais ne traite aucune transaction opérationnelle.",
          concept: "Périmètre des solutions de la suite Ariba",
        },
        {
          id: "m1-s1-j1-q2",
          question: "Que désigne le terme « realm » dans SAP Ariba ?",
          options: [
            "Le compte d'un fournisseur sur le Business Network",
            "Un rôle d'administrateur disposant de tous les droits",
            "L'instance cloud dédiée à un client (ex. test ou production)",
            "Le catalogue standard livré par SAP",
          ],
          answer: 2,
          explanation: "Le realm est l'instance cliente des applications acheteur ; un client dispose en général d'un realm de test (suffixe -T) et d'un realm de production. Le compte fournisseur sur le réseau est identifié par un ANID, pas par un realm. Le rôle disposant de tous les droits s'appelle Customer Administrator (groupe), et SAP ne livre pas de « catalogue standard » : les catalogues sont fournis par les fournisseurs ou chargés par le client.",
          concept: "Realm, site et environnements Ariba",
        },
        {
          id: "m1-s1-j1-q3",
          question: "Quelle affirmation décrit correctement la distinction Upstream / Downstream ?",
          options: [
            "Upstream = Sourcing, Contracts, SLP ; Downstream = Buying, Invoicing, Catalogues",
            "Upstream = flux vers S/4HANA ; Downstream = flux depuis S/4HANA",
            "Upstream = realm de production ; Downstream = realm de test",
            "Upstream = côté fournisseur ; Downstream = côté acheteur",
          ],
          answer: 0,
          explanation: "Upstream regroupe les activités amont du cycle achats (consultation, contrat, gestion fournisseur) et Downstream les activités aval (achat opérationnel, facturation, catalogues). Ce n'est pas une notion de sens de flux d'intégration, ni de type d'environnement. La distinction acheteur/fournisseur correspond plutôt à applications acheteur vs Business Network.",
          concept: "Upstream vs Downstream",
        },
        {
          id: "m1-s1-j1-q4",
          question: "Pourquoi un client Ariba ne peut-il pas modifier le code de la solution pour un besoin spécifique ?",
          options: [
            "Parce que le code est écrit en ABAP et réservé à SAP Allemagne",
            "Parce qu'Ariba est une solution SaaS multi-tenant : la personnalisation passe par le paramétrage et les Service Requests",
            "Parce que la licence interdit toute modification pendant les 3 premières années",
            "Parce que le code est hébergé chez le fournisseur sur le Business Network",
          ],
          answer: 1,
          explanation: "Ariba est hébergé et maintenu par SAP pour tous ses clients sur une même base logicielle (multi-tenant) : personnaliser le code pour un client affecterait les autres. On adapte donc la solution par paramétrage self-service et, pour les paramètres non exposés, par Service Request auprès du support SAP. Le langage du code et la durée de licence n'ont rien à voir, et le Business Network n'héberge pas le code des applications acheteur.",
          concept: "Modèle SaaS multi-tenant et Service Requests",
        },
        {
          id: "m1-s1-j1-q5",
          question: "Quel objet du SAP Business Network permet au fournisseur de créer une facture directement à partir de la commande reçue ?",
          options: ["Le PO flip", "Le Contract Workspace", "La Requisition", "Le cube Spend Analysis"],
          answer: 0,
          explanation: "Le PO flip consiste à « retourner » la commande reçue sur le réseau en facture : le fournisseur reprend les lignes, quantités et prix de la commande, ce qui garantit une facture rapprochable. Le Contract Workspace est un objet amont de la solution Contracts ; la Requisition est la demande d'achat interne de l'acheteur, invisible du fournisseur ; le cube Spend Analysis sert à l'analyse de dépense.",
          concept: "PO flip et facturation sur le Business Network",
        },
      ],
    },

    // ───────────── Semaine 1 · Jour 2 : Architecture, rôles et vocabulaire ─────────────
    {
      id: "m1-s1-j2-a1",
      moduleId: "m1",
      week: 1,
      day: 2,
      kind: "lecon",
      title: "Architecture Ariba, rôles et vocabulaire indispensable",
      level: "debutant",
      durationMin: 30,
      objective: "Comprendre l'architecture logique (realm, Business Network, intégration S/4HANA), les grands rôles utilisateurs et le vocabulaire des objets Ariba.",
      content: `## Architecture logique

Trois briques dialoguent en permanence :

1. **Les applications acheteur (realm)** : interface où travaillent demandeurs, acheteurs, approbateurs et administrateurs. Le realm héberge les objets métier (Requisition, PO, Contract Workspace…) et leur paramétrage.
2. **Le SAP Business Network** : chaque fournisseur possède un compte identifié par un **ANID** (Ariba Network ID, format AN01…). L'acheteur possède lui aussi un compte réseau (**Buyer ANID**) qui relie son realm aux fournisseurs par des **trading relationships**.
3. **L'ERP SAP S/4HANA** : système de référence pour la comptabilité et les données de base. Les échanges passent par **CIG / SAP Integration Suite, managed gateway** avec des messages en **cXML** côté Ariba et IDoc/SOAP côté SAP.

> Schéma mental : Demandeur → Realm (Requisition → PO) → Business Network (PO reçu par le fournisseur, facture renvoyée) → Realm (Invoice Reconciliation) → S/4HANA (comptabilisation et paiement).

## Les rôles utilisateurs

| Rôle | Ce qu'il fait | Groupes Ariba typiques |
|---|---|---|
| Demandeur (Requester) | Crée des demandes d'achat, réceptionne | Aucun groupe spécifique, droits de base |
| Préparateur (Preparer) | Saisit pour le compte d'autrui | Idem + délégation |
| Approbateur | Valide selon le flux d'approbation | Déterminé par les règles, pas par un groupe |
| Acheteur (Purchasing Agent) | Traite les demandes hors catalogue, modifie les PO | Purchasing Agent, Purchasing Manager |
| Comptable (AP) | Résout les exceptions de facture | Invoice Manager, Invoice Agent |
| Administrateur client | Paramètre le realm | Customer Administrator |
| Administrateur catalogue | Gère les catalogues | Catalog Manager |

Les **groupes** portent les permissions. Un utilisateur sans groupe peut malgré tout créer des demandes et approuver ce qui lui est soumis.

## Vocabulaire des objets (Downstream)

- **Approvable** : tout document soumis à un flux d'approbation (Requisition, Invoice Reconciliation, Receipt, Contract Request…).
- **Requisition (PR)** : la demande d'achat ; elle devient un ou plusieurs **Purchase Orders (PO)** à l'approbation finale, un PO par fournisseur.
- **Receipt** : la réception, saisie par le demandeur ou le magasin.
- **Invoice** : facture reçue du Network ou saisie manuellement ; sa version rapprochée est l'**Invoice Reconciliation (IR)**.
- **Commodity code** : classification d'achat (souvent UNSPSC), qui pilote les règles d'approbation et la comptabilisation.
- **Account assignment** : imputation (centre de coûts, compte général, ordre interne, WBS) héritée de S/4HANA.
- **Supplier et Supplier Location** : le fournisseur et son adresse de commande ; chaque Location peut être reliée à un ANID.

## Vocabulaire des objets (Upstream)

- **Sourcing Project** : conteneur d'un appel d'offres, avec son équipe, ses documents et ses **événements** (RFI, RFP, RFQ, Auction).
- **Contract Workspace** : espace de travail d'un contrat (documents, clauses, tâches, approbations).
- **Supplier Request / Registration / Qualification** : les étapes SLP d'entrée d'un fournisseur.
- **Template** : modèle d'un projet ou d'un workspace, qui porte les tâches et le workflow ; les templates sont la principale zone de paramétrage Upstream.

## Environnements et cycle de release

SAP livre des **releases trimestrielles** : certaines fonctionnalités sont activées par défaut, d'autres sur demande (**feature toggle**). Le consultant lit les release notes et teste en realm de test avant la mise en production, qui est automatique à la date annoncée par SAP.`,
      keyPoints: [
        "Trois briques : realm acheteur, SAP Business Network (ANID, trading relationships) et S/4HANA relié par CIG en cXML/IDoc.",
        "Les permissions sont portées par des groupes (Customer Administrator, Purchasing Agent, Invoice Manager, Catalog Manager…).",
        "Un Approvable est tout document soumis à un flux d'approbation : Requisition, Receipt, Invoice Reconciliation, etc.",
        "Une Requisition approuvée génère un PO par fournisseur ; la facture rapprochée s'appelle Invoice Reconciliation (IR).",
        "Upstream, le paramétrage passe principalement par les templates de projet et de workspace.",
        "Les releases sont trimestrielles ; on teste en realm de test avant l'activation automatique en production.",
      ],
    },
    {
      id: "m1-s1-j2-a2",
      moduleId: "m1",
      week: 1,
      day: 2,
      kind: "simulation",
      title: "Simulation : premier atelier avec le sponsor achats",
      level: "debutant",
      durationMin: 40,
      objective: "S'entraîner à répondre aux questions d'un sponsor métier avec le bon vocabulaire et une architecture claire, sans jargon inutile.",
      context: `## Mise en situation

Vous êtes consultant junior chez BlueBox. La directrice achats de **Novalis Cosmétiques** vous reçoit 45 minutes pour un premier atelier. Elle n'a jamais utilisé Ariba et pose des questions directes :

1. « Concrètement, où mes acheteurs vont-ils travailler et où nos fournisseurs vont-ils travailler ? »
2. « Faut-il que chaque usine ait son propre Ariba ? »
3. « Qui décide qui a le droit d'approuver une commande de 50 000 € ? »
4. « Nos fournisseurs vont-ils payer quelque chose ? »
5. « Nous avons déjà S/4HANA : est-ce qu'on va tout saisir deux fois ? »

Votre chef de projet vous demande de préparer les réponses et un schéma d'architecture en une page.`,
      steps: [
        "Dessinez (sur papier ou outil de votre choix) les trois briques realm, Business Network et S/4HANA avec les flux PO et facture entre elles.",
        "Rédigez une réponse de 3 à 4 phrases à chacune des 5 questions, en vocabulaire métier puis en précisant le terme Ariba entre parenthèses.",
        "Pour la question 3, décrivez le principe d'un flux d'approbation piloté par des règles (montant, commodity code, centre de coûts) sans entrer dans le paramétrage.",
        "Pour la question 4, présentez honnêtement le modèle de compte fournisseur : compte Standard (gratuit) vs compte Enterprise (payant selon volume).",
        "Pour la question 5, listez ce qui est intégré automatiquement (données de base, PO, facture) et ce qui reste à décider en atelier.",
        "Relisez vos réponses et supprimez tout acronyme non expliqué.",
      ],
      deliverable: "Un schéma d'architecture légendé et une fiche réponses d'une page destinée à la directrice achats.",
      solution: `## Réponses types

**1. Où travaillent acheteurs et fournisseurs ?** Vos équipes travaillent dans vos applications Ariba, votre instance privée (le realm). Vos fournisseurs ne voient jamais cette instance : ils reçoivent vos commandes et déposent leurs factures sur le SAP Business Network, un portail partagé où ils ont leur propre compte (identifié par un ANID). Les deux sont reliés par une relation commerciale que vous initiez.

**2. Un Ariba par usine ?** Non. Un seul realm de production porte toutes les entités (sociétés, usines, sites). Les usines se distinguent par des données d'organisation (Purchasing Unit, sociétés, centres de coûts) qui filtrent ce que chacun voit et pilotent les approbations. Un second realm, dit de test, sert aux recettes.

**3. Qui approuve 50 000 € ?** Ce n'est pas une personne que l'on désigne commande par commande : ce sont des règles. Le flux d'approbation (approval flow) est calculé automatiquement selon le montant, la catégorie d'achat (commodity code), le centre de coûts et la hiérarchie du demandeur. Nous définirons ces règles ensemble en atelier, puis l'outil les applique systématiquement et trace qui a approuvé quoi.

**4. Les fournisseurs paient-ils ?** Le compte Standard du Business Network est gratuit : le fournisseur reçoit la commande par e-mail et la retourne en facture. Le compte Enterprise, payant au-delà de certains seuils de volume ou de documents, apporte l'intégration, les catalogues avancés et le reporting. Nous définirons une stratégie d'enablement par segment de fournisseurs pour ne pas imposer de coût aux petits.

**5. Double saisie avec S/4HANA ?** Non : fournisseurs, centres de coûts, comptes et articles sont répliqués de S/4HANA vers Ariba ; la commande approuvée dans Ariba est transmise à S/4HANA ; la facture rapprochée dans Ariba est envoyée en comptabilité pour paiement. Reste à arbitrer en atelier : où est créée la commande (Ariba ou S/4HANA), qui saisit les réceptions, et quel outil fait le rapprochement.

## Erreurs fréquentes à éviter

- Promettre « zéro facture bloquée » : le rapprochement réduit les exceptions mais ne les supprime pas.
- Dire que les fournisseurs « se connectent à votre Ariba » : ils se connectent au réseau, pas au realm.
- Oublier de mentionner la gratuité du compte Standard, ce qui bloque souvent l'adhésion des fournisseurs.`,
      tips: [
        "Une bonne réponse métier commence par le bénéfice, puis donne le terme technique entre parenthèses.",
        "Préparez une seule image mentale, le schéma à trois briques, et revenez-y pour chaque question.",
        "Notez les questions auxquelles vous ne savez pas répondre : elles deviennent des points d'atelier, pas des promesses.",
      ],
    },
    {
      id: "m1-s1-j2-a3",
      moduleId: "m1",
      week: 1,
      day: 2,
      kind: "quiz",
      title: "Quiz : architecture, rôles et vocabulaire",
      level: "debutant",
      durationMin: 12,
      objective: "Vérifier la maîtrise des objets Ariba, des groupes et de l'architecture à trois briques.",
      questions: [
        {
          id: "m1-s1-j2-q1",
          question: "Qu'est-ce qu'un « Approvable » dans SAP Ariba Buying & Invoicing ?",
          options: [
            "Un utilisateur disposant du droit d'approuver",
            "Tout document soumis à un flux d'approbation (Requisition, Receipt, Invoice Reconciliation…)",
            "Le seuil de montant au-delà duquel une approbation est requise",
            "Un fournisseur validé par le service achats",
          ],
          answer: 1,
          explanation: "Approvable est le terme générique des documents qui parcourent un flux d'approbation : Requisition, Receipt, Invoice Reconciliation, Contract Request, etc. Un utilisateur qui approuve est un approbateur (approver), pas un approvable. Le seuil de montant est un paramètre d'une règle d'approbation. Un fournisseur validé relève du processus SLP (statut Qualified ou Preferred), pas d'un approvable au sens Buying.",
          concept: "Approvables et flux d'approbation",
        },
        {
          id: "m1-s1-j2-q2",
          question: "Une Requisition contient des lignes de trois fournisseurs différents. Que se passe-t-il à l'approbation finale ?",
          options: [
            "Un seul Purchase Order regroupant les trois fournisseurs est créé",
            "Trois Purchase Orders sont créés, un par fournisseur",
            "La Requisition est rejetée car un seul fournisseur est autorisé",
            "Les lignes sont envoyées au Sourcing pour mise en concurrence",
          ],
          answer: 1,
          explanation: "À l'approbation complète, Ariba découpe la Requisition en un Purchase Order par fournisseur (et par Supplier Location le cas échéant), car un PO est un document contractuel adressé à un fournisseur unique. Un PO multi-fournisseurs n'existe pas. Une Requisition multi-fournisseurs est parfaitement valide, et l'envoi en Sourcing n'est pas automatique : c'est une décision de l'acheteur dans le cas d'une demande hors catalogue.",
          concept: "Requisition et génération des Purchase Orders",
        },
        {
          id: "m1-s1-j2-q3",
          question: "Quel identifiant relie un fournisseur au SAP Business Network ?",
          options: ["Le numéro SIRET", "Le code fournisseur S/4HANA", "L'ANID (Ariba Network ID)", "Le Commodity code"],
          answer: 2,
          explanation: "L'ANID est l'identifiant unique du compte réseau du fournisseur (et de l'acheteur). Le SIRET est un identifiant légal français qui peut figurer dans le profil mais ne sert pas à router les documents. Le code fournisseur S/4HANA identifie le Business Partner dans l'ERP et doit être mis en correspondance avec l'ANID via la Supplier Location. Le Commodity code classe les achats, il n'identifie pas un fournisseur.",
          concept: "ANID et trading relationships",
        },
        {
          id: "m1-s1-j2-q4",
          question: "Quel groupe Ariba faut-il attribuer à un utilisateur chargé de paramétrer le realm (champs, flux d'approbation, paramètres) ?",
          options: ["Purchasing Agent", "Invoice Manager", "Catalog Manager", "Customer Administrator"],
          answer: 3,
          explanation: "Customer Administrator est le groupe d'administration du realm : accès aux paramètres, à la gestion des utilisateurs, des flux d'approbation et des champs. Purchasing Agent traite les demandes hors catalogue et modifie les commandes ; Invoice Manager résout les exceptions de facture ; Catalog Manager gère le chargement et la publication des catalogues. Aucun de ces trois groupes ne donne accès au paramétrage global.",
          concept: "Groupes et permissions Ariba",
        },
        {
          id: "m1-s1-j2-q5",
          question: "Dans un déploiement avec S/4HANA, quel composant assure l'échange des messages entre Ariba et l'ERP ?",
          options: [
            "Le Contract Workspace",
            "CIG (Cloud Integration Gateway / SAP Integration Suite, managed gateway)",
            "Guided Buying",
            "Le realm de test",
          ],
          answer: 1,
          explanation: "CIG est la passerelle d'intégration gérée par SAP qui transforme les messages cXML d'Ariba en IDoc ou appels SOAP compris par S/4HANA, et inversement. Le Contract Workspace est un objet de la solution Contracts ; Guided Buying est l'interface simplifiée de demande d'achat ; le realm de test est un environnement, pas un composant d'intégration.",
          concept: "Rôle de CIG dans l'intégration S/4HANA",
        },
      ],
    },
  ],
  useCases: [
    {
      id: "m1-uc1",
      moduleId: "m1",
      title: "Choisir le périmètre de la première vague",
      client: "Groupe agroalimentaire, 6 000 salariés, 12 sociétés en Europe",
      situation: "Le client veut « tout Ariba en 9 mois » : Sourcing, Contracts, SLP, Buying, Invoicing et Network, sur 12 sociétés et 3 ERP différents dont un S/4HANA en cours de déploiement.",
      challenge: "Éviter un big bang irréaliste tout en conservant l'adhésion du sponsor qui a vendu un programme ambitieux à sa direction générale.",
      approach: [
        "Cartographier les processus par société et mesurer la maturité : volumes de PO, part de factures sans commande, nombre de fournisseurs actifs.",
        "Proposer un découpage en vagues : vague 1 = Buying & Invoicing + Business Network sur les 2 sociétés déjà en S/4HANA ; vague 2 = Sourcing et Contracts groupe ; vague 3 = SLP et extension aux autres ERP.",
        "Démontrer avec des chiffres que le P2P sur le périmètre S/4HANA capte 60 % des factures bloquées dès la vague 1.",
        "Formaliser un plan d'intégration unique via CIG pour ne pas refaire les mappings à chaque vague.",
        "Faire valider le phasage par le comité de pilotage avec des jalons de valeur mesurables.",
      ],
      outcome: "Mise en production de la vague 1 en 6 mois, taux de factures électroniques à 70 % sur le périmètre, confiance du sponsor préservée pour les vagues suivantes.",
      lesson: "Le consultant apporte de la valeur en découpant l'ambition en vagues cohérentes avec l'intégration ERP, pas en disant oui à tout.",
    },
    {
      id: "m1-uc2",
      moduleId: "m1",
      title: "Clarifier Upstream et Downstream auprès des équipes IT",
      client: "Entreprise de services numériques, 1 800 salariés",
      situation: "L'équipe IT interne pense qu'Ariba est « un seul module » et prévoit une seule équipe de support, un seul plan de test et une seule formation administrateur.",
      challenge: "Faire comprendre que Sourcing/Contracts (Upstream) et Buying/Invoicing (Downstream) ont des interfaces d'administration, des objets et des cycles de paramétrage différents.",
      approach: [
        "Organiser une démonstration comparée : création d'un template de Sourcing Project côté Upstream, puis paramétrage d'une règle d'approbation côté Downstream.",
        "Produire une matrice de responsabilités (RACI) par domaine : templates et bibliothèque Upstream, flux d'approbation et catalogues Downstream, intégration CIG.",
        "Dimensionner deux profils d'administrateur fonctionnel et un référent intégration.",
        "Adapter le plan de recette par domaine, avec des jeux de données distincts.",
      ],
      outcome: "Organisation de support en deux pôles fonctionnels et un pôle intégration, réduction des tickets mal routés de 40 % après la mise en production.",
      lesson: "Expliquer très tôt la dualité Upstream/Downstream évite des erreurs d'organisation coûteuses.",
    },
    {
      id: "m1-uc3",
      moduleId: "m1",
      title: "Lever les craintes des fournisseurs sur le Business Network",
      client: "Collectivité et établissements publics, 400 fournisseurs locaux",
      situation: "Les petits fournisseurs refusent de « payer pour être payés » après avoir entendu parler de frais du Business Network.",
      challenge: "Obtenir l'adhésion des fournisseurs sans dégrader la relation, dans un contexte public sensible.",
      approach: [
        "Segmenter les fournisseurs par volume de documents et de montant pour identifier ceux éligibles au compte Standard gratuit.",
        "Rédiger une communication claire : compte Standard gratuit, commande reçue par e-mail, facture créée par PO flip sans logiciel.",
        "Organiser deux webinaires fournisseurs animés par l'acheteur et le consultant.",
        "Mettre en place une assistance téléphonique de premier niveau pendant 2 mois.",
      ],
      outcome: "85 % des fournisseurs actifs ont accepté la relation commerciale sur le réseau en 3 mois, sans frais pour 92 % d'entre eux.",
      lesson: "Le modèle de compte Standard vs Enterprise doit être expliqué de façon transparente dès le cadrage.",
    },
  ],
  glossary: [
    { term: "Source-to-Pay (S2P)", definition: "Cycle complet des achats, de l'analyse de la dépense et la consultation du marché jusqu'au paiement de la facture.", moduleId: "m1" },
    { term: "Realm", definition: "Instance cloud des applications acheteur SAP Ariba dédiée à un client ; généralement un realm de test (-T) et un realm de production.", moduleId: "m1" },
    { term: "SAP Business Network (Ariba Network)", definition: "Plateforme collaborative B2B où fournisseurs et acheteurs échangent commandes, avis d'expédition et factures.", moduleId: "m1" },
    { term: "ANID", definition: "Ariba Network ID : identifiant unique d'un compte sur le Business Network, côté fournisseur comme côté acheteur.", moduleId: "m1" },
    { term: "Upstream", definition: "Solutions amont du cycle achats : Sourcing, Contracts, Supplier Lifecycle & Performance, Spend Analysis.", moduleId: "m1" },
    { term: "Downstream", definition: "Solutions aval : Buying & Invoicing, Guided Buying, catalogues.", moduleId: "m1" },
    { term: "Approvable", definition: "Document soumis à un flux d'approbation : Requisition, Receipt, Invoice Reconciliation, Contract Request…", moduleId: "m1" },
    { term: "Requisition (PR)", definition: "Demande d'achat créée par un demandeur ; devient un ou plusieurs Purchase Orders après approbation.", moduleId: "m1" },
    { term: "Invoice Reconciliation (IR)", definition: "Document de rapprochement d'une facture avec la commande et la réception, portant les exceptions à résoudre.", moduleId: "m1" },
    { term: "CIG", definition: "Cloud Integration Gateway (SAP Integration Suite, managed gateway) : passerelle d'intégration gérée par SAP entre Ariba et S/4HANA ou ECC.", moduleId: "m1" },
    { term: "cXML", definition: "Commerce XML : format de message standard utilisé par Ariba pour les commandes, factures, catalogues PunchOut, etc.", moduleId: "m1" },
    { term: "Customer Administrator", definition: "Groupe Ariba donnant accès au paramétrage global du realm : utilisateurs, groupes, flux d'approbation, paramètres.", moduleId: "m1" },
  ],
  faq: [
    { q: "Faut-il être développeur pour devenir consultant SAP Ariba ?", a: "Non. Ariba est une solution SaaS paramétrable sans code. En revanche, un bon consultant technico-fonctionnel comprend les formats d'échange (cXML, IDoc), lit un fichier de mapping CIG et sait analyser un log d'intégration.", moduleId: "m1" },
    { q: "Quelle est la différence entre Ariba Network et SAP Business Network ?", a: "Il s'agit de la même plateforme : SAP a renommé Ariba Network en SAP Business Network en 2021 en l'élargissant à la logistique et à la maintenance. Dans la documentation et la certification, les deux noms coexistent encore.", moduleId: "m1" },
    { q: "Peut-on utiliser Ariba sans SAP S/4HANA ?", a: "Oui. Ariba s'intègre à SAP ECC, S/4HANA, mais aussi à des ERP tiers via des flux cXML ou fichiers. L'intégration avec S/4HANA via CIG est toutefois la plus standardisée et la plus fréquente, d'où sa place dans ce parcours.", moduleId: "m1" },
    { q: "Combien de realms un client possède-t-il ?", a: "Le plus souvent deux : un realm de test pour le paramétrage et les recettes, un realm de production. Certains grands comptes en ont un troisième pour la formation ou les projets parallèles, moyennant un coût supplémentaire.", moduleId: "m1" },
    { q: "Comment un consultant suit-il les évolutions trimestrielles d'Ariba ?", a: "En lisant les release notes publiées par SAP avant chaque release, en testant les fonctionnalités activées par défaut dans le realm de test, et en décidant avec le client d'activer ou non les fonctionnalités optionnelles (feature toggles).", moduleId: "m1" },
    { q: "Quelle certification vise ce parcours ?", a: "La certification SAP Certified Associate liée à SAP Ariba (procurement / sourcing / supplier management selon la déclinaison choisie). Elle évalue le processus, le paramétrage et les notions d'intégration, ce qui correspond exactement aux 8 semaines du programme.", moduleId: "m1" },
  ],
};
