"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { MODULE_BY_ID } from "@/lib/ariba/modules";
import { FINAL_CASE } from "@/lib/ariba/finalCase";
import { ACTIVITY_BY_ID, BASE, CONCEPTS, QUIZZES, activityHref, formatDuration } from "@/lib/ariba/program";
import { useProgress } from "@/lib/ariba/progress";
import { computeStats } from "@/lib/ariba/stats";
import { Card, PageHeader, ProgressBar, Ring, btn } from "./ui";

const CERTIFS = [
  { code: "C_ARP2P", name: "SAP Ariba Procurement (P2P)", modules: ["m2", "m7", "m9"] },
  { code: "C_ARSOR", name: "SAP Ariba Sourcing", modules: ["m3", "m4"] },
  { code: "C_ARCON", name: "SAP Ariba Contracts", modules: ["m5"] },
  { code: "C_ARSUM", name: "SAP Ariba Supplier Management (SLP)", modules: ["m5"] },
  { code: "C_ARCIG", name: "Intégration SAP Ariba / Managed Gateway (CIG)", modules: ["m6", "m8"] },
  { code: "C_ARCAT", name: "SAP Ariba Catalogs", modules: ["m7"] },
];

export default function Synthese() {
  const { state, exportJson, importJson, reset } = useProgress();
  const stats = useMemo(() => computeStats(state), [state]);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [importMsg, setImportMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const finalTasks = FINAL_CASE.phases.flatMap((p) => p.tasks);
  const finalDone = finalTasks.filter((t) => state.finalCase[t.id]).length;
  const finalPct = Math.round((finalDone / finalTasks.length) * 100);

  const weakQuizzes = QUIZZES.map((q) => {
    const attempts = state.quiz[q.id] ?? [];
    const best = attempts.length ? Math.max(...attempts.map((a) => a.score / a.total)) : null;
    return { q, best };
  }).filter((x) => x.best !== null && x.best < 0.8).sort((a, b) => (a.best ?? 0) - (b.best ?? 0)).slice(0, 8);

  const notTaken = QUIZZES.filter((q) => !(state.quiz[q.id]?.length));

  const plan = useMemo(() => buildPlan(stats, weakQuizzes.map((w) => w.q.id), notTaken.map((q) => q.id)), [stats, weakQuizzes, notTaken]);

  const markdown = useMemo(() => {
    const lines: string[] = [];
    lines.push(`# Synthèse de préparation à la certification SAP Ariba`);
    lines.push(`Générée le ${new Date().toLocaleDateString("fr-FR")} — BlueBox Academy`);
    lines.push("");
    lines.push(`## Indice de préparation : ${stats.readiness}% — ${stats.readinessLabel}`);
    lines.push(`- Parcours réalisé : ${stats.doneActivities}/${stats.totalActivities} activités (${stats.pct}%), ${formatDuration(stats.minutesDone)} sur ${formatDuration(stats.minutesTotal)}`);
    lines.push(`- Quiz : ${stats.quizTaken}/${stats.quizCount} passés, score moyen (meilleurs essais) ${stats.quizAvg ?? "—"}%`);
    lines.push(`- Cas final : ${finalDone}/${finalTasks.length} tâches (${finalPct}%)`);
    lines.push(`- Notions à revoir : ${stats.weakConcepts.length}`);
    lines.push("");
    lines.push(`## Couverture par module`);
    lines.push(`| Module | Avancement | Score quiz | Notions à revoir |`);
    lines.push(`|---|---|---|---|`);
    for (const m of stats.modules) lines.push(`| ${MODULE_BY_ID[m.moduleId].title} | ${m.pct}% | ${m.quizAvg === null ? "—" : m.quizAvg + "%"} | ${m.weakConcepts.length ? m.weakConcepts.join(", ") : "—"} |`);
    lines.push("");
    if (stats.weakConcepts.length) {
      lines.push(`## Notions à consolider en priorité`);
      for (const w of stats.weakConcepts) lines.push(`- ${w.concept} (${w.fails} erreur${w.fails > 1 ? "s" : ""}) — ${w.moduleIds.map((id) => MODULE_BY_ID[id]?.short).join(", ")}`);
      lines.push("");
    }
    lines.push(`## Plan de révision recommandé (7 jours)`);
    plan.forEach((p, i) => lines.push(`${i + 1}. **${p.title}** — ${p.items.join(" ; ")}`));
    lines.push("");
    lines.push(`## Certifications visées`);
    for (const c of CERTIFS) {
      const ms = stats.modules.filter((m) => c.modules.includes(m.moduleId));
      const pct = Math.round(ms.reduce((s, m) => s + m.pct, 0) / ms.length);
      const quiz = ms.filter((m) => m.quizAvg !== null);
      const qa = quiz.length ? Math.round(quiz.reduce((s, m) => s + (m.quizAvg ?? 0), 0) / quiz.length) : null;
      lines.push(`- ${c.code} — ${c.name} : modules couverts à ${pct}%, quiz ${qa === null ? "—" : qa + "%"}`);
    }
    return lines.join("\n");
  }, [stats, plan, finalDone, finalTasks.length, finalPct]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(markdown); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ignore */ }
  };

  const download = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `progression-sap-ariba-${new Date().toISOString().slice(0, 10)}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  const onImport = (f: File | undefined) => {
    if (!f) return;
    f.text().then((txt) => setImportMsg(importJson(txt) ? "Progression importée." : "Fichier invalide."));
  };

  return (
    <>
      <PageHeader eyebrow="Certification" title="Synthèse de préparation à la certification"
        sub="Générée à partir de votre progression, de vos scores aux quiz, de vos notions à revoir et de l'avancement du cas final. Utilisez-la pour cibler vos dernières révisions."
        actions={
          <>
            <button type="button" onClick={() => setGenerated(true)} className={btn.primary}>{generated ? "Actualiser la synthèse" : "Générer ma synthèse"}</button>
            {generated && <button type="button" onClick={() => window.print()} className={btn.secondary}>Imprimer / PDF</button>}
            {generated && <button type="button" onClick={copy} className={btn.secondary}>{copied ? "Copié ✓" : "Copier en Markdown"}</button>}
          </>
        } />

      {!generated ? (
        <Card className="text-center">
          <Ring value={stats.readiness} size={140} label="préparation" />
          <p className="mt-3 text-lg font-bold text-[#1B2B5E]">{stats.readinessLabel}</p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
            L’indice combine l’avancement du parcours (45 %), vos meilleurs scores aux quiz pondérés par le nombre de quiz passés (55 %), moins une pénalité pour les notions non maîtrisées. Cliquez sur « Générer ma synthèse » pour obtenir le bilan détaillé et le plan de révision.
          </p>
          <button type="button" onClick={() => setGenerated(true)} className={`${btn.primary} mt-5`}>Générer ma synthèse</button>
        </Card>
      ) : (
        <div className="print-area space-y-6">
          <Card className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
            <Ring value={stats.readiness} size={140} label="préparation" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Indice de préparation</p>
              <h2 className="text-2xl font-bold text-[#1B2B5E]">{stats.readinessLabel}</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-4 text-sm">
                <Kpi l="Parcours" v={`${stats.pct}%`} h={`${stats.doneActivities}/${stats.totalActivities} activités`} />
                <Kpi l="Quiz" v={stats.quizAvg === null ? "—" : `${stats.quizAvg}%`} h={`${stats.quizTaken}/${stats.quizCount} passés`} />
                <Kpi l="Cas final" v={`${finalPct}%`} h={`${finalDone}/${finalTasks.length} tâches`} />
                <Kpi l="À revoir" v={String(stats.weakConcepts.length)} h="notions" />
              </div>
              <p className="mt-3 text-xs text-slate-500">Généré le {new Date().toLocaleDateString("fr-FR")} à {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}. Rythme : {stats.activeDays} jour{stats.activeDays > 1 ? "s" : ""} actif{stats.activeDays > 1 ? "s" : ""}, série en cours de {stats.streakDays} jour{stats.streakDays > 1 ? "s" : ""}.</p>
            </div>
          </Card>

          <Card>
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Couverture par module</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-slate-500"><tr><th className="py-2">Module</th><th className="py-2">Avancement</th><th className="py-2">Quiz</th><th className="py-2">Verdict</th></tr></thead>
                <tbody>
                  {stats.modules.map((m) => {
                    const meta = MODULE_BY_ID[m.moduleId];
                    const verdict = m.pct < 50 ? "À poursuivre" : m.quizAvg === null ? "Quiz à passer" : m.quizAvg >= 80 && m.weakConcepts.length === 0 ? "Acquis" : m.quizAvg >= 65 ? "À consolider" : "À retravailler";
                    const vc = verdict === "Acquis" ? "text-emerald-700 bg-emerald-50" : verdict === "À consolider" || verdict === "Quiz à passer" ? "text-amber-700 bg-amber-50" : "text-[#C41C14] bg-[#FFF5F4]";
                    return (
                      <tr key={m.moduleId} className="border-t border-slate-100">
                        <td className="py-2 pr-3"><Link href={`${BASE}/modules/${meta.slug}`} className="flex items-center gap-2 font-semibold text-[#1B2B5E] hover:text-[#E8231A]"><span className={`h-2.5 w-2.5 rounded-full ${meta.color}`} />{meta.title}</Link></td>
                        <td className="py-2 pr-3 w-40"><div className="flex items-center gap-2"><ProgressBar value={m.pct} className="w-24" color={meta.color} /><span className="text-xs text-slate-600">{m.pct}%</span></div></td>
                        <td className="py-2 pr-3 text-slate-700">{m.quizAvg === null ? "—" : `${m.quizAvg}%`} <span className="text-xs text-slate-400">({m.quizTaken}/{m.quizCount})</span></td>
                        <td className="py-2"><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${vc}`}>{verdict}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Notions à consolider en priorité</p>
              {stats.weakConcepts.length === 0 ? <p className="mt-2 text-sm text-slate-600">Aucune notion en attente : toutes vos erreurs ont été revues ou vous n’en avez pas commis.</p> : (
                <ul className="mt-2 space-y-2">
                  {stats.weakConcepts.slice(0, 12).map((w) => (
                    <li key={w.concept} className="flex items-start justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                      <div>
                        <p className="font-semibold text-[#1B2B5E]">{w.concept}</p>
                        <p className="text-xs text-slate-500">{w.moduleIds.map((id) => MODULE_BY_ID[id]?.short).join(", ")}{CONCEPTS[w.concept]?.lessonIds[0] && <> · <Link className="underline" href={activityHref(CONCEPTS[w.concept].lessonIds[0])}>relire la leçon</Link></>}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-[#FFF5F4] px-2 py-0.5 text-xs font-bold text-[#C41C14]">{w.fails}×</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link href={`${BASE}/revision`} className={`${btn.ghost} mt-3`}>Ouvrir la liste complète →</Link>
            </Card>

            <Card>
              <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Quiz à refaire (score &lt; 80 %)</p>
              {weakQuizzes.length === 0 ? <p className="mt-2 text-sm text-slate-600">Aucun quiz sous 80 % parmi ceux passés.</p> : (
                <ul className="mt-2 space-y-2">
                  {weakQuizzes.map(({ q, best }) => (
                    <li key={q.id}>
                      <Link href={activityHref(q.id)} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm hover:border-[#E8231A]/40">
                        <span className="font-semibold text-[#1B2B5E]">{q.title}<span className="block text-xs font-normal text-slate-500">S{q.week} J{q.day} · {MODULE_BY_ID[q.moduleId]?.short}</span></span>
                        <span className="shrink-0 text-xs font-bold text-[#C41C14]">{Math.round((best ?? 0) * 100)}%</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {notTaken.length > 0 && <p className="mt-3 text-xs text-slate-500">{notTaken.length} quiz n’ont pas encore été passés.</p>}
            </Card>
          </div>

          <Card>
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Plan de révision recommandé — 7 jours</p>
            <ol className="mt-3 grid gap-3 md:grid-cols-2">
              {plan.map((p, i) => (
                <li key={i} className="rounded-xl border border-slate-200 p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Jour {i + 1}</p>
                  <p className="font-bold text-[#1B2B5E]">{p.title}</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 marker:text-[#E8231A]">
                    {p.items.map((it, j) => <li key={j}>{it}</li>)}
                    {p.links?.map((l) => ACTIVITY_BY_ID[l] && <li key={l}><Link href={activityHref(l)} className="underline hover:text-[#E8231A]">{ACTIVITY_BY_ID[l].title}</Link></li>)}
                  </ul>
                </li>
              ))}
            </ol>
          </Card>

          <Card>
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8231A]">Certifications SAP visées et couverture</p>
            <p className="mt-1 text-xs text-slate-500">Les examens SAP Certified Associate comportent généralement 80 questions en 180 minutes ; vérifiez le format, le seuil de réussite et les thèmes à jour sur SAP Learning avant de vous inscrire.</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {CERTIFS.map((c) => {
                const ms = stats.modules.filter((m) => c.modules.includes(m.moduleId));
                const pct = Math.round(ms.reduce((s, m) => s + m.pct, 0) / ms.length);
                const quiz = ms.filter((m) => m.quizAvg !== null);
                const qa = quiz.length ? Math.round(quiz.reduce((s, m) => s + (m.quizAvg ?? 0), 0) / quiz.length) : null;
                return (
                  <div key={c.code} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-center justify-between"><p className="font-bold text-[#1B2B5E]">{c.code}</p><span className="text-xs text-slate-500">{c.modules.map((m) => MODULE_BY_ID[m]?.short).join(" + ")}</span></div>
                    <p className="text-sm text-slate-600">{c.name}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs"><ProgressBar value={pct} className="flex-1" /><span className="text-slate-600">{pct}%</span><span className="text-slate-400">· quiz {qa === null ? "—" : `${qa}%`}</span></div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="print:hidden">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Sauvegarde de la progression</p>
            <p className="mt-1 text-sm text-slate-600">Votre progression est stockée dans ce navigateur. Exportez-la pour la conserver ou la transférer sur un autre appareil.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={download} className={btn.secondary}>Exporter (JSON)</button>
              <button type="button" onClick={() => fileRef.current?.click()} className={btn.secondary}>Importer un fichier</button>
              <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => onImport(e.target.files?.[0])} />
              <button type="button" onClick={() => { if (window.confirm("Réinitialiser toute la progression ? Cette action est irréversible.")) reset(); }} className={btn.danger}>Réinitialiser</button>
            </div>
            {importMsg && <p className="mt-2 text-xs text-slate-600">{importMsg}</p>}
          </Card>
        </div>
      )}
    </>
  );
}

function Kpi({ l, v, h }: { l: string; v: string; h: string }) {
  return (
    <div className="rounded-xl bg-[#EEF1F8] p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{l}</p>
      <p className="text-lg font-bold text-[#1B2B5E]">{v}</p>
      <p className="text-[11px] text-slate-500">{h}</p>
    </div>
  );
}

interface PlanDay { title: string; items: string[]; links?: string[] }

function buildPlan(stats: ReturnType<typeof computeStats>, weakQuizIds: string[], notTakenIds: string[]): PlanDay[] {
  const weakMods = [...stats.modules].filter((m) => m.quizAvg !== null && m.quizAvg < 80).sort((a, b) => (a.quizAvg ?? 0) - (b.quizAvg ?? 0));
  const unfinished = stats.modules.filter((m) => m.pct < 100);
  const concepts = stats.weakConcepts;
  const days: PlanDay[] = [];

  if (unfinished.length) {
    days.push({ title: "Terminer le parcours", items: unfinished.slice(0, 3).map((m) => `${MODULE_BY_ID[m.moduleId].short} : ${m.total - m.done} activité${m.total - m.done > 1 ? "s" : ""} restante${m.total - m.done > 1 ? "s" : ""}`) });
  }
  if (concepts.length) {
    days.push({ title: "Revoir les notions ratées", items: concepts.slice(0, 5).map((c) => c.concept), links: concepts.slice(0, 2).map((c) => CONCEPTS[c.concept]?.lessonIds[0]).filter((x): x is string => Boolean(x)) });
  }
  for (const m of weakMods.slice(0, 2)) {
    days.push({ title: `Consolider ${MODULE_BY_ID[m.moduleId].short}`, items: [`Relire les leçons du module (score quiz ${m.quizAvg}%)`, ...(m.weakConcepts.slice(0, 3))] });
  }
  if (weakQuizIds.length || notTakenIds.length) {
    days.push({ title: "Refaire les quiz", items: [weakQuizIds.length ? `${weakQuizIds.length} quiz sous 80 %` : "", notTakenIds.length ? `${notTakenIds.length} quiz jamais passés` : ""].filter(Boolean), links: [...weakQuizIds.slice(0, 2), ...notTakenIds.slice(0, 1)] });
  }
  days.push({ title: "Intégration et cXML", items: ["Redessiner de mémoire l'architecture S/4HANA ↔ CIG ↔ Business Network", "Relire un OrderRequest et un InvoiceDetailRequest et nommer chaque bloc", "Lister les causes d'erreur mapping / connectivité / métier"] });
  days.push({ title: "Cas final et soutenance", items: ["Finaliser les phases du cas final non terminées", "Présenter l'architecture à voix haute en 10 minutes", "Vérifier le format officiel de l'examen sur SAP Learning"] });
  days.push({ title: "Examen blanc", items: ["Passer l'examen blanc de la semaine 8 en conditions réelles", "Analyser chaque erreur avec la correction détaillée", "Mettre à jour la liste des notions maîtrisées"] });
  return days.slice(0, 7);
}
