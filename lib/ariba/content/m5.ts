import type { ModuleContent } from "../types";

export const m5: ModuleContent = {
  moduleId: "m5",
  activities: [
    // ───────────────────────── Semaine 4 · Jour 1 ─────────────────────────
    {
      id: "m5-s4-j1-a1",
      moduleId: "m5",
      week: 4,
      day: 1,
      kind: "lecon",
      title: "L'espace de travail contractuel (Contract Workspace)",
      level: "debutant",
      durationMin: 25,
      objective: "Comprendre la structure d'un Contract Workspace, ses types, sa hiérarchie et le rôle des modèles et de la bibliothèque de clauses.",
      content: `## Pourquoi SAP Ariba Contracts ?

SAP Ariba Contracts (module **CLM**, Contract Lifecycle Management) centralise la création, la négociation, la signature et le suivi des contrats. Côté consultant, l'enjeu est double : fiabiliser le processus juridique et rendre les engagements négociés **exploitables dans les achats** (prix, limites, fournisseurs préférés).

## Les trois types de Contract Workspace

| Type | Usage | Exemple |
|---|---|---|
| **Procurement Contract Workspace** | Contrats avec des fournisseurs | Accord-cadre de prestations IT |
| **Sales Contract Workspace** | Contrats avec des clients | Contrat de vente d'équipements |
| **Internal Contract Workspace** | Accords internes, documents non commerciaux | Charte inter-filiales, NDA interne |

Dans un projet achats, on travaille presque toujours avec le **Procurement Contract Workspace**. Un **Contract Request** peut précéder le workspace : il permet à un demandeur sans licence complète de solliciter la création d'un contrat, soumis à approbation.

## Anatomie d'un workspace

Un Contract Workspace est un **projet** Ariba. Il contient :

- **L'en-tête** : fournisseur (Supplier), commodité, région, département, dates d'effet et d'expiration, montant du contrat, propriétaire, type d'accord.
- **Le Main Agreement** : le document contractuel principal, souvent généré depuis un **modèle Word** avec des champs fusionnés et des clauses issues de la **Clause Library**.
- **Les documents** : annexes, pièces jointes, documents de négociation, versions successives.
- **Les Contract Terms** : lignes de contrat (**Contract Line Items**) et conditions tarifaires (**Pricing Terms**) qui seront ensuite poussées vers Ariba Buying pour la conformité contractuelle.
- **Les phases et tâches** : revue, approbation, négociation, signature, publication.
- **L'équipe** : groupes projet (Project Owner, Contract Manager, Legal, Observers) qui déterminent les droits.

## Hiérarchie : Master Agreement et Sub-Agreements

Un **Master Agreement** (accord-cadre) peut porter des **Sub-Agreements** (contrats d'application, SOW, bons de commande ouverts). La hiérarchie permet d'hériter des conditions générales du parent et de cumuler les engagements au niveau global.

> Bonne pratique consultant : définir la hiérarchie dès l'atelier de cadrage. Reconstituer une hiérarchie après publication est coûteux et source d'erreurs de reporting.

## Modèles (templates) et Clause Library

Le **Contract Workspace Template** standardise : les champs d'en-tête, les documents obligatoires, les phases et tâches, les flux d'approbation conditionnels et les groupes d'équipe. Il se crée depuis le menu **Manage > Templates**.

La **Clause Library** stocke les clauses juridiques validées (standard, alternative, de repli). Chaque clause porte un propriétaire, une catégorie et un indicateur de risque. Lorsqu'une clause est modifiée dans le Main Agreement, Ariba détecte la déviation et peut imposer une approbation juridique.

## Statuts d'un contrat

\`Draft\` → \`Published\` → \`Expired\` ou \`Closed\`. Un contrat **Published** est visible dans la recherche, déclenche les notifications d'expiration et alimente Contract Compliance. Les contrats historiques sont saisis en **Legacy Contract** (sans processus de création, uniquement pour le référentiel et le reporting).`,
      keyPoints: [
        "Trois types de workspace : Procurement, Sales, Internal ; en achats on utilise surtout le Procurement Contract Workspace.",
        "Le workspace est un projet : en-tête, Main Agreement, documents, Contract Terms, phases/tâches, équipe.",
        "La hiérarchie Master Agreement / Sub-Agreement se décide au cadrage, jamais après publication.",
        "Le template standardise champs, documents, tâches et approbations ; la Clause Library sécurise le contenu juridique.",
        "Les statuts Draft, Published, Expired, Closed pilotent la visibilité, les notifications et la conformité contractuelle.",
        "Le Legacy Contract sert à intégrer l'historique sans rejouer le processus.",
      ],
    },
    {
      id: "m5-s4-j1-a2",
      moduleId: "m5",
      week: 4,
      day: 1,
      kind: "exercice",
      title: "Concevoir un modèle de Contract Workspace",
      level: "debutant",
      durationMin: 40,
      objective: "Traduire une politique contractuelle en modèle de workspace : champs, documents, équipe et hiérarchie.",
      context: `## Situation

Le groupe **Noralis** (distribution spécialisée, 2 500 salariés, 3 pays) déploie SAP Ariba Contracts. Aujourd'hui, les contrats fournisseurs sont stockés dans des dossiers partagés, sans suivi d'expiration. La direction achats veut :

- un accord-cadre par fournisseur stratégique, avec des contrats d'application par pays ;
- des champs obligatoires : catégorie, pays, montant estimé, indice de révision des prix, clause RGPD applicable ;
- une revue juridique systématique au-delà de 250 000 € ;
- un accès en lecture seule pour le contrôle de gestion.

Vous animez l'atelier de conception du **template Procurement Contract Workspace**.`,
      steps: [
        "Listez les champs d'en-tête standards à conserver et les champs personnalisés à ajouter (type, obligatoire ou non, liste de valeurs).",
        "Définissez la hiérarchie : quel workspace est le Master Agreement, quels Sub-Agreements, quelles données héritées.",
        "Identifiez les documents obligatoires du template (Main Agreement, annexes, grille tarifaire) et le modèle Word du Main Agreement.",
        "Proposez les groupes d'équipe (Project Owner, Contract Manager, Legal, Finance Observer) et leurs droits.",
        "Décrivez la condition de visibilité de la tâche d'approbation juridique (montant > 250 000 €).",
        "Rédigez la liste des rappels d'expiration (ex. 90 / 60 / 30 jours) et les destinataires.",
        "Formalisez le tout dans une fiche de conception d'une page.",
      ],
      deliverable: "Une fiche de conception du template : tableau des champs, schéma de hiérarchie, liste des documents, matrice équipe/droits et règles d'approbation conditionnelle.",
      solution: `## Corrigé type

**Champs d'en-tête** : conserver Supplier, Commodity, Region, Effective Date, Expiration Date, Contract Amount, Hierarchical Type. Ajouter des champs personnalisés : *Pays contractant* (liste : FR, BE, ES), *Indice de révision des prix* (liste : fixe, Syntec, INSEE), *Clause RGPD* (Oui/Non), *Montant estimé 3 ans* (montant). Tous obligatoires sauf l'indice de révision.

**Hiérarchie** : le Master Agreement porte les conditions générales et le fournisseur ; chaque contrat d'application pays est un **Sub-Agreement** rattaché au parent, héritant du fournisseur, de la catégorie et de la date d'expiration maximale. Le montant engagé se cumule au niveau du Master.

**Documents** : Main Agreement généré depuis le modèle Word \`Accord-cadre Noralis v3\` avec clauses de la Clause Library (paiement, responsabilité, RGPD standard et alternative). Annexes obligatoires : grille tarifaire (Contract Terms importés via Excel) et plan d'assurance qualité.

**Équipe** : Project Owner (acheteur), Contract Manager (acheteur senior), Legal (direction juridique, droit d'édition sur le Main Agreement), Finance Observer (contrôle de gestion, lecture seule via le groupe Observers).

**Approbation conditionnelle** : la tâche *Revue juridique* est ajoutée au template avec la condition \`Contract Amount > 250 000 EUR\` ; en dessous, une tâche de revue acheteur suffit. Une seconde condition rend obligatoire la revue juridique si une clause de la Clause Library a été modifiée.

**Notifications** : rappels d'expiration à 90, 60 et 30 jours au Project Owner et au Contract Manager ; copie à Legal à 30 jours pour décider d'un renouvellement.`,
      tips: [
        "Ne créez pas de champ personnalisé pour une information déjà couverte par un champ standard : cela casse le reporting prédéfini.",
        "Faites valider la hiérarchie avec la finance : c'est elle qui exploite le cumul des engagements.",
        "Testez le template avec un contrat réel avant publication : les conditions d'approbation se vérifient avec des données concrètes.",
      ],
    },
    {
      id: "m5-s4-j1-a3",
      moduleId: "m5",
      week: 4,
      day: 1,
      kind: "quiz",
      title: "Quiz : structure et modèles de contrat",
      level: "debutant",
      durationMin: 12,
      objective: "Vérifier la maîtrise des types de workspace, de la hiérarchie et de la Clause Library.",
      questions: [
        {
          id: "m5-s4-j1-q1",
          question: "Quel type de Contract Workspace utilise-t-on pour un accord-cadre avec un fournisseur de prestations informatiques ?",
          options: ["Sales Contract Workspace", "Internal Contract Workspace", "Procurement Contract Workspace", "Sourcing Project"],
          answer: 2,
          explanation: "Le Procurement Contract Workspace est conçu pour les contrats avec les fournisseurs : il porte les champs Supplier, Commodity et les Contract Terms réutilisables en conformité d'achat. Le Sales Contract Workspace sert aux contrats avec des clients. L'Internal Contract Workspace couvre les accords internes sans contrepartie commerciale. Le Sourcing Project appartient au module Sourcing : il peut aboutir à la création d'un contrat, mais il n'est pas lui-même un contrat.",
          concept: "Types de Contract Workspace",
        },
        {
          id: "m5-s4-j1-q2",
          question: "À quoi sert un Contract Request ?",
          options: [
            "À signer électroniquement un contrat",
            "À permettre à un demandeur de solliciter la création d'un contrat soumis à approbation",
            "À importer en masse des contrats historiques",
            "À créer une clause dans la Clause Library",
          ],
          answer: 1,
          explanation: "Le Contract Request est un objet léger qui permet à un utilisateur (souvent sans licence complète de Contract Manager) de demander un contrat ; après approbation, un Contract Workspace est créé à partir de la demande. La signature électronique passe par une tâche de signature (DocuSign ou Adobe Sign). L'import de contrats historiques se fait via les Legacy Contracts ou l'import de données. La création d'une clause s'effectue directement dans la Clause Library par un administrateur juridique.",
          concept: "Contract Request",
        },
        {
          id: "m5-s4-j1-q3",
          question: "Quelle affirmation sur la hiérarchie Master Agreement / Sub-Agreement est exacte ?",
          options: [
            "Un Sub-Agreement ne peut pas avoir de fournisseur différent du Master et hérite de certaines données du parent",
            "La hiérarchie se définit uniquement après la publication du contrat",
            "Un Master Agreement est obligatoirement un Sales Contract Workspace",
            "Les Sub-Agreements ne peuvent pas contenir de Contract Terms",
          ],
          answer: 0,
          explanation: "Le Sub-Agreement est rattaché à un Master Agreement avec le même fournisseur et hérite de données d'en-tête, ce qui permet de cumuler les engagements au niveau du parent. La hiérarchie se fixe à la création (type hiérarchique Stand-alone, Master ou Sub) et il est déconseillé de la modifier après publication. Le type hiérarchique est indépendant du type de workspace (Procurement, Sales, Internal). Les Sub-Agreements portent très souvent des Contract Terms, par exemple les prix d'un contrat d'application.",
          concept: "Hiérarchie des contrats (Master / Sub-Agreement)",
        },
        {
          id: "m5-s4-j1-q4",
          question: "Quel est le rôle principal de la Clause Library ?",
          options: [
            "Stocker les factures liées au contrat",
            "Gérer les comptes utilisateurs de la direction juridique",
            "Centraliser des clauses juridiques validées, réutilisables dans le Main Agreement et détecter les déviations",
            "Calculer les économies réalisées sur un contrat",
          ],
          answer: 2,
          explanation: "La Clause Library est le référentiel de clauses standard, alternatives et de repli ; elle alimente les modèles Word du Main Agreement et permet de signaler toute modification d'une clause pour déclencher une approbation juridique. Les factures sont gérées dans Ariba Buying & Invoicing, pas dans la bibliothèque de clauses. Les comptes utilisateurs relèvent de l'administration (Ariba Administrator). Le suivi des économies est une fonction du Sourcing (Savings Form) et du reporting.",
          concept: "Clause Library et déviations",
        },
        {
          id: "m5-s4-j1-q5",
          question: "Un contrat signé en 2019 avant le déploiement d'Ariba doit être référencé pour le reporting et les alertes d'expiration, sans rejouer le processus de rédaction. Quelle option est la plus adaptée ?",
          options: [
            "Créer un Sourcing Project",
            "Créer un Legacy Contract",
            "Créer un Contract Request",
            "Ajouter le PDF dans la Clause Library",
          ],
          answer: 1,
          explanation: "Le Legacy Contract est précisément prévu pour intégrer des contrats existants : on renseigne l'en-tête, on joint le document signé et le contrat est publié sans phases de négociation ni de signature, tout en bénéficiant des notifications et du reporting. Un Sourcing Project sert à mener une consultation. Un Contract Request déclencherait un nouveau processus de création. La Clause Library ne stocke que des clauses, pas des contrats signés.",
          concept: "Legacy Contract",
        },
      ],
    },

    // ───────────────────────── Semaine 4 · Jour 2 ─────────────────────────
    {
      id: "m5-s4-j2-a1",
      moduleId: "m5",
      week: 4,
      day: 2,
      kind: "lecon",
      title: "Phases, tâches, approbations et signature électronique",
      level: "intermediaire",
      durationMin: 25,
      objective: "Maîtriser le workflow contractuel : phases, types de tâches, approbations conditionnelles, négociation et signature DocuSign/Adobe Sign.",
      content: `## Le workflow d'un contrat dans Ariba

Le cycle de vie d'un Contract Workspace est orchestré par des **phases** (regroupements logiques) contenant des **tâches**. Le template fixe la séquence, les prédécesseurs et les conditions d'affichage.

| Type de tâche | Rôle | Exemple |
|---|---|---|
| **To Do** | Action simple à cocher | Vérifier le Kbis du fournisseur |
| **Review** | Relecture d'un document avec commentaires | Revue du Main Agreement par les achats |
| **Approval** | Approbation formelle (flux séquentiel ou parallèle) | Validation juridique si montant > seuil |
| **Negotiation** | Échange de versions du document avec le fournisseur | Négociation des conditions de paiement |
| **Signature** | Signature électronique via DocuSign ou Adobe Sign | Signature des deux parties |
| **Notification** | Envoi d'un e-mail automatique | Informer la finance de la publication |

## Approbations conditionnelles

Les tâches d'approbation peuvent être **requises** (obligatoires avant publication) et **conditionnelles**. La condition s'appuie sur les champs d'en-tête (montant, région, commodité, champs personnalisés) ou sur des événements, par exemple **une clause de la Clause Library a été modifiée**. Le flux peut être séquentiel, parallèle ou mixte, avec des approbateurs nommés ou des groupes projet.

> Règle d'or : les approbateurs sont définis par **groupe projet** plutôt que par personne nommée. Le turnover ne doit jamais bloquer un contrat.

## La négociation

La tâche de **Negotiation** envoie le document au contact fournisseur, qui le reçoit par e-mail (avec ou sans compte Ariba Network). Chaque aller-retour crée une **nouvelle version** du Main Agreement ; les modifications apportées aux clauses sont suivies (mode révision Word) et comparées à la version de référence. L'historique complet constitue la **piste d'audit** (audit trail).

## Signature électronique

Ariba s'intègre nativement à **DocuSign** et **Adobe Sign**. La tâche de signature :

1. assemble le ou les documents à signer (Main Agreement + annexes) ;
2. définit l'ordre des signataires (fournisseur puis interne, ou l'inverse) ;
3. suit le statut (Sent, Signed, Declined) ;
4. rapatrie le PDF signé et son certificat dans le workspace.

Le paramétrage consiste à créer le compte entreprise DocuSign/Adobe Sign, l'autoriser dans Ariba (**Manage > Administration > eSignature**) et déclarer les signataires autorisés.

## Publication et amendements

La **publication** (Publish) fige la version contractuelle : le contrat passe en statut \`Published\`, devient visible dans la recherche et alimente Contract Compliance. Toute modification ultérieure passe par un **amendement**, qui réouvre le workspace selon un type :

- **Administrative** : correction d'en-tête sans impact juridique (orthographe, propriétaire).
- **Amendment** : modification des termes, nécessitant généralement une nouvelle signature.
- **Renewal** : prolongation de la durée.
- **Termination** : résiliation anticipée.

Chaque type peut avoir son propre jeu de tâches dans le template (par ex. le Renewal réactive l'approbation juridique).`,
      keyPoints: [
        "Phases et tâches (To Do, Review, Approval, Negotiation, Signature, Notification) structurent le workflow et viennent du template.",
        "Les approbations conditionnelles s'appuient sur les champs d'en-tête ou la modification d'une clause de la Clause Library.",
        "Nommer des groupes projet comme approbateurs, pas des individus.",
        "La négociation versionne le Main Agreement et constitue la piste d'audit.",
        "DocuSign et Adobe Sign sont intégrés : ordre des signataires, suivi des statuts, PDF signé rapatrié.",
        "Après publication, toute modification passe par un amendement : Administrative, Amendment, Renewal, Termination.",
      ],
    },
    {
      id: "m5-s4-j2-a2",
      moduleId: "m5",
      week: 4,
      day: 2,
      kind: "simulation",
      title: "Simulation : atelier de cadrage du processus contractuel avec la direction juridique",
      level: "intermediaire",
      durationMin: 45,
      objective: "Animer un atelier de cadrage, arbitrer entre exigences juridiques et fluidité du processus, et produire un schéma de workflow paramétrable.",
      context: `## Mise en situation

Vous êtes consultant SAP Ariba chez **Helvéa Pharma** (industrie pharmaceutique, 4 000 salariés). La direction juridique (3 juristes) exige de relire **tous** les contrats avant signature ; les achats (12 acheteurs) se plaignent de délais de 6 semaines. La conformité impose une traçabilité complète des modifications de clauses pour les audits GxP.

Participants à l'atelier : la directrice juridique, le responsable achats indirects, le responsable conformité, un futur administrateur Ariba.

Objectif de l'atelier : définir les phases, les tâches, les conditions d'approbation et le mode de signature du futur template, en réduisant le délai moyen à 3 semaines sans dégrader le contrôle juridique.`,
      steps: [
        "Préparez une grille des exigences de chaque partie prenante (juridique, achats, conformité) et des points de friction.",
        "Proposez une segmentation des contrats (par montant, par usage d'un modèle standard, par modification de clause) qui détermine le niveau de revue.",
        "Dessinez le workflow en phases et tâches avec prédécesseurs : préparation, revue, négociation, approbation, signature, publication.",
        "Rédigez les conditions d'approbation juridique (champ de déclenchement, seuil, détection de clause modifiée).",
        "Décidez du mode de signature (DocuSign ou Adobe Sign), de l'ordre des signataires et du traitement des contrats papier résiduels.",
        "Anticipez les objections de la directrice juridique (perte de contrôle) et préparez vos arguments fondés sur la piste d'audit et la Clause Library.",
        "Formalisez un compte rendu d'atelier : décisions, points ouverts, prochaines étapes.",
      ],
      deliverable: "Un compte rendu d'atelier avec le schéma de workflow (phases/tâches/conditions), la règle de segmentation des contrats et la liste des décisions prises et des points ouverts.",
      solution: `## Corrigé type

**Segmentation retenue** : trois niveaux.
- *Niveau 1 – Standard* : contrat généré depuis un modèle Word approuvé, aucune clause modifiée, montant < 100 000 €. Revue acheteur senior uniquement ; le juridique est notifié.
- *Niveau 2 – Supervisé* : montant entre 100 000 € et 500 000 € ou une clause alternative choisie dans la Clause Library. Tâche d'approbation juridique en parallèle de l'approbation achats.
- *Niveau 3 – Critique* : montant > 500 000 €, clause modifiée hors bibliothèque ou fournisseur à risque GxP. Revue juridique séquentielle, puis approbation du directeur achats.

**Workflow** :
1. Phase *Préparation* : To Do « Compléter l'en-tête », génération du Main Agreement depuis le modèle.
2. Phase *Revue interne* : Review achats ; Approval juridique conditionnelle (\`Contract Amount >= 100 000\` OU \`Clause modifiée = Oui\`).
3. Phase *Négociation* : tâche Negotiation avec le fournisseur, limitée à 3 cycles avant escalade.
4. Phase *Approbation finale* : Approval directeur achats si niveau 3.
5. Phase *Signature* : Signature DocuSign, fournisseur d'abord puis signataire interne habilité ; les contrats papier résiduels sont scannés dans une tâche To Do « Joindre l'original signé ».
6. Phase *Publication* : Notification à la finance et à la conformité.

**Réponse à l'objection « perte de contrôle »** : la Clause Library impose les clauses validées ; toute déviation est détectée automatiquement et redirige vers le juridique. La piste d'audit (versions, commentaires, approbations horodatées) répond aux exigences GxP mieux que la relecture manuelle actuelle.

**Points ouverts** : seuils à confirmer par le comité achats ; habilitations de signature à aligner avec la délégation de pouvoirs ; décision sur le statut des contrats historiques (Legacy).

**Gain attendu** : 60 % des contrats passent en niveau 1, réduisant le délai moyen à environ 3 semaines.`,
      tips: [
        "Chiffrez : combien de contrats par niveau ? Un chiffre convainc davantage qu'un schéma.",
        "Ne promettez pas un paramétrage que le template ne permet pas : vérifiez que chaque condition s'appuie sur un champ existant.",
        "Gardez la juridique propriétaire de la Clause Library : c'est son levier de contrôle.",
      ],
    },
    {
      id: "m5-s4-j2-a3",
      moduleId: "m5",
      week: 4,
      day: 2,
      kind: "quiz",
      title: "Quiz : workflow, approbation et signature",
      level: "intermediaire",
      durationMin: 12,
      objective: "Valider la compréhension des tâches, des approbations conditionnelles, de la signature et des amendements.",
      questions: [
        {
          id: "m5-s4-j2-q1",
          question: "Quelle tâche permet d'échanger des versions du Main Agreement avec le fournisseur et de conserver l'historique des modifications ?",
          options: ["To Do", "Negotiation", "Notification", "Review"],
          answer: 1,
          explanation: "La tâche Negotiation envoie le document au fournisseur, récupère sa version et crée une nouvelle version suivie dans le workspace : c'est le cœur de la piste d'audit contractuelle. La tâche To Do est une simple action à cocher sans échange de document. La Notification envoie un e-mail sans attendre de retour. La Review organise une relecture interne avec commentaires, mais n'est pas destinée à l'échange avec la contrepartie.",
          concept: "Types de tâches du workflow contractuel",
        },
        {
          id: "m5-s4-j2-q2",
          question: "Comment déclencher automatiquement une approbation juridique uniquement quand une clause standard a été modifiée ?",
          options: [
            "Il faut créer manuellement la tâche à chaque contrat",
            "En configurant une tâche d'approbation conditionnelle dans le template, basée sur la détection de modification de clause de la Clause Library",
            "En désactivant la Clause Library",
            "En passant le contrat en Legacy Contract",
          ],
          answer: 1,
          explanation: "Les tâches d'approbation du template acceptent des conditions, dont la modification d'une clause issue de la Clause Library ; la tâche n'apparaît que si la condition est remplie. Créer la tâche à la main revient à perdre la standardisation et la fiabilité. Désactiver la Clause Library supprimerait justement la détection des déviations. Le Legacy Contract ne passe par aucun workflow de création : il ne résout pas le besoin.",
          concept: "Approbations conditionnelles",
        },
        {
          id: "m5-s4-j2-q3",
          question: "Quelles solutions de signature électronique sont intégrées nativement à SAP Ariba Contracts ?",
          options: ["DocuSign et Adobe Sign", "Yousign et HelloSign", "Uniquement DocuSign", "Aucune : la signature est toujours manuelle"],
          answer: 0,
          explanation: "Ariba Contracts propose une intégration standard avec DocuSign et Adobe Sign via la tâche Signature : envoi des documents, ordre des signataires, suivi des statuts et rapatriement du PDF signé. Yousign et HelloSign ne sont pas intégrés nativement. Limiter la réponse à DocuSign est incomplet puisque Adobe Sign est également supporté. La signature manuelle reste possible (document scanné joint), mais elle n'est pas la seule option.",
          concept: "Signature électronique (DocuSign / Adobe Sign)",
        },
        {
          id: "m5-s4-j2-q4",
          question: "Un contrat publié doit être prolongé de 12 mois sans changement des prix. Quel type d'amendement choisir ?",
          options: ["Administrative", "Termination", "Renewal", "Amendment"],
          answer: 2,
          explanation: "Le Renewal est l'amendement dédié à la prolongation de la durée : il met à jour la date d'expiration et peut rejouer les tâches prévues pour ce cas dans le template. L'amendement Administrative ne corrige que des données d'en-tête sans portée juridique. Termination sert à résilier le contrat avant son terme. Amendment modifie les termes contractuels (prix, périmètre) et impliquerait souvent une nouvelle négociation, inutile ici.",
          concept: "Types d'amendement",
        },
        {
          id: "m5-s4-j2-q5",
          question: "Pourquoi recommande-t-on de désigner les approbateurs par groupe projet plutôt que par utilisateur nommé ?",
          options: [
            "Parce que les utilisateurs nommés ne peuvent pas approuver dans Ariba",
            "Pour que le départ ou l'absence d'une personne ne bloque pas le workflow et pour simplifier la maintenance du template",
            "Parce que les groupes projet réduisent le coût des licences",
            "Parce qu'un groupe ne peut contenir qu'une seule personne",
          ],
          answer: 1,
          explanation: "Un groupe projet (par ex. Legal) est alimenté par les membres de l'équipe du workspace : si une personne quitte l'entreprise ou est absente, il suffit de modifier le groupe, sans toucher au template ni rouvrir le contrat. Les utilisateurs nommés peuvent approuver, mais figent le processus sur une personne. Les groupes n'ont pas d'incidence sur le coût des licences. Un groupe peut évidemment contenir plusieurs membres, c'est tout l'intérêt.",
          concept: "Équipe projet et groupes d'approbation",
        },
      ],
    },

    // ───────────────────────── Semaine 4 · Jour 3 ─────────────────────────
    {
      id: "m5-s4-j3-a1",
      moduleId: "m5",
      week: 4,
      day: 3,
      kind: "lecon",
      title: "Contract Compliance : rendre le contrat opérationnel dans Ariba Buying",
      level: "intermediaire",
      durationMin: 25,
      objective: "Comprendre comment les Contract Terms sont exploités par Ariba Buying & Invoicing : types de conformité, release orders, accumulateurs et reporting.",
      content: `## Du contrat juridique au contrat opérationnel

Un contrat publié dans Ariba Contracts n'a de valeur achats que s'il est **appliqué** lors des commandes et des factures. C'est le rôle de **Contract Compliance** dans Ariba Buying & Invoicing : les **Contract Terms** (lignes, prix, limites) sont publiés vers Buying sous forme de **contrat de conformité** (Compliance Contract), identifié par un numéro de type \`CW...\` côté Contracts et \`C...\` côté Buying.

## Les trois types de conformité

| Type | Portée | Usage typique |
|---|---|---|
| **Item-level** | Articles précis avec prix négociés | Catalogue de consommables, pièces de rechange |
| **Supplier-level** | Tout achat auprès du fournisseur, sans détail d'articles | Prestations intellectuelles, maintenance |
| **Commodity-level** | Une catégorie d'achat chez un fournisseur | Fournitures de bureau, catégorie UNSPSC |

Au niveau article, Ariba contrôle le prix et peut l'appliquer automatiquement à la demande d'achat. Aux niveaux fournisseur et commodité, le contrat sert surtout à **cumuler les dépenses** et à vérifier les plafonds.

## Release orders et no-release orders

- **Release order** : chaque demande d'achat référençant le contrat génère un **bon de commande d'appel** (release) envoyé au fournisseur, qui consomme l'engagement. C'est le mode standard pour les biens et prestations récurrents.
- **No-release order** : le contrat sert de référence pour la facturation directe sans bon de commande (par ex. loyers, abonnements, honoraires). Le fournisseur facture contre le contrat ; Ariba rapproche la facture avec les Contract Terms.

## Accumulateurs et limites

Les **accumulateurs** suivent les montants et quantités consommés par contrat, par ligne ou par fournisseur. On définit :

- un **montant maximal** (Maximum Commitment) et un **montant minimal** ;
- des **tolérances** (dépassement autorisé en %) ;
- des **seuils d'alerte** (par ex. notification à 80 %) ;
- l'action en cas de dépassement : blocage, approbation supplémentaire ou simple avertissement.

> Les accumulateurs se remettent à zéro uniquement par amendement ou nouvelle version du contrat : anticipez les contrats pluriannuels avec des limites annuelles.

## Cycle de mise à jour

1. Création/modification des Contract Terms dans le workspace (saisie ou import Excel).
2. Publication du contrat ; les termes sont poussés vers Buying.
3. En cas de changement de prix, un **amendement** crée une nouvelle version ; l'ancienne version reste consultable pour les commandes passées.
4. L'expiration ou la fermeture du contrat rend les termes inutilisables pour de nouvelles demandes.

## Recherche, reporting et audit

La **recherche de contrats** combine champs d'en-tête, texte intégral et statut. Le reporting prédéfini couvre : contrats expirant à 90 jours, dépenses sous contrat vs hors contrat (**maverick spend**), consommation des accumulateurs, délai moyen de cycle. La **piste d'audit** (History) enregistre chaque action sur le workspace : modification de champ, version de document, approbation, publication.`,
      keyPoints: [
        "Contract Compliance transforme les Contract Terms publiés en contrat opérationnel exploitable par Buying & Invoicing.",
        "Trois types : item-level (prix par article), supplier-level (toutes dépenses du fournisseur), commodity-level (catégorie).",
        "Release order = bon de commande d'appel par demande ; no-release order = facturation directe contre le contrat.",
        "Les accumulateurs suivent la consommation avec plafonds, tolérances, seuils d'alerte et actions en cas de dépassement.",
        "Tout changement de prix passe par un amendement qui crée une nouvelle version.",
        "Le reporting mesure la couverture contractuelle et le maverick spend ; l'audit trail trace chaque action.",
      ],
    },
    {
      id: "m5-s4-j3-a2",
      moduleId: "m5",
      week: 4,
      day: 3,
      kind: "exercice",
      title: "Paramétrer la conformité contractuelle de trois contrats",
      level: "intermediaire",
      durationMin: 40,
      objective: "Choisir le type de conformité, le mode de commande et les limites adaptés à des cas réels.",
      context: `## Situation

Chez **Noralis**, trois contrats viennent d'être signés et doivent être rendus opérationnels dans Ariba Buying :

1. **Fournitures de bureau – Papyrus SA** : 420 références à prix négociés, 12 agences commandent chaque semaine, budget annuel 300 000 €.
2. **Nettoyage des locaux – NetPro** : forfait mensuel de 18 500 € par site pour 6 sites, facturation mensuelle sans commande, durée 3 ans.
3. **Conseil en organisation – Alterys** : accord-cadre de 900 000 € sur 2 ans, missions commandées au fil de l'eau par bon de commande, tarif journalier par profil (junior, senior, directeur).

Le contrôle de gestion veut être alerté à 80 % de consommation et bloquer tout dépassement sans approbation du directeur achats.`,
      steps: [
        "Pour chaque contrat, déterminez le type de conformité (item, supplier, commodity) et justifiez.",
        "Choisissez release order ou no-release order pour chacun.",
        "Définissez les Contract Terms à saisir : lignes, prix, unités, périodicité.",
        "Paramétrez les accumulateurs : plafond, tolérance, seuil d'alerte, action en cas de dépassement.",
        "Indiquez comment gérer la limite annuelle du contrat NetPro sur 3 ans.",
        "Précisez le flux d'approbation à prévoir côté demande d'achat en cas de dépassement.",
      ],
      deliverable: "Un tableau de paramétrage (3 lignes) : type de conformité, mode de commande, Contract Terms, accumulateurs, règles d'alerte et de blocage, plus une note sur la gestion pluriannuelle.",
      solution: `## Corrigé type

| Contrat | Type | Mode | Contract Terms | Accumulateurs |
|---|---|---|---|---|
| Papyrus (fournitures) | **Item-level** : 420 articles à prix fixes, applicables automatiquement dans les demandes | **Release order** : chaque demande crée une commande d'appel vers Papyrus | 420 lignes importées via Excel (référence, désignation, prix, unité, code UNSPSC) | Plafond 300 000 €, tolérance 5 %, alerte 80 %, dépassement → approbation directeur achats |
| NetPro (nettoyage) | **Supplier-level** : forfait sans articles détaillés ; le contrôle porte sur le montant | **No-release order** : NetPro facture mensuellement contre le contrat, sans bon de commande | 6 lignes de service (une par site) à 18 500 €/mois pour le rapprochement de facture | Plafond annuel 1 332 000 € (6 × 18 500 × 12) |
| Alterys (conseil) | **Item-level sur services** : 3 lignes de tarif journalier (junior, senior, directeur) | **Release order** : chaque mission fait l'objet d'un bon de commande d'appel | 3 lignes de prix unitaires (TJM) sans quantité fixe | Plafond 900 000 € sur 2 ans, alerte 80 %, blocage au-delà sans approbation |

**Gestion pluriannuelle NetPro** : un contrat Master sur 3 ans avec un **Sub-Agreement par an** portant le plafond annuel, ou un amendement **Renewal** annuel qui réinitialise l'accumulateur. La première option donne un reporting annuel plus lisible.

**Flux d'approbation** : dans Ariba Buying, règle d'approbation sur la demande d'achat déclenchée quand le contrat référencé dépasse son plafond (condition sur l'accumulateur), ajoutant le directeur achats comme approbateur. Le seuil d'alerte à 80 % envoie une notification au Contract Manager et au contrôle de gestion.`,
      tips: [
        "Les contrats de type supplier-level ne contrôlent pas les prix : prévenez le client que la vérification tarifaire se fera à la facture.",
        "Importez les Contract Terms via le modèle Excel d'Ariba plutôt que de les saisir : 420 lignes à la main, c'est une source d'erreurs.",
        "Vérifiez que le fournisseur est bien activé sur Ariba Network pour recevoir les release orders.",
      ],
    },
    {
      id: "m5-s4-j3-a3",
      moduleId: "m5",
      week: 4,
      day: 3,
      kind: "quiz",
      title: "Quiz : conformité contractuelle",
      level: "intermediaire",
      durationMin: 12,
      objective: "Contrôler la compréhension des types de conformité, des release orders et des accumulateurs.",
      questions: [
        {
          id: "m5-s4-j3-q1",
          question: "Quel type de Contract Compliance permet d'appliquer automatiquement un prix négocié à chaque article d'une demande d'achat ?",
          options: ["Supplier-level", "Commodity-level", "Item-level", "Legacy-level"],
          answer: 2,
          explanation: "Le contrat item-level contient des lignes d'articles avec prix : lorsque l'utilisateur ajoute l'article, Ariba Buying applique le prix contractuel et rattache la ligne au contrat. Le supplier-level ne porte pas d'articles, il cumule seulement les dépenses auprès du fournisseur. Le commodity-level agit sur une catégorie, sans prix unitaire par article. « Legacy-level » n'existe pas : Legacy qualifie un contrat historique, pas un type de conformité.",
          concept: "Types de Contract Compliance",
        },
        {
          id: "m5-s4-j3-q2",
          question: "Un contrat de location de locaux doit être facturé mensuellement sans émission de bon de commande. Quel mode retenir ?",
          options: ["Release order", "No-release order", "Catalog order", "Spot Buy"],
          answer: 1,
          explanation: "Le no-release order permet au fournisseur de facturer directement contre le contrat ; la facture est rapprochée des Contract Terms sans bon de commande préalable, ce qui correspond aux loyers et abonnements. Le release order génère au contraire une commande d'appel pour chaque demande. Le catalog order n'est pas un mode de conformité contractuelle mais un achat sur catalogue. Spot Buy concerne les achats ponctuels hors contrat sur des places de marché.",
          concept: "Release order et no-release order",
        },
        {
          id: "m5-s4-j3-q3",
          question: "Que mesure un accumulateur dans Contract Compliance ?",
          options: [
            "Le nombre de versions du Main Agreement",
            "Le montant ou la quantité consommée sur le contrat par rapport à ses limites",
            "Le délai moyen de signature",
            "Le nombre de clauses modifiées",
          ],
          answer: 1,
          explanation: "L'accumulateur suit la consommation (montant, quantité) du contrat, d'une ligne ou d'un fournisseur, et la compare aux plafonds, tolérances et seuils d'alerte paramétrés pour déclencher notifications, approbations ou blocages. Le nombre de versions relève de l'historique des documents. Le délai de signature est un indicateur de reporting sur le cycle. Les clauses modifiées sont détectées par la Clause Library, pas par les accumulateurs.",
          concept: "Accumulateurs et limites contractuelles",
        },
        {
          id: "m5-s4-j3-q4",
          question: "Le prix d'un article sous contrat change au 1er janvier. Quelle est la bonne démarche ?",
          options: [
            "Modifier directement le prix dans la demande d'achat",
            "Créer un amendement du contrat pour publier une nouvelle version des Contract Terms",
            "Supprimer le contrat et le recréer",
            "Modifier le prix dans le catalogue sans toucher au contrat",
          ],
          answer: 1,
          explanation: "L'amendement (type Amendment) réouvre le workspace, permet de mettre à jour les Contract Terms puis de republier une nouvelle version, l'ancienne restant consultable pour les commandes passées. Modifier le prix dans la demande contourne le contrat et crée une non-conformité. Supprimer et recréer fait perdre l'historique, les accumulateurs et les références des commandes. Changer le catalogue sans le contrat crée un écart entre prix catalogue et prix contractuel, source de litiges à la facture.",
          concept: "Mise à jour des Contract Terms par amendement",
        },
        {
          id: "m5-s4-j3-q5",
          question: "Quel indicateur de reporting mesure les achats réalisés hors contrat alors qu'un contrat existait ?",
          options: ["Maverick spend", "Savings pipeline", "Cycle time", "Supplier risk exposure"],
          answer: 0,
          explanation: "Le maverick spend désigne les dépenses effectuées hors des contrats négociés ; le reporting Ariba compare les dépenses sous contrat et hors contrat pour le mesurer. Le savings pipeline concerne les économies attendues des projets de sourcing. Le cycle time mesure la durée des processus (contrat, événement). Le supplier risk exposure appartient à Supplier Risk et évalue l'exposition au risque fournisseur, pas la conformité des achats.",
          concept: "Reporting contractuel et maverick spend",
        },
      ],
    },

    // ───────────────────────── Semaine 4 · Jour 4 ─────────────────────────
    {
      id: "m5-s4-j4-a1",
      moduleId: "m5",
      week: 4,
      day: 4,
      kind: "lecon",
      title: "SLP : de la demande fournisseur à la qualification",
      level: "intermediaire",
      durationMin: 25,
      objective: "Décrire le cycle de vie fournisseur dans SAP Ariba Supplier Lifecycle & Performance : demande, enregistrement, qualification, préférence, questionnaires modulaires et synchronisation avec S/4HANA.",
      content: `## Positionnement de SLP

**SAP Ariba Supplier Lifecycle & Performance (SLP)** gère le fournisseur de bout en bout : création (**Supplier Request**), **enregistrement** (Registration), **qualification**, gestion des **fournisseurs préférés**, **disqualification**, performance et risque. Il remplace l'ancien Supplier Information & Performance Management (SIPM) et s'appuie sur des **projets de gestion fournisseur** (Supplier Management Projects) pilotés par des templates.

## Supplier Request

La demande de création peut être **interne** (un acheteur ou un demandeur propose un nouveau fournisseur) ou **externe** (le fournisseur se déclare via un formulaire public). Le questionnaire de demande collecte l'identité (raison sociale, pays, SIRET/TVA), la catégorie et la justification. Un **contrôle de doublons** (Duplicate check) compare nom, identifiant fiscal, adresse et DUNS avec la base existante. Après approbation, le fournisseur est créé avec le statut **Registration not started** et un **SM Vendor ID**.

## Registration

L'enregistrement est un **questionnaire externe** envoyé au contact fournisseur, qui le remplit depuis son compte **Ariba Network** (gratuit pour cet usage). On y trouve : coordonnées bancaires, certificats, conformité (sanctions, anti-corruption), données de facturation. Le questionnaire est soumis à un **flux d'approbation** interne (achats, comptabilité fournisseurs, conformité). Statuts : \`Invited\` → \`In Registration\` → \`Pending Approval\` → \`Registered\`. Les réponses peuvent être **mises à jour** par le fournisseur, chaque mise à jour relançant une approbation.

## Qualification

La qualification valide la capacité d'un fournisseur à livrer une **combinaison commodité × région × département** (la « matrice de qualification »). Elle repose sur un ou plusieurs questionnaires (internes ou externes) et sur une approbation. Statuts : \`Qualification started\` → \`Pending approval\` → \`Qualified\` ou \`Rejected\`. Un fournisseur peut être qualifié pour « Transport – France – Logistique » et non qualifié pour « Transport – Allemagne ».

## Fournisseurs préférés et disqualification

Le **Preferred Supplier Management** attribue un **niveau de préférence** (par ex. Preferred, Strategic, Restricted) par commodité/région, exploité dans Guided Buying et le Sourcing pour orienter les acheteurs. La **disqualification** retire une qualification (non-conformité, incident qualité) avec motif et période ; elle peut bloquer les commandes selon le paramétrage.

## Questionnaires modulaires

Les **Modular Questionnaires** sont des questionnaires indépendants, réutilisables et **à durée de validité** (par ex. certificat ISO 9001 expirant le 31/12). Ils gèrent les **certificats** : date d'expiration, rappels automatiques au fournisseur, statut \`Expiring\` puis \`Expired\`. Ils peuvent être déclenchés par des règles (fournisseur enregistré dans une commodité donnée).

## Supplier 360 et intégration S/4HANA

Le **profil Supplier 360** agrège questionnaires, qualifications, contrats, événements de sourcing, performance et risque. Côté intégration, le fournisseur SLP est synchronisé avec le **Business Partner** S/4HANA : création dans SLP puis réplication vers S/4HANA (ou **MDG-S** si la gouvernance des données de base est centralisée), retour de l'**ERP Vendor ID**, et mise à jour bidirectionnelle des données bancaires et d'adresse via CIG.

> Point de vigilance : décider **où naît la donnée fournisseur** (SLP, MDG-S ou S/4HANA). Un double point de création produit des doublons et des écarts d'identifiants.`,
      keyPoints: [
        "SLP couvre Supplier Request, Registration, Qualification, Preferred Supplier Management, Disqualification, performance et risque.",
        "Le Supplier Request (interne ou externe) intègre un contrôle de doublons avant création du SM Vendor ID.",
        "L'enregistrement est un questionnaire externe rempli via Ariba Network, approuvé en interne ; les mises à jour relancent l'approbation.",
        "La qualification se fait par combinaison commodité × région × département.",
        "Les questionnaires modulaires gèrent certificats et dates d'expiration avec rappels automatiques.",
        "Le fournisseur est synchronisé avec le Business Partner S/4HANA (ou MDG-S) : fixer le système maître de la donnée.",
      ],
    },
    {
      id: "m5-s4-j4-a2",
      moduleId: "m5",
      week: 4,
      day: 4,
      kind: "simulation",
      title: "Simulation : concevoir le questionnaire de qualification avec les achats et la conformité",
      level: "intermediaire",
      durationMin: 45,
      objective: "Construire un dispositif de qualification fournisseur équilibré entre exigences de conformité et effort fournisseur, puis le traduire en paramétrage SLP.",
      context: `## Mise en situation

**Helvéa Pharma** veut qualifier ses fournisseurs de **matières premières** et de **transport sous température dirigée** avant tout appel d'offres. La direction conformité exige : certificats GMP/GDP valides, questionnaire anti-corruption, attestation d'assurance, évaluation RSE. Les achats veulent limiter l'effort fournisseur à 30 minutes et obtenir une qualification en moins de 15 jours.

Vous animez l'atelier avec la responsable conformité, deux acheteurs catégorie et l'administrateur SLP. Les fournisseurs opèrent en France, Allemagne et Suisse.`,
      steps: [
        "Définissez la matrice de qualification (commodités × régions × départements) réellement nécessaire.",
        "Répartissez les exigences entre questionnaire de registration (commun à tous), questionnaire de qualification (spécifique à la matrice) et questionnaires modulaires (certificats à expiration).",
        "Pour chaque questionnaire, listez les sections, le type de réponse (pièce jointe, oui/non, date, texte) et les questions bloquantes.",
        "Concevez le flux d'approbation : qui approuve quoi, en séquence ou en parallèle, quelles conditions.",
        "Fixez les règles de rappel et d'expiration des certificats, et le comportement en cas d'expiration (statut, blocage des événements).",
        "Rédigez les arguments pour convaincre la conformité de déplacer certaines questions vers les modulaires plutôt que de tout mettre en qualification.",
        "Formalisez le dispositif dans une note de conception.",
      ],
      deliverable: "Une note de conception : matrice de qualification, répartition des questions par questionnaire, flux d'approbation, règles d'expiration et estimation de l'effort fournisseur.",
      solution: `## Corrigé type

**Matrice de qualification** : 2 commodités (Matières premières actives, Transport température dirigée) × 3 régions (FR, DE, CH) × 1 département (Supply Chain). Soit 6 combinaisons possibles, mais la qualification se demande à la combinaison, pas à toutes : un transporteur suisse n'est qualifié que pour « Transport × CH ».

**Répartition des exigences** :
- *Registration* (commun, environ 10 min) : identité, banque, contacts, déclaration anti-corruption (oui/non + signataire), attestation d'assurance RC (pièce jointe).
- *Qualification* (spécifique, environ 15 min) : pour les matières premières, processus qualité, audits clients récents, capacité de production ; pour le transport, flotte, traçabilité température, plan de continuité. Questions bloquantes : absence de système qualité documenté, refus d'audit.
- *Questionnaires modulaires* (environ 5 min chacun) : certificat GMP (expiration), certificat GDP (expiration), évaluation RSE (validité 24 mois). Déclenchés automatiquement par la commodité à l'enregistrement.

**Flux d'approbation** : registration approuvée en parallèle par la comptabilité fournisseurs (données bancaires) et les achats ; qualification approuvée par l'acheteur catégorie puis, si une question bloquante est signalée ou si la région est CH (règles douanières), par la conformité. Les modulaires sont approuvés par la conformité seule.

**Expiration** : rappel au fournisseur à 60 et 30 jours ; statut \`Expiring\` visible dans Supplier 360 ; à expiration, le certificat passe \`Expired\` et la qualification associée est signalée pour **disqualification** après 15 jours de grâce ; le fournisseur n'est plus invité aux événements de sourcing de la catégorie.

**Argumentaire** : séparer les certificats dans des modulaires évite de requalifier entièrement un fournisseur à chaque renouvellement ISO ; la conformité garde son approbation exclusive sur ces modulaires. Effort fournisseur total : environ 30 à 35 minutes, délai cible 15 jours grâce aux approbations parallèles.`,
      tips: [
        "Chaque question bloquante doit avoir un propriétaire et une règle claire : qui décide en cas de réponse défavorable ?",
        "Utilisez les conditions de visibilité pour n'afficher les questions de transport qu'aux transporteurs : un questionnaire court est mieux rempli.",
        "Présentez le Supplier 360 à la conformité : voir tous les certificats au même endroit est souvent l'argument décisif.",
      ],
    },
    {
      id: "m5-s4-j4-a3",
      moduleId: "m5",
      week: 4,
      day: 4,
      kind: "quiz",
      title: "Quiz : enregistrement et qualification fournisseur",
      level: "intermediaire",
      durationMin: 12,
      objective: "Vérifier la compréhension des étapes SLP, des questionnaires et de la synchronisation avec S/4HANA.",
      questions: [
        {
          id: "m5-s4-j4-q1",
          question: "Dans quel ordre s'enchaînent les étapes standards du cycle de vie fournisseur dans SLP ?",
          options: [
            "Qualification → Registration → Supplier Request",
            "Supplier Request → Registration → Qualification",
            "Registration → Supplier Request → Qualification",
            "Supplier Request → Qualification → Registration",
          ],
          answer: 1,
          explanation: "Le fournisseur est d'abord proposé via un Supplier Request (interne ou externe), puis créé et invité à l'enregistrement (Registration, questionnaire externe approuvé en interne), et enfin qualifié pour des combinaisons commodité × région × département. Qualifier avant d'enregistrer n'est pas possible : la qualification suppose un fournisseur enregistré. Enregistrer avant la demande inverse la logique de création contrôlée avec vérification des doublons. La qualification suit toujours l'enregistrement.",
          concept: "Cycle de vie fournisseur SLP",
        },
        {
          id: "m5-s4-j4-q2",
          question: "Sur quels critères s'effectue la qualification d'un fournisseur dans SLP ?",
          options: [
            "Uniquement sur le chiffre d'affaires",
            "Sur une combinaison de commodité, région et département",
            "Sur le nombre de factures payées",
            "Sur le niveau de préférence attribué par Guided Buying",
          ],
          answer: 1,
          explanation: "La qualification SLP est matricielle : un fournisseur est qualifié pour une ou plusieurs combinaisons commodité × région × département, chacune pouvant avoir son questionnaire et son approbation. Le chiffre d'affaires peut être une question du questionnaire, mais n'est pas le critère de structure. Le nombre de factures relève de la performance ou du reporting Buying. Le niveau de préférence est un résultat du Preferred Supplier Management, pas un critère de qualification.",
          concept: "Matrice de qualification (commodité × région × département)",
        },
        {
          id: "m5-s4-j4-q3",
          question: "Quel objet SLP est le plus adapté pour suivre un certificat ISO 9001 qui expire chaque année ?",
          options: ["Un Legacy Contract", "Un questionnaire modulaire avec date d'expiration", "Le Supplier Request", "Un Sourcing Event"],
          answer: 1,
          explanation: "Les questionnaires modulaires sont conçus pour les certificats et attestations : ils ont une durée de validité, envoient des rappels avant expiration et passent en statut Expired sans obliger à rejouer toute la qualification. Le Legacy Contract concerne les contrats historiques, pas les certificats. Le Supplier Request sert uniquement à la création du fournisseur. Un Sourcing Event est un appel d'offres ; on y collecte parfois des documents, mais sans suivi d'expiration.",
          concept: "Questionnaires modulaires et certificats",
        },
        {
          id: "m5-s4-j4-q4",
          question: "Que fait le contrôle de doublons (Duplicate check) lors d'un Supplier Request ?",
          options: [
            "Il compare l'identité du fournisseur (nom, identifiant fiscal, adresse, DUNS) avec la base existante avant création",
            "Il supprime automatiquement les fournisseurs inactifs",
            "Il fusionne les comptes Ariba Network des fournisseurs",
            "Il vérifie les doublons de factures",
          ],
          answer: 0,
          explanation: "Le Duplicate check s'exécute pendant la demande de création : il recherche des fournisseurs existants proches (raison sociale, numéro de TVA, adresse, DUNS) et alerte l'approbateur pour éviter de créer un doublon, ce qui protège aussi la synchronisation avec S/4HANA. Il ne supprime aucun fournisseur. La fusion de comptes Ariba Network est une opération du réseau fournisseur, hors SLP. Le contrôle des doublons de factures est une règle d'Ariba Invoicing.",
          concept: "Supplier Request et contrôle des doublons",
        },
        {
          id: "m5-s4-j4-q5",
          question: "Pourquoi faut-il définir un système maître unique pour la création des fournisseurs (SLP, MDG-S ou S/4HANA) ?",
          options: [
            "Parce que CIG ne supporte qu'un seul flux par jour",
            "Pour éviter les doublons et les écarts d'identifiants entre le SM Vendor ID et le Business Partner",
            "Parce qu'Ariba interdit la réplication vers S/4HANA",
            "Parce que le Business Partner S/4HANA ne peut pas avoir de coordonnées bancaires",
          ],
          answer: 1,
          explanation: "Si la donnée fournisseur peut naître dans plusieurs systèmes, on obtient des doublons, des identifiants désalignés (SM Vendor ID, ERP Vendor ID, BP ID) et des conflits de mise à jour ; un système maître unique avec réplication bidirectionnelle maîtrisée via CIG règle le problème. CIG n'impose pas de limite d'un flux par jour. La réplication SLP vers S/4HANA est au contraire un scénario standard. Le Business Partner porte évidemment des données bancaires ; c'est même l'une des informations synchronisées.",
          concept: "Intégration fournisseur SLP – Business Partner S/4HANA",
        },
      ],
    },

    // ───────────────────────── Semaine 4 · Jour 5 ─────────────────────────
    {
      id: "m5-s4-j5-a1",
      moduleId: "m5",
      week: 4,
      day: 5,
      kind: "lecon",
      title: "Performance fournisseur et gestion du risque",
      level: "avance",
      durationMin: 30,
      objective: "Mettre en place le pilotage de la performance (scorecards, KPI, enquêtes) et le dispositif Supplier Risk : catégories, exposition, évaluations d'engagement basées sur les contrôles.",
      content: `## Supplier Performance Management

Le volet performance de SLP mesure et partage la qualité de la relation fournisseur. Il repose sur trois briques :

- **KPI** : indicateurs quantitatifs alimentés manuellement, par import ou par intégration (taux de livraison à l'heure depuis S/4HANA, taux de litiges facture depuis Invoicing, taux de non-conformité qualité).
- **Enquêtes (surveys)** : questionnaires internes envoyés aux parties prenantes (approvisionneurs, qualité, utilisateurs) pour noter des critères qualitatifs : réactivité, innovation, respect des engagements.
- **Scorecards** : la carte de score agrège KPI et enquêtes avec des pondérations par **section**, produit une note globale et une tendance. Elle se définit dans un **Performance Management Project** piloté par un template, avec une périodicité (trimestrielle, annuelle) et une **revue fournisseur** formalisée.

| Élément | Source | Fréquence typique |
|---|---|---|
| OTIF (livraison à l'heure et complète) | Réceptions S/4HANA | Mensuelle |
| Taux de factures en exception | Ariba Invoicing | Mensuelle |
| Qualité perçue | Enquête interne | Trimestrielle |
| Plan d'actions clos dans les délais | Saisie manuelle | Trimestrielle |

> Les scorecards n'ont de valeur que si elles sont **partagées avec le fournisseur** lors de revues : prévoyez le processus humain, pas seulement l'outil.

## SAP Ariba Supplier Risk

**Supplier Risk** complète SLP en évaluant le **risque fournisseur** sur quatre catégories :

1. **Financier** : solvabilité, notation, événements de défaut (sources tierces : Dun & Bradstreet, RapidRatings, EcoVadis selon les abonnements).
2. **Opérationnel** : dépendance, localisation, continuité d'activité, incidents logistiques.
3. **Réglementaire / conformité** : sanctions, listes de surveillance, anti-corruption, embargos.
4. **Environnemental et social** : empreinte carbone, conditions de travail, droits humains, notation RSE.

Chaque fournisseur reçoit un **niveau d'exposition** (Risk exposure : faible, moyen, élevé) calculé à partir des sources externes, des **alertes** (actualités, événements) et des données internes (dépenses, criticité de la catégorie, contrats actifs). Les acheteurs configurent des **catégories de risque** avec pondérations et seuils, et s'abonnent aux alertes.

## Évaluations d'engagement basées sur les contrôles

L'**engagement risk assessment** (contrôle-based) intervient avant de contracter : un **demandeur** décrit l'engagement envisagé (nature de la prestation, données traitées, pays, accès aux systèmes). Ariba déduit, via un **questionnaire inhérent**, les **contrôles** applicables (clause RGPD, audit sécurité, assurance spécifique, due diligence anti-corruption) et distribue à chaque **fonction de contrôle** (DSI, juridique, conformité) un questionnaire d'évaluation. L'engagement reçoit un niveau de risque résiduel et une décision (approuvé, approuvé sous conditions, refusé). Les contrôles sont ensuite **réévalués périodiquement**.

## Articuler risque, qualification et préférence

- Un risque **élevé** peut bloquer l'invitation aux événements de sourcing ou imposer une approbation supplémentaire sur les commandes.
- Une alerte réglementaire (sanction) doit pouvoir déclencher une **disqualification** immédiate.
- Le niveau de préférence s'aligne avec le score de performance : un fournisseur « Strategic » avec une scorecard dégradée deux trimestres de suite déclenche une revue.

## Intégration et données

Les KPI quantitatifs proviennent de S/4HANA via **CIG** (réceptions, retours) ou d'extractions planifiées ; les données de risque externes sont des abonnements intégrés nativement. Le consultant doit documenter la **cartographie des sources**, la fréquence de rafraîchissement et les responsables de chaque indicateur.`,
      keyPoints: [
        "La performance combine KPI (quantitatifs, souvent intégrés depuis S/4HANA), enquêtes internes et scorecards pondérées dans un Performance Management Project.",
        "Supplier Risk évalue quatre catégories : financier, opérationnel, réglementaire, environnemental et social, avec un niveau d'exposition et des alertes.",
        "L'évaluation d'engagement basée sur les contrôles qualifie un engagement avant contractualisation et distribue des questionnaires aux fonctions de contrôle.",
        "Risque, qualification et préférence doivent être articulés : alerte → disqualification, risque élevé → approbation renforcée.",
        "Le consultant documente la cartographie des sources de données et les responsables d'indicateurs.",
        "Une scorecard non partagée avec le fournisseur en revue formelle ne sert à rien.",
      ],
    },
    {
      id: "m5-s4-j5-a2",
      moduleId: "m5",
      week: 4,
      day: 5,
      kind: "exercice",
      title: "Construire une scorecard et une politique de risque fournisseur",
      level: "avance",
      durationMin: 40,
      objective: "Définir une scorecard pondérée alimentée par des sources identifiées et une politique de risque avec actions automatiques.",
      context: `## Situation

**Noralis** a 60 fournisseurs stratégiques. Le comité achats veut une **scorecard trimestrielle** et une **politique de risque** cohérente. Données disponibles :

- taux de livraison à l'heure (OTIF) dans S/4HANA ;
- taux de factures bloquées en exception dans Ariba Invoicing ;
- nombre de non-conformités qualité (fichier Excel de la qualité) ;
- perception des approvisionneurs (aucune enquête aujourd'hui) ;
- abonnement Supplier Risk avec sources financières et sanctions.

Trois incidents récents : un transporteur en redressement judiciaire non détecté, un fournisseur asiatique apparu sur une liste de sanctions, un prestataire IT ayant accédé à des données clients sans clause RGPD.`,
      steps: [
        "Définissez les sections de la scorecard, leurs KPI/enquêtes et leurs pondérations (total 100 %).",
        "Pour chaque indicateur, précisez la source, le mode d'alimentation (intégration CIG, import, saisie, enquête) et le responsable.",
        "Fixez les seuils de notation (vert, orange, rouge) et la règle de déclenchement d'un plan d'actions.",
        "Concevez la politique de risque : pour chaque catégorie, le seuil d'exposition et l'action associée (alerte, approbation, blocage sourcing, disqualification).",
        "Décrivez le processus d'évaluation d'engagement à mettre en place pour les prestataires accédant aux données.",
        "Reliez le tout au niveau de préférence et au processus de revue fournisseur trimestrielle.",
      ],
      deliverable: "Une fiche scorecard (sections, indicateurs, sources, pondérations, seuils) et une matrice de politique de risque (catégorie × seuil × action), avec le processus d'engagement pour les prestataires sensibles.",
      solution: `## Corrigé type

**Scorecard trimestrielle (100 %)**

| Section | Indicateur | Source / alimentation | Poids |
|---|---|---|---|
| Logistique | OTIF | S/4HANA via CIG, mensuel, responsable approvisionnement | 30 % |
| Finance | Taux de factures en exception | Ariba Invoicing, rapport mensuel, comptabilité fournisseurs | 15 % |
| Qualité | Non-conformités pour 1 000 lignes livrées | Import Excel trimestriel, responsable qualité | 25 % |
| Relation | Réactivité, proactivité, innovation | Enquête interne auprès de 3 approvisionneurs, trimestrielle | 20 % |
| Progrès | Actions clôturées dans les délais | Saisie manuelle par l'acheteur | 10 % |

Seuils : vert ≥ 80, orange 60–79, rouge < 60. Rouge un trimestre ou orange deux trimestres consécutifs → plan d'actions obligatoire et revue fournisseur avec le Contract Manager.

**Politique de risque**

| Catégorie | Seuil | Action |
|---|---|---|
| Financier | Exposition élevée ou alerte de procédure collective | Notification acheteur sous 24 h ; approbation directeur achats sur toute nouvelle commande ; recherche de source alternative |
| Réglementaire | Apparition sur liste de sanctions | Disqualification immédiate, blocage sourcing et commandes, information juridique |
| Opérationnel | Dépendance > 40 % du CA fournisseur ou site unique | Plan de continuité exigé via questionnaire modulaire |
| Environnemental / social | Score RSE < seuil | Plan d'amélioration intégré à la scorecard section Progrès |

**Évaluation d'engagement** : tout engagement de prestation impliquant un accès aux données ou aux systèmes déclenche un questionnaire inhérent ; si données personnelles ou accès distant, les contrôles DSI (audit sécurité) et juridique (clause RGPD, DPA) sont distribués ; décision avant signature du contrat, réévaluation annuelle.

**Articulation** : le niveau « Strategic » exige scorecard verte et exposition au risque faible ou moyenne ; la revue trimestrielle examine les fournisseurs orange/rouge et les alertes de risque ouvertes.`,
      tips: [
        "Limitez-vous à 5 ou 6 indicateurs : une scorecard de 20 lignes n'est jamais alimentée.",
        "Automatisez d'abord les indicateurs disponibles dans S/4HANA et Invoicing ; les saisies manuelles viennent ensuite.",
        "Les actions de la politique de risque doivent correspondre à des paramétrages réels : disqualification, règles d'approbation, exclusion des invitations sourcing.",
      ],
    },
    {
      id: "m5-s4-j5-a3",
      moduleId: "m5",
      week: 4,
      day: 5,
      kind: "quiz",
      title: "Quiz : performance et risque fournisseur",
      level: "avance",
      durationMin: 15,
      objective: "Valider la maîtrise des scorecards, des catégories de risque et des évaluations d'engagement.",
      questions: [
        {
          id: "m5-s4-j5-q1",
          question: "De quoi se compose une scorecard fournisseur dans SLP ?",
          options: [
            "Uniquement des réponses du fournisseur au questionnaire d'enregistrement",
            "De KPI quantitatifs et d'enquêtes internes agrégés par sections pondérées dans un Performance Management Project",
            "Du nombre de contrats signés avec le fournisseur",
            "Du score de risque financier fourni par une source externe",
          ],
          answer: 1,
          explanation: "La scorecard agrège des KPI (souvent alimentés par intégration ou import) et des enquêtes internes auprès des parties prenantes, organisés en sections pondérées, dans un projet de gestion de la performance périodique. Les réponses à l'enregistrement décrivent le fournisseur mais ne mesurent pas sa performance. Le nombre de contrats est une donnée de reporting, pas une évaluation. Le score de risque financier relève de Supplier Risk ; il peut influencer la décision mais n'est pas la scorecard.",
          concept: "Scorecards et KPI de performance",
        },
        {
          id: "m5-s4-j5-q2",
          question: "Quelles sont les quatre catégories de risque évaluées par SAP Ariba Supplier Risk ?",
          options: [
            "Prix, qualité, délai, service",
            "Financier, opérationnel, réglementaire, environnemental et social",
            "Juridique, fiscal, comptable, logistique",
            "Débutant, intermédiaire, avancé, expert",
          ],
          answer: 1,
          explanation: "Supplier Risk structure l'exposition en quatre catégories : financier (solvabilité), opérationnel (continuité, dépendance), réglementaire (sanctions, conformité) et environnemental et social (RSE, droits humains). Prix, qualité, délai et service sont des axes de performance, pas de risque. Juridique, fiscal, comptable et logistique ne correspondent pas à la taxonomie du produit. La dernière option est une échelle de niveaux de formation, sans rapport.",
          concept: "Catégories de risque fournisseur",
        },
        {
          id: "m5-s4-j5-q3",
          question: "Qu'est-ce qu'une évaluation d'engagement basée sur les contrôles (control-based engagement risk assessment) ?",
          options: [
            "Un audit sur site réalisé par le fournisseur",
            "Une évaluation, avant contractualisation, d'un engagement précis qui déduit les contrôles applicables et distribue des questionnaires aux fonctions de contrôle",
            "Le calcul automatique du prix d'un contrat",
            "La notation financière annuelle du fournisseur",
          ],
          answer: 1,
          explanation: "L'engagement risk assessment part d'une description de l'engagement (prestation, données, pays), identifie via un questionnaire inhérent les contrôles pertinents (RGPD, sécurité, anti-corruption) et envoie à chaque fonction de contrôle un questionnaire d'évaluation, aboutissant à un risque résiduel et une décision. Ce n'est pas un audit sur site, même s'il peut en exiger un. Il n'a aucun lien avec le calcul de prix. La notation financière est une source de données du risque fournisseur global, non une évaluation d'engagement.",
          concept: "Évaluation d'engagement basée sur les contrôles",
        },
        {
          id: "m5-s4-j5-q4",
          question: "Un fournisseur qualifié apparaît sur une liste de sanctions internationales. Quelle réaction est cohérente avec une politique de risque bien conçue ?",
          options: [
            "Attendre la prochaine scorecard trimestrielle",
            "Le passer au niveau de préférence Strategic pour mieux le surveiller",
            "Déclencher une disqualification avec blocage des invitations sourcing et des commandes, et informer le juridique",
            "Supprimer son compte Ariba Network",
          ],
          answer: 2,
          explanation: "Une alerte réglementaire critique doit déclencher une action immédiate : disqualification motivée, exclusion des événements de sourcing, blocage ou approbation renforcée des commandes et escalade au juridique. Attendre la scorecard expose l'entreprise à une violation de sanctions. Élever le niveau de préférence est l'inverse de l'objectif. Supprimer le compte Ariba Network n'est pas une action du client (le compte appartient au fournisseur) et ne laisse aucune trace de décision dans SLP.",
          concept: "Articulation risque, disqualification et sourcing",
        },
        {
          id: "m5-s4-j5-q5",
          question: "Quel indicateur de scorecard est le plus pertinent à alimenter automatiquement depuis S/4HANA via CIG ?",
          options: [
            "La perception de l'innovation par les approvisionneurs",
            "Le taux de livraison à l'heure (OTIF) basé sur les réceptions",
            "La qualité rédactionnelle des contrats",
            "Le niveau de préférence du fournisseur",
          ],
          answer: 1,
          explanation: "L'OTIF se calcule à partir des réceptions et des dates de livraison promises, données transactionnelles présentes dans S/4HANA et transférables via CIG ou extraction planifiée : c'est le candidat idéal à l'automatisation. La perception de l'innovation est qualitative et relève d'une enquête interne. La qualité rédactionnelle des contrats n'est pas un indicateur de performance fournisseur mesurable dans l'ERP. Le niveau de préférence est un attribut défini dans SLP, pas un indicateur issu de S/4HANA.",
          concept: "Sources de données des KPI de performance",
        },
      ],
    },
  ],
  useCases: [
    {
      id: "m5-uc1",
      moduleId: "m5",
      title: "Réduire le délai de contractualisation sans perdre le contrôle juridique",
      client: "Industrie pharmaceutique, 4 000 salariés, 3 juristes pour 600 contrats par an",
      situation: "Tous les contrats étaient relus par la direction juridique, avec un délai moyen de six semaines et une forte frustration des acheteurs. Les documents circulaient par e-mail, sans versionnement fiable.",
      challenge: "Déployer Ariba Contracts en divisant par deux le délai, tout en garantissant la traçabilité exigée par les audits GxP et en rassurant la direction juridique sur le maintien de son contrôle.",
      approach: [
        "Atelier de cadrage pour segmenter les contrats en trois niveaux selon le montant et l'usage de clauses standard.",
        "Construction d'une Clause Library validée par la juridique, avec clauses alternatives pré-approuvées.",
        "Template de Procurement Contract Workspace avec approbation juridique conditionnelle (montant ou clause modifiée).",
        "Intégration DocuSign avec ordre de signature fournisseur puis interne, selon la délégation de pouvoirs.",
        "Pilote sur une catégorie (prestations intellectuelles) pendant six semaines avant généralisation.",
      ],
      outcome: "Délai moyen ramené à 17 jours, 62 % des contrats traités sans intervention juridique, piste d'audit complète acceptée par l'auditeur qualité.",
      lesson: "Le levier n'est pas l'outil mais la segmentation : donner à la juridique la propriété de la Clause Library transforme un frein en allié.",
    },
    {
      id: "m5-uc2",
      moduleId: "m5",
      title: "Contrats signés mais jamais appliqués dans les commandes",
      client: "Distribution spécialisée, 2 500 salariés, 12 agences",
      situation: "Le client avait négocié des prix sur 400 références de fournitures, mais les agences continuaient de commander hors contrat à des prix supérieurs de 12 % en moyenne. Les contrats existaient dans Ariba Contracts sans Contract Terms.",
      challenge: "Rendre les contrats opérationnels dans Ariba Buying et mesurer la réduction du maverick spend.",
      approach: [
        "Import des Contract Terms via le modèle Excel et publication en conformité item-level avec release orders.",
        "Création d'un catalogue aligné sur les prix contractuels et affichage en priorité dans Guided Buying.",
        "Paramétrage des accumulateurs avec alerte à 80 % et approbation du directeur achats en cas de dépassement.",
        "Rapport mensuel dépenses sous contrat vs hors contrat partagé avec les responsables d'agence.",
      ],
      outcome: "Taux d'achats sous contrat passé de 35 % à 88 % en quatre mois ; économies constatées de 190 000 € sur l'année.",
      lesson: "Un contrat sans Contract Terms publiés est un document juridique, pas un levier d'achat. Vérifier systématiquement la publication vers Buying.",
    },
    {
      id: "m5-uc3",
      moduleId: "m5",
      title: "Assainir une base fournisseurs avant la migration S/4HANA",
      client: "Groupe agroalimentaire, 8 000 salariés, 14 000 fournisseurs dans l'ERP historique",
      situation: "La base fournisseurs comptait environ 30 % de doublons et de comptes inactifs ; les certificats qualité étaient suivis dans des tableurs. La migration vers S/4HANA et le déploiement de SLP devaient se faire en parallèle.",
      challenge: "Définir le système maître de la donnée fournisseur, nettoyer la base et mettre en place un cycle de qualification avec suivi des certificats, sans bloquer les approvisionnements.",
      approach: [
        "Décision d'architecture : SLP système de création, réplication vers S/4HANA Business Partner via CIG, règles de synchronisation documentées.",
        "Campagne de déduplication et d'archivage avant chargement initial, avec le contrôle de doublons SLP activé pour la suite.",
        "Questionnaire d'enregistrement commun et questionnaires modulaires pour les certificats (IFS, BRC, bio) avec rappels d'expiration.",
        "Qualification par commodité × région limitée aux 1 200 fournisseurs actifs des catégories critiques.",
        "Tableau de bord Supplier 360 présenté à la qualité pour remplacer les tableurs.",
      ],
      outcome: "Base réduite à 9 400 fournisseurs actifs, zéro doublon créé en six mois, 97 % des certificats critiques à jour.",
      lesson: "Trancher la question du système maître avant toute configuration : c'est la décision la plus structurante d'un projet SLP.",
    },
  ],
  glossary: [
    { term: "Contract Workspace", definition: "Projet Ariba qui contient l'ensemble d'un contrat : en-tête, documents, Contract Terms, phases et tâches, équipe. Existe en version Procurement, Sales et Internal.", moduleId: "m5" },
    { term: "Contract Request", definition: "Demande légère de création de contrat soumise à approbation, permettant à un demandeur sans licence complète de déclencher un Contract Workspace.", moduleId: "m5" },
    { term: "Main Agreement", definition: "Document contractuel principal du workspace, souvent généré depuis un modèle Word avec champs fusionnés et clauses de la Clause Library.", moduleId: "m5" },
    { term: "Clause Library", definition: "Bibliothèque de clauses juridiques validées (standard, alternatives, de repli) ; permet de détecter les déviations et de déclencher des approbations.", moduleId: "m5" },
    { term: "Master Agreement / Sub-Agreement", definition: "Hiérarchie contractuelle où un accord-cadre (Master) porte des contrats d'application (Sub) héritant de ses données et cumulant les engagements.", moduleId: "m5" },
    { term: "Contract Terms", definition: "Lignes de contrat et conditions tarifaires (Contract Line Items, Pricing Terms) publiées vers Ariba Buying pour la conformité contractuelle.", moduleId: "m5" },
    { term: "Contract Compliance", definition: "Fonction d'Ariba Buying & Invoicing qui applique les termes contractuels aux demandes, commandes et factures (item-level, supplier-level, commodity-level).", moduleId: "m5" },
    { term: "Release order", definition: "Bon de commande d'appel généré à partir d'un contrat pour chaque demande d'achat qui le référence ; par opposition au no-release order (facturation directe contre le contrat).", moduleId: "m5" },
    { term: "Accumulateur", definition: "Compteur de consommation (montant, quantité) d'un contrat comparé à ses plafonds, tolérances et seuils d'alerte.", moduleId: "m5" },
    { term: "Amendement", definition: "Réouverture d'un contrat publié selon un type : Administrative, Amendment, Renewal ou Termination, chacun pouvant avoir ses propres tâches.", moduleId: "m5" },
    { term: "Legacy Contract", definition: "Contrat historique saisi dans Ariba sans processus de création, pour alimenter le référentiel, le reporting et les alertes d'expiration.", moduleId: "m5" },
    { term: "Supplier Request", definition: "Demande de création d'un fournisseur (interne ou externe) avec contrôle de doublons, première étape du cycle de vie SLP.", moduleId: "m5" },
    { term: "Qualification", definition: "Validation de la capacité d'un fournisseur pour une combinaison commodité × région × département, via questionnaires et approbation.", moduleId: "m5" },
    { term: "Questionnaire modulaire", definition: "Questionnaire SLP indépendant, réutilisable et à durée de validité, utilisé notamment pour les certificats avec rappels d'expiration.", moduleId: "m5" },
    { term: "Supplier 360", definition: "Profil consolidé du fournisseur agrégeant questionnaires, qualifications, contrats, événements, performance et risque.", moduleId: "m5" },
    { term: "Risk exposure", definition: "Niveau d'exposition au risque (faible, moyen, élevé) calculé par Supplier Risk à partir de sources externes, d'alertes et de données internes sur quatre catégories.", moduleId: "m5" },
  ],
  faq: [
    { q: "Faut-il créer un Contract Workspace pour chaque bon de commande ouvert ?", a: "Non. Un workspace correspond à un accord juridique. Les commandes ouvertes ou missions au fil de l'eau sont gérées comme release orders sur le contrat publié en Contract Compliance. On réserve les Sub-Agreements aux véritables contrats d'application (par pays, par entité) qui ont leur propre signature.", moduleId: "m5" },
    { q: "Peut-on signer un contrat dans Ariba sans que le fournisseur ait de compte Ariba Network ?", a: "Oui. La tâche de signature via DocuSign ou Adobe Sign envoie un e-mail au signataire fournisseur, qui signe sans compte Ariba. De même, la tâche de négociation fonctionne par e-mail. Le compte Ariba Network devient nécessaire pour les flux transactionnels (commandes, factures) et pour les questionnaires SLP.", moduleId: "m5" },
    { q: "Quelle différence entre Contract Compliance supplier-level et commodity-level ?", a: "Le supplier-level cumule toutes les dépenses auprès d'un fournisseur, quelle que soit la catégorie. Le commodity-level restreint le contrat à une catégorie d'achat (code UNSPSC) chez ce fournisseur ; les achats d'une autre catégorie ne consomment pas l'accumulateur. Aucun des deux ne contrôle les prix unitaires, contrairement à l'item-level.", moduleId: "m5" },
    { q: "Un fournisseur peut-il être qualifié dans SLP sans être enregistré ?", a: "Non. La qualification suppose un fournisseur enregistré (statut Registered). En revanche, un fournisseur enregistré peut ne jamais être qualifié s'il n'intervient que sur des catégories qui n'exigent pas de qualification ; la politique de qualification se définit par commodité et région.", moduleId: "m5" },
    { q: "Comment éviter de requalifier un fournisseur à chaque renouvellement de certificat ?", a: "En plaçant les certificats dans des questionnaires modulaires avec date d'expiration, distincts du questionnaire de qualification. Le fournisseur met à jour uniquement le certificat concerné, qui est approuvé seul, sans toucher au statut de qualification. Les rappels automatiques réduisent les relances manuelles.", moduleId: "m5" },
    { q: "Supplier Risk fait-il partie de SLP ?", a: "Supplier Risk est une solution distincte, souscrite séparément, mais étroitement intégrée à SLP : les niveaux d'exposition et les alertes apparaissent dans le profil Supplier 360 et peuvent influencer la qualification, la préférence et les invitations aux événements de sourcing. Les évaluations d'engagement basées sur les contrôles font partie de Supplier Risk.", moduleId: "m5" },
  ],
};
