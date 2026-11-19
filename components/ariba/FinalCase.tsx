"use client";

import { useState } from "react";
import { FINAL_CASE } from "@/lib/ariba/finalCase";
import { useProgress } from "@/lib/ariba/progress";
import Markdown from "./Markdown";
import { Card, PageHeader, ProgressBar, btn } from "./ui";

export default function FinalCase() {
  const { state, toggleFinalTask, setFinalNote, hydrated } = useProgress();
  const allTasks = FINAL_CASE.phases.flatMap((p) => p.tasks);
  const doneCount = allTasks.filter((t) => state.finalCase[t.id]).length;
  const pct = Math.round((doneCount / allTasks.length) * 100);
  const [openState, setOpen] = useState<string | null | undefined>(undefined);
  const firstPending = FINAL_CASE.phases.find((p) => p.tasks.some((t) => !state.finalCase[t.id]))?.id ?? FINAL_CASE.phases[0].id;
  const open = openState === undefined ? firstPending : openState;

  return (
    <>
      <PageHeader eyebrow="Semaine 8 · Jours 3 et 4" title={FINAL_CASE.title} sub={FINAL_CASE.subtitle} />

      <Card className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Avancement du cas</p>
            <p className="text-2xl font-bold text-[#1B2B5E]">{doneCount}/{allTasks.length} tâches <span className="text-base font-semibold text-slate-500">({pct}%)</span></p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {FINAL_CASE.phases.map((p, i) => {
              const n = p.tasks.filter((t) => state.finalCase[t.id]).length;
              const full = n === p.tasks.length;
              return (
                <button key={p.id} type="button" onClick={() => { setOpen(p.id); document.getElementById(p.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                  className={`rounded-full px-3 py-1 font-semibold ${full ? "bg-emerald-100 text-emerald-700" : open === p.id ? "bg-[#1B2B5E] text-white" : "bg-[#EEF1F8] text-[#1B2B5E]"}`}>
                  Phase {i + 1} {full ? "✓" : `${n}/${p.tasks.length}`}
                </button>
              );
            })}
          </div>
        </div>
        <ProgressBar value={pct} className="mt-3" color={pct === 100 ? "bg-emerald-500" : "bg-[#E8231A]"} />
      </Card>

      <Card className="mb-6">
        <Markdown text={FINAL_CASE.intro} />
      </Card>

      <div className="space-y-4">
        {FINAL_CASE.phases.map((p, i) => {
          const n = p.tasks.filter((t) => state.finalCase[t.id]).length;
          const full = n === p.tasks.length;
          const isOpen = open === p.id;
          return (
            <section key={p.id} id={p.id} className={`rounded-2xl border bg-white shadow-sm ${full ? "border-emerald-200" : "border-slate-200"}`}>
              <button type="button" onClick={() => setOpen(isOpen ? null : p.id)} className="flex w-full items-start justify-between gap-3 p-5 text-left">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Phase {i + 1} · {p.duration}</p>
                  <h2 className="text-lg font-bold text-[#1B2B5E]">{p.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{p.objective}</p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${full ? "bg-emerald-100 text-emerald-700" : "bg-[#EEF1F8] text-[#1B2B5E]"}`}>{full ? "Terminée ✓" : `${n}/${p.tasks.length}`}</span>
              </button>
              {isOpen && <PhaseBody key={`${p.id}-${hydrated ? "h" : "s"}`} phase={p} state={state} toggle={toggleFinalTask} setNote={setFinalNote} />}
            </section>
          );
        })}
      </div>
    </>
  );
}

function PhaseBody({ phase: p, state, toggle, setNote }: { phase: (typeof FINAL_CASE.phases)[number]; state: ReturnType<typeof useProgress>["state"]; toggle: (id: string) => void; setNote: (id: string, n: string) => void }) {
  const [show, setShow] = useState(false);
  const [note, setLocal] = useState(() => state.finalCaseNotes[p.id] ?? "");
  return (
    <div className="border-t border-slate-100 px-5 pb-5">
      <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-[#E8231A]">Brief</h3>
      <Markdown text={p.brief} />
      <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-[#E8231A]">Tâches à réaliser</h3>
      <ul className="mt-2 space-y-2">
        {p.tasks.map((t) => {
          const on = Boolean(state.finalCase[t.id]);
          return (
            <li key={t.id}>
              <label className={`flex cursor-pointer gap-3 rounded-xl border p-3 text-sm leading-6 ${on ? "border-emerald-200 bg-emerald-50/50 text-slate-500" : "border-slate-200 bg-white text-slate-700"}`}>
                <input type="checkbox" checked={on} onChange={() => toggle(t.id)} className="mt-1.5 accent-[#E8231A]" />
                <span className={on ? "line-through decoration-emerald-400" : ""}>{t.text}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-[#EEF1F8] p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#1B2B5E]">Livrables attendus</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 marker:text-[#E8231A]">{p.deliverables.map((d, i) => <li key={i}>{d}</li>)}</ul>
        </div>
        <div className="rounded-xl bg-[#FFF5F4] p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#C41C14]">Questions de réflexion</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 marker:text-[#E8231A]">{p.questions.map((d, i) => <li key={i}>{d}</li>)}</ul>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Mon travail (enregistré automatiquement)</p>
        <textarea value={note} onChange={(e) => setLocal(e.target.value)} onBlur={() => setNote(p.id, note)} rows={6} placeholder="Rédigez vos choix, tableaux et justifications ici avant d'ouvrir le corrigé…"
          className="mt-1 w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#1B2B5E] focus:outline-none" />
      </div>
      <div className="mt-4">
        <button type="button" onClick={() => setShow((s) => !s)} className={show ? btn.secondary : btn.primary}>{show ? "Masquer le corrigé" : "Comparer avec le corrigé"}</button>
        {show && (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Corrigé — proposition de solution</p>
            <Markdown text={p.solution} />
          </div>
        )}
      </div>
    </div>
  );
}
