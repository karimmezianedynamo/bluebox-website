"use client";

import Link from "next/link";
import { useMemo } from "react";
import { MODULES } from "@/lib/ariba/modules";
import { BASE, activitiesOfModule, formatDuration } from "@/lib/ariba/program";
import { useProgress } from "@/lib/ariba/progress";
import { computeStats } from "@/lib/ariba/stats";
import { PageHeader, ProgressBar } from "./ui";

export default function ModulesGrid() {
  const { state } = useProgress();
  const stats = useMemo(() => computeStats(state), [state]);
  return (
    <>
      <PageHeader eyebrow="Modules" title="Vue par module" sub="Dix modules couvrant l'ensemble du périmètre technico-fonctionnel SAP Ariba, du P2P à l'intégration S/4HANA et à la préparation de la certification." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MODULES.map((m, idx) => {
          const s = stats.modules.find((x) => x.moduleId === m.id)!;
          const acts = activitiesOfModule(m.id);
          const counts = { lecon: 0, exercice: 0, simulation: 0, quiz: 0, cas: 0 } as Record<string, number>;
          acts.forEach((a) => counts[a.kind]++);
          return (
            <Link key={m.id} href={`${BASE}/modules/${m.slug}`} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#E8231A]/40 hover:shadow-md">
              <div className="flex items-start justify-between">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg text-white ${m.color}`}>{m.icon}</span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Module {idx + 1} · S{m.weeks.join("–")}</span>
              </div>
              <h3 className="mt-3 font-bold text-[#1B2B5E] group-hover:text-[#E8231A]">{m.title}</h3>
              <p className="mt-1 flex-1 text-sm leading-6 text-slate-600">{m.description}</p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                <span>📘 {counts.lecon} leçons</span>
                <span>🛠️ {counts.exercice + counts.simulation} exercices</span>
                <span>❓ {counts.quiz} quiz</span>
                {counts.cas > 0 && <span>🧩 {counts.cas} cas</span>}
                <span>⏱ {formatDuration(s.minutesTotal)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1B2B5E]">{s.done}/{s.total} faites</span>
                <span className="text-slate-500">{s.quizAvg === null ? "Quiz : —" : `Quiz : ${s.quizAvg}%`}</span>
              </div>
              <ProgressBar value={s.pct} className="mt-1.5" color={s.pct === 100 ? "bg-emerald-500" : m.color} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
