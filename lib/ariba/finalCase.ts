export interface FinalPhase {
  id: string;
  title: string;
  duration: string;
  objective: string;
  /** markdown */
  brief: string;
  tasks: { id: string; text: string }[];
  deliverables: string[];
  /** questions de réflexion */
  questions: string[];
  /** corrigé (markdown) */
  solution: string;
}

export const FINAL_CASE = {
  title: "Cas final — Groupe NordAlu : déploiement SAP Ariba intégré S/4HANA",
  subtitle: "Intégration + configuration : de l'atelier de cadrage au cutover",
  intro: `## Le client

**NordAlu** est un groupe industriel (transformation de l'aluminium, 3 200 salariés, 1,1 Md€ de CA) présent en France, en Allemagne et au Maroc. Il vient de migrer sur **SAP S/4HANA** (un seul système, 3 sociétés : FR10, DE20, MA30, 7 divisions/plants). Les achats indirects (≈ 180 M€/an, 2 400 fournisseurs actifs) sont encore gérés par e-mails et bons de commande saisis manuellement dans S/4HANA. Les factures arrivent en PDF et sont saisies par le centre de services partagés de Casablanca.

## L'ambition

La direction achats veut déployer, en 9 mois :

- **SAP Ariba Buying & Invoicing avec Guided Buying**, intégré à S/4HANA (scénario intégré : les commandes et les factures sont comptabilisées dans S/4HANA) ;
- **SAP Business Network** pour échanger PO, confirmations, avis d'expédition et factures avec les 400 fournisseurs qui représentent 85 % des dépenses ;
- **des catalogues** (fournitures, EPI, IT, prestations récurrentes) et un **catalogue PunchOut** pour le fournisseur informatique ;
- l'intégration via **SAP Integration Suite, managed gateway (ex-CIG)** ;
- une **gouvernance des approbations** par seuil, centre de coûts et catégorie, avec délégation.

Le sourcing et les contrats seront traités en vague 2 : vous devez toutefois prévoir l'articulation (contrats de prix et conformité contractuelle).

## Votre rôle

Vous êtes **consultant technico-fonctionnel SAP Ariba**. Vous devez produire les livrables ci-dessous phase par phase, les cocher au fur et à mesure, puis comparer avec le corrigé. Rédigez vos réponses dans la zone « Mon travail » de chaque phase : elle est enregistrée dans votre navigateur et reprise dans la synthèse.

> Conseil : traitez une phase par session de 60 à 90 minutes. Le cas est conçu pour les jours 3 et 4 de la semaine 8, mais vous pouvez l'entamer dès la fin du module Intégration.`,
  phases: [
    {
      id: "p1",
      title: "Phase 1 — Cadrage et architecture cible",
      duration: "60 min",
      objective: "Choisir le scénario d'intégration et dessiner l'architecture cible (systèmes, flux, responsabilités).",
      brief: `Lors de l'atelier de cadrage, le DSI insiste : « S/4HANA reste le système de référence pour la comptabilité, les stocks et les fournisseurs ». Le directeur achats veut « une expérience type e-commerce » pour les 1 800 demandeurs occasionnels. Le centre de services de Casablanca veut supprimer la saisie manuelle des factures.

Contraintes connues :
- un seul client S/4HANA, trois sociétés, devises EUR et MAD ;
- fournisseurs créés via **MDG-S** (Business Partner) avec workflow de création ;
- SSO d'entreprise (Azure AD, SAML 2.0) obligatoire ;
- la DAF refuse toute facture comptabilisée sans bon de commande, sauf pour 3 catégories (loyers, énergie, télécoms).`,
      tasks: [
        { id: "p1-t1", text: "Choisir le scénario d'intégration Ariba Buying ↔ S/4HANA (standalone vs intégré) et justifier en 5 lignes." },
        { id: "p1-t2", text: "Lister les systèmes et composants : S/4HANA, Ariba Buying & Invoicing, Guided Buying, SAP Business Network, managed gateway (CIG), IdP SAML, MDG-S." },
        { id: "p1-t3", text: "Dessiner (ou décrire) les flux de données de base et transactionnels avec leur sens et leur fréquence." },
        { id: "p1-t4", text: "Définir où est créé chaque objet (demande, PO, réception, facture) et quel système fait foi." },
        { id: "p1-t5", text: "Identifier 5 risques majeurs et une parade pour chacun." },
      ],
      deliverables: ["Schéma d'architecture cible commenté", "Tableau des flux (objet, source, cible, canal, fréquence)", "Registre des risques (5 lignes)"],
      questions: [
        "Pourquoi le scénario intégré impose-t-il que les données de base viennent de S/4HANA et non d'imports CSV manuels ?",
        "Quel composant porte la relation commerciale avec les fournisseurs : Ariba Buying ou SAP Business Network ? Quelle conséquence sur l'enablement ?",
      ],
      solution: `## Scénario retenu : Ariba Buying & Invoicing **intégré** à S/4HANA

Le client veut que S/4HANA reste le système de référence comptable et logistique : la demande d'achat et l'approbation vivent dans Ariba (Guided Buying + Buying), le **bon de commande est répliqué dans S/4HANA** (PO MM) et c'est **S/4HANA qui comptabilise la facture** (MM-IV). Le scénario standalone (Ariba porte PO, réception et facture puis envoie des écritures) obligerait à dupliquer la logique comptable et le rapprochement, ce que la DAF refuse.

## Composants

| Composant | Rôle |
|---|---|
| S/4HANA | Données de base (sociétés, centres de coûts, comptes, fournisseurs via MDG-S), PO MM, réception, MM-IV, paiement |
| Ariba Buying & Invoicing | Demandes, approbations, catalogues, rapprochement d'exceptions côté achats |
| Guided Buying | Front demandeur, politiques, formulaires, redirection vers catalogues et PunchOut |
| SAP Business Network | Relation fournisseur : PO, confirmation, ASN, facture électronique, règles de transaction |
| Managed gateway (CIG) | Mapping et transport des messages S/4HANA ↔ Ariba ↔ Network (add-on côté S/4, projet CIG) |
| IdP Azure AD | SSO SAML 2.0 pour Ariba Buying et Guided Buying |

## Flux

- **Données de base S/4HANA → Ariba** (quotidien ou événementiel) : Company Code, Plant, Purchasing Org/Group, Cost Center, GL Account, Internal Order/WBS, Supplier + Supplier Location (ANID), Payment Terms, Units of measure, Currency, Material Group → Commodity Code mapping, Users (via SCIM/CSV depuis l'annuaire).
- **Demande → PO** : approbation dans Ariba, création du PO dans S/4HANA via CIG (le numéro S/4 est renvoyé dans Ariba), envoi du PO au fournisseur par le Network.
- **Confirmation / ASN** : fournisseur → Network → CIG → S/4HANA (confirmation de commande, avis de livraison).
- **Réception** : saisie dans S/4HANA (MIGO) ou dans Ariba selon la catégorie ; copie vers le Network pour informer le fournisseur.
- **Facture** : fournisseur → Network (PO flip ou cXML) → CIG → S/4HANA (comptabilisation ou blocage) ; statut retourné au Network.

## Risques

1. **Qualité des données fournisseurs** (doublons, absence d'ANID) → nettoyage MDG-S et campagne d'enablement avant le go-live.
2. **Mapping comptable** (centres de coûts invalides) → validation des imputations en temps réel côté Ariba grâce aux données répliquées.
3. **Adoption** → Guided Buying avec politiques simples et 3 formulaires de demande hors catalogue.
4. **Factures sans PO** → règles Network « facture sans PO interdite » sauf groupe fournisseurs loyers/énergie/télécoms.
5. **Dépendance au planning S/4** → environnement test dédié et jeux de données gelés.`,
    },
    {
      id: "p2",
      title: "Phase 2 — Organisation, données de base et sécurité",
      duration: "60 min",
      objective: "Préparer le modèle organisationnel Ariba, les données de base à répliquer et le modèle d'accès.",
      brief: `L'équipe projet vous demande la liste exacte des données de base à charger dans Ariba, leur source et leur mode de chargement, ainsi que le modèle de groupes d'utilisateurs.

Chiffres : 3 sociétés, 7 plants, 620 centres de coûts, 180 comptes de charges utilisés en achats, 2 400 fournisseurs (400 à connecter au Network), 1 800 demandeurs, 45 acheteurs, 12 comptables fournisseurs, 3 administrateurs.`,
      tasks: [
        { id: "p2-t1", text: "Établir le tableau des données de base : objet S/4HANA, objet Ariba, source, canal (CIG / ITK / manuel), fréquence." },
        { id: "p2-t2", text: "Définir le mapping Material Group → Commodity Code (UNSPSC) et la règle de dérivation du compte général." },
        { id: "p2-t3", text: "Décrire la stratégie d'alimentation des utilisateurs (SSO SAML, import User.csv ou provisioning) et des superviseurs." },
        { id: "p2-t4", text: "Proposer le modèle de groupes : demandeurs, approbateurs, acheteurs, comptables, catalog manager, administrateurs." },
        { id: "p2-t5", text: "Prévoir la gestion des sites de fournisseur (Supplier Location) et le lien avec l'ANID." },
      ],
      deliverables: ["Tableau des données de base (12 à 15 lignes)", "Matrice groupes × permissions", "Note sur l'authentification et le provisioning"],
      questions: [
        "Pourquoi ne faut-il pas laisser les utilisateurs saisir librement un compte général dans la demande d'achat ?",
        "Que se passe-t-il si un centre de coûts est fermé dans S/4HANA mais encore référencé dans une demande Ariba en cours d'approbation ?",
      ],
      solution: `## Données de base à répliquer

| S/4HANA | Ariba | Canal | Fréquence |
|---|---|---|---|
| Company Code | Company Code | CIG (master data) | Initial puis hebdo |
| Plant / Storage location | Plant, Ship-To address | CIG | Hebdo |
| Purchasing Org / Group | Purchasing Unit, Purchasing Group | CIG | Hebdo |
| Cost Center | Cost Center | CIG | Quotidien |
| GL Account | Account | CIG | Quotidien |
| Internal Order / WBS | Internal Order / WBS Element | CIG | Quotidien |
| Business Partner fournisseur | Supplier + Supplier Location | CIG | Quotidien (événementiel si MDG-S) |
| Payment Terms | Payment Terms | CIG | Initial |
| Material Group | Commodity Code (mapping) | ITK/CSV + table de correspondance | Initial, puis au besoin |
| Unit of measure, Currency, Exchange rates | UOM, Currency, Rates | CIG | Initial / quotidien pour les taux |
| Account assignment category, Tax codes | Account type, Tax codes | CSV | Initial |
| Users (annuaire) | User.csv + UserSupervisor.csv | SCIM ou CSV planifié | Quotidien |

## Dérivation comptable

Le compte général est **dérivé** de la combinaison Commodity Code × type d'imputation (CommodityCodeAccountMap). Le demandeur choisit un article ou une catégorie ; il ne voit jamais le compte. Le centre de coûts est proposé par défaut depuis le profil utilisateur (UserCostCenter) et contrôlé par la table répliquée : un centre de coûts fermé rend la demande non soumise (erreur de validation) et, s'il est fermé après soumission, l'approbation échoue à la création du PO côté S/4 : prévoir un rapport d'exception et un reroutage.

## Utilisateurs et groupes

- SSO **SAML 2.0** avec Azure AD comme IdP ; Ariba ne stocke pas de mot de passe. Les comptes sont créés par import planifié (User.csv, UserSupervisor.csv, GroupSharedUserMap.csv) depuis l'annuaire.
- Groupes : \`Requester\` (tous), \`Approver\` (via chaîne de superviseurs, pas de groupe), \`Purchasing Agent\` (45 acheteurs, par Purchasing Unit), \`Invoice Manager\` / \`Invoice Agent\` (12 comptables), \`Catalog Manager\` (3), \`Receiving Manager\` (magasiniers des 7 plants), \`Customer Administrator\` (3), \`Integration Admin\` (équipe intégration).
- **Supplier Location** = adresse de commande ; chaque location connectée porte l'**ANID** du fournisseur, clé du routage vers le Network.`,
    },
    {
      id: "p3",
      title: "Phase 3 — Configuration P2P : approbations, champs, tolérances",
      duration: "75 min",
      objective: "Traduire la politique achats de NordAlu en règles d'approbation, champs personnalisés et paramètres de rapprochement.",
      brief: `Politique achats validée en comité :

- toute demande est approuvée par le **responsable hiérarchique** ; au-delà de **10 000 €**, par le responsable de centre de coûts N+2 ; au-delà de **50 000 €**, par le directeur achats ;
- les catégories **IT** sont toujours validées par la DSI, quel que soit le montant ;
- les demandes **hors catalogue** passent par un acheteur (groupe Purchasing Agent de la société) ;
- les factures sont rapprochées en **3-way match** pour les biens, **2-way** pour les prestations ; tolérance prix **2 % ou 50 €**, tolérance quantité **0 %** ;
- la DAF veut un champ **« Projet CAPEX »** obligatoire quand le compte est un compte d'immobilisation, et un champ **« Urgence justifiée »** (liste) pour les demandes à moins de 5 jours.`,
      tasks: [
        { id: "p3-t1", text: "Modéliser le flux d'approbation des demandes d'achat (règles, ordre série/parallèle, conditions, approbateurs)." },
        { id: "p3-t2", text: "Définir les règles d'approbation du rapprochement de facture (exceptions tolérées, qui traite quoi)." },
        { id: "p3-t3", text: "Spécifier les deux champs personnalisés (type, niveau en-tête/ligne, visibilité, condition d'obligation)." },
        { id: "p3-t4", text: "Paramétrer les tolérances et les types d'exception à activer (prix, quantité, PO manquant, taxe)." },
        { id: "p3-t5", text: "Rédiger 3 cas de test d'approbation couvrant les seuils et la catégorie IT." },
      ],
      deliverables: ["Spécification du flux d'approbation (schéma + tableau de règles)", "Fiche de spécification des champs personnalisés", "Jeu de cas de test"],
      questions: [
        "Pourquoi évite-t-on d'écrire une règle d'approbation par personne nommée ?",
        "Quelle différence entre une exception d'invoice reconciliation « acceptée automatiquement » et une exception « routée » ?",
      ],
      solution: `## Flux d'approbation des demandes (Requisition)

| Ordre | Règle | Condition | Approbateur |
|---|---|---|---|
| 1 | Supervisor | toujours | Superviseur du demandeur (UserSupervisor) |
| 2 | Cost center owner | montant total ≥ 10 000 € | Responsable du centre de coûts (lookup CostCenterApprover) |
| 3 | Direction achats | montant total ≥ 50 000 € | Groupe \`Procurement Director\` |
| Parallèle à 1–3 | IT review | commodity code ∈ famille IT (UNSPSC 43*) | Groupe \`IT Approvers\` |
| 4 | Buyer review | ligne hors catalogue (non-catalog) | Groupe Purchasing Agent de la société (lookup CompanyCode → groupe) |

Règles exprimées avec des **conditions** et des **tables de correspondance**, jamais des personnes nommées : le départ d'un approbateur ne casse pas le flux et la délégation (Delegate approval authority) reste possible. Les approbations série dans l'ordre des montants évitent de solliciter le directeur pour un refus hiérarchique.

## Rapprochement de facture (IR)

- Biens : **3-way match** (PO, réception, facture) ; prestations : **2-way** (PO, facture) avec feuille de prestation si la catégorie l'exige.
- Tolérances : \`PriceVariance\` 2 % **ou** 50 € (le plus favorable) acceptée automatiquement ; \`QuantityVariance\` 0 % → exception routée au **réceptionnaire** ; \`PO Not Found\` → exception routée à l'**Invoice Manager** ; \`Tax variance\` → comptable.
- Une exception **acceptée automatiquement** n'arrête pas la facture ; une exception **routée** crée une tâche d'approbation pour le rôle désigné.

## Champs personnalisés

| Champ | Type | Niveau | Visibilité | Obligation |
|---|---|---|---|---|
| Projet CAPEX | Texte / lookup (liste des projets) | Ligne | Tous | Obligatoire si Account ∈ comptes d'immobilisation (21*) |
| Urgence justifiée | Liste (Rupture de production, Sécurité, Obligation légale, Autre) | En-tête | Tous | Obligatoire si Need-by date < aujourd'hui + 5 jours |

Les champs sont ajoutés au **Requisition** et à la **ligne**, propagés au PO (visibles côté S/4 via mapping d'extension CIG si la finance le demande).

## Cas de test

1. Demande catalogue fournitures 800 € → superviseur uniquement.
2. Demande IT 12 000 € hors catalogue → superviseur, responsable CC, IT Approvers en parallèle, puis acheteur.
3. Demande prestation 60 000 € avec date à J+2 → champ Urgence obligatoire, 3 niveaux série, acheteur.`,
    },
    {
      id: "p4",
      title: "Phase 4 — Catalogues et Guided Buying",
      duration: "60 min",
      objective: "Concevoir la stratégie catalogue (CIF, PunchOut) et les politiques Guided Buying.",
      brief: `Catégories prioritaires : fournitures de bureau (fournisseur A, 1 200 articles), EPI (fournisseur B, 300 articles, prix négociés par site), matériel informatique (fournisseur C, site e-commerce avec configurateur), prestations de nettoyage (contrat au forfait, 7 sites).

Le directeur achats veut que « 70 % des demandes passent par un catalogue dans les 6 mois ».`,
      tasks: [
        { id: "p4-t1", text: "Choisir le type de catalogue par catégorie (CIF statique, PunchOut L1/L2, formulaire Guided Buying, contrat sans release) et justifier." },
        { id: "p4-t2", text: "Spécifier le fichier CIF du fournisseur A : en-tête, champs obligatoires, codification UNSPSC, devise, prix par site si besoin." },
        { id: "p4-t3", text: "Décrire le flux PunchOut avec le fournisseur C (PunchOutSetupRequest/Response, PunchOutOrderMessage) et les contrôles à prévoir." },
        { id: "p4-t4", text: "Définir 4 tuiles Guided Buying et 3 politiques (ex. : interdiction d'acheter de l'IT hors tuile IT)." },
        { id: "p4-t5", text: "Prévoir le processus de mise à jour catalogue (validation, approbation acheteur, versioning) et les indicateurs d'adoption." },
      ],
      deliverables: ["Matrice catégorie × type de catalogue", "Spécification CIF (exemple de 3 lignes)", "Maquette textuelle de la page Guided Buying et des politiques"],
      questions: ["Pourquoi un PunchOut Level 2 améliore-t-il la recherche dans Guided Buying par rapport au Level 1 ?", "Comment garantir que le prix d'un article catalogue correspond au contrat négocié ?"],
      solution: `## Choix par catégorie

| Catégorie | Type | Justification |
|---|---|---|
| Fournitures | **CIF** chargé par le fournisseur sur le Network, approuvé par le Catalog Manager | Catalogue stable, 1 200 lignes, prix fixes |
| EPI | CIF avec **vues de catalogue** par site (ou prix par Supplier Location) | Prix négociés par site, visibilité restreinte |
| Informatique | **PunchOut Level 2** | Configurateur et stock temps réel ; Level 2 indexe les articles dans la recherche Guided Buying |
| Nettoyage | **Contrat sans release / formulaire Guided Buying** | Forfait mensuel : demande contractuelle, pas d'article |

## Spécification CIF (extrait)

\`\`\`
CIF_I_V3.0
LOADMODE: F
CODEFORMAT: UNSPSC
CURRENCY: EUR
SUPPLIERID_DOMAIN: NetworkID
ITEMCOUNT: 3
TIMESTAMP: 2026-03-02 09:00:00
FIELDNAMES: Supplier ID, Supplier Part ID, Manufacturer Part ID, Item Description, SPSC Code, Unit Price, Unit of Measure, Lead Time, Manufacturer Name, Supplier URL, Manufacturer URL, Market Price
DATA
AN01000012345,PAP-A4-80,,"Papier A4 80g ramette 500 feuilles",14111507,3.90,EA,2,"Clairefontaine",,,4.50
AN01000012345,STY-BLEU-10,,"Stylo bille bleu, boîte de 10",44121704,2.10,BX,2,"Bic",,,2.60
AN01000012345,CLS-BLC-100,,"Classeur à levier blanc dos 8 cm",44122011,1.75,EA,3,"Esselte",,,2.10
ENDOFDATA
\`\`\`

## PunchOut fournisseur C

1. L'utilisateur clique la tuile IT → Ariba envoie **PunchOutSetupRequest** (cXML, identité, SharedSecret, BrowserFormPost URL) à l'URL PunchOut du fournisseur.
2. Le fournisseur répond **PunchOutSetupResponse** avec l'URL de session.
3. L'utilisateur configure son panier ; le fournisseur renvoie **PunchOutOrderMessage** : les lignes arrivent dans la demande Ariba (prix, UNSPSC, Supplier Part ID).
4. Contrôles : UNSPSC obligatoires pour la dérivation comptable, plafond de prix, interdiction de modifier le prix côté Ariba, test en realm de test avant publication, Level 2 pour l'indexation.

## Guided Buying

Tuiles : **Fournitures & consommables**, **EPI de mon site**, **Informatique (PunchOut)**, **Prestations & services (formulaire)**.
Politiques : (1) *« L'IT s'achète via la tuile Informatique »* → blocage avec message et redirection ; (2) *« Au-dessus de 5 000 €, joindre un devis »* → pièce jointe obligatoire ; (3) *« Fournisseur préféré par catégorie »* → avertissement et justification si hors préférence.

## Mise à jour et adoption

Le fournisseur publie une nouvelle version sur le Network → validation automatique (format, UNSPSC, prix vs contrat) → **approbation Catalog Manager** → activation. Indicateurs : % de lignes catalogue, délai de traitement demande→PO, taux de rejet catalogue, nombre d'erreurs de validation.`,
    },
    {
      id: "p5",
      title: "Phase 5 — Intégration CIG et cXML",
      duration: "90 min",
      objective: "Spécifier les flux CIG (projet, mappings, cross-references) et savoir lire les messages cXML échangés.",
      brief: `L'équipe d'intégration démarre le projet dans le portail managed gateway. Vous devez fournir la spécification fonctionnelle des flux, les tables de correspondance, et préparer l'analyse d'un incident de test : une facture fournisseur rejetée côté S/4HANA avec le message « Centre de coûts 4711/FR10 non valide ».`,
      tasks: [
        { id: "p5-t1", text: "Lister les flux à activer dans le projet CIG (master data, PO, change order, confirmation, ASN, GR, invoice, invoice status, payment) avec leur direction." },
        { id: "p5-t2", text: "Définir 4 tables de correspondance (cross-reference) nécessaires : unités, taxes, conditions de paiement, codes de rejet." },
        { id: "p5-t3", text: "Rédiger le squelette d'un OrderRequest cXML envoyé au fournisseur (en-tête From/To/Sender, OrderRequestHeader, une ItemOut)." },
        { id: "p5-t4", text: "Analyser l'incident facture rejetée : où est l'erreur, dans quel outil la voir (Network, CIG, AIF), comment la corriger et retraiter." },
        { id: "p5-t5", text: "Décrire la stratégie de test : realms test, comptes test fournisseurs, scénarios bout-en-bout, critères de sortie." },
      ],
      deliverables: ["Catalogue des flux CIG", "Tables de correspondance (exemples)", "Message cXML commenté", "Fiche d'analyse d'incident"],
      questions: ["Pourquoi le payloadID est-il essentiel dans cXML ?", "Qui corrige une erreur de mapping : le client, SAP, le fournisseur ? Comment la distinguer d'une erreur métier ?"],
      solution: `## Flux CIG

| Flux | Direction | Message |
|---|---|---|
| Données de base (CC, GL, Supplier, Plant, UOM…) | S/4 → Ariba Buying | Extraction planifiée / ARBCIG |
| Purchase Order | Ariba Buying → S/4 (création PO MM) puis S/4 → Network → fournisseur | OrderRequest |
| Change Order | idem | OrderRequest (type update) |
| Order Confirmation | Fournisseur → Network → S/4 | ConfirmationRequest |
| Ship Notice | Fournisseur → Network → S/4 | ShipNoticeRequest |
| Goods Receipt | S/4 → Network (copie) | ReceiptRequest |
| Invoice | Fournisseur → Network → S/4 (MM-IV) | InvoiceDetailRequest |
| Invoice Status | S/4 → Network | StatusUpdateRequest |
| Payment / Remittance | S/4 → Network | PaymentRemittanceRequest |

## Cross-references

- **UOM** : \`ST\` ↔ \`EA\`, \`KAR\` ↔ \`BX\`, \`H\` ↔ \`HUR\` (ISO) ;
- **Codes taxe** : \`V1\` (20 %) ↔ TaxCategory \`vat\` 20.0, \`V0\` ↔ exonéré ;
- **Conditions de paiement** : \`Z030\` ↔ \`NET30\`, \`Z045\` ↔ \`NET45\` ;
- **Motifs de rejet** : \`PO_NOT_FOUND\`, \`PRICE_VARIANCE\`, \`DUPLICATE_INVOICE\` ↔ libellés Network.

## OrderRequest (squelette)

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.050/cXML.dtd">
<cXML payloadID="20260302-153000-PO4500012345@nordalu" timestamp="2026-03-02T15:30:00+01:00">
  <Header>
    <From><Credential domain="NetworkID"><Identity>AN01000098765</Identity></Credential></From>
    <To><Credential domain="NetworkID"><Identity>AN01000012345</Identity></Credential></To>
    <Sender><Credential domain="NetworkID"><Identity>AN01000098765</Identity><SharedSecret>******</SharedSecret></Credential>
      <UserAgent>SAP Integration Suite managed gateway</UserAgent></Sender>
  </Header>
  <Request deploymentMode="test">
    <OrderRequest>
      <OrderRequestHeader orderID="4500012345" orderDate="2026-03-02T15:29:00+01:00" type="new">
        <Total><Money currency="EUR">1950.00</Money></Total>
        <ShipTo><Address addressID="FR10-PL01"><Name xml:lang="fr">NordAlu Dunkerque</Name><PostalAddress>...</PostalAddress></Address></ShipTo>
        <BillTo><Address addressID="FR10">...</Address></BillTo>
        <PaymentTerm payInNumberOfDays="30"/>
      </OrderRequestHeader>
      <ItemOut quantity="500" lineNumber="1" requestedDeliveryDate="2026-03-09">
        <ItemID><SupplierPartID>PAP-A4-80</SupplierPartID></ItemID>
        <ItemDetail><UnitPrice><Money currency="EUR">3.90</Money></UnitPrice>
          <Description xml:lang="fr">Papier A4 80g ramette 500 feuilles</Description>
          <UnitOfMeasure>EA</UnitOfMeasure><Classification domain="UNSPSC">14111507</Classification></ItemDetail>
      </ItemOut>
    </OrderRequest>
  </Request>
</cXML>
\`\`\`

Le **payloadID** garantit l'unicité et l'idempotence : un renvoi du même message n'est pas traité deux fois. **deploymentMode** sépare test et production.

## Incident facture rejetée

1. **Network** : la facture est en statut *Rejected* avec le motif remonté par S/4 (StatusUpdateRequest).
2. **Managed gateway – Transaction tracker** : le message a été mappé et transmis (statut *Delivered*), donc **pas une erreur de mapping ni de connectivité**.
3. **S/4HANA – AIF / MIR4** : erreur de validation métier *centre de coûts non valide* : le CC 4711 a été fermé (validité expirée) après la création du PO.
4. Correction : prolonger la validité ou **modifier l'imputation du PO** (change order) côté Ariba/S/4, puis demander au fournisseur de **renvoyer la facture** (ou la retraiter depuis AIF si le document est parké).
5. Prévention : réplication quotidienne des CC et contrôle des imputations avant soumission ; alerte sur PO ouverts dont le CC expire.

## Tests

Realms Ariba **test**, client S/4 QA, comptes fournisseurs **test** du Network (suffixe -T), projet CIG test. Scénarios bout-en-bout : catalogue → PO → confirmation → ASN → GR → facture → paiement, hors catalogue avec change order, facture avec écart prix. Critère de sortie : 100 % des scénarios critiques passés, 0 incident bloquant ouvert, monitoring documenté.`,
    },
    {
      id: "p6",
      title: "Phase 6 — Enablement fournisseurs et règles Network",
      duration: "60 min",
      objective: "Construire le plan d'enablement par vagues et paramétrer les règles de transaction du compte acheteur.",
      brief: `400 fournisseurs à connecter : 25 représentent 60 % des dépenses (grands comptes, souvent déjà sur le Network), 120 PME locales en France et au Maroc, 255 fournisseurs occasionnels. Le trésorier veut des factures conformes dès la première soumission (TVA correcte, référence PO obligatoire).`,
      tasks: [
        { id: "p6-t1", text: "Segmenter les fournisseurs et proposer 3 vagues d'enablement avec le type de compte (Enterprise / Standard) et le canal (cXML/EDI, portail, e-mail interactif)." },
        { id: "p6-t2", text: "Définir les règles de transaction par défaut, puis les règles spécifiques du groupe « loyers/énergie/télécoms »." },
        { id: "p6-t3", text: "Préparer le contenu du Supplier Information Portal et le plan de communication." },
        { id: "p6-t4", text: "Lister les indicateurs de suivi de l'enablement (taux d'inscription, premier PO, première facture électronique)." },
      ],
      deliverables: ["Plan d'enablement par vagues", "Tableau des règles de transaction", "Trame de communication fournisseurs"],
      questions: ["Quelle différence entre une Trading Relationship Request et une invitation à un événement de sourcing ?", "Pourquoi activer la règle « exiger une référence PO » plutôt que de rejeter manuellement ?"],
      solution: `## Vagues

| Vague | Cible | Compte | Canal | Délai |
|---|---|---|---|---|
| 1 | 25 grands comptes (60 % des dépenses) | Enterprise (souvent existant) | cXML ou EDI via leur intégration existante, sinon portail | M-3 à M-1 |
| 2 | 120 PME FR/MA | Standard (gratuit) | Portail + e-mail interactif, PO flip pour la facture | M-1 à M+2 |
| 3 | 255 occasionnels | Standard | E-mail interactif ; facture PDF via portail | M+2 à M+6 |

## Règles de transaction (compte acheteur)

- Exiger une **référence PO** sur toute facture (sauf groupe *Non-PO* : loyers, énergie, télécoms) ;
- Interdire les factures dont le prix unitaire dépasse le PO de plus de 2 % ; quantité ≤ quantité commandée ;
- Exiger la **confirmation de commande** pour les vagues 1 et 2 ; ASN optionnel sauf catégorie matériel ;
- Taxe : exiger les détails de TVA au niveau ligne ; numéro de TVA intracommunautaire obligatoire ;
- Rejeter les **doublons** de numéro de facture par fournisseur ;
- Règles **par pays** : mentions légales marocaines (ICE) pour MA30.

## Communication

Supplier Information Portal : présentation du projet, calendrier, guide « créer son compte », FAQ facture, contacts. Séquence : courrier du directeur achats (M-3), webinaire par vague, relances automatiques (Supplier Enablement tasks), hotline la semaine du go-live.

## Indicateurs

Taux d'acceptation de la TRR, % fournisseurs avec compte actif, délai moyen d'inscription, % PO confirmés, % factures électroniques vs PDF, taux de rejet en première soumission.`,
    },
    {
      id: "p7",
      title: "Phase 7 — Tests, cutover et soutenance",
      duration: "60 min",
      objective: "Préparer la stratégie de tests, le plan de bascule et présenter la solution en 10 minutes.",
      brief: `Le comité de pilotage veut une présentation de 10 minutes : architecture, choix clés, risques, plan de bascule. Vous avez aussi la responsabilité du plan de tests et de la check-list de cutover.`,
      tasks: [
        { id: "p7-t1", text: "Construire le plan de tests (unitaires de paramétrage, intégration bout-en-bout, UAT, tests fournisseurs) avec les responsables." },
        { id: "p7-t2", text: "Rédiger la check-list de cutover : gel des données, charges initiales, activation des flux CIG, bascule des fournisseurs, support hypercare." },
        { id: "p7-t3", text: "Préparer 8 slides (titres + 3 messages par slide) pour la soutenance." },
        { id: "p7-t4", text: "Lister les 10 questions que le comité pourrait poser et préparer les réponses." },
      ],
      deliverables: ["Plan de tests", "Check-list de cutover", "Plan de la soutenance"],
      questions: ["Quels objets faut-il charger en premier lors du cutover et pourquoi ?", "Que surveillez-vous en priorité pendant l'hypercare ?"],
      solution: `## Plan de tests

1. **Unitaires de paramétrage** (consultant) : approbations, champs, tolérances, catalogues ; realm test.
2. **Intégration** (équipe intégration + consultant) : chaque flux CIG avec données réelles anonymisées ; messages cXML archivés.
3. **Bout-en-bout** (key users) : 12 scénarios de la demande au paiement, y compris change order, écart prix, facture rejetée.
4. **UAT** (métier) : 40 utilisateurs, 2 semaines, critères d'acceptation signés.
5. **Tests fournisseurs** (vague 1) : PO test → confirmation → facture sur comptes test.

## Cutover

- J-15 : gel des données de base ; export final MDG-S ; nettoyage fournisseurs.
- J-7 : charge initiale données de base (ordre : Company Codes → Plants → Purchasing Units → Cost Centers/GL → Suppliers/Locations → Commodity mapping → Users → Catalogues) ; validation par comptage.
- J-3 : activation des flux CIG en production ; test « smoke » PO fictif annulé.
- J-1 : envoi des TRR vague 1 ; communication aux demandeurs.
- J : ouverture Guided Buying ; cellule de support ; monitoring CIG/AIF toutes les heures.
- Hypercare 4 semaines : suivi des factures bloquées, des erreurs de mapping, des demandes rejetées, des catalogues en attente.

## Soutenance (8 slides)

1. Contexte et objectifs — 2. Architecture cible — 3. Processus P2P cible — 4. Gouvernance des approbations — 5. Catalogues et Guided Buying — 6. Intégration et monitoring — 7. Enablement fournisseurs — 8. Plan de bascule, risques et KPI.

## Questions probables

Pourquoi pas standalone ? Que se passe-t-il si CIG est indisponible ? Comment traiter une facture sans PO ? Qui administre les catalogues ? Comment gérer un fournisseur qui refuse le Network ? Quel coût pour les fournisseurs ? Comment auditer une approbation ? Quelle fréquence de réplication ? Comment déployer le sourcing en vague 2 ? Quel plan de formation ?`,
    },
  ] satisfies FinalPhase[],
};
