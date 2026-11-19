import type { UseCase } from "@/lib/ariba/types";
import { MODULE_BY_ID } from "@/lib/ariba/modules";

export default function UseCaseCard({ useCase: u }: { useCase: UseCase }) {
  const m = MODULE_BY_ID[u.moduleId];
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px]">
        {m && <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF1F8] px-2.5 py-0.5 font-semibold text-[#1B2B5E]"><span className={`h-2 w-2 rounded-full ${m.color}`} />{m.short}</span>}
        <span className="text-slate-500">{u.client}</span>
      </div>
      <h3 className="font-bold text-[#1B2B5E]">{u.title}</h3>
      <Section label="Situation">{u.situation}</Section>
      <Section label="Enjeu">{u.challenge}</Section>
      <div className="mt-3">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#E8231A]">Démarche du consultant</p>
        <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm leading-6 text-slate-700">
          {u.approach.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </div>
      <Section label="Résultat">{u.outcome}</Section>
      <div className="mt-3 rounded-xl bg-[#1B2B5E] px-4 py-3 text-sm leading-6 text-white">
        <span className="font-bold text-white/70">À retenir · </span>{u.lesson}
      </div>
    </article>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#E8231A]">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-700">{children}</p>
    </div>
  );
}
