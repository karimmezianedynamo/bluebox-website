import type { ModuleContent } from "../types";

export const m3: ModuleContent = {
  moduleId: "m3",
  activities: [
    // ───────────── Semaine 2 · Jour 4 : Projets de sourcing : fondations ─────────────
    {
      id: "m3-s2-j4-a1",
      moduleId: "m3",
      week: 2,
      day: 4,
      kind: "lecon",
      title: "Le projet de sourcing : conteneur, template et équipe",
      level: "debutant",
      durationMin: 25,
      objective: "Comprendre ce qu'est un projet de sourcing SAP Ariba, ses deux formes (Full et Quick) et le rôle du template.",
      content: `## Pourquoi un « projet » et pas seulement un « événement » ?

Dans **SAP Ariba Sourcing**, l'appel d'offres n'est jamais isolé : il vit dans un **Sourcing Project**, un conteneur qui regroupe les documents, les tâches, l'équipe, les événements et les résultats d'une démarche d'achat. Le projet porte les **attributs de classification** (Commodity, Region, Department) qui alimentent le reporting et déclenchent les règles de visibilité.

## Full project vs Quick project

| Critère | Quick project | Full project |
|---|---|---|
| Objet | Un seul événement, lancé vite | Démarche complète multi-événements |
| Phases et tâches | Non | Oui (plan de projet) |
| Équipe (Team) | Minimale | Groupes de projet configurables |
| Documents | L'événement seul | Bibliothèque complète (documents, événements, contrats liés) |
| Usage typique | RFQ tactique, spot sourcing | Catégorie stratégique, programme d'économies |

> Un Quick project peut être **converti** en Full project, mais pas l'inverse : en atelier, partez de l'ambition de la catégorie, pas de l'urgence du jour.

## Le Project template

Le **template** est la matrice administrée par l'équipe Ariba (groupe **Template Creator**). Il préconfigure :

- les **phases** et **tâches** standards (ex. « Validation stratégie », « Lancement RFP », « Attribution ») ;
- les **documents** à créer (modèle d'événement, formulaire d'économies, grille de notation) ;
- les **conditions** d'affichage (une tâche d'approbation DAF n'apparaît que si le montant estimé dépasse un seuil) ;
- les **groupes de projet** (Project Owner, Sourcing Agent, Observers, Legal…).

Le consultant travaille d'abord sur le template : chaque heure investie ici se retrouve dans des centaines de projets.

## Le Sourcing Request

Quand les demandeurs métier ne sont pas acheteurs, on active le **Sourcing Request** : un formulaire léger créé par le métier, approuvé par la direction achats, puis **transformé** en Sourcing Project. Le lien demande → projet est conservé pour la traçabilité.

## L'équipe : Team et project groups

L'onglet **Team** liste les groupes de projet et leurs membres. Les droits dérivent du groupe : le **Project Owner** pilote, les **Observers** lisent, l'équipe peut être enrichie en cours de route. Les membres sont des utilisateurs du realm acheteur, jamais des fournisseurs.

## Les attributs : Commodity, Region, Department

Ces trois attributs sont obligatoires sur un projet et pilotent :

- le choix du template proposé (un template peut être réservé à certains commodity codes) ;
- la visibilité (un utilisateur de la région EMEA ne voit pas forcément les projets APAC) ;
- le reporting agrégé des économies.`,
      keyPoints: [
        "Le Sourcing Project est le conteneur : événements, documents, tâches, équipe et attributs y sont rattachés.",
        "Quick project = un événement rapide ; Full project = démarche complète avec phases et tâches. La conversion ne se fait que de Quick vers Full.",
        "Le Project template, administré par les Template Creators, standardise phases, tâches, documents et groupes.",
        "Le Sourcing Request permet au métier de déclencher un besoin que les achats transforment en projet.",
        "Commodity, Region et Department pilotent le choix de template, la visibilité et le reporting.",
      ],
    },
    {
      id: "m3-s2-j4-a2",
      moduleId: "m3",
      week: 2,
      day: 4,
      kind: "exercice",
      title: "Concevoir la structure d'un template de projet « Catégorie stratégique »",
      level: "debutant",
      durationMin: 40,
      objective: "Traduire un processus achats client en phases, tâches, groupes et conditions d'un Project template.",
      context: `## Situation

Vous intervenez chez **Norvalis**, distributeur de matériel électrique (1 800 salariés, 60 acheteurs). Le processus achats actuel, décrit dans une procédure Word, comporte quatre étapes : cadrage du besoin, consultation du marché, négociation/attribution, contractualisation. La DAF exige une validation pour tout projet dont le montant estimé dépasse **250 000 €**. Le service juridique veut être informé dès qu'un contrat est envisagé.

Le client souhaite un template unique **« Catégorie stratégique »** utilisable pour toutes les régions.`,
      steps: [
        "Listez les quatre phases du template et donnez-leur un nom court compréhensible par les acheteurs.",
        "Pour chaque phase, identifiez 2 à 3 tâches en précisant leur type : To-do, Approval, Review ou Notification.",
        "Définissez les groupes de projet (au minimum Project Owner, Sourcing Agents, Finance Approver, Legal) et dites qui approuve quoi.",
        "Rédigez la condition qui fait apparaître la tâche d'approbation DAF uniquement au-dessus de 250 000 € (champ Baseline Spend ou Estimated Value).",
        "Indiquez les documents à pré-créer dans le template (modèle d'événement RFP, formulaire d'économies, grille de notation).",
        "Précisez les attributs (Commodity, Region, Department) sur lesquels le template doit être disponible.",
      ],
      deliverable: "Un tableau « Phase / Tâche / Type / Groupe responsable / Condition » et une liste des documents du template.",
      solution: `## Corrigé type

**Phases et tâches**

| Phase | Tâche | Type | Groupe | Condition |
|---|---|---|---|---|
| 1. Cadrage | Rédiger la note de cadrage | To-do | Project Owner | — |
| 1. Cadrage | Valider la stratégie de sourcing | Approval | Head of Category | — |
| 1. Cadrage | Validation budgétaire DAF | Approval | Finance Approver | Estimated Value > 250 000 € |
| 2. Consultation | Préparer et publier le RFP | To-do | Sourcing Agents | — |
| 2. Consultation | Revue de la liste fournisseurs | Review | Head of Category | — |
| 3. Attribution | Analyser les offres et proposer l'attribution | To-do | Sourcing Agents | — |
| 3. Attribution | Approuver le scénario d'attribution | Approval | Head of Category | — |
| 4. Contractualisation | Informer le juridique | Notification | Legal | — |
| 4. Contractualisation | Créer le contrat (lien Contract Workspace) | To-do | Project Owner | — |

**Groupes** : Project Owner (pilote), Sourcing Agents (exécution), Head of Category (approbations métier), Finance Approver (DAF), Legal (notification et lecture).

**Condition** : dans le template, la tâche « Validation budgétaire DAF » porte une condition de visibilité sur le champ **Estimated Value** avec l'opérateur « supérieur à » et la valeur 250 000. La tâche est ainsi masquée sous le seuil, ce qui évite les approbations inutiles.

**Documents du template** : un modèle d'événement RFP (sections Administratif / Technique / Commercial), un **Savings Form** préchargé avec la méthode de calcul client, une grille de notation standard, la note de cadrage en pièce jointe modèle.

**Attributs** : template disponible pour tous les Commodity codes, toutes les Regions, Department « Achats ». Si le client veut ensuite un template spécifique IT, on en créera un second restreint au commodity code informatique.`,
      tips: [
        "Une tâche d'approbation bloque le passage à la phase suivante : n'en mettez que là où le client l'exige vraiment.",
        "Nommez les phases comme le client parle : le template doit être reconnu par les acheteurs au premier coup d'œil.",
        "Les conditions se testent dans le realm de test en créant deux projets, un sous le seuil, un au-dessus.",
      ],
    },
    {
      id: "m3-s2-j4-a3",
      moduleId: "m3",
      week: 2,
      day: 4,
      kind: "quiz",
      title: "Quiz : projets de sourcing et templates",
      level: "debutant",
      durationMin: 15,
      objective: "Vérifier la maîtrise des notions de projet, template, tâches et attributs.",
      questions: [
        {
          id: "m3-s2-j4-q1",
          question: "Quelle affirmation sur les Quick projects et Full projects est correcte ?",
          options: [
            "Un Full project peut être converti en Quick project pour l'alléger.",
            "Un Quick project contient un seul événement et peut être converti en Full project.",
            "Un Quick project possède des phases et des tâches mais pas de documents.",
            "Les deux types sont strictement identiques, seule l'icône change.",
          ],
          answer: 1,
          explanation:
            "Le Quick project est conçu pour lancer rapidement un seul événement sans plan de projet ; il peut être converti en Full project si la démarche prend de l'ampleur. L'inverse (Full vers Quick) n'existe pas, ce qui rend la première option fausse. La troisième inverse la réalité : c'est le Full project qui porte phases et tâches, le Quick n'en a pas. La quatrième est fausse puisque les deux formes diffèrent précisément par la présence du plan de projet, de l'équipe configurable et de la bibliothèque de documents.",
          concept: "Quick project vs Full project",
        },
        {
          id: "m3-s2-j4-q2",
          question: "Quel groupe système est habilité à créer et modifier les Project templates ?",
          options: ["Project Owner", "Sourcing Agent", "Template Creator", "Customer Administrator uniquement"],
          answer: 2,
          explanation:
            "Les templates sont administrés par les membres du groupe **Template Creator**, qui disposent de l'onglet Templates dans l'espace Administration. Le Project Owner pilote un projet donné mais ne modifie pas la matrice, tout comme le Sourcing Agent qui exécute les événements. Le Customer Administrator gère les utilisateurs et paramètres du site ; il peut s'attribuer le groupe Template Creator, mais ce n'est pas son rôle par défaut, ce qui rend la dernière option trop restrictive et donc fausse.",
          concept: "Project template et groupe Template Creator",
        },
        {
          id: "m3-s2-j4-q3",
          question: "Quel type de tâche bloque le passage à l'étape suivante jusqu'à décision d'un approbateur ?",
          options: ["Notification", "To-do", "Review", "Approval"],
          answer: 3,
          explanation:
            "La tâche **Approval** exige qu'un ou plusieurs approbateurs acceptent ou refusent le document ou la phase ; tant qu'elle n'est pas approuvée, les tâches qui en dépendent restent bloquées. La Notification informe sans attendre de retour. La To-do est une simple action à cocher par son responsable. La Review collecte des commentaires d'un relecteur mais n'a pas de pouvoir bloquant d'approbation formelle : le document peut avancer même si la revue aboutit à des remarques.",
          concept: "Types de tâches (To-do, Approval, Review, Notification)",
        },
        {
          id: "m3-s2-j4-q4",
          question: "À quoi servent principalement les attributs Commodity, Region et Department d'un projet de sourcing ?",
          options: [
            "À calculer automatiquement le prix de réserve des enchères.",
            "À déterminer le template proposé, la visibilité et le reporting.",
            "À inviter automatiquement les fournisseurs correspondants.",
            "À définir la devise de l'événement.",
          ],
          answer: 1,
          explanation:
            "Ces trois attributs classent le projet : ils filtrent les templates disponibles, conditionnent la visibilité des utilisateurs par périmètre et alimentent les rapports d'économies et de dépenses. Ils ne calculent aucun prix de réserve, qui est saisi manuellement dans les termes d'une enchère. L'invitation des fournisseurs reste une action du responsable d'événement, même si les commodity codes aident à les rechercher. La devise se choisit dans les paramètres de l'événement, indépendamment de la région.",
          concept: "Attributs Commodity, Region, Department",
        },
        {
          id: "m3-s2-j4-q5",
          question: "Qu'est-ce qu'un Sourcing Request ?",
          options: [
            "Une demande d'achat Buying transformée en bon de commande.",
            "Un formulaire du métier qui, une fois approuvé, est transformé en Sourcing Project.",
            "Une demande du fournisseur pour participer à un événement.",
            "Le nom du rapport de comparaison des offres.",
          ],
          answer: 1,
          explanation:
            "Le Sourcing Request est un formulaire léger permettant aux demandeurs non acheteurs d'exprimer un besoin de consultation ; après approbation par les achats, il est transformé en Sourcing Project en gardant le lien d'origine. Il n'a rien à voir avec la demande d'achat de Buying & Invoicing, qui relève du P2P. Les fournisseurs ne créent pas de Sourcing Request : ils reçoivent des invitations. Enfin, le rapport de comparaison des offres s'appelle Bid Comparison Report.",
          concept: "Sourcing Request",
        },
      ],
    },

    // ───────────── Semaine 2 · Jour 5 : Événements de sourcing et enchères ─────────────
    {
      id: "m3-s2-j5-a1",
      moduleId: "m3",
      week: 2,
      day: 5,
      kind: "lecon",
      title: "Anatomie d'un événement : types, règles et états",
      level: "intermediaire",
      durationMin: 30,
      objective: "Distinguer RFI, RFP et les formats d'enchères, maîtriser les règles d'événement et le cycle des états.",
      content: `## Les trois familles d'événements

- **RFI (Request for Information)** : collecte d'informations, pas de prix engageant. Sert à qualifier et présélectionner.
- **RFP (Request for Proposal)** : offre complète, questions + termes de prix, notation pondérée. C'est le format le plus utilisé.
- **Auction (enchère)** : négociation dynamique en temps réel sur des termes chiffrés.

## Les formats d'enchère

| Format | Mécanique | Quand l'utiliser |
|---|---|---|
| **English reverse** | Les fournisseurs baissent leurs prix successivement, le plus bas gagne | Marché concurrentiel, spécification claire |
| **Dutch** | Le prix affiché monte par paliers depuis un prix bas, le premier qui accepte remporte | Peu de fournisseurs, besoin de rapidité |
| **Japanese** | Le prix baisse par paliers, chaque fournisseur confirme ou sort | Éviter la visibilité du classement, forte pression |

> Une enchère ne se lance jamais sans **RFP préalable** ayant validé la conformité technique : on n'enchérit qu'entre offres comparables.

## Les règles d'événement (Event rules)

Les règles sont regroupées en trois blocs :

- **Timing rules** : date de prévisualisation (**Preview**), date d'ouverture, durée, règle de **prolongation automatique** (overtime) si une offre arrive dans les dernières minutes.
- **Bidding rules** : décrément minimal, possibilité d'améliorer sa propre offre, **prix de réserve**, offres par lot ou par ligne, autorisation d'enchère de substitution (**surrogate bid** saisie par l'acheteur au nom d'un fournisseur).
- **Market feedback** : ce que voit le fournisseur en cours d'enchère — son rang, le meilleur prix, le nombre de participants. Plus le feedback est riche, plus la pression concurrentielle est forte.

## Le contenu : lots, lignes, termes, questions

Le **contenu** d'un événement est hiérarchisé en **sections**, **lots**, **line items** et **questions**. Chaque ligne porte des **termes** (Price, Quantity, Extended Price = Price × Quantity, plus des termes personnalisés comme le délai de livraison). Les **requirements** sont des textes informatifs sans réponse attendue ; les **attachments** permettent de joindre cahier des charges et plans.

Les **pre-requisites** sont des questions à satisfaire avant d'accéder au contenu (accord de confidentialité, acceptation des conditions). L'**envelope bidding** sépare les enveloppes technique et commerciale : la seconde n'est ouverte qu'après évaluation de la première.

## Le cycle des états

\`Draft\` → \`Published\` → \`Preview\` → \`Open\` → \`Pending Selection\` → \`Completed\`

- **Draft** : construction, invisible des fournisseurs.
- **Published** : invitations envoyées, le compte à rebours commence.
- **Preview** : les fournisseurs lisent le contenu mais ne peuvent pas répondre.
- **Open** : réponses possibles jusqu'à la clôture.
- **Pending Selection** : dépouillement, notation, scénario d'attribution.
- **Completed** : attribution effectuée, l'événement est clos et alimente le formulaire d'économies.

Un événement peut aussi être **Paused**, **Cancelled**, ou faire l'objet d'une **ré-ouverture** (reopen) pour un second tour.`,
      keyPoints: [
        "RFI = information sans engagement ; RFP = offre complète notée ; Auction = négociation dynamique sur des termes chiffrés.",
        "English reverse (prix descendants), Dutch (prix montant, premier preneur), Japanese (paliers descendants, confirmation ou sortie).",
        "Les Event rules se répartissent en Timing, Bidding et Market feedback ; le feedback dose la pression concurrentielle.",
        "Le contenu se structure en sections, lots, line items et questions ; Extended Price = Price × Quantity.",
        "Cycle : Draft → Published → Preview → Open → Pending Selection → Completed.",
        "Une enchère suit toujours une qualification technique préalable.",
      ],
    },
    {
      id: "m3-s2-j5-a2",
      moduleId: "m3",
      week: 2,
      day: 5,
      kind: "simulation",
      title: "Simulation : atelier « choisir le bon format d'enchère »",
      level: "intermediaire",
      durationMin: 45,
      objective: "Animer un atelier avec les acheteurs pour choisir le format d'événement et paramétrer les règles adaptées.",
      context: `## Mise en situation

Vous êtes consultant Ariba Sourcing en atelier avec **trois category managers** du groupe **Aquaterra** (eau et assainissement, 6 000 salariés). Chacun arrive avec un besoin :

1. **Marie, Catégorie Transport** : 12 transporteurs qualifiés, prestation standardisée, 4 M€/an, forte pression budgétaire.
2. **Karim, Catégorie Équipements de pompage** : 3 fournisseurs possibles, spécifications complexes, le prix n'est qu'un critère parmi d'autres.
3. **Léa, Catégorie Produits chimiques** : 5 fournisseurs, marché très tendu, les fournisseurs refusent de voir leur classement.

Les trois veulent « faire une enchère ». Votre rôle : challenger, proposer le bon format et les règles associées.`,
      steps: [
        "Pour chaque besoin, décidez du type d'événement (RFI, RFP, enchère) et justifiez en une phrase face au category manager.",
        "Pour les cas où une enchère est pertinente, choisissez le format (English reverse, Dutch, Japanese) et expliquez la mécanique au métier.",
        "Paramétrez les Timing rules : durée de preview, durée d'ouverture, règle de prolongation (overtime) et son déclencheur.",
        "Paramétrez les Bidding rules : décrément minimal, prix de réserve, lots ou lignes, autorisation de surrogate bid.",
        "Choisissez le Market feedback (rang, meilleur prix, nombre de participants) en cohérence avec les contraintes de Léa.",
        "Rédigez trois recommandations de conduite d'atelier : ce que vous dites quand un acheteur insiste pour une enchère inadaptée.",
      ],
      deliverable: "Une fiche par catégorie : type d'événement, format, règles Timing / Bidding / Market feedback et justification métier.",
      solution: `## Corrigé type

**Transport (Marie)** — 12 fournisseurs qualifiés, prestation standard : terrain idéal pour une **enchère English reverse**, précédée d'un **RFP court** de confirmation des capacités (ou réutilisation de la qualification SLP). Règles : preview 48 h, ouverture 45 minutes, **overtime** de 3 minutes déclenché par toute offre dans les 2 dernières minutes, décrément minimal 0,5 %, prix de réserve = budget actuel moins 5 %, enchère par **lot géographique** (Nord, Sud, Ouest) pour permettre un split award. Market feedback : rang + meilleur prix, sans le nombre de participants pour éviter le découragement.

**Pompage (Karim)** — 3 fournisseurs, spécifications complexes : **RFP pondéré**, pas d'enchère. Le prix n'étant qu'un critère, la grille de notation (technique 50 %, prix 35 %, services 15 %) est l'outil pertinent. On peut activer l'**envelope bidding** pour ouvrir le commercial après la validation technique. Une enchère à 3 participants crée un risque de collusion et fausse le signal de marché.

**Produits chimiques (Léa)** — 5 fournisseurs, refus de voir le classement : **enchère Japanese** après RFP technique. Chaque palier descend d'1 %, le fournisseur confirme ou sort ; aucun rang n'est affiché, ce qui répond à la contrainte. Timing : paliers de 2 minutes, preview 24 h. Pas de surrogate bid sauf incident technique documenté.

**Recommandations d'animation**

1. Reformuler l'objectif : « Cherchez-vous le prix le plus bas ou la meilleure valeur ? » Si la réponse est « valeur », l'enchère n'est pas l'outil.
2. Rappeler la règle d'or : pas d'enchère sans comparabilité technique préalable.
3. Proposer un pilote : une première enchère sur la catégorie la plus simple (Transport) pour créer la confiance avant d'étendre.`,
      tips: [
        "Expliquez toujours le Market feedback du point de vue du fournisseur : c'est ce qui conditionne son comportement.",
        "L'overtime est le paramètre le plus mal compris : montrez-le avec un exemple chiffré sur un chronomètre.",
        "Documentez la décision de format dans la note de cadrage du projet : elle sera relue lors de l'audit des économies.",
      ],
    },
    {
      id: "m3-s2-j5-a3",
      moduleId: "m3",
      week: 2,
      day: 5,
      kind: "quiz",
      title: "Quiz : événements, enchères et règles",
      level: "intermediaire",
      durationMin: 15,
      objective: "Valider la compréhension des formats d'enchère, des règles et des états d'événement.",
      questions: [
        {
          id: "m3-s2-j5-q1",
          question: "Dans une enchère Dutch (hollandaise) telle que proposée dans Ariba Sourcing, comment évolue le prix ?",
          options: [
            "Il baisse par paliers et chaque fournisseur confirme ou sort.",
            "Il monte par paliers depuis un prix bas, le premier fournisseur qui accepte remporte la ligne.",
            "Les fournisseurs saisissent librement des prix de plus en plus bas.",
            "Le prix est fixe, seuls les délais de livraison sont négociés.",
          ],
          answer: 1,
          explanation:
            "Dans la Dutch auction inverse d'Ariba, l'acheteur affiche un prix de départ bas qui augmente à intervalles réguliers ; le premier fournisseur à accepter le prix courant remporte la ligne, ce qui met fin à l'enchère. La première option décrit l'enchère Japanese, où le prix descend et où chacun confirme sa participation palier après palier. La troisième décrit l'English reverse, format classique d'offres successives à la baisse. La quatrième ne correspond à aucun format standard : les termes non-prix peuvent exister, mais le prix reste au cœur de l'enchère.",
          concept: "Formats d'enchère (English reverse, Dutch, Japanese)",
        },
        {
          id: "m3-s2-j5-q2",
          question: "Quel bloc de règles d'événement définit ce qu'un fournisseur voit en cours d'enchère (rang, meilleur prix) ?",
          options: ["Timing rules", "Bidding rules", "Market feedback", "Project attributes"],
          answer: 2,
          explanation:
            "Le **Market feedback** regroupe les options de visibilité offertes aux participants : leur rang, le meilleur prix, le nombre de participants ou le prix de réserve. Les Timing rules concernent uniquement les dates, durées et prolongations. Les Bidding rules portent sur la mécanique des offres : décrément, amélioration de sa propre offre, surrogate bid. Les attributs de projet (Commodity, Region, Department) classent le projet et n'ont aucun effet sur l'affichage côté fournisseur.",
          concept: "Event rules : Timing, Bidding, Market feedback",
        },
        {
          id: "m3-s2-j5-q3",
          question: "Dans quel état un fournisseur peut-il consulter le contenu de l'événement sans pouvoir encore soumettre de réponse ?",
          options: ["Draft", "Preview", "Open", "Pending Selection"],
          answer: 1,
          explanation:
            "L'état **Preview** suit la publication : les fournisseurs invités accèdent au contenu, posent des questions et préparent leur offre, mais la soumission n'est possible qu'à l'ouverture. En Draft, l'événement est invisible des fournisseurs. En Open, les réponses sont acceptées. En Pending Selection, l'événement est clos aux fournisseurs et l'acheteur dépouille ; aucune lecture nouvelle ni soumission n'est possible pour les participants.",
          concept: "États d'un événement (Draft → Completed)",
        },
        {
          id: "m3-s2-j5-q4",
          question: "Qu'est-ce qu'une surrogate bid ?",
          options: [
            "Une offre automatique générée par le système au prix de réserve.",
            "Une offre saisie par l'acheteur au nom d'un fournisseur, par exemple reçue par téléphone.",
            "L'offre de remplacement d'un fournisseur après disqualification.",
            "Une offre en devise étrangère convertie automatiquement.",
          ],
          answer: 1,
          explanation:
            "La surrogate bid (offre de substitution) permet à l'acheteur, si la règle est activée, de saisir une offre pour le compte d'un fournisseur qui ne peut pas répondre en ligne ; elle est tracée comme telle dans l'historique. Le système ne génère jamais d'offre automatique au prix de réserve, qui n'est qu'un seuil. La disqualification d'un fournisseur ne crée pas d'offre de remplacement. La conversion de devise existe dans les termes multi-devises mais n'a pas ce nom.",
          concept: "Surrogate bid et participation fournisseur",
        },
        {
          id: "m3-s2-j5-q5",
          question: "Dans le contenu d'un événement, comment se calcule le terme Extended Price d'une ligne ?",
          options: [
            "Price × Quantity",
            "Price + frais de transport",
            "Moyenne des prix de tous les fournisseurs",
            "Price × nombre de lots",
          ],
          answer: 0,
          explanation:
            "L'Extended Price est un terme calculé standard égal au prix unitaire multiplié par la quantité de la ligne ; il sert de base au total de l'offre et aux scénarios d'attribution. Les frais de transport, s'ils existent, sont des termes supplémentaires distincts. Une moyenne entre fournisseurs relève du rapport de comparaison, pas d'un terme de ligne. Le nombre de lots n'entre jamais dans le calcul d'une ligne : un lot regroupe des lignes, il ne les multiplie pas.",
          concept: "Lots, line items et termes (Price, Quantity, Extended Price)",
        },
      ],
    },

    // ───────────── Semaine 3 · Jour 1 : Pilotage d'un projet de sourcing ─────────────
    {
      id: "m3-s3-j1-a1",
      moduleId: "m3",
      week: 3,
      day: 1,
      kind: "lecon",
      title: "Piloter l'événement : participants, monitoring et messagerie",
      level: "intermediaire",
      durationMin: 25,
      objective: "Savoir gérer les participants, suivre un événement en cours et traiter les incidents courants.",
      content: `## Inviter et gérer les participants

L'onglet **Suppliers** de l'événement permet d'inviter des fournisseurs depuis la base **Supplier Management** (ou SLP), de rechercher par commodity code ou région, et de suivre leur statut : *Invited*, *Accepted*, *Declined*, *Intends to participate*, *Participating*. Chaque invitation cible un **contact** du fournisseur ; si le fournisseur n'a pas encore de compte **Ariba Network**, il reçoit un lien d'inscription gratuite (compte Standard).

> Vérifiez systématiquement le contact invité : 40 % des « fournisseurs silencieux » sont des e-mails obsolètes.

## Le monitoring en temps réel

Pendant l'état **Open**, l'acheteur dispose de :

- la **console de suivi** : qui a ouvert l'événement, qui a soumis, qui a seulement accepté les pre-requisites ;
- l'**historique des offres (Bid history)** : chaque offre horodatée, utile pour justifier le classement en cas de contestation ;
- la **messagerie d'événement (Event messages)** : canal officiel acheteur ↔ fournisseurs, tracé et archivé, avec diffusion à un ou à tous les participants ;
- le **journal (Audit log)** : modifications de règles, prolongations, pauses.

## Agir en cours d'événement

| Situation | Action Ariba | Point d'attention |
|---|---|---|
| Un fournisseur ne peut pas se connecter | Prolonger la date de clôture ou saisir une surrogate bid | Documenter dans Event messages pour l'équité |
| Erreur dans le cahier des charges | Mettre l'événement en **Pause**, corriger, republier | Les fournisseurs sont notifiés, les offres soumises restent visibles |
| Question d'un fournisseur sur une clause | Répondre via Event messages, à **tous** si la réponse apporte une information | Transparence = égalité de traitement |
| Aucune offre reçue à J-1 | Relancer par message, vérifier contacts, envisager une prolongation | Ne jamais prolonger après la clôture sans justification |

## Les tâches associées à l'événement

Dans un Full project, l'événement est un **document** du projet : une tâche d'**approbation** peut conditionner sa publication (par exemple validation du panel fournisseurs par le Head of Category). Tant que la tâche n'est pas approuvée, le bouton *Publish* est inactif. Le **Project Owner** reste responsable du calendrier global ; l'**Event owner** peut être un Sourcing Agent délégué.

## Clôturer proprement

À la clôture, l'événement passe en **Pending Selection**. Avant tout dépouillement, le consultant recommande une **checklist** : toutes les offres sont-elles complètes ? Les pièces jointes exigées sont-elles présentes ? Les pre-requisites ont-ils tous été acceptés ? Un fournisseur dont l'offre est incomplète peut être **disqualifié** avec motif tracé, ou l'événement ré-ouvert pour un **second tour** (reopen) ciblé.`,
      keyPoints: [
        "Les statuts des participants (Invited, Accepted, Declined, Participating) se suivent dans l'onglet Suppliers.",
        "Bid history, Event messages et Audit log constituent la trace d'équité d'un événement.",
        "La messagerie d'événement est le canal officiel : une réponse informative se diffuse à tous les participants.",
        "Pause, prolongation, surrogate bid et reopen sont les leviers d'intervention en cours d'événement.",
        "Dans un Full project, une tâche d'approbation peut bloquer la publication de l'événement.",
      ],
    },
    {
      id: "m3-s3-j1-a2",
      moduleId: "m3",
      week: 3,
      day: 1,
      kind: "exercice",
      title: "Gérer trois incidents pendant un RFP ouvert",
      level: "intermediaire",
      durationMin: 40,
      objective: "Prendre les bonnes décisions de pilotage face à des incidents réels tout en préservant l'équité de traitement.",
      context: `## Situation

Vous pilotez pour **Helios Énergie** (producteur d'énergie renouvelable, 2 500 salariés) un RFP « Maintenance des éoliennes » dans un Full project. L'événement est **Open**, 8 fournisseurs invités, clôture dans 48 heures. Trois incidents surviennent le même matin :

- **Incident A** : le fournisseur WindCare écrit à l'acheteur par e-mail personnel pour demander si la clause de pénalité de 2 % est négociable.
- **Incident B** : le bureau d'études signale qu'une annexe technique contient une erreur : la puissance des turbines indiquée est 2,5 MW au lieu de 3 MW.
- **Incident C** : le fournisseur NordTurbine indique n'avoir jamais reçu l'invitation ; le contact enregistré est un commercial parti il y a six mois.`,
      steps: [
        "Pour l'incident A, indiquez le canal de réponse à utiliser dans Ariba et décidez si la réponse est individuelle ou diffusée à tous. Justifiez.",
        "Pour l'incident B, choisissez entre Pause/correction/republication, prolongation simple ou annulation. Décrivez la séquence d'actions et la communication aux fournisseurs.",
        "Pour l'incident C, décrivez comment corriger le contact, réinviter le fournisseur et décidez d'une éventuelle prolongation pour lui laisser un délai équitable.",
        "Rédigez le message d'événement (Event message) adressé à tous les participants pour l'incident B.",
        "Indiquez ce qui doit figurer dans le journal du projet pour que l'audit des achats puisse reconstituer les décisions.",
        "Proposez une règle de gouvernance à inscrire dans le template pour éviter que l'incident C se reproduise.",
      ],
      deliverable: "Un tableau « Incident / Décision / Actions Ariba / Communication / Trace » et le texte du message d'événement.",
      solution: `## Corrigé type

**Incident A — question hors canal.** Ne jamais répondre par e-mail. Inviter WindCare à reposer la question dans **Event messages**. La question porte sur une clause du cahier des charges, donc la réponse (« la clause n'est pas négociable à ce stade ») est **diffusée à tous les participants**, sans nommer WindCare. C'est le principe d'égalité d'information.

**Incident B — erreur d'annexe.** Mettre l'événement en **Pause**, remplacer l'annexe, puis republier. Les offres déjà soumises restent enregistrées mais les fournisseurs sont invités à les revoir. Comme la puissance change le dimensionnement, **prolonger la clôture de 72 heures** afin que chacun puisse réévaluer. Annuler l'événement serait disproportionné : le périmètre reste identique.

**Message d'événement (B)** :
> « Une erreur a été identifiée dans l'annexe technique 2 : la puissance unitaire des turbines est de 3 MW et non 2,5 MW. L'annexe corrigée est disponible dans la section Documents. La date de clôture est reportée au [date + 72 h] afin de vous permettre d'ajuster votre offre. Les offres déjà soumises peuvent être modifiées jusqu'à cette date. »

**Incident C — contact obsolète.** Dans le profil fournisseur (Supplier Management / SLP), ajouter le nouveau contact, puis dans l'onglet Suppliers de l'événement **réinviter** NordTurbine avec ce contact. La prolongation décidée pour l'incident B couvre le besoin d'équité ; sinon, on aurait prolongé de 48 heures et notifié tous les participants du motif.

**Trace** : chaque action (pause, modification d'annexe, prolongation, réinvitation) est automatiquement dans l'Audit log ; ajouter une **note de projet** résumant les trois incidents et les décisions, horodatée, référencée dans la tâche « Lancement RFP ».

**Gouvernance template** : ajouter une tâche **Review** « Vérification des contacts fournisseurs » avant la tâche de publication, affectée au Sourcing Agent, avec une checklist dans la description.`,
      tips: [
        "Une seule prolongation bien communiquée vaut mieux que trois petites : groupez les motifs.",
        "La messagerie d'événement est aussi une preuve : rédigez comme si un auditeur lisait.",
        "Un contact obsolète est un problème de données SLP avant d'être un problème de sourcing.",
      ],
    },
    {
      id: "m3-s3-j1-a3",
      moduleId: "m3",
      week: 3,
      day: 1,
      kind: "quiz",
      title: "Quiz : pilotage et monitoring d'événement",
      level: "intermediaire",
      durationMin: 15,
      objective: "Vérifier les réflexes de pilotage d'un événement en cours.",
      questions: [
        {
          id: "m3-s3-j1-q1",
          question: "Un fournisseur pose par e-mail une question dont la réponse clarifie le cahier des charges. Quelle est la bonne pratique ?",
          options: [
            "Répondre par e-mail au seul fournisseur pour aller vite.",
            "Ignorer la question : l'événement est ouvert.",
            "Répondre via Event messages à tous les participants.",
            "Clore l'événement et en créer un nouveau.",
          ],
          answer: 2,
          explanation:
            "Toute information qui précise le cahier des charges doit être partagée avec l'ensemble des participants via la messagerie d'événement, canal officiel tracé, afin de garantir l'égalité de traitement. Répondre par e-mail à un seul fournisseur crée une asymétrie d'information contestable. Ignorer la question nuit à la qualité des offres et expose à des réclamations. Clore et recréer l'événement est disproportionné : la messagerie et, si besoin, une prolongation suffisent.",
          concept: "Messagerie d'événement et égalité de traitement",
        },
        {
          id: "m3-s3-j1-q2",
          question: "Quelle fonctionnalité permet de reconstituer l'ordre et l'heure de chaque offre soumise ?",
          options: ["Savings form", "Bid history", "Project template", "Sourcing Request"],
          answer: 1,
          explanation:
            "Le **Bid history** horodate chaque offre et modification d'offre par fournisseur et par ligne ; c'est la preuve utilisée pour justifier un classement ou répondre à une contestation. Le Savings form documente les économies après attribution. Le Project template est la matrice de création des projets. Le Sourcing Request est le formulaire de déclenchement d'un besoin par le métier : aucun de ces trois objets ne trace les offres.",
          concept: "Bid history et Audit log",
        },
        {
          id: "m3-s3-j1-q3",
          question: "Dans un Full project, pourquoi le bouton Publish d'un événement peut-il être inactif ?",
          options: [
            "Parce que l'événement contient plus de 10 fournisseurs.",
            "Parce qu'une tâche d'approbation conditionnant la publication n'est pas encore approuvée.",
            "Parce que le prix de réserve n'est pas renseigné.",
            "Parce que la devise n'est pas l'euro.",
          ],
          answer: 1,
          explanation:
            "Lorsqu'une tâche d'approbation est associée au document événement dans le plan de projet, la publication est bloquée jusqu'à l'approbation. Le nombre de fournisseurs n'a aucune limite de ce type. Le prix de réserve est facultatif, même dans une enchère. La devise de l'événement est libre et n'a aucune incidence sur la possibilité de publier.",
          concept: "Types de tâches (To-do, Approval, Review, Notification)",
        },
        {
          id: "m3-s3-j1-q4",
          question: "Que se passe-t-il pour les offres déjà soumises lorsque l'acheteur met un événement en Pause pour corriger une annexe ?",
          options: [
            "Elles sont supprimées définitivement.",
            "Elles sont conservées et les fournisseurs peuvent les modifier après republication.",
            "Elles sont automatiquement acceptées.",
            "Elles sont transférées dans un nouvel événement.",
          ],
          answer: 1,
          explanation:
            "La Pause suspend l'événement sans détruire les données : les offres soumises restent enregistrées et, après republication, les fournisseurs peuvent les ajuster jusqu'à la nouvelle clôture. Aucune suppression automatique n'intervient, ce qui rend la première option fausse. Les offres ne sont jamais « acceptées » automatiquement : l'attribution est une décision explicite. Enfin, le transfert vers un nouvel événement n'existe pas en Pause ; il faudrait créer un nouvel événement manuellement, ce qui n'est pas le cas ici.",
          concept: "Pause, prolongation et reopen d'un événement",
        },
        {
          id: "m3-s3-j1-q5",
          question: "Un fournisseur invité n'a pas de compte Ariba Network. Que se passe-t-il ?",
          options: [
            "Il ne peut pas participer tant que l'acheteur ne paie pas une licence.",
            "Il reçoit un lien pour créer gratuitement un compte Standard et répondre.",
            "L'acheteur doit saisir toutes ses réponses en surrogate bid.",
            "L'invitation est rejetée par le système.",
          ],
          answer: 1,
          explanation:
            "L'invitation à un événement de sourcing permet au fournisseur de créer un compte Ariba Network Standard, gratuit, pour accéder à l'événement et répondre. Aucune licence acheteur n'est nécessaire pour la participation à un événement. La surrogate bid est une exception encadrée, pas le mode normal de participation. Le système ne rejette pas l'invitation : il la route vers le processus d'inscription du fournisseur.",
          concept: "Surrogate bid et participation fournisseur",
        },
      ],
    },

    // ───────────── Semaine 3 · Jour 2 : Suivi des économies et bonnes pratiques ─────────────
    {
      id: "m3-s3-j2-a1",
      moduleId: "m3",
      week: 3,
      day: 2,
      kind: "lecon",
      title: "Savings form, Spend visibility et gouvernance des économies",
      level: "avance",
      durationMin: 30,
      objective: "Documenter et fiabiliser les économies d'un projet de sourcing et en faire un levier de pilotage.",
      content: `## Pourquoi le Savings form est stratégique

Le **Savings form** (formulaire d'économies) est le document du projet qui transforme un résultat d'événement en **indicateur financier** partagé avec la direction. Mal défini, il produit des économies « papier » contestées par la DAF ; bien défini, il devient la preuve de valeur du programme achats.

## Les méthodes de calcul

| Méthode | Formule | Usage |
|---|---|---|
| **Baseline vs award** | (Prix historique − Prix attribué) × Volume | Renouvellement de contrat existant |
| **First bid vs award** | (Première offre − Offre finale) × Volume | Nouveau périmètre sans historique |
| **Budget vs award** | (Budget − Prix attribué) × Volume | Projets d'investissement |
| **Cost avoidance** | Hausse de marché évitée × Volume | Matières premières volatiles |

> Choisissez **une** méthode par type de projet dans le template et verrouillez-la : la comparabilité vaut plus que la précision.

## Structure du formulaire

Le Savings form est un **formulaire personnalisable** du template avec des champs standards (Baseline Spend, Awarded Spend, Savings Amount, Savings %, Contract Effective Date, Duration) et des champs clients (centre de coût, validation finance, nature de l'économie : récurrente ou ponctuelle). Il peut être **pré-rempli** depuis le scénario d'attribution de l'événement, puis soumis à une tâche d'**approbation** du contrôle de gestion.

## Spend visibility et reporting

Les projets alimentent **Ariba Spend Analysis** et les **rapports analytiques** de Sourcing :

- **Pipeline des projets** : nombre de projets par phase, par catégorie, par acheteur ;
- **Économies réalisées vs objectifs** : agrégation des Savings forms approuvés par Commodity et Region ;
- **Cycle time** : délai moyen Draft → Completed, un indicateur de maturité ;
- **Taux de participation** : fournisseurs invités vs ayant répondu, indicateur de qualité du panel.

Les attributs Commodity / Region / Department saisis dès la création du projet sont la clé de ces agrégations : une mauvaise classification initiale fausse tout le reporting aval.

## Bonnes pratiques de consultant

1. **Une méthode par template**, définie avec la DAF avant le premier projet.
2. **Baseline documentée** : la pièce justificative (ancien contrat, facture) est jointe au formulaire.
3. **Approbation finance obligatoire** au-dessus d'un seuil, conditionnée dans le template.
4. **Économies récurrentes annualisées** : un contrat de 3 ans compte pour 3 fois l'économie annuelle, mais seule l'année 1 est reconnue dans le budget courant.
5. **Lien contrat** : rattacher le Contract Workspace au projet pour suivre les économies **réalisées** (prix facturés) et pas seulement **négociées**.

## Le piège classique

Économie négociée ≠ économie réalisée. Si les demandeurs continuent de commander hors contrat (maverick buying), l'économie reste théorique. Le reporting croisé Sourcing × Buying (compliance au contrat) est l'indicateur ultime, et c'est le pont naturel vers le module Contrats.`,
      keyPoints: [
        "Le Savings form transforme un résultat d'événement en indicateur financier partagé avec la direction.",
        "Quatre méthodes : baseline vs award, first bid vs award, budget vs award, cost avoidance. Une seule par type de template.",
        "Le formulaire est personnalisable, pré-rempli depuis le scénario d'attribution et soumis à approbation finance.",
        "Commodity / Region / Department sont la clé des rapports d'économies et de pipeline.",
        "Économie négociée ≠ économie réalisée : le suivi de la compliance contrat ferme la boucle.",
      ],
    },
    {
      id: "m3-s3-j2-a2",
      moduleId: "m3",
      week: 3,
      day: 2,
      kind: "exercice",
      title: "Fiabiliser un reporting d'économies contesté",
      level: "avance",
      durationMin: 40,
      objective: "Diagnostiquer les causes d'un reporting d'économies non fiable et redéfinir les règles du Savings form.",
      context: `## Situation

Chez **Mediplex** (dispositifs médicaux, 3 200 salariés), la direction achats annonce **4,2 M€ d'économies** sur l'exercice ; le contrôle de gestion n'en reconnaît que **1,1 M€**. Vous auditez les 38 Savings forms du realm et constatez :

- 14 formulaires utilisent « first bid vs award », 19 « baseline vs award », 5 n'indiquent aucune méthode ;
- 11 formulaires portent une économie sur 3 ans comptabilisée intégralement en année 1 ;
- 7 projets ont l'attribut Commodity « Divers » ;
- aucune tâche d'approbation finance n'existe dans le template ;
- 6 économies concernent des contrats dont le taux de commandes hors contrat dépasse 50 % dans Buying.`,
      steps: [
        "Classez les cinq constats par impact sur l'écart de 3,1 M€ et expliquez le mécanisme de chaque surestimation.",
        "Proposez la méthode de calcul unique à retenir pour les renouvellements et celle pour les nouveaux périmètres, avec justification.",
        "Définissez la règle d'annualisation des économies pluriannuelles et la façon de la matérialiser dans les champs du Savings form.",
        "Rédigez la condition de la tâche d'approbation finance à ajouter dans le template (seuil, approbateur, documents requis).",
        "Proposez un plan de correction des 7 projets classés « Divers » et une règle pour empêcher la réutilisation de ce code.",
        "Décrivez l'indicateur de compliance contrat à mettre en place pour distinguer économies négociées et réalisées.",
      ],
      deliverable: "Une note de diagnostic d'une page et la nouvelle « règle du jeu » du Savings form (méthodes, annualisation, approbation, classification).",
      solution: `## Corrigé type

**Diagnostic classé par impact**

1. **Comptabilisation pluriannuelle en année 1** (11 formulaires) : la cause majeure. Une économie de 300 k€/an sur 3 ans déclarée 900 k€ en année 1 triple artificiellement le chiffre.
2. **Mélange de méthodes** : « first bid vs award » gonfle mécaniquement les économies car la première offre est souvent volontairement haute. Appliquée aux renouvellements, elle ignore le prix historique réellement payé.
3. **Absence d'approbation finance** : aucun contrôle n'a filtré les deux anomalies précédentes.
4. **Commandes hors contrat > 50 %** : l'économie négociée n'est réalisée que sur la moitié des volumes.
5. **Commodity « Divers »** : n'explique pas l'écart mais rend le reporting par catégorie inexploitable.

**Méthodes retenues**

- Renouvellement : **baseline vs award**, baseline = prix moyen pondéré facturé sur les 12 derniers mois (justificatif joint).
- Nouveau périmètre : **budget vs award**, budget validé par le contrôle de gestion avant publication ; « first bid vs award » n'est conservé qu'à titre indicatif dans un champ séparé non agrégé.

**Annualisation** : champ **Contract Duration (mois)** obligatoire ; champ calculé **Annual Savings** = Savings Amount total ÷ (Duration ÷ 12). Le reporting budgétaire agrège Annual Savings ; le reporting pluriannuel conserve le total.

**Tâche d'approbation finance** : type Approval, approbateur = groupe « Controlling », condition **Annual Savings > 100 000 €** ou méthode = cost avoidance, documents requis : justificatif baseline + scénario d'attribution exporté.

**Projets « Divers »** : atelier d'une heure avec les acheteurs pour reclasser les 7 projets ; puis suppression du code « Divers » de la liste des Commodity autorisées dans le template et ajout d'une tâche Review « Vérification classification » en phase de cadrage.

**Indicateur de compliance** : rapport croisé Buying × Contrats : part des dépenses de la catégorie passées sur contrat (PO référençant le contrat / dépense totale). Économie réalisée = Annual Savings × taux de compliance. Publié mensuellement à la direction achats.`,
      tips: [
        "Commencez toujours par les économies pluriannuelles : c'est l'écart le plus rapide à expliquer et à corriger.",
        "Faites valider la méthode par la DAF en atelier et consignez-la dans le template : la règle écrite protège l'acheteur.",
        "Un indicateur de compliance contrat se construit avec l'équipe Buying : prévoyez-la dans l'atelier.",
      ],
    },
    {
      id: "m3-s3-j2-a3",
      moduleId: "m3",
      week: 3,
      day: 2,
      kind: "quiz",
      title: "Quiz : économies, reporting et bonnes pratiques",
      level: "avance",
      durationMin: 15,
      objective: "Valider la maîtrise du Savings form, des méthodes de calcul et du reporting.",
      questions: [
        {
          id: "m3-s3-j2-q1",
          question: "Quelle méthode de calcul d'économies est la plus adaptée au renouvellement d'un contrat existant ?",
          options: ["First bid vs award", "Baseline vs award", "Budget vs award", "Nombre de fournisseurs invités"],
          answer: 1,
          explanation:
            "Pour un renouvellement, le prix historique réellement payé constitue la référence la plus défendable : la méthode baseline vs award compare ce prix au prix attribué. First bid vs award surestime car la première offre est souvent gonflée stratégiquement. Budget vs award convient aux projets d'investissement sans historique de prix. Le nombre de fournisseurs invités est un indicateur de participation, pas une méthode d'économies.",
          concept: "Méthodes de calcul des économies (Savings form)",
        },
        {
          id: "m3-s3-j2-q2",
          question: "Un contrat de 3 ans génère 200 k€ d'économies par an. Quelle est la bonne pratique de reporting budgétaire ?",
          options: [
            "Déclarer 600 k€ en année 1.",
            "Déclarer 200 k€ par an (économie annualisée) et conserver 600 k€ en vue pluriannuelle.",
            "Ne rien déclarer avant la fin du contrat.",
            "Déclarer 600 k€ chaque année.",
          ],
          answer: 1,
          explanation:
            "L'annualisation aligne les économies sur les exercices budgétaires : 200 k€ reconnus chaque année, le total de 600 k€ restant visible dans une vue pluriannuelle. Déclarer 600 k€ en année 1 est la surestimation la plus fréquente et la première contestée par la finance. Attendre la fin du contrat prive la direction d'un indicateur de pilotage. Déclarer 600 k€ chaque année tripler ait l'économie réelle.",
          concept: "Annualisation des économies pluriannuelles",
        },
        {
          id: "m3-s3-j2-q3",
          question: "Pourquoi l'attribut Commodity doit-il être fiable dès la création du projet ?",
          options: [
            "Parce qu'il détermine la devise de l'événement.",
            "Parce qu'il est la clé d'agrégation des rapports d'économies et de pipeline.",
            "Parce qu'il est imprimé sur le bon de commande.",
            "Parce qu'il déclenche automatiquement la signature du contrat.",
          ],
          answer: 1,
          explanation:
            "Les rapports de Sourcing agrègent économies, pipeline et cycle time par Commodity, Region et Department ; un code « Divers » ou erroné rend ces analyses inexploitables. La devise se définit dans l'événement, indépendamment du commodity. Le bon de commande relève de Buying et porte ses propres codes marchandise issus de la ligne, non de l'attribut projet. Aucun attribut ne déclenche de signature : la contractualisation est un processus distinct dans Contracts.",
          concept: "Attributs Commodity, Region, Department",
        },
        {
          id: "m3-s3-j2-q4",
          question: "Qu'appelle-t-on « économie réalisée » par opposition à « économie négociée » ?",
          options: [
            "L'économie calculée à partir de la première offre.",
            "L'économie effectivement constatée sur les volumes réellement commandés sur contrat.",
            "L'économie approuvée par le Project Owner.",
            "L'économie exprimée en pourcentage.",
          ],
          answer: 1,
          explanation:
            "L'économie négociée résulte du scénario d'attribution ; l'économie réalisée mesure ce qui se matérialise dans les commandes et factures passées sur le contrat. Si les demandeurs achètent hors contrat, l'écart est important. La première offre sert à la méthode first bid vs award, pas à cette distinction. L'approbation par le Project Owner ne change pas la nature de l'économie. L'expression en pourcentage n'est qu'un format d'affichage.",
          concept: "Économie négociée vs réalisée et compliance contrat",
        },
        {
          id: "m3-s3-j2-q5",
          question: "Quel indicateur mesure la maturité du processus de sourcing en termes de délai ?",
          options: ["Cycle time Draft → Completed", "Savings %", "Nombre de lots", "Taux de pre-requisites acceptés"],
          answer: 0,
          explanation:
            "Le cycle time, délai moyen entre la création et la clôture d'un événement ou d'un projet, reflète la fluidité du processus et l'efficacité des templates et approbations. Le Savings % mesure la performance financière, pas le délai. Le nombre de lots décrit la structure d'un événement. Le taux d'acceptation des pre-requisites renseigne sur l'engagement des fournisseurs à l'entrée, non sur la durée du processus.",
          concept: "Reporting Sourcing : pipeline, cycle time, participation",
        },
      ],
    },
  ],

  useCases: [
    {
      id: "m3-uc1",
      moduleId: "m3",
      title: "Industrialiser 300 consultations par an avec un template unique",
      client: "Grande distribution alimentaire, 25 000 salariés, 120 acheteurs",
      situation: "Chaque acheteur créait ses événements à sa façon : aucune phase commune, économies déclarées sur des bases différentes, aucune visibilité du pipeline pour la direction achats.",
      challenge: "Standardiser sans rigidifier : les acheteurs frais/produits de grande consommation ont des cycles de 3 semaines, les acheteurs indirects des cycles de 4 mois.",
      approach: [
        "Atelier de cartographie des processus par famille d'achats (2 jours) pour identifier le tronc commun : cadrage, consultation, attribution, contractualisation.",
        "Conception de deux templates : « Rapide » (Quick project enrichi d'un Savings form) et « Stratégique » (Full project avec approbations conditionnelles).",
        "Paramétrage des conditions d'approbation sur Estimated Value et Commodity pour que seules les consultations sensibles passent devant la DAF.",
        "Création de modèles d'événements RFP par famille avec sections et termes pré-remplis.",
        "Formation de 12 référents acheteurs, puis déploiement par vagues régionales sur 3 mois.",
      ],
      outcome: "Cycle time moyen passé de 54 à 31 jours, 100 % des projets classés par Commodity, reporting mensuel du pipeline accepté par la direction générale.",
      lesson: "Le template est le vrai produit du consultant Sourcing : tout ce qui n'y est pas standardisé sera réinventé par chaque acheteur.",
    },
    {
      id: "m3-uc2",
      moduleId: "m3",
      title: "Première enchère inverse sur le transport routier",
      client: "Industrie chimique, 4 500 salariés",
      situation: "Le category manager transport négociait en face à face avec 9 transporteurs, sur 5 semaines, sans trace structurée des offres successives.",
      challenge: "Convaincre des fournisseurs méfiants de participer à une enchère électronique et choisir un format qui ne dégrade pas la relation.",
      approach: [
        "RFP de qualification technique préalable pour aligner les offres (assurance, flotte, certifications).",
        "Choix d'une enchère English reverse par lot régional, avec Market feedback limité au rang (sans meilleur prix) pour rassurer les participants.",
        "Session de formation des fournisseurs via l'événement de test (training event) une semaine avant.",
        "Paramétrage : preview 48 h, enchère 30 minutes, overtime 3 minutes, décrément minimal 0,5 %.",
        "Présence du consultant et de l'acheteur en salle de monitoring le jour J avec procédure d'incident écrite.",
      ],
      outcome: "Baisse de 11,4 % par rapport à la baseline sur 3,8 M€, 8 transporteurs sur 9 actifs jusqu'à la dernière minute, zéro réclamation.",
      lesson: "La réussite d'une enchère se décide avant l'ouverture : qualification, formation des fournisseurs et règles expliquées.",
    },
    {
      id: "m3-uc3",
      moduleId: "m3",
      title: "Réconcilier achats et finance sur les économies",
      client: "Groupe de services aux entreprises, 12 000 salariés",
      situation: "Les économies annoncées par les achats étaient systématiquement divisées par trois par le contrôle de gestion, ce qui décrédibilisait le programme Ariba.",
      challenge: "Faire accepter une définition commune des économies sans démotiver les acheteurs.",
      approach: [
        "Audit de 60 Savings forms et classification des écarts (méthode, annualisation, compliance).",
        "Atelier conjoint achats-finance pour arrêter une méthode par type de projet et une règle d'annualisation.",
        "Refonte du Savings form : champs calculés, justificatif baseline obligatoire, tâche d'approbation Controlling conditionnelle.",
        "Mise en place d'un rapport mensuel Sourcing × Buying de compliance contrat par catégorie.",
      ],
      outcome: "Taux de reconnaissance des économies par la finance passé de 35 % à 92 % en deux trimestres ; objectif d'économies intégré au budget groupe.",
      lesson: "Une économie n'existe que si la finance la reconnaît : le Savings form est un contrat entre les achats et la DAF.",
    },
  ],

  glossary: [
    { term: "Sourcing Project", definition: "Conteneur regroupant événements, documents, tâches, équipe et attributs d'une démarche de sourcing. Existe en Quick project (un événement) ou Full project (plan complet).", moduleId: "m3" },
    { term: "Project template", definition: "Matrice administrée par les Template Creators qui préconfigure phases, tâches, documents, groupes et conditions d'un projet.", moduleId: "m3" },
    { term: "Sourcing Request", definition: "Formulaire léger permettant au métier d'exprimer un besoin de consultation, transformé en Sourcing Project après approbation.", moduleId: "m3" },
    { term: "Phase / Task", definition: "Éléments du plan de projet. Les tâches sont de type To-do, Approval (bloquante), Review ou Notification et peuvent porter des conditions d'affichage.", moduleId: "m3" },
    { term: "Event rules", definition: "Règles d'un événement réparties en Timing (dates, overtime), Bidding (décrément, prix de réserve, surrogate bid) et Market feedback (visibilité donnée aux fournisseurs).", moduleId: "m3" },
    { term: "English reverse auction", definition: "Enchère où les fournisseurs soumettent des prix successivement plus bas ; le plus bas remporte la ligne ou le lot.", moduleId: "m3" },
    { term: "Dutch auction", definition: "Enchère où le prix affiché monte par paliers depuis un prix bas ; le premier fournisseur qui accepte remporte.", moduleId: "m3" },
    { term: "Japanese auction", definition: "Enchère où le prix descend par paliers ; chaque fournisseur confirme ou sort, sans voir son rang.", moduleId: "m3" },
    { term: "Pending Selection", definition: "État de l'événement après clôture : les offres sont dépouillées, notées et un scénario d'attribution est construit.", moduleId: "m3" },
    { term: "Surrogate bid", definition: "Offre saisie par l'acheteur au nom d'un fournisseur, si la règle l'autorise, tracée dans le Bid history.", moduleId: "m3" },
    { term: "Savings form", definition: "Formulaire du projet documentant la méthode, la baseline et le montant des économies, soumis à approbation finance.", moduleId: "m3" },
    { term: "Spend visibility", definition: "Capacité à analyser les dépenses et économies par Commodity, Region et Department grâce aux attributs des projets et aux rapports Ariba.", moduleId: "m3" },
  ],

  faq: [
    { q: "Faut-il toujours créer un Full project ?", a: "Non. Un Quick project suffit pour une consultation tactique à événement unique. Dès qu'il y a plusieurs événements, des approbations ou un suivi d'économies formalisé, le Full project s'impose. On peut convertir un Quick en Full, pas l'inverse.", moduleId: "m3" },
    { q: "Peut-on lancer une enchère sans RFP préalable ?", a: "Techniquement oui, mais c'est déconseillé. L'enchère suppose des offres comparables : une qualification technique préalable (RFP ou données SLP) évite d'attribuer au moins cher non conforme.", moduleId: "m3" },
    { q: "Qui peut modifier les règles d'un événement déjà publié ?", a: "L'Event owner et les membres du groupe de projet disposant des droits d'édition, en mettant l'événement en Pause. Toute modification est tracée dans l'Audit log et notifiée aux participants.", moduleId: "m3" },
    { q: "Comment un fournisseur sans compte Ariba répond-il ?", a: "L'invitation contient un lien de création d'un compte Ariba Network Standard, gratuit. Le fournisseur accède ensuite à l'événement, accepte les pre-requisites et soumet son offre.", moduleId: "m3" },
    { q: "Pourquoi la finance conteste-t-elle les économies déclarées dans Ariba ?", a: "Le plus souvent à cause de méthodes de calcul hétérogènes, d'économies pluriannuelles comptées en année 1 et de l'absence de contrôle de la compliance contrat. Une méthode unique par template et une tâche d'approbation finance règlent l'essentiel.", moduleId: "m3" },
    { q: "Le Savings form est-il obligatoire ?", a: "Non, c'est un document du template. En pratique, le consultant le rend obligatoire via une tâche To-do ou Approval en fin de projet pour garantir que chaque attribution est documentée.", moduleId: "m3" },
  ],
};
