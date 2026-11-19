"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MODULES, MODULE_BY_ID } from "@/lib/ariba/modules";
import { BASE, CONTENT, DAYS, activitiesOfModule, formatDuration } from "@/lib/ariba/program";
import { useProgress } from "@/lib/ariba/progress";
import { computeStats } from "@/lib/ariba/stats";
import { ActivityRow, Card, PageHeader, ProgressBar, btn } from "./ui";
import UseCaseCard from "./UseCaseCard";

type Tab = "programme" | "cas" | "glossaire" | "faq";

export default function ModuleDetail({ moduleId }: { moduleId: string }) {
  const m = MODULE_BY_ID[moduleId];
  const content = CONTENT.find((c) => c.moduleId === moduleId)!;
  const acts = activitiesOfModule(moduleId);
  const { state } = useProgress();
  const stats = useMemo(() => computeStats(state), [state]);
  const s = stats.modules.find((x) => x.moduleId === moduleId)!;
  const [tab, setTab] = useState<Tab>("programme");
  const idx = MODULES.findIndex((x) => x.id === moduleId);
  const prev = MODULES[idx - 1];
  const next = MODULES[idx + 1];
  const days = DAYS.filter((d) => d.activities.some((a) => a.moduleId === moduleId));
  const firstUndone = acts.find((a) => !state.done[a.id]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "programme", label: `Programme (${acts.length})` },
    { id: "cas", label: `Cas d'usage (${content.useCases.length})` },
    { id: "glossaire", label: `Glossaire (${content.glossary.length})` },
    { id: "faq", label: `FAQ (${content.faq.length})` },
  ];

  return (
    <>
      <Link href={`${BASE}/modules`} className="text-xs font-semibold text-slate-500 hover:text-[#E8231A]">← Tous les modules</Link>
      <div className="mt-2">
        <PageHeader eyebrow={`Module ${idx + 1} · Semaine${m.weeks.length > 1 ? "s" : ""} ${m.weeks.join(" et ")}`} title={m.title} sub={m.description}
          actions={firstUndone ? <Link href={`${BASE}/activite/${firstUndone.id}`} className={btn.primary}>{s.done ? "Continuer ce module →" : "Commencer ce module →"}</Link> : undefined} />
      </div>

      <Card className="mb-6">
        <div className="grid gap-4 sm:grid-cols-4">
          <Stat label="Avancement" value={`${s.pct}%`} />
          <Stat label="Activités" value={`${s.done}/${s.total}`} />
          <Stat label="Durée" value={formatDuration(s.minutesTotal)} />
          <Stat label="Score quiz" value={s.quizAvg === null ? "—" : `${s.quizAvg}%`} hint={`${s.quizTaken}/${s.quizCount} passés`} />
        </div>
        <ProgressBar value={s.pct} className="mt-4" color={m.color} />
        {s.weakConcepts.length > 0 && (
          <p className="mt-3 text-xs text-slate-600">
            <span className="font-semibold text-[#E8231A]">Notions à revoir : </span>{s.weakConcepts.join(" · ")} — <Link href={`${BASE}/revision`} className="underline">voir la liste</Link>
          </p>
        )}
      </Card>

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.id} type="button" onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${tab === t.id ? "bg-[#1B2B5E] text-white" : "border border-slate-300 bg-white text-[#1B2B5E] hover:bg-[#EEF1F8]"}`}>{t.label}</button>
        ))}
      </div>

      {tab === "programme" && (
        <div className="space-y-4">
          {days.map((d) => {
            const list = d.activities.filter((a) => a.moduleId === moduleId);
            return (
              <Card key={d.key}>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Semaine {d.week} · Jour {d.day}</p>
                    <h3 className="font-bold text-[#1B2B5E]">{d.title}</h3>
                  </div>
                  <Link href={`${BASE}/planning?semaine=${d.week}`} className="text-xs font-semibold text-slate-500 hover:text-[#E8231A]">Voir dans le planning</Link>
                </div>
                <div className="space-y-2">{list.map((a) => <ActivityRow key={a.id} activity={a} />)}</div>
              </Card>
            );
          })}
        </div>
      )}

      {tab === "cas" && <div className="grid gap-4 lg:grid-cols-2">{content.useCases.map((u) => <UseCaseCard key={u.id} useCase={u} />)}</div>}

      {tab === "glossaire" && (
        <Card>
          <dl className="divide-y divide-slate-100">
            {content.glossary.map((g) => (
              <div key={g.term} className="grid gap-1 py-3 sm:grid-cols-3">
                <dt className="font-semibold text-[#1B2B5E]">{g.term}</dt>
                <dd className="text-sm leading-6 text-slate-600 sm:col-span-2">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </Card>
      )}

      {tab === "faq" && (
        <div className="space-y-3">
          {content.faq.map((f, i) => (
            <details key={i} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer list-none font-semibold text-[#1B2B5E] group-open:text-[#E8231A]">{f.q}</summary>
              <p className="mt-2 text-sm leading-6 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-between gap-2">
        {prev ? <Link href={`${BASE}/modules/${prev.slug}`} className={btn.secondary}>← {prev.short}</Link> : <span />}
        {next ? <Link href={`${BASE}/modules/${next.slug}`} className={btn.secondary}>{next.short} →</Link> : <span />}
      </div>
    </>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-xl font-bold text-[#1B2B5E]">{value}</p>
      {hint && <p className="text-[11px] text-slate-400">{hint}</p>}
    </div>
  );
}
