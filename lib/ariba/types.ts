/**
 * Modèle de données du parcours de formation SAP Ariba (8 semaines).
 * Tout le contenu est en français. Les champs `content`, `solution`, `context`
 * acceptent un markdown simplifié (voir components/ariba/Markdown.tsx) :
 *   - "## Titre" pour un sous-titre
 *   - "- item" / "1. item" pour les listes
 *   - "**gras**", "`code`"
 *   - "> texte" pour un encadré (callout)
 *   - blocs ``` ``` pour du code (cXML, CSV, etc.)
 *   - tableaux "| a | b |" avec ligne de séparation "|---|---|"
 */

export type Level = "debutant" | "intermediaire" | "avance";

export type ActivityKind = "lecon" | "exercice" | "simulation" | "quiz" | "cas";

export interface QuizQuestion {
  /** identifiant unique, ex. "m2-q03-2" */
  id: string;
  question: string;
  /** 4 options en général */
  options: string[];
  /** index (0-based) de la bonne réponse */
  answer: number;
  /** correction détaillée : pourquoi la bonne réponse est juste ET pourquoi les autres sont fausses */
  explanation: string;
  /** notion à revoir si la réponse est fausse (libellé court, réutilisable d'une question à l'autre) */
  concept: string;
}

interface BaseActivity {
  /** identifiant unique et stable, ex. "m2-s01-j3-a1" (module, semaine, jour, n° activité) */
  id: string;
  moduleId: string;
  /** semaine 1..8 */
  week: number;
  /** jour 1..5 */
  day: number;
  title: string;
  level: Level;
  durationMin: number;
  /** objectif pédagogique en une phrase */
  objective: string;
}

export interface LessonActivity extends BaseActivity {
  kind: "lecon";
  /** leçon courte en markdown simplifié (300 à 600 mots) */
  content: string;
  /** 3 à 6 points clés à retenir */
  keyPoints: string[];
}

export interface ExerciseActivity extends BaseActivity {
  /** "exercice" = manipulation guidée / analyse ; "simulation" = mise en situation métier avec jeu de rôle consultant */
  kind: "exercice" | "simulation";
  /** contexte métier (markdown) */
  context: string;
  /** étapes à réaliser */
  steps: string[];
  /** livrable attendu */
  deliverable: string;
  /** corrigé / solution type (markdown) */
  solution: string;
  /** conseils facultatifs */
  tips?: string[];
}

export interface QuizActivity extends BaseActivity {
  kind: "quiz";
  questions: QuizQuestion[];
}

export interface CaseActivity extends BaseActivity {
  kind: "cas";
  /** présentation du cas (markdown) */
  content: string;
  /** tâches à cocher */
  tasks: string[];
  /** lien interne facultatif (ex. "/academy/sap-ariba/cas-final") */
  href?: string;
}

export type Activity = LessonActivity | ExerciseActivity | QuizActivity | CaseActivity;

export interface UseCase {
  id: string;
  moduleId: string;
  title: string;
  /** secteur / type de client, ex. "Industrie pharmaceutique, 4 000 salariés" */
  client: string;
  situation: string;
  challenge: string;
  /** démarche du consultant, 3 à 6 étapes */
  approach: string[];
  outcome: string;
  /** leçon à retenir pour le consultant */
  lesson: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  moduleId: string;
}

export interface FaqItem {
  q: string;
  a: string;
  moduleId: string;
}

export interface ModuleMeta {
  id: string;
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  /** semaines couvertes */
  weeks: number[];
  /** classe Tailwind de couleur d'accent (bg) */
  color: string;
}

export interface ModuleContent {
  moduleId: string;
  activities: Activity[];
  useCases: UseCase[];
  glossary: GlossaryTerm[];
  faq: FaqItem[];
}
