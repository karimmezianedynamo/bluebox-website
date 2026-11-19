"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MODULES, MODULE_BY_ID } from "@/lib/ariba/modules";
import { ACTIVITY_BY_ID, FAQ, GLOSSARY, activityHref } from "@/lib/ariba/program";
import { useProgress } from "@/lib/ariba/progress";
import { Card, EmptyState, PageHeader, btn } from "./ui";

function tokens(s: string): string[] {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9]+/).filter((t) => t.length > 3);
}

export default function Questions() {
  const { state, addQuestion, updateQuestion, deleteQuestion } = useProgress();
  const [text, setText] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [filter, setFilter] = useState<"ouvertes" | "resolues" | "toutes">("ouvertes");
  const [faqQ, setFaqQ] = useState("");
  const [faqMod, setFaqMod] = useState("tous");
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const list = state.questions.filter((q) => filter === "toutes" || (filter === "resolues" ? q.resolved : !q.resolved));

  const suggestions = useMemo(() => {
    const tk = tokens(text);
    if (tk.length === 0) return [];
    const score = (s: string) => tokens(s).filter((t) => tk.some((k) => t.startsWith(k) || k.startsWith(t))).length;
    const faq = FAQ.map((f) => ({ kind: "faq" as const, score: score(f.q + " " + f.a), f })).filter((x) => x.score > 0);
    const glo = GLOSSARY.map((g) => ({ kind: "glossaire" as const, score: score(g.term + " " + g.definition), g })).filter((x) => x.score > 0);
    return [...faq, ...glo].sort((a, b) => b.score - a.score).slice(0, 4);
  }, [text]);

  const faqList = FAQ.filter((f) => (faqMod === "tous" || f.moduleId === faqMod) && (!faqQ || `${f.q} ${f.a}`.toLowerCase().includes(faqQ.toLowerCase())));

  return (
    <>
      <PageHeader eyebrow="Espace questions" title="Vos questions et la FAQ du parcours"
        sub="Notez vos questions au fil des leçons, documentez la réponse une fois trouvée (formateur, documentation SAP Help, communauté) et marquez-les résolues. La FAQ regroupe les questions les plus fréquentes des candidats." />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Poser une question</p>
            <form className="mt-2 space-y-2" onSubmit={(e) => { e.preventDefault(); if (text.trim()) { addQuestion({ text: text.trim(), moduleId: moduleId || undefined }); setText(""); } }}>
              <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Ex. : dans quel cas choisir CIG plutôt que SAP Integration Suite pour un flux facture ?" className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#1B2B5E] focus:outline-none" />
              <div className="flex flex-wrap gap-2">
                <select value={moduleId} onChange={(e) => setModuleId(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-[#1B2B5E]">
                  <option value="">Module (facultatif)</option>
                  {MODULES.map((m) => <option key={m.id} value={m.id}>{m.short}</option>)}
                </select>
                <button type="submit" className={btn.primary} disabled={!text.trim()}>Enregistrer la question</button>
              </div>
            </form>
            {suggestions.length > 0 && (
              <div className="mt-3 rounded-xl bg-[#EEF1F8] p-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#1B2B5E]">Pistes de réponse dans le parcours</p>
                <ul className="mt-1 space-y-2 text-sm">
                  {suggestions.map((s, i) => (
                    <li key={i} className="rounded-lg bg-white p-2.5">
                      {s.kind === "faq" ? <><p className="font-semibold text-[#1B2B5E]">{s.f.q}</p><p className="mt-0.5 text-xs leading-5 text-slate-600">{s.f.a}</p></>
                        : <><p className="font-semibold text-[#1B2B5E]">Glossaire · {s.g.term}</p><p className="mt-0.5 text-xs leading-5 text-slate-600">{s.g.definition}</p></>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          <div className="mt-6 mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-bold text-[#1B2B5E]">Mes questions ({state.questions.length})</h2>
            <div className="flex gap-1 text-xs">
              {(["ouvertes", "resolues", "toutes"] as const).map((f) => (
                <button key={f} type="button" onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 font-semibold ${filter === f ? "bg-[#1B2B5E] text-white" : "border border-slate-300 bg-white text-[#1B2B5E]"}`}>{f === "ouvertes" ? "Ouvertes" : f === "resolues" ? "Résolues" : "Toutes"}</button>
              ))}
            </div>
          </div>

          {list.length === 0 ? (
            <EmptyState icon="💬" title={filter === "ouvertes" ? "Aucune question ouverte" : "Aucune question"} text="Les questions posées depuis une activité apparaissent ici." />
          ) : (
            <ul className="space-y-3">
              {list.map((q) => (
                <li key={q.id} className={`rounded-2xl border bg-white p-4 shadow-sm ${q.resolved ? "border-emerald-200" : "border-slate-200"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className={`font-semibold ${q.resolved ? "text-slate-500" : "text-[#1B2B5E]"}`}>{q.text}</p>
                      <p className="mt-1 flex flex-wrap gap-2 text-[11px] text-slate-500">
                        <span>{new Date(q.createdAt).toLocaleDateString("fr-FR")}</span>
                        {q.moduleId && MODULE_BY_ID[q.moduleId] && <span className="rounded-full bg-[#EEF1F8] px-2 py-0.5 font-semibold text-[#1B2B5E]">{MODULE_BY_ID[q.moduleId].short}</span>}
                        {q.activityId && ACTIVITY_BY_ID[q.activityId] && <Link href={activityHref(q.activityId)} className="underline hover:text-[#E8231A]">{ACTIVITY_BY_ID[q.activityId].title}</Link>}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button type="button" onClick={() => updateQuestion(q.id, { resolved: !q.resolved })} className={q.resolved ? btn.ghost : btn.secondary}>{q.resolved ? "Réouvrir" : "Résolue ✓"}</button>
                      <button type="button" onClick={() => deleteQuestion(q.id)} className={btn.ghost} aria-label="Supprimer">✕</button>
                    </div>
                  </div>
                  {editing === q.id ? (
                    <div className="mt-3">
                      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={4} placeholder="Réponse trouvée, source, lien SAP Help…" className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-[#1B2B5E] focus:outline-none" />
                      <div className="mt-2 flex gap-2">
                        <button type="button" onClick={() => { updateQuestion(q.id, { answer: draft.trim() || undefined, resolved: Boolean(draft.trim()) || q.resolved }); setEditing(null); }} className={btn.primary}>Enregistrer la réponse</button>
                        <button type="button" onClick={() => setEditing(null)} className={btn.ghost}>Annuler</button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3">
                      {q.answer ? <div className="rounded-xl bg-emerald-50 p-3 text-sm leading-6 text-slate-700"><span className="font-bold text-emerald-700">Réponse · </span>{q.answer}</div> : null}
                      <button type="button" onClick={() => { setEditing(q.id); setDraft(q.answer ?? ""); }} className={`${btn.ghost} mt-1`}>{q.answer ? "Modifier la réponse" : "Documenter la réponse"}</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-2">
          <Card>
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">FAQ du parcours ({FAQ.length})</p>
            <div className="mt-2 flex gap-2">
              <select value={faqMod} onChange={(e) => setFaqMod(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-2 py-2 text-xs font-semibold text-[#1B2B5E]">
                <option value="tous">Tous</option>
                {MODULES.map((m) => <option key={m.id} value={m.id}>{m.short}</option>)}
              </select>
              <input value={faqQ} onChange={(e) => setFaqQ(e.target.value)} placeholder="Rechercher…" className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-[#1B2B5E] focus:outline-none" />
            </div>
            <div className="mt-3 max-h-[70vh] space-y-2 overflow-y-auto pr-1">
              {faqList.map((f, i) => (
                <details key={i} className="group rounded-xl border border-slate-200 p-3">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-[#1B2B5E] group-open:text-[#E8231A]">
                    <span className="mr-2 inline-block rounded bg-[#EEF1F8] px-1.5 py-0.5 text-[10px] text-slate-600">{MODULE_BY_ID[f.moduleId]?.short}</span>{f.q}
                  </summary>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{f.a}</p>
                </details>
              ))}
              {faqList.length === 0 && <p className="text-sm text-slate-500">Aucune entrée.</p>}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
