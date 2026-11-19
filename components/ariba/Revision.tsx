"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MODULE_BY_ID, MODULES } from "@/lib/ariba/modules";
import { ACTIVITY_BY_ID, BASE, CONCEPTS, QUESTION_BY_ID, activityHref } from "@/lib/ariba/program";
import { useProgress } from "@/lib/ariba/progress";
import { Card, EmptyState, PageHeader, btn } from "./ui";

export default function Revision() {
  const { state, setConceptMastered, addManualConcept, removeConcept } = useProgress();
  const [showMastered, setShowMastered] = useState(false);
  const [moduleFilter, setModuleFilter] = useState("tous");
  const [newConcept, setNewConcept] = useState("");
  const [newNote, setNewNote] = useState("");

  const list = useMemo(() => {
    return Object.entries(state.concepts)
      .map(([concept, v]) => {
        const info = CONCEPTS[concept];
        const wrongQuestions = new Set<string>();
        for (const attempts of Object.values(state.quiz)) for (const a of attempts) for (const w of a.wrong) if (QUESTION_BY_ID[w]?.question.concept === concept) wrongQuestions.add(w);
        return { concept, ...v, moduleIds: info?.moduleIds ?? [], lessonIds: info?.lessonIds ?? [], wrongQuestions: [...wrongQuestions] };
      })
      .filter((c) => (showMastered || !c.mastered) && (moduleFilter === "tous" || c.moduleIds.includes(moduleFilter) || (c.manual && moduleFilter === "manuel")))
      .sort((a, b) => Number(a.mastered) - Number(b.mastered) || b.fails - a.fails || a.concept.localeCompare(b.concept, "fr"));
  }, [state, showMastered, moduleFilter]);

  const pending = Object.values(state.concepts).filter((c) => !c.mastered).length;
  const mastered = Object.values(state.concepts).filter((c) => c.mastered).length;

  return (
    <>
      <PageHeader eyebrow="Révision" title="Notions à revoir"
        sub="Chaque mauvaise réponse à un quiz ajoute automatiquement la notion correspondante ici, avec la leçon à relire et les questions à refaire. Marquez une notion comme maîtrisée une fois revue, ou ajoutez vos propres points à revoir."
        actions={
          <div className="flex flex-wrap gap-2 text-xs">
            <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-semibold text-[#1B2B5E]">
              <option value="tous">Tous les modules</option>
              {MODULES.map((m) => <option key={m.id} value={m.id}>{m.short}</option>)}
              <option value="manuel">Ajouts manuels</option>
            </select>
            <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-semibold text-[#1B2B5E]">
              <input type="checkbox" checked={showMastered} onChange={(e) => setShowMastered(e.target.checked)} className="accent-[#E8231A]" /> Afficher les notions maîtrisées
            </label>
          </div>
        } />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card><p className="text-xs font-semibold uppercase text-slate-500">À revoir</p><p className="text-3xl font-bold text-[#E8231A]">{pending}</p></Card>
        <Card><p className="text-xs font-semibold uppercase text-slate-500">Maîtrisées</p><p className="text-3xl font-bold text-emerald-600">{mastered}</p></Card>
        <Card>
          <p className="text-xs font-semibold uppercase text-slate-500">Conseil</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">Relisez la leçon liée, refaites le quiz, puis marquez la notion comme maîtrisée seulement après un score ≥ 80 %.</p>
        </Card>
      </div>

      <Card className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Ajouter une notion à revoir</p>
        <form className="mt-2 grid gap-2 md:grid-cols-[1fr_2fr_auto]" onSubmit={(e) => { e.preventDefault(); if (newConcept.trim()) { addManualConcept(newConcept.trim(), newNote.trim() || undefined); setNewConcept(""); setNewNote(""); } }}>
          <input value={newConcept} onChange={(e) => setNewConcept(e.target.value)} placeholder="Ex. : Règles de transaction par pays" className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-[#1B2B5E] focus:outline-none" />
          <input value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Note facultative : où relire, quoi vérifier…" className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-[#1B2B5E] focus:outline-none" />
          <button type="submit" className={btn.primary}>Ajouter</button>
        </form>
      </Card>

      {list.length === 0 ? (
        <EmptyState icon="🎯" title={pending === 0 && mastered > 0 ? "Toutes vos notions sont maîtrisées" : "Aucune notion à revoir pour l'instant"} text="Les erreurs de quiz alimenteront cette liste automatiquement. Vous pouvez aussi ajouter des notions manuellement."
          action={<Link href={`${BASE}/planning`} className={btn.primary}>Aller au planning</Link>} />
      ) : (
        <ul className="space-y-3">
          {list.map((c) => (
            <li key={c.concept} className={`rounded-2xl border bg-white p-4 shadow-sm ${c.mastered ? "border-emerald-200 opacity-80" : "border-slate-200"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className={`font-bold ${c.mastered ? "text-slate-500 line-through" : "text-[#1B2B5E]"}`}>{c.concept}</h3>
                    {c.moduleIds.map((mid) => <span key={mid} className="inline-flex items-center gap-1 rounded-full bg-[#EEF1F8] px-2 py-0.5 text-[10px] font-semibold text-[#1B2B5E]"><span className={`h-1.5 w-1.5 rounded-full ${MODULE_BY_ID[mid]?.color}`} />{MODULE_BY_ID[mid]?.short}</span>)}
                    {c.manual && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">ajout manuel</span>}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {c.fails > 0 ? `${c.fails} erreur${c.fails > 1 ? "s" : ""} en quiz` : "Aucune erreur enregistrée"}{c.lastFail ? ` · dernière le ${new Date(c.lastFail).toLocaleDateString("fr-FR")}` : ""}
                  </p>
                  {c.note && <p className="mt-1 text-sm text-slate-600">{c.note}</p>}
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    {c.lessonIds.map((lid) => ACTIVITY_BY_ID[lid] && (
                      <Link key={lid} href={activityHref(lid)} className="rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1 font-semibold text-sky-700 hover:bg-sky-100">📘 Relire : {ACTIVITY_BY_ID[lid].title}</Link>
                    ))}
                    {[...new Set(c.wrongQuestions.map((q) => QUESTION_BY_ID[q]?.activity.id).filter(Boolean))].map((qid) => qid && (
                      <Link key={qid} href={activityHref(qid)} className="rounded-lg border border-red-200 bg-[#FFF5F4] px-2.5 py-1 font-semibold text-[#C41C14] hover:bg-red-100">❓ Refaire : {ACTIVITY_BY_ID[qid]?.title}</Link>
                    ))}
                  </div>
                  {c.wrongQuestions.length > 0 && (
                    <details className="mt-2 text-sm">
                      <summary className="cursor-pointer text-xs font-semibold text-slate-500">Voir les questions ratées ({c.wrongQuestions.length}) et leur correction</summary>
                      <ul className="mt-2 space-y-2">
                        {c.wrongQuestions.map((qid) => {
                          const ref = QUESTION_BY_ID[qid];
                          if (!ref) return null;
                          return (
                            <li key={qid} className="rounded-xl bg-slate-50 p-3">
                              <p className="font-semibold text-[#1B2B5E]">{ref.question.question}</p>
                              <p className="mt-1 text-xs text-emerald-700"><span className="font-bold">Bonne réponse : </span>{ref.question.options[ref.question.answer]}</p>
                              <p className="mt-1 text-xs leading-5 text-slate-600">{ref.question.explanation}</p>
                            </li>
                          );
                        })}
                      </ul>
                    </details>
                  )}
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  <button type="button" onClick={() => setConceptMastered(c.concept, !c.mastered)} className={c.mastered ? btn.secondary : btn.primary}>{c.mastered ? "Remettre à revoir" : "Maîtrisée ✓"}</button>
                  {c.manual && <button type="button" onClick={() => removeConcept(c.concept)} className={btn.ghost}>Supprimer</button>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
