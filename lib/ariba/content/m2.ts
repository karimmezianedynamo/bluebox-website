import type { ModuleContent } from "../types";

export const m2: ModuleContent = {
  moduleId: "m2",
  activities: [
    // ───────────── Semaine 1 · Jour 3 : La demande d'achat et Guided Buying ─────────────
    {
      id: "m2-s1-j3-a1",
      moduleId: "m2",
      week: 1,
      day: 3,
      kind: "lecon",
      title: "La Requisition : cœur du Procure-to-Pay",
      level: "debutant",
      durationMin: 25,
      objective: "Comprendre la structure d'une demande d'achat Ariba, les types de lignes (catalogue, hors catalogue, Spot Buy) et le rôle de Guided Buying.",
      content: `## Le flux P2P en une phrase

**Requisition → approbation → Purchase Order → Receipt → Invoice → Invoice Reconciliation → paiement.** Tout commence par la demande d'achat, appelée **Requisition (PR)** dans Ariba Buying.

## Anatomie d'une Requisition

Une Requisition comporte un **en-tête** (titre, demandeur, préparateur, date de besoin, adresse de livraison, commentaires, pièces jointes) et des **lignes**. Chaque ligne porte :

- la description, la quantité, l'unité et le prix ;
- le **fournisseur** et sa **Supplier Location** (adresse de commande reliée à un ANID) ;
- le **Commodity code** (classification, souvent UNSPSC) ;
- l'**Account assignment** : centre de coûts, compte général, éventuellement ordre interne ou élément d'OTP, répliqués depuis S/4HANA ;
- le **Purchasing Unit** et la société (Company Code) qui déterminent l'organisation d'achat.

> Le Commodity code et l'imputation ne sont pas de simples informations : ils déclenchent les règles d'approbation et la détermination comptable.

## Les trois façons de créer une ligne

| Type de ligne | Comment | Qui traite |
|---|---|---|
| **Catalogue** | Recherche dans les catalogues CIF ou PunchOut publiés | Aucun acheteur : prix et fournisseur déjà négociés |
| **Hors catalogue (Non-catalog request)** | Formulaire libre : description, prix estimé, fournisseur suggéré | Un **Purchasing Agent** complète et valide avant commande |
| **Spot Buy** | Marketplace intégrée pour achats ponctuels de faible montant | Automatisé, dans les limites de politique |

Les lignes hors catalogue sont le point de friction classique : l'acheteur doit sourcer, choisir le fournisseur, parfois renvoyer la demande en Sourcing. Réduire leur part est un indicateur de maturité du déploiement.

## Guided Buying : l'expérience simplifiée

**Guided Buying** est l'interface « grand public » posée au-dessus de Buying. Elle présente des **tuiles** par catégorie (informatique, fournitures, prestations…), des **formulaires** guidés et des **politiques d'achat** affichées au bon moment (ex. « au-delà de 5 000 €, trois devis sont requis »). La demande créée dans Guided Buying est bien une Requisition classique, visible ensuite dans Buying avec toutes ses règles d'approbation.

Guided Buying apporte :

- des **politiques** bloquantes ou informatives configurées par l'administrateur ;
- des **formulaires** pour les besoins récurrents (nouvelle prestation, demande de badge, etc.) ;
- une gestion des **préférences** (fournisseurs préférés mis en avant) ;
- un accès **Spot Buy** et aux catalogues PunchOut sans quitter l'interface.

## Statuts d'une Requisition

Composing (brouillon) → **Submitted** → **Approved** (ou Denied) → **Ordered** (le PO est créé) → Receiving → Received. Une Requisition approuvée puis modifiée crée un **Change order** : nouvelle version, nouveau passage éventuel en approbation.

## Ce que le consultant paramètre ici

- les champs obligatoires et les champs personnalisés sur l'en-tête et les lignes ;
- les Commodity codes et leur correspondance avec les groupes de marchandises S/4HANA ;
- les tuiles, formulaires et politiques Guided Buying ;
- les règles de détermination du fournisseur et de l'imputation par défaut.`,
      keyPoints: [
        "La Requisition est la demande d'achat ; ses lignes portent fournisseur, Supplier Location, Commodity code et Account assignment.",
        "Trois types de lignes : catalogue (sans acheteur), hors catalogue (traitée par un Purchasing Agent), Spot Buy (marketplace).",
        "Guided Buying est une interface simplifiée au-dessus de Buying : tuiles, formulaires et politiques, mais la demande reste une Requisition.",
        "Les statuts suivent Composing → Submitted → Approved → Ordered → Received ; une modification après approbation génère un Change order.",
        "Commodity code et imputation pilotent les approbations et la comptabilisation : leur qualité conditionne tout le flux.",
      ],
    },
    {
      id: "m2-s1-j3-a2",
      moduleId: "m2",
      week: 1,
      day: 3,
      kind: "exercice",
      title: "Concevoir trois demandes d'achat types et leurs politiques Guided Buying",
      level: "debutant",
      durationMin: 40,
      objective: "Savoir distinguer les types de lignes et formaliser des politiques Guided Buying à partir de besoins métier concrets.",
      context: `## Situation

Chez **Novalis Cosmétiques**, trois demandeurs vous décrivent leurs besoins :

- **Léa, responsable laboratoire** : 12 boîtes de gants nitrile référencées chez le fournisseur Labo+ qui dispose d'un catalogue.
- **Karim, chef de projet IT** : une prestation de développement de 45 000 € par un intégrateur non référencé, à répartir sur deux centres de coûts.
- **Sophie, assistante de direction** : un bouquet de fleurs à 80 € pour un départ en retraite, fournisseur inconnu.

La direction achats a fixé trois règles : trois devis au-delà de 25 000 € pour les prestations, interdiction des achats de cadeaux au-delà de 150 €, achats ponctuels de moins de 500 € orientés vers Spot Buy.`,
      steps: [
        "Pour chaque besoin, déterminez le type de ligne Ariba (catalogue, hors catalogue, Spot Buy) et justifiez.",
        "Listez, pour la ligne de Karim, les informations qu'un Purchasing Agent devra compléter avant qu'un PO puisse être émis (fournisseur, Supplier Location, Commodity code, répartition d'imputation).",
        "Décrivez comment la demande de Karim est découpée comptablement : une ligne avec répartition (split accounting) ou deux lignes ?",
        "Traduisez les trois règles de la direction en politiques Guided Buying : type (bloquante ou informative), condition (montant, catégorie), message affiché.",
        "Indiquez la tuile Guided Buying dans laquelle chaque demandeur devrait trouver son besoin.",
        "Précisez quel statut aura chaque Requisition une fois soumise et qui sera le premier intervenant.",
      ],
      deliverable: "Un tableau à trois lignes (demandeur, type de ligne, tuile, politique déclenchée, premier intervenant) et la rédaction des trois politiques Guided Buying.",
      solution: `## Analyse des trois demandes

| Demandeur | Type de ligne | Tuile | Politique | Premier intervenant |
|---|---|---|---|---|
| Léa | Catalogue (CIF Labo+) | Laboratoire / Consommables | Aucune, prix négocié | Approbateur hiérarchique |
| Karim | Hors catalogue | Prestations IT | Bloquante : 3 devis au-delà de 25 000 € | Purchasing Agent |
| Sophie | Spot Buy (ou hors catalogue) | Événementiel / Cadeaux | Informative : cadeau sous 150 €, orienté Spot Buy | Approbateur hiérarchique |

## Détail pour Karim

Le Purchasing Agent devra : créer ou sélectionner le fournisseur et sa **Supplier Location** (si le fournisseur n'existe pas, déclencher une Supplier Request SLP), affecter un **Commodity code** de type « services informatiques », saisir le prix définitif après les trois devis et vérifier la **répartition d'imputation**. Une seule ligne avec **split accounting** (par exemple 60 % / 40 % sur deux centres de coûts) est préférable à deux lignes : la prestation est unique, la facture du fournisseur le sera aussi, ce qui simplifie le rapprochement.

## Politiques Guided Buying

1. **Prestations supérieures à 25 000 €** : politique bloquante sur la catégorie Prestations lorsque le montant dépasse 25 000 €, message : « Trois devis sont obligatoires. Joignez-les à la demande ou contactez votre acheteur. » Le demandeur doit joindre les pièces ou la soumission est refusée.
2. **Cadeaux et événementiel** : politique bloquante au-delà de 150 € sur la catégorie Cadeaux, message rappelant la charte éthique ; en dessous, simple message informatif.
3. **Achats ponctuels inférieurs à 500 €** : politique informative redirigeant vers la tuile Spot Buy pour les articles non catalogués.

## Statuts

Les trois Requisitions passent en **Submitted**. Celle de Léa suit directement le flux d'approbation ; celle de Karim est d'abord routée vers le Purchasing Agent (étape d'approbation de type acheteur) ; celle de Sophie, si traitée via Spot Buy, est généralement approuvée par le manager puis commandée automatiquement.`,
      tips: [
        "Une politique Guided Buying doit être rédigée du point de vue du demandeur : courte, actionnable, avec la bonne porte de sortie.",
        "Lorsqu'un fournisseur n'existe pas, pensez au lien avec SLP : la Supplier Request fait partie du flux P2P réel.",
      ],
    },
    {
      id: "m2-s1-j3-a3",
      moduleId: "m2",
      week: 1,
      day: 3,
      kind: "quiz",
      title: "Quiz : la Requisition et Guided Buying",
      level: "debutant",
      durationMin: 12,
      objective: "Valider la connaissance des types de lignes, des champs clés et du rôle de Guided Buying.",
      questions: [
        {
          id: "m2-s1-j3-q1",
          question: "Quel champ d'une ligne de Requisition déclenche en priorité les règles d'approbation par catégorie d'achat ?",
          options: ["Le Commodity code", "La date de besoin", "Le numéro de téléphone du demandeur", "Le titre de la Requisition"],
          answer: 0,
          explanation: "Le Commodity code classe la ligne (souvent selon UNSPSC) et sert de critère aux règles d'approbation (par exemple un approbateur IT pour les catégories informatiques) et à la détermination du compte général. La date de besoin influence la livraison, pas l'approbation. Le téléphone et le titre sont des informations descriptives sans effet sur le flux.",
          concept: "Commodity code et imputation",
        },
        {
          id: "m2-s1-j3-q2",
          question: "Une demande hors catalogue (Non-catalog request) est soumise. Qui intervient en général avant qu'un Purchase Order puisse être émis ?",
          options: ["Le fournisseur sur le Business Network", "Un Purchasing Agent qui complète fournisseur, prix et Commodity code", "Le Catalog Manager qui crée un catalogue", "Le comptable qui crée la facture"],
          answer: 1,
          explanation: "Une ligne hors catalogue est incomplète par nature : le Purchasing Agent est inséré dans le flux pour désigner le fournisseur et sa Supplier Location, fixer le prix et contrôler la classification. Le fournisseur n'intervient qu'à réception du PO. Le Catalog Manager ne crée pas de catalogue pour chaque demande ponctuelle, et la facture arrive bien après la commande.",
          concept: "Demandes hors catalogue et rôle du Purchasing Agent",
        },
        {
          id: "m2-s1-j3-q3",
          question: "Quelle affirmation sur Guided Buying est exacte ?",
          options: [
            "Guided Buying remplace Buying & Invoicing et possède ses propres flux d'approbation",
            "Guided Buying crée des Requisitions classiques dans Buying, en ajoutant tuiles, formulaires et politiques",
            "Guided Buying est réservé aux fournisseurs du Business Network",
            "Guided Buying ne gère que les achats catalogue",
          ],
          answer: 1,
          explanation: "Guided Buying est une couche d'expérience utilisateur : la demande créée est une Requisition Buying standard qui suit les règles d'approbation du realm. Il ne remplace donc pas Buying et n'a pas de flux séparé. Il est destiné aux demandeurs occasionnels de l'acheteur, pas aux fournisseurs, et il gère aussi bien les catalogues que les formulaires hors catalogue et Spot Buy.",
          concept: "Guided Buying : tuiles, formulaires et politiques",
        },
        {
          id: "m2-s1-j3-q4",
          question: "Dans quel ordre se succèdent les statuts d'une Requisition ?",
          options: [
            "Ordered → Submitted → Approved → Composing",
            "Composing → Submitted → Approved → Ordered",
            "Submitted → Composing → Ordered → Approved",
            "Approved → Composing → Submitted → Ordered",
          ],
          answer: 1,
          explanation: "La Requisition est rédigée (Composing), soumise (Submitted), approuvée ou refusée (Approved/Denied) puis commandée (Ordered) lorsque le ou les PO sont générés ; viennent ensuite Receiving et Received. Les autres ordres sont incohérents : on ne peut pas commander avant d'approuver, ni revenir en brouillon après soumission sans retrait explicite.",
          concept: "Statuts de la Requisition",
        },
        {
          id: "m2-s1-j3-q5",
          question: "Un demandeur veut imputer une prestation unique à deux centres de coûts. Quelle solution est la plus adaptée ?",
          options: [
            "Créer deux Requisitions distinctes",
            "Créer deux lignes avec la même description",
            "Utiliser la répartition d'imputation (split accounting) sur une seule ligne",
            "Demander au fournisseur d'envoyer deux factures",
          ],
          answer: 2,
          explanation: "Le split accounting permet de ventiler une ligne en pourcentage, montant ou quantité sur plusieurs imputations tout en conservant une ligne de commande unique, cohérente avec la facture unique du fournisseur. Deux Requisitions ou deux lignes compliquent le rapprochement et peuvent créer deux PO. Imposer deux factures au fournisseur déplace le problème chez lui et dégrade la relation.",
          concept: "Commodity code et imputation",
        },
      ],
    },

    // ───────────── Semaine 1 · Jour 4 : Approbations et bon de commande ─────────────
    {
      id: "m2-s1-j4-a1",
      moduleId: "m2",
      week: 1,
      day: 4,
      kind: "lecon",
      title: "Flux d'approbation et Purchase Order",
      level: "debutant",
      durationMin: 30,
      objective: "Comprendre comment Ariba calcule un flux d'approbation et comment le Purchase Order est généré, transmis et modifié.",
      content: `## Le flux d'approbation (Approval flow)

Quand une Requisition est soumise, Ariba calcule un **graphe d'approbation** composé de nœuds en **série** (l'un après l'autre) ou en **parallèle**. Chaque nœud est produit par une **règle d'approbation** qui s'appuie sur :

- le **montant** total ou par ligne (seuils) ;
- la **hiérarchie** du demandeur (Supervisor, puis chaîne de managers jusqu'au seuil autorisé) ;
- le **Commodity code** (approbateur de catégorie, ex. DSI pour l'informatique) ;
- l'**imputation** (responsable de centre de coûts) ;
- des champs personnalisés (projet, site, risque).

Les approbateurs peuvent **approuver**, **refuser (Deny)** ou ajouter un approbateur. Un refus renvoie la Requisition au demandeur en statut Denied. Un approbateur peut être un **groupe** : le premier membre à agir clôt le nœud. Les **délégations** d'approbation couvrent les absences, et l'**escalade** (escalation) réaffecte un nœud non traité après un délai paramétré.

> Le flux affiché sur la Requisition est prévisualisable avant soumission : c'est un excellent support en atelier pour valider les règles avec le métier.

## Génération du Purchase Order

Lorsque le dernier nœud est approuvé, la Requisition passe en **Ordered** et Ariba crée un **Purchase Order par fournisseur et par Supplier Location**. Le PO hérite des lignes, prix, imputations et conditions de paiement. Le numéro de PO est généré par Ariba (préfixe paramétrable) ou par S/4HANA selon le scénario d'intégration.

## Transmission au fournisseur

La **méthode de commande** (Order routing) est définie sur la Supplier Location :

| Méthode | Fonctionnement |
|---|---|
| Business Network (cXML) | Le PO est poussé sur le compte ANID du fournisseur ; intégration possible |
| E-mail | PDF envoyé automatiquement, le fournisseur Standard peut le « flipper » en facture |
| Fax / impression | Cas résiduels |
| URL / EDI | Fournisseurs très intégrés |

## Modifier ou annuler une commande

Un **Change order** modifie une Requisition déjà commandée (quantité, prix, date) : Ariba crée une nouvelle version (V2, V3…), relance l'approbation si les règles l'exigent, puis envoie un PO mis à jour au fournisseur. L'**annulation** envoie un PO en statut Cancelled. Les réceptions ou factures déjà enregistrées limitent les modifications possibles (on ne peut pas réduire une quantité sous ce qui a été reçu).

## Scénarios d'intégration de la commande

- **PO créé dans Ariba, répliqué dans S/4HANA** : le cas le plus fréquent pour les achats indirects ; S/4HANA porte l'engagement budgétaire et la comptabilité.
- **PO créé dans S/4HANA, envoyé au Network via Ariba** : fréquent pour les achats directs liés au MRP.
- **Mode hybride** : selon la catégorie ou la société.

Le consultant doit toujours clarifier ce scénario avant de parler de réception et de facture, car il détermine quel système est maître du PO.`,
      keyPoints: [
        "Le flux d'approbation est calculé par des règles (montant, hiérarchie, Commodity code, imputation) en nœuds série ou parallèle.",
        "Deny renvoie la demande au demandeur ; délégations et escalades gèrent les absences et les retards.",
        "À l'approbation finale, un PO est créé par fournisseur et Supplier Location, puis transmis selon la méthode de commande (Network, e-mail…).",
        "Un Change order versionne la Requisition et peut relancer l'approbation ; les réceptions existantes limitent les modifications.",
        "Le scénario d'intégration (PO maître dans Ariba ou dans S/4HANA) conditionne tout le reste du flux.",
      ],
    },
    {
      id: "m2-s1-j4-a2",
      moduleId: "m2",
      week: 1,
      day: 4,
      kind: "exercice",
      title: "Modéliser la matrice d'approbation d'un client",
      level: "debutant",
      durationMin: 40,
      objective: "Traduire une politique de délégation en règles d'approbation Ariba et en prévisualiser le flux sur des cas concrets.",
      context: `## La politique de délégation de Novalis

- Toute demande est approuvée par le **manager direct** du demandeur.
- Au-delà de **10 000 €**, le **directeur de département** approuve en plus.
- Au-delà de **50 000 €**, le **directeur financier** approuve également.
- Les achats **informatiques** (matériel et logiciels) requièrent toujours la validation de la **DSI**, quel que soit le montant.
- Les prestations de **conseil** supérieures à 20 000 € passent par la **direction achats**.
- Les lignes hors catalogue sont traitées par un **Purchasing Agent** avant tout autre approbateur.

Deux demandes à analyser : (A) 3 ordinateurs portables catalogue, 4 200 € ; (B) une mission de conseil hors catalogue, 65 000 €, demandée par un chef de service.`,
      steps: [
        "Listez les règles d'approbation nécessaires en précisant pour chacune le critère (montant, Commodity code, type de ligne) et l'approbateur (personne, rôle ou groupe).",
        "Indiquez pour chaque règle si le nœud doit être en série ou en parallèle avec les autres, et dans quel ordre.",
        "Dessinez le graphe d'approbation prévisible pour la demande A.",
        "Dessinez le graphe d'approbation prévisible pour la demande B.",
        "Identifiez les données de référence nécessaires : hiérarchie (Supervisor) des utilisateurs, groupes DSI et Direction achats, Commodity codes informatiques et conseil.",
        "Proposez un paramétrage de délégation et d'escalade (délai, destinataire) pour éviter les blocages.",
      ],
      deliverable: "Un tableau des règles d'approbation et deux graphes d'approbation commentés (A et B).",
      solution: `## Règles d'approbation

| Règle | Critère | Approbateur | Position |
|---|---|---|---|
| R0 Acheteur | Ligne hors catalogue | Groupe Purchasing Agent | Premier nœud, série |
| R1 Manager | Toujours | Supervisor du demandeur | Série |
| R2 Directeur | Montant supérieur à 10 000 € | Manager du Supervisor (niveau 2) | Série après R1 |
| R3 DAF | Montant supérieur à 50 000 € | Groupe Finance Director | Série après R2 |
| R4 DSI | Commodity code informatique | Groupe DSI Approvers | Parallèle à la chaîne hiérarchique |
| R5 Achats | Commodity code conseil et montant supérieur à 20 000 € | Groupe Direction Achats | Parallèle |

## Demande A (4 200 €, informatique, catalogue)

Graphe : **Manager direct** (R1) en série, et **DSI** (R4) en parallèle. R0 ne se déclenche pas (ligne catalogue), R2 et R3 ne s'appliquent pas (montant insuffisant). Deux approbations suffisent.

## Demande B (65 000 €, conseil, hors catalogue)

Graphe : **Purchasing Agent** (R0) en tête, puis **Manager** (R1) → **Directeur de département** (R2) → **DAF** (R3) en série, avec **Direction Achats** (R5) en parallèle de la chaîne hiérarchique. Cinq nœuds au total. En pratique, on insère souvent la Direction Achats après le Purchasing Agent pour qu'elle valide le choix du fournisseur avant que la hiérarchie n'approuve le montant.

## Données de référence

La chaîne hiérarchique repose sur le champ **Supervisor** des utilisateurs, alimenté par l'import des utilisateurs (fichier ou SAP SuccessFactors / S/4HANA). Les groupes DSI Approvers, Finance Director et Direction Achats sont des groupes personnalisés. Les Commodity codes « informatique » et « conseil » doivent être regroupés (parent code) pour éviter d'énumérer des dizaines de codes dans les règles.

## Délégation et escalade

Chaque approbateur peut déclarer une délégation datée. L'escalade est paramétrée à 3 jours ouvrés vers le Supervisor de l'approbateur, avec rappel par e-mail à 48 heures. Pour les groupes, l'escalade est inutile si le groupe compte plusieurs membres actifs.`,
      tips: [
        "Pensez toujours en « parallèle » pour les validations d'expertise (DSI, achats) et en « série » pour la hiérarchie : cela raccourcit les délais.",
        "Regroupez les Commodity codes par famille parente avant d'écrire une règle.",
        "Prévisualisez le flux dans le realm de test avec de vraies données utilisateurs : les surprises viennent presque toujours de la hiérarchie incomplète.",
      ],
    },
    {
      id: "m2-s1-j4-a3",
      moduleId: "m2",
      week: 1,
      day: 4,
      kind: "quiz",
      title: "Quiz : approbations et Purchase Order",
      level: "debutant",
      durationMin: 12,
      objective: "Contrôler la compréhension du calcul des flux d'approbation et du cycle de vie du PO.",
      questions: [
        {
          id: "m2-s1-j4-q1",
          question: "Qu'arrive-t-il lorsqu'un approbateur clique sur « Deny » sur une Requisition ?",
          options: [
            "La Requisition est supprimée définitivement",
            "La Requisition est renvoyée au demandeur en statut Denied, qui peut la modifier et la resoumettre",
            "Le Purchase Order est émis avec une mention de refus",
            "La Requisition passe à l'approbateur suivant",
          ],
          answer: 1,
          explanation: "Le refus interrompt le flux et renvoie le document à son auteur en statut Denied ; celui-ci peut le corriger et le resoumettre, ce qui recalcule le flux. Rien n'est supprimé, aucun PO n'est créé, et le flux ne continue pas vers les approbateurs suivants puisque la décision est négative.",
          concept: "Approvables et flux d'approbation",
        },
        {
          id: "m2-s1-j4-q2",
          question: "Quel mécanisme permet de traiter un nœud d'approbation resté sans réponse pendant plusieurs jours ?",
          options: ["Le PO flip", "L'escalade (escalation) paramétrée avec un délai", "Le Change order", "La Supplier Location"],
          answer: 1,
          explanation: "L'escalade réaffecte automatiquement un nœud non traité après un délai défini (par exemple vers le Supervisor de l'approbateur) et envoie des rappels. Le PO flip concerne la création de facture depuis une commande sur le réseau ; le Change order modifie une commande existante ; la Supplier Location est l'adresse de commande du fournisseur. Aucun de ces trois concepts ne traite les retards d'approbation.",
          concept: "Délégation et escalade d'approbation",
        },
        {
          id: "m2-s1-j4-q3",
          question: "Où est définie la méthode d'envoi du Purchase Order au fournisseur (Business Network, e-mail, fax) ?",
          options: ["Sur le Commodity code", "Sur la Supplier Location (adresse de commande)", "Sur le centre de coûts", "Dans Guided Buying"],
          answer: 1,
          explanation: "La méthode de commande (Order routing) est un attribut de la Supplier Location, car un même fournisseur peut avoir plusieurs adresses avec des canaux différents, dont une reliée à un ANID pour le Network. Le Commodity code classe l'achat, le centre de coûts l'impute, et Guided Buying est une interface de demande : aucun de ces trois éléments ne porte le canal d'envoi du PO.",
          concept: "Supplier Location et méthode de commande",
        },
        {
          id: "m2-s1-j4-q4",
          question: "Après émission du PO, le demandeur veut augmenter la quantité de 10 à 15. Que fait-il dans Ariba ?",
          options: [
            "Il crée une nouvelle Requisition de 5 unités sans lien avec la première",
            "Il appelle le fournisseur et modifie la facture plus tard",
            "Il effectue un Change order sur la Requisition, qui crée une nouvelle version et un PO mis à jour",
            "Il annule la réception",
          ],
          answer: 2,
          explanation: "Le Change order est la procédure standard : la Requisition est versionnée, repasse en approbation si les règles l'exigent, et un PO modifié est transmis au fournisseur. Une Requisition séparée casse la traçabilité et crée un second PO. Modifier la facture sans commande provoque des exceptions de rapprochement. Annuler une réception n'a aucun rapport avec la quantité commandée.",
          concept: "Change order et versions de commande",
        },
        {
          id: "m2-s1-j4-q5",
          question: "Dans le scénario le plus courant pour les achats indirects avec S/4HANA, où est créé le PO et que devient-il ?",
          options: [
            "Créé dans Ariba après approbation, puis répliqué dans S/4HANA pour l'engagement et la comptabilité",
            "Créé uniquement dans S/4HANA et jamais visible dans Ariba",
            "Créé par le fournisseur sur le Business Network",
            "Créé dans Guided Buying sans passer par Buying",
          ],
          answer: 0,
          explanation: "Pour les achats indirects, la Requisition est approuvée dans Ariba, le PO y est généré puis répliqué vers S/4HANA (via CIG) qui porte l'engagement budgétaire et la comptabilité. Le scénario « PO maître dans S/4HANA » existe surtout pour les achats directs, mais le PO reste alors visible sur le Network. Le fournisseur ne crée jamais de PO, et Guided Buying crée des Requisitions, pas des PO.",
          concept: "Scénarios d'intégration de la commande avec S/4HANA",
        },
      ],
    },

    // ───────────── Semaine 1 · Jour 5 : Réception et bilan de la semaine ─────────────
    {
      id: "m2-s1-j5-a1",
      moduleId: "m2",
      week: 1,
      day: 5,
      kind: "lecon",
      title: "La réception (Receipt) et le rôle de l'ASN",
      level: "debutant",
      durationMin: 25,
      objective: "Maîtriser les modes de réception dans Ariba, leur impact sur le rapprochement et le lien avec l'Advance Ship Notice du Business Network.",
      content: `## Pourquoi la réception compte

La **réception (Receipt)** atteste que les biens ou services commandés ont été livrés. Elle conditionne le **rapprochement à trois voies (3-way match)** : commande, réception, facture. Sans réception, une facture reste bloquée en exception « Received quantity variance » ou « No receipt ».

## Modes de réception

| Mode | Description | Cas d'usage |
|---|---|---|
| **Réception manuelle** | Le demandeur (ou un réceptionnaire désigné) saisit la quantité reçue depuis la Requisition ou le PO | Achats indirects, prestations |
| **Réception automatique** | Ariba crée le Receipt à l'émission du PO ou à l'arrivée de la facture, selon le paramétrage par Commodity code | Faibles montants, abonnements, achats sans contrôle physique |
| **Réception dans S/4HANA** | Le magasin saisit l'entrée de marchandises (MIGO) ; le Receipt est répliqué vers Ariba | Achats directs, logistique |
| **Réception par ASN** | Le fournisseur envoie un **Advance Ship Notice** sur le Network, qui facilite la réception et peut la pré-remplir | Fournisseurs intégrés |

Le **type de réception** (par quantité ou par montant) dépend de la ligne : une prestation facturée au forfait est reçue en montant, des fournitures en quantité.

## Le document Receipt

Le Receipt est un **Approvable** : il peut avoir son propre flux d'approbation (rare, mais utile pour les réceptions de forte valeur). Il porte le **numéro de PO**, la quantité ou le montant acceptés, la quantité rejetée et le motif éventuel. Les réceptions **négatives** corrigent une erreur. Les **tolérances** de réception (par exemple +5 %) évitent de bloquer une livraison légèrement supérieure.

## Advance Ship Notice (ASN)

Sur le SAP Business Network, le fournisseur peut émettre un **Ship Notice** avant la livraison : références de colis, transporteur, date d'expédition, quantités. Côté acheteur, l'ASN :

- prévient le réceptionnaire ;
- permet la réception rapide par rapprochement ASN / PO ;
- alimente la visibilité logistique (statut du PO : Shipped).

## Statuts du PO liés à la réception

Ordered → **Shipped** (si ASN) → **Receiving** (réception partielle) → **Received** (réception complète). Le PO reste ouvert tant que des quantités sont attendues ; la **clôture de commande** (Close order) libère l'engagement résiduel dans S/4HANA.

## Points d'attention du consultant

- Définir **qui réceptionne** : le demandeur par défaut, mais pour les prestations c'est souvent le responsable métier qui certifie le service fait.
- Décider **par Commodity code** des réceptions automatiques pour ne pas noyer les demandeurs en tâches de réception.
- Aligner les **tolérances** avec celles du rapprochement de facture.
- Clarifier **le système de réception maître** (Ariba ou S/4HANA) pour éviter les doubles réceptions.`,
      keyPoints: [
        "Le Receipt est indispensable au rapprochement 3-way : commande, réception, facture.",
        "Quatre modes : réception manuelle, automatique (par Commodity code), dans S/4HANA (répliquée), ou facilitée par ASN.",
        "La réception se fait en quantité ou en montant selon la nature de la ligne (biens ou prestations).",
        "L'Advance Ship Notice envoyé par le fournisseur sur le Network pré-informe la réception et fait passer le PO en Shipped.",
        "Le consultant arbitre qui réceptionne, quelles catégories sont auto-réceptionnées, et quel système est maître.",
      ],
    },
    {
      id: "m2-s1-j5-a2",
      moduleId: "m2",
      week: 1,
      day: 5,
      kind: "exercice",
      title: "Définir la stratégie de réception par catégorie d'achat",
      level: "debutant",
      durationMin: 35,
      objective: "Construire une matrice de réception (mode, responsable, tolérance) à partir du portefeuille d'achats d'un client et en mesurer l'impact sur le rapprochement.",
      context: `## Le portefeuille d'achats indirects de Novalis

| Catégorie | Volume annuel | Nb de PO / an | Particularité |
|---|---|---|---|
| Fournitures de bureau | 180 k€ | 1 200 | Catalogue, faibles montants |
| Matériel informatique | 650 k€ | 300 | Livraison physique au service IT |
| Prestations intellectuelles | 2,1 M€ | 150 | Facturation mensuelle sur service fait |
| Maintenance des équipements | 900 k€ | 400 | Intervention sur site, bon d'intervention papier |
| Abonnements logiciels | 420 k€ | 60 | Facture annuelle, aucune livraison |
| Matières premières (achat direct) | 14 M€ | 2 500 | Réception au magasin dans S/4HANA |

Le service comptable se plaint de 35 % de factures en attente de réception. Les demandeurs se plaignent de recevoir trop de tâches de réception pour des achats de quelques dizaines d'euros.`,
      steps: [
        "Pour chaque catégorie, choisissez un mode de réception (manuelle, automatique, S/4HANA, ASN) et justifiez-le en une phrase.",
        "Désignez le responsable de réception (demandeur, service IT, responsable métier, magasin) et le type (quantité ou montant).",
        "Fixez une tolérance de réception par catégorie et vérifiez sa cohérence avec un rapprochement de facture.",
        "Estimez le nombre de tâches de réception manuelles annuelles avant et après votre proposition.",
        "Identifiez les catégories pour lesquelles un ASN fournisseur serait pertinent et à quelles conditions.",
        "Rédigez trois recommandations pour la direction achats et la comptabilité.",
      ],
      deliverable: "Une matrice de réception à six lignes (catégorie, mode, responsable, type, tolérance) et un court argumentaire chiffré.",
      solution: `## Matrice de réception proposée

| Catégorie | Mode | Responsable | Type | Tolérance |
|---|---|---|---|---|
| Fournitures de bureau | Automatique à l'émission du PO | Aucun | Quantité | Sans objet |
| Matériel informatique | Manuelle, facilitée par ASN | Service IT (réceptionnaire central) | Quantité | 0 % |
| Prestations intellectuelles | Manuelle en montant à chaque facture mensuelle | Responsable métier (service fait) | Montant | 0 % |
| Maintenance | Manuelle en montant | Responsable site, sur bon d'intervention | Montant | 5 % |
| Abonnements logiciels | Automatique à l'arrivée de la facture | Aucun | Montant | 2 % |
| Matières premières | S/4HANA (MIGO) répliquée vers Ariba | Magasin | Quantité | Selon tolérances MM |

## Impact chiffré

Avant : 4 610 PO indirects avec réception manuelle potentielle. Après : 1 200 fournitures et 60 abonnements passent en automatique, soit environ 1 260 tâches supprimées (27 %), et les 2 500 PO directs restent au magasin dans S/4HANA. Les tâches résiduelles (environ 850) portent sur des catégories où la réception a une vraie valeur de contrôle.

## ASN

Pertinent pour le matériel informatique (fournisseurs intégrés capables d'émettre un Ship Notice avec numéros de série) et pour les matières premières si le fournisseur est Enterprise sur le Network. Sans objet pour les prestations.

## Recommandations

1. Activer la réception automatique par Commodity code pour les faibles montants et abonnements, avec revue trimestrielle des exceptions.
2. Nommer un réceptionnaire par site pour la maintenance et outiller le bon d'intervention en pièce jointe du Receipt.
3. Aligner les tolérances de réception et de rapprochement de facture pour éviter les blocages en cascade, et former les responsables métier au « service fait » mensuel pour les prestations.`,
      tips: [
        "La réception automatique n'est pas un renoncement au contrôle : elle déplace le contrôle vers la facture et l'analyse de dépense.",
        "Pour les prestations, la réception en montant par période est la clé d'un rapprochement sans friction.",
      ],
    },
    {
      id: "m2-s1-j5-a3",
      moduleId: "m2",
      week: 1,
      day: 5,
      kind: "quiz",
      title: "Quiz bilan semaine 1 : fondamentaux, Requisition, PO et réception",
      level: "debutant",
      durationMin: 15,
      objective: "Consolider les acquis de la première semaine du P2P.",
      questions: [
        {
          id: "m2-s1-j5-q1",
          question: "Quel document atteste de la livraison et permet le rapprochement à trois voies ?",
          options: ["Le Receipt", "Le Contract Workspace", "La Requisition", "La Supplier Request"],
          answer: 0,
          explanation: "Le Receipt enregistre les quantités ou montants reçus et constitue la troisième voie du rapprochement commande / réception / facture. La Requisition précède la commande et ne prouve rien quant à la livraison ; le Contract Workspace est un objet amont de gestion contractuelle ; la Supplier Request lance la création d'un fournisseur dans SLP.",
          concept: "Réception et rapprochement 3-way",
        },
        {
          id: "m2-s1-j5-q2",
          question: "Pour des fournitures de bureau à faible montant, quel paramétrage réduit la charge des demandeurs sans bloquer les factures ?",
          options: [
            "Rendre la réception obligatoire avec approbation du Receipt",
            "Activer la réception automatique pour les Commodity codes concernés",
            "Supprimer les lignes catalogue",
            "Exiger un ASN du fournisseur",
          ],
          answer: 1,
          explanation: "La réception automatique, paramétrée par Commodity code, crée le Receipt sans intervention humaine et permet le rapprochement de la facture. Rendre la réception obligatoire avec approbation alourdit le processus ; supprimer les catalogues dégrade l'expérience et la conformité ; un ASN ne remplace pas la réception et suppose un fournisseur intégré, disproportionné pour des fournitures.",
          concept: "Modes de réception et paramétrage par Commodity code",
        },
        {
          id: "m2-s1-j5-q3",
          question: "Qu'est-ce qu'un Advance Ship Notice (ASN) ?",
          options: [
            "Une facture anticipée envoyée avant livraison",
            "Un avis d'expédition envoyé par le fournisseur sur le Business Network, qui fait passer le PO en statut Shipped",
            "Une alerte Ariba lorsque la réception est en retard",
            "Un bon de commande urgent",
          ],
          answer: 1,
          explanation: "L'ASN (Ship Notice) est émis par le fournisseur depuis le Network : il détaille colis, transporteur et quantités expédiées, prévient le réceptionnaire et change le statut du PO en Shipped. Ce n'est ni une facture, ni une alerte interne Ariba, ni un type de commande.",
          concept: "Advance Ship Notice (ASN)",
        },
        {
          id: "m2-s1-j5-q4",
          question: "Une prestation de conseil facturée mensuellement au forfait doit être réceptionnée. Quel type de réception est adapté ?",
          options: ["Réception par quantité d'heures", "Réception par montant", "Aucune réception possible pour les services", "Réception par le fournisseur"],
          answer: 1,
          explanation: "Les services au forfait sont reçus en montant : le responsable métier atteste chaque mois du service fait pour la part facturée, ce qui permet un rapprochement propre. La réception en quantité convient aux biens ou aux prestations en régie à l'heure. Les services sont bien réceptionnables dans Ariba, et le fournisseur ne réceptionne jamais pour l'acheteur.",
          concept: "Réception en quantité ou en montant",
        },
        {
          id: "m2-s1-j5-q5",
          question: "Dans une Requisition, quel élément relie le fournisseur au canal d'envoi du PO et à son compte réseau ?",
          options: ["Le Purchasing Unit", "Le Supervisor", "La Supplier Location", "Le titre de ligne"],
          answer: 2,
          explanation: "La Supplier Location est l'adresse de commande du fournisseur ; elle porte la méthode de commande et le lien vers l'ANID du compte Network. Le Purchasing Unit est une entité organisationnelle de l'acheteur ; le Supervisor alimente la chaîne hiérarchique d'approbation ; le titre de ligne est descriptif.",
          concept: "Supplier Location et méthode de commande",
        },
      ],
    },

    // ───────────── Semaine 2 · Jour 1 : Facturation et rapprochement ─────────────
    {
      id: "m2-s2-j1-a1",
      moduleId: "m2",
      week: 2,
      day: 1,
      kind: "lecon",
      title: "De la facture à l'Invoice Reconciliation",
      level: "intermediaire",
      durationMin: 30,
      objective: "Comprendre les canaux d'arrivée des factures, la création de l'Invoice Reconciliation et la logique du rapprochement 2-way et 3-way.",
      content: `## Les canaux d'arrivée d'une facture

| Canal | Mécanisme | Qualité des données |
|---|---|---|
| **Business Network (PO flip)** | Le fournisseur crée la facture depuis le PO reçu ; envoi en cXML | Excellente : référence PO, prix et quantités hérités |
| **Business Network (intégration)** | Le fournisseur Enterprise envoie des factures cXML ou EDI depuis son ERP | Bonne, dépend du mapping fournisseur |
| **Saisie manuelle** | Un comptable (Invoice Agent) saisit la facture papier ou PDF dans Ariba | Variable, chronophage |
| **Numérisation / OCR** | Service de capture (Ariba Invoice Conversion Services ou tiers) | Bonne après apprentissage |
| **Facture sans commande (Non-PO invoice)** | Le fournisseur ou le comptable saisit une facture sans référence PO | Nécessite un flux d'approbation dédié |

## Les règles de transaction du Network

Avant même d'arriver dans le realm, une facture est contrôlée par les **règles de transaction** (Transaction rules) de l'acheteur : interdire les factures sans PO, bloquer un montant supérieur au reste à facturer, imposer la date, la TVA, le numéro de facture unique, etc. Une facture non conforme est **rejetée** sur le Network et le fournisseur est averti immédiatement. C'est la première ligne de défense contre les exceptions.

## Création de l'Invoice Reconciliation (IR)

À l'arrivée d'une facture valide, Ariba crée automatiquement un document **Invoice Reconciliation**. L'IR compare la facture au **PO** et, selon le paramétrage, aux **Receipts** :

- **Rapprochement 2-way** : facture vs commande (prix, quantité commandée). Utilisé pour les services ou les catégories en réception automatique.
- **Rapprochement 3-way** : facture vs commande vs réception. La facture ne peut être payée que pour les quantités reçues.

> La règle 2-way ou 3-way se définit en général par Commodity code ou par fournisseur, en cohérence avec la stratégie de réception.

## Les exceptions

Toute différence hors tolérance génère une **exception** sur l'IR. Les principaux types :

- **PO Price Variance** : prix facturé différent du prix commandé.
- **PO Quantity Variance** : quantité facturée supérieure à la quantité commandée.
- **Received Quantity Variance** / **No receipt** : quantité facturée supérieure à la quantité reçue.
- **Tax Variance** : TVA incohérente.
- **Unmatched invoice / Invalid PO** : référence commande introuvable.
- **Duplicate invoice** : numéro de facture déjà utilisé pour ce fournisseur.
- **Supplier mismatch**, **Payment terms variance**, etc.

Chaque type d'exception est associé à un **groupe** chargé de la résoudre (Invoice Agent, Invoice Manager, acheteur, demandeur) et à des **tolérances** (absolues ou en pourcentage).

## Statuts de l'IR

Reconciling → (exceptions résolues) → **Approving** (flux d'approbation éventuel) → **Approved** → **Paying** → **Paid**. Un IR peut aussi être **Rejected**, ce qui renvoie la facture au fournisseur avec motif sur le Network.

## Ce que fait l'IR dans S/4HANA

Une fois l'IR approuvé, Ariba envoie à S/4HANA (via CIG) la facture rapprochée : elle est comptabilisée en **comptabilité fournisseurs** (document MIRO ou FI selon le scénario) et entre dans le cycle de paiement. Le statut de paiement peut remonter vers Ariba et le Network pour informer le fournisseur.`,
      keyPoints: [
        "Les factures arrivent par PO flip ou intégration sur le Network, par saisie manuelle, par OCR ou en facture sans commande.",
        "Les règles de transaction du Network rejettent les factures non conformes avant qu'elles n'entrent dans le realm.",
        "L'Invoice Reconciliation compare facture, commande et réception selon un rapprochement 2-way ou 3-way défini par catégorie.",
        "Les exceptions (prix, quantité, réception, TVA, doublon) sont assignées à des groupes avec des tolérances.",
        "L'IR approuvé est envoyé à S/4HANA pour comptabilisation et paiement ; le statut de paiement peut remonter au fournisseur.",
      ],
    },
    {
      id: "m2-s2-j1-a2",
      moduleId: "m2",
      week: 2,
      day: 1,
      kind: "exercice",
      title: "Analyser un lot de factures et prédire les exceptions",
      level: "intermediaire",
      durationMin: 40,
      objective: "Savoir lire un cas de rapprochement, identifier les exceptions générées, le groupe assigné et l'action de résolution.",
      context: `## Paramétrage en place chez Novalis

- Rapprochement **3-way** pour le matériel et la maintenance, **2-way** pour les prestations et abonnements.
- Tolérance prix : 2 % ou 20 €, le plus favorable. Tolérance quantité : 0 %.
- Exceptions prix → groupe **Acheteurs** ; exceptions réception → **demandeur** ; doublons et TVA → **Invoice Manager**.

## Cinq factures reçues ce matin

| Facture | PO | Commandé | Reçu | Facturé | Observation |
|---|---|---|---|---|---|
| F1 Labo+ | PO1001 | 12 boîtes à 24 € | 12 | 12 boîtes à 24,30 € | Matériel |
| F2 Intégrateur | PO1002 | Prestation 45 000 € | Reçu 15 000 € (mois 1) | 15 000 € | Prestation, 2-way |
| F3 Maintenance | PO1003 | 10 interventions à 350 € | 8 | 10 interventions à 350 € | Maintenance |
| F4 Fleuriste | aucun | — | — | 80 € | Facture sans commande |
| F5 Labo+ | PO1001 | idem F1 | 12 | 12 boîtes à 24,30 €, même n° de facture que F1 | Doublon suspect |`,
      steps: [
        "Pour chaque facture, indiquez si le rapprochement est 2-way ou 3-way et pourquoi.",
        "Déterminez si une exception est générée, son type exact et si elle est dans la tolérance.",
        "Nommez le groupe ou la personne qui recevra l'exception et l'action de résolution attendue (accepter, rejeter, modifier la commande, attendre réception).",
        "Pour F4, décrivez le flux d'une facture sans commande et qui doit l'approuver.",
        "Pour F5, expliquez où le doublon aurait pu être arrêté (Network ou realm) et par quelle règle.",
        "Calculez le nombre d'exceptions évitables si les règles de transaction du Network étaient durcies.",
      ],
      deliverable: "Un tableau d'analyse des cinq factures (type de rapprochement, exception, tolérance, assigné, action) et deux recommandations de paramétrage.",
      solution: `## Analyse

| Facture | Rapprochement | Exception | Dans tolérance ? | Assigné | Action |
|---|---|---|---|---|---|
| F1 | 3-way | PO Price Variance (+0,30 €, soit 1,25 %) | Oui (sous 2 %) | Aucun : auto-acceptée | IR approuvé automatiquement |
| F2 | 2-way | Aucune : 15 000 € sur un reste à facturer de 45 000 € | — | Aucun | Approbation puis paiement |
| F3 | 3-way | Received Quantity Variance (10 facturées, 8 reçues) | Non (0 %) | Demandeur | Réceptionner les 2 interventions si réalisées, sinon rejeter partiellement |
| F4 | Facture sans PO | Non-PO invoice, flux d'approbation dédié | — | Approbateur selon imputation saisie | Approbation du responsable puis paiement |
| F5 | 3-way | Duplicate invoice | Non | Invoice Manager | Rejet avec motif « doublon » vers le fournisseur |

## Focus F4

Une facture sans commande entre dans Ariba via la saisie manuelle ou via le Network si la règle « autoriser les factures sans PO » est activée pour ce fournisseur. Elle n'a rien à rapprocher : l'IR passe directement en **Approving** avec un flux calculé sur l'imputation et le montant (ici le manager de Sophie). C'est le flux à restreindre au strict nécessaire.

## Focus F5

Le doublon aurait dû être bloqué sur le **Network** par la règle de transaction « Le numéro de facture doit être unique par fournisseur ». Si la règle n'est pas active, c'est l'IR qui lève l'exception Duplicate invoice, mobilisant un Invoice Manager pour un rejet qui aurait pu être automatique.

## Exceptions évitables

Sur cinq factures, deux exceptions réelles (F3, F5). F5 est évitable à 100 % par règle Network. F3 est un défaut de réception, non évitable par règle mais réductible par un rappel automatique de réception au demandeur. F4 pourrait être transformée en commande si Spot Buy était utilisé.

## Recommandations

1. Activer sur le Network les règles « numéro de facture unique » et « interdire les factures sans PO » sauf pour une liste blanche de fournisseurs (loyers, énergie).
2. Mettre en place des notifications de réception en attente à J+3 après la date de livraison prévue.`,
      tips: [
        "Avant de parler d'exception, demandez-vous toujours si la facture aurait dû être rejetée en amont par le Network.",
        "Une tolérance s'exprime en pourcentage ET en montant absolu : vérifiez laquelle s'applique.",
      ],
    },
    {
      id: "m2-s2-j1-a3",
      moduleId: "m2",
      week: 2,
      day: 1,
      kind: "quiz",
      title: "Quiz : facturation et Invoice Reconciliation",
      level: "intermediaire",
      durationMin: 12,
      objective: "Vérifier la compréhension des canaux de facture, du rapprochement et des exceptions.",
      questions: [
        {
          id: "m2-s2-j1-q1",
          question: "Quelle différence fondamentale distingue un rapprochement 2-way d'un rapprochement 3-way ?",
          options: [
            "Le 2-way concerne deux fournisseurs, le 3-way trois fournisseurs",
            "Le 2-way compare facture et commande ; le 3-way ajoute la réception",
            "Le 2-way est manuel, le 3-way automatique",
            "Le 2-way s'applique aux factures Network, le 3-way aux factures papier",
          ],
          answer: 1,
          explanation: "Le rapprochement 2-way confronte la facture au PO (prix, quantités commandées) ; le 3-way exige en plus que les quantités facturées aient été réceptionnées. Le nombre de fournisseurs n'intervient pas. Les deux modes sont automatiques dans l'IR, et ils ne dépendent pas du canal d'arrivée de la facture mais d'un paramétrage par catégorie ou fournisseur.",
          concept: "Rapprochement de facture (IR) et exceptions",
        },
        {
          id: "m2-s2-j1-q2",
          question: "Une facture arrive avec un numéro déjà utilisé par le même fournisseur. Où est-il préférable de la bloquer ?",
          options: [
            "Dans S/4HANA au moment du paiement",
            "Sur le Business Network via une règle de transaction d'unicité du numéro de facture",
            "Dans le Contract Workspace",
            "Lors de la réception",
          ],
          answer: 1,
          explanation: "Les règles de transaction du Network rejettent la facture avant qu'elle n'entre dans le realm, et le fournisseur est informé immédiatement, sans mobiliser un Invoice Manager. Bloquer en S/4HANA au paiement est trop tardif et coûteux. Le Contract Workspace ne traite pas les factures, et la réception n'a aucun contrôle sur les numéros de facture.",
          concept: "Règles de transaction du Business Network",
        },
        {
          id: "m2-s2-j1-q3",
          question: "Une facture de 10 unités est reçue alors que seulement 8 ont été réceptionnées, en rapprochement 3-way. Quel type d'exception est généré ?",
          options: ["PO Price Variance", "Received Quantity Variance", "Tax Variance", "Payment terms variance"],
          answer: 1,
          explanation: "La quantité facturée dépasse la quantité reçue : c'est une Received Quantity Variance (ou No receipt si rien n'est reçu). PO Price Variance concerne un écart de prix unitaire, Tax Variance un écart de TVA et Payment terms variance un écart de conditions de paiement entre facture et commande.",
          concept: "Rapprochement de facture (IR) et exceptions",
        },
        {
          id: "m2-s2-j1-q4",
          question: "Qu'est-ce que le PO flip ?",
          options: [
            "L'annulation d'un PO par l'acheteur",
            "La création d'une facture par le fournisseur à partir du PO reçu sur le Network",
            "La conversion d'un PO Ariba en commande S/4HANA",
            "Le retour d'un PO en Requisition pour modification",
          ],
          answer: 1,
          explanation: "Le PO flip permet au fournisseur de transformer la commande reçue en facture en quelques clics, en héritant des lignes, prix et références ; c'est la source de factures la plus propre. L'annulation est un statut Cancelled, la réplication vers S/4HANA relève de CIG, et le retour en Requisition correspond au Change order.",
          concept: "PO flip et facturation sur le Business Network",
        },
        {
          id: "m2-s2-j1-q5",
          question: "Que se passe-t-il après l'approbation finale d'une Invoice Reconciliation dans un scénario intégré S/4HANA ?",
          options: [
            "La facture est supprimée d'Ariba",
            "La facture rapprochée est transmise à S/4HANA pour comptabilisation et paiement",
            "Le fournisseur doit renvoyer la facture par courrier",
            "Un nouveau PO est créé automatiquement",
          ],
          answer: 1,
          explanation: "L'IR approuvé déclenche l'envoi de la facture vers S/4HANA (via CIG), où elle est comptabilisée en comptabilité fournisseurs et planifiée au paiement ; l'IR passe en Paying puis Paid. Rien n'est supprimé, aucun renvoi papier n'est nécessaire et aucune commande n'est générée par une facture.",
          concept: "Comptabilisation et paiement dans S/4HANA",
        },
      ],
    },

    // ───────────── Semaine 2 · Jour 2 : Exceptions, paiement et reporting P2P ─────────────
    {
      id: "m2-s2-j2-a1",
      moduleId: "m2",
      week: 2,
      day: 2,
      kind: "lecon",
      title: "Résoudre les exceptions, payer et piloter le P2P",
      level: "intermediaire",
      durationMin: 30,
      objective: "Maîtriser le traitement des exceptions de facture, les conditions de paiement et les indicateurs de pilotage du P2P.",
      content: `## Le traitement des exceptions

Chaque exception d'un IR est **assignée** à un groupe ou une personne selon le paramétrage des **Exception types**. L'assigné dispose de trois actions principales :

- **Accepter** l'écart (par exemple une hausse de prix justifiée) : la facture est payée au montant facturé.
- **Rejeter** la ligne ou la facture : un **motif de rejet** paramétré est renvoyé au fournisseur sur le Network, qui doit émettre une nouvelle facture ou un avoir.
- **Corriger** le document source : réceptionner, émettre un Change order sur le PO, puis relancer le rapprochement (**re-match**).

> Règle d'or : on ne modifie jamais la facture du fournisseur. On corrige la commande ou la réception, ou l'on accepte / rejette.

Les **tolérances** réduisent le volume d'exceptions. Elles se paramètrent par type d'exception, en montant absolu ou en pourcentage, et peuvent être différenciées par fournisseur ou par Commodity code.

## Avoirs et notes de débit

Un **Credit Memo** (avoir) peut être lié à une facture ou à une ligne (**Line-item credit memo**) ; sur le Network, le fournisseur l'émet depuis la facture d'origine. Les avoirs suivent leur propre IR et s'imputent sur le solde fournisseur dans S/4HANA.

## Conditions et statut de paiement

Les **Payment terms** sont portées par le fournisseur ou le contrat et héritées par le PO puis la facture. Ariba vérifie la cohérence (exception Payment terms variance). Le paiement lui-même est exécuté par S/4HANA (programme de paiement F110). Deux options d'information :

- **Remittance advice** : S/4HANA renvoie à Ariba et au Network l'avis de paiement, visible par le fournisseur.
- **Scheduled payment** : le fournisseur voit la date prévisionnelle, ce qui réduit les relances.

Les **remises pour paiement anticipé** (dynamic discounting) peuvent être proposées sur le Network : le fournisseur accepte un escompte en échange d'un paiement plus tôt.

## Pré-visualiser l'impact comptable

Avant envoi en comptabilité, le consultant vérifie dans l'IR : compte général, centre de coûts, code TVA, société. Une erreur d'imputation se corrige par Change order sur la commande (pas sur la facture) ou, pour les factures sans PO, directement sur l'IR par un groupe habilité.

## Piloter le P2P : les indicateurs clés

| Indicateur | Cible usuelle | Levier |
|---|---|---|
| Taux de factures électroniques (Network) | supérieur à 80 % | Enablement fournisseurs |
| Taux de factures sans exception (first-time match) | supérieur à 85 % | Règles Network, tolérances, catalogues |
| Délai moyen de traitement d'une facture | inférieur à 5 jours | Assignation claire, escalade |
| Part des achats catalogue | supérieur à 60 % | Contenu catalogue, Guided Buying |
| Factures sans commande | inférieur à 10 % | Politiques, Spot Buy |
| Délai d'approbation moyen d'une Requisition | inférieur à 2 jours | Règles en parallèle, délégations |

Ariba fournit des **rapports prédéfinis** (Analytical reports) et la possibilité de créer des rapports personnalisés par les Report Managers ; les grands comptes complètent avec SAP Analytics Cloud ou Spend Analysis.`,
      keyPoints: [
        "Une exception se résout par acceptation, rejet avec motif vers le fournisseur, ou correction du PO ou de la réception suivie d'un re-match ; la facture elle-même n'est jamais modifiée.",
        "Les tolérances par type d'exception, fournisseur ou catégorie sont le premier levier de réduction des exceptions.",
        "Les avoirs (Credit Memo) suivent leur propre rapprochement et s'imputent sur le solde fournisseur dans S/4HANA.",
        "Le paiement est exécuté par S/4HANA ; Remittance advice et Scheduled payment informent le fournisseur sur le Network.",
        "Les indicateurs clés : taux de factures électroniques, first-time match, délai de traitement, part des achats catalogue, factures sans commande.",
      ],
    },
    {
      id: "m2-s2-j2-a2",
      moduleId: "m2",
      week: 2,
      day: 2,
      kind: "simulation",
      title: "Simulation : comité P2P mensuel avec la comptabilité",
      level: "intermediaire",
      durationMin: 45,
      objective: "Interpréter des indicateurs P2P, diagnostiquer les causes racines et proposer des actions de paramétrage et d'organisation.",
      context: `## Tableau de bord du mois de Novalis (3 mois après la mise en production)

| Indicateur | Valeur | Cible |
|---|---|---|
| Factures reçues | 2 400 | — |
| Factures électroniques via Network | 55 % | 80 % |
| First-time match | 62 % | 85 % |
| Exceptions ouvertes de plus de 10 jours | 310 | moins de 50 |
| Répartition des exceptions | Prix 15 %, Réception 48 %, Doublon 7 %, TVA 12 %, PO introuvable 18 % | — |
| Factures sans commande | 22 % | moins de 10 % |
| Achats catalogue | 41 % | 60 % |

La directrice comptable estime que « Ariba a compliqué le travail de ses équipes ». Le directeur achats veut des résultats avant le prochain comité de direction. Vous animez le comité P2P.`,
      steps: [
        "Classez les cinq familles d'exceptions par volume et identifiez pour chacune la cause racine probable (paramétrage, données, comportement, fournisseurs).",
        "Pour les exceptions de réception (48 %), proposez deux actions : une de paramétrage (réception automatique, tolérance, rappel) et une d'organisation (réceptionnaire, service fait).",
        "Pour les PO introuvables (18 %), expliquez le lien avec les 22 % de factures sans commande et les 45 % de factures hors Network, puis proposez une règle de transaction et une action d'enablement.",
        "Pour la TVA (12 %), identifiez la donnée de référence probablement en cause et l'équipe à mobiliser.",
        "Construisez un plan d'actions à 90 jours avec responsable, indicateur de suivi et gain attendu sur le first-time match.",
        "Préparez trois messages clés pour rassurer la directrice comptable sans minimiser les difficultés.",
        "Rédigez le compte rendu du comité en une page.",
      ],
      deliverable: "Un plan d'actions P2P à 90 jours (6 à 8 actions) et un compte rendu de comité d'une page.",
      solution: `## Diagnostic

- **Réception (48 %)** : les demandeurs ne réceptionnent pas ou tardivement ; les prestations ne sont pas reçues en montant ; absence de rappels. Cause racine : stratégie de réception non différenciée par catégorie.
- **PO introuvable (18 %) et factures sans commande (22 %)** : les fournisseurs non enablés envoient des factures papier sans référence ; les achats hors Ariba (commandes passées par téléphone) continuent. Cause racine : conduite du changement et règles Network trop permissives.
- **Prix (15 %)** : prix catalogue non mis à jour, tolérance à 0 % sur certains fournisseurs.
- **TVA (12 %)** : codes TVA mal déterminés sur les lignes de commande (données de base fiscales S/4HANA ou mapping CIG).
- **Doublons (7 %)** : règle d'unicité du numéro de facture non activée.

## Plan d'actions à 90 jours

| Action | Responsable | Indicateur | Gain estimé first-time match |
|---|---|---|---|
| Activer la réception automatique sur fournitures, abonnements, faibles montants | Consultant + achats | Exceptions réception | +8 pts |
| Rappel automatique de réception J+3 et réception en montant pour prestations | Admin Ariba + responsables métier | Délai de réception | +5 pts |
| Règles Network : facture sans PO interdite (liste blanche), numéro unique, montant plafonné au reste à facturer | Admin Network | Factures rejetées en amont | +6 pts |
| Vague d'enablement de 60 fournisseurs représentant 70 % des factures papier | Équipe enablement | Taux de factures électroniques | +4 pts |
| Revue des codes TVA par Commodity code et correction du mapping CIG | Intégration + fiscalité | Exceptions TVA | +4 pts |
| Mise à jour des catalogues et tolérance prix 2 % / 20 € | Catalog Manager | Exceptions prix | +3 pts |
| Politique Guided Buying « commande obligatoire avant facture » et communication aux managers | Achats | Factures sans commande | Indirect |

Objectif : first-time match à 85 % sous 90 jours, exceptions de plus de 10 jours ramenées sous 80.

## Messages clés pour la comptabilité

1. Les exceptions révèlent des problèmes qui existaient déjà (factures sans commande) mais qui étaient invisibles : nous les traitons désormais à la source.
2. 60 % des exceptions actuelles disparaîtront par paramétrage sans effort supplémentaire des comptables.
3. L'assignation des exceptions va être revue pour que la comptabilité ne traite que les sujets comptables (TVA, doublons) et que les écarts de réception reviennent aux demandeurs.`,
      tips: [
        "Face à une équipe en difficulté, séparez ce qui relève du paramétrage (rapide) de ce qui relève du comportement (long) : cela crédibilise le plan.",
        "Un tableau de bord P2P se lit toujours en croisant canal de facture, type d'exception et fournisseur.",
        "Fixez un objectif chiffré et une date : c'est ce que retiendra le comité de direction.",
      ],
    },
    {
      id: "m2-s2-j2-a3",
      moduleId: "m2",
      week: 2,
      day: 2,
      kind: "quiz",
      title: "Quiz : exceptions, paiement et reporting",
      level: "intermediaire",
      durationMin: 12,
      objective: "Vérifier la maîtrise du traitement des exceptions, du paiement et des indicateurs P2P.",
      questions: [
        {
          id: "m2-s2-j2-q1",
          question: "Un acheteur constate que le prix facturé est supérieur au prix commandé, hausse qu'il a verbalement acceptée. Quelle est la bonne pratique dans Ariba ?",
          options: [
            "Modifier le prix sur la facture dans l'IR",
            "Accepter l'exception de prix sur l'IR, ou émettre un Change order sur le PO puis relancer le rapprochement",
            "Supprimer la facture et demander au fournisseur de la renvoyer avec l'ancien prix",
            "Demander au comptable de payer manuellement dans S/4HANA",
          ],
          answer: 1,
          explanation: "La facture du fournisseur est un document légal que l'acheteur ne modifie jamais : il accepte l'exception (paiement au montant facturé) ou met à jour la commande par Change order et relance le re-match pour que les documents soient cohérents. Supprimer la facture est inutile et détériore la relation ; payer hors Ariba contourne le contrôle et crée un écart entre les systèmes.",
          concept: "Résolution des exceptions : accepter, rejeter, corriger",
        },
        {
          id: "m2-s2-j2-q2",
          question: "Quel paramétrage permet de réduire mécaniquement le nombre d'exceptions de prix sans dégrader le contrôle ?",
          options: [
            "Désactiver le rapprochement",
            "Définir une tolérance (pourcentage et/ou montant absolu) sur l'exception PO Price Variance",
            "Supprimer les Commodity codes",
            "Interdire les factures Network",
          ],
          answer: 1,
          explanation: "Une tolérance raisonnable (par exemple 2 % ou 20 €) laisse passer les écarts non significatifs tout en bloquant les écarts importants. Désactiver le rapprochement supprime tout contrôle ; les Commodity codes servent à la classification et aux approbations ; interdire les factures Network dégraderait la qualité des données puisque ce canal produit les factures les plus propres.",
          concept: "Tolérances de rapprochement",
        },
        {
          id: "m2-s2-j2-q3",
          question: "Quel système exécute concrètement le paiement d'une facture rapprochée dans un scénario Ariba + S/4HANA ?",
          options: ["Ariba Buying & Invoicing", "Le SAP Business Network", "SAP S/4HANA (programme de paiement)", "Guided Buying"],
          answer: 2,
          explanation: "Ariba rapproche et approuve la facture, mais le paiement est exécuté par la comptabilité fournisseurs de S/4HANA (programme de paiement F110). Le Network transporte les documents et affiche le statut de paiement (Remittance advice), il ne paie pas. Guided Buying est une interface de demande d'achat.",
          concept: "Comptabilisation et paiement dans S/4HANA",
        },
        {
          id: "m2-s2-j2-q4",
          question: "Quel indicateur mesure la part des factures rapprochées sans aucune exception dès leur arrivée ?",
          options: ["Le taux de factures électroniques", "Le first-time match", "Le délai d'approbation des Requisitions", "La part des achats catalogue"],
          answer: 1,
          explanation: "Le first-time match (ou taux de factures sans exception) mesure la qualité du flux de bout en bout. Le taux de factures électroniques mesure le canal d'arrivée, pas l'absence d'exceptions. Le délai d'approbation concerne la demande d'achat, en amont. La part des achats catalogue est un levier qui améliore le first-time match, mais pas la mesure elle-même.",
          concept: "Indicateurs de pilotage du P2P",
        },
        {
          id: "m2-s2-j2-q5",
          question: "Comment un fournisseur émet-il un avoir lié à une facture déjà envoyée via le Business Network ?",
          options: [
            "Il envoie une facture négative sans référence",
            "Il crée un Credit Memo (ou Line-item credit memo) depuis la facture d'origine sur le Network",
            "Il modifie la facture d'origine",
            "Il demande à l'acheteur de créer un Change order",
          ],
          answer: 1,
          explanation: "Sur le Network, l'avoir est créé depuis la facture d'origine, au niveau en-tête ou ligne, ce qui garantit le lien et le rapprochement dans un IR dédié. Une facture déjà envoyée ne se modifie pas ; une facture négative sans référence serait rejetée ou créerait une exception ; le Change order porte sur la commande, pas sur la facturation.",
          concept: "Avoirs (Credit Memo) et notes de débit",
        },
      ],
    },

    // ───────────── Semaine 2 · Jour 3 : Simulation : déployer un flux P2P ─────────────
    {
      id: "m2-s2-j3-a1",
      moduleId: "m2",
      week: 2,
      day: 3,
      kind: "lecon",
      title: "Les décisions structurantes d'un déploiement P2P",
      level: "avance",
      durationMin: 15,
      objective: "Disposer d'une check-list des choix de conception à arbitrer en atelier avant de paramétrer un flux P2P intégré à S/4HANA.",
      content: `## Les huit décisions d'un atelier de conception P2P

1. **Système maître du PO** : Ariba (achats indirects) ou S/4HANA (achats directs) ; impact sur la numérotation, l'engagement et la réception.
2. **Interface de demande** : Buying classique, Guided Buying, ou les deux selon les populations.
3. **Stratégie de réception** par Commodity code : manuelle, automatique, S/4HANA, ASN.
4. **Règles de rapprochement** : 2-way ou 3-way par catégorie, tolérances, assignation des exceptions.
5. **Canaux de facturation** : Network obligatoire ? Liste blanche pour factures sans PO ? OCR pour le résiduel ?
6. **Modèle d'approbation** : hiérarchie Supervisor, groupes d'expertise, seuils, délégations et escalades.
7. **Données de base** : quelles données viennent de S/4HANA (fournisseurs, imputations, articles, codes TVA), à quelle fréquence, et qui en est responsable.
8. **Enablement fournisseurs** : segmentation Standard / Enterprise, vagues, communication, support.

## Un déploiement se pilote en trois chantiers parallèles

| Chantier | Livrables | Acteurs |
|---|---|---|
| Processus et paramétrage | Design document, matrice d'approbation, matrice de réception, règles Network | Consultant fonctionnel, achats, comptabilité |
| Intégration | Spécification des flux CIG (master data, PO, Receipt, Invoice), mappings, tests | Consultant technique, équipe S/4HANA |
| Conduite du changement | Segmentation fournisseurs, plan d'enablement, formations demandeurs et acheteurs | Achats, communication, PMO |

> Un flux P2P réussi est d'abord un flux dont les données de base sont fiables et dont les fournisseurs sont enablés. Le paramétrage ne compense ni l'un ni l'autre.

## Les livrables attendus d'un consultant à l'issue de la conception

- Un **document de conception** (Business Blueprint) listant chaque décision et sa justification.
- Les **matrices** d'approbation, de réception et de rapprochement.
- La **liste des règles de transaction** Network.
- Le **plan d'enablement** et les modèles de communication fournisseurs.
- Le **cahier de recette** avec les cas de test de bout en bout : catalogue, hors catalogue, Change order, facture avec exception, avoir.`,
      keyPoints: [
        "Huit décisions structurent un P2P : système maître du PO, interface de demande, réception, rapprochement, canaux de facture, approbation, données de base, enablement.",
        "Trois chantiers parallèles : processus et paramétrage, intégration S/4HANA, conduite du changement et enablement.",
        "Les livrables de conception sont le Business Blueprint, les matrices, les règles Network, le plan d'enablement et le cahier de recette.",
        "Des données de base fiables et des fournisseurs enablés comptent plus que le paramétrage le plus fin.",
      ],
    },
    {
      id: "m2-s2-j3-a2",
      moduleId: "m2",
      week: 2,
      day: 3,
      kind: "simulation",
      title: "Simulation : atelier de conception P2P de bout en bout",
      level: "avance",
      durationMin: 60,
      objective: "Jouer le rôle du consultant qui anime l'atelier de cadrage, arbitre les huit décisions et produit le document de conception d'un flux P2P intégré à S/4HANA.",
      context: `## Le contexte

**Novalis Cosmétiques** lance la vague 1 de son programme Ariba : **Buying & Invoicing + Guided Buying + Business Network**, intégrés à **S/4HANA** déjà en production. Périmètre : les achats indirects des 3 usines et du siège (environ 4 600 PO et 2 400 factures par an, 380 fournisseurs actifs). Les achats directs restent dans S/4HANA (MM) mais leurs PO devront être envoyés aux fournisseurs via le Network.

## Les parties prenantes présentes à l'atelier

- La directrice achats (sponsor), pressée d'avoir des résultats visibles.
- Le responsable comptabilité fournisseurs, inquiet des exceptions.
- Le responsable S/4HANA, qui veut « le moins de flux possible ».
- Deux acheteurs opérationnels et un représentant des demandeurs d'usine.

## Contraintes exprimées

- Les factures sans commande doivent disparaître, sauf loyers, énergie et télécoms.
- Les demandeurs d'usine ont une faible appétence pour les outils.
- Le groupe a déjà une politique de délégation (celle étudiée au jour 4).
- Les fournisseurs stratégiques (40) sont tous capables de recevoir des commandes électroniques ; les 340 autres sont des PME locales.`,
      steps: [
        "Décision 1 : arbitrez le système maître du PO pour les indirects et pour les directs ; expliquez les conséquences sur la numérotation et la réception.",
        "Décision 2 : choisissez l'interface de demande par population (siège, usines, acheteurs) et justifiez le recours à Guided Buying.",
        "Décisions 3 et 4 : réutilisez vos matrices de réception (jour 5) et d'approbation (jour 4) ; définissez les règles de rapprochement et les tolérances par catégorie, ainsi que l'assignation des exceptions.",
        "Décision 5 : définissez les règles de transaction Network (factures sans PO, numéro unique, plafonnement, pièces jointes obligatoires) et la liste blanche.",
        "Décision 7 : listez les flux de données de base à intégrer depuis S/4HANA et les flux transactionnels (PO, Receipt, Invoice, statut de paiement), avec le sens de chaque flux.",
        "Décision 8 : segmentez les 380 fournisseurs en vagues d'enablement (Enterprise / Standard), avec un calendrier et un message par segment.",
        "Rédigez le document de conception synthétique (2 pages) : décisions, justifications, risques et points ouverts.",
        "Préparez une liste de 8 cas de test de bout en bout pour le cahier de recette.",
      ],
      deliverable: "Un document de conception P2P de 2 pages (8 décisions justifiées), un plan d'enablement par segment et une liste de 8 cas de test.",
      solution: `## Décisions et justifications

**1. Système maître du PO.** Indirects : PO créé dans Ariba après approbation, répliqué vers S/4HANA (numérotation Ariba avec préfixe, engagement dans S/4HANA). Directs : PO créé dans S/4HANA (MM, MRP) et transmis au Network via CIG ; réception au magasin dans S/4HANA. Cette dualité est standard et évite de perturber la logistique.

**2. Interface de demande.** Guided Buying pour le siège et les usines (tuiles par catégorie, formulaires pour prestations et maintenance, politiques affichées), Buying classique pour les acheteurs qui traitent les demandes hors catalogue et les Change orders. Les demandeurs d'usine n'ont besoin que de trois tuiles et d'une tâche de réception simplifiée.

**3. Réception.** Reprise de la matrice du jour 5 : automatique pour fournitures et abonnements, manuelle en quantité pour l'informatique (réceptionnaire IT), manuelle en montant pour prestations et maintenance (service fait mensuel), S/4HANA pour les directs.

**4. Rapprochement.** 3-way pour matériel et maintenance, 2-way pour prestations et abonnements. Tolérance prix 2 % ou 20 €, quantité 0 %, TVA 0,05 €. Exceptions prix → acheteurs ; réception → demandeur avec escalade à 5 jours vers le manager ; TVA, doublons, PO introuvable → Invoice Manager.

**5. Règles de transaction Network.** Interdire les factures sans PO sauf liste blanche (bailleurs, énergie, télécoms) ; numéro de facture unique ; montant facturé plafonné au reste à facturer ; date de facture non future ; pièce jointe obligatoire pour les prestations. Rejet automatique avec motif.

**6. Approbation.** Matrice du jour 4 avec Purchasing Agent en tête pour le hors catalogue, chaîne hiérarchique en série, DSI et direction achats en parallèle, escalade à 3 jours.

**7. Flux d'intégration (CIG).**

| Flux | Sens | Fréquence |
|---|---|---|
| Fournisseurs (Business Partner) et Supplier Locations | S/4HANA → Ariba | Quotidien |
| Centres de coûts, comptes généraux, ordres internes, codes TVA | S/4HANA → Ariba | Quotidien |
| Utilisateurs et hiérarchie | SIRH → Ariba | Hebdomadaire |
| PO indirects | Ariba → S/4HANA | Temps réel |
| PO directs | S/4HANA → Network | Temps réel |
| Receipt indirects | Ariba → S/4HANA | Temps réel |
| Entrées de marchandises directs | S/4HANA → Ariba (visibilité) | Temps réel |
| Invoice rapprochée (IR) | Ariba → S/4HANA | Temps réel |
| Statut de paiement / Remittance | S/4HANA → Ariba → Network | Quotidien |

**8. Enablement.** Vague 1 (mois 1-2) : 40 fournisseurs stratégiques en compte Enterprise avec intégration cXML ou PO flip. Vague 2 (mois 2-4) : 120 PME représentant 80 % des factures restantes en compte Standard (commande par e-mail, PO flip). Vague 3 (mois 4-6) : queue de distribution, avec OCR pour les récalcitrants. Message par segment : bénéfices concrets (visibilité du statut de paiement, zéro ressaisie), gratuité du compte Standard, support téléphonique.

## Risques et points ouverts

- Qualité du champ Supervisor dans le SIRH (risque d'approbations bloquées).
- Codes TVA : responsabilité de la fiscalité pour la table de détermination.
- Adhésion des demandeurs d'usine : prévoir un « ambassadeur » par site.
- Point ouvert : traitement des notes de frais et des cartes achats, hors périmètre vague 1.

## Cahier de recette : 8 cas de bout en bout

1. Achat catalogue, approbation manager, PO Network, réception automatique, facture PO flip, paiement.
2. Demande hors catalogue 65 000 € conseil : Purchasing Agent, approbations série et parallèle, PO e-mail, réception en montant mensuelle, facture 2-way.
3. Change order augmentant la quantité après envoi du PO, nouvelle version transmise au fournisseur.
4. Facture avec écart de prix hors tolérance : exception assignée à l'acheteur, acceptation, re-match, paiement.
5. Facture 3-way sans réception : exception au demandeur, réception, re-match.
6. Facture sans PO d'un fournisseur hors liste blanche : rejet automatique sur le Network.
7. Avoir ligne émis par le fournisseur, rapprochement et imputation sur le solde dans S/4HANA.
8. PO direct créé dans S/4HANA, transmis au Network, ASN du fournisseur, entrée de marchandises MIGO, facture rapprochée.`,
      tips: [
        "En atelier, notez chaque décision avec son propriétaire et sa justification : c'est ce qui vous protège lors de la recette.",
        "Le responsable S/4HANA deviendra votre allié si vous lui montrez que les flux sont standards CIG et non spécifiques.",
        "Ne laissez jamais une décision ouverte sans date de clôture : elle bloquera le paramétrage.",
      ],
    },
    {
      id: "m2-s2-j3-a3",
      moduleId: "m2",
      week: 2,
      day: 3,
      kind: "quiz",
      title: "Quiz : conception d'un déploiement P2P",
      level: "avance",
      durationMin: 15,
      objective: "Valider la capacité à arbitrer les décisions de conception d'un P2P intégré.",
      questions: [
        {
          id: "m2-s2-j3-q1",
          question: "Pour des achats directs pilotés par le MRP, quel scénario de commande est le plus pertinent ?",
          options: [
            "PO créé dans Ariba Buying puis répliqué dans S/4HANA",
            "PO créé dans S/4HANA (MM) puis transmis au fournisseur via le Business Network",
            "PO créé dans Guided Buying",
            "Aucun PO : le fournisseur facture directement",
          ],
          answer: 1,
          explanation: "Les achats directs sont générés par la planification (MRP) et la logistique de S/4HANA ; le PO y est donc créé, puis envoyé au fournisseur via CIG et le Network pour bénéficier de l'ASN et du PO flip. Créer ces PO dans Ariba Buying obligerait à ressaisir des besoins issus du MRP. Guided Buying est destiné aux demandeurs occasionnels d'achats indirects. Facturer sans commande supprime tout contrôle.",
          concept: "Scénarios d'intégration de la commande avec S/4HANA",
        },
        {
          id: "m2-s2-j3-q2",
          question: "Quelle règle de transaction Network répond directement à l'objectif « plus de factures sans commande, sauf loyers et énergie » ?",
          options: [
            "Imposer une pièce jointe sur toutes les factures",
            "Interdire les factures sans référence PO, avec une liste blanche de fournisseurs autorisés",
            "Exiger un ASN avant toute facture",
            "Bloquer les factures de plus de 10 000 €",
          ],
          answer: 1,
          explanation: "La règle « facture sans PO interdite » peut être paramétrée globalement et assouplie par groupe de fournisseurs (liste blanche), ce qui correspond exactement au besoin. La pièce jointe obligatoire ne garantit pas la présence d'un PO. L'ASN concerne l'expédition et n'est pas pertinent pour des loyers. Un plafond de montant ne traite pas la question de la référence commande.",
          concept: "Règles de transaction du Business Network",
        },
        {
          id: "m2-s2-j3-q3",
          question: "Quelle donnée de référence conditionne directement le bon fonctionnement de la chaîne hiérarchique d'approbation ?",
          options: ["Le champ Supervisor des utilisateurs", "Le numéro ANID du fournisseur", "Le code TVA de la ligne", "Le prix catalogue"],
          answer: 0,
          explanation: "Les règles d'approbation hiérarchique remontent la chaîne des Supervisors du demandeur ; un champ vide ou obsolète bloque ou dévie le flux. L'ANID sert au routage des documents vers le fournisseur, le code TVA à la détermination fiscale et au rapprochement, et le prix catalogue à la qualité des commandes : aucun n'affecte la hiérarchie d'approbation.",
          concept: "Données de base et hiérarchie des utilisateurs",
        },
        {
          id: "m2-s2-j3-q4",
          question: "Dans quel sens circule le flux « Invoice Reconciliation approuvée » dans une intégration standard Ariba / S/4HANA ?",
          options: ["S/4HANA → Ariba", "Ariba → S/4HANA", "Business Network → S/4HANA directement", "Guided Buying → Business Network"],
          answer: 1,
          explanation: "La facture est rapprochée et approuvée dans Ariba, puis transmise par CIG à S/4HANA pour comptabilisation et paiement : le flux va d'Ariba vers l'ERP. Le Network envoie la facture au realm Ariba, pas directement à S/4HANA dans le scénario Buying & Invoicing. Guided Buying ne traite pas les factures.",
          concept: "Flux d'intégration P2P avec S/4HANA",
        },
        {
          id: "m2-s2-j3-q5",
          question: "Pourquoi segmenter les fournisseurs avant l'enablement sur le Business Network ?",
          options: [
            "Parce qu'Ariba limite le nombre de fournisseurs par realm",
            "Pour adapter le type de compte (Enterprise ou Standard), le canal (intégration, PO flip, e-mail) et le message à chaque segment",
            "Parce que seuls les fournisseurs Enterprise peuvent recevoir des PO",
            "Pour réduire le nombre de Commodity codes",
          ],
          answer: 1,
          explanation: "La segmentation (volume de documents, montant, maturité technique) permet de proposer un compte Enterprise intégré aux fournisseurs stratégiques et un compte Standard gratuit avec PO flip aux PME, avec une communication adaptée ; c'est la clé du taux de factures électroniques. Il n'existe pas de limite de fournisseurs par realm, les comptes Standard reçoivent bien des PO, et la segmentation n'a aucun lien avec les Commodity codes.",
          concept: "Segmentation et plan d'enablement fournisseurs",
        },
      ],
    },
  ],
  useCases: [
    {
      id: "m2-uc1",
      moduleId: "m2",
      title: "Réduire de moitié les factures bloquées en 90 jours",
      client: "Groupe industriel, 4 000 salariés, S/4HANA et Ariba Buying & Invoicing en production depuis 6 mois",
      situation: "35 % des factures sont en exception plus de 10 jours ; la comptabilité fournisseurs menace de revenir à la saisie dans S/4HANA.",
      challenge: "Identifier les causes racines dans un contexte tendu entre achats, comptabilité et IT, sans tout reparamétrer.",
      approach: [
        "Extraire les exceptions sur 3 mois et les croiser par type, fournisseur, Commodity code et canal d'arrivée.",
        "Constater que 50 % des exceptions sont des écarts de réception sur des catégories à faible enjeu et 20 % des factures sans PO de 15 fournisseurs récurrents.",
        "Activer la réception automatique sur ces catégories et ajouter une règle Network interdisant les factures sans PO avec liste blanche.",
        "Réassigner les exceptions de réception aux demandeurs avec escalade, et former les managers au service fait mensuel.",
        "Suivre chaque semaine le first-time match en comité P2P.",
      ],
      outcome: "Exceptions de plus de 10 jours divisées par deux en 90 jours, first-time match passé de 58 % à 84 %, abandon de l'idée de retour arrière.",
      lesson: "Le diagnostic par les données précède toujours le paramétrage : la plupart des exceptions ont trois causes racines seulement.",
    },
    {
      id: "m2-uc2",
      moduleId: "m2",
      title: "Simplifier un flux d'approbation à 11 niveaux",
      client: "Banque régionale, 2 200 salariés",
      situation: "Le flux d'approbation historique, transposé tel quel dans Ariba, comporte jusqu'à 11 approbateurs en série ; les Requisitions mettent 12 jours à être approuvées.",
      challenge: "Convaincre une organisation très hiérarchique de réduire les niveaux sans perdre le contrôle attendu par l'audit interne.",
      approach: [
        "Mesurer le taux de refus par niveau : 9 niveaux sur 11 n'ont jamais refusé une demande en un an.",
        "Proposer un modèle à 3 niveaux hiérarchiques maximum selon le montant, avec les validations d'expertise (IT, conformité) en parallèle.",
        "Présenter à l'audit interne la traçabilité complète d'Ariba (historique des approbations, délégations) comme garantie équivalente.",
        "Paramétrer les règles en realm de test et prévisualiser le flux sur 50 Requisitions réelles anonymisées.",
        "Déployer avec escalade à 2 jours et délégations obligatoires pendant les congés.",
      ],
      outcome: "Délai d'approbation moyen ramené de 12 à 2,5 jours, aucune réserve d'audit, satisfaction des demandeurs en hausse.",
      lesson: "Les données de refus par niveau sont l'argument le plus efficace pour simplifier une matrice d'approbation.",
    },
    {
      id: "m2-uc3",
      moduleId: "m2",
      title: "Déployer Guided Buying pour des usines peu digitalisées",
      client: "Industrie agroalimentaire, 8 usines, 1 500 demandeurs occasionnels",
      situation: "Le pilote Buying classique a échoué dans les usines : interface jugée trop complexe, retour aux commandes par téléphone, factures sans commande en hausse.",
      challenge: "Réconcilier des utilisateurs réfractaires avec un processus d'achat contrôlé.",
      approach: [
        "Observer sur site les 10 besoins d'achat les plus fréquents par usine.",
        "Construire dans Guided Buying une page d'accueil par usine avec 6 tuiles, 3 formulaires (maintenance, EPI, prestations) et les fournisseurs préférés mis en avant.",
        "Paramétrer des politiques informatives plutôt que bloquantes au démarrage, puis durcir progressivement.",
        "Former des ambassadeurs par usine et simplifier la tâche de réception (réception automatique sous 500 €).",
        "Mesurer la part des achats passés par Guided Buying chaque mois.",
      ],
      outcome: "Taux d'adoption de 90 % en 4 mois, factures sans commande ramenées de 30 % à 8 %, part des achats catalogue passée à 65 %.",
      lesson: "Guided Buying réussit quand il est conçu à partir des besoins réels observés, avec peu de tuiles et des politiques progressives.",
    },
  ],
  glossary: [
    { term: "Requisition (PR)", definition: "Demande d'achat Ariba, composée d'un en-tête et de lignes catalogue, hors catalogue ou Spot Buy ; devient un PO par fournisseur après approbation.", moduleId: "m2" },
    { term: "Non-catalog request", definition: "Ligne de demande hors catalogue saisie librement par le demandeur et complétée par un Purchasing Agent avant commande.", moduleId: "m2" },
    { term: "Guided Buying", definition: "Interface simplifiée de demande d'achat (tuiles, formulaires, politiques) qui crée des Requisitions standard dans Buying.", moduleId: "m2" },
    { term: "Spot Buy", definition: "Marketplace intégrée à Ariba pour les achats ponctuels de faible montant hors catalogue négocié.", moduleId: "m2" },
    { term: "Approval flow", definition: "Graphe d'approbation calculé par des règles (montant, hiérarchie, Commodity code, imputation), composé de nœuds en série ou en parallèle.", moduleId: "m2" },
    { term: "Change order", definition: "Modification d'une Requisition déjà commandée, créant une nouvelle version et un PO mis à jour transmis au fournisseur.", moduleId: "m2" },
    { term: "Supplier Location", definition: "Adresse de commande d'un fournisseur, portant la méthode d'envoi du PO et le lien vers l'ANID du compte Network.", moduleId: "m2" },
    { term: "Receipt", definition: "Document de réception (quantité ou montant) qui atteste de la livraison et permet le rapprochement 3-way.", moduleId: "m2" },
    { term: "Advance Ship Notice (ASN)", definition: "Avis d'expédition émis par le fournisseur sur le Network, qui fait passer le PO en statut Shipped et facilite la réception.", moduleId: "m2" },
    { term: "Invoice Reconciliation (IR)", definition: "Document créé à l'arrivée d'une facture pour la rapprocher du PO et des réceptions ; porte les exceptions et suit son propre flux d'approbation.", moduleId: "m2" },
    { term: "Exception type", definition: "Catégorie d'écart détectée lors du rapprochement (PO Price Variance, Received Quantity Variance, Duplicate invoice…), assignée à un groupe avec une tolérance.", moduleId: "m2" },
    { term: "Transaction rules", definition: "Règles de l'acheteur sur le Business Network qui contrôlent les documents envoyés par les fournisseurs (factures sans PO, numéro unique, plafonds).", moduleId: "m2" },
    { term: "First-time match", definition: "Indicateur mesurant la part des factures rapprochées sans aucune exception dès leur arrivée.", moduleId: "m2" },
  ],
  faq: [
    { q: "Une Requisition peut-elle contenir des lignes catalogue et hors catalogue ?", a: "Oui. Les lignes hors catalogue déclenchent simplement l'insertion d'un Purchasing Agent dans le flux d'approbation. À l'approbation finale, Ariba génère les PO par fournisseur, qu'ils proviennent de lignes catalogue ou hors catalogue.", moduleId: "m2" },
    { q: "Guided Buying est-il obligatoire ?", a: "Non, c'est une licence et une interface complémentaires. Il est fortement recommandé pour les demandeurs occasionnels car il simplifie l'expérience et affiche les politiques d'achat. Les acheteurs continuent en général d'utiliser l'interface Buying classique.", moduleId: "m2" },
    { q: "Peut-on avoir un rapprochement 3-way pour certaines catégories et 2-way pour d'autres ?", a: "Oui, c'est même la pratique recommandée. Le type de rapprochement se définit par Commodity code ou par fournisseur, en cohérence avec la stratégie de réception : 3-way pour les biens contrôlés physiquement, 2-way pour les services et abonnements.", moduleId: "m2" },
    { q: "Qui doit résoudre les exceptions de facture ?", a: "Cela se paramètre par type d'exception. Bonne pratique : écarts de prix aux acheteurs, écarts de réception aux demandeurs, doublons et TVA à la comptabilité (Invoice Manager). L'important est que chaque exception ait un responsable clair et un délai d'escalade.", moduleId: "m2" },
    { q: "Que se passe-t-il si un fournisseur envoie une facture papier alors qu'il est sur le Network ?", a: "La facture peut être saisie manuellement ou numérisée dans Ariba, mais elle perd les avantages du PO flip. Les clients matures imposent contractuellement le canal électronique et rejettent progressivement les factures papier des fournisseurs enablés.", moduleId: "m2" },
    { q: "Le paiement est-il fait dans Ariba ?", a: "Non. Ariba rapproche et approuve la facture puis la transmet à S/4HANA, qui exécute le paiement via le programme de paiement. Ariba et le Network peuvent ensuite afficher le statut de paiement et l'avis de règlement au fournisseur.", moduleId: "m2" },
  ],
};
