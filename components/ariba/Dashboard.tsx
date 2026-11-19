"use client";

import Link from "next/link";
import { useMemo } from "react";
import { MODULES, MODULE_BY_ID, KIND_LABEL } from "@/lib/ariba/modules";
import { BASE, TOTALS, WEEKS, activityHref, formatDuration, getDayOf } from "@/lib/ariba/program";
import { useProgress } from "@/lib/ariba/progress";
import { computeStats } from "@/lib/ariba/stats";
import { ActivityRow, Card, KindBadge, LevelBadge, PageHeader, ProgressBar, Ring, btn } from "./ui";

export default function Dashboard() {
  const { state, hydrated } = useProgress();
  const stats = useMemo(() => computeStats(state), [state]);
  const resume = stats.resume;
  const resumeDay = resume ? getDayOf(resume) : undefined;
  const day = stats.currentDay;
  const started = Boolean(state.startedAt);

  return (
    <>
      <PageHeader
        eyebrow="BlueBox Academy"
        title="Parcours SAP Ariba technico-fonctionnel"
        sub={`8 semaines · 5 jours par semaine · 1 à 2 h par jour · ${TOTALS.activities} activités, ${TOTALS.quizzes} quiz et ${TOTALS.questions} questions corrigées, un cas final intégration + configuration et une synthèse de préparation à la certification.`}
      />

      {/* Reprendre */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl bg-[#1B2B5E] p-5 text-white shadow-sm lg:col-span-2">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#2C3E7A] opacity-60" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-widest text-white/60">{started ? "Reprendre là où vous vous êtes arrêté" : "Commencer le parcours"}</p>
            {resume ? (
              <>
                <h2 className="mt-2 text-xl font-bold md:text-2xl">{resume.title}</h2>
                <p className="mt-1 text-sm text-white/70">
                  Semaine {resume.week} · Jour {resume.day}{resumeDay ? ` — ${resumeDay.title}` : ""} · {KIND_LABEL[resume.kind]} · {formatDuration(resume.durationMin)} · {MODULE_BY_ID[resume.moduleId]?.title}
                </p>
                <p className="mt-3 max-w-xl text-sm text-white/80">{resume.objective}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link href={activityHref(resume.id)} className={btn.primary}>{started ? "Reprendre →" : "Démarrer la première activité →"}</Link>
                  <Link href={`${BASE}/planning?semaine=${resume.week}`} className="inline-flex items-center rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">Voir la semaine {resume.week}</Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="mt-2 text-xl font-bold">Parcours terminé 🎉</h2>
                <p className="mt-2 text-sm text-white/80">Toutes les activités sont validées. Générez votre synthèse de préparation à la certification.</p>
                <Link href={`${BASE}/synthese`} className={`${btn.primary} mt-5`}>Voir la synthèse →</Link>
              </>
            )}
          </div>
        </div>

        <Card className="flex flex-col items-center justify-center text-center">
          <Ring value={hydrated ? stats.pct : 0} size={120} label="du parcours" />
          <p className="mt-3 text-sm font-semibold text-[#1B2B5E]">{stats.doneActivities} / {stats.totalActivities} activités</p>
          <p className="text-xs text-slate-500">{formatDuration(stats.minutesDone)} réalisées sur {formatDuration(stats.minutesTotal)}</p>
        </Card>
      </section>

      {/* KPI */}
      <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Score moyen aux quiz" value={stats.quizAvg === null ? "—" : `${stats.quizAvg}%`} hint={`${stats.quizTaken}/${stats.quizCount} quiz passés`} />
        <Kpi label="Bonnes réponses" value={stats.questionsAnswered ? `${stats.questionsCorrect}/${stats.questionsAnswered}` : "—"} hint="toutes tentatives" />
        <Kpi label="Notions à revoir" value={String(stats.weakConcepts.length)} hint={stats.weakConcepts.length ? "cliquez pour réviser" : "aucune pour l'instant"} href={`${BASE}/revision`} accent={stats.weakConcepts.length > 0} />
        <Kpi label="Préparation certification" value={`${stats.readiness}%`} hint={stats.readinessLabel} href={`${BASE}/synthese`} />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Journée du jour */}
        <div className="lg:col-span-3">
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Journée en cours</p>
                <h3 className="text-lg font-bold text-[#1B2B5E]">{day ? `Semaine ${day.week} · Jour ${day.day} — ${day.title}` : "Toutes les journées sont terminées"}</h3>
              </div>
              {day && <span className="rounded-full bg-[#EEF1F8] px-3 py-1 text-xs font-semibold text-[#1B2B5E]">{formatDuration(day.totalMin)}</span>}
            </div>
            {day ? (
              <div className="space-y-2">
                {day.activities.map((a) => <ActivityRow key={a.id} activity={a} />)}
              </div>
            ) : (
              <p className="text-sm text-slate-500">Bravo ! Passez à la synthèse ou refaites les quiz les plus difficiles.</p>
            )}
            <div className="mt-4 text-right">
              <Link href={`${BASE}/planning`} className={btn.ghost}>Planning complet →</Link>
            </div>
          </Card>

          <Card className="mt-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Progression par semaine</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {WEEKS.map((w) => {
                const s = stats.weeks.find((x) => x.week === w.week)!;
                return (
                  <Link key={w.week} href={`${BASE}/planning?semaine=${w.week}`} className="rounded-xl border border-slate-200 p-3 transition-colors hover:border-[#E8231A]/40">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-[#1B2B5E]">Semaine {w.week}</span>
                      <span className="text-xs text-slate-500">{s.done}/{s.total}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{w.theme}</p>
                    <ProgressBar value={s.pct} className="mt-2" color={s.pct === 100 ? "bg-emerald-500" : "bg-[#E8231A]"} />
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Modules */}
        <div className="lg:col-span-2">
          <Card>
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Modules</p>
            <ul className="mt-3 space-y-2.5">
              {MODULES.map((m) => {
                const s = stats.modules.find((x) => x.moduleId === m.id)!;
                return (
                  <li key={m.id}>
                    <Link href={`${BASE}/modules/${m.slug}`} className="group block">
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="flex min-w-0 items-center gap-2 font-semibold text-[#1B2B5E] group-hover:text-[#E8231A]">
                          <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] text-white ${m.color}`}>{m.icon}</span>
                          <span className="truncate">{m.title}</span>
                        </span>
                        <span className="shrink-0 text-xs text-slate-500">{s.pct}%{s.quizAvg !== null && <span className="ml-1 text-[#1B2B5E]">· quiz {s.quizAvg}%</span>}</span>
                      </div>
                      <ProgressBar value={s.pct} className="mt-1.5" color={s.pct === 100 ? "bg-emerald-500" : m.color} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card className="mt-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Rythme</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-[#EEF1F8] p-3">
                <p className="text-2xl font-bold text-[#1B2B5E]">{stats.streakDays}</p>
                <p className="text-[11px] uppercase tracking-wide text-slate-500">jours d’affilée</p>
              </div>
              <div className="rounded-xl bg-[#EEF1F8] p-3">
                <p className="text-2xl font-bold text-[#1B2B5E]">{stats.activeDays}</p>
                <p className="text-[11px] uppercase tracking-wide text-slate-500">jours actifs</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">Objectif : 1 à 2 h par jour, 5 jours par semaine. Une journée type = une leçon courte, un exercice ou une simulation métier, un quiz corrigé.</p>
          </Card>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { icon: "📘", t: "Leçons courtes", d: "20 à 30 minutes, orientées terrain : objets Ariba réels, paramétrage, vocabulaire de consultant." },
          { icon: "🎭", t: "Exercices & simulations", d: "Cas métier, ateliers de cadrage, analyses de flux, avec un corrigé détaillé à comparer à votre réponse." },
          { icon: "❓", t: "Quiz corrigés", d: "Chaque erreur alimente votre liste de notions à revoir et votre synthèse de préparation à la certification." },
        ].map((x) => (
          <Card key={x.t} className="flex gap-3">
            <span className="text-2xl">{x.icon}</span>
            <div>
              <p className="font-bold text-[#1B2B5E]">{x.t}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{x.d}</p>
            </div>
          </Card>
        ))}
      </section>

      {resume && (
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          Prochaine activité : <KindBadge kind={resume.kind} /> <LevelBadge level={resume.level} />
        </div>
      )}
    </>
  );
}

function Kpi({ label, value, hint, href, accent }: { label: string; value: string; hint?: string; href?: string; accent?: boolean }) {
  const inner = (
    <>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${accent ? "text-[#E8231A]" : "text-[#1B2B5E]"}`}>{value}</p>
      {hint && <p className="mt-0.5 truncate text-xs text-slate-500">{hint}</p>}
    </>
  );
  return href ? (
    <Link href={href} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-[#E8231A]/40">{inner}</Link>
  ) : (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">{inner}</div>
  );
}
