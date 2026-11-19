"use client";

import { useState } from "react";
import { MODULES } from "@/lib/ariba/modules";
import { USE_CASES } from "@/lib/ariba/program";
import { PageHeader } from "./ui";
import UseCaseCard from "./UseCaseCard";

export default function UseCases() {
  const [mod, setMod] = useState("tous");
  const [q, setQ] = useState("");
  const list = USE_CASES.filter((u) => (mod === "tous" || u.moduleId === mod) && (!q || `${u.title} ${u.client} ${u.situation} ${u.challenge}`.toLowerCase().includes(q.toLowerCase())));
  return (
    <>
      <PageHeader eyebrow="Terrain" title="Cas d'usage de consultant" sub="Des situations réelles de mission, avec l'enjeu, la démarche suivie par le consultant SAP Ariba et la leçon à en tirer. Idéal pour préparer un entretien ou une soutenance."
        actions={<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher…" className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-[#1B2B5E] focus:outline-none" />} />
      <div className="mb-6 flex flex-wrap gap-2">
        <button type="button" onClick={() => setMod("tous")} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${mod === "tous" ? "bg-[#1B2B5E] text-white" : "border border-slate-300 bg-white text-[#1B2B5E]"}`}>Tous ({USE_CASES.length})</button>
        {MODULES.map((m) => {
          const n = USE_CASES.filter((u) => u.moduleId === m.id).length;
          if (!n) return null;
          return <button key={m.id} type="button" onClick={() => setMod(m.id)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${mod === m.id ? "bg-[#1B2B5E] text-white" : "border border-slate-300 bg-white text-[#1B2B5E]"}`}>{m.short} ({n})</button>;
        })}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">{list.map((u) => <UseCaseCard key={u.id} useCase={u} />)}</div>
      {list.length === 0 && <p className="text-sm text-slate-500">Aucun cas ne correspond à votre recherche.</p>}
    </>
  );
}
