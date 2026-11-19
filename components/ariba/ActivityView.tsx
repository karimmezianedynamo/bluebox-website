"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Activity, ExerciseActivity, LessonActivity, QuizActivity, CaseActivity } from "@/lib/ariba/types";
import { KIND_LABEL, MODULE_BY_ID } from "@/lib/ariba/modules";
import { BASE, activityHref, formatDuration, getActivity, getDayOf, nextActivity, prevActivity } from "@/lib/ariba/program";
import { useProgress } from "@/lib/ariba/progress";
import Markdown from "./Markdown";
import { Card, DoneCheck, KindBadge, LevelBadge, ModuleBadge, btn } from "./ui";

export default function ActivityView({ id }: { id: string }) {
  const activity = getActivity(id)!;
  const { touch, isDone, setDone, state, addQuestion, hydrated } = useProgress();
  const day = getDayOf(activity);
  const prev = prevActivity(id);
  const next = nextActivity(id);
  const done = isDone(id);
  const m = MODULE_BY_ID[activity.moduleId];
  const [askOpen, setAskOpen] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => { touch(id); }, [id, touch]);

  const siblings = day?.activities ?? [];

  return (
    <>
      {/* Fil d'Ariane */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Link href={`${BASE}/planning?semaine=${activity.week}`} className="hover:text-[#E8231A]">Semaine {activity.week}</Link>
        <span>/</span>
        <span>Jour {activity.day}{day ? ` — ${day.title}` : ""}</span>
        <span>/</span>
        <Link href={`${BASE}/modules/${m.slug}`} className="hover:text-[#E8231A]">{m.short}</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card>
            <div className="flex flex-wrap items-center gap-2">
              <KindBadge kind={activity.kind} />
              <LevelBadge level={activity.level} />
              <ModuleBadge moduleId={activity.moduleId} />
              <span className="ml-auto text-xs font-semibold text-slate-500">⏱ {formatDuration(activity.durationMin)}</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#1B2B5E]">{activity.title}</h1>
            <p className="mt-2 rounded-xl bg-[#EEF1F8] px-4 py-3 text-sm leading-6 text-slate-700"><span className="font-bold text-[#1B2B5E]">Objectif · </span>{activity.objective}</p>

            <div className="mt-6">
              {activity.kind === "lecon" && <LessonBody a={activity} />}
              {(activity.kind === "exercice" || activity.kind === "simulation") && <ExerciseBody a={activity} />}
              {activity.kind === "quiz" && <QuizBody a={activity} key={activity.id} />}
              {activity.kind === "cas" && <CaseBody a={activity} />}
            </div>

            {/* Validation */}
            <div className={`mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 ${done ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
              <div className="flex items-center gap-3">
                <DoneCheck id={id} />
                <div>
                  <p className="text-sm font-bold text-[#1B2B5E]">{done ? "Activité validée" : "Marquer cette activité comme faite"}</p>
                  <p className="text-xs text-slate-500">{done ? `Validée le ${new Date(state.done[id]).toLocaleDateString("fr-FR")}` : "Votre progression et votre point de reprise sont enregistrés dans ce navigateur."}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {!done && <button type="button" onClick={() => setDone(id, true)} className={btn.primary}>Valider ✓</button>}
                {next && <Link href={activityHref(next.id)} className={done ? btn.primary : btn.secondary} onClick={() => { if (!done && activity.kind !== "quiz") setDone(id, true); }}>Suivant →</Link>}
              </div>
            </div>
          </Card>

          {/* Notes et question */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <NotesBox key={`${id}-${hydrated ? "h" : "s"}`} id={id} />
            <Card>
              <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Une question sur cette activité ?</p>
              {askOpen ? (
                <form className="mt-2" onSubmit={(e) => { e.preventDefault(); if (question.trim()) { addQuestion({ text: question.trim(), moduleId: activity.moduleId, activityId: id }); setQuestion(""); setAskOpen(false); } }}>
                  <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={3} placeholder="Ex. : quelle différence entre un ordre de release et un no-release order ?" className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#1B2B5E] focus:outline-none" />
                  <div className="mt-2 flex gap-2">
                    <button type="submit" className={btn.primary}>Enregistrer</button>
                    <button type="button" onClick={() => setAskOpen(false)} className={btn.ghost}>Annuler</button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Notez-la ici : elle rejoindra votre espace questions, où vous pourrez la documenter, la relier à la FAQ et la marquer résolue.</p>
                  <button type="button" onClick={() => setAskOpen(true)} className={`${btn.secondary} mt-3`}>Poser une question</button>
                </>
              )}
            </Card>
          </div>

          <div className="mt-6 flex flex-wrap justify-between gap-2">
            {prev ? <Link href={activityHref(prev.id)} className={btn.secondary}>← {prev.title}</Link> : <span />}
            {next ? <Link href={activityHref(next.id)} className={btn.secondary}>{next.title} →</Link> : <Link href={`${BASE}/synthese`} className={btn.primary}>Générer ma synthèse →</Link>}
          </div>
        </div>

        {/* Colonne : journée */}
        <aside className="lg:col-span-1">
          <Card className="lg:sticky lg:top-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Semaine {activity.week} · Jour {activity.day}</p>
            <p className="font-bold text-[#1B2B5E]">{day?.title}</p>
            <ol className="mt-3 space-y-2">
              {siblings.map((s, i) => (
                <li key={s.id}>
                  <Link href={activityHref(s.id)} className={`flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm ${s.id === id ? "bg-[#EEF1F8] font-semibold text-[#1B2B5E]" : "text-slate-600 hover:bg-slate-50"}`}>
                    <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${isDone(s.id) ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600"}`}>{isDone(s.id) ? "✓" : i + 1}</span>
                    <span className="leading-5">{s.title}<span className="block text-[11px] font-normal text-slate-400">{KIND_LABEL[s.kind]} · {formatDuration(s.durationMin)}</span></span>
                  </Link>
                </li>
              ))}
            </ol>
          </Card>
        </aside>
      </div>
    </>
  );
}

function NotesBox({ id }: { id: string }) {
  const { state, setNote } = useProgress();
  const [note, setLocalNote] = useState(() => state.notes[id] ?? "");
  return (
    <Card>
      <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Mes notes</p>
      <textarea value={note} onChange={(e) => setLocalNote(e.target.value)} onBlur={() => setNote(id, note)} rows={5} placeholder="Points clés, paramétrages à retenir, pièges…"
        className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#1B2B5E] focus:outline-none" />
      <p className="mt-1 text-[11px] text-slate-400">Enregistré automatiquement quand vous quittez le champ.</p>
    </Card>
  );
}

function LessonBody({ a }: { a: LessonActivity }) {
  return (
    <>
      <Markdown text={a.content} />
      <div className="mt-6 rounded-2xl border border-[#1B2B5E]/15 bg-[#EEF1F8] p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#1B2B5E]">Points clés à retenir</p>
        <ul className="mt-2 space-y-1.5 text-sm leading-6 text-slate-700">
          {a.keyPoints.map((k, i) => <li key={i} className="flex gap-2"><span className="text-[#E8231A]">■</span><span>{k}</span></li>)}
        </ul>
      </div>
    </>
  );
}

function ExerciseBody({ a }: { a: ExerciseActivity }) {
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() => a.steps.map(() => false));
  return (
    <>
      <h3 className="text-base font-bold text-[#1B2B5E]">Contexte</h3>
      <Markdown text={a.context} />
      <h3 className="mt-6 text-base font-bold text-[#1B2B5E]">Étapes à réaliser</h3>
      <ol className="mt-2 space-y-2">
        {a.steps.map((s, i) => (
          <li key={i}>
            <label className={`flex cursor-pointer gap-3 rounded-xl border p-3 text-sm leading-6 ${checked[i] ? "border-emerald-200 bg-emerald-50/50 text-slate-500" : "border-slate-200 bg-white text-slate-700"}`}>
              <input type="checkbox" checked={checked[i]} onChange={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))} className="mt-1.5 accent-[#E8231A]" />
              <span><span className="font-semibold text-[#1B2B5E]">Étape {i + 1}. </span>{s}</span>
            </label>
          </li>
        ))}
      </ol>
      <div className="mt-5 rounded-xl border-l-4 border-[#1B2B5E] bg-[#EEF1F8] px-4 py-3 text-sm leading-6 text-slate-700">
        <span className="font-bold text-[#1B2B5E]">Livrable attendu · </span>{a.deliverable}
      </div>
      {a.tips && a.tips.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Conseils</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600 marker:text-[#E8231A]">{a.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>
      )}
      <div className="mt-6">
        <button type="button" onClick={() => setShow((s) => !s)} className={show ? btn.secondary : btn.primary}>{show ? "Masquer le corrigé" : "Afficher le corrigé détaillé"}</button>
        {show && (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Corrigé / solution type</p>
            <Markdown text={a.solution} />
          </div>
        )}
      </div>
    </>
  );
}

function CaseBody({ a }: { a: CaseActivity }) {
  const { state, toggleFinalTask } = useProgress();
  return (
    <>
      <Markdown text={a.content} />
      <h3 className="mt-6 text-base font-bold text-[#1B2B5E]">Tâches</h3>
      <ul className="mt-2 space-y-2">
        {a.tasks.map((t, i) => {
          const tid = `${a.id}-t${i}`;
          const on = Boolean(state.finalCase[tid]);
          return (
            <li key={tid}>
              <label className={`flex cursor-pointer gap-3 rounded-xl border p-3 text-sm leading-6 ${on ? "border-emerald-200 bg-emerald-50/50 text-slate-500 line-through" : "border-slate-200 bg-white text-slate-700"}`}>
                <input type="checkbox" checked={on} onChange={() => toggleFinalTask(tid)} className="mt-1.5 accent-[#E8231A]" />
                <span>{t}</span>
              </label>
            </li>
          );
        })}
      </ul>
      {a.href && <Link href={a.href} className={`${btn.primary} mt-6`}>Ouvrir →</Link>}
    </>
  );
}

function QuizBody({ a }: { a: QuizActivity }) {
  const { recordQuiz, state, setDone } = useProgress();
  const attempts = state.quiz[a.id] ?? [];
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(1);
  const startedAt = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);

  const result = useMemo(() => {
    if (!submitted) return null;
    const wrong = a.questions.filter((q) => answers[q.id] !== q.answer);
    return { score: a.questions.length - wrong.length, total: a.questions.length, wrong };
  }, [submitted, answers, a.questions]);

  const allAnswered = a.questions.every((q) => answers[q.id] !== undefined);

  const submit = () => {
    const wrong = a.questions.filter((q) => answers[q.id] !== q.answer);
    recordQuiz(a.id, {
      date: new Date().toISOString(),
      score: a.questions.length - wrong.length,
      total: a.questions.length,
      wrong: wrong.map((q) => q.id),
      concepts: [...new Set(wrong.map((q) => q.concept))],
    });
    setDone(a.id, true);
    setElapsed(Math.max(1, Math.round((Date.now() - startedAt.current) / 60000)));
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const retry = () => { setAnswers({}); setSubmitted(false); };

  const pct = result ? Math.round((result.score / result.total) * 100) : 0;

  return (
    <>
      {attempts.length > 0 && !submitted && (
        <div className="mb-4 rounded-xl bg-[#EEF1F8] px-4 py-3 text-sm text-slate-700">
          <span className="font-bold text-[#1B2B5E]">Historique : </span>
          {attempts.map((t, i) => <span key={i} className="mr-2 inline-block rounded-full bg-white px-2 py-0.5 text-xs font-semibold">{t.score}/{t.total}</span>)}
          <span className="text-xs text-slate-500">— refaites le quiz pour améliorer votre meilleur score.</span>
        </div>
      )}

      {result && (
        <div className={`mb-6 rounded-2xl border p-5 ${pct >= 80 ? "border-emerald-200 bg-emerald-50" : pct >= 60 ? "border-amber-200 bg-amber-50" : "border-red-200 bg-red-50"}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Résultat</p>
              <p className="text-3xl font-bold text-[#1B2B5E]">{result.score}/{result.total} <span className="text-base font-semibold text-slate-500">({pct}%)</span></p>
              <p className="mt-1 text-sm text-slate-600">
                {pct === 100 ? "Parfait ! Toutes les notions sont acquises." : pct >= 80 ? "Très bien. Relisez les corrections des questions ratées." : pct >= 60 ? "Correct, mais quelques notions sont à consolider : elles ont été ajoutées à votre liste de révision." : "Reprenez la leçon du jour puis refaites le quiz. Les notions ratées sont dans votre liste de révision."}
                {" "}Temps : ~{elapsed} min.
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={retry} className={btn.secondary}>Refaire le quiz</button>
              {result.wrong.length > 0 && <Link href={`${BASE}/revision`} className={btn.primary}>Notions à revoir ({[...new Set(result.wrong.map((q) => q.concept))].length})</Link>}
            </div>
          </div>
        </div>
      )}

      <ol className="space-y-5">
        {a.questions.map((q, qi) => {
          const chosen = answers[q.id];
          const correct = chosen === q.answer;
          return (
            <li key={q.id} className={`rounded-2xl border p-4 ${submitted ? (correct ? "border-emerald-300" : "border-red-300") : "border-slate-200"}`}>
              <p className="text-sm font-bold text-[#1B2B5E]"><span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1B2B5E] text-xs text-white">{qi + 1}</span>{q.question}</p>
              <div className="mt-3 grid gap-2">
                {q.options.map((opt, oi) => {
                  const isChosen = chosen === oi;
                  const isAnswer = q.answer === oi;
                  let cls = "border-slate-200 bg-white hover:border-[#1B2B5E]";
                  if (submitted) {
                    if (isAnswer) cls = "border-emerald-400 bg-emerald-50";
                    else if (isChosen) cls = "border-red-400 bg-red-50";
                    else cls = "border-slate-200 bg-white opacity-70";
                  } else if (isChosen) cls = "border-[#E8231A] bg-[#FFF5F4]";
                  return (
                    <label key={oi} className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-sm leading-6 text-slate-700 transition-colors ${cls} ${submitted ? "cursor-default" : ""}`}>
                      <input type="radio" name={q.id} disabled={submitted} checked={isChosen} onChange={() => setAnswers((s) => ({ ...s, [q.id]: oi }))} className="mt-1.5 accent-[#E8231A]" />
                      <span className="flex-1">{opt}</span>
                      {submitted && isAnswer && <span className="text-xs font-bold text-emerald-700">Bonne réponse</span>}
                      {submitted && isChosen && !isAnswer && <span className="text-xs font-bold text-red-600">Votre réponse</span>}
                    </label>
                  );
                })}
              </div>
              {submitted && (
                <div className={`mt-3 rounded-xl p-4 text-sm leading-6 ${correct ? "bg-emerald-50 text-slate-700" : "bg-[#FFF5F4] text-slate-700"}`}>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Correction détaillée</p>
                  <p className="mt-1">{q.explanation}</p>
                  <p className="mt-2 text-xs"><span className="font-semibold text-[#1B2B5E]">Notion : </span>{q.concept}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!submitted && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#EEF1F8] p-4">
          <p className="text-sm text-slate-600">{Object.keys(answers).length}/{a.questions.length} réponses saisies</p>
          <button type="button" disabled={!allAnswered} onClick={submit} className={btn.primary}>Valider mes réponses</button>
        </div>
      )}
    </>
  );
}

export type { Activity };
