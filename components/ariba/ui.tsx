"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { Activity, Level } from "@/lib/ariba/types";
import { KIND_LABEL, LEVEL_LABEL, MODULE_BY_ID } from "@/lib/ariba/modules";
import { activityHref, formatDuration } from "@/lib/ariba/program";
import { useProgress } from "@/lib/ariba/progress";

export const LEVEL_CLASS: Record<Level, string> = {
  debutant: "bg-emerald-50 text-emerald-700 border-emerald-200",
  intermediaire: "bg-amber-50 text-amber-700 border-amber-200",
  avance: "bg-red-50 text-[#C41C14] border-red-200",
};

export const KIND_CLASS: Record<string, string> = {
  lecon: "bg-sky-50 text-sky-700 border-sky-200",
  exercice: "bg-indigo-50 text-indigo-700 border-indigo-200",
  simulation: "bg-violet-50 text-violet-700 border-violet-200",
  quiz: "bg-[#FFF5F4] text-[#C41C14] border-red-200",
  cas: "bg-[#EEF1F8] text-[#1B2B5E] border-slate-200",
};

export const KIND_ICON: Record<string, string> = {
  lecon: "📘",
  exercice: "🛠️",
  simulation: "🎭",
  quiz: "❓",
  cas: "🧩",
};

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${className}`}>{children}</span>;
}

export function LevelBadge({ level }: { level: Level }) {
  return <Badge className={LEVEL_CLASS[level]}>{LEVEL_LABEL[level]}</Badge>;
}

export function KindBadge({ kind }: { kind: string }) {
  return <Badge className={KIND_CLASS[kind] ?? ""}>{KIND_ICON[kind]} {KIND_LABEL[kind]}</Badge>;
}

export function ModuleBadge({ moduleId }: { moduleId: string }) {
  const m = MODULE_BY_ID[moduleId];
  if (!m) return null;
  return (
    <Badge className="border-slate-200 bg-white text-slate-600">
      <span className={`inline-block h-2 w-2 rounded-full ${m.color}`} /> {m.short}
    </Badge>
  );
}

export function ProgressBar({ value, className = "", color = "bg-[#E8231A]" }: { value: number; className?: string; color?: string }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-200 ${className}`} role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${v}%` }} />
    </div>
  );
}

export function Ring({ value, size = 96, stroke = 9, label }: { value: number; size?: number; stroke?: number; label?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E2E8F0" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E8231A" strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (v / 100) * c} className="transition-all duration-700" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-[#1B2B5E]">{Math.round(v)}%</span>
        {label && <span className="text-[10px] uppercase tracking-wide text-slate-500">{label}</span>}
      </div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</div>;
}

export function PageHeader({ eyebrow, title, sub, actions }: { eyebrow?: string; title: string; sub?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#E8231A]">{eyebrow}</p>}
        <h1 className="text-2xl font-bold tracking-tight text-[#1B2B5E] md:text-3xl">{title}</h1>
        {sub && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function DoneCheck({ id, size = "md" }: { id: string; size?: "sm" | "md" }) {
  const { isDone, setDone } = useProgress();
  const done = isDone(id);
  const dim = size === "sm" ? "h-5 w-5 text-[11px]" : "h-7 w-7 text-sm";
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDone(id, !done); }}
      aria-pressed={done}
      aria-label={done ? "Marquer comme non fait" : "Marquer comme fait"}
      title={done ? "Fait — cliquer pour annuler" : "Marquer comme fait"}
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 font-bold transition-colors ${dim} ${done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 bg-white text-transparent hover:border-[#E8231A]"}`}
    >
      ✓
    </button>
  );
}

export function ActivityRow({ activity, showDay = false, compact = false }: { activity: Activity; showDay?: boolean; compact?: boolean }) {
  const { isDone, bestScore } = useProgress();
  const done = isDone(activity.id);
  const best = activity.kind === "quiz" ? bestScore(activity.id) : undefined;
  return (
    <Link href={activityHref(activity.id)}
      className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all hover:border-[#E8231A]/40 hover:shadow-sm ${done ? "border-emerald-200 bg-emerald-50/40" : "border-slate-200 bg-white"}`}>
      <DoneCheck id={activity.id} size="sm" />
      <span className="text-lg leading-none" aria-hidden>{KIND_ICON[activity.kind]}</span>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-semibold ${done ? "text-slate-500 line-through decoration-emerald-400" : "text-[#1B2B5E] group-hover:text-[#E8231A]"}`}>{activity.title}</p>
        {!compact && (
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500">
            <span>{KIND_LABEL[activity.kind]}</span>
            <span>·</span>
            <span>{formatDuration(activity.durationMin)}</span>
            {showDay && <><span>·</span><span>S{activity.week} J{activity.day}</span></>}
            {best && <><span>·</span><span className="font-semibold text-[#1B2B5E]">Meilleur score {best.score}/{best.total}</span></>}
          </p>
        )}
      </div>
      <LevelBadge level={activity.level} />
    </Link>
  );
}

export function EmptyState({ icon = "✨", title, text, action }: { icon?: string; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-8 text-center">
      <div className="text-3xl">{icon}</div>
      <p className="mt-2 font-semibold text-[#1B2B5E]">{title}</p>
      {text && <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">{text}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export const btn = {
  primary: "inline-flex items-center justify-center gap-2 rounded-xl bg-[#E8231A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#C41C14] disabled:cursor-not-allowed disabled:opacity-50",
  secondary: "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-[#1B2B5E] transition-colors hover:border-[#1B2B5E] hover:bg-[#EEF1F8]",
  ghost: "inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#1B2B5E] transition-colors hover:bg-[#EEF1F8]",
  danger: "inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#C41C14] transition-colors hover:bg-red-50",
};
