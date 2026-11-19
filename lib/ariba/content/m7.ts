import type { ModuleContent } from "../types";

export const m7: ModuleContent = {
  moduleId: "m7",
  activities: [
    // ───────────────────────── Semaine 5 · Jour 4 : Catalogues CIF et PunchOut ─────────────────────────
    {
      id: "m7-s5-j4-a1",
      moduleId: "m7",
      week: 5,
      day: 4,
      kind: "lecon",
      title: "Catalogues Ariba : CIF, cXML et PunchOut",
      level: "intermediaire",
      durationMin: 30,
      objective: "Distinguer les formats de catalogue (CIF, Excel, cXML) et les deux niveaux de PunchOut, et comprendre leur cycle de publication via le réseau.",
      content: `## Pourquoi le catalogue est le cœur de l'adoption

Un utilisateur qui trouve son article en trois clics commande dans Ariba ; sinon il crée une **non-catalog request** approximative ou contourne l'outil. Le taux de **dépense sous catalogue** est donc l'indicateur d'adoption numéro un du P2P indirect.

## Catalogue hébergé vs PunchOut

| Type | Où est le contenu ? | Format | Usage typique |
|---|---|---|---|
| **Catalogue hébergé (statique)** | Chargé dans Ariba, indexé et recherchable | **CIF 3.0**, Excel template, **cXML** (Index) | Fournitures, consommables, pièces à prix négociés |
| **PunchOut** | Sur le site e-commerce du fournisseur | cXML (PunchOutSetup / OrderMessage) | Catalogues profonds ou configurables (IT, mobilier, voyages) |

## Le format CIF 3.0

Le **Catalog Interchange Format** est un fichier texte délimité par des virgules, en deux parties.

L'**en-tête** décrit le fichier :

\`\`\`
CIF_I_V3.0
LOADMODE: F
CODEFORMAT: UNSPSC
CURRENCY: EUR
SUPPLIERID_DOMAIN: NetworkID
ITEMCOUNT: 2
TIMESTAMP: 2026-03-01 09:00:00
FIELDNAMES: Supplier ID, Supplier Part ID, Manufacturer Part ID, Item Description, SPSC Code, Unit Price, Unit of Measure, Lead Time, Manufacturer Name, Supplier URL, Manufacturer URL, Market Price
DATA
AN01000012345,STYLO-BLEU-10,BIC-CRY-BL,"Stylo bille bleu, boîte de 10",44121704,3.20,BX,2,BIC,,,4.10
AN01000012345,RAM-A4-80,,"Ramette papier A4 80g, 500 feuilles",14111507,4.85,RM,3,Clairefontaine,,,5.60
ENDOFDATA
\`\`\`

- **LOADMODE** : \`F\` (Full, remplace tout le catalogue) ou \`I\` (Incremental, met à jour ou supprime les lignes indiquées).
- **CODEFORMAT** : système de classification, en pratique **UNSPSC** (code à 8 chiffres, ex. 44121704 = stylos à bille).
- **SUPPLIERID_DOMAIN** : \`NetworkID\` (ANID) ou \`DUNS\` ; il doit correspondre à l'identifiant déclaré du fournisseur dans Ariba Buying, sinon les articles ne sont pas reliés au bon **Supplier Location**.
- Les colonnes obligatoires : Supplier ID, Supplier Part ID, Item Description, SPSC Code, Unit Price, Unit of Measure. Le **Manufacturer Part ID** facilite les comparaisons ; **Lead Time** en jours ; **Market Price** affiche le prix public pour visualiser la remise.
- Les **champs étendus** (\`PARAMETERS\`, images, attributs, **tiers de prix**, Contract ID, Short name, Language) enrichissent la recherche et le contrôle.

Le **template Excel** d'Ariba produit un fichier équivalent pour les fournisseurs non outillés. Le format **cXML Index** véhicule les mêmes données en XML, souvent généré par les PIM fournisseurs ; le **cXML Contract** y ajoute les prix négociés par acheteur.

## PunchOut : niveau 1 et niveau 2

Au clic sur une tuile PunchOut, Ariba envoie un **PunchOutSetupRequest** (cXML) au fournisseur ; celui-ci répond par un **PunchOutSetupResponse** contenant l'URL de session. L'utilisateur fait son panier sur le site fournisseur, puis le site renvoie le panier à Ariba dans un **PunchOutOrderMessage** ; les lignes deviennent des lignes de demande d'achat, soumises au flux d'approbation normal.

- **Level 1** : l'utilisateur part d'une tuile « site fournisseur » et cherche sur le site. Le contenu n'est pas indexé dans Ariba.
- **Level 2** : le fournisseur publie en plus un **index** (CIF ou cXML) des articles ; la recherche Ariba affiche les résultats et le clic « PunchOut » ouvre directement la fiche produit (*product-level* ou *aisle-level* PunchOut).

> Le Level 2 est systématiquement préférable : il préserve la recherche unifiée tout en laissant le prix et le stock au fournisseur.

## Cycle de publication via le réseau

1. Le fournisseur (compte **Enterprise**) charge son catalogue dans son compte réseau ou l'acheteur le charge lui-même (**buyer-loaded**).
2. Le réseau **valide** la syntaxe et les codes UNSPSC ; les erreurs sont listées.
3. Le fournisseur **publie** vers l'acheteur ; l'acheteur reçoit une **subscription** de catalogue.
4. L'administrateur acheteur **approuve** (ou rejette) après contrôle des prix contre le contrat ; une **version** est créée.
5. Le catalogue est **activé** et rendu visible selon les **catalog views**.

Chaque mise à jour fournisseur crée une nouvelle version : le **refresh** est tracé, et l'on peut comparer deux versions ligne à ligne (**Ariba Catalog Audit** / rapport de différences).`,
      keyPoints: [
        "Le taux de dépense sous catalogue est l'indicateur d'adoption clé du P2P indirect.",
        "CIF 3.0 : en-tête (LOADMODE F/I, CODEFORMAT UNSPSC, CURRENCY, SUPPLIERID_DOMAIN, ITEMCOUNT, TIMESTAMP, FIELDNAMES) puis DATA/ENDOFDATA.",
        "Colonnes obligatoires : Supplier ID, Supplier Part ID, Item Description, SPSC Code, Unit Price, Unit of Measure.",
        "PunchOut : PunchOutSetupRequest → PunchOutSetupResponse → panier → PunchOutOrderMessage ; Level 2 ajoute un index recherchable dans Ariba.",
        "Publication via le réseau : upload (Enterprise), validation, publication, approbation acheteur, version, activation par catalog views.",
      ],
    },
    {
      id: "m7-s5-j4-a2",
      moduleId: "m7",
      week: 5,
      day: 4,
      kind: "exercice",
      title: "Diagnostiquer un fichier CIF rejeté et cadrer un PunchOut",
      level: "intermediaire",
      durationMin: 40,
      objective: "Corriger un fichier CIF fautif et spécifier les échanges cXML d'un PunchOut Level 2.",
      context: `Chez **Hélios Assurances** (2 800 salariés), le fournisseur de fournitures de bureau **Bureautik** a chargé un catalogue sur SAP Business Network. Le réseau renvoie 3 erreurs et l'administrateur acheteur refuse la version. Voici le début du fichier :

\`\`\`
CIF_I_V3.0
LOADMODE: F
CODEFORMAT: UNSPSC
CURRENCY: EUR
SUPPLIERID_DOMAIN: DUNS
ITEMCOUNT: 3
TIMESTAMP: 2026-02-14 10:30:00
FIELDNAMES: Supplier ID, Supplier Part ID, Manufacturer Part ID, Item Description, SPSC Code, Unit Price, Unit of Measure, Lead Time, Manufacturer Name, Supplier URL, Manufacturer URL, Market Price
DATA
AN01000098765,CLAS-A4-BL,,Classeur A4 dos 50mm bleu,4412,5,90,EA,2,Exacompta,,,7.50
AN01000098765,AGR-24-6,,"Agrafes 24/6, boîte de 1000",44121615,1.15,BX,2,Rapid,,,1.60
AN01000098765,ENC-NOIR,,"Cartouche encre noire, compatible HP 302",44103103,,EA,5,Compatible,,,19.90
ENDOFDATA
\`\`\`

Par ailleurs, le fournisseur IT **Comptech** propose un PunchOut Level 2 pour son catalogue de 40 000 références et vous demande les prérequis techniques.`,
      steps: [
        "Repérez les trois erreurs du fichier CIF (en-tête et données) et expliquez l'effet de chacune sur la validation ou sur le rattachement au fournisseur.",
        "Réécrivez les lignes DATA corrigées.",
        "Indiquez quel LOADMODE Bureautik devra utiliser pour corriger seulement un prix la semaine suivante, et pourquoi.",
        "Pour Comptech, décrivez la séquence des trois messages cXML du PunchOut et le contenu minimal du PunchOutSetupRequest (identité, credentials, BrowserFormPost, SupplierSetup).",
        "Précisez ce que Comptech doit publier en plus pour être Level 2 et comment l'utilisateur Hélios le percevra.",
        "Listez les contrôles que l'administrateur acheteur doit faire avant d'approuver la version du catalogue Bureautik (prix contrat, UNSPSC, UoM, doublons).",
      ],
      deliverable: "Un diagnostic du CIF avec le fichier corrigé, la règle LOADMODE, et une fiche de spécification PunchOut Level 2 (séquence cXML, squelette du PunchOutSetupRequest, prérequis fournisseur).",
      solution: `## Diagnostic du CIF

1. **SUPPLIERID_DOMAIN: DUNS** alors que la colonne Supplier ID contient un ANID (\`AN01…\`). Le réseau ne retrouvera pas le fournisseur : il faut \`SUPPLIERID_DOMAIN: NetworkID\` (ou mettre un vrai DUNS à 9 chiffres).
2. Ligne 1 : le prix \`5,90\` utilise une virgule décimale ; comme le séparateur de champ est la virgule, la ligne a 13 champs au lieu de 12 et le code UNSPSC \`4412\` n'a que 4 chiffres (il faut 8 chiffres, ex. \`44122011\` pour les classeurs). Deux erreurs sur une ligne : prix non numérique / décalage de colonnes, et UNSPSC invalide.
3. Ligne 3 : **Unit Price vide** : le prix est obligatoire ; le réseau rejette l'article.

Fichier corrigé :

\`\`\`
SUPPLIERID_DOMAIN: NetworkID
...
DATA
AN01000098765,CLAS-A4-BL,,"Classeur A4 dos 50mm bleu",44122011,5.90,EA,2,Exacompta,,,7.50
AN01000098765,AGR-24-6,,"Agrafes 24/6, boîte de 1000",44121615,1.15,BX,2,Rapid,,,1.60
AN01000098765,ENC-NOIR,,"Cartouche encre noire, compatible HP 302",44103103,14.90,EA,5,Compatible,,,19.90
ENDOFDATA
\`\`\`

**LOADMODE** pour une correction de prix isolée : \`I\` (Incremental) avec la seule ligne concernée (et \`ITEMCOUNT: 1\`). Un \`F\` remplacerait tout le catalogue : acceptable mais risqué si le fichier complet n'est pas à jour, et chaque Full crée une version complète à réapprouver.

## PunchOut Level 2 — Comptech

Séquence : **PunchOutSetupRequest** (Ariba → Comptech, operation \`create\`) → **PunchOutSetupResponse** (URL de session) → navigation et panier chez Comptech → **PunchOutOrderMessage** (Comptech → Ariba via BrowserFormPost) → lignes insérées dans la demande d'achat.

Squelette du PunchOutSetupRequest :

\`\`\`
<cXML payloadID="2026-03-01T10:00:00@buyer.helios.fr" timestamp="2026-03-01T10:00:00+01:00">
  <Header>
    <From><Credential domain="NetworkID"><Identity>AN01000011111</Identity></Credential></From>
    <To><Credential domain="NetworkID"><Identity>AN01000022222</Identity></Credential></To>
    <Sender><Credential domain="NetworkID"><Identity>AN01000011111</Identity><SharedSecret>******</SharedSecret></Credential>
      <UserAgent>Ariba Buyer</UserAgent></Sender>
  </Header>
  <Request>
    <PunchOutSetupRequest operation="create">
      <BuyerCookie>ABC123</BuyerCookie>
      <Extrinsic name="UserEmail">j.martin@helios.fr</Extrinsic>
      <BrowserFormPost><URL>https://service.ariba.com/.../punchoutreturn</URL></BrowserFormPost>
      <SupplierSetup><URL>https://punchout.comptech.fr/setup</URL></SupplierSetup>
      <ShipTo>...</ShipTo>
    </PunchOutSetupRequest>
  </Request>
</cXML>
\`\`\`

**Prérequis Comptech** : compte Enterprise, endpoint PunchOut HTTPS avec authentification par SharedSecret, publication d'un **index** (CIF ou cXML Index) avec, pour chaque article, le champ PunchOut (URL produit) ; test sur le compte AN02 ; gestion du \`operation="edit"\` et \`inspect\` pour modifier un panier. Côté utilisateur, les 40 000 articles apparaissent dans la recherche Ariba avec la mention PunchOut ; le clic ouvre directement la fiche produit (product-level).

## Contrôles acheteur avant approbation

- Comparaison des prix avec le contrat (tolérance 0 % sur les articles « core ») via le rapport de différences de version.
- UNSPSC à 8 chiffres et cohérents avec la catégorie du contrat (pas d'article IT dans un catalogue fournitures).
- Unités de mesure conformes (EA, BX, RM, PK) et prix exprimés pour l'unité indiquée.
- Absence de doublons de Supplier Part ID ; Lead Time renseigné ; images et descriptions courtes présentes.`,
      tips: [
        "Validez toujours un CIF dans le compte de test réseau avant publication : les messages d'erreur citent la ligne fautive.",
        "Mettez les descriptions contenant des virgules entre guillemets doubles.",
        "Pour un PunchOut, demandez au fournisseur ses références de PunchOut déjà en production avec d'autres clients Ariba : c'est le meilleur indicateur de maturité.",
      ],
    },
    {
      id: "m7-s5-j4-a3",
      moduleId: "m7",
      week: 5,
      day: 4,
      kind: "quiz",
      title: "Quiz : CIF et PunchOut",
      level: "intermediaire",
      durationMin: 12,
      objective: "Valider la maîtrise du format CIF et du mécanisme PunchOut.",
      questions: [
        {
          id: "m7-s5-j4-q1",
          question: "Dans un fichier CIF 3.0, que signifie LOADMODE: I ?",
          options: ["Le fichier remplace entièrement le catalogue existant", "Le fichier met à jour ou supprime uniquement les articles listés", "Le fichier est importé en mode inactif, sans publication", "Le fichier contient des articles PunchOut uniquement"],
          answer: 1,
          explanation: "LOADMODE: I (Incremental) indique que seules les lignes présentes dans le fichier sont ajoutées, modifiées ou supprimées, le reste du catalogue restant inchangé ; c'est le mode adapté aux corrections ponctuelles. Le remplacement complet correspond à LOADMODE: F (Full). Il n'existe pas de mode « inactif » : l'activation dépend de l'approbation de la version par l'acheteur. Les articles PunchOut sont signalés par un champ dédié dans les données, pas par le LOADMODE.",
          concept: "En-tête CIF : LOADMODE, CODEFORMAT, SUPPLIERID_DOMAIN",
        },
        {
          id: "m7-s5-j4-q2",
          question: "Quelle colonne CIF n'est PAS obligatoire ?",
          options: ["Supplier Part ID", "Unit Price", "Manufacturer Part ID", "SPSC Code"],
          answer: 2,
          explanation: "Le Manufacturer Part ID est facultatif : il aide à comparer des articles identiques entre fournisseurs mais sa présence n'est pas exigée par la validation du réseau. En revanche, Supplier Part ID identifie l'article chez le fournisseur et est indispensable au bon de commande ; Unit Price est obligatoire, un prix vide fait rejeter la ligne ; SPSC Code (UNSPSC à 8 chiffres) est requis pour la classification, la recherche et les règles de visibilité.",
          concept: "Colonnes obligatoires du CIF",
        },
        {
          id: "m7-s5-j4-q3",
          question: "Quel message cXML transporte le panier du site fournisseur vers Ariba à la fin d'un PunchOut ?",
          options: ["PunchOutSetupRequest", "PunchOutSetupResponse", "PunchOutOrderMessage", "OrderRequest"],
          answer: 2,
          explanation: "Le PunchOutOrderMessage est envoyé par le site fournisseur, via l'URL BrowserFormPost, pour ramener le contenu du panier dans Ariba où il devient des lignes de demande d'achat. Le PunchOutSetupRequest ouvre la session (Ariba vers fournisseur) et le PunchOutSetupResponse renvoie l'URL de démarrage (fournisseur vers Ariba). L'OrderRequest est le bon de commande envoyé ensuite au fournisseur une fois la demande approuvée : il n'intervient pas dans la phase PunchOut elle-même.",
          concept: "Séquence cXML du PunchOut",
        },
        {
          id: "m7-s5-j4-q4",
          question: "Qu'apporte un PunchOut Level 2 par rapport à un Level 1 ?",
          options: ["Le panier est approuvé automatiquement", "Les articles sont indexés dans la recherche Ariba grâce à un index publié par le fournisseur", "Le prix est figé dans Ariba au lieu du site fournisseur", "Il ne nécessite pas de compte Enterprise"],
          answer: 1,
          explanation: "En Level 2, le fournisseur publie un index (CIF ou cXML) de ses articles : l'utilisateur les voit dans la recherche Ariba et le clic PunchOut l'amène directement sur la fiche produit, ce qui préserve l'expérience de recherche unifiée. L'approbation reste celle du flux de demande d'achat, inchangée. Le prix et le stock restent gérés sur le site fournisseur, c'est le principe même du PunchOut. Le Level 2 exige au contraire un compte Enterprise, comme tout PunchOut et toute publication de catalogue.",
          concept: "PunchOut Level 1 vs Level 2",
        },
        {
          id: "m7-s5-j4-q5",
          question: "Après publication d'un catalogue par le fournisseur sur le réseau, que doit faire l'administrateur acheteur pour le rendre visible aux utilisateurs ?",
          options: ["Rien, la publication l'active automatiquement", "Approuver la version reçue (subscription) puis l'exposer via les catalog views", "Recharger le fichier CIF dans S/4HANA", "Créer une Trading Relationship Request"],
          answer: 1,
          explanation: "La publication fournisseur crée une subscription côté acheteur ; l'administrateur contrôle le contenu (prix contre contrat, UNSPSC, unités), approuve la version puis définit la visibilité via les catalog views. Rien n'est automatique : sans approbation, les utilisateurs ne voient pas le catalogue, ce qui protège contre des hausses de prix non négociées. S/4HANA n'héberge pas les catalogues Ariba. La TRR est un prérequis de relation commerciale, déjà rempli avant toute publication.",
          concept: "Cycle de publication et approbation des catalogues",
        },
      ],
    },

    // ───────────────────────── Semaine 5 · Jour 5 : Guided Buying et gouvernance des catalogues ─────────────────────────
    {
      id: "m7-s5-j5-a1",
      moduleId: "m7",
      week: 5,
      day: 5,
      kind: "lecon",
      title: "Guided Buying, visibilité et gouvernance du contenu",
      level: "avance",
      durationMin: 30,
      objective: "Concevoir une expérience Guided Buying guidée par des politiques et organiser la gouvernance du contenu catalogue (vues, versions, audit, prix).",
      content: `## Guided Buying : l'expérience « consommateur » de l'achat

**Guided Buying** est la couche d'interface d'Ariba Buying destinée aux demandeurs occasionnels. Son principe : **guider** l'utilisateur vers le bon canal d'achat sans qu'il connaisse les règles achats.

- La **landing page** est composée de **tuiles** (tiles) organisées par catégorie (Informatique, Fournitures, Déplacements, Prestations…) et par **persona** ou unité organisationnelle.
- Une tuile ouvre un catalogue hébergé, un **PunchOut**, un **formulaire** (form) pour les besoins non standards, un **Spot Buy** (marketplace de fournisseurs référencés par SAP pour les achats hors catalogue), ou une **non-catalog request** encadrée.
- Les **policies** (politiques) affichent des messages contextuels ou bloquent : « Les ordinateurs portables s'achètent uniquement via le catalogue Comptech », « Au-delà de 5 000 €, joindre trois devis », « Cette catégorie est réservée au service Communication ».
- Les **restrictions par fournisseur ou commodity** masquent ce qui ne doit pas être acheté librement ; le **flux d'approbation** reste celui d'Ariba Buying (la demande créée dans Guided Buying est une Requisition classique).

> Guided Buying ne remplace pas Ariba Buying : c'est une vitrine. Les règles d'approbation, les champs comptables par défaut et l'intégration S/4HANA vivent dans Buying & Invoicing.

## Hiérarchie du contenu et visibilité

Le contenu est organisé en **content hierarchy** (catégories UNSPSC regroupées en domaines métier). Les **catalog views** déterminent qui voit quoi :

| Dimension | Exemple |
|---|---|
| Groupe d'utilisateurs | Les équipes Laboratoire voient le catalogue Réactifs |
| Entité / pays | Le catalogue Bureautik France n'est pas visible en Allemagne |
| Commodity | Les articles UNSPSC 43xx (IT) sont masqués hors DSI |
| Fournisseur | Catalogue d'un fournisseur local limité à un site |

Les **kits** regroupent plusieurs articles (pack « arrivée d'un collaborateur » : ordinateur, écran, casque) pour une commande en un clic ; les articles **partiels** (partial items) permettent d'exiger un complément d'information à la commande (gravure, taille).

## Prix et contrats

Les catalogues peuvent porter des **tiers de prix** (quantité → prix) et des prix par **Contract ID**. La **validation de prix contre contrat** compare, à l'approbation d'une version, chaque Unit Price au prix contractuel chargé dans Ariba Contracts (ou saisi en Pricing Terms) ; un écart au-delà de la tolérance bloque la version ou génère une alerte. C'est la meilleure protection contre les « revalorisations silencieuses » des fournisseurs.

## Gouvernance : rôles et rituels

- **Catalog manager** (acheteur) : propriétaire du contenu de sa catégorie, approuve les versions, arbitre les demandes de visibilité.
- **Administrateur catalogue** : charge les catalogues buyer-loaded, gère les vues, surveille les erreurs de chargement.
- **Fournisseur** : maintient son contenu, respecte le calendrier de **refresh** (mensuel ou trimestriel), publie en test d'abord.

Rituels : comité contenu mensuel (nouveaux catalogues, taux de dépense sous catalogue, articles sans commande depuis 12 mois à retirer), **Ariba Catalog Audit** pour détecter les prix hors contrat, images manquantes, UNSPSC douteux, et revue des **non-catalog requests** fréquentes qui révèlent des manques de catalogue.

## Versioning et refresh

Chaque publication crée une **version** horodatée ; l'acheteur peut consulter le **rapport de différences** (articles ajoutés, supprimés, prix modifiés), revenir à une version antérieure et planifier l'activation. Le refresh fournisseur est encadré par une **catalog subscription** : fréquence, propriétaire, approbation requise ou automatique pour les petites variations.`,
      keyPoints: [
        "Guided Buying = vitrine guidée par tuiles, formulaires, Spot Buy et policies ; les règles d'approbation restent dans Ariba Buying.",
        "Les policies affichent ou bloquent selon la catégorie, le montant, le fournisseur ou l'organisation.",
        "Catalog views : visibilité par groupe d'utilisateurs, entité, commodity ou fournisseur ; kits et partial items enrichissent l'expérience.",
        "La validation de prix contre contrat protège contre les hausses non négociées à chaque nouvelle version.",
        "Gouvernance : catalog manager par catégorie, comité contenu mensuel, Catalog Audit, revue des non-catalog requests.",
        "Chaque publication crée une version comparable ; le refresh est cadré par la subscription.",
      ],
    },
    {
      id: "m7-s5-j5-a2",
      moduleId: "m7",
      week: 5,
      day: 5,
      kind: "simulation",
      title: "Simulation : atelier de gouvernance des catalogues avec les acheteurs catégorie",
      level: "avance",
      durationMin: 45,
      objective: "Animer un atelier de conception Guided Buying et de gouvernance catalogue, arbitrer les demandes contradictoires des acheteurs catégorie.",
      context: `Vous animez chez **Vertex Pharma Services** (3 200 salariés, 4 pays) l'atelier « Contenu et Guided Buying » avec quatre acheteurs catégorie :

- **Sophie (IT)** : veut que tout le matériel passe par le PunchOut Comptech et interdire les non-catalog requests sur l'UNSPSC 43xx.
- **Karim (Fournitures et services généraux)** : trois catalogues CIF (Bureautik, Lyreco-like, mobilier) ; se plaint que les fournisseurs changent les prix sans prévenir.
- **Elena (Laboratoire)** : catalogue réactifs de 120 000 références en cXML, prix variables selon la quantité ; veut une visibilité réservée aux 300 utilisateurs labo.
- **Marc (Prestations intellectuelles)** : pas de catalogue possible, demande un formulaire guidé avec trois devis au-dessus de 10 000 € et une liste de 20 fournisseurs référencés.

La DSI rappelle que les catalogues sont publiés via le réseau, que la DAF exige un contrôle des prix contre contrat et que le taux de dépense sous catalogue actuel est de 31 %.`,
      steps: [
        "Dessinez la landing page Guided Buying : tuiles par catégorie, type derrière chaque tuile (catalogue hébergé, PunchOut, formulaire, Spot Buy) et personas concernés.",
        "Rédigez cinq policies (texte utilisateur + comportement : message ou blocage + condition) répondant aux demandes de Sophie, Marc et de la DAF.",
        "Définissez les catalog views : qui voit le catalogue réactifs, le PunchOut IT, les catalogues fournitures, par pays et par groupe.",
        "Répondez à Karim : quel mécanisme met en place le contrôle des prix contre contrat et quelle tolérance proposez-vous ; comment traiter les versions fournisseur non approuvées.",
        "Pour Elena, précisez le format de catalogue adapté (cXML Index avec tiers de prix) et le mode de refresh (fréquence, approbation).",
        "Arbitrez le conflit entre Sophie (interdire les non-catalog requests IT) et les utilisateurs qui ont besoin d'accessoires introuvables : proposez une règle.",
        "Proposez une gouvernance : rôles, comité contenu, indicateurs, objectif de dépense sous catalogue à 12 mois.",
        "Listez les éléments à documenter dans le dossier de conception pour l'équipe de paramétrage.",
      ],
      deliverable: "Un compte rendu d'atelier : maquette de landing page, tableau des policies, matrice de visibilité, règles de contrôle des prix, plan de gouvernance avec indicateurs.",
      solution: `## Landing page proposée

| Tuile | Type | Visible par |
|---|---|---|
| Informatique et accessoires | PunchOut Level 2 Comptech | Tous |
| Fournitures de bureau | 2 catalogues CIF hébergés | Tous, filtrés par pays |
| Mobilier | Catalogue CIF + formulaire « aménagement » | Tous ; formulaire visible services généraux |
| Réactifs et consommables labo | Catalogue cXML Index (tiers de prix) | Groupe Laboratoire (300 utilisateurs) |
| Prestations intellectuelles | Formulaire guidé + liste de 20 fournisseurs | Managers et assistantes |
| Autre besoin | Spot Buy puis non-catalog request encadrée | Tous |

## Policies

1. **IT** : « Le matériel informatique s'achète via le catalogue Comptech. » Condition : UNSPSC 43xx en non-catalog request → **blocage** avec redirection vers la tuile, sauf groupe « Référents IT » (voir arbitrage).
2. **Prestations > 10 000 €** : « Joignez trois devis ou la justification de fournisseur unique. » Condition : formulaire prestations, montant > 10 000 € → **blocage** tant que la pièce jointe manque.
3. **Fournisseurs référencés** : « Seuls les fournisseurs référencés par les Achats sont proposés pour cette catégorie. » Condition : commodity Prestations → restriction fournisseur à la liste de Marc, **message** d'orientation vers l'acheteur pour toute exception.
4. **Hors catalogue** : « Avant de créer une demande libre, vérifiez Spot Buy. » Condition : clic sur non-catalog request → **message** et proposition Spot Buy.
5. **Prix contractuel (DAF)** : « Ce prix a été validé par les Achats. » Information sur les articles sous contrat ; les articles hors contrat affichent un **message** « prix indicatif, approbation Achats requise ».

## Matrice de visibilité

- Catalogue réactifs : catalog view « Laboratoire », groupe d'utilisateurs Labo, tous pays.
- PunchOut Comptech : tous, mais le PunchOut Level 2 affiche les prix pays via le paramètre ShipTo.
- Catalogues fournitures : une vue par pays (France, Belgique, Suisse, Allemagne) car les fournisseurs et devises diffèrent.
- Formulaire mobilier : groupe Services généraux uniquement.

## Réponse à Karim : contrôle des prix

Activer la **validation de prix contre contrat** à l'approbation de version : les Pricing Terms du contrat Ariba (ou un fichier de prix contractuels) servent de référence ; tolérance **0 %** sur les 200 articles « core », **+3 %** sur le reste, au-delà la version est **rejetée** avec commentaire au fournisseur. Les versions non approuvées restent en attente ; la version active n'est jamais remplacée sans validation. Le rapport de différences de version est envoyé automatiquement au catalog manager.

## Réponse à Elena : réactifs

Format **cXML Index** généré depuis le PIM du fournisseur, avec **tiers de prix** par quantité et UNSPSC 41xx/12xx ; refresh **mensuel** en LOADMODE incrémental, approbation automatique si moins de 2 % des articles changent de prix dans la tolérance, approbation manuelle sinon. Prévoir un **kit** « démarrage d'étude » pour les consommables récurrents.

## Arbitrage IT

La non-catalog request IT est bloquée pour les demandeurs ordinaires, mais autorisée au groupe **Référents IT** (un par site) ; Sophie reçoit chaque mois la liste des demandes libres pour enrichir le PunchOut. On protège le canal sans bloquer l'activité.

## Gouvernance

- Rôles : un catalog manager par catégorie (les quatre acheteurs), un administrateur catalogue central, un référent contenu par fournisseur stratégique.
- **Comité contenu mensuel** : nouvelles versions, rejets prix, non-catalog requests récurrentes, articles dormants à retirer.
- Indicateurs : taux de dépense sous catalogue (31 % → **65 % à 12 mois**), taux de non-catalog requests, délai d'approbation d'une version (< 5 jours), nombre de versions rejetées pour prix.
- **Ariba Catalog Audit** trimestriel : prix hors contrat, images manquantes, UNSPSC incohérents.

## Dossier de conception

Liste des tuiles et personas, tableau des policies avec conditions techniques, catalog views et groupes, règles de validation de prix et tolérances, subscriptions par fournisseur (fréquence, approbation), liste des kits, formulaires et champs, matrice de restriction fournisseur/commodity, plan de communication aux utilisateurs.`,
      tips: [
        "Une policy doit toujours proposer une issue (tuile, contact, Spot Buy) : un simple blocage pousse les utilisateurs hors de l'outil.",
        "Commencez les catalog views par le plus restrictif (labo, IT) et élargissez : il est plus facile d'ouvrir que de fermer.",
        "Le taux de dépense sous catalogue se gagne catégorie par catégorie : fixez un objectif à chaque acheteur.",
      ],
    },
    {
      id: "m7-s5-j5-a3",
      moduleId: "m7",
      week: 5,
      day: 5,
      kind: "quiz",
      title: "Quiz : Guided Buying et gouvernance",
      level: "avance",
      durationMin: 13,
      objective: "Vérifier la compréhension des mécanismes Guided Buying, de la visibilité et du contrôle des catalogues.",
      questions: [
        {
          id: "m7-s5-j5-q1",
          question: "Dans Guided Buying, à quoi sert une policy ?",
          options: ["À définir le flux d'approbation de la demande d'achat", "À afficher un message contextuel ou bloquer une action selon la catégorie, le montant ou l'organisation", "À publier un catalogue sur le réseau", "À attribuer un compte Enterprise au fournisseur"],
          answer: 1,
          explanation: "Les policies de Guided Buying guident l'utilisateur : elles affichent un message (« achetez via le catalogue X ») ou bloquent une action selon des conditions de catégorie, de montant, de fournisseur ou d'unité organisationnelle. Le flux d'approbation n'est pas défini par les policies mais par les règles d'approbation d'Ariba Buying & Invoicing, car la demande Guided Buying est une Requisition classique. La publication de catalogue est une opération du réseau. Le type de compte fournisseur est une décision du fournisseur, étrangère à Guided Buying.",
          concept: "Policies Guided Buying",
        },
        {
          id: "m7-s5-j5-q2",
          question: "Quel mécanisme restreint la visibilité d'un catalogue aux seuls utilisateurs d'un service ?",
          options: ["Le LOADMODE du fichier CIF", "Les catalog views associées à un groupe d'utilisateurs", "La Trading Relationship Request", "Les Default Transaction Rules"],
          answer: 1,
          explanation: "Les catalog views définissent qui voit quel contenu, par groupe d'utilisateurs, entité, pays, commodity ou fournisseur ; c'est l'outil pour réserver un catalogue réactifs aux équipes laboratoire. Le LOADMODE indique seulement si un chargement CIF est complet ou incrémental. La TRR établit la relation commerciale avec le fournisseur sur le réseau. Les Default Transaction Rules contrôlent les documents transactionnels (factures, confirmations), non la visibilité du contenu catalogue.",
          concept: "Catalog views et visibilité",
        },
        {
          id: "m7-s5-j5-q3",
          question: "Qu'est-ce que Spot Buy dans Guided Buying ?",
          options: ["Un mode d'approbation accéléré pour les petits montants", "Une marketplace d'articles de fournisseurs référencés par SAP pour les achats hors catalogue", "Un type de PunchOut Level 1", "Un rapport sur la dépense hors contrat"],
          answer: 1,
          explanation: "Spot Buy est une place de marché intégrée à Guided Buying qui propose des articles de fournisseurs présélectionnés par SAP pour couvrir les besoins ponctuels hors catalogue, en évitant la création de fournisseurs occasionnels dans le référentiel. Ce n'est pas un mode d'approbation : la demande suit le flux normal. Ce n'est pas non plus un PunchOut vers un fournisseur unique, ni un rapport ; la dépense hors contrat s'analyse via les rapports Ariba ou Spend Analysis.",
          concept: "Spot Buy et achats hors catalogue",
        },
        {
          id: "m7-s5-j5-q4",
          question: "Lors de l'approbation d'une nouvelle version de catalogue, quel contrôle protège le mieux contre une hausse de prix non négociée ?",
          options: ["La validation de la syntaxe CIF par le réseau", "La validation de prix contre le contrat avec une tolérance", "La vérification des codes UNSPSC", "La présence d'images pour chaque article"],
          answer: 1,
          explanation: "La validation de prix contre contrat compare chaque Unit Price de la nouvelle version au prix contractuel (Pricing Terms ou fichier de référence) et bloque ou alerte au-delà d'une tolérance définie : c'est le contrôle ciblé sur la dérive tarifaire. La validation syntaxique du réseau garantit seulement que le fichier est lisible. Le contrôle UNSPSC vise la classification et la visibilité. Les images améliorent l'expérience utilisateur mais n'ont aucun effet sur les prix.",
          concept: "Validation des prix contre contrat",
        },
        {
          id: "m7-s5-j5-q5",
          question: "Que révèle un volume élevé de non-catalog requests sur une catégorie ?",
          options: ["Que les utilisateurs sont bien formés", "Que le catalogue de cette catégorie est incomplet ou mal visible", "Que les règles de transaction sont trop strictes", "Que le fournisseur a un compte Standard"],
          answer: 1,
          explanation: "Des demandes libres nombreuses sur une catégorie signalent que les utilisateurs ne trouvent pas ce dont ils ont besoin : contenu manquant, catalog view trop restrictive ou PunchOut peu ergonomique ; c'est pourquoi la revue des non-catalog requests fait partie des rituels de gouvernance. Cela ne traduit pas une bonne formation, au contraire. Les règles de transaction concernent les documents fournisseurs sur le réseau, sans lien avec le mode de demande. Le type de compte fournisseur n'influence pas la création de demandes libres.",
          concept: "Pilotage de la dépense sous catalogue",
        },
      ],
    },
  ],

  useCases: [
    {
      id: "m7-uc1",
      moduleId: "m7",
      title: "Passer de 25 % à 70 % de dépense sous catalogue en un an",
      client: "Groupe de distribution spécialisée, 12 000 salariés, 600 magasins",
      situation: "Deux ans après le déploiement d'Ariba Buying, 75 % des demandes d'achat indirectes sont des non-catalog requests ; les acheteurs passent leur temps à corriger des fournisseurs et des prix.",
      challenge: "Industrialiser la mise en catalogue des catégories récurrentes sans alourdir la charge des acheteurs.",
      approach: [
        "Analyse des non-catalog requests sur 12 mois : 60 % de la dépense concentrée sur 8 catégories et 25 fournisseurs.",
        "Priorisation : catalogues CIF buyer-loaded pour les 10 fournisseurs les moins outillés, PunchOut Level 2 pour les 5 e-commerçants, cXML Index pour les 3 fournisseurs disposant d'un PIM.",
        "Mise en place de la validation de prix contre contrat et d'un comité contenu mensuel animé par un administrateur catalogue dédié.",
        "Refonte de la landing page Guided Buying par persona magasin / siège, avec policies redirigeant vers les catalogues.",
        "Communication en magasin et suivi d'un indicateur par acheteur catégorie.",
      ],
      outcome: "Dépense sous catalogue passée de 25 % à 70 % en 11 mois, délai moyen de traitement d'une demande divisé par trois, 40 % de factures en exception en moins.",
      lesson: "Le catalogue se gagne par l'analyse des demandes libres et une gouvernance incarnée ; la technologie (CIF, PunchOut, cXML) n'est que l'outil.",
    },
    {
      id: "m7-uc2",
      moduleId: "m7",
      title: "Un PunchOut qui casse les commandes dans S/4HANA",
      client: "Industriel chimique, 5 500 salariés",
      situation: "Depuis l'activation d'un PunchOut Level 1 avec un distributeur IT, 30 % des commandes issues du PunchOut sont rejetées à l'intégration S/4HANA : unités de mesure inconnues, descriptions tronquées, codes UNSPSC absents.",
      challenge: "Fiabiliser le PunchOut sans revenir au catalogue PDF ni bloquer les achats IT urgents.",
      approach: [
        "Analyse des PunchOutOrderMessage : le fournisseur renvoie des UoM propriétaires (« PCE », « CTN ») et des descriptions de 200 caractères, alors que S/4HANA attend des unités ISO et 40 caractères.",
        "Spécification d'un mapping d'unités dans le PunchOutOrderMessage côté fournisseur et activation de la troncature contrôlée des descriptions.",
        "Exigence d'un code UNSPSC sur chaque ligne et d'un Supplier Part ID stable ; tests sur le compte de test réseau.",
        "Passage en PunchOut Level 2 avec publication d'un index, ce qui permet en plus le contrôle des prix contractuels sur les articles indexés.",
        "Mise en place d'un rapport hebdomadaire des erreurs d'intégration par fournisseur.",
      ],
      outcome: "Taux de rejet des commandes PunchOut ramené sous 2 % en six semaines, adoption du PunchOut par les utilisateurs multipliée par deux grâce à la recherche unifiée.",
      lesson: "Un PunchOut est une intégration : il faut spécifier le contenu du PunchOutOrderMessage (UoM, UNSPSC, longueurs) au regard des contraintes du système cible, pas seulement l'ergonomie du site.",
    },
    {
      id: "m7-uc3",
      moduleId: "m7",
      title: "Des hausses de prix passées inaperçues pendant huit mois",
      client: "Collectivité territoriale, 7 000 agents",
      situation: "Un audit interne révèle que le fournisseur de fournitures a augmenté ses prix de 6 à 12 % sur 400 articles via des mises à jour de catalogue approuvées sans contrôle, en contradiction avec le marché public signé.",
      challenge: "Récupérer le trop-perçu, rétablir la confiance de la direction et empêcher toute récidive.",
      approach: [
        "Reconstitution de l'historique via les versions de catalogue et les rapports de différences : identification précise des articles et dates.",
        "Chiffrage du trop-facturé et négociation d'un avoir avec le fournisseur sur la base des Pricing Terms du marché.",
        "Chargement des prix contractuels dans Ariba et activation de la validation de prix contre contrat avec tolérance 0 % sur le bordereau de prix.",
        "Passage de l'approbation automatique des versions à une approbation manuelle par le catalog manager avec rapport de différences systématique.",
        "Audit trimestriel via Ariba Catalog Audit et clause de refresh encadrée dans les nouveaux marchés.",
      ],
      outcome: "Avoir de 180 000 € obtenu, plus aucune version approuvée hors contrat depuis, procédure intégrée au contrôle interne.",
      lesson: "L'approbation de version est un acte de contrôle financier : sans validation des prix contre contrat, le catalogue devient un canal de hausse silencieuse.",
    },
  ],

  glossary: [
    { term: "CIF 3.0 (Catalog Interchange Format)", definition: "Format texte délimité d'Ariba pour les catalogues hébergés : en-tête (LOADMODE, CODEFORMAT, CURRENCY, SUPPLIERID_DOMAIN, ITEMCOUNT, TIMESTAMP, FIELDNAMES) puis lignes DATA/ENDOFDATA.", moduleId: "m7" },
    { term: "LOADMODE", definition: "Champ d'en-tête CIF : F (Full) remplace le catalogue entier, I (Incremental) ajoute, modifie ou supprime uniquement les lignes du fichier.", moduleId: "m7" },
    { term: "UNSPSC", definition: "Classification internationale des produits et services en codes à 8 chiffres (segment, famille, classe, commodity), utilisée dans le champ SPSC Code pour la recherche, la visibilité et l'imputation.", moduleId: "m7" },
    { term: "SUPPLIERID_DOMAIN", definition: "Champ d'en-tête CIF indiquant le type d'identifiant fournisseur de la colonne Supplier ID : NetworkID (ANID) ou DUNS.", moduleId: "m7" },
    { term: "PunchOut", definition: "Mécanisme cXML permettant à l'utilisateur de constituer un panier sur le site du fournisseur et de le rapatrier dans la demande d'achat Ariba.", moduleId: "m7" },
    { term: "PunchOut Level 2", definition: "PunchOut enrichi d'un index d'articles publié par le fournisseur, permettant la recherche dans Ariba et l'accès direct à la fiche produit ou au rayon du site fournisseur.", moduleId: "m7" },
    { term: "PunchOutSetupRequest / PunchOutSetupResponse / PunchOutOrderMessage", definition: "Les trois messages cXML du PunchOut : ouverture de session par Ariba, réponse du fournisseur avec l'URL, retour du panier vers Ariba via BrowserFormPost.", moduleId: "m7" },
    { term: "Catalog subscription", definition: "Abonnement de l'acheteur à un catalogue publié par un fournisseur sur le réseau ; définit la réception des versions, leur fréquence et le mode d'approbation.", moduleId: "m7" },
    { term: "Catalog view", definition: "Règle de visibilité d'un contenu catalogue selon le groupe d'utilisateurs, l'entité, le pays, la commodity ou le fournisseur.", moduleId: "m7" },
    { term: "Guided Buying", definition: "Interface d'achat guidée d'Ariba Buying composée de tuiles, formulaires, Spot Buy et policies, destinée aux demandeurs occasionnels.", moduleId: "m7" },
    { term: "Spot Buy", definition: "Marketplace intégrée à Guided Buying proposant des articles de fournisseurs présélectionnés par SAP pour les besoins ponctuels hors catalogue.", moduleId: "m7" },
    { term: "Kit", definition: "Regroupement de plusieurs articles catalogue commandables en un clic (ex. pack d'arrivée d'un collaborateur).", moduleId: "m7" },
    { term: "Validation de prix contre contrat", definition: "Contrôle, à l'approbation d'une version de catalogue, de chaque prix unitaire par rapport aux Pricing Terms du contrat, avec tolérance et blocage ou alerte.", moduleId: "m7" },
  ],

  faq: [
    { q: "Faut-il un compte Enterprise pour publier un catalogue sur le réseau ?", a: "Oui, la publication de catalogues et le PunchOut sont réservés aux comptes Enterprise. Un fournisseur Standard peut toutefois fournir un fichier CIF ou Excel que l'acheteur charge lui-même dans Ariba (catalogue buyer-loaded), ce qui est fréquent pour les petits fournisseurs.", moduleId: "m7" },
    { q: "CIF ou cXML : lequel choisir pour un catalogue hébergé ?", a: "Le CIF est plus simple à produire (Excel, texte) et convient à la grande majorité des fournisseurs. Le cXML Index est privilégié par les fournisseurs disposant d'un PIM ou générant des catalogues pour plusieurs clients, et gère plus finement les attributs, images et tiers de prix. Les deux aboutissent au même contenu indexé dans Ariba.", moduleId: "m7" },
    { q: "Pourquoi recommander systématiquement le PunchOut Level 2 ?", a: "Parce que l'utilisateur trouve l'article depuis la recherche Ariba, sans savoir qu'il est chez le fournisseur, et que l'acheteur peut contrôler les prix des articles indexés. Le Level 1 oblige à ouvrir chaque site et à chercher dessus, ce qui pousse les utilisateurs vers les demandes libres.", moduleId: "m7" },
    { q: "Que se passe-t-il si un fournisseur publie une nouvelle version avec des prix supérieurs au contrat ?", a: "Si la validation de prix contre contrat est active, la version est rejetée ou mise en alerte au-delà de la tolérance et la version active reste en place. Sans ce contrôle, la version est approuvée selon le mode de la subscription (manuel ou automatique), d'où l'importance de ne jamais laisser une approbation automatique sans validation de prix.", moduleId: "m7" },
    { q: "Guided Buying remplace-t-il Ariba Buying & Invoicing ?", a: "Non. Guided Buying est une couche d'interface qui crée des Requisitions dans Ariba Buying & Invoicing. Les règles d'approbation, les champs comptables, le rapprochement de facture et l'intégration S/4HANA restent paramétrés dans Buying & Invoicing ; Guided Buying ajoute les tuiles, formulaires, policies et Spot Buy.", moduleId: "m7" },
    { q: "Comment traiter les articles qui ne sont jamais commandés ?", a: "Le comité contenu les identifie via les rapports d'utilisation (articles sans commande depuis 12 mois) et demande au fournisseur de les retirer lors du prochain refresh en LOADMODE incrémental. Un catalogue allégé améliore la pertinence de la recherche et réduit le travail d'approbation des versions.", moduleId: "m7" },
  ],
};
