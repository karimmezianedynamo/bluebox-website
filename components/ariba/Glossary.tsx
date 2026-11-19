"use client";

import { useState } from "react";
import { MODULES, MODULE_BY_ID } from "@/lib/ariba/modules";
import { GLOSSARY } from "@/lib/ariba/program";
import { Card, PageHeader } from "./ui";

export default function Glossary() {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState("tous");
  const list = GLOSSARY.filter((g) => (mod === "tous" || g.moduleId === mod) && (!q || `${g.term} ${g.definition}`.toLowerCase().includes(q.toLowerCase())));
  const letters = [...new Set(list.map((g) => g.term[0].toUpperCase()))];
  return (
    <>
      <PageHeader eyebrow="Référence" title="Glossaire SAP Ariba" sub={`${GLOSSARY.length} termes et acronymes du périmètre technico-fonctionnel, classés par ordre alphabétique.`}
        actions={
          <div className="flex gap-2">
            <select value={mod} onChange={(e) => setMod(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-[#1B2B5E]">
              <option value="tous">Tous les modules</option>
              {MODULES.map((m) => <option key={m.id} value={m.id}>{m.short}</option>)}
            </select>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un terme…" className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-[#1B2B5E] focus:outline-none" />
          </div>
        } />
      <div className="mb-4 flex flex-wrap gap-1 text-xs">
        {letters.map((l) => <a key={l} href={`#g-${l}`} className="rounded-md bg-white px-2 py-1 font-bold text-[#1B2B5E] shadow-sm hover:bg-[#EEF1F8]">{l}</a>)}
      </div>
      <Card>
        <dl className="divide-y divide-slate-100">
          {list.map((g, i) => {
            const letter = g.term[0].toUpperCase();
            const first = i === 0 || list[i - 1].term[0].toUpperCase() !== letter;
            return (
              <div key={`${g.moduleId}-${g.term}`} id={first ? `g-${letter}` : undefined} className="grid gap-1 py-3 sm:grid-cols-3">
                <dt className="font-semibold text-[#1B2B5E]">{g.term}<span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#EEF1F8] px-2 py-0.5 text-[10px] font-semibold text-slate-600"><span className={`h-1.5 w-1.5 rounded-full ${MODULE_BY_ID[g.moduleId]?.color}`} />{MODULE_BY_ID[g.moduleId]?.short}</span></dt>
                <dd className="text-sm leading-6 text-slate-600 sm:col-span-2">{g.definition}</dd>
              </div>
            );
          })}
        </dl>
        {list.length === 0 && <p className="text-sm text-slate-500">Aucun terme trouvé.</p>}
      </Card>
    </>
  );
}
