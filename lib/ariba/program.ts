import type { Activity, FaqItem, GlossaryTerm, ModuleContent, QuizActivity, QuizQuestion, UseCase } from "./types";
import { DAY_TITLES, MODULES, WEEK_THEMES } from "./modules";
import { m1 } from "./content/m1";
import { m2 } from "./content/m2";
import { m3 } from "./content/m3";
import { m4 } from "./content/m4";
import { m5 } from "./content/m5";
import { m6 } from "./content/m6";
import { m7 } from "./content/m7";
import { m8 } from "./content/m8";
import { m9 } from "./content/m9";
import { m10 } from "./content/m10";

export const BASE = "/academy/sap-ariba";

export const CONTENT: ModuleContent[] = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10];

const rawActivities: Activity[] = CONTENT.flatMap((c) => c.activities);

/** Activités triées par semaine, jour puis ordre d'écriture. */
export const ACTIVITIES: Activity[] = rawActivities
  .map((a, i) => ({ a, i }))
  .sort((x, y) => x.a.week - y.a.week || x.a.day - y.a.day || x.i - y.i)
  .map((x) => x.a);

export const ACTIVITY_BY_ID: Record<string, Activity> = Object.fromEntries(ACTIVITIES.map((a) => [a.id, a]));
const ACTIVITY_INDEX: Record<string, number> = Object.fromEntries(ACTIVITIES.map((a, i) => [a.id, i]));

export interface DayPlan {
  key: string;
  week: number;
  day: number;
  title: string;
  activities: Activity[];
  totalMin: number;
  moduleIds: string[];
}

export interface WeekPlan {
  week: number;
  theme: string;
  days: DayPlan[];
  totalMin: number;
  moduleIds: string[];
}

export const DAYS: DayPlan[] = (() => {
  const map = new Map<string, DayPlan>();
  for (const a of ACTIVITIES) {
    const key = `${a.week}-${a.day}`;
    if (!map.has(key)) {
      map.set(key, { key, week: a.week, day: a.day, title: DAY_TITLES[key] ?? `Semaine ${a.week} · Jour ${a.day}`, activities: [], totalMin: 0, moduleIds: [] });
    }
    const d = map.get(key)!;
    d.activities.push(a);
    d.totalMin += a.durationMin;
    if (!d.moduleIds.includes(a.moduleId)) d.moduleIds.push(a.moduleId);
  }
  return [...map.values()].sort((x, y) => x.week - y.week || x.day - y.day);
})();

export const WEEKS: WeekPlan[] = [1, 2, 3, 4, 5, 6, 7, 8].map((week) => {
  const days = DAYS.filter((d) => d.week === week);
  return {
    week,
    theme: WEEK_THEMES[week],
    days,
    totalMin: days.reduce((s, d) => s + d.totalMin, 0),
    moduleIds: [...new Set(days.flatMap((d) => d.moduleIds))],
  };
});

export function getActivity(id: string): Activity | undefined {
  return ACTIVITY_BY_ID[id];
}

export function getDay(week: number, day: number): DayPlan | undefined {
  return DAYS.find((d) => d.week === week && d.day === day);
}

export function getDayOf(activity: Activity): DayPlan | undefined {
  return getDay(activity.week, activity.day);
}

export function nextActivity(id: string): Activity | undefined {
  const i = ACTIVITY_INDEX[id];
  return i === undefined ? undefined : ACTIVITIES[i + 1];
}

export function prevActivity(id: string): Activity | undefined {
  const i = ACTIVITY_INDEX[id];
  return i === undefined || i === 0 ? undefined : ACTIVITIES[i - 1];
}

export function activitiesOfModule(moduleId: string): Activity[] {
  return ACTIVITIES.filter((a) => a.moduleId === moduleId);
}

export const USE_CASES: UseCase[] = CONTENT.flatMap((c) => c.useCases);
export const GLOSSARY: GlossaryTerm[] = CONTENT.flatMap((c) => c.glossary).sort((a, b) => a.term.localeCompare(b.term, "fr"));
export const FAQ: FaqItem[] = CONTENT.flatMap((c) => c.faq);

export const QUIZZES: QuizActivity[] = ACTIVITIES.filter((a): a is QuizActivity => a.kind === "quiz");

export interface QuestionRef {
  question: QuizQuestion;
  activity: QuizActivity;
}

export const QUESTION_BY_ID: Record<string, QuestionRef> = Object.fromEntries(
  QUIZZES.flatMap((q) => q.questions.map((question) => [question.id, { question, activity: q }]))
);

export interface ConceptInfo {
  concept: string;
  moduleIds: string[];
  questionIds: string[];
  /** leçons du même module (pour réviser) */
  lessonIds: string[];
}

export const CONCEPTS: Record<string, ConceptInfo> = (() => {
  const map: Record<string, ConceptInfo> = {};
  for (const quiz of QUIZZES) {
    for (const q of quiz.questions) {
      const c = (map[q.concept] ??= { concept: q.concept, moduleIds: [], questionIds: [], lessonIds: [] });
      c.questionIds.push(q.id);
      if (!c.moduleIds.includes(quiz.moduleId)) c.moduleIds.push(quiz.moduleId);
      const dayLessons = ACTIVITIES.filter((a) => a.kind === "lecon" && a.week === quiz.week && a.day === quiz.day).map((a) => a.id);
      for (const l of dayLessons) if (!c.lessonIds.includes(l)) c.lessonIds.push(l);
    }
  }
  return map;
})();

export const TOTALS = {
  activities: ACTIVITIES.length,
  minutes: ACTIVITIES.reduce((s, a) => s + a.durationMin, 0),
  quizzes: QUIZZES.length,
  questions: QUIZZES.reduce((s, q) => s + q.questions.length, 0),
  modules: MODULES.length,
  days: DAYS.length,
};

export function formatDuration(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${String(m).padStart(2, "0")}` : `${h} h`;
}

export function activityHref(id: string): string {
  return `${BASE}/activite/${id}`;
}
