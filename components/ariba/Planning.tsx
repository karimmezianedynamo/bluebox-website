"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { Level } from "@/lib/ariba/types";
import { LEVEL_LABEL, MODULES, MODULE_BY_ID } from "@/lib/ariba/modules";
import { ACTIVITIES, BASE, WEEKS, formatDuration, type DayPlan } from "@/lib/ariba/program";
import { useProgress } from "@/lib/ariba/progress";
import { ActivityRow, Card, EmptyState, PageHeader, ProgressBar, btn } from "./ui";

type View = "semaine" | "module" | "niveau";
const VIEWS: { id: View; label: string }[] = [
  { id: "semaine", label: "Par semaine" },
  { id: "module", label: "Par module" },
  { id: "niveau", label: "Par niveau" },
];
const LEVELS: Level[] = ["debutant", "intermediaire", "avance"];

export default function Planning() {
  const params = useSearchParams();
  const router = useRouter();
  const view = (params.get("vue") as View) || "semaine";
  const week = Number(params.get("semaine") || 1);
  const [hideDone, setHideDone] = useState(false);
  const [kindFilter, setKindFilter] = useState<string>("tous");
  const { state } = useProgress();
  const done = state.done;

  const setQuery = (patch: Record<string, string | undefined>) => {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === undefined) sp.delete(k);
      else sp.set(k, v);
    }
    router.replace(`${BASE}/planning?${sp.toString()}`, { scroll: false });
  };

  const filterAct = (list: typeof ACTIVITIES) =>
    list.filter((a) => (!hideDone || !done[a.id]) && (kindFilter === "tous" || a.kind === kindFilter));

  const filters = (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <select value={kindFilter} onChange={(e) => setKindFilter(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-semibold text-[#1B2B5E]">
        <option value="tous">Tous les types</option>
        <option value="lecon">Leçons</option>
        <option value="exercice">Exercices</option>
        <option value="simulation">Simulations</option>
        <option value="quiz">Quiz</option>
        <option value="cas">Cas pratiques</option>
      </select>
      <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-semibold text-[#1B2B5E]">
        <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} className="accent-[#E8231A]" />
        Masquer ce qui est fait
      </label>
    </div>
  );

  return (
    <>
      <PageHeader eyebrow="Planning" title="Planning quotidien sur 8 semaines"
        sub="Chaque journée tient en 1 à 2 heures : une leçon courte, un exercice ou une simulation métier, puis un quiz corrigé. Cochez une activité pour la marquer comme faite."
        actions={filters} />

      <div className="mb-6 flex flex-wrap gap-2">
        {VIEWS.map((v) => (
          <button key={v.id} type="button" onClick={() => setQuery({ vue: v.id })}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${view === v.id ? "bg-[#1B2B5E] text-white" : "border border-slate-300 bg-white text-[#1B2B5E] hover:bg-[#EEF1F8]"}`}>
            {v.label}
          </button>
        ))}
      </div>

      {view === "semaine" && (
        <>
          <div className="mb-6 grid grid-cols-4 gap-2 sm:grid-cols-8">
            {WEEKS.map((w) => {
              const acts = w.days.flatMap((d) => d.activities);
              const n = acts.filter((a) => done[a.id]).length;
              const pct = acts.length ? Math.round((n / acts.length) * 100) : 0;
              const active = w.week === week;
              return (
                <button key={w.week} type="button" onClick={() => setQuery({ semaine: String(w.week) })}
                  className={`rounded-xl border p-2 text-left transition-colors ${active ? "border-[#E8231A] bg-white shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <p className={`text-xs font-bold ${active ? "text-[#E8231A]" : "text-[#1B2B5E]"}`}>S{w.week}</p>
                  <ProgressBar value={pct} className="mt-1.5 h-1.5" color={pct === 100 ? "bg-emerald-500" : "bg-[#E8231A]"} />
                  <p className="mt-1 text-[10px] text-slate-500">{n}/{acts.length}</p>
                </button>
              );
            })}
          </div>
          <WeekView week={week} filter={filterAct} />
        </>
      )}

      {view === "module" && (
        <div className="space-y-6">
          {MODULES.map((m) => {
            const acts = filterAct(ACTIVITIES.filter((a) => a.moduleId === m.id));
            const all = ACTIVITIES.filter((a) => a.moduleId === m.id);
            const n = all.filter((a) => done[a.id]).length;
            return (
              <Card key={m.id}>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <Link href={`${BASE}/modules/${m.slug}`} className="flex items-center gap-2 font-bold text-[#1B2B5E] hover:text-[#E8231A]">
                    <span className={`inline-flex h-6 w-6 items-center justify-center rounded text-xs text-white ${m.color}`}>{m.icon}</span>
                    {m.title}
                  </Link>
                  <span className="text-xs text-slate-500">Semaine{m.weeks.length > 1 ? "s" : ""} {m.weeks.join(", ")} · {n}/{all.length} faites · {formatDuration(all.reduce((s, a) => s + a.durationMin, 0))}</span>
                </div>
                <ProgressBar value={all.length ? (n / all.length) * 100 : 0} className="mb-3" color={m.color} />
                {acts.length ? <div className="grid gap-2 md:grid-cols-2">{acts.map((a) => <ActivityRow key={a.id} activity={a} showDay />)}</div> : <p className="text-xs text-slate-400">Rien à afficher avec les filtres actuels.</p>}
              </Card>
            );
          })}
        </div>
      )}

      {view === "niveau" && (
        <div className="space-y-6">
          {LEVELS.map((lvl) => {
            const all = ACTIVITIES.filter((a) => a.level === lvl);
            const acts = filterAct(all);
            const n = all.filter((a) => done[a.id]).length;
            const desc: Record<Level, string> = {
              debutant: "Vocabulaire, panorama et premiers flux. À suivre dans l'ordre si vous découvrez SAP Ariba.",
              intermediaire: "Paramétrage courant, flux complets et cas d'usage de consultant.",
              avance: "Intégration, cXML, administration fine, arbitrages d'architecture et préparation à la certification.",
            };
            return (
              <Card key={lvl}>
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-[#1B2B5E]">{LEVEL_LABEL[lvl]}</h3>
                  <span className="text-xs text-slate-500">{n}/{all.length} faites · {formatDuration(all.reduce((s, a) => s + a.durationMin, 0))}</span>
                </div>
                <p className="mb-3 text-xs text-slate-500">{desc[lvl]}</p>
                <ProgressBar value={all.length ? (n / all.length) * 100 : 0} className="mb-3" />
                {acts.length ? <div className="grid gap-2 md:grid-cols-2">{acts.map((a) => <ActivityRow key={a.id} activity={a} showDay />)}</div> : <EmptyState title="Rien à afficher" text="Modifiez les filtres." />}
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

function WeekView({ week, filter }: { week: number; filter: (l: typeof ACTIVITIES) => typeof ACTIVITIES }) {
  const w = WEEKS.find((x) => x.week === week) ?? WEEKS[0];
  const { state, setDone } = useProgress();
  const mods = useMemo(() => w.moduleIds.map((id) => MODULE_BY_ID[id]).filter(Boolean), [w]);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Semaine {w.week}</p>
          <h2 className="text-xl font-bold text-[#1B2B5E]">{w.theme}</h2>
          <p className="mt-1 text-xs text-slate-500">{formatDuration(w.totalMin)} au total · modules : {mods.map((m) => m.short).join(", ")}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`${BASE}/planning?semaine=${Math.max(1, week - 1)}`} className={btn.secondary} aria-disabled={week === 1}>← S{Math.max(1, week - 1)}</Link>
          <Link href={`${BASE}/planning?semaine=${Math.min(8, week + 1)}`} className={btn.secondary} aria-disabled={week === 8}>S{Math.min(8, week + 1)} →</Link>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {w.days.map((d) => <DayCard key={d.key} day={d} filter={filter} done={state.done} onAll={(v) => d.activities.forEach((a) => setDone(a.id, v))} />)}
      </div>
    </>
  );
}

function DayCard({ day, filter, done, onAll }: { day: DayPlan; filter: (l: typeof ACTIVITIES) => typeof ACTIVITIES; done: Record<string, string>; onAll: (v: boolean) => void }) {
  const n = day.activities.filter((a) => done[a.id]).length;
  const complete = n === day.activities.length;
  const acts = filter(day.activities);
  return (
    <Card className={complete ? "border-emerald-200" : ""}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Jour {day.day}</p>
          <h3 className="font-bold text-[#1B2B5E]">{day.title}</h3>
          <p className="mt-0.5 text-xs text-slate-500">{formatDuration(day.totalMin)} · {n}/{day.activities.length} faites · {day.moduleIds.map((m) => MODULE_BY_ID[m]?.short).join(" + ")}</p>
        </div>
        <button type="button" onClick={() => onAll(!complete)} className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${complete ? "bg-emerald-100 text-emerald-700" : "bg-[#EEF1F8] text-[#1B2B5E] hover:bg-slate-200"}`}>
          {complete ? "Journée validée ✓" : "Tout valider"}
        </button>
      </div>
      <div className="space-y-2">
        {acts.length ? acts.map((a) => <ActivityRow key={a.id} activity={a} />) : <p className="text-xs text-slate-400">Toutes les activités de cette journée sont masquées par les filtres.</p>}
      </div>
    </Card>
  );
}
