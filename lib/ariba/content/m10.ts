import type { ModuleContent } from "../types";

const BASE = "/academy/sap-ariba";

export const m10: ModuleContent = {
  moduleId: "m10",
  activities: [
    // ───────────── Semaine 8 · Jour 1 ─────────────
    {
      id: "m10-s8-j1-a1", moduleId: "m10", week: 8, day: 1, kind: "lecon", level: "intermediaire", durationMin: 30,
      title: "Mémo de révision : P2P, Sourcing, Contrats et SLP",
      objective: "Reconstituer en une page la logique des modules fonctionnels et repérer les notions que l'examen teste le plus.",
      content: `## Comment utiliser ce mémo

Lisez chaque bloc, puis **fermez la page et reformulez-le à voix haute**. Si vous butez sur un point, notez-le dans vos notions à revoir : c'est le signal le plus fiable d'une lacune.

## Procure-to-Pay (Ariba Buying & Invoicing)

- Chaîne d'objets : **Requisition → Purchase Order → Receipt → Invoice → Invoice Reconciliation (IR) → Payment**.
- La demande est un **approvable** : elle traverse un flux d'approbation construit par des **règles** (conditions + approbateurs) dont le résultat visible est la **chaîne d'approbation**.
- **Guided Buying** est le front demandeur : tuiles, politiques, formulaires, redirection vers catalogues ou PunchOut.
- L'**imputation** (centre de coûts, compte, commande interne) est dérivée du **commodity code** et du profil utilisateur ; le demandeur ne saisit pas le compte.
- Rapprochement : **2-way** (PO + facture) pour les prestations, **3-way** (PO + réception + facture) pour les biens. Une **exception** est soit acceptée automatiquement (tolérance) soit **routée** à un rôle.
- Scénario **intégré** : le PO et la facture sont comptabilisés dans S/4HANA ; scénario **standalone** : Ariba porte le cycle complet et transmet des écritures.

## Sourcing

- **Sourcing Project** (full ou quick) = conteneur : équipe, phases, tâches, documents, **événements**.
- Types d'événements : **RFI** (information), **RFP** (proposition, notation), **RFQ/enchère** (prix). Enchères : anglaise inversée, hollandaise, japonaise.
- Cycle d'un événement : *Draft → Published → Preview → Open → Pending Selection → Completed*.
- Le contenu se structure en **sections, questions, prérequis, lots et lignes** ; la notation repose sur des **poids** et des **grades** ; l'attribution se fait par **scénarios d'attribution** (optimisation, split).
- Le **formulaire d'économies** alimente le reporting ; le **bid comparison report** sert au dépouillement.

## Contrats (CLM)

- **Contract Workspace** (procurement, sales, internal) créé depuis un modèle ; hiérarchie accord-cadre / sous-accords.
- Document principal rédigé avec la **bibliothèque de clauses** ; tâches d'approbation, de négociation et de **signature électronique**.
- Amendements : administratif, renouvellement, résiliation, amendement complet. Dates d'expiration et **notifications**.
- **Contract Compliance** côté Buying : contrats au niveau fournisseur, catégorie ou article ; **release orders** vs **no-release orders** ; accumulateurs de montant.

## Supplier Lifecycle & Performance (SLP)

- Enchaînement : **Supplier Request → Registration → Qualification (par commodity/région/département) → Preferred → Performance / Risk**.
- Questionnaires **modulaires** (certificats avec expiration), **disqualification**, profil **Supplier 360**.
- Synchronisation avec le **Business Partner** S/4HANA (MDG-S) : l'identifiant ERP et l'ANID sont les deux clés à ne jamais confondre.

> Réflexe d'examen : quand une question parle de « qui reçoit la tâche », pensez **règle d'approbation** ; quand elle parle de « ce que voit le fournisseur », pensez **Business Network**.`,
      keyPoints: [
        "P2P : la demande est un approvable, l'imputation est dérivée du commodity code, l'IR gère les exceptions.",
        "Sourcing : projet → événement → contenu → notation → scénario d'attribution → économies.",
        "Contrats : workspace, clauses, signature, amendements, puis conformité contractuelle dans Buying.",
        "SLP : demande → enregistrement → qualification → préféré ; questionnaires modulaires et synchronisation BP.",
        "Distinguer scénario intégré et standalone est la question la plus fréquente sur l'architecture P2P.",
      ],
    },
    {
      id: "m10-s8-j1-a2", moduleId: "m10", week: 8, day: 1, kind: "exercice", level: "intermediaire", durationMin: 40,
      title: "Construire dix fiches de révision actives",
      objective: "Transformer les modules fonctionnels en fiches question/réponse réutilisables jusqu'à l'examen.",
      context: `Les fiches de révision actives (une question au recto, la réponse au verso) sont le moyen le plus efficace de mémoriser un périmètre aussi large que SAP Ariba. Vous allez en produire dix, en respectant une règle : **une fiche = une notion = une réponse en moins de 40 mots**.

Les notions à couvrir obligatoirement : cycle d'approbation, 2-way vs 3-way, exceptions IR, Guided Buying vs Buying, états d'un événement de sourcing, types d'enchères, scénarios d'attribution, Contract Compliance (release / no-release), qualification SLP, Business Partner vs ANID.`,
      steps: [
        "Reprenez vos notes et les points clés des leçons des modules 2 à 5.",
        "Pour chaque notion, rédigez une question précise telle que l'examen pourrait la poser (« Quel objet… », « Dans quel cas… », « Quelle différence… »).",
        "Rédigez la réponse en moins de 40 mots, avec le vocabulaire exact d'Ariba (termes anglais entre parenthèses si besoin).",
        "Ajoutez une ligne « piège » : la confusion la plus fréquente avec une notion voisine.",
        "Testez-vous : cachez la réponse, répondez à voix haute, cochez les fiches réussies.",
        "Ajoutez les fiches ratées à votre liste de notions à revoir (bouton « Ajouter une notion » dans la page Révision).",
      ],
      deliverable: "Dix fiches (question, réponse courte, piège) rédigées dans vos notes ou sur papier.",
      solution: `## Exemples de fiches attendues

**Q : Quelle différence entre un rapprochement 2-way et 3-way ?**
R : 2-way compare facture et PO (prestations) ; 3-way ajoute la réception (biens). Piège : la réception n'existe pas toujours pour les services, d'où la feuille de prestation.

**Q : Qu'est-ce qu'une exception d'Invoice Reconciliation routée ?**
R : Un écart hors tolérance qui crée une tâche d'approbation pour un rôle (réceptionnaire, comptable). Piège : une exception dans la tolérance est acceptée automatiquement et ne bloque pas.

**Q : Quels sont les états d'un événement de sourcing ?**
R : Draft, Published, Preview, Open, Pending Selection, Completed. Piège : *Preview* permet aux fournisseurs de lire sans répondre.

**Q : Release order vs no-release order ?**
R : Le release order est un PO émis contre un contrat ; le no-release order autorise des factures directement sur le contrat sans PO. Piège : les accumulateurs limitent les deux.

**Q : Business Partner vs ANID ?**
R : Le BP est l'identifiant fournisseur S/4HANA (données maîtres) ; l'ANID est l'identifiant du compte sur le Business Network (routage des documents). Piège : un même BP peut avoir plusieurs locations, une seule connectée à un ANID.

**Q : Guided Buying vs Buying ?**
R : Guided Buying est l'interface demandeur guidée par des politiques ; Buying est le moteur d'approbation, de commande et de facturation derrière. Piège : les règles d'approbation se paramètrent dans Buying, pas dans Guided Buying.

Les quatre autres fiches (cycle d'approbation, types d'enchères, scénarios d'attribution, qualification SLP) suivent le même format.`,
      tips: ["Une fiche trop longue est une fiche inutile : coupez.", "Utilisez les termes anglais officiels : l'examen est souvent passé en anglais.", "Relisez vos fiches le soir et le lendemain matin : l'espacement fait la mémorisation."],
    },
    {
      id: "m10-s8-j1-a3", moduleId: "m10", week: 8, day: 1, kind: "quiz", level: "intermediaire", durationMin: 20,
      title: "Quiz de révision : P2P, Sourcing, Contrats et SLP",
      objective: "Vérifier la maîtrise transversale des modules fonctionnels avant le cas final.",
      questions: [
        { id: "m10-s8-j1-q1", concept: "Scénario intégré vs standalone", question: "Dans un déploiement Ariba Buying & Invoicing intégré à S/4HANA, où la facture fournisseur est-elle comptabilisée ?", options: ["Dans Ariba Buying, qui envoie ensuite un fichier de paiement", "Dans S/4HANA (MM-IV), après transmission via le Business Network et la passerelle d'intégration", "Dans le Business Network, qui déclenche le paiement", "Dans Guided Buying, au moment de la réception"], answer: 1,
          explanation: "Dans le scénario intégré, S/4HANA reste le système comptable : la facture arrive du fournisseur via le Business Network, traverse la passerelle (CIG / managed gateway) et est comptabilisée en MM-IV. Ariba Buying comptabilise lui-même la facture uniquement dans le scénario standalone (option A). Le Business Network transporte et valide les documents mais ne tient pas de comptabilité (C). Guided Buying est une interface demandeur, sans aucune fonction comptable (D)." },
        { id: "m10-s8-j1-q2", concept: "Rapprochement de facture (IR) et exceptions", question: "Une facture présente un écart de prix de 1,5 % alors que la tolérance paramétrée est de 2 %. Que se passe-t-il dans l'Invoice Reconciliation ?", options: ["La facture est rejetée automatiquement vers le fournisseur", "Une exception est créée et routée au comptable pour décision", "L'exception est acceptée automatiquement et la facture poursuit son approbation", "Le PO est modifié automatiquement pour correspondre à la facture"], answer: 2,
          explanation: "Une variance située dans la tolérance est acceptée automatiquement : l'IR enregistre l'exception comme résolue et la facture continue. Le rejet automatique (A) ne concerne que des règles de validation dures (par ex. PO absent et interdit). Le routage à un rôle (B) se produit uniquement hors tolérance. Ariba ne modifie jamais un PO pour l'aligner sur une facture (D) : c'est un change order volontaire." },
        { id: "m10-s8-j1-q3", concept: "Flux d'approbation : règles et chaîne", question: "Quelle bonne pratique de conception des règles d'approbation est correcte ?", options: ["Nommer explicitement chaque approbateur dans la règle pour plus de sécurité", "S'appuyer sur la chaîne de superviseurs, des groupes et des tables de correspondance plutôt que sur des personnes", "Créer une règle par centre de coûts pour couvrir tous les cas", "Désactiver la délégation pour éviter les contournements"], answer: 1,
          explanation: "Les règles doivent référencer des rôles, des groupes, la hiérarchie (UserSupervisor) ou des lookup tables : elles survivent aux mouvements de personnel et restent maintenables. Nommer des personnes (A) casse le flux au premier départ. Une règle par centre de coûts (C) est ingérable à 600 centres : on utilise une table de correspondance. La délégation (D) est au contraire une fonctionnalité standard indispensable pour les absences." },
        { id: "m10-s8-j1-q4", concept: "Guided Buying : politiques et formulaires", question: "Un acheteur veut empêcher les demandeurs d'acheter du matériel informatique en dehors du catalogue PunchOut du fournisseur référencé. Quel mécanisme utilise-t-il ?", options: ["Une règle d'approbation supplémentaire dans Buying", "Une politique Guided Buying qui bloque ou redirige selon la catégorie", "Une règle de transaction du Business Network", "Un champ personnalisé obligatoire sur la demande"], answer: 1,
          explanation: "Les politiques Guided Buying s'appliquent au moment de la demande : elles affichent un message, bloquent ou redirigent vers la bonne tuile selon la catégorie ou le fournisseur. Une règle d'approbation (A) agit après la soumission et n'empêche pas la saisie. Les règles de transaction du Network (C) régissent les documents fournisseurs, pas le comportement des demandeurs. Un champ personnalisé (D) collecte une information mais n'oriente pas l'achat." },
        { id: "m10-s8-j1-q5", concept: "États d'un événement de sourcing", question: "Dans quel état un fournisseur invité peut-il consulter le contenu d'un événement sans encore soumettre de réponse ?", options: ["Draft", "Preview", "Pending Selection", "Completed"], answer: 1,
          explanation: "L'état Preview (prévisualisation) s'ouvre entre la publication et l'ouverture des offres : les participants lisent le contenu, posent des questions, mais ne peuvent pas répondre. En Draft (A), l'événement n'est pas visible des fournisseurs. Pending Selection (C) intervient après la clôture, pendant le dépouillement. Completed (D) marque l'attribution terminée." },
        { id: "m10-s8-j1-q6", concept: "Types d'enchères", question: "Quel type d'enchère voit le prix proposé par l'acheteur baisser par paliers jusqu'à ce qu'un fournisseur l'accepte ?", options: ["Enchère anglaise inversée", "Enchère hollandaise", "Enchère japonaise", "RFP noté"], answer: 1,
          explanation: "Dans l'enchère hollandaise (Dutch), l'acheteur part d'un prix bas qu'il augmente, ou d'un prix élevé qu'il baisse, par paliers programmés ; le premier fournisseur qui accepte remporte le lot. L'enchère anglaise inversée (A) voit les fournisseurs surenchérir à la baisse librement. L'enchère japonaise (C) impose à chaque participant d'accepter chaque palier pour rester en course. Un RFP noté (D) n'est pas une enchère." },
        { id: "m10-s8-j1-q7", concept: "Scénarios d'attribution et économies", question: "À quoi sert un scénario d'attribution (award scenario) dans Ariba Sourcing ?", options: ["À publier automatiquement le contrat chez le gagnant", "À comparer plusieurs répartitions possibles des lots entre fournisseurs avant de décider", "À notifier les fournisseurs non retenus", "À calculer la TVA des offres"], answer: 1,
          explanation: "Le scénario d'attribution permet de simuler des répartitions (meilleur prix par ligne, attribution unique, split 70/30, contraintes d'optimisation) et d'en comparer le coût total avant la décision. La création du contrat (A) est une étape distincte, éventuellement déclenchée ensuite. Les notifications aux perdants (C) se gèrent dans la communication de l'événement. Le calcul fiscal (D) n'est pas l'objet du scénario." },
        { id: "m10-s8-j1-q8", concept: "Contract Compliance : release et no-release orders", question: "Un contrat de nettoyage facturé mensuellement au forfait sans bon de commande doit être géré dans Ariba Buying. Quel type de contrat de conformité convient ?", options: ["Contrat au niveau article avec release orders", "Contrat au niveau fournisseur de type no-release order", "Catalogue CIF avec prix mensuel", "Enchère japonaise récurrente"], answer: 1,
          explanation: "Un no-release order autorise le fournisseur à facturer directement contre le contrat, dans la limite des accumulateurs, sans PO : c'est le cas du forfait récurrent. Un contrat à release orders (A) génère un PO à chaque demande, inutile ici. Un catalogue CIF (C) sert à commander des articles, pas des forfaits. L'enchère (D) est un outil de sourcing, pas de conformité." },
        { id: "m10-s8-j1-q9", concept: "SLP : enregistrement, qualification et préférence", question: "Dans SLP, à quel niveau la qualification d'un fournisseur est-elle gérée ?", options: ["Uniquement au niveau global du fournisseur", "Par combinaison de catégorie (commodity), région et département", "Par utilisateur acheteur", "Par bon de commande"], answer: 1,
          explanation: "La qualification SLP est contextuelle : un fournisseur peut être qualifié pour une catégorie dans une région et un département donnés, et pas ailleurs. C'est ce qui permet le statut « préféré » ciblé. Une qualification globale unique (A) correspond plutôt à l'enregistrement. Elle n'est liée ni à un acheteur (C) ni à un PO (D)." },
        { id: "m10-s8-j1-q10", concept: "Business Partner S/4HANA vs ANID", question: "Quelle affirmation décrit correctement la relation entre le fournisseur S/4HANA et le compte Business Network ?", options: ["Le Business Partner et l'ANID sont le même identifiant", "Le Business Partner identifie le fournisseur dans S/4HANA ; l'ANID identifie son compte Network et est rattaché à une Supplier Location dans Ariba", "L'ANID est généré par S/4HANA lors de la création du fournisseur", "Un fournisseur ne peut avoir qu'une seule Supplier Location"], answer: 1,
          explanation: "Le Business Partner (BP) est la donnée de base ERP, répliquée vers Ariba comme Supplier avec ses Supplier Locations ; l'ANID est attribué par le Business Network au compte du fournisseur et sert au routage des documents. Ils ne sont pas identiques (A) et l'ANID n'est jamais généré par S/4HANA (C). Un fournisseur peut avoir plusieurs locations (adresses de commande), dont une ou plusieurs connectées (D est faux)." },
      ],
    },

    // ───────────── Semaine 8 · Jour 2 ─────────────
    {
      id: "m10-s8-j2-a1", moduleId: "m10", week: 8, day: 2, kind: "lecon", level: "avance", durationMin: 30,
      title: "Mémo de révision : Business Network, Catalogues, Intégration et Administration",
      objective: "Consolider la partie technique du périmètre : flux documentaires, catalogues, intégration CIG/cXML et administration.",
      content: `## SAP Business Network (Ariba Network)

- Deux comptes : **acheteur** (buyer account, ANID du client) et **fournisseur** (Standard gratuit ou Enterprise). La **Trading Relationship Request** établit la relation.
- Documents : PO → Order Confirmation → Ship Notice (ASN) → Goods Receipt (copie) → Invoice → Invoice Status → Remittance.
- Les **règles de transaction** (par défaut, par pays, par groupe de fournisseurs) encadrent ce que le fournisseur peut soumettre : référence PO obligatoire, tolérances, confirmation requise, doublons.
- Canaux fournisseurs : portail (PO flip), e-mail interactif, **cXML**, **EDI**, PDF.

## Catalogues

- **CIF** : fichier texte (en-tête CIF_I_V3.0, FIELDNAMES, DATA/ENDOFDATA), chargé par le fournisseur sur le Network, validé puis **approuvé par le Catalog Manager**.
- **PunchOut** : Level 1 (lien vers le site), Level 2 (articles indexés dans la recherche). Messages : PunchOutSetupRequest → PunchOutSetupResponse → PunchOutOrderMessage.
- **UNSPSC** pour la classification et la dérivation comptable ; **vues de catalogue** pour restreindre la visibilité.

## Intégration

- Passerelle : **SAP Integration Suite, managed gateway** (ex-CIG) avec add-on côté S/4HANA, projets self-service, mappings standard, cross-references et extensions.
- Données de base S/4 → Ariba (planifiées) ; transactions : PO (OrderRequest), confirmation, ASN, réception, **InvoiceDetailRequest**, StatusUpdateRequest, PaymentRemittanceRequest.
- Enveloppe **cXML** : \`payloadID\` (unicité), \`timestamp\`, Header *From / To / Sender* avec \`Credential domain="NetworkID"\` et **SharedSecret**, \`Request deploymentMode="test|production"\`.
- Trois familles d'erreurs : **connectivité**, **mapping**, **validation métier** ; trois consoles : Network (statut document), Transaction tracker de la passerelle, **AIF** côté S/4HANA.
- **ITK** et imports CSV pour les charges batch ; web services pour l'événementiel.

## Administration

- **Users** (User.csv, UserSupervisor.csv), **groupes système** (Customer Administrator, Purchasing Agent, Invoice Manager, Catalog Manager, Integration Admin…) et **GroupSharedUserMap**.
- SSO **SAML 2.0** ; **délégation** d'approbation ; **champs personnalisés** (Customization Manager) ; **paramètres de site** (ICM) ; **imports/exports de données** planifiés.
- **Realms** test et production ; releases **trimestrielles** ; **Service Requests** vers le support SAP avec niveau de sévérité.

> Réflexe d'examen : face à une erreur d'intégration, demandez-vous d'abord **où le message s'est arrêté** (Network ? passerelle ? S/4 ?) avant de chercher **pourquoi**.`,
      keyPoints: [
        "Le Network porte la relation commerciale et les règles de transaction ; il ne comptabilise rien.",
        "CIF = fichier validé puis approuvé ; PunchOut L2 = articles indexés ; UNSPSC partout.",
        "cXML : payloadID, From/To/Sender, SharedSecret, deploymentMode — savoir lire un OrderRequest et un InvoiceDetailRequest.",
        "Erreur d'intégration : localiser (Network, passerelle, AIF) avant de qualifier (connectivité, mapping, métier).",
        "Administration : groupes plutôt que droits individuels, imports planifiés, realm de test avant production.",
      ],
    },
    {
      id: "m10-s8-j2-a2", moduleId: "m10", week: 8, day: 2, kind: "exercice", level: "avance", durationMin: 40,
      title: "Cartographie des flux de mémoire",
      objective: "Redessiner sans support l'architecture complète S/4HANA ↔ Ariba ↔ Business Network et nommer chaque message.",
      context: `Un bon consultant technico-fonctionnel sait **dessiner l'architecture au tableau en cinq minutes**. Vous allez le faire de mémoire, puis comparer avec le corrigé. Prenez une feuille ou un outil de dessin, sans relire les leçons.`,
      steps: [
        "Dessinez les cinq blocs : S/4HANA, managed gateway (CIG), Ariba Buying & Invoicing + Guided Buying, SAP Business Network, fournisseur.",
        "Tracez les flux de données de base (sens, objets, fréquence).",
        "Tracez le cycle PO : où la demande est créée, où le PO est généré, comment il atteint le fournisseur ; nommez le message cXML.",
        "Tracez le cycle facture : du fournisseur à la comptabilisation, avec le statut de retour ; nommez les messages.",
        "Placez les trois consoles de monitoring et le type d'erreur que chacune révèle.",
        "Ajoutez les deux identifiants clés (BP / ANID) et l'endroit où le SharedSecret est configuré.",
        "Comparez avec le corrigé et notez chaque oubli comme notion à revoir.",
      ],
      deliverable: "Un schéma d'architecture annoté, lisible par un chef de projet non spécialiste.",
      solution: `## Schéma attendu (description)

\`\`\`
[Annuaire / IdP SAML] ──SSO──▶ [Ariba Buying & Invoicing + Guided Buying]
                                     ▲  données de base (CC, GL, Supplier, Plant, UOM…) – quotidien
                                     │
[S/4HANA] ◀──────────────▶ [Managed gateway (CIG)] ◀──────────────▶ [SAP Business Network] ◀──▶ [Fournisseur]
  PO MM, MIGO, MM-IV            mapping, cross-ref,            règles de transaction,          portail / cXML / EDI
  AIF (monitoring)              Transaction tracker            statut des documents
\`\`\`

## Cycle PO

1. Demande créée dans Guided Buying, approuvée dans Buying.
2. PO créé (numéro S/4HANA renvoyé à Ariba) → **OrderRequest** vers le Network → fournisseur.
3. Fournisseur : **ConfirmationRequest**, puis **ShipNoticeRequest**.
4. Réception S/4HANA (MIGO) → **ReceiptRequest** copié au Network.

## Cycle facture

1. Fournisseur : PO flip ou **InvoiceDetailRequest** cXML → Network (contrôle des règles de transaction).
2. Network → passerelle (mapping) → S/4HANA MM-IV (comptabilisation ou blocage).
3. S/4 → **StatusUpdateRequest** (approuvée, rejetée, payée) → Network ; **PaymentRemittanceRequest** à l'exécution du paiement.

## Monitoring

| Console | Révèle |
|---|---|
| Network – statut du document | document rejeté par les règles, en attente, livré |
| Passerelle – Transaction tracker | erreurs de connectivité et de mapping, retraitement |
| S/4HANA – AIF / MIR4 | erreurs de validation métier (centre de coûts, tolérance, doublon) |

## Identifiants et sécurité

- **BP** S/4HANA → Supplier/Supplier Location Ariba ; **ANID** → compte Network, rattaché à la location connectée.
- Le **SharedSecret** est défini dans la configuration du compte acheteur / de la passerelle et reproduit par le fournisseur pour cXML ; il voyage dans le bloc Sender.`,
      tips: ["Si vous hésitez sur un sens de flèche, demandez-vous qui possède l'objet.", "Le monitoring est une question d'examen fréquente : trois consoles, trois familles d'erreurs.", "Refaites l'exercice la veille de l'examen : il doit vous prendre moins de cinq minutes."],
    },
    {
      id: "m10-s8-j2-a3", moduleId: "m10", week: 8, day: 2, kind: "quiz", level: "avance", durationMin: 20,
      title: "Quiz de révision : Network, Catalogues, Intégration et Administration",
      objective: "Vérifier la maîtrise transversale des modules techniques avant le cas final.",
      questions: [
        { id: "m10-s8-j2-q1", concept: "Règles de transaction du Business Network", question: "Un trésorier veut que toute facture fournisseur sans référence de bon de commande soit refusée dès la soumission, sauf pour les loyers. Où se paramètre cette exigence ?", options: ["Dans les règles d'approbation de l'Invoice Reconciliation", "Dans les règles de transaction du compte acheteur du Business Network, avec une règle de groupe fournisseurs pour les loyers", "Dans le fichier CIF des fournisseurs concernés", "Dans la table de correspondance de la passerelle"], answer: 1,
          explanation: "Les règles de transaction du compte acheteur contrôlent ce que le fournisseur peut soumettre ; l'exigence de référence PO y est une règle standard, et les groupes de fournisseurs permettent une exception (loyers). Les règles d'approbation IR (A) agissent après réception de la facture, donc trop tard pour un refus à la soumission. Le CIF (C) décrit des articles, pas des règles. Les tables de correspondance (D) traduisent des codes, elles ne portent pas de politique." },
        { id: "m10-s8-j2-q2", concept: "Comptes Standard et Enterprise", question: "Quelle affirmation sur les comptes fournisseurs du Business Network est exacte ?", options: ["Le compte Standard est payant et le compte Enterprise gratuit", "Le compte Standard est gratuit, fonctionne principalement via e-mail interactif et portail, tandis que l'Enterprise offre intégration et fonctionnalités avancées", "Seuls les comptes Enterprise peuvent recevoir des bons de commande", "Le type de compte est choisi par l'acheteur"], answer: 1,
          explanation: "Le compte Standard est gratuit pour le fournisseur, orienté PO par e-mail interactif et PO flip sur le portail ; le compte Enterprise, soumis à abonnement, ajoute l'intégration cXML/EDI, les catalogues avancés et le reporting. A inverse les deux. Les comptes Standard reçoivent bien des PO (C). Le fournisseur choisit son type de compte, l'acheteur peut seulement le recommander (D)." },
        { id: "m10-s8-j2-q3", concept: "Fichier CIF : structure et champs", question: "Quelle ligne d'en-tête CIF indique que le fichier remplace entièrement la version précédente du catalogue ?", options: ["LOADMODE: I", "LOADMODE: F", "CODEFORMAT: UNSPSC", "SUPPLIERID_DOMAIN: NetworkID"], answer: 1,
          explanation: "LOADMODE: F (Full) remplace tout le catalogue ; LOADMODE: I (Incremental, option A) ajoute, modifie ou supprime des lignes par rapport à la version existante. CODEFORMAT (C) précise la classification utilisée pour la colonne SPSC Code. SUPPLIERID_DOMAIN (D) indique le type d'identifiant fournisseur (NetworkID ou DUNS)." },
        { id: "m10-s8-j2-q4", concept: "PunchOut Level 1 vs Level 2", question: "Quel avantage principal apporte un PunchOut Level 2 par rapport au Level 1 ?", options: ["Il supprime la nécessité d'un SharedSecret", "Les articles du fournisseur sont indexés et apparaissent dans la recherche Guided Buying, le demandeur arrivant directement sur la fiche produit", "Il permet de facturer sans bon de commande", "Il remplace le message PunchOutOrderMessage par un fichier CIF"], answer: 1,
          explanation: "Le Level 2 fournit un index des articles (via un catalogue d'index) : la recherche Ariba affiche les produits du fournisseur et ouvre directement la page article sur son site. Le Level 1 n'offre qu'un lien vers la page d'accueil. Le SharedSecret reste requis (A). PunchOut ne concerne pas la facturation (C). Le PunchOutOrderMessage reste le mécanisme de retour du panier (D)." },
        { id: "m10-s8-j2-q5", concept: "Enveloppe cXML : payloadID, credentials, deploymentMode", question: "Quel rôle joue l'attribut payloadID d'un message cXML ?", options: ["Il contient le numéro de bon de commande", "Il identifie de façon unique le message et permet d'éviter le double traitement", "Il indique si le message est en mode test ou production", "Il porte le mot de passe partagé"], answer: 1,
          explanation: "Le payloadID est l'identifiant unique du message (souvent horodatage + référence + domaine) ; un récepteur qui le reçoit deux fois doit ignorer le doublon, ce qui garantit l'idempotence. Le numéro de PO (A) est dans OrderRequestHeader orderID. Le mode test/production (C) est l'attribut deploymentMode de Request. Le mot de passe partagé (D) est le SharedSecret du bloc Sender." },
        { id: "m10-s8-j2-q6", concept: "Monitoring et familles d'erreurs d'intégration", question: "Une facture apparaît « Delivered » dans le Transaction tracker de la passerelle mais « Rejected » dans le Business Network avec le motif « Cost center invalid ». Quelle est la nature de l'erreur ?", options: ["Erreur de connectivité entre le Network et la passerelle", "Erreur de mapping dans la passerelle", "Erreur de validation métier côté S/4HANA, remontée par le statut", "Erreur de règle de transaction du Network"], answer: 2,
          explanation: "« Delivered » prouve que la passerelle a mappé et transmis le message : connectivité (A) et mapping (B) sont hors de cause. Le motif « centre de coûts invalide » est un contrôle de S/4HANA (données maîtres), renvoyé au Network par un StatusUpdateRequest. Une règle de transaction (D) aurait rejeté la facture dès la soumission, avant tout passage par la passerelle." },
        { id: "m10-s8-j2-q7", concept: "Données de base répliquées depuis S/4HANA", question: "Pourquoi, dans un scénario intégré, les centres de coûts d'Ariba doivent-ils provenir de S/4HANA plutôt que d'une saisie manuelle ?", options: ["Parce qu'Ariba ne permet pas de créer des centres de coûts", "Pour garantir que toute imputation validée dans Ariba sera acceptée lors de la création du PO et de la comptabilisation dans S/4HANA", "Parce que les centres de coûts sont obligatoires dans le fichier CIF", "Parce que le Business Network exige des centres de coûts"], answer: 1,
          explanation: "S/4HANA est le système de référence : si Ariba utilise ses propres données, un PO ou une facture peut être refusé à la comptabilisation (centre fermé, inexistant). La réplication rend les contrôles amont fiables. Ariba sait importer des centres de coûts (A) mais la source doit être l'ERP. Le CIF (C) et le Network (D) ne manipulent pas les imputations." },
        { id: "m10-s8-j2-q8", concept: "Groupes système et permissions", question: "Un utilisateur doit pouvoir approuver et publier les catalogues fournisseurs dans Ariba Buying. Quel groupe lui attribuer ?", options: ["Customer Administrator", "Catalog Manager", "Invoice Manager", "Integration Admin"], answer: 1,
          explanation: "Le groupe Catalog Manager porte les droits de validation, d'approbation et de publication des catalogues, ainsi que la gestion des vues. Customer Administrator (A) donne l'administration complète du site, bien trop large pour ce besoin. Invoice Manager (C) traite les exceptions de facturation. Integration Admin (D) gère les imports et les intégrations, pas la publication de contenu." },
        { id: "m10-s8-j2-q9", concept: "Imports de données : CSV, ITK et tâches planifiées", question: "Quel fichier d'import établit la hiérarchie utilisée par la règle d'approbation hiérarchique (chaîne de superviseurs) ?", options: ["GroupSharedUserMap.csv", "UserSupervisor.csv", "CostCenter.csv", "SupplierLocation.csv"], answer: 1,
          explanation: "UserSupervisor.csv associe chaque utilisateur à son superviseur ; la règle « Supervisor » remonte cette chaîne pour déterminer les approbateurs. GroupSharedUserMap (A) affecte des utilisateurs à des groupes. CostCenter (C) charge les centres de coûts. SupplierLocation (D) décrit les adresses de commande des fournisseurs." },
        { id: "m10-s8-j2-q10", concept: "Realms, releases et support SAP", question: "Avant d'activer une nouvelle fonctionnalité d'une release trimestrielle SAP Ariba en production, quelle démarche est recommandée ?", options: ["L'activer directement en production, les releases étant testées par SAP", "La tester dans le realm de test, vérifier les impacts sur les flux intégrés et former les utilisateurs, puis l'activer en production", "Ouvrir un Service Request pour que SAP l'active", "Attendre la release suivante"], answer: 1,
          explanation: "Les fonctionnalités optionnelles (feature toggles) doivent être évaluées en realm de test, y compris leur effet sur les intégrations et les processus, avant activation en production avec communication aux utilisateurs. Activer sans test (A) expose aux régressions. Le support SAP (C) n'active pas les options client à votre place en règle générale. Attendre (D) n'est pas une démarche de gestion des releases." },
      ],
    },

    // ───────────── Semaine 8 · Jour 3 ─────────────
    {
      id: "m10-s8-j3-a1", moduleId: "m10", week: 8, day: 3, kind: "lecon", level: "avance", durationMin: 15,
      title: "Méthode : traiter un cas d'intégration et de configuration",
      objective: "Adopter une démarche structurée pour analyser un cas complet et produire des livrables de consultant.",
      content: `## La méthode en cinq questions

Face à un cas d'étude (ou à une question d'examen longue), un consultant SAP Ariba se pose toujours les mêmes questions, dans le même ordre :

1. **Quel système fait foi ?** Comptabilité, stocks, fournisseurs : si la réponse est S/4HANA, le scénario est intégré et les données de base viennent de l'ERP.
2. **Qui crée quel objet, et où ?** Demande, PO, réception, facture : un tableau à quatre lignes évite la plupart des erreurs d'architecture.
3. **Par où passent les documents fournisseurs ?** Toujours par le Business Network ; les règles de transaction sont la première ligne de défense.
4. **Comment la politique achats se traduit-elle en paramétrage ?** Règles d'approbation, champs personnalisés, tolérances, politiques Guided Buying, groupes.
5. **Que se passe-t-il quand ça casse ?** Monitoring, familles d'erreurs, retraitement, prévention.

## Produire des livrables lisibles

- Un **schéma** vaut mieux que trois pages : blocs, flèches orientées, noms de messages.
- Un **tableau** par décision : objet / source / cible / canal / fréquence pour les flux ; ordre / règle / condition / approbateur pour les approbations.
- Une **justification en cinq lignes** pour chaque choix structurant, avec l'alternative écartée.
- Un **registre des risques** court : risque, impact, parade.

## Pièges fréquents

- Confondre ce que fait **Ariba Buying** et ce que fait le **Network**.
- Oublier la **réplication des données de base** et ses conséquences sur les imputations.
- Nommer des **personnes** dans les règles d'approbation.
- Promettre un **PunchOut** sans vérifier que le fournisseur le supporte.
- Négliger le **plan d'enablement** : la technique sans les fournisseurs ne sert à rien.

> Le cas final reprend exactement ces cinq questions, phase après phase. Rédigez vos réponses dans la zone « Mon travail » avant d'ouvrir le corrigé.`,
      keyPoints: [
        "Commencer par « quel système fait foi » : cela fixe le scénario d'intégration.",
        "Tableau objet / lieu de création / canal : la base de toute architecture P2P.",
        "Traduire la politique achats en règles, champs, tolérances et politiques Guided Buying.",
        "Toujours prévoir le monitoring et le retraitement des erreurs.",
        "Des livrables courts, structurés, avec la justification et l'alternative écartée.",
      ],
    },
    {
      id: "m10-s8-j3-a2", moduleId: "m10", week: 8, day: 3, kind: "cas", level: "avance", durationMin: 75,
      title: "Cas final — phases 1 à 4 : cadrage, données, configuration P2P, catalogues",
      objective: "Produire l'architecture cible, le modèle de données et la configuration P2P du groupe NordAlu.",
      href: `${BASE}/cas-final`,
      content: `Ouvrez le **cas final NordAlu** et traitez les quatre premières phases :

1. **Cadrage et architecture cible** : scénario d'intégration, composants, flux, risques.
2. **Organisation, données de base et sécurité** : tableau des données répliquées, dérivation comptable, SSO, groupes.
3. **Configuration P2P** : règles d'approbation, rapprochement et tolérances, champs personnalisés, cas de test.
4. **Catalogues et Guided Buying** : type de catalogue par catégorie, spécification CIF, PunchOut, tuiles et politiques.

Rédigez vos livrables dans la zone « Mon travail » de chaque phase, cochez les tâches, puis comparez avec le corrigé. Comptez environ 60 à 75 minutes pour les phases 1 et 2 aujourd'hui, le reste demain si nécessaire.

> Les tâches ci-dessous récapitulent la session ; les tâches détaillées de chaque phase sont dans la page du cas.`,
      tasks: [
        "Phase 1 terminée : scénario justifié, schéma, tableau des flux, registre des risques.",
        "Phase 2 terminée : tableau des données de base, dérivation comptable, modèle de groupes et SSO.",
        "Phase 3 entamée : flux d'approbation modélisé et champs personnalisés spécifiés.",
        "Phase 4 entamée : matrice catégorie × type de catalogue.",
        "Écarts avec le corrigé notés dans les notions à revoir.",
      ],
    },
    {
      id: "m10-s8-j3-a3", moduleId: "m10", week: 8, day: 3, kind: "quiz", level: "avance", durationMin: 10,
      title: "Quiz express : architecture et configuration P2P",
      objective: "Valider les décisions d'architecture et de configuration prises dans les premières phases du cas.",
      questions: [
        { id: "m10-s8-j3-q1", concept: "Scénario intégré vs standalone", question: "Le DSI exige que S/4HANA reste le système de référence comptable et logistique. Quelle conséquence directe pour la conception Ariba ?", options: ["Ariba Buying doit comptabiliser les factures et envoyer un fichier de paiement", "Le PO est répliqué dans S/4HANA et la facture y est comptabilisée ; les données de base viennent de S/4HANA", "Le Business Network devient inutile", "Guided Buying doit être remplacé par Fiori"], answer: 1,
          explanation: "C'est la définition du scénario intégré : S/4HANA crée le PO MM à partir de la demande approuvée dans Ariba et comptabilise la facture ; les données de base sont répliquées depuis l'ERP pour fiabiliser les imputations. L'option A décrit le standalone, incompatible avec l'exigence. Le Network reste indispensable pour les échanges fournisseurs (C). Guided Buying est précisément le front demandeur attendu (D)." },
        { id: "m10-s8-j3-q2", concept: "Dérivation comptable par commodity code", question: "Comment le compte général est-il déterminé dans une demande Ariba bien configurée ?", options: ["Saisi librement par le demandeur", "Dérivé automatiquement de la combinaison commodity code × type d'imputation via une table de correspondance", "Choisi par le fournisseur dans le catalogue", "Déterminé par le Business Network"], answer: 1,
          explanation: "La table CommodityCodeAccountMap (ou équivalent) dérive le compte à partir de la catégorie et du type d'imputation ; le demandeur ne voit pas le compte, ce qui évite les erreurs comptables. La saisie libre (A) est une mauvaise pratique. Le catalogue (C) porte l'UNSPSC, pas le compte. Le Network (D) n'intervient pas dans l'imputation." },
        { id: "m10-s8-j3-q3", concept: "Champs personnalisés : définition et conditions", question: "Un champ « Projet CAPEX » doit être obligatoire uniquement lorsque le compte est un compte d'immobilisation. Comment le réaliser ?", options: ["Créer deux formulaires Guided Buying distincts", "Définir un champ personnalisé au niveau ligne avec une condition d'obligation basée sur le compte", "Ajouter une règle de transaction au Network", "Demander au fournisseur de le renseigner sur la facture"], answer: 1,
          explanation: "Le Customization Manager permet de créer un champ au niveau ligne et de conditionner sa visibilité et son caractère obligatoire (ici : compte dans la plage des immobilisations). Deux formulaires (A) compliquent l'expérience sans garantir la règle. Les règles de transaction (C) et la facture fournisseur (D) sont hors sujet : l'information est interne au demandeur." },
        { id: "m10-s8-j3-q4", concept: "Flux d'approbation : règles et chaîne", question: "La DSI doit valider toute demande IT quel que soit le montant, en plus de la hiérarchie. Quelle modélisation est correcte ?", options: ["Une règle série qui remplace le superviseur par la DSI pour l'IT", "Une règle conditionnée sur le commodity code IT ajoutant le groupe IT Approvers en parallèle de la chaîne hiérarchique", "Une règle qui nomme le DSI comme approbateur final", "Une politique Guided Buying qui bloque les achats IT"], answer: 1,
          explanation: "La condition sur la famille de commodity codes déclenche l'ajout d'un groupe d'approbateurs, en parallèle pour ne pas allonger le délai ; la hiérarchie reste. Remplacer le superviseur (A) supprime un contrôle demandé. Nommer le DSI (C) viole la bonne pratique des groupes. Une politique Guided Buying (D) bloque ou oriente, elle n'approuve pas." },
        { id: "m10-s8-j3-q5", concept: "Choix du type de catalogue par catégorie", question: "Pour un fournisseur informatique disposant d'un configurateur en ligne et de stocks temps réel, quel type de catalogue recommander ?", options: ["CIF statique mis à jour chaque trimestre", "PunchOut Level 2", "Formulaire Guided Buying hors catalogue", "Contrat no-release"], answer: 1,
          explanation: "Le PunchOut laisse le demandeur configurer son produit sur le site du fournisseur avec les prix et stocks réels ; le Level 2 indexe les articles dans la recherche Ariba. Un CIF statique (A) ne peut pas refléter un configurateur ni des stocks temps réel. Le formulaire hors catalogue (C) perd le bénéfice du catalogue. Le contrat no-release (D) sert aux forfaits sans PO." },
      ],
    },

    // ───────────── Semaine 8 · Jour 4 ─────────────
    {
      id: "m10-s8-j4-a1", moduleId: "m10", week: 8, day: 4, kind: "lecon", level: "avance", durationMin: 15,
      title: "Soutenir une architecture devant un comité",
      objective: "Savoir présenter et défendre ses choix d'intégration et de configuration en dix minutes.",
      content: `## Le plan en huit slides

1. **Contexte et objectifs** : trois chiffres, trois attentes métier.
2. **Architecture cible** : un schéma, cinq blocs, flèches nommées.
3. **Processus P2P cible** : qui crée quoi, où ; ce qui change pour le demandeur, l'acheteur, le comptable.
4. **Gouvernance des approbations** : tableau des règles, principe « rôles, pas personnes ».
5. **Catalogues et Guided Buying** : matrice catégorie × type, politiques.
6. **Intégration et monitoring** : flux, passerelle, trois consoles, qui intervient sur quelle erreur.
7. **Enablement fournisseurs** : vagues, types de comptes, règles de transaction.
8. **Bascule, risques, indicateurs** : check-list de cutover, cinq risques, cinq KPI.

## Répondre aux objections

| Objection | Réponse type |
|---|---|
| « Pourquoi pas standalone, c'est plus simple ? » | La comptabilité et les stocks restent dans S/4HANA : dupliquer le rapprochement créerait deux vérités. |
| « Que se passe-t-il si la passerelle tombe ? » | Les messages sont mis en file et retraités ; le monitoring alerte ; aucun document n'est perdu. |
| « Nos fournisseurs refuseront le Network. » | Compte Standard gratuit, e-mail interactif, PO flip ; vagues et accompagnement ; règles progressives. |
| « Qui administre tout ça après le projet ? » | Groupes d'administration, imports planifiés, procédure de release trimestrielle, support SAP. |

## Règles d'or

- Une idée par slide, un visuel par idée.
- Annoncer l'alternative écartée : cela montre que le choix est réfléchi.
- Chiffrer : nombre de fournisseurs, de centres de coûts, de catalogues, délais.
- Terminer par la **décision attendue** du comité.

> La soutenance est aussi un exercice d'entretien : un recruteur SAP Ariba vous demandera presque toujours de « dessiner une architecture P2P intégrée ».`,
      keyPoints: [
        "Huit slides, un schéma d'architecture au centre.",
        "Toujours nommer l'alternative écartée et pourquoi.",
        "Préparer les quatre objections classiques : standalone, panne de passerelle, refus fournisseurs, administration.",
        "Chiffrer et conclure par la décision attendue.",
      ],
    },
    {
      id: "m10-s8-j4-a2", moduleId: "m10", week: 8, day: 4, kind: "cas", level: "avance", durationMin: 75,
      title: "Cas final — phases 5 à 7 : intégration CIG et cXML, enablement, tests et soutenance",
      objective: "Spécifier l'intégration, le plan d'enablement et la bascule, puis préparer la soutenance du cas NordAlu.",
      href: `${BASE}/cas-final`,
      content: `Poursuivez le **cas final NordAlu** :

5. **Intégration CIG et cXML** : catalogue des flux, tables de correspondance, OrderRequest commenté, analyse d'incident, stratégie de test.
6. **Enablement fournisseurs et règles Network** : vagues, types de compte, règles de transaction, communication, indicateurs.
7. **Tests, cutover et soutenance** : plan de tests, check-list de bascule, plan des huit slides, questions du comité.

Terminez aussi les phases 3 et 4 si elles ne le sont pas. Puis **présentez votre architecture à voix haute en dix minutes**, montre en main.`,
      tasks: [
        "Phases 3 et 4 terminées et comparées au corrigé.",
        "Phase 5 terminée : flux CIG, cross-references, cXML commenté, fiche d'incident.",
        "Phase 6 terminée : plan d'enablement par vagues et règles de transaction.",
        "Phase 7 terminée : plan de tests, check-list de cutover, plan de soutenance.",
        "Soutenance répétée à voix haute en 10 minutes.",
      ],
    },
    {
      id: "m10-s8-j4-a3", moduleId: "m10", week: 8, day: 4, kind: "quiz", level: "avance", durationMin: 10,
      title: "Quiz express : intégration, enablement et bascule",
      objective: "Valider les décisions d'intégration et de déploiement prises dans les dernières phases du cas.",
      questions: [
        { id: "m10-s8-j4-q1", concept: "Messages cXML du cycle P2P", question: "Quel message cXML transporte la facture du fournisseur vers l'acheteur ?", options: ["OrderRequest", "InvoiceDetailRequest", "StatusUpdateRequest", "PunchOutOrderMessage"], answer: 1,
          explanation: "InvoiceDetailRequest est le message de facture cXML (en-tête, lignes, taxes, références PO). OrderRequest (A) est le bon de commande envoyé au fournisseur. StatusUpdateRequest (C) renvoie le statut d'un document (facture approuvée, rejetée, payée). PunchOutOrderMessage (D) ramène le panier d'un site PunchOut dans la demande d'achat." },
        { id: "m10-s8-j4-q2", concept: "Tables de correspondance (cross-reference) de la passerelle", question: "Pourquoi une table de correspondance des unités de mesure est-elle nécessaire entre S/4HANA et le Business Network ?", options: ["Parce que le Network n'accepte pas d'unités", "Parce que S/4HANA utilise des codes internes (ST, KAR) alors que cXML attend des codes ISO/UN-ECE (EA, BX)", "Parce que les unités changent chaque trimestre", "Parce que les fournisseurs n'indiquent jamais d'unité"], answer: 1,
          explanation: "Les codes d'unité S/4HANA (ST, KAR, H) diffèrent des codes standard attendus dans les documents cXML (EA, BX, HUR) ; sans correspondance, le mapping échoue ou le fournisseur reçoit une unité incompréhensible. Le Network accepte bien les unités (A). Les unités sont stables (C). Les fournisseurs renseignent l'unité (D), d'où la nécessité d'une conversion dans les deux sens." },
        { id: "m10-s8-j4-q3", concept: "Plan d'enablement par vagues", question: "Quelle segmentation des fournisseurs pour un plan d'enablement est la plus pertinente ?", options: ["Par ordre alphabétique", "Par part de dépenses et capacité d'intégration : grands comptes intégrés d'abord, PME via portail, occasionnels en dernier", "Par pays uniquement", "Tous en même temps au go-live"], answer: 1,
          explanation: "Les vagues suivent la valeur (couvrir vite la majorité des dépenses) et la maturité (intégration cXML/EDI pour les grands comptes, compte Standard et PO flip pour les PME, e-mail interactif pour les occasionnels). L'ordre alphabétique (A) et le pays seul (C) ignorent la valeur. Un big bang (D) sature le support et dégrade l'adoption." },
        { id: "m10-s8-j4-q4", concept: "Cutover : ordre de chargement des données", question: "Dans quel ordre charger les données lors du cutover Ariba ?", options: ["Utilisateurs, puis catalogues, puis sociétés", "Structures organisationnelles (sociétés, plants, unités d'achat), puis données comptables, puis fournisseurs et locations, puis utilisateurs, puis catalogues", "Catalogues en premier pour tester la recherche", "L'ordre n'a pas d'importance"], answer: 1,
          explanation: "Les objets dépendants doivent trouver leurs parents : un centre de coûts référence une société, une location référence un fournisseur, un utilisateur référence un centre de coûts et un superviseur, un catalogue référence un fournisseur et des commodity codes. L'ordre A ou C provoque des rejets d'import. L'ordre (D) est au contraire déterminant." },
        { id: "m10-s8-j4-q5", concept: "Hypercare et indicateurs de déploiement", question: "Quel indicateur suit le mieux l'efficacité de l'enablement fournisseurs après le go-live ?", options: ["Le nombre de slides de la soutenance", "Le pourcentage de factures reçues électroniquement via le Network et le taux de rejet en première soumission", "Le nombre de centres de coûts", "La durée de la formation des acheteurs"], answer: 1,
          explanation: "L'objectif de l'enablement est la dématérialisation fiable des échanges : la part de factures électroniques et le taux de rejet initial mesurent directement l'adoption et la qualité des règles de transaction. Les autres options ne mesurent pas l'enablement (A, D) ou n'ont aucun lien avec les fournisseurs (C)." },
      ],
    },

    // ───────────── Semaine 8 · Jour 5 ─────────────
    {
      id: "m10-s8-j5-a1", moduleId: "m10", week: 8, day: 5, kind: "lecon", level: "intermediaire", durationMin: 15,
      title: "Le jour J : format de l'examen, stratégie et pièges",
      objective: "Connaître le format des certifications SAP Ariba et adopter une stratégie de réponse efficace.",
      content: `## Les certifications du périmètre

| Code | Intitulé | Modules du parcours |
|---|---|---|
| C_ARP2P | SAP Ariba Procurement | P2P, Catalogues, Administration |
| C_ARSOR | SAP Ariba Sourcing | Sourcing, RFI/RFQ |
| C_ARCON | SAP Ariba Contracts | Contrats |
| C_ARSUM | SAP Ariba Supplier Management | SLP |
| C_ARCIG | Intégration avec la passerelle (CIG / managed gateway) | Network, Intégration |
| C_ARCAT | SAP Ariba Catalogs | Catalogues |

Les examens **SAP Certified Associate** comportent généralement **80 questions** à choix unique ou multiple, en **180 minutes**, avec un seuil de réussite propre à chaque examen (souvent entre 60 et 70 %). Les thèmes et leur pondération sont publiés sur **SAP Learning** : vérifiez-les la semaine de l'inscription, ils évoluent avec les releases.

## Stratégie de réponse

- **Lire la question deux fois** et repérer le mot clé : « où », « qui », « quel objet », « quelle différence ».
- Les questions à **réponses multiples** indiquent le nombre de réponses attendues : respectez-le.
- **Éliminer** d'abord les options qui confondent les composants (Buying vs Network, Guided Buying vs Buying, CIG vs ITK).
- Marquer les questions douteuses et **revenir** à la fin : ne jamais rester bloqué plus de deux minutes.
- Se méfier des options « toujours », « jamais », « automatiquement sans paramétrage ».

## Les pièges classiques

- Attribuer au **Business Network** une fonction comptable.
- Confondre **exception acceptée automatiquement** et **exception routée**.
- Oublier que la **qualification SLP** est contextuelle (catégorie, région, département).
- Croire qu'un **PunchOut** supprime le SharedSecret ou le PunchOutOrderMessage.
- Penser qu'une **release SAP** s'applique sans test ni activation côté client.

## La veille et le matin

- Refaire la cartographie des flux de mémoire (5 minutes).
- Relire les notions à revoir encore ouvertes, pas tout le parcours.
- Dormir. Une nuit complète vaut mieux que trois heures de révision supplémentaires.

> Après l'examen blanc d'aujourd'hui, générez votre **synthèse de préparation** : elle vous dira sur quoi passer vos dernières heures.`,
      keyPoints: [
        "Six certifications couvrent le périmètre ; vérifier format et thèmes sur SAP Learning avant de s'inscrire.",
        "Lire deux fois, éliminer les confusions de composants, marquer et revenir.",
        "Les pièges portent sur les frontières : Buying / Network / Guided Buying / passerelle.",
        "La veille : cartographie des flux, notions ouvertes, sommeil.",
      ],
    },
    {
      id: "m10-s8-j5-a2", moduleId: "m10", week: 8, day: 5, kind: "quiz", level: "avance", durationMin: 40,
      title: "Examen blanc — 20 questions transversales",
      objective: "Se mesurer en conditions d'examen sur l'ensemble du périmètre technico-fonctionnel.",
      questions: [
        { id: "m10-s8-j5-q01", concept: "Cycle P2P : objets et enchaînement", question: "Quel est l'ordre correct des objets dans le cycle Procure-to-Pay d'Ariba Buying & Invoicing ?", options: ["Purchase Order → Requisition → Invoice → Receipt", "Requisition → Purchase Order → Receipt → Invoice → Invoice Reconciliation → Payment", "Requisition → Invoice → Purchase Order → Payment", "Sourcing Event → Requisition → Payment"], answer: 1,
          explanation: "La demande (Requisition) approuvée génère le bon de commande, la réception atteste la livraison, la facture est rapprochée dans l'Invoice Reconciliation puis payée. L'option A inverse demande et commande. L'option C place la facture avant la commande. L'option D mélange sourcing et P2P et omet les objets intermédiaires." },
        { id: "m10-s8-j5-q02", concept: "Rapprochement de facture (IR) et exceptions", question: "Quel acteur reçoit typiquement une exception de quantité (facture supérieure à la réception) routée par l'Invoice Reconciliation ?", options: ["Le fournisseur", "Le réceptionnaire ou l'acheteur, pour confirmer la quantité réellement reçue", "Le Catalog Manager", "L'administrateur du site"], answer: 1,
          explanation: "L'écart de quantité se résout en vérifiant la réception : la tâche est routée au réceptionnaire (ou à l'acheteur selon le paramétrage). Le fournisseur (A) ne traite pas les exceptions internes ; il reçoit au besoin un rejet. Le Catalog Manager (C) et l'administrateur (D) n'ont aucun rôle dans la résolution des factures." },
        { id: "m10-s8-j5-q03", concept: "Guided Buying : politiques et formulaires", question: "Quelle fonctionnalité de Guided Buying permet de collecter une demande de prestation structurée (dates, lieu, description) sans article de catalogue ?", options: ["Un PunchOut", "Un formulaire (form) associé à une tuile", "Une règle de transaction", "Un scénario d'attribution"], answer: 1,
          explanation: "Les formulaires Guided Buying structurent les demandes hors catalogue (prestations, services) et peuvent déclencher des approbations spécifiques. Le PunchOut (A) renvoie vers un site marchand. Les règles de transaction (C) appartiennent au Network. Le scénario d'attribution (D) relève du sourcing." },
        { id: "m10-s8-j5-q04", concept: "Flux d'approbation : règles et chaîne", question: "Que se passe-t-il si un approbateur est absent sans avoir configuré de délégation et qu'aucune règle d'escalade n'existe ?", options: ["La demande est approuvée automatiquement après 24 h", "La demande reste bloquée à son niveau jusqu'à intervention d'un administrateur ou retour de l'approbateur", "Le fournisseur est averti", "La demande est supprimée"], answer: 1,
          explanation: "Sans délégation ni escalade, la tâche attend ; un Approvable Administrator peut la réaffecter. Aucune approbation automatique n'existe par défaut (A) : ce serait un risque de contrôle interne. Le fournisseur (C) n'est pas concerné avant la commande. La suppression (D) n'est jamais automatique." },
        { id: "m10-s8-j5-q05", concept: "Sourcing Project : structure et modèles", question: "Quelle est la différence entre un Quick Project et un Full Project de sourcing ?", options: ["Le Quick Project ne permet pas de créer d'événement", "Le Full Project ajoute des phases, des tâches, une équipe et une gestion documentaire autour des événements, alors que le Quick Project crée directement un événement", "Le Quick Project est réservé aux enchères", "Le Full Project est réservé aux RFI"], answer: 1,
          explanation: "Le Full Project est un conteneur de pilotage (phases, tâches, équipe, documents, plusieurs événements) ; le Quick Project crée un événement unique sans cette structure. Le Quick Project contient bien un événement (A). Aucun des deux n'est limité à un type d'événement (C, D)." },
        { id: "m10-s8-j5-q06", concept: "Notation RFP : poids et grades", question: "Dans un RFP noté, à quoi servent les poids attribués aux sections et aux questions ?", options: ["À définir l'ordre d'affichage des questions", "À pondérer la contribution de chaque réponse au score global du fournisseur", "À fixer le prix plafond", "À déterminer la durée de l'événement"], answer: 1,
          explanation: "Le score global est une somme pondérée : chaque section et chaque question reçoit un poids, et chaque réponse une note (grade) ; le poids traduit l'importance relative des critères. Les poids n'ont rien à voir avec l'ordre d'affichage (A), les prix (C) ou le calendrier (D)." },
        { id: "m10-s8-j5-q07", concept: "RFI vs RFP vs RFQ", question: "Quel type d'événement convient pour collecter des informations sur le marché et les capacités des fournisseurs avant de définir un besoin précis ?", options: ["RFQ", "RFI", "Enchère anglaise inversée", "Contrat no-release"], answer: 1,
          explanation: "Le RFI (Request for Information) sert à explorer le marché, qualifier des capacités et préparer un cahier des charges, sans engagement de prix. Le RFQ (A) demande des prix sur un besoin défini. L'enchère (C) suppose des offres comparables et un besoin figé. Le contrat (D) n'est pas un événement de sourcing." },
        { id: "m10-s8-j5-q08", concept: "Contract Workspace : structure et cycle de vie", question: "Quel objet contient le document principal, les clauses, les tâches d'approbation et de signature d'un contrat dans Ariba Contracts ?", options: ["Le Sourcing Event", "Le Contract Workspace", "Le Supplier Request", "La Supplier Location"], answer: 1,
          explanation: "Le Contract Workspace (procurement, sales ou internal) regroupe tous les éléments du cycle de vie contractuel. Le Sourcing Event (A) sert aux appels d'offres. Le Supplier Request (C) initie la création d'un fournisseur dans SLP. La Supplier Location (D) est une adresse de commande." },
        { id: "m10-s8-j5-q09", concept: "Amendements et expiration des contrats", question: "Un contrat arrive à échéance et doit être prolongé d'un an aux mêmes conditions. Quel type d'amendement utiliser ?", options: ["Amendement administratif", "Renouvellement", "Résiliation", "Nouveau Contract Request"], answer: 1,
          explanation: "Le renouvellement prolonge la durée (et éventuellement les conditions) d'un contrat existant en conservant son historique. L'amendement administratif (A) corrige des métadonnées sans renégociation ni changement de dates substantielles. La résiliation (C) met fin au contrat. Un nouveau Contract Request (D) créerait un contrat distinct et perdrait la continuité." },
        { id: "m10-s8-j5-q10", concept: "SLP : enregistrement, qualification et préférence", question: "Quel est le premier objet créé lorsqu'un acheteur souhaite introduire un nouveau fournisseur dans SLP ?", options: ["Le questionnaire de qualification", "Le Supplier Request", "Le scorecard de performance", "Le Contract Workspace"], answer: 1,
          explanation: "Le Supplier Request (interne ou externe) déclenche le processus : contrôle des doublons, approbation, puis invitation à l'enregistrement. La qualification (A) vient après l'enregistrement. Le scorecard (C) concerne la performance d'un fournisseur déjà actif. Le contrat (D) n'intervient pas dans la création du fournisseur." },
        { id: "m10-s8-j5-q11", concept: "Risque fournisseur (Supplier Risk)", question: "Que permet un questionnaire de certificat modulaire avec date d'expiration dans SLP ?", options: ["De bloquer automatiquement toute facture du fournisseur", "De suivre la validité d'un document (assurance, ISO) et de déclencher une demande de renouvellement à l'échéance", "De calculer le prix des offres", "De remplacer l'enregistrement"], answer: 1,
          explanation: "Les questionnaires modulaires portent des documents à durée de validité ; à l'expiration, SLP notifie et peut relancer le fournisseur, et le statut de qualification peut être impacté. Ils ne bloquent pas directement les factures (A), ne calculent pas de prix (C) et complètent l'enregistrement sans le remplacer (D)." },
        { id: "m10-s8-j5-q12", concept: "Documents du Business Network", question: "Quel document le fournisseur envoie-t-il pour annoncer l'expédition des marchandises avant la livraison ?", options: ["Order Confirmation", "Advance Ship Notice (ASN)", "Invoice", "Goods Receipt"], answer: 1,
          explanation: "L'ASN (Ship Notice) informe l'acheteur de l'expédition : quantités, colis, date de livraison prévue. La confirmation de commande (A) précède l'expédition et valide le PO. La facture (C) vient après la livraison. La réception (D) est émise par l'acheteur, pas par le fournisseur." },
        { id: "m10-s8-j5-q13", concept: "Trading Relationship Request et onboarding", question: "Qu'est-ce qu'une Trading Relationship Request (TRR) ?", options: ["Une demande de devis envoyée au fournisseur", "L'invitation envoyée par l'acheteur pour établir la relation commerciale avec le fournisseur sur le Business Network", "Un message d'erreur de la passerelle", "Un formulaire Guided Buying"], answer: 1,
          explanation: "La TRR est l'invitation qui, une fois acceptée, relie le compte fournisseur au compte acheteur et autorise l'échange de documents. Ce n'est ni un RFQ (A), ni un message technique (C), ni un formulaire demandeur (D)." },
        { id: "m10-s8-j5-q14", concept: "Fichier CIF : structure et champs", question: "Quelle colonne du CIF est utilisée pour classer l'article et dériver l'imputation comptable côté acheteur ?", options: ["Supplier Part ID", "SPSC Code (UNSPSC)", "Lead Time", "Manufacturer Name"], answer: 1,
          explanation: "Le code UNSPSC (colonne SPSC Code) classe l'article ; Ariba le mappe sur le commodity code pour dériver le compte et appliquer les politiques. Le Supplier Part ID (A) identifie l'article chez le fournisseur. Lead Time (C) et Manufacturer Name (D) sont informatifs." },
        { id: "m10-s8-j5-q15", concept: "Publication et approbation des catalogues", question: "Après qu'un fournisseur a chargé une nouvelle version de catalogue sur le Business Network, quelle étape rend les articles visibles aux demandeurs ?", options: ["Aucune : les articles sont visibles immédiatement", "La validation technique puis l'approbation du catalogue par le Catalog Manager côté acheteur", "L'ouverture d'un Service Request SAP", "La signature d'un contrat"], answer: 1,
          explanation: "Le catalogue chargé est validé (format, champs, prix vs contrat le cas échéant) puis soumis à l'approbation de l'acheteur ; seule l'activation le rend visible, éventuellement filtré par des vues. Aucune publication n'est automatique sans approbation (A). SAP (C) et le contrat (D) ne sont pas dans la boucle." },
        { id: "m10-s8-j5-q16", concept: "Architecture de la passerelle (CIG / managed gateway)", question: "Quel composant doit être installé côté S/4HANA pour communiquer avec la passerelle SAP Integration Suite, managed gateway (ex-CIG) ?", options: ["Un serveur EDI dédié", "L'add-on d'intégration (ARBCIG / composant Ariba Cloud Integration) configuré avec les endpoints et credentials", "Un client Guided Buying", "Un compte Standard du Network"], answer: 1,
          explanation: "L'add-on côté ERP porte la configuration des flux, les endpoints et les paramètres de connexion vers la passerelle ; il émet et reçoit les messages mappés. Un serveur EDI (A) n'est pas requis. Guided Buying (C) est une interface utilisateur. Un compte Standard (D) est un compte fournisseur." },
        { id: "m10-s8-j5-q17", concept: "Enveloppe cXML : payloadID, credentials, deploymentMode", question: "Dans l'en-tête cXML, quel bloc contient le SharedSecret ?", options: ["From", "To", "Sender", "Request"], answer: 2,
          explanation: "Le bloc Sender identifie le système qui envoie physiquement le message et porte le Credential avec le SharedSecret et le UserAgent. From (A) et To (B) identifient les parties commerciales, sans secret. Request (D) contient le document métier et l'attribut deploymentMode." },
        { id: "m10-s8-j5-q18", concept: "Monitoring et familles d'erreurs d'intégration", question: "Un PO n'apparaît jamais sur le Business Network et le Transaction tracker affiche une erreur de connexion vers le Network. De quelle famille d'erreur s'agit-il et qui intervient ?", options: ["Erreur métier ; l'acheteur corrige le PO", "Erreur de connectivité ; l'équipe intégration / l'administrateur de la passerelle vérifie certificats, endpoints et réseau", "Erreur de mapping ; le fournisseur corrige son catalogue", "Erreur de règle de transaction ; le trésorier modifie la règle"], answer: 1,
          explanation: "Une erreur de connexion est une erreur de connectivité : certificats expirés, endpoint erroné, réseau. Elle relève de l'équipe d'intégration, pas du métier (A). Le mapping (C) n'est pas en cause puisque le message n'a pas été transmis, et le fournisseur n'intervient pas. Les règles de transaction (D) s'appliquent à des documents reçus par le Network." },
        { id: "m10-s8-j5-q19", concept: "Groupes système et permissions", question: "Quel groupe permet d'administrer l'ensemble du site Ariba (utilisateurs, paramètres, imports) ?", options: ["Purchasing Agent", "Customer Administrator", "Receiving Manager", "Sourcing Agent"], answer: 1,
          explanation: "Customer Administrator est le groupe d'administration globale du realm client. Purchasing Agent (A) gère les commandes, Receiving Manager (C) les réceptions, Sourcing Agent (D) les événements de sourcing ; aucun n'a de droits d'administration du site." },
        { id: "m10-s8-j5-q20", concept: "Realms, releases et support SAP", question: "Quelle est la différence entre le realm de test et le realm de production d'un client SAP Ariba ?", options: ["Le realm de test n'existe que pendant le projet", "Le realm de test est un environnement séparé pour paramétrer, tester les releases et les intégrations sans impact sur la production, qui porte les données et transactions réelles", "Le realm de production est réservé aux fournisseurs", "Les deux realms partagent les mêmes données"], answer: 1,
          explanation: "Chaque client dispose d'un realm de test (configuration, tests de releases trimestrielles, intégration avec les systèmes de test) et d'un realm de production ; les données ne sont pas partagées (D). Le realm de test subsiste après le projet pour la gestion des évolutions (A). Les fournisseurs utilisent le Network, pas le realm de production du client (C)." },
      ],
    },
    {
      id: "m10-s8-j5-a3", moduleId: "m10", week: 8, day: 5, kind: "cas", level: "intermediaire", durationMin: 15,
      title: "Générer et exploiter sa synthèse de préparation",
      objective: "Produire la synthèse de préparation à la certification et planifier les dernières révisions.",
      href: `${BASE}/synthese`,
      content: `Vous avez terminé le parcours. Il reste à transformer vos résultats en plan d'action :

1. Ouvrez la page **Synthèse certification** et cliquez sur « Générer ma synthèse ».
2. Lisez l'indice de préparation et la couverture par module : repérez les modules « À consolider » ou « À retravailler ».
3. Parcourez les notions à consolider : relisez la leçon liée et refaites le quiz correspondant.
4. Suivez le **plan de révision sur 7 jours** proposé, ou adaptez-le à votre date d'examen.
5. Exportez votre progression (JSON) pour la conserver, et imprimez la synthèse si vous travaillez sur papier.

> Si votre indice est inférieur à 60 %, ne vous inscrivez pas encore : refaites les quiz sous 80 % et les phases du cas final les moins abouties, puis régénérez la synthèse.`,
      tasks: [
        "Synthèse générée et lue.",
        "Modules à consolider identifiés et planifiés.",
        "Notions à revoir traitées ou planifiées.",
        "Progression exportée (sauvegarde JSON).",
        "Date d'examen et plan de révision des 7 derniers jours fixés.",
      ],
    },
  ],
  useCases: [
    {
      id: "m10-uc1", moduleId: "m10", title: "Préparer un entretien de consultant SAP Ariba en deux semaines",
      client: "Cabinet de conseil, recrutement d'un consultant technico-fonctionnel confirmé",
      situation: "Un candidat issu du conseil SAP MM doit passer un entretien technique SAP Ariba avec étude de cas : « dessinez une architecture P2P intégrée et expliquez le traitement d'une facture rejetée ».",
      challenge: "Couvrir un périmètre large en peu de temps, sans accès à un realm Ariba, et démontrer une compréhension d'architecte plutôt que de simple utilisateur.",
      approach: [
        "Reconstituer de mémoire la cartographie des flux chaque matin jusqu'à la produire en cinq minutes.",
        "Préparer dix fiches actives sur les frontières entre composants (Buying, Guided Buying, Network, passerelle).",
        "Rédiger un cas type (données de base, approbations, catalogue, intégration) en format tableau.",
        "S'entraîner à l'analyse d'incident : localiser (Network, passerelle, AIF) puis qualifier (connectivité, mapping, métier).",
        "Répéter la soutenance à voix haute devant un pair, avec les quatre objections classiques.",
      ],
      outcome: "Le candidat a présenté une architecture claire, répondu à l'incident par la méthode « où puis pourquoi » et a été retenu sur un projet d'intégration S/4HANA.",
      lesson: "Les recruteurs testent la capacité à raisonner sur les frontières des composants et sur les erreurs, pas la connaissance des écrans.",
    },
    {
      id: "m10-uc2", moduleId: "m10", title: "Planifier une certification C_ARP2P après un projet",
      client: "Consultante junior, sortie d'un déploiement Ariba Buying de 9 mois",
      situation: "Après un projet centré sur la facturation, la consultante doit passer la certification Procurement dont le périmètre dépasse largement ce qu'elle a pratiqué.",
      challenge: "Identifier les zones non couvertes par l'expérience projet (catalogues, administration, Guided Buying) et les combler sans y consacrer plus de deux heures par jour.",
      approach: [
        "Passer tous les quiz du parcours en deux jours pour obtenir une mesure objective par module.",
        "Générer la synthèse et concentrer les révisions sur les modules sous 70 %.",
        "Refaire les exercices de catalogues (CIF, PunchOut) et d'administration (imports, groupes) avec les corrigés.",
        "Vérifier sur SAP Learning la pondération officielle des thèmes et ajuster le plan de sept jours.",
        "Passer l'examen blanc deux fois à trois jours d'intervalle et comparer les notions ratées.",
      ],
      outcome: "Score à l'examen blanc passé de 62 % à 84 % en dix jours ; certification obtenue à la première tentative.",
      lesson: "Mesurer avant de réviser : l'expérience projet crée des zones de confort trompeuses que seuls les quiz révèlent.",
    },
  ],
  glossary: [
    { moduleId: "m10", term: "SAP Certified Associate", definition: "Niveau de certification SAP validant les connaissances fondamentales d'une solution ; pour SAP Ariba, plusieurs examens couvrent le P2P, le sourcing, les contrats, la gestion fournisseurs, les catalogues et l'intégration." },
    { moduleId: "m10", term: "Examen blanc", definition: "Simulation d'examen en conditions réelles (temps limité, questions transversales) servant à mesurer la préparation et à identifier les notions à revoir." },
    { moduleId: "m10", term: "Fiche de révision active", definition: "Carte question/réponse courte utilisée pour s'auto-tester ; la réponse est formulée avec le vocabulaire exact de la solution." },
    { moduleId: "m10", term: "Indice de préparation", definition: "Score synthétique du parcours combinant l'avancement des activités, les meilleurs scores aux quiz et le nombre de notions non maîtrisées." },
    { moduleId: "m10", term: "SAP Learning", definition: "Plateforme officielle SAP où sont publiés les descriptifs d'examens (thèmes, pondérations, nombre de questions, durée) et les parcours d'apprentissage." },
    { moduleId: "m10", term: "Soutenance", definition: "Présentation orale structurée d'une solution (architecture, choix, risques, plan) devant un comité ou un jury ; exercice clé du consultant." },
    { moduleId: "m10", term: "Cutover", definition: "Phase de bascule entre l'ancien et le nouveau système : gel des données, chargements initiaux, activation des flux, ouverture aux utilisateurs, hypercare." },
    { moduleId: "m10", term: "Hypercare", definition: "Période de support renforcé après le go-live, avec surveillance rapprochée des flux d'intégration, des factures bloquées et des demandes utilisateurs." },
  ],
  faq: [
    { moduleId: "m10", q: "Quelle certification SAP Ariba passer en premier ?", a: "Pour un profil technico-fonctionnel, C_ARP2P (Procurement) est la plus transversale et la plus demandée ; C_ARCIG (intégration) la complète idéalement si vous travaillez sur des projets S/4HANA intégrés. Les certifications Sourcing, Contracts et Supplier Management se préparent ensuite selon vos missions." },
    { moduleId: "m10", q: "Combien de questions et combien de temps pour l'examen ?", a: "Les examens SAP Certified Associate comportent généralement 80 questions en 180 minutes, avec un seuil de réussite propre à chaque examen. Vérifiez toujours la fiche officielle sur SAP Learning : format, pondération des thèmes et seuil peuvent changer d'une version à l'autre." },
    { moduleId: "m10", q: "Faut-il un accès à un realm Ariba pour réussir ?", a: "Ce n'est pas indispensable : l'examen teste la compréhension des processus, des objets et du paramétrage plus que la manipulation des écrans. Un accès à un realm de test ou à un environnement de démonstration accélère toutefois la mémorisation du vocabulaire." },
    { moduleId: "m10", q: "Comment interpréter un indice de préparation de 65 % ?", a: "Vous avez couvert l'essentiel mais des modules restent fragiles. Repérez dans la synthèse les modules « À consolider » et les notions à revoir, refaites les quiz concernés jusqu'à dépasser 80 %, puis régénérez la synthèse avant de vous inscrire." },
    { moduleId: "m10", q: "Que réviser la veille de l'examen ?", a: "Refaites la cartographie des flux de mémoire, relisez uniquement vos notions à revoir encore ouvertes et vos fiches ratées, puis arrêtez. Le repos compte davantage qu'une relecture complète du parcours." },
    { moduleId: "m10", q: "Le cas final est-il représentatif de l'examen ?", a: "Pas de son format (l'examen est un QCM), mais de son fond : les questions d'examen portent sur les mêmes décisions d'architecture, de paramétrage et de traitement des erreurs. Le cas final sert aussi de préparation aux entretiens et aux soutenances de projet." },
  ],
};
