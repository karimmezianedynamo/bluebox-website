import type { ModuleContent } from "../types";

export const m6: ModuleContent = {
  moduleId: "m6",
  activities: [
    // ───────────────────────── Semaine 5 · Jour 1 : Ariba Network : fondamentaux ─────────────────────────
    {
      id: "m6-s5-j1-a1",
      moduleId: "m6",
      week: 5,
      day: 1,
      kind: "lecon",
      title: "SAP Business Network : le réseau qui relie acheteurs et fournisseurs",
      level: "debutant",
      durationMin: 25,
      objective: "Comprendre ce qu'est SAP Business Network (ex Ariba Network), ses deux types de comptes et la relation commerciale qui les relie.",
      content: `## Un réseau, deux faces

**SAP Business Network** (anciennement **Ariba Network**) est la plateforme cloud B2B qui met en relation les entreprises acheteuses utilisant SAP Ariba (ou S/4HANA) et leurs fournisseurs. Toute transaction P2P dématérialisée (commande, confirmation, avis d'expédition, facture) transite par ce réseau : l'acheteur émet un document depuis son système, le réseau le route au fournisseur, qui répond depuis son propre compte.

Il faut distinguer deux faces du réseau :

- Le **compte acheteur** (buyer account) : il est lié au site Ariba Buying & Invoicing du client (le *realm*) ou à S/4HANA via CIG. C'est là que l'on définit les règles de transaction, que l'on pilote l'enablement et que l'on suit les flux.
- Le **compte fournisseur** (supplier account) : chaque fournisseur possède un compte identifié par un **ANID** (Ariba Network ID, format \`AN01xxxxxxxxx\`). Un même ANID peut servir plusieurs clients.

> Le réseau est **many-to-many** : un fournisseur se connecte une seule fois et peut transiger avec tous ses clients présents sur le réseau. C'est l'argument central face aux portails propriétaires.

## Standard account vs Enterprise account

| Critère | Standard account | Enterprise account |
|---|---|---|
| Coût pour le fournisseur | Gratuit | Abonnement payant selon volume/valeur de documents |
| Réception des commandes | Par e-mail interactif (lien vers le document) | Boîte de réception complète sur le portail |
| Intégration cXML / EDI | Non | Oui |
| Catalogues publiés | Non (hors catalogue hébergé par l'acheteur) | Oui |
| Reporting, multi-utilisateurs avancé | Limité | Complet |
| Support | Communauté / aide en ligne | Support SAP dédié |

Le consultant doit anticiper cette question très tôt : un fournisseur à fort volume refusera parfois de payer un abonnement Enterprise. La stratégie d'enablement (jour 3) tient compte de ce point.

## La relation commerciale (Trading Relationship)

Un fournisseur ne voit un acheteur que lorsqu'une **relation commerciale** existe. Elle naît d'une **Trading Relationship Request (TRR)** envoyée par l'acheteur ; le fournisseur l'accepte (ou crée son compte à cette occasion). Tant qu'elle n'est pas acceptée, les commandes partent mais le fournisseur ne peut pas y répondre électroniquement.

## Identifiants et environnements

- **Network ID (ANID)** : identifiant unique du compte, préfixe \`AN01\` en production, \`AN02\` pour les comptes de test.
- Chaque compte Enterprise dispose d'un **test account** jumelé, utilisé pour valider les flux cXML ou les catalogues avant mise en production.
- Côté acheteur, le site Ariba possède aussi un ANID : il figure dans l'en-tête \`From\`/\`To\` des messages cXML.

## Que voit l'acheteur ?

Depuis le compte acheteur, l'administrateur accède à : les **Default Transaction Rules**, la gestion des relations fournisseurs, les tâches d'**enablement**, le **Supplier Information Portal**, les rapports de documents et les paramétrages de routage. Ce sont les leviers que nous détaillerons sur les deux prochains jours.`,
      keyPoints: [
        "SAP Business Network = ex Ariba Network : plateforme B2B many-to-many entre acheteurs et fournisseurs.",
        "Le compte acheteur pilote règles, enablement et suivi ; le compte fournisseur (ANID) reçoit et répond aux documents.",
        "Standard account : gratuit, e-mail interactif, pas d'intégration ; Enterprise account : payant, cXML/EDI, catalogues, reporting.",
        "La relation commerciale naît d'une Trading Relationship Request (TRR) acceptée par le fournisseur.",
        "ANID AN01 = production, AN02 = test ; chaque compte Enterprise a un test account jumelé.",
      ],
    },
    {
      id: "m6-s5-j1-a2",
      moduleId: "m6",
      week: 5,
      day: 1,
      kind: "exercice",
      title: "Cartographier le réseau d'un client",
      level: "debutant",
      durationMin: 35,
      objective: "Identifier, pour un panel fournisseurs réel, le type de compte cible et les prérequis de relation commerciale.",
      context: `Vous rejoignez un projet Ariba Buying & Invoicing chez **Nordia Énergie**, distributeur d'énergie de 2 500 salariés. Le client vous remet un extrait de son référentiel fournisseurs :

| Fournisseur | Dépense annuelle | Nb factures/an | Déjà sur le réseau ? | Commentaire |
|---|---|---|---|---|
| Schneider Electric | 4,2 M€ | 1 800 | Oui (Enterprise) | Flux EDI avec d'autres clients |
| Cabinet Durand Avocats | 180 k€ | 24 | Non | Factures PDF par e-mail |
| Office Depot | 310 k€ | 950 | Oui (Enterprise) | Propose un catalogue PunchOut |
| Maçonnerie Lefèvre | 95 k€ | 12 | Non | Pas d'outil informatique au-delà d'Excel |
| TotalEnergies Carburants | 2,9 M€ | 365 | Oui | Compte Standard utilisé avec un autre client |

Le directeur achats veut « tout le monde sur le réseau en trois mois ».`,
      steps: [
        "Pour chaque fournisseur, déterminez le type de compte cible (Standard ou Enterprise) en justifiant par le volume de documents et le besoin d'intégration.",
        "Identifiez ceux pour lesquels une Trading Relationship Request suffit (déjà sur le réseau) et ceux qu'il faudra inviter à créer un compte.",
        "Repérez le ou les fournisseurs pour lesquels la question des frais Enterprise peut créer un blocage et proposez une réponse.",
        "Pour Maçonnerie Lefèvre, proposez le mode de réception des commandes le plus réaliste.",
        "Classez les cinq fournisseurs en deux vagues d'enablement (vague 1 = valeur rapide, vague 2 = plus complexe).",
        "Rédigez trois questions à poser au client pour compléter cette cartographie (données manquantes).",
      ],
      deliverable: "Un tableau à cinq lignes (fournisseur, compte cible, action relation commerciale, vague, risque/point d'attention) et la liste de trois questions.",
      solution: `## Corrigé type

| Fournisseur | Compte cible | Action | Vague | Point d'attention |
|---|---|---|---|---|
| Schneider Electric | Enterprise (existant) | TRR vers l'ANID existant, puis projet d'intégration EDI/cXML | 1 | Récupérer le bon ANID (groupes internationaux en ont souvent plusieurs) |
| Cabinet Durand | Standard | Invitation à créer un compte Standard via TRR | 2 | 24 factures/an : aucun intérêt à payer, le compte Standard suffit |
| Office Depot | Enterprise (existant) | TRR + activation du catalogue PunchOut (module 7) | 1 | Le catalogue nécessite un compte Enterprise, déjà en place |
| Maçonnerie Lefèvre | Standard | TRR par e-mail, accompagnement téléphonique | 2 | Réception des PO par **e-mail interactif** ; prévoir un guide d'une page |
| TotalEnergies Carburants | Enterprise recommandé | TRR vers l'ANID existant ; discussion sur le passage en Enterprise | 1 | 365 factures/an et 2,9 M€ : le volume dépasse les seuils de gratuité, des **frais** s'appliqueront ; impliquer le category manager |

**Frais Enterprise** : la réponse du consultant n'est pas de les nier mais de les mettre en regard du gain (paiement plus rapide grâce au statut facture en temps réel, suppression de la ressaisie, visibilité). Si le fournisseur refuse, l'acheteur peut accepter un compte Standard : les documents circulent, seule la richesse du portail diminue.

**Questions à poser au client** (exemples) :
1. Quelle est la part de commandes de services (Service Entry Sheet) par rapport aux commandes de biens ?
2. Les fournisseurs sont-ils déjà déclarés avec un identifiant DUNS ou un numéro de TVA fiable dans le référentiel S/4HANA ?
3. Qui, chez Nordia, sera le sponsor interne pour relancer les fournisseurs qui n'acceptent pas la TRR ?

> L'objectif « tout le monde en trois mois » est irréaliste pour les intégrations EDI (Schneider) : on sépare le **go-live réseau** (compte + TRR) du **go-live intégration** (flux automatisés).`,
      tips: [
        "Le nombre de documents (PO + factures) compte plus que le montant pour choisir Standard ou Enterprise.",
        "Un fournisseur déjà présent n'a besoin que d'une TRR : c'est la vague la plus rapide.",
        "Pensez toujours au canal de réception réel du fournisseur (boîte e-mail générique, ERP, personne unique).",
      ],
    },
    {
      id: "m6-s5-j1-a3",
      moduleId: "m6",
      week: 5,
      day: 1,
      kind: "quiz",
      title: "Quiz : fondamentaux du réseau",
      level: "debutant",
      durationMin: 12,
      objective: "Vérifier la compréhension des comptes, identifiants et relations commerciales du réseau.",
      questions: [
        {
          id: "m6-s5-j1-q1",
          question: "Quel préfixe d'ANID identifie un compte de test sur SAP Business Network ?",
          options: ["AN01", "AN02", "AN00", "TST"],
          answer: 1,
          explanation: "Les comptes de production portent un ANID commençant par AN01, tandis que les comptes de test jumelés commencent par AN02 : c'est ce qui permet de distinguer immédiatement un environnement de validation d'un environnement réel dans les en-têtes cXML. AN00 n'existe pas comme préfixe de compte, et TST n'est pas un format d'identifiant Ariba ; les identifiants du réseau sont toujours numériques après le préfixe AN.",
          concept: "ANID et environnements production/test",
        },
        {
          id: "m6-s5-j1-q2",
          question: "Un fournisseur émet 1 200 factures par an et souhaite intégrer son ERP en cXML. Quel type de compte doit-il détenir ?",
          options: ["Un compte Standard, gratuit et suffisant", "Un compte Enterprise", "Un compte acheteur", "Aucun compte : l'acheteur saisit pour lui"],
          answer: 1,
          explanation: "L'intégration cXML ou EDI, comme la publication de catalogues et le reporting avancé, est réservée au compte Enterprise, qui est payant selon le volume et la valeur des documents. Le compte Standard est gratuit mais limité à l'e-mail interactif et au portail, sans intégration système. Le compte acheteur est celui de l'entreprise cliente, pas du fournisseur. Enfin, l'acheteur ne saisit jamais à la place du fournisseur : le principe du réseau est que chaque partie émet ses propres documents.",
          concept: "Standard account vs Enterprise account",
        },
        {
          id: "m6-s5-j1-q3",
          question: "Qu'est-ce qui établit la relation entre un acheteur et un fournisseur sur le réseau ?",
          options: ["L'envoi du premier bon de commande", "Une Trading Relationship Request acceptée par le fournisseur", "La création du fournisseur dans S/4HANA", "Le paiement de l'abonnement Enterprise"],
          answer: 1,
          explanation: "La relation commerciale naît d'une Trading Relationship Request (TRR) émise par l'acheteur et acceptée par le fournisseur, qui crée son compte à cette occasion s'il n'en a pas. L'envoi d'un premier bon de commande peut déclencher l'invitation, mais tant que la TRR n'est pas acceptée, le fournisseur ne peut pas répondre électroniquement. La création du fournisseur dans S/4HANA alimente le référentiel acheteur mais ne crée rien sur le réseau. L'abonnement Enterprise concerne les fonctionnalités du compte, pas la relation.",
          concept: "Trading Relationship Request (TRR)",
        },
        {
          id: "m6-s5-j1-q4",
          question: "Quel avantage principal distingue SAP Business Network d'un portail fournisseur propriétaire ?",
          options: ["Il est gratuit pour tous les fournisseurs", "Il remplace l'ERP du fournisseur", "Il est many-to-many : un fournisseur se connecte une fois pour tous ses clients", "Il n'exige aucune relation commerciale préalable"],
          answer: 2,
          explanation: "Le réseau est many-to-many : un fournisseur connecté une fois peut transiger avec tous ses clients présents, contrairement à un portail propriétaire propre à chaque acheteur. Il n'est pas gratuit pour tous : le compte Enterprise est payant au-delà de certains seuils. Il ne remplace pas l'ERP du fournisseur, il s'y intègre ou s'y substitue pour les seuls échanges documentaires. Enfin, une relation commerciale (TRR) reste nécessaire pour que les documents circulent.",
          concept: "Positionnement de SAP Business Network",
        },
        {
          id: "m6-s5-j1-q5",
          question: "Où un administrateur acheteur configure-t-il les règles de transaction par défaut ?",
          options: ["Dans le compte fournisseur de chaque partenaire", "Dans le compte acheteur sur SAP Business Network", "Dans la transaction ME21N de S/4HANA", "Dans le fichier CIF du catalogue"],
          answer: 1,
          explanation: "Les Default Transaction Rules sont définies par l'acheteur dans son compte acheteur du réseau ; elles s'appliquent à tous les fournisseurs, avec possibilité de surcharges par pays ou par groupe de fournisseurs. Le compte fournisseur subit ces règles mais ne les configure pas. ME21N sert à créer une commande dans S/4HANA, pas à régler le comportement du réseau. Le fichier CIF est un format de catalogue, sans lien avec les règles de transaction.",
          concept: "Règles de transaction du compte acheteur",
        },
      ],
    },

    // ───────────────────────── Semaine 5 · Jour 2 : Flux documentaires et règles de transaction ─────────────────────────
    {
      id: "m6-s5-j2-a1",
      moduleId: "m6",
      week: 5,
      day: 2,
      kind: "lecon",
      title: "Documents du réseau et règles de transaction",
      level: "intermediaire",
      durationMin: 30,
      objective: "Maîtriser la chaîne documentaire PO → facture sur le réseau et le mécanisme des règles de transaction à trois niveaux.",
      content: `## La chaîne documentaire

Sur SAP Business Network, chaque étape du P2P correspond à un document typé, le plus souvent au format **cXML** côté réseau :

| Étape | Document | Émetteur | Message cXML |
|---|---|---|---|
| Commande | **Purchase Order** (PO) | Acheteur | \`OrderRequest\` |
| Accusé de réception | **Order Confirmation** (OC) | Fournisseur | \`ConfirmationRequest\` |
| Expédition | **Advance Ship Notice** (ASN) | Fournisseur | \`ShipNoticeRequest\` |
| Prestation réalisée | **Service Entry Sheet** (SES) | Fournisseur (ou acheteur) | \`ServiceEntryRequest\` |
| Réception | **Goods Receipt** (GR) | Acheteur | \`ReceiptRequest\` |
| Facturation | **Invoice** / **Credit memo** | Fournisseur | \`InvoiceDetailRequest\` |
| Règlement | **Payment proposal** / **Remittance advice** | Acheteur | \`PaymentProposalRequest\` / \`PaymentRemittanceRequest\` |

Les **Scheduling Agreement Releases** (appels de livraison sur contrat cadre) et les **Blanket PO** complètent le périmètre pour les flux de production.

## Statuts d'une facture

Le fournisseur suit sa facture via le **routing status** et l'**invoice status** : *Sent* (envoyée), *Acknowledged*, *Approved* (rapprochée côté acheteur), *Rejected* (rejetée avec motif), *Paid* (statut remonté lorsque l'acheteur envoie la remittance). Ce suivi en temps réel réduit les appels au service comptable : c'est un argument fort de l'enablement.

## Comment la commande arrive au fournisseur : le routing

La **PO routing method** est choisie par le fournisseur dans son compte : *Online* (portail uniquement), *Email* (notification avec lien ou PDF), *cXML*, *EDI* (ANSI X12 850 / EDIFACT ORDERS), voire *Fax*. L'acheteur ne la force pas, mais peut l'exiger dans ses prérequis d'enablement.

## Les règles de transaction : trois niveaux

Les **Default Transaction Rules** définissent ce que le réseau accepte du fournisseur. Elles se déclinent en trois couches, de la plus générale à la plus spécifique :

1. **Default Transaction Rules** : s'appliquent à tous les fournisseurs.
2. **Country-based Invoice Rules** : surcharges par pays du fournisseur (mentions légales, TVA, formats de date, facturation électronique obligatoire).
3. **Supplier Group Rules** : surcharges pour un groupe de fournisseurs défini par l'acheteur (ex. « fournisseurs intégrés cXML », « prestataires de services »).

Exemples de règles courantes :

- *Require suppliers to create an order confirmation for the PO* : oblige l'OC avant l'ASN ou la facture.
- *Allow suppliers to send invoices without a purchase order* : facture hors commande (à proscrire en général).
- *Allow suppliers to increase item quantities / unit prices* avec **tolérances** (% ou valeur) : au-delà, le réseau rejette la facture avant même qu'elle n'atteinte Ariba Buying.
- *Require tax information at line level* et règles de **TVA** par pays.
- *Allow suppliers to send invoices with service information* : indispensable pour les SES.
- *Require suppliers to provide their tax ID* : contrôle de conformité.

> Une règle rejetée sur le réseau ne génère **pas d'exception** dans Ariba Buying & Invoicing : la facture revient au fournisseur avec un motif. C'est un filtre amont qui allège le travail des comptables, mais qui doit être expliqué aux fournisseurs pour ne pas créer de frustration.

## Point de vigilance du consultant

Les règles sont souvent copiées d'un client à l'autre sans réflexion. Un atelier dédié avec la comptabilité fournisseurs et les achats permet d'arbitrer chaque règle : qu'est-ce qu'on bloque sur le réseau, qu'est-ce qu'on laisse passer pour le traiter en exception côté Ariba Buying ?`,
      keyPoints: [
        "Chaîne documentaire : PO → Order Confirmation → ASN / Service Entry Sheet → Goods Receipt → Invoice / Credit memo → Payment remittance.",
        "Statuts facture visibles par le fournisseur : Sent, Acknowledged, Approved, Rejected, Paid.",
        "La PO routing method (online, e-mail, cXML, EDI, fax) est un choix du fournisseur dans son compte.",
        "Trois niveaux de règles : Default Transaction Rules, Country-based rules, Supplier Group rules.",
        "Un rejet par règle de transaction arrête la facture sur le réseau, sans exception dans Ariba Buying.",
      ],
    },
    {
      id: "m6-s5-j2-a2",
      moduleId: "m6",
      week: 5,
      day: 2,
      kind: "exercice",
      title: "Arbitrer les règles de transaction d'un client",
      level: "intermediaire",
      durationMin: 40,
      objective: "Construire une matrice de règles de transaction à trois niveaux à partir de besoins métier concrets.",
      context: `**Pharmavita**, laboratoire pharmaceutique de 4 000 salariés, déploie Ariba Buying & Invoicing avec intégration S/4HANA. Lors de l'atelier avec la comptabilité fournisseurs et les achats, vous recueillez les besoins suivants :

- Les factures sans commande sont interdites, sauf pour les **frais juridiques et honoraires** (groupe « Prestataires intellectuels »).
- Une tolérance de **+5 % en quantité** et **+2 % en prix unitaire** est acceptée sur les biens ; aucune tolérance sur les services.
- Les fournisseurs **italiens** doivent passer par le système d'interchange SDI : la facture envoyée sur le réseau ne doit pas être considérée comme l'original fiscal.
- Les fournisseurs de **production** (matières premières) doivent systématiquement confirmer la commande et envoyer un ASN.
- Toute facture doit comporter le numéro de TVA du fournisseur et la TVA au niveau ligne.
- Les prestataires de services facturent sur la base d'une Service Entry Sheet.`,
      steps: [
        "Listez les règles qui relèvent du niveau Default Transaction Rules (valables pour tous).",
        "Identifiez les besoins qui exigent une Country-based Invoice Rule et précisez pour quel pays.",
        "Définissez les groupes de fournisseurs nécessaires et les règles qui leur sont propres (Supplier Group Rules).",
        "Pour chaque règle de tolérance, indiquez si elle doit être bloquée sur le réseau ou traitée en exception dans Ariba Buying, et pourquoi.",
        "Rédigez le message d'explication (5 lignes) destiné aux fournisseurs pour justifier le rejet automatique d'une facture hors tolérance.",
        "Identifiez un conflit potentiel entre deux règles et proposez l'arbitrage.",
      ],
      deliverable: "Une matrice de règles sur trois niveaux (Default / Country / Group) avec, pour chaque règle, la valeur retenue et la justification, plus le message fournisseur.",
      solution: `## Matrice proposée

**Default Transaction Rules (tous fournisseurs)**
- *Allow suppliers to send invoices without a PO* : **Non**.
- *Require suppliers to provide their tax ID* : **Oui**.
- *Require tax information at line level* : **Oui**.
- *Allow suppliers to increase item quantities* : **Oui, tolérance 5 %**.
- *Allow suppliers to increase unit prices* : **Oui, tolérance 2 %**.
- *Allow suppliers to send invoices with service information* : **Oui** (sinon les SES ne peuvent pas être facturées).
- *Require order confirmation* : **Non** par défaut (trop contraignant pour les petits fournisseurs indirects).

**Country-based Invoice Rules — Italie**
- Activer la règle indiquant que la facture réseau est une **copie** et non l'original fiscal (le fournisseur transmet l'original via SDI). Documenter dans le Supplier Information Portal.

**Supplier Group Rules**
- Groupe *Prestataires intellectuels* : *Allow invoices without PO* = **Oui**, avec obligation de référence contractuelle ; tolérances sans objet.
- Groupe *Fournisseurs de production* : *Require order confirmation* = **Oui**, *Require ASN before invoice* = **Oui**.
- Groupe *Prestataires de services* : tolérance quantité et prix = **0 %** ; facture uniquement contre SES approuvée.

## Bloquer sur le réseau ou traiter en exception ?

Les tolérances de 5 % / 2 % sont **bloquées sur le réseau** : un dépassement est presque toujours une erreur de saisie, et le fournisseur corrige plus vite s'il est prévenu immédiatement. En revanche, les écarts **en dessous** des tolérances passent et sont rapprochés automatiquement dans Ariba Buying : on évite ainsi des exceptions pour quelques centimes.

## Conflit identifié

La règle Default « pas de facture sans PO » et le groupe « Prestataires intellectuels » se contredisent : c'est voulu, la règle de groupe **surcharge** la règle par défaut. Le risque est l'affectation d'un fournisseur au mauvais groupe : prévoir une revue trimestrielle des membres du groupe par les achats.

## Message fournisseur (exemple)

> Votre facture a été refusée automatiquement par SAP Business Network car la quantité ou le prix dépasse la commande de Pharmavita au-delà de la tolérance autorisée (5 % en quantité, 2 % en prix). Merci de vérifier la commande d'origine ; si la différence est légitime, contactez votre acheteur pour obtenir un avenant de commande avant de refacturer. Ce contrôle évite les retards de paiement liés aux litiges.`,
      tips: [
        "Une règle de groupe prime sur une règle pays, qui prime sur la règle par défaut : documentez cette hiérarchie dans le dossier de paramétrage.",
        "Chaque règle bloquante doit avoir son texte explicatif dans le Supplier Information Portal.",
        "Testez les règles avec le compte de test d'un fournisseur pilote avant le go-live.",
      ],
    },
    {
      id: "m6-s5-j2-a3",
      moduleId: "m6",
      week: 5,
      day: 2,
      kind: "quiz",
      title: "Quiz : flux et règles de transaction",
      level: "intermediaire",
      durationMin: 12,
      objective: "Valider la connaissance des documents du réseau et de la hiérarchie des règles.",
      questions: [
        {
          id: "m6-s5-j2-q1",
          question: "Quel document le fournisseur envoie-t-il pour annoncer l'expédition des marchandises ?",
          options: ["Order Confirmation", "Goods Receipt", "Advance Ship Notice", "Service Entry Sheet"],
          answer: 2,
          explanation: "L'Advance Ship Notice (ASN, message cXML ShipNoticeRequest) est émis par le fournisseur pour annoncer l'expédition, avec dates, quantités et éventuellement numéros de colis. L'Order Confirmation intervient avant, pour accepter ou amender la commande. Le Goods Receipt est émis par l'acheteur lors de la réception physique. La Service Entry Sheet concerne les prestations de services, non les marchandises.",
          concept: "Chaîne documentaire du réseau (PO, OC, ASN, SES, GR, facture)",
        },
        {
          id: "m6-s5-j2-q2",
          question: "Une facture dépasse la tolérance de prix fixée dans les règles de transaction. Que se passe-t-il ?",
          options: ["Elle crée une exception de prix dans Ariba Buying & Invoicing", "Elle est rejetée sur le réseau et renvoyée au fournisseur avec un motif", "Elle est payée avec le prix de la commande", "Elle est mise en attente d'approbation du comptable"],
          answer: 1,
          explanation: "Les règles de transaction agissent comme un filtre amont : une facture non conforme est rejetée par le réseau avant d'atteindre Ariba Buying & Invoicing, et le fournisseur reçoit un motif de rejet. Aucune exception n'est donc créée dans Ariba Buying, ce qui distingue ce mécanisme du rapprochement de facture (IR). Le réseau ne modifie jamais le prix facturé pour l'aligner sur la commande, et il ne déclenche pas d'approbation comptable : la facture n'entre tout simplement pas dans le système acheteur.",
          concept: "Règles de transaction du compte acheteur",
        },
        {
          id: "m6-s5-j2-q3",
          question: "Quelle couche de règles permet d'imposer une exigence spécifique aux fournisseurs d'un seul pays ?",
          options: ["Default Transaction Rules", "Supplier Group Rules", "Country-based Invoice Rules", "PO routing method"],
          answer: 2,
          explanation: "Les Country-based Invoice Rules surchargent les règles par défaut pour les fournisseurs d'un pays donné, par exemple pour tenir compte d'une obligation de facturation électronique nationale ou de mentions fiscales. Les Default Transaction Rules s'appliquent à tous sans distinction. Les Supplier Group Rules ciblent un groupe défini par l'acheteur, qui n'est pas nécessairement géographique. La PO routing method n'est pas une règle : c'est le canal de réception des commandes choisi par le fournisseur.",
          concept: "Hiérarchie des règles : Default, Country, Supplier Group",
        },
        {
          id: "m6-s5-j2-q4",
          question: "Qui choisit la méthode de routage des bons de commande (e-mail, cXML, EDI...) ?",
          options: ["L'administrateur acheteur, dans les règles de transaction", "Le fournisseur, dans la configuration de son compte", "SAP, selon le type de compte", "Le système S/4HANA, selon le groupe de fournisseurs"],
          answer: 1,
          explanation: "La PO routing method est un paramètre du compte fournisseur : c'est lui qui décide de recevoir ses commandes en ligne, par e-mail, en cXML, en EDI ou par fax. L'acheteur peut l'exiger contractuellement ou dans ses prérequis d'enablement, mais ne la configure pas dans ses règles de transaction. SAP ne l'impose pas selon le type de compte, même si l'intégration cXML/EDI nécessite un compte Enterprise. S/4HANA ignore totalement ce paramètre, qui est propre au réseau.",
          concept: "PO routing method",
        },
        {
          id: "m6-s5-j2-q5",
          question: "Quel statut indique au fournisseur que l'acheteur a rapproché sa facture et l'a validée pour paiement ?",
          options: ["Sent", "Acknowledged", "Approved", "Paid"],
          answer: 2,
          explanation: "Le statut Approved signifie que la facture a été rapprochée et approuvée côté acheteur (dans Ariba Buying & Invoicing ou S/4HANA) et qu'elle est prête pour le paiement. Sent indique seulement que la facture a quitté le réseau vers l'acheteur. Acknowledged confirme la réception technique par le système acheteur, sans jugement sur le contenu. Paid n'arrive qu'après l'envoi d'une remittance advice par l'acheteur, lorsque le règlement est effectué.",
          concept: "Statuts de facture sur le réseau",
        },
      ],
    },

    // ───────────────────────── Semaine 5 · Jour 3 : Enablement fournisseurs ─────────────────────────
    {
      id: "m6-s5-j3-a1",
      moduleId: "m6",
      week: 5,
      day: 3,
      kind: "lecon",
      title: "Conduire un programme d'enablement fournisseurs",
      level: "intermediaire",
      durationMin: 25,
      objective: "Structurer un programme d'enablement par vagues, de la segmentation au suivi des tâches sur le réseau.",
      content: `## Pourquoi l'enablement est le vrai projet

Paramétrer Ariba est une affaire de semaines ; convaincre 800 fournisseurs d'accepter une relation commerciale et de changer leurs habitudes est une affaire de mois. Le **Supplier Enablement** est donc un projet de conduite du changement **externe**, piloté comme tel : sponsor, planning, indicateurs.

## Étape 1 : segmenter le panel

On croise la **dépense**, le **nombre de documents** et la **complexité** du fournisseur pour définir des segments :

| Segment | Profil | Compte cible | Mode d'intégration |
|---|---|---|---|
| Stratégique intégré | Fort volume, ERP mature | Enterprise | cXML ou EDI (X12 / EDIFACT) |
| Stratégique portail | Fort volume, pas d'appétence IT | Enterprise | Portail, PDF invoice, CSV upload |
| Récurrent | Volume moyen | Standard ou Enterprise | Portail / e-mail interactif |
| Longue traîne | Quelques documents par an | Standard | **Light enablement** : e-mail interactif |

Le **light enablement** (ou *interactive email*) permet à un fournisseur Standard de traiter une commande depuis l'e-mail reçu (lien « Process order ») et de retourner confirmation ou facture sans jamais ouvrir le portail au préalable : c'est le levier de couverture de la longue traîne.

## Étape 2 : planifier par vagues

Chaque **vague** (wave) regroupe 50 à 200 fournisseurs d'un même segment ou d'une même catégorie, sur 6 à 8 semaines :

1. **Communication** : lettre du sponsor, FAQ, webinaire.
2. **Invitation** : envoi des TRR depuis le compte acheteur (en masse, via fichier).
3. **Relance** : suivi des TRR non acceptées, appels ciblés.
4. **Test** : pour les intégrés, échanges cXML/EDI sur le compte de test.
5. **Go-live** : bascule du canal d'envoi des PO (fin du PDF / fax).

## Étape 3 : outiller avec le réseau

- Les **enablement tasks** du compte acheteur suivent chaque fournisseur : invité, relation acceptée, formé, intégré, actif.
- Le **Supplier Information Portal** (SIP) héberge les guides, règles de transaction expliquées et contacts du client ; le lien est inclus dans la TRR.
- **Supplier Enablement Automation** envoie automatiquement les invitations et les rappels selon le statut, et peut déclencher la TRR dès la première commande.
- Le **Project Notification** et les rapports d'enablement mesurent le taux de relation acceptée et le taux de documents électroniques.

## Étape 4 : gérer les irritants

- **Frais Enterprise** : préparer un argumentaire (visibilité paiement, zéro ressaisie) et une politique claire : accepte-t-on les Standard pour les gros volumes ?
- **ANID multiples** : les groupes ont souvent plusieurs comptes ; la **consolidation d'ANID** (ou le lien entre comptes parent/enfant) évite d'envoyer des PO au mauvais compte.
- **Données de base** : une adresse e-mail de contact erronée dans S/4HANA fait échouer la TRR ; la qualité des données fournisseurs est un prérequis.

> Indicateur phare : le **taux de documents électroniques** (PO envoyés sur le réseau et acceptés / PO totaux). Visez 80 % de la dépense en vague 1 et 2, puis la longue traîne.`,
      keyPoints: [
        "L'enablement est un projet de conduite du changement externe, plus long que le paramétrage.",
        "Segmenter le panel par dépense, volume de documents et complexité pour choisir compte et mode d'intégration.",
        "Light enablement / e-mail interactif couvre la longue traîne sans portail ni abonnement.",
        "Les vagues suivent : communication, invitation (TRR), relance, test, go-live.",
        "Outils du réseau : enablement tasks, Supplier Information Portal, Supplier Enablement Automation, rapports.",
        "Anticiper les frais Enterprise, les ANID multiples et la qualité des données de contact.",
      ],
    },
    {
      id: "m6-s5-j3-a2",
      moduleId: "m6",
      week: 5,
      day: 3,
      kind: "simulation",
      title: "Simulation : construire le plan d'enablement par vagues",
      level: "intermediaire",
      durationMin: 45,
      objective: "Jouer le rôle du consultant enablement qui présente au comité de pilotage un plan par vagues chiffré et argumenté.",
      context: `Vous êtes consultant chez **Métalor Industries** (équipementier automobile, 6 000 salariés, 1 400 fournisseurs actifs). Le go-live Ariba Buying & Invoicing intégré à S/4HANA est prévu dans 5 mois. Le comité de pilotage attend un plan d'enablement.

Données du panel :

| Segment | Nb fournisseurs | % dépense | Documents/an | Remarques |
|---|---|---|---|---|
| Matières premières et composants | 120 | 62 % | 48 000 | 35 déjà intégrés EDI avec d'autres clients |
| Services industriels (maintenance, intérim) | 180 | 18 % | 15 000 | Facturation sur SES, prestations récurrentes |
| Indirect récurrent (fournitures, IT, transport) | 300 | 14 % | 22 000 | 60 présents sur le réseau |
| Longue traîne | 800 | 6 % | 9 000 | 1 à 10 documents par an |

Contraintes : la DSI ne peut gérer que 25 projets d'intégration cXML/EDI en parallèle ; le sponsor exige 70 % de la dépense sur le réseau au go-live ; la comptabilité redoute un afflux de factures rejetées.

Jouez l'atelier : vous présentez, le directeur achats et la DAF objectent, vous arbitrez.`,
      steps: [
        "Définissez 3 ou 4 vagues en précisant pour chacune : segment(s), nombre de fournisseurs, type de compte cible, mode d'intégration et fenêtre calendaire par rapport au go-live.",
        "Calculez la couverture de dépense atteinte au go-live et vérifiez l'objectif de 70 % ; ajustez si nécessaire.",
        "Pour les 120 fournisseurs de matières premières, répartissez-les entre intégration cXML/EDI (dans la limite des 25 projets simultanés) et portail Enterprise, en justifiant le critère.",
        "Préparez la réponse à l'objection de la DAF : « les fournisseurs vont refuser de payer l'abonnement Enterprise ».",
        "Décidez du traitement de la longue traîne (light enablement, Supplier Enablement Automation déclenchée à la première commande) et précisez ce que vous ne faites volontairement pas avant le go-live.",
        "Listez 5 indicateurs de pilotage hebdomadaires et leur cible.",
        "Rédigez le contenu de la communication sponsor (10 lignes) et la liste des documents à mettre sur le Supplier Information Portal.",
        "Identifiez les 3 risques majeurs du plan et une mesure de mitigation pour chacun.",
      ],
      deliverable: "Un plan d'enablement en une page : tableau des vagues, couverture de dépense, répartition intégration/portail, indicateurs, communication, risques.",
      solution: `## Plan de vagues proposé

| Vague | Cible | Nb | Compte | Intégration | Fenêtre |
|---|---|---|---|---|---|
| 0 (pilote) | 10 fournisseurs matières premières dont 5 déjà EDI | 10 | Enterprise | cXML/EDI + portail | M-5 à M-3 |
| 1 | Reste matières premières + composants | 110 | Enterprise | 25 projets cXML/EDI en parallèle (35 déjà EDI en priorité, puis 20 suivants), les autres sur portail Enterprise | M-4 à M-1 |
| 2 | Services industriels + indirect récurrent déjà sur le réseau | 240 | Enterprise ou Standard selon volume | Portail, PDF invoice ; SES obligatoires pour les services | M-3 à go-live |
| 3 | Reste indirect récurrent + longue traîne | 1 040 | Standard | Light enablement, TRR automatique à la première commande | Go-live à M+6 |

**Couverture au go-live** : vagues 0 à 2 représentent 62 % + 18 % + une partie des 14 % (les 60 présents sur le réseau, estimés à 8 %) ≈ **88 % de la dépense**, au-dessus de l'objectif de 70 %. Si la vague 1 glisse, les 62 % des matières premières suffisent presque à l'objectif : c'est la vague critique.

**Répartition intégration / portail** : critère = plus de 500 documents par an **et** ERP capable d'émettre des messages EDI ou cXML. Les 35 fournisseurs déjà intégrés ailleurs sont les plus rapides ; les suivants sont classés par volume. Les autres passent sur le portail Enterprise au go-live et pourront s'intégrer plus tard, sans bloquer le planning.

## Réponse à la DAF sur les frais Enterprise

Les frais ne concernent que les fournisseurs dépassant les seuils de volume, donc essentiellement les vagues 0 à 2. L'argumentaire : statut de facture en temps réel (moins d'appels), rejet immédiat des erreurs (paiement plus rapide), suppression de la ressaisie. Politique proposée : un fournisseur stratégique qui refuse peut rester en compte Standard pendant 12 mois, à condition d'accepter la TRR ; aucun achat ne sera bloqué pour cette raison.

## Longue traîne

Pas d'invitation massive avant le go-live : la **Supplier Enablement Automation** envoie la TRR au premier PO, l'e-mail interactif permet de confirmer et facturer sans portail. On évite ainsi 800 relances pour des fournisseurs qui ne seront peut-être jamais recommandés.

## Indicateurs hebdomadaires

1. Taux de TRR acceptées par vague (cible 90 % à J+30 après invitation).
2. % de dépense couverte par une relation active (cible 70 % au go-live).
3. Nombre de projets d'intégration en test / en production (cible 25 en production au go-live).
4. Taux de factures rejetées par les règles de transaction (cible < 8 % après le premier mois).
5. Nombre de tickets fournisseurs ouverts (tendance décroissante).

## Communication sponsor et SIP

Lettre signée du directeur achats : raison du changement, calendrier, ce qui change pour le fournisseur, gratuité du compte Standard, contact support, lien vers le Supplier Information Portal. Sur le SIP : guide de création de compte, guide e-mail interactif, règles de transaction expliquées en langage métier, format de facture attendu, FAQ frais, calendrier des webinaires.

## Risques et mitigations

- **Glissement des intégrations EDI** : séparer go-live réseau et go-live intégration ; portail en solution de repli.
- **Afflux de rejets de factures** : mode « avertissement » plutôt que blocage sur certaines règles pendant 4 semaines, hotline comptabilité renforcée.
- **Données de contact erronées** : campagne de qualification des e-mails fournisseurs dans S/4HANA à M-4, avant l'envoi des TRR.`,
      tips: [
        "Commencez toujours par une vague pilote de 10 fournisseurs volontaires : elle valide le discours et les guides.",
        "Le planning d'intégration est contraint par la DSI du client ET par celle des fournisseurs : prévoyez 8 à 12 semaines par flux cXML/EDI.",
        "Ne promettez jamais 100 % de fournisseurs : promettez un pourcentage de dépense et de documents.",
      ],
    },
    {
      id: "m6-s5-j3-a3",
      moduleId: "m6",
      week: 5,
      day: 3,
      kind: "quiz",
      title: "Quiz : enablement fournisseurs",
      level: "intermediaire",
      durationMin: 12,
      objective: "Contrôler la maîtrise des leviers et outils d'enablement.",
      questions: [
        {
          id: "m6-s5-j3-q1",
          question: "Quel mécanisme permet à un fournisseur Standard de confirmer une commande et de facturer depuis l'e-mail reçu, sans se connecter d'abord au portail ?",
          options: ["Le PunchOut", "Le light enablement (e-mail interactif)", "L'intégration cXML", "La Trading Relationship Request"],
          answer: 1,
          explanation: "Le light enablement, aussi appelé e-mail interactif, envoie au fournisseur un e-mail contenant la commande et un lien « Process order » qui lui permet de créer confirmation, ASN ou facture directement ; c'est le levier de couverture de la longue traîne avec un compte Standard gratuit. Le PunchOut est un mécanisme de catalogue hébergé chez le fournisseur, sans rapport. L'intégration cXML suppose un compte Enterprise et un ERP connecté. La TRR établit la relation mais ne traite pas les documents.",
          concept: "Light enablement et e-mail interactif",
        },
        {
          id: "m6-s5-j3-q2",
          question: "Quel outil du compte acheteur héberge les guides et explications destinés aux fournisseurs d'un client ?",
          options: ["Supplier Information Portal", "Guided Buying", "Ariba Catalog Audit", "Cloud Integration Gateway"],
          answer: 0,
          explanation: "Le Supplier Information Portal (SIP) est l'espace documentaire du compte acheteur que les fournisseurs consultent depuis la TRR ou leur compte : guides de création de compte, règles de transaction expliquées, contacts. Guided Buying est l'interface d'achat des utilisateurs internes, pas des fournisseurs. Ariba Catalog Audit sert à contrôler le contenu des catalogues. Cloud Integration Gateway est le middleware d'intégration entre Ariba, le réseau et S/4HANA.",
          concept: "Supplier Information Portal",
        },
        {
          id: "m6-s5-j3-q3",
          question: "Quel critère est le plus pertinent pour décider qu'un fournisseur doit être intégré en cXML ou EDI plutôt que via le portail ?",
          options: ["Son chiffre d'affaires global", "Sa localisation géographique", "Son volume de documents et la capacité de son ERP à émettre des messages", "Son ancienneté dans le référentiel"],
          answer: 2,
          explanation: "L'intégration n'a de sens que si le volume de documents justifie l'investissement (généralement plusieurs centaines par an) et si le fournisseur dispose d'un ERP capable d'émettre et recevoir des messages cXML ou EDI. Le chiffre d'affaires global du fournisseur ne dit rien de ses échanges avec ce client. La localisation influence les règles pays, non le mode d'intégration. L'ancienneté dans le référentiel est sans rapport avec la capacité technique.",
          concept: "Segmentation du panel fournisseurs",
        },
        {
          id: "m6-s5-j3-q4",
          question: "Que permet la Supplier Enablement Automation ?",
          options: ["Créer automatiquement les fournisseurs dans S/4HANA", "Envoyer automatiquement invitations et rappels selon le statut d'enablement, y compris à la première commande", "Convertir un compte Standard en Enterprise sans accord du fournisseur", "Générer les catalogues des fournisseurs"],
          answer: 1,
          explanation: "La Supplier Enablement Automation déclenche automatiquement les Trading Relationship Requests et les rappels en fonction du statut du fournisseur, et peut envoyer l'invitation dès le premier bon de commande : c'est l'outil privilégié pour la longue traîne. Elle ne crée pas de fournisseurs dans S/4HANA, qui reste le référentiel maître. Le passage en compte Enterprise est toujours une décision du fournisseur. La génération de catalogues est un sujet distinct, traité par le fournisseur ou l'acheteur.",
          concept: "Supplier Enablement Automation",
        },
        {
          id: "m6-s5-j3-q5",
          question: "Pourquoi la consolidation des ANID est-elle un point d'attention lors de l'enablement d'un grand groupe fournisseur ?",
          options: ["Parce que chaque ANID coûte un abonnement à l'acheteur", "Parce que des comptes multiples peuvent conduire à envoyer des commandes au mauvais compte", "Parce que le réseau limite à un ANID par pays", "Parce qu'un ANID ne peut recevoir qu'un seul type de document"],
          answer: 1,
          explanation: "Les groupes internationaux ont souvent créé plusieurs comptes au fil des clients ; sans consolidation ou liaison parent/enfant, l'acheteur risque d'adresser la TRR et les commandes à un compte non suivi par la bonne entité. L'acheteur ne paie pas d'abonnement par ANID fournisseur : ce sont les fournisseurs qui supportent les frais Enterprise. Il n'existe pas de limite d'un ANID par pays. Enfin, un compte reçoit tous les types de documents, la restriction par type n'existe pas.",
          concept: "ANID multiples et consolidation",
        },
      ],
    },
  ],

  useCases: [
    {
      id: "m6-uc1",
      moduleId: "m6",
      title: "Relancer un enablement en panne : 18 % de relations acceptées après six mois",
      client: "Groupe agroalimentaire, 9 000 salariés, 2 200 fournisseurs",
      situation: "Six mois après le go-live d'Ariba Buying & Invoicing, seulement 18 % des fournisseurs invités ont accepté la Trading Relationship Request. Les commandes partent encore majoritairement en PDF par e-mail depuis S/4HANA et la comptabilité ressaisit les factures.",
      challenge: "Comprendre pourquoi les fournisseurs n'acceptent pas la relation et remettre le programme sur les rails sans budget supplémentaire.",
      approach: [
        "Analyse des enablement tasks : 40 % des TRR ont été envoyées à des adresses e-mail génériques ou obsolètes issues de S/4HANA.",
        "Entretiens avec 15 fournisseurs : crainte des frais Enterprise, incompréhension du message d'invitation rédigé en anglais.",
        "Campagne de qualification des contacts fournisseurs par les acheteurs catégorie, puis réémission des TRR avec une lettre du sponsor en français.",
        "Publication d'un Supplier Information Portal clair sur la gratuité du compte Standard et activation du light enablement pour la longue traîne.",
        "Mise en place de la Supplier Enablement Automation et d'un suivi hebdomadaire par acheteur catégorie.",
      ],
      outcome: "Taux de relation acceptée porté à 71 % en quatre mois, 64 % des factures reçues électroniquement, suppression de deux ETP de saisie.",
      lesson: "L'enablement échoue rarement pour des raisons techniques : qualité des contacts, langue, message sur les frais et portage par les acheteurs font la différence.",
    },
    {
      id: "m6-uc2",
      moduleId: "m6",
      title: "Vague de rejets de factures après activation des règles de transaction",
      client: "Entreprise de services numériques, 3 500 salariés",
      situation: "Au lendemain du go-live, 35 % des factures envoyées par les fournisseurs sont rejetées sur le réseau. Les fournisseurs appellent la comptabilité, qui ne voit rien dans Ariba Buying & Invoicing et ne comprend pas les rejets.",
      challenge: "Réduire rapidement le taux de rejet sans supprimer les contrôles voulus par la direction financière.",
      approach: [
        "Extraction du rapport des factures rejetées par motif : 60 % concernent l'absence de TVA au niveau ligne et 25 % des factures de services sans référence de Service Entry Sheet.",
        "Atelier avec la DAF : passage temporaire de la règle TVA ligne en avertissement, maintien du blocage sur les factures hors commande.",
        "Création d'un Supplier Group « Prestataires de services » avec règles dédiées et guide de facturation sur SES publié sur le Supplier Information Portal.",
        "Formation de la comptabilité à la consultation des documents rejetés depuis le compte acheteur du réseau.",
        "Rétablissement de la règle TVA bloquante après six semaines, une fois les fournisseurs formés.",
      ],
      outcome: "Taux de rejet ramené à 6 % en deux mois ; la comptabilité peut désormais expliquer un rejet à un fournisseur en moins de cinq minutes.",
      lesson: "Les règles de transaction doivent être activées progressivement et expliquées aux fournisseurs ; la comptabilité doit savoir lire le compte acheteur du réseau, pas seulement Ariba Buying.",
    },
    {
      id: "m6-uc3",
      moduleId: "m6",
      title: "Un fournisseur stratégique refuse l'abonnement Enterprise",
      client: "Compagnie aérienne régionale, 1 800 salariés",
      situation: "Le principal fournisseur de pièces de rechange (28 % de la dépense, 3 000 documents par an) refuse de payer l'abonnement Enterprise et menace de ne pas accepter la Trading Relationship Request. Le go-live est dans six semaines.",
      challenge: "Sécuriser les flux avec ce fournisseur critique sans compromettre le modèle réseau ni créer un précédent coûteux.",
      approach: [
        "Qualification du volume réel avec le fournisseur et simulation des frais via le programme de tarification du réseau.",
        "Présentation chiffrée des gains pour le fournisseur : délai de paiement réduit de 12 jours grâce au statut facture, fin des litiges de ressaisie.",
        "Proposition d'une phase transitoire : acceptation de la TRR en compte Standard avec e-mail interactif pendant six mois, pour maintenir le flux de commandes électroniques.",
        "Engagement de l'acheteur à revoir les conditions de paiement en échange d'un passage ultérieur en Enterprise avec intégration cXML.",
        "Documentation de la décision dans la politique d'enablement pour éviter les demandes d'exception en cascade.",
      ],
      outcome: "TRR acceptée avant le go-live, passage en Enterprise avec flux cXML neuf mois plus tard après constat des gains de trésorerie.",
      lesson: "Le compte Standard est une porte d'entrée légitime, même pour un fournisseur stratégique : le modèle réseau survit tant que la relation commerciale existe.",
    },
  ],

  glossary: [
    { term: "SAP Business Network", definition: "Nouveau nom d'Ariba Network : plateforme cloud B2B many-to-many d'échange de documents entre acheteurs et fournisseurs.", moduleId: "m6" },
    { term: "ANID (Ariba Network ID)", definition: "Identifiant unique d'un compte sur le réseau, préfixe AN01 en production et AN02 pour les comptes de test.", moduleId: "m6" },
    { term: "Trading Relationship Request (TRR)", definition: "Invitation envoyée par l'acheteur au fournisseur pour établir la relation commerciale sur le réseau ; son acceptation permet l'échange électronique de documents.", moduleId: "m6" },
    { term: "Standard account", definition: "Compte fournisseur gratuit, fonctionnant essentiellement par e-mail interactif et portail, sans intégration cXML/EDI ni publication de catalogues.", moduleId: "m6" },
    { term: "Enterprise account", definition: "Compte fournisseur payant selon le volume de documents, offrant intégration cXML/EDI, catalogues, reporting et support dédié.", moduleId: "m6" },
    { term: "Default Transaction Rules", definition: "Règles définies par l'acheteur dans son compte réseau qui contrôlent les documents acceptés des fournisseurs ; surchargées par les règles pays et les règles de groupe.", moduleId: "m6" },
    { term: "Supplier Group Rules", definition: "Surcharges des règles de transaction appliquées à un groupe de fournisseurs défini par l'acheteur (ex. prestataires de services).", moduleId: "m6" },
    { term: "Advance Ship Notice (ASN)", definition: "Avis d'expédition envoyé par le fournisseur (cXML ShipNoticeRequest) annonçant quantités, dates et colisage avant la livraison.", moduleId: "m6" },
    { term: "Service Entry Sheet (SES)", definition: "Feuille de saisie de prestation qui atteste la réalisation d'un service et sert de base à la facturation des commandes de services.", moduleId: "m6" },
    { term: "PO routing method", definition: "Canal choisi par le fournisseur pour recevoir ses commandes : online, e-mail, cXML, EDI ou fax.", moduleId: "m6" },
    { term: "Light enablement / e-mail interactif", definition: "Mode permettant à un fournisseur Standard de traiter une commande (confirmation, ASN, facture) depuis le lien contenu dans l'e-mail reçu.", moduleId: "m6" },
    { term: "Supplier Information Portal (SIP)", definition: "Espace documentaire publié par l'acheteur sur le réseau pour expliquer aux fournisseurs ses processus, règles et contacts.", moduleId: "m6" },
    { term: "Supplier Enablement Automation", definition: "Fonction du compte acheteur qui envoie automatiquement invitations (TRR) et rappels selon le statut d'enablement, y compris dès la première commande.", moduleId: "m6" },
  ],

  faq: [
    { q: "Ariba Network et SAP Business Network, est-ce la même chose ?", a: "Oui. SAP a renommé Ariba Network en SAP Business Network en élargissant son périmètre (logistique, actifs, gestion des services). À l'examen et sur les projets, les deux termes désignent la plateforme d'échange acheteurs-fournisseurs ; les écrans et la documentation récents utilisent le nouveau nom.", moduleId: "m6" },
    { q: "L'acheteur paie-t-il pour ses fournisseurs sur le réseau ?", a: "Non. L'acheteur paie sa souscription Ariba ; les fournisseurs supportent eux-mêmes les éventuels frais d'un compte Enterprise, calculés sur le volume et la valeur des documents échangés. Le compte Standard est gratuit, quel que soit le volume.", moduleId: "m6" },
    { q: "Peut-on forcer un fournisseur à recevoir ses commandes en cXML ?", a: "Techniquement non : la méthode de routage est un paramètre du compte fournisseur. En pratique, l'acheteur l'exige dans ses prérequis d'enablement ou contractuellement pour les fournisseurs stratégiques, et accompagne la mise en place via le compte de test.", moduleId: "m6" },
    { q: "Une facture rejetée par les règles de transaction apparaît-elle dans Ariba Buying & Invoicing ?", a: "Non. Le rejet a lieu sur le réseau, avant transmission au système acheteur. La facture repasse en statut Rejected chez le fournisseur avec un motif, et l'administrateur acheteur peut la consulter dans les rapports de documents du compte réseau, mais aucune exception n'est créée dans Ariba Buying.", moduleId: "m6" },
    { q: "Combien de fournisseurs peut-on enabler par vague ?", a: "L'ordre de grandeur courant est 50 à 200 fournisseurs par vague de six à huit semaines pour les portails, mais rarement plus de 20 à 30 projets d'intégration cXML/EDI en parallèle, car chacun mobilise la DSI du client et celle du fournisseur pendant plusieurs semaines.", moduleId: "m6" },
    { q: "Que faire si un fournisseur a déjà un ANID utilisé avec un autre client ?", a: "C'est le cas idéal : on envoie la Trading Relationship Request vers cet ANID et le fournisseur l'accepte sans créer de compte. Il faut cependant vérifier avec lui qu'il s'agit du bon compte, car les groupes possèdent souvent plusieurs ANID par entité ou par pays.", moduleId: "m6" },
  ],
};
