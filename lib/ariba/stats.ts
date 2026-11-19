import type { Activity } from "./types";
import { MODULES } from "./modules";
import { ACTIVITIES, CONCEPTS, DAYS, QUIZZES, WEEKS, type DayPlan } from "./program";
import type { ProgressState, QuizAttempt } from "./progress";

export interface ModuleStat {
  moduleId: string;
  total: number;
  done: number;
  pct: number;
  minutesDone: number;
  minutesTotal: number;
  quizCount: number;
  quizTaken: number;
  /** moyenne des meilleurs scores en % (quiz passés uniquement) */
  quizAvg: number | null;
  weakConcepts: string[];
}

export interface Stats {
  totalActivities: number;
  doneActivities: number;
  pct: number;
  minutesDone: number;
  minutesTotal: number;
  quizTaken: number;
  quizCount: number;
  quizAvg: number | null;
  questionsAnswered: number;
  questionsCorrect: number;
  modules: ModuleStat[];
  weeks: { week: number; total: number; done: number; pct: number }[];
  /** notions ratées non maîtrisées */
  weakConcepts: { concept: string; fails: number; moduleIds: string[]; manual?: boolean }[];
  /** activité à reprendre */
  resume: Activity | undefined;
  /** journée courante (première journée incomplète) */
  currentDay: DayPlan | undefined;
  /** score de préparation à la certification 0..100 */
  readiness: number;
  readinessLabel: string;
  streakDays: number;
  activeDays: number;
}

function best(list: QuizAttempt[] | undefined): QuizAttempt | undefined {
  if (!list?.length) return undefined;
  return list.reduce((b, a) => (a.score / a.total > b.score / b.total ? a : b), list[0]);
}

export function computeStats(state: ProgressState): Stats {
  const doneIds = new Set(Object.keys(state.done));
  const doneActivities = ACTIVITIES.filter((a) => doneIds.has(a.id));
  const minutesTotal = ACTIVITIES.reduce((s, a) => s + a.durationMin, 0);
  const minutesDone = doneActivities.reduce((s, a) => s + a.durationMin, 0);

  let questionsAnswered = 0;
  let questionsCorrect = 0;
  for (const attempts of Object.values(state.quiz)) {
    for (const a of attempts) { questionsAnswered += a.total; questionsCorrect += a.score; }
  }

  const quizBest = QUIZZES.map((q) => best(state.quiz[q.id])).filter((x): x is QuizAttempt => Boolean(x));
  const quizAvg = quizBest.length ? Math.round((quizBest.reduce((s, a) => s + a.score / a.total, 0) / quizBest.length) * 100) : null;

  const weakConcepts = Object.entries(state.concepts)
    .filter(([, v]) => !v.mastered)
    .map(([concept, v]) => ({ concept, fails: v.fails, moduleIds: CONCEPTS[concept]?.moduleIds ?? [], manual: v.manual }))
    .sort((a, b) => b.fails - a.fails || a.concept.localeCompare(b.concept, "fr"));

  const modules: ModuleStat[] = MODULES.map((m) => {
    const acts = ACTIVITIES.filter((a) => a.moduleId === m.id);
    const done = acts.filter((a) => doneIds.has(a.id));
    const quizzes = acts.filter((a) => a.kind === "quiz");
    const bests = quizzes.map((q) => best(state.quiz[q.id])).filter((x): x is QuizAttempt => Boolean(x));
    return {
      moduleId: m.id,
      total: acts.length,
      done: done.length,
      pct: acts.length ? Math.round((done.length / acts.length) * 100) : 0,
      minutesDone: done.reduce((s, a) => s + a.durationMin, 0),
      minutesTotal: acts.reduce((s, a) => s + a.durationMin, 0),
      quizCount: quizzes.length,
      quizTaken: bests.length,
      quizAvg: bests.length ? Math.round((bests.reduce((s, a) => s + a.score / a.total, 0) / bests.length) * 100) : null,
      weakConcepts: weakConcepts.filter((w) => w.moduleIds.includes(m.id)).map((w) => w.concept),
    };
  });

  const weeks = WEEKS.map((w) => {
    const acts = w.days.flatMap((d) => d.activities);
    const done = acts.filter((a) => doneIds.has(a.id)).length;
    return { week: w.week, total: acts.length, done, pct: acts.length ? Math.round((done / acts.length) * 100) : 0 };
  });

  const firstUndone = ACTIVITIES.find((a) => !doneIds.has(a.id));
  const last = state.lastActivityId ? ACTIVITIES.find((a) => a.id === state.lastActivityId) : undefined;
  const resume = last && !doneIds.has(last.id) ? last : firstUndone;
  const currentDay = DAYS.find((d) => d.activities.some((a) => !doneIds.has(a.id)));

  const pct = ACTIVITIES.length ? Math.round((doneActivities.length / ACTIVITIES.length) * 100) : 0;
  const coverage = QUIZZES.length ? quizBest.length / QUIZZES.length : 0;
  const quizPart = quizAvg === null ? 0 : (quizAvg / 100) * (0.5 + 0.5 * coverage);
  const weakPenalty = Math.min(15, weakConcepts.length * 1.5);
  const readiness = Math.max(0, Math.min(100, Math.round(pct * 0.45 + quizPart * 100 * 0.55 - weakPenalty)));
  const readinessLabel = readiness >= 80 ? "Prêt pour la certification" : readiness >= 60 ? "Presque prêt : consolider les points faibles" : readiness >= 35 ? "En progression : poursuivre le programme" : "Début de parcours";

  // jours actifs et série
  const dates = new Set<string>();
  for (const d of Object.values(state.done)) dates.add(d.slice(0, 10));
  for (const attempts of Object.values(state.quiz)) for (const a of attempts) dates.add(a.date.slice(0, 10));
  const activeDays = dates.size;
  let streakDays = 0;
  const today = new Date();
  for (let i = 0; i < 400; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (dates.has(key)) streakDays++;
    else if (i > 0) break;
  }

  return {
    totalActivities: ACTIVITIES.length,
    doneActivities: doneActivities.length,
    pct,
    minutesDone,
    minutesTotal,
    quizTaken: quizBest.length,
    quizCount: QUIZZES.length,
    quizAvg,
    questionsAnswered,
    questionsCorrect,
    modules,
    weeks,
    weakConcepts,
    resume,
    currentDay,
    readiness,
    readinessLabel,
    streakDays,
    activeDays,
  };
}
