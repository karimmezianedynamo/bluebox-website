"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";

export interface QuizAttempt {
  date: string;
  score: number;
  total: number;
  /** ids des questions ratées */
  wrong: string[];
  /** notions associées aux erreurs */
  concepts: string[];
}

export interface UserQuestion {
  id: string;
  text: string;
  moduleId?: string;
  activityId?: string;
  createdAt: string;
  answer?: string;
  resolved: boolean;
}

export interface ProgressState {
  version: 1;
  startedAt?: string;
  updatedAt?: string;
  /** activityId -> date ISO de validation */
  done: Record<string, string>;
  /** activityId -> tentatives */
  quiz: Record<string, QuizAttempt[]>;
  /** dernière activité ouverte */
  lastActivityId?: string;
  /** notion -> état de révision */
  concepts: Record<string, { fails: number; lastFail?: string; mastered: boolean; manual?: boolean; note?: string }>;
  /** notes personnelles par activité */
  notes: Record<string, string>;
  questions: UserQuestion[];
  /** cas final : taskId -> fait */
  finalCase: Record<string, boolean>;
  /** cas final : réponses libres par phase */
  finalCaseNotes: Record<string, string>;
}

const STORAGE_KEY = "bluebox-ariba-progress-v1";

export const EMPTY_STATE: ProgressState = {
  version: 1,
  done: {},
  quiz: {},
  concepts: {},
  notes: {},
  questions: [],
  finalCase: {},
  finalCaseNotes: {},
};

/* ───────── Store externe (localStorage) ───────── */

let current: ProgressState = EMPTY_STATE;
let hydratedFlag = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => { listeners.delete(l); };
}

function load(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...EMPTY_STATE, ...parsed, version: 1 };
  } catch {
    return EMPTY_STATE;
  }
}

function persist(s: ProgressState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* stockage indisponible : on continue en mémoire */
  }
}

function hydrate() {
  if (hydratedFlag) return;
  hydratedFlag = true;
  current = load();
  emit();
}

function commit(next: ProgressState) {
  current = next;
  persist(next);
  emit();
}

/* ───────── API React ───────── */

interface ProgressApi {
  state: ProgressState;
  hydrated: boolean;
  isDone: (id: string) => boolean;
  setDone: (id: string, done: boolean) => void;
  recordQuiz: (id: string, attempt: QuizAttempt) => void;
  bestScore: (id: string) => QuizAttempt | undefined;
  lastAttempt: (id: string) => QuizAttempt | undefined;
  touch: (id: string) => void;
  setConceptMastered: (concept: string, mastered: boolean) => void;
  addManualConcept: (concept: string, note?: string) => void;
  removeConcept: (concept: string) => void;
  setNote: (id: string, note: string) => void;
  addQuestion: (q: Omit<UserQuestion, "id" | "createdAt" | "resolved">) => void;
  updateQuestion: (id: string, patch: Partial<UserQuestion>) => void;
  deleteQuestion: (id: string) => void;
  toggleFinalTask: (taskId: string) => void;
  setFinalNote: (phaseId: string, note: string) => void;
  reset: () => void;
  exportJson: () => string;
  importJson: (json: string) => boolean;
}

const Ctx = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, () => current, () => EMPTY_STATE);
  const hydrated = useSyncExternalStore(subscribe, () => hydratedFlag, () => false);

  useEffect(() => { hydrate(); }, []);

  const update = useCallback((fn: (s: ProgressState) => ProgressState) => {
    const s = current;
    const now = new Date().toISOString();
    commit({ ...fn(s), updatedAt: now, startedAt: s.startedAt ?? now });
  }, []);

  const api = useMemo<ProgressApi>(() => ({
    state,
    hydrated,
    isDone: (id) => Boolean(state.done[id]),
    setDone: (id, done) =>
      update((s) => {
        const next = { ...s.done };
        if (done) next[id] = new Date().toISOString();
        else delete next[id];
        return { ...s, done: next };
      }),
    recordQuiz: (id, attempt) =>
      update((s) => {
        const concepts = { ...s.concepts };
        for (const c of attempt.concepts) {
          const prev = concepts[c] ?? { fails: 0, mastered: false };
          concepts[c] = { ...prev, fails: prev.fails + 1, lastFail: attempt.date, mastered: false };
        }
        return { ...s, quiz: { ...s.quiz, [id]: [...(s.quiz[id] ?? []), attempt] }, concepts };
      }),
    bestScore: (id) => {
      const list = state.quiz[id];
      if (!list?.length) return undefined;
      return list.reduce((b, a) => (a.score / a.total > b.score / b.total ? a : b), list[0]);
    },
    lastAttempt: (id) => {
      const list = state.quiz[id];
      return list?.length ? list[list.length - 1] : undefined;
    },
    touch: (id) => { if (current.lastActivityId !== id) update((s) => ({ ...s, lastActivityId: id })); },
    setConceptMastered: (concept, mastered) =>
      update((s) => ({ ...s, concepts: { ...s.concepts, [concept]: { ...(s.concepts[concept] ?? { fails: 0 }), mastered } } })),
    addManualConcept: (concept, note) =>
      update((s) => ({ ...s, concepts: { ...s.concepts, [concept]: { ...(s.concepts[concept] ?? { fails: 0 }), mastered: false, manual: true, note } } })),
    removeConcept: (concept) =>
      update((s) => {
        const concepts = { ...s.concepts };
        delete concepts[concept];
        return { ...s, concepts };
      }),
    setNote: (id, note) =>
      update((s) => {
        const notes = { ...s.notes };
        if (note.trim()) notes[id] = note;
        else delete notes[id];
        return { ...s, notes };
      }),
    addQuestion: (q) =>
      update((s) => ({
        ...s,
        questions: [{ ...q, id: `q-${Date.now().toString(36)}`, createdAt: new Date().toISOString(), resolved: false }, ...s.questions],
      })),
    updateQuestion: (id, patch) => update((s) => ({ ...s, questions: s.questions.map((q) => (q.id === id ? { ...q, ...patch } : q)) })),
    deleteQuestion: (id) => update((s) => ({ ...s, questions: s.questions.filter((q) => q.id !== id) })),
    toggleFinalTask: (taskId) => update((s) => ({ ...s, finalCase: { ...s.finalCase, [taskId]: !s.finalCase[taskId] } })),
    setFinalNote: (phaseId, note) => update((s) => ({ ...s, finalCaseNotes: { ...s.finalCaseNotes, [phaseId]: note } })),
    reset: () => commit(EMPTY_STATE),
    exportJson: () => JSON.stringify(current, null, 2),
    importJson: (json) => {
      try {
        const parsed = JSON.parse(json) as Partial<ProgressState>;
        if (typeof parsed !== "object" || !parsed || !("done" in parsed)) return false;
        commit({ ...EMPTY_STATE, ...parsed, version: 1 });
        return true;
      } catch {
        return false;
      }
    },
  }), [state, hydrated, update]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProgress doit être utilisé dans ProgressProvider");
  return ctx;
}
