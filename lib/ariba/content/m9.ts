import type { ModuleContent } from "../types";

export const m9: ModuleContent = {
  moduleId: "m9",
  activities: [
    // ───────────────────────── Semaine 7 – Jour 3 : utilisateurs et groupes ─────────────────────────
    {
      id: "m9-s7-j3-a1",
      moduleId: "m9",
      week: 7,
      day: 3,
      kind: "lecon",
      title: "Ariba Administrator : realm, utilisateurs et groupes",
      level: "intermediaire",
      durationMin: 25,
      objective: "Comprendre la console Ariba Administrator, le modèle utilisateurs/groupes et les modes d'authentification.",
      content: `## Le point d'entrée : Ariba Administrator

Dans toute solution SAP Ariba (Buying, Invoicing, Sourcing, Contracts, SLP), l'administration fonctionnelle se fait depuis **Manage → Core Administration** (souvent appelé *Ariba Administrator*). Cette console regroupe la gestion des utilisateurs, des groupes, des données de base, des règles d'approbation, des paramètres de site et des tâches d'import/export.

Chaque client dispose d'un **realm** : l'instance logique (tenant) dédiée, identifiée par un *realm name* (ex. \`acme-T\` pour le test, \`acme\` pour la production). Un realm correspond à un **site** configuré par SAP au déploiement ; le consultant ne crée pas de realm, il le paramètre. La règle d'or : **toute modification est d'abord faite et validée dans le realm de test, puis reproduite en production** (manuellement ou par export/import de données de configuration).

## Modèle utilisateur

- Un **utilisateur** (User) est identifié par un *UniqueName* (login), un e-mail, un nom et un **superviseur** (champ *Supervisor*) qui alimente la chaîne d'approbation hiérarchique.
- Les utilisateurs sont rarement créés à la main : on charge le fichier \`User.csv\` et le fichier \`UserSupervisor.csv\`, souvent alimentés depuis le SIRH ou S/4HANA via une tâche d'intégration planifiée.
- Un **Shared User** est partagé entre plusieurs applications du même realm (Buying et Sourcing par exemple) ; un **Enterprise User** est l'utilisateur métier standard, par opposition au **Customer Administrator**, super-utilisateur qui pilote la configuration.
- Les utilisateurs désactivés restent dans le système (historique des approbations), on ne les supprime jamais.

## Groupes : la clé des permissions

Dans Ariba, les **permissions ne s'attribuent pas directement** à une personne : elles sont portées par des **groupes**. Un utilisateur hérite des droits de tous les groupes dont il est membre. On distingue :

| Type de groupe | Exemples | Usage |
|---|---|---|
| Groupes système | Customer Administrator, Purchasing Manager, Invoice Manager, Receiving Manager, Catalog Manager, Contract Administrator, Sourcing Agent, Integration Admin, Approvable Administrator, Supplier/Customer User Admin | Livrés par SAP, droits prédéfinis, non modifiables |
| Groupes personnalisés | Acheteurs Région Sud, Approbateurs IT | Créés par le client, souvent utilisés dans les règles d'approbation |

L'appartenance se charge par le fichier \`GroupSharedUserMap.csv\` (ou *Group membership import*). Les **rôles** sont un regroupement de permissions internes au produit ; en pratique le consultant manipule des groupes, pas des rôles.

> Bonne pratique : documenter une **matrice groupes × populations** avant tout import. Le groupe *Customer Administrator* doit être limité à 2 ou 3 personnes nommées.

## Authentification

- **Mot de passe Ariba** : géré par SAP, politique de complexité configurable.
- **SSO / Remote authentication** via **SAML 2.0** : l'IdP du client (Azure AD, Okta, SAP IAS) émet une assertion ; Ariba fait correspondre le *NameID* au *UniqueName* de l'utilisateur. Le compte doit exister dans Ariba : le SSO authentifie, il ne provisionne pas.
- La **délégation d'autorité** permet à un utilisateur d'attribuer ses approbations à un délégué pour une période donnée ; l'administrateur peut la créer pour un tiers.

## Audit

Toute action d'administration est tracée dans **l'historique des modifications** (Change History / Audit log), consultable par utilisateur, objet et date : indispensable lors des revues SOX ou des incidents.`,
      keyPoints: [
        "Ariba Administrator (Manage → Core Administration) centralise utilisateurs, groupes, données de base, approbations et paramètres.",
        "Un realm = un tenant client ; on configure toujours le realm de test avant la production.",
        "Les permissions passent par les groupes (système ou personnalisés), jamais par l'utilisateur directement.",
        "Les fichiers User.csv, UserSupervisor.csv et GroupSharedUserMap.csv constituent le socle d'import.",
        "Le SSO SAML 2.0 authentifie mais ne crée pas les comptes ; les utilisateurs doivent être provisionnés.",
        "Ne jamais supprimer un utilisateur : le désactiver pour préserver l'historique d'approbation.",
      ],
    },
    {
      id: "m9-s7-j3-a2",
      moduleId: "m9",
      week: 7,
      day: 3,
      kind: "exercice",
      title: "Préparer un import d'utilisateurs et de groupes",
      level: "intermediaire",
      durationMin: 40,
      objective: "Construire les fichiers CSV d'utilisateurs, de superviseurs et d'appartenance aux groupes pour un nouveau site.",
      context: `## Situation

Vous êtes consultant Ariba chez **Meridia Cosmetics** (1 800 salariés, 3 sites en France, 1 en Espagne). Le realm de test \`meridia-T\` est livré. Le client vous transmet un extrait RH de 6 personnes à créer en priorité :

| Login | Nom | E-mail | Manager | Fonction |
|---|---|---|---|---|
| cdupont | Claire Dupont | c.dupont@meridia.example | – | Directrice Achats |
| jmartin | Julien Martin | j.martin@meridia.example | cdupont | Acheteur indirects |
| aperez | Ana Pérez | a.perez@meridia.example | cdupont | Acheteuse Espagne |
| lroux | Léa Roux | l.roux@meridia.example | cdupont | Comptable fournisseurs |
| tnguyen | Thomas Nguyen | t.nguyen@meridia.example | jmartin | Magasinier |
| sbenali | Sara Benali | s.benali@meridia.example | – | Responsable SI Achats (administratrice) |

La DSI exige une connexion **SSO SAML 2.0** via Azure AD et limite le groupe *Customer Administrator* à deux personnes.`,
      steps: [
        "Identifier, pour chaque personne, le ou les groupes système pertinents (Purchasing Manager, Invoice Manager, Receiving Manager, Customer Administrator, etc.).",
        "Rédiger le fichier User.csv avec les colonnes minimales : UniqueName, PasswordAdapter, Name, EmailAddress, DefaultCurrency, Locale.",
        "Rédiger le fichier UserSupervisor.csv (UniqueName, SupervisorUniqueName) pour matérialiser la chaîne hiérarchique.",
        "Rédiger le fichier GroupSharedUserMap.csv (GroupUniqueName, UserUniqueName).",
        "Préciser la valeur du champ PasswordAdapter compte tenu de l'exigence SSO et expliquer ce qu'il faudrait changer si un utilisateur devait se connecter sans SSO.",
        "Lister l'ordre d'exécution des tâches d'import dans Ariba Administrator et le contrôle à faire après chaque étape.",
        "Rédiger la matrice groupes × utilisateurs à faire valider par la cliente avant le chargement.",
      ],
      deliverable: "Trois fichiers CSV commentés, l'ordre d'import et une matrice de validation groupes × utilisateurs.",
      solution: `## Choix des groupes

- Claire Dupont : **Purchasing Manager** (vision complète des achats, approbation) ; pas administratrice.
- Julien Martin et Ana Pérez : **Purchasing Agent / Purchasing User** selon la configuration du site, Ana rattachée à l'unité d'achat Espagne.
- Léa Roux : **Invoice Manager** (traitement des rapprochements de facture).
- Thomas Nguyen : **Receiving Manager** (saisie des réceptions pour autrui).
- Sara Benali : **Customer Administrator** + **Integration Admin**. Second administrateur : un compte de service SAP/consultant, pour respecter la limite de deux.

## Fichiers

\`\`\`
# User.csv – PasswordAdapter = ThirdPartyUser car authentification SAML (SSO)
UniqueName,PasswordAdapter,Name,EmailAddress,DefaultCurrency,Locale
cdupont,ThirdPartyUser,Claire Dupont,c.dupont@meridia.example,EUR,fr_FR
jmartin,ThirdPartyUser,Julien Martin,j.martin@meridia.example,EUR,fr_FR
aperez,ThirdPartyUser,Ana Pérez,a.perez@meridia.example,EUR,es_ES
lroux,ThirdPartyUser,Léa Roux,l.roux@meridia.example,EUR,fr_FR
tnguyen,ThirdPartyUser,Thomas Nguyen,t.nguyen@meridia.example,EUR,fr_FR
sbenali,ThirdPartyUser,Sara Benali,s.benali@meridia.example,EUR,fr_FR

# UserSupervisor.csv – alimente la chaîne d'approbation hiérarchique
UniqueName,SupervisorUniqueName
jmartin,cdupont
aperez,cdupont
lroux,cdupont
tnguyen,jmartin

# GroupSharedUserMap.csv – appartenance aux groupes
GroupUniqueName,UserUniqueName
Purchasing Manager,cdupont
Purchasing Agent,jmartin
Purchasing Agent,aperez
Invoice Manager,lroux
Receiving Manager,tnguyen
Customer Administrator,sbenali
Integration Admin,sbenali
\`\`\`

Un utilisateur sans SSO (consultant externe, compte de secours) aurait \`PasswordAdapter = PasswordAdapter1\` : Ariba gère alors son mot de passe. Il est courant de conserver **un compte administrateur local** pour pouvoir intervenir si l'IdP tombe.

## Ordre d'import et contrôles

1. **User.csv** → contrôler le nombre de lignes chargées et l'absence de rejets d'encodage (UTF-8, accents).
2. **UserSupervisor.csv** → vérifier que chaque superviseur existe déjà, sinon rejet.
3. **GroupSharedUserMap.csv** → ouvrir un utilisateur et vérifier l'onglet *Groupes*.
4. Tester une connexion SSO avec un utilisateur pilote avant de communiquer.

La **matrice de validation** (lignes = personnes, colonnes = groupes, cellule = X) est signée par la Directrice Achats et la Responsable SI : elle devient la référence pour les audits futurs.`,
      tips: [
        "Encodez vos CSV en UTF-8 sans BOM : les accents dans les noms sont une source classique de rejets.",
        "Chargez toujours les superviseurs après les utilisateurs : l'import échoue si le superviseur n'existe pas encore.",
        "Gardez un compte administrateur avec mot de passe Ariba (hors SSO) comme accès de secours.",
      ],
    },
    {
      id: "m9-s7-j3-a3",
      moduleId: "m9",
      week: 7,
      day: 3,
      kind: "quiz",
      title: "Quiz : utilisateurs, groupes et authentification",
      level: "intermediaire",
      durationMin: 15,
      objective: "Valider la compréhension du modèle de sécurité et de provisionnement d'Ariba.",
      questions: [
        {
          id: "m9-s7-j3-q1",
          question: "Dans SAP Ariba, comment un utilisateur obtient-il le droit de traiter les rapprochements de facture ?",
          options: [
            "En cochant la permission « Invoice Reconciliation » directement sur sa fiche utilisateur",
            "En étant membre du groupe système Invoice Manager (ou d'un groupe personnalisé qui en hérite)",
            "En étant désigné comme superviseur d'un comptable",
            "En se connectant via SSO SAML avec un attribut « role=invoice »",
          ],
          answer: 1,
          explanation:
            "Dans Ariba, les permissions sont toujours portées par des groupes : le groupe système Invoice Manager donne accès au traitement des IR. Il n'existe pas de case « permission » à cocher sur une fiche utilisateur (option 1). Le lien de supervision ne confère aucun droit fonctionnel, il sert uniquement à la chaîne d'approbation (option 3). Le SSO SAML authentifie l'utilisateur mais ne pilote pas ses droits : l'assertion ne fait que l'identifier (option 4).",
          concept: "Groupes et permissions Ariba",
        },
        {
          id: "m9-s7-j3-q2",
          question: "Quel fichier d'import alimente la chaîne d'approbation hiérarchique utilisée par les règles de type « Supervisor chain » ?",
          options: ["GroupSharedUserMap.csv", "User.csv", "UserSupervisor.csv", "ApprovalRule.csv"],
          answer: 2,
          explanation:
            "Le fichier UserSupervisor.csv associe chaque UniqueName à son SupervisorUniqueName ; c'est cette relation que les règles d'approbation hiérarchiques parcourent. GroupSharedUserMap.csv gère l'appartenance aux groupes, pas la hiérarchie (option 1). User.csv crée les comptes mais le superviseur se charge dans un fichier séparé (option 2). Il n'existe pas de fichier standard ApprovalRule.csv : les règles se construisent dans l'éditeur de processus d'approbation (option 4).",
          concept: "Fichiers d'import utilisateurs et superviseurs",
        },
        {
          id: "m9-s7-j3-q3",
          question: "Un client met en place le SSO SAML 2.0 avec Azure AD. Un nouveau collaborateur créé dans Azure AD ne parvient pas à se connecter à Ariba. Quelle est la cause la plus probable ?",
          options: [
            "Le certificat SAML d'Ariba a expiré pour cet utilisateur",
            "L'utilisateur n'a pas encore été provisionné dans Ariba (User.csv) : le SSO authentifie mais ne crée pas les comptes",
            "Azure AD n'est pas compatible avec Ariba, seul SAP IAS est supporté",
            "L'utilisateur doit d'abord définir un mot de passe Ariba",
          ],
          answer: 1,
          explanation:
            "Le SSO SAML repose sur la correspondance entre le NameID de l'assertion et un UniqueName existant dans Ariba ; sans compte provisionné, l'authentification échoue. Un certificat expiré bloquerait tous les utilisateurs et non un seul (option 1). Tout IdP SAML 2.0 standard, dont Azure AD et Okta, est supporté (option 3). Avec le PasswordAdapter ThirdPartyUser, aucun mot de passe Ariba n'est utilisé (option 4).",
          concept: "SSO SAML 2.0 et provisionnement",
        },
        {
          id: "m9-s7-j3-q4",
          question: "Un acheteur quitte l'entreprise. Quelle est la bonne pratique d'administration ?",
          options: [
            "Supprimer définitivement son compte pour libérer une licence",
            "Désactiver le compte et réaffecter ses approbations en attente, en conservant l'historique",
            "Changer son e-mail vers celui de son remplaçant",
            "Le retirer uniquement du groupe Customer Administrator",
          ],
          answer: 1,
          explanation:
            "Désactiver préserve l'historique des approbations et des documents, tandis que les approbations en attente doivent être réaffectées (délégation ou modification du flux). La suppression ferait perdre la traçabilité exigée par les audits (option 1). Réutiliser un compte avec un autre e-mail falsifie l'historique et viole la séparation des identités (option 3). Retirer un seul groupe laisserait les autres accès actifs (option 4).",
          concept: "Cycle de vie des comptes utilisateurs",
        },
        {
          id: "m9-s7-j3-q5",
          question: "Qu'est-ce qu'un realm dans SAP Ariba ?",
          options: [
            "Un groupe système réservé aux administrateurs",
            "L'instance logique (tenant) dédiée à un client, déclinée en test et en production",
            "Un fichier de configuration exporté depuis S/4HANA",
            "Le nom technique de l'identifiant Ariba Network d'un fournisseur",
          ],
          answer: 1,
          explanation:
            "Le realm est le tenant du client : un realm de test (suffixe -T) et un realm de production, chacun portant sa configuration et ses données. Ce n'est pas un groupe (option 1) ni un fichier de configuration (option 3). L'identifiant d'un fournisseur sur le réseau est l'ANID (Ariba Network ID), notion distincte (option 4).",
          concept: "Realm et sites Ariba",
        },
      ],
    },

    // ───────────────────────── Semaine 7 – Jour 4 : flux d'approbation et champs personnalisés ─────────────────────────
    {
      id: "m9-s7-j4-a1",
      moduleId: "m9",
      week: 7,
      day: 4,
      kind: "lecon",
      title: "Règles d'approbation et personnalisation des champs",
      level: "avance",
      durationMin: 30,
      objective: "Maîtriser la construction des processus d'approbation et l'ajout de champs personnalisés via Customization Manager.",
      content: `## Le processus d'approbation

Chaque **approvable** (Requisition, Invoice Reconciliation, Receipt, Contract Request, Sourcing Request, User Profile Change…) possède un **Approval Process** : un ensemble ordonné de **règles d'approbation** qui, à la soumission, génèrent le **flux d'approbation** (approval flow) du document.

Une règle se compose de trois éléments :

1. **Conditions** : tests sur les champs du document (montant total, commodity code, centre de coût, groupe du demandeur, catalogue vs hors catalogue, nombre de lignes…). Les conditions se combinent en ET / OU et peuvent s'appuyer sur une **table de correspondance** (Lookup table, chargée en CSV) pour éviter de multiplier les règles.
2. **Action** : ajouter un **approbateur** de type *utilisateur*, *groupe*, *rôle fonctionnel* (ex. responsable du centre de coût) ou *chaîne de superviseurs* (Supervisor chain) jusqu'à un seuil d'**Approval Limit** porté par l'utilisateur.
3. **Position** : en **série** (l'un après l'autre) ou en **parallèle** (simultanément), avant ou après les approbateurs déjà présents.

Deux éditeurs coexistent : **Approval Rule Editor** (règles simples, par conditions) et **Approval Process Editor** (vue graphique du processus complet). Les règles peuvent ajouter des **watchers** (observateurs notifiés sans pouvoir d'approbation) et déclencher **rappels et escalades** après un délai configurable.

> Exemple classique : « Si montant > 10 000 EUR ET commodity = IT, ajouter le groupe *Approbateurs IT* en parallèle de la chaîne hiérarchique ».

## Comportement à la soumission

- Le demandeur peut **modifier le flux** (ajouter un approbateur) si le paramètre le permet ; il ne peut jamais en retirer un généré par règle.
- Un **refus** renvoie le document en *Composing* ; un **retrait** (withdraw) l'arrête.
- Les **approbations auto-générées** et les délégations sont tracées dans l'historique du document.

## Champs personnalisés : Customization Manager

Le **Customization Manager** (Manage → Customization Manager) permet d'étendre le modèle de données sans développement :

| Élément | Rôle |
|---|---|
| Field Definition | Crée un champ personnalisé : Text, Boolean, Money, Date, Integer, **Lookup list** (liste de valeurs) |
| Attachement | Rattache le champ à un objet : Requisition (en-tête), Line Item, Contract Request, Supplier… |
| Visibilité / éditabilité | Par **groupe** et par **statut** du document (ex. modifiable en Composing par les acheteurs seulement) |
| Custom form | Formulaire structuré (ex. demande de création fournisseur) |

Un champ personnalisé peut ensuite être **utilisé dans une condition d'approbation**, affiché dans les rapports et transmis vers S/4HANA via un mapping CIG. Les listes de valeurs se chargent en CSV et s'actualisent par import incrémental.

## Templates de documents

Pour Sourcing, Contracts et SLP, le comportement se pilote par des **templates** (modèles de projet) : phases, **tâches** (To-do, Review, Approval, Negotiation), documents, et **conditions** qui activent ou masquent des éléments selon les réponses du questionnaire de création. Le template est versionné : on travaille sur une *draft*, on la publie, les projets existants gardent leur version.

## Démarche du consultant

1. Recueillir la **matrice de délégation** (qui approuve quoi, à partir de quel montant).
2. Traduire en règles, en privilégiant les tables de correspondance.
3. Tester chaque scénario dans le realm de test avec des documents jetables.
4. Documenter et faire valider par la finance (contrôle interne) avant la mise en production.`,
      keyPoints: [
        "Un approval process = règles ordonnées (conditions + approbateur + position série/parallèle) générant le flux de chaque approvable.",
        "Les approbateurs peuvent être un utilisateur, un groupe, un rôle fonctionnel ou la chaîne de superviseurs jusqu'à l'Approval Limit.",
        "Les tables de correspondance (Lookup tables) évitent de multiplier les règles et se maintiennent en CSV.",
        "Customization Manager ajoute des champs (Text, Boolean, Money, Date, Lookup) sur Requisition, Line Item, Contract Request… sans code.",
        "La visibilité/éditabilité d'un champ se règle par groupe et par statut ; un champ personnalisé peut piloter une règle d'approbation.",
        "Les templates Sourcing/Contracts/SLP sont versionnés : draft → publication, les projets existants conservent leur version.",
      ],
    },
    {
      id: "m9-s7-j4-a2",
      moduleId: "m9",
      week: 7,
      day: 4,
      kind: "simulation",
      title: "Atelier de conception des flux d'approbation",
      level: "avance",
      durationMin: 45,
      objective: "Animer un atelier Achats/Finance pour arbitrer seuils et délégations, puis traduire les décisions en règles d'approbation et en champs personnalisés.",
      context: `## Mise en situation

Vous animez l'atelier **« Flux d'approbation des demandes d'achat »** chez **Nordhaven Logistics** (groupe de transport, 4 500 salariés, 12 agences). Autour de la table :

- **Directeur Achats** : veut un circuit court, « au-delà de deux approbateurs, les gens contournent l'outil ».
- **Directrice Financière** : exige qu'au-dessus de 50 000 EUR la DAF approuve, et que tout achat IT passe par la DSI quel que soit le montant.
- **Contrôle interne** : impose la séparation des tâches (le demandeur ne peut jamais approuver sa propre demande) et une traçabilité des exceptions.
- **Responsable agences** : demande que les achats « urgents » (panne de camion) soient approuvés en moins de 4 heures.

Les montants d'Approval Limit actuels : chef d'agence 5 000 EUR, directeur régional 25 000 EUR, directeur achats 100 000 EUR. Le client souhaite aussi suivre un **code projet interne** (liste de 40 projets) sur chaque ligne de demande.`,
      steps: [
        "Reformuler les exigences de chaque partie prenante et identifier les conflits (circuit court vs contrôle DAF/DSI).",
        "Proposer une matrice de délégation par tranche de montant et par catégorie (IT vs autres), en limitant le nombre moyen d'approbateurs à deux.",
        "Décider du traitement des achats urgents : règle dédiée, délai d'escalade, watcher ou approbation a posteriori ? Justifier au regard du contrôle interne.",
        "Traduire la matrice en règles d'approbation (conditions, type d'approbateur, série/parallèle) sous forme de pseudo-conditions.",
        "Concevoir le champ personnalisé « Code projet » : type, objet d'attache, visibilité, source de la liste de valeurs, usage éventuel dans une règle.",
        "Définir le plan de test : au moins 6 scénarios de demande couvrant chaque branche de règle.",
        "Rédiger le compte rendu d'arbitrage à signer par Achats, Finance et Contrôle interne.",
      ],
      deliverable: "Matrice de délégation arbitrée, jeu de règles d'approbation en pseudo-conditions, spécification du champ « Code projet », plan de test et compte rendu d'atelier.",
      solution: `## Arbitrage proposé

| Tranche | Catégorie | Approbateurs | Mode |
|---|---|---|---|
| ≤ 5 000 EUR | Toutes hors IT | Chef d'agence (chaîne de superviseurs, 1 niveau) | Série |
| 5 001 – 50 000 EUR | Toutes hors IT | Chaîne de superviseurs jusqu'à l'Approval Limit | Série |
| > 50 000 EUR | Toutes | Chaîne de superviseurs + groupe *DAF Approbateurs* | DAF en parallèle |
| Tout montant | IT (commodity 43*) | + groupe *DSI Approbateurs* | Parallèle |
| Urgent (champ Boolean) | Toutes | Chef d'agence seul si ≤ 5 000 EUR, watcher Contrôle interne, escalade 2 h | Série |

La séparation des tâches est garantie par le paramètre standard qui interdit l'auto-approbation et par la règle « si demandeur = approbateur calculé, remonter d'un niveau ». Le circuit reste à **deux approbateurs maximum** dans 90 % des cas grâce au parallèle DAF/DSI.

## Règles en pseudo-conditions

\`\`\`
Règle 1 – Hiérarchique
  SI Requisition.TotalCost > 0
  ALORS ajouter SupervisorChain(Preparer) jusqu'à ApprovalLimit >= TotalCost   [série]

Règle 2 – Seuil DAF
  SI Requisition.TotalCost > 50000 EUR
  ALORS ajouter Groupe "DAF Approbateurs"   [parallèle à la règle 1]

Règle 3 – IT
  SI LineItem.CommodityCode COMMENCE PAR "43"   (table de correspondance IT_Commodities)
  ALORS ajouter Groupe "DSI Approbateurs"   [parallèle]

Règle 4 – Urgence
  SI Requisition.cus_Urgent = true ET TotalCost <= 5000 EUR
  ALORS approbateur = Supervisor(Preparer) uniquement ; ajouter Watcher "Contrôle interne" ;
        rappel 2 h, escalade au Supervisor(Supervisor) après 4 h
\`\`\`

## Champ « Code projet »

- **Field Definition** : \`cus_ProjectCode\`, type **Lookup list**, 40 valeurs chargées par CSV (\`ProjectCodes.csv\` : Code, Libellé, Actif).
- Attaché à **Line Item** de la Requisition, obligatoire, visible par tous, éditable par le demandeur et les groupes acheteurs en statut *Composing*.
- Transmis à S/4HANA via mapping CIG vers le champ WBS/ordre interne ; disponible en reporting.
- Non utilisé dans une règle d'approbation au démarrage (évolution possible : approbation par chef de projet).

## Plan de test (extraits)

1. Demande 3 000 EUR fournitures → 1 approbateur (chef d'agence).
2. Demande 30 000 EUR fournitures → chaîne jusqu'au directeur régional.
3. Demande 60 000 EUR fournitures → chaîne + DAF en parallèle.
4. Demande 1 200 EUR licence logicielle → chef d'agence + DSI.
5. Demande urgente 4 000 EUR → superviseur seul, watcher contrôle interne, escalade vérifiée.
6. Demandeur = chef d'agence pour sa propre demande → remontée au niveau supérieur.

Le **compte rendu d'arbitrage** liste les décisions, les exigences écartées (ex. approbation a posteriori refusée par le contrôle interne) et les signatures des trois directions.`,
      tips: [
        "Faites arbitrer les conflits en atelier et consignez-les : un flux d'approbation non signé par la finance sera remis en cause au premier audit.",
        "Préférez un approbateur de type groupe à un utilisateur nommé : les départs n'obligent plus à modifier les règles.",
        "Testez chaque branche avec des demandes jetables dans le realm de test et conservez les captures d'écran comme preuve de recette.",
      ],
    },
    {
      id: "m9-s7-j4-a3",
      moduleId: "m9",
      week: 7,
      day: 4,
      kind: "quiz",
      title: "Quiz : approbations et personnalisation",
      level: "avance",
      durationMin: 15,
      objective: "Vérifier la maîtrise des règles d'approbation et de Customization Manager.",
      questions: [
        {
          id: "m9-s7-j4-q1",
          question: "Une règle d'approbation doit ajouter la DAF uniquement si le montant dépasse 50 000 EUR, sans retarder la chaîne hiérarchique. Quelle configuration retenir ?",
          options: [
            "Condition sur TotalCost > 50 000, approbateur de type groupe, positionné en parallèle",
            "Condition sur TotalCost > 50 000, approbateur de type utilisateur nommé, positionné en série après la chaîne",
            "Ajouter la DAF comme watcher du document",
            "Augmenter l'Approval Limit du directeur achats à 50 000 EUR",
          ],
          answer: 0,
          explanation:
            "Un approbateur de type groupe en parallèle ajoute la DAF sans allonger la séquence et reste robuste aux changements de personnes. Un utilisateur nommé en série allonge le délai et crée une dépendance à une personne (option 2). Un watcher est seulement notifié : il n'approuve pas, ce qui ne répond pas à l'exigence de la DAF (option 3). Modifier l'Approval Limit change la chaîne hiérarchique mais n'ajoute pas la finance au flux (option 4).",
          concept: "Règles d'approbation : conditions, approbateurs, série/parallèle",
        },
        {
          id: "m9-s7-j4-q2",
          question: "À quoi sert une table de correspondance (Lookup table) dans un processus d'approbation ?",
          options: [
            "À stocker les mots de passe des approbateurs",
            "À associer des valeurs de champ (ex. centre de coût → approbateur) pour éviter de créer une règle par valeur",
            "À remplacer le fichier UserSupervisor.csv",
            "À définir les Approval Limits des utilisateurs",
          ],
          answer: 1,
          explanation:
            "Une Lookup table, chargée en CSV, relie des valeurs (centre de coût, commodity, site) à un approbateur ou un groupe : une seule règle lit la table au lieu de dizaines de règles figées. Elle n'a aucun rapport avec l'authentification (option 1). La hiérarchie reste portée par UserSupervisor.csv (option 3). Les Approval Limits sont un attribut de l'utilisateur, pas de la table (option 4).",
          concept: "Tables de correspondance (Lookup tables)",
        },
        {
          id: "m9-s7-j4-q3",
          question: "Le client veut un champ « Code projet » choisi dans une liste de 40 valeurs sur chaque ligne de demande d'achat. Quelle est la bonne approche ?",
          options: [
            "Demander un développement personnalisé à SAP",
            "Créer dans Customization Manager un champ de type Lookup list attaché à Line Item, alimenté par import CSV",
            "Créer un champ Text libre sur l'en-tête de la Requisition",
            "Utiliser le champ commentaire de la ligne",
          ],
          answer: 1,
          explanation:
            "Customization Manager permet de créer sans code un champ Lookup list, attaché à l'objet Line Item, dont les valeurs sont maintenues par CSV et contrôlées à la saisie. Aucun développement n'est nécessaire (option 1). Un champ Text libre à l'en-tête n'offre ni contrôle des valeurs ni granularité par ligne (option 3). Le commentaire n'est ni structuré, ni exploitable en reporting ou en mapping CIG (option 4).",
          concept: "Champs personnalisés et Customization Manager",
        },
        {
          id: "m9-s7-j4-q4",
          question: "Quelle affirmation sur les templates de projet (Sourcing, Contracts, SLP) est exacte ?",
          options: [
            "Toute modification d'un template s'applique immédiatement aux projets déjà créés",
            "Un template se modifie en brouillon puis se publie ; les projets existants conservent la version avec laquelle ils ont été créés",
            "Les templates ne peuvent contenir que des documents, pas de tâches",
            "Les conditions de template dépendent uniquement du montant",
          ],
          answer: 1,
          explanation:
            "Les templates sont versionnés : on édite une draft, on la publie, et seuls les nouveaux projets utilisent la nouvelle version, ce qui protège les projets en cours. Les projets existants ne sont donc pas impactés (option 1). Un template contient phases, tâches (To-do, Review, Approval, Negotiation) et documents (option 3). Les conditions s'appuient sur les réponses du questionnaire de création : région, type de contrat, montant, etc. (option 4).",
          concept: "Templates de projet et versionnement",
        },
        {
          id: "m9-s7-j4-q5",
          question: "Un approbateur ne répond pas depuis trois jours sur une demande d'achat. Quel mécanisme standard permet d'éviter le blocage ?",
          options: [
            "La suppression automatique de la demande",
            "Les rappels et l'escalade configurés sur la règle, ou une délégation d'autorité",
            "La conversion automatique en bon de commande",
            "Le passage de l'approbateur en watcher",
          ],
          answer: 1,
          explanation:
            "Ariba propose des rappels par e-mail puis une escalade vers un autre approbateur après un délai paramétré ; la délégation d'autorité permet aussi à l'approbateur absent de transférer ses approbations. Une demande n'est jamais supprimée automatiquement (option 1) ni convertie en commande sans approbation complète (option 3). Un approbateur ne devient pas watcher automatiquement, et un watcher n'approuve pas (option 4).",
          concept: "Rappels, escalades et délégation",
        },
      ],
    },

    // ───────────────────────── Semaine 7 – Jour 5 : imports de données et support ─────────────────────────
    {
      id: "m9-s7-j5-a1",
      moduleId: "m9",
      week: 7,
      day: 5,
      kind: "lecon",
      title: "Imports de données, paramètres de site, releases et support",
      level: "avance",
      durationMin: 30,
      objective: "Savoir exploiter les tâches d'import/export, les paramètres ICM, le cycle de releases et le support SAP.",
      content: `## Tâches d'import et d'export

Dans Ariba Administrator, le menu **Site Manager → Data Import/Export** liste toutes les **tâches de données** : chaque objet de données de base a sa tâche d'import (*Import Commodity Codes*, *Import Users*, *Import Supplier Locations*…) et son export symétrique. Deux modes :

- **Full load** : remplace l'ensemble des données de l'objet ; les enregistrements absents du fichier sont désactivés.
- **Incremental load** : ajoute ou modifie uniquement les lignes présentes ; c'est le mode d'exploitation courant.

Les fichiers sont des **CSV UTF-8** dont la structure est décrite dans le **Data Dictionary** (exportable depuis la console) : la première ligne porte souvent l'encodage (\`UTF-8\`), la seconde les en-têtes de colonnes. Les données de base typiques : **Commodity Codes** (UNSPSC ou interne), **Currencies**, **Units of Measure**, **Account types** et comptes généraux, **Cost centers**, **Addresses** (adresses de livraison / facturation), **Supplier Locations**, **Payment terms**, **Purchasing units**.

Quand le site est intégré à S/4HANA, ces imports ne sont plus manuels : les **Integration events** (tâches d'intégration planifiées) reçoivent les données via CIG et les chargent automatiquement. L'administrateur surveille alors l'**historique des tâches** (statut, nombre de lignes, erreurs) plutôt que de charger lui-même.

\`\`\`
UTF-8
UniqueName,Name,Domain,ParentUniqueName
43211500,Ordinateurs,unspsc,432115
43211503,Ordinateurs portables,unspsc,43211500
\`\`\`

> Règle : on teste un import incrémental sur quelques lignes dans le realm de test, on contrôle le résultat à l'écran, puis on charge le fichier complet.

## Paramètres de site et ICM

Le comportement du site est régi par des **paramètres de configuration**. Historiquement réservés à SAP (via Service Request), beaucoup sont aujourd'hui **self-service** dans **Intelligent Configuration Manager (ICM)** : l'administrateur les active dans le realm de test, documente l'impact, puis **promeut** le paramètre vers la production. ICM conserve l'historique et le motif de chaque changement. Exemples : autoriser la modification du flux d'approbation, activer **Ariba Spot Buy** et ses limites, tolérance de rapprochement, modèles d'**e-mails de notification**.

## Reporting

Les **rapports analytiques** (Analytical reports) et **rapports préconfigurés** (Prepackaged reports) s'appuient sur les *reporting data* rafraîchies périodiquement ; l'accès dépend des groupes (ex. *Report Manager*). Un consultant livre souvent un jeu de rapports : demandes par statut, délais d'approbation, factures en exception.

## Cycle de releases

SAP Ariba livre des **releases trimestrielles** (ex. 2411, 2502). Chaque release comprend des fonctionnalités **activées automatiquement** et des fonctionnalités **optionnelles** (feature toggles) à activer par le client ou via SAP. Le processus de **release readiness** : lire les notes, évaluer l'impact, tester dans le realm de test pendant la fenêtre de pré-production, puis communiquer aux utilisateurs. L'**Early Access** permet d'anticiper certaines fonctions.

## Support SAP et gestion du changement

Les incidents se déclarent via **SAP for Me / Ariba Support Center** sous forme de **Service Request (SR)** avec une **sévérité** (Very High à Low), le realm concerné, les identifiants de documents, des captures et les étapes de reproduction. L'administrateur client ou le partenaire est le point de contact. En parallèle, toute évolution de configuration suit un **processus de change management** : demande, test en realm de test, validation métier, promotion en production, mise à jour de la documentation. La **rétention des données** et l'**audit log** complètent le dispositif de conformité.`,
      keyPoints: [
        "Site Manager → Data Import/Export : une tâche par objet de données de base, en Full load (remplace) ou Incremental load (ajoute/modifie).",
        "CSV UTF-8 décrits par le Data Dictionary ; en site intégré, les Integration events chargent automatiquement via CIG.",
        "ICM rend self-service de nombreux paramètres de site : test → documentation → promotion en production, avec historique.",
        "Releases trimestrielles avec fonctionnalités automatiques et optionnelles : lire, tester, communiquer (release readiness).",
        "Le support se fait par Service Request dans SAP for Me, avec sévérité, realm et étapes de reproduction.",
        "Chaque changement suit un circuit test → validation → production → documentation ; l'audit log trace tout.",
      ],
    },
    {
      id: "m9-s7-j5-a2",
      moduleId: "m9",
      week: 7,
      day: 5,
      kind: "exercice",
      title: "Diagnostiquer un import en échec et préparer un Service Request",
      level: "avance",
      durationMin: 40,
      objective: "Analyser un rapport d'erreur d'import, corriger les fichiers et rédiger un Service Request exploitable par le support SAP.",
      context: `## Situation

Chez **Alterra Energy** (producteur d'énergie, 2 200 salariés), le lundi matin, l'intégration nocturne des centres de coût et des utilisateurs a échoué. Le journal de la tâche *Import Cost Centers* indique :

\`\`\`
Status: Failed
Rows read: 412   Rows loaded: 0
Error line 3: Invalid character encoding near "Sige social"
Error line 118: Referenced PurchasingUnit "FR02" does not exist
\`\`\`

La tâche *Import Users* indique **Completed with warnings** : 7 lignes rejetées, « Supervisor jdoe not found ».

En parallèle, un acheteur signale que depuis la release du week-end, le bouton **« Modifier le flux d'approbation »** a disparu sur ses demandes d'achat. Le responsable achats veut une réponse avant midi.`,
      steps: [
        "Classer les trois problèmes (encodage, référence manquante, superviseur inconnu, bouton disparu) par nature : donnée, ordre de chargement, paramètre, release.",
        "Proposer la correction du fichier Cost Centers : encodage et ordre des dépendances (PurchasingUnit avant Cost Center).",
        "Expliquer pourquoi l'import Users s'est terminé avec avertissements et comment traiter les 7 lignes rejetées sans recharger les 400 autres.",
        "Pour le bouton disparu, indiquer où vérifier dans ICM et dans les notes de release, et quel paramètre est probablement concerné.",
        "Décider ce qui relève d'une correction interne et ce qui justifie un Service Request auprès de SAP.",
        "Rédiger le Service Request : titre, sévérité justifiée, realm, étapes de reproduction, impact métier, pièces jointes.",
        "Proposer une mesure préventive pour chaque incident (contrôle de fichier, séquence de tâches, checklist de release).",
      ],
      deliverable: "Note de diagnostic (causes, corrections, prévention) et brouillon de Service Request prêt à soumettre.",
      solution: `## Diagnostic

| Symptôme | Nature | Cause probable | Correction |
|---|---|---|---|
| « Invalid character encoding » | Donnée | Fichier exporté en ANSI/Windows-1252, « Siège » mal encodé | Réexporter en UTF-8, ajouter la ligne d'en-tête d'encodage |
| « PurchasingUnit FR02 does not exist » | Ordre de chargement | La nouvelle unité d'achat FR02 n'a pas été importée avant les centres de coût | Charger *Import Purchasing Units* puis relancer les centres de coût |
| « Supervisor jdoe not found » | Donnée / séquence | jdoe a quitté l'entreprise ou n'est pas encore créé | Corriger les 7 lignes dans un fichier incrémental et les recharger seules |
| Bouton « Modifier le flux » disparu | Release / paramètre | La release a introduit un paramètre ou le toggle de modification de flux a été réinitialisé | Vérifier ICM et les notes de release, réactiver puis promouvoir |

Un import **incrémental** ne touche que les lignes présentes : recharger un fichier de 7 lignes corrigées suffit, inutile de rejouer les 412 lignes. L'import Cost Centers étant *Failed*, aucune ligne n'a été chargée : la relance complète est nécessaire après correction.

\`\`\`
UTF-8
UniqueName,Name,PurchasingUnit,Active
CC-1001,Siège social,FR01,TRUE
CC-2040,Agence Lyon,FR02,TRUE
\`\`\`

## Ce qui relève du Service Request

L'encodage, l'ordre de chargement et les superviseurs sont des corrections **internes**. Le bouton disparu justifie un **SR** seulement si, après vérification dans ICM, le paramètre est bien actif en production et que le comportement persiste : il s'agirait alors d'une régression de release.

\`\`\`
Titre : Bouton « Modifier le flux d'approbation » absent sur les Requisitions depuis la release 2411
Sévérité : High (processus d'approbation dégradé pour tous les acheteurs, contournement impossible)
Realm : alterra (Production) – reproduit également sur alterra-T
Étapes : 1) Se connecter avec un membre du groupe Purchasing Agent ; 2) Créer une Requisition
hors catalogue > 1 000 EUR ; 3) Soumettre ; 4) Ouvrir l'onglet Approval Flow
Résultat observé : aucun bouton d'ajout d'approbateur. Résultat attendu : bouton présent
(paramètre Application.Approvable.AllowEditApprovalFlow vérifié actif dans ICM).
Impact : 60 acheteurs, 35 demandes bloquées en attente d'ajout d'approbateur métier
Pièces jointes : captures ICM, capture document PR12345, export du journal de release
\`\`\`

## Prévention

- Contrôle automatique d'encodage et des colonnes obligatoires avant dépôt des fichiers (script côté intégration).
- Séquence de tâches planifiées documentée : Purchasing Units → Cost Centers → Users → Supervisors → Groupes.
- **Checklist de release** : lecture des notes 3 semaines avant, tests des 10 parcours critiques dans le realm de test, communication aux utilisateurs clés.`,
      tips: [
        "Lisez toujours le journal complet de la tâche : la première erreur masque souvent les suivantes.",
        "Un Service Request sans étapes de reproduction ni identifiant de document est renvoyé par le support : perdez 10 minutes à le soigner.",
        "Après une release, comparez l'état des paramètres ICM test/production avec l'export conservé avant la release.",
      ],
    },
    {
      id: "m9-s7-j5-a3",
      moduleId: "m9",
      week: 7,
      day: 5,
      kind: "quiz",
      title: "Quiz : données, paramètres, releases et support",
      level: "avance",
      durationMin: 15,
      objective: "Valider les connaissances sur l'exploitation quotidienne d'un site Ariba.",
      questions: [
        {
          id: "m9-s7-j5-q1",
          question: "Quelle est la différence entre un import en Full load et en Incremental load ?",
          options: [
            "Le Full load est réservé au realm de test, l'Incremental à la production",
            "Le Full load remplace l'ensemble des données de l'objet (les absents sont désactivés), l'Incremental ajoute ou modifie seulement les lignes du fichier",
            "L'Incremental load ne fonctionne que pour les utilisateurs",
            "Le Full load est plus rapide car il ignore les contrôles de format",
          ],
          answer: 1,
          explanation:
            "Le Full load considère le fichier comme l'image complète : tout enregistrement absent est désactivé, ce qui est risqué en exploitation ; l'Incremental n'affecte que les lignes fournies et constitue le mode courant. Les deux modes existent dans les deux realms (option 1) et pour tous les objets de données de base (option 3). Les contrôles de format s'appliquent dans les deux cas (option 4).",
          concept: "Imports de données : Full load vs Incremental load",
        },
        {
          id: "m9-s7-j5-q2",
          question: "Un import de centres de coût échoue avec « Referenced PurchasingUnit does not exist ». Que faire en premier ?",
          options: [
            "Ouvrir un Service Request de sévérité Very High",
            "Supprimer la colonne PurchasingUnit du fichier",
            "Importer d'abord les unités d'achat manquantes puis relancer l'import des centres de coût",
            "Passer la tâche en Full load",
          ],
          answer: 2,
          explanation:
            "Les données de base ont des dépendances : un centre de coût référence une unité d'achat qui doit exister au préalable, d'où l'importance de la séquence de chargement. Ce n'est pas un défaut produit, un SR serait rejeté (option 1). Supprimer la colonne produirait des centres de coût incomplets et casserait les règles qui s'y appuient (option 2). Le mode Full load ne résout pas une référence manquante et désactiverait les données absentes (option 4).",
          concept: "Dépendances et séquence des imports de données de base",
        },
        {
          id: "m9-s7-j5-q3",
          question: "Qu'apporte Intelligent Configuration Manager (ICM) à l'administrateur ?",
          options: [
            "La possibilité d'activer des paramètres de site en self-service dans le realm de test, puis de les promouvoir en production avec historique",
            "La création de realms supplémentaires",
            "La génération automatique des règles d'approbation",
            "Le remplacement du support SAP pour tous les incidents",
          ],
          answer: 0,
          explanation:
            "ICM expose des paramètres autrefois réservés à SAP : l'administrateur les modifie dans le realm de test, documente le motif et promeut le changement vers la production, avec traçabilité. ICM ne crée pas de realm, qui reste provisionné par SAP (option 2). Les règles d'approbation se construisent dans l'éditeur dédié (option 3). Les incidents produit passent toujours par un Service Request (option 4).",
          concept: "Paramètres de site et ICM",
        },
        {
          id: "m9-s7-j5-q4",
          question: "Comment se préparer à une release trimestrielle SAP Ariba ?",
          options: [
            "Aucune préparation : toutes les fonctionnalités sont obligatoires et sans impact",
            "Lire les notes de release, identifier les fonctionnalités automatiques et optionnelles, tester les parcours critiques dans le realm de test, puis communiquer aux utilisateurs",
            "Désactiver le realm de production pendant la release",
            "Demander à SAP de reporter la release d'un trimestre",
          ],
          answer: 1,
          explanation:
            "La release readiness consiste à analyser les notes, distinguer fonctionnalités activées automatiquement et toggles optionnels, tester pendant la fenêtre de pré-production dans le realm de test et informer les utilisateurs clés. Les releases ont bien un impact potentiel, notamment sur les paramètres (option 1). La production n'est jamais désactivée par le client (option 3) et le calendrier des releases ne se négocie pas (option 4).",
          concept: "Cycle de releases et release readiness",
        },
        {
          id: "m9-s7-j5-q5",
          question: "Quels éléments rendent un Service Request efficace auprès du support SAP Ariba ?",
          options: [
            "Uniquement une capture d'écran du message d'erreur",
            "Le realm, la sévérité justifiée par l'impact métier, les étapes de reproduction, les identifiants de documents et les pièces jointes",
            "Le nom de tous les utilisateurs du site",
            "Une demande de rappel téléphonique sans description",
          ],
          answer: 1,
          explanation:
            "Un SR complet (realm, sévérité motivée, étapes de reproduction, identifiants de documents, captures, paramètres vérifiés) permet au support de reproduire et de qualifier rapidement l'incident. Une capture seule ne suffit pas à reproduire le cas (option 1). La liste des utilisateurs n'apporte rien et pose un problème de confidentialité (option 3). Sans description écrite, le ticket est renvoyé pour complément (option 4).",
          concept: "Service Request et support SAP",
        },
      ],
    },
  ],

  useCases: [
    {
      id: "m9-uc1",
      moduleId: "m9",
      title: "Reprise d'un site Ariba aux droits incontrôlés",
      client: "Groupe agroalimentaire, 6 000 salariés, 5 pays",
      situation: "Après trois ans d'exploitation sans administrateur dédié, 48 personnes sont membres du groupe Customer Administrator et personne ne sait qui approuve quoi. Un audit interne exige une remise en conformité en huit semaines.",
      challenge: "Réduire les droits sans bloquer l'activité quotidienne de 900 utilisateurs, et prouver la conformité aux auditeurs.",
      approach: [
        "Exporter les utilisateurs, groupes et appartenances, puis croiser avec l'organigramme RH pour détecter les comptes orphelins et les cumuls de droits.",
        "Construire une matrice cible groupes × populations validée par Achats, Finance et DSI.",
        "Réduire Customer Administrator à trois comptes nommés, créer des groupes personnalisés par région pour les règles d'approbation.",
        "Charger les corrections par imports incrémentaux dans le realm de test, faire valider par des utilisateurs clés, puis promouvoir en production un vendredi soir.",
        "Mettre en place une revue trimestrielle des accès avec export automatisé et rapport analytique dédié.",
      ],
      outcome: "Passage de 48 à 3 administrateurs, 112 comptes désactivés, aucun incident bloquant le lundi suivant, audit clos sans réserve.",
      lesson: "La gouvernance des groupes se construit avec une matrice signée par le métier ; la technique (CSV, imports) n'est que l'exécution.",
    },
    {
      id: "m9-uc2",
      moduleId: "m9",
      title: "Flux d'approbation à 7 niveaux : simplifier sans perdre le contrôle",
      client: "Collectivité territoriale, 3 200 agents",
      situation: "Les demandes d'achat passent en moyenne par 7 approbateurs en série et mettent 11 jours à être validées ; les services contournent l'outil par des commandes orales.",
      challenge: "Ramener le délai sous 3 jours tout en respectant les seuils réglementaires de la commande publique et la séparation des tâches.",
      approach: [
        "Mesurer les délais par étape grâce aux rapports analytiques sur les approvables.",
        "Animer un atelier de délégation avec la direction des finances et les directions opérationnelles.",
        "Remplacer les approbateurs nommés par des groupes, passer les contrôles budgétaires et juridiques en parallèle, utiliser une table de correspondance service → approbateur.",
        "Ajouter rappels à 24 h et escalade à 72 h, activer la délégation d'autorité pour les absences.",
        "Tester 15 scénarios dans le realm de test avec le contrôle interne avant la bascule.",
      ],
      outcome: "Délai moyen ramené à 2,4 jours, 2,1 approbateurs en moyenne, commandes hors outil divisées par quatre en six mois.",
      lesson: "Le parallélisme et les tables de correspondance réduisent les délais plus sûrement que la suppression de contrôles.",
    },
    {
      id: "m9-uc3",
      moduleId: "m9",
      title: "Industrialiser la gestion des releases trimestrielles",
      client: "Laboratoire pharmaceutique, 4 500 salariés, environnement validé GxP",
      situation: "Chaque release Ariba déclenche des incidents en production (paramètres modifiés, écrans changés) et des demandes de re-validation coûteuses auprès de l'assurance qualité.",
      challenge: "Rendre les releases prévisibles et documentées pour satisfaire les exigences de validation sans mobiliser l'équipe deux semaines par trimestre.",
      approach: [
        "Mettre en place une checklist de release readiness : lecture des notes à J-21, inventaire des fonctionnalités automatiques et optionnelles, analyse d'impact.",
        "Exporter l'état des paramètres ICM avant chaque release et comparer après activation dans le realm de test.",
        "Définir 12 parcours critiques testés systématiquement dans le realm de test, avec captures archivées comme preuves de validation.",
        "Communiquer une note de changement aux utilisateurs clés et planifier la promotion des toggles optionnels.",
        "Ouvrir des Service Requests préventifs pour toute régression détectée en test, avant la bascule en production.",
      ],
      outcome: "Zéro incident majeur sur les quatre releases suivantes, effort de validation réduit de 60 %, dossier qualité accepté par l'audit GxP.",
      lesson: "Une release se gère comme un projet miniature : inventaire, test, preuve, communication.",
    },
  ],

  glossary: [
    { term: "Ariba Administrator", definition: "Console d'administration fonctionnelle (Manage → Core Administration) regroupant utilisateurs, groupes, données de base, approbations et paramètres de site.", moduleId: "m9" },
    { term: "Realm", definition: "Instance logique (tenant) dédiée à un client ; déclinée en realm de test (suffixe -T) et realm de production.", moduleId: "m9" },
    { term: "Customer Administrator", definition: "Groupe système conférant les droits d'administration complets du site ; à limiter à quelques personnes nommées.", moduleId: "m9" },
    { term: "Group (groupe)", definition: "Entité porteuse de permissions ; un utilisateur hérite des droits de tous ses groupes. Groupes système livrés par SAP ou groupes personnalisés.", moduleId: "m9" },
    { term: "UserSupervisor.csv", definition: "Fichier d'import associant chaque utilisateur à son superviseur ; alimente la chaîne d'approbation hiérarchique.", moduleId: "m9" },
    { term: "GroupSharedUserMap.csv", definition: "Fichier d'import définissant l'appartenance des utilisateurs aux groupes.", moduleId: "m9" },
    { term: "PasswordAdapter", definition: "Attribut utilisateur indiquant le mode d'authentification : PasswordAdapter1 (mot de passe Ariba) ou ThirdPartyUser (SSO/remote authentication).", moduleId: "m9" },
    { term: "Approval Process / Approval Rule", definition: "Ensemble ordonné de règles (conditions, approbateur, position série ou parallèle) générant le flux d'approbation d'un approvable.", moduleId: "m9" },
    { term: "Approval Limit", definition: "Montant maximal qu'un utilisateur peut approuver ; borne la remontée de la chaîne de superviseurs.", moduleId: "m9" },
    { term: "Lookup table", definition: "Table de correspondance chargée en CSV, utilisée dans les conditions d'approbation pour associer des valeurs de champ à des approbateurs.", moduleId: "m9" },
    { term: "Watcher", definition: "Observateur ajouté au flux d'approbation, notifié de l'avancement sans pouvoir d'approbation.", moduleId: "m9" },
    { term: "Customization Manager", definition: "Outil de création de champs personnalisés (Text, Boolean, Money, Date, Lookup list) et de formulaires, avec visibilité par groupe et statut.", moduleId: "m9" },
    { term: "Data Import/Export", definition: "Tâches de Site Manager permettant de charger ou d'exporter les données de base en CSV, en mode Full load ou Incremental load.", moduleId: "m9" },
    { term: "Intelligent Configuration Manager (ICM)", definition: "Outil self-service d'activation des paramètres de site, avec test, documentation et promotion vers la production.", moduleId: "m9" },
    { term: "Service Request (SR)", definition: "Ticket d'incident ou de demande ouvert auprès du support SAP Ariba via SAP for Me, qualifié par une sévérité.", moduleId: "m9" },
  ],

  faq: [
    {
      q: "Peut-on attribuer une permission à un utilisateur sans passer par un groupe ?",
      a: "Non. Le modèle de sécurité d'Ariba repose exclusivement sur les groupes : si un droit spécifique est nécessaire pour une personne, on crée un groupe personnalisé dédié et on y ajoute l'utilisateur. Cela garantit la lisibilité des accès lors des audits.",
      moduleId: "m9",
    },
    {
      q: "Le SSO SAML suffit-il à créer les utilisateurs automatiquement ?",
      a: "Non. Le SSO authentifie un utilisateur déjà présent dans Ariba ; le provisionnement se fait par import User.csv, idéalement automatisé depuis le SIRH ou S/4HANA via une tâche d'intégration. Conservez un compte administrateur avec mot de passe Ariba comme accès de secours.",
      moduleId: "m9",
    },
    {
      q: "Comment tester une règle d'approbation sans polluer la production ?",
      a: "Toujours dans le realm de test, avec des demandes jetables couvrant chaque branche de condition. Conservez des captures d'écran du flux généré comme preuve de recette, puis reproduisez la règle à l'identique en production après validation du métier.",
      moduleId: "m9",
    },
    {
      q: "Quand utiliser un Full load plutôt qu'un Incremental load ?",
      a: "Le Full load sert aux chargements initiaux ou aux remises à niveau complètes d'un objet, car il désactive tout enregistrement absent du fichier. En exploitation courante, privilégiez l'Incremental load, qui ne modifie que les lignes fournies et limite le risque.",
      moduleId: "m9",
    },
    {
      q: "Un paramètre de site ne figure pas dans ICM : comment le modifier ?",
      a: "Certains paramètres restent gérés par SAP. Il faut ouvrir un Service Request en précisant le realm, le paramètre souhaité et la justification métier ; SAP l'applique d'abord dans le realm de test si vous le demandez, puis en production.",
      moduleId: "m9",
    },
    {
      q: "Quelle sévérité choisir pour un Service Request ?",
      a: "Very High est réservé à un arrêt total de production sans contournement ; High à un processus critique fortement dégradé ; Medium à une fonction perturbée avec contournement ; Low aux questions et demandes d'évolution. Une sévérité surévaluée ralentit la prise en charge, car le support la requalifie.",
      moduleId: "m9",
    },
  ],
};
