import type { ReactNode } from "react";

/** Rendu d'un markdown simplifié (voir lib/ariba/types.ts). */

function inline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) out.push(<strong key={`${keyPrefix}-b${k++}`} className="font-semibold text-[#1B2B5E]">{tok.slice(2, -2)}</strong>);
    else out.push(<code key={`${keyPrefix}-c${k++}`} className="rounded bg-[#EEF1F8] px-1.5 py-0.5 font-mono text-[0.85em] text-[#1B2B5E]">{tok.slice(1, -1)}</code>);
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Markdown({ text, className = "" }: { text: string; className?: string }) {
  const lines = text.replace(/\r/g, "").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    // bloc de code
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) { code.push(lines[i]); i++; }
      i++;
      blocks.push(
        <pre key={key++} className="my-4 overflow-x-auto rounded-xl bg-[#0F1A3A] p-4 text-[13px] leading-relaxed text-slate-100" data-lang={lang}>
          <code>{code.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // titres
    if (/^#{1,4}\s/.test(trimmed)) {
      const level = trimmed.match(/^#+/)![0].length;
      const content = trimmed.replace(/^#+\s*/, "");
      const cls = level <= 2 ? "mt-7 mb-3 text-lg font-bold text-[#1B2B5E]" : "mt-5 mb-2 text-base font-bold text-[#1B2B5E]";
      blocks.push(<h3 key={key++} className={cls}>{inline(content, `h${key}`)}</h3>);
      i++;
      continue;
    }

    // encadré
    if (trimmed.startsWith(">")) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) { parts.push(lines[i].trim().replace(/^>\s?/, "")); i++; }
      blocks.push(
        <div key={key++} className="my-4 rounded-r-xl border-l-4 border-[#E8231A] bg-[#FFF5F4] px-4 py-3 text-sm leading-6 text-slate-700">
          {inline(parts.join(" "), `q${key}`)}
        </div>
      );
      continue;
    }

    // tableau
    if (trimmed.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i].trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head, ...body] = rows;
      blocks.push(
        <div key={key++} className="my-4 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            {head && (
              <thead className="bg-[#EEF1F8] text-xs uppercase tracking-wide text-[#1B2B5E]">
                <tr>{head.map((c, ci) => <th key={ci} className="px-3 py-2 font-bold">{inline(c, `th${key}-${ci}`)}</th>)}</tr>
              </thead>
            )}
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri} className="border-t border-slate-100 odd:bg-white even:bg-slate-50/60">
                  {r.map((c, ci) => <td key={ci} className="px-3 py-2 align-top text-slate-700">{inline(c, `td${key}-${ri}-${ci}`)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // listes
    if (/^([-*•]|\d+[.)])\s/.test(trimmed)) {
      const ordered = /^\d/.test(trimmed);
      const items: string[] = [];
      while (i < lines.length && /^([-*•]|\d+[.)])\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^([-*•]|\d+[.)])\s+/, ""));
        i++;
        // continuation de ligne indentée
        while (i < lines.length && lines[i].startsWith("  ") && lines[i].trim() && !/^([-*•]|\d+[.)])\s/.test(lines[i].trim())) {
          items[items.length - 1] += " " + lines[i].trim();
          i++;
        }
      }
      const Tag = ordered ? "ol" : "ul";
      blocks.push(
        <Tag key={key++} className={`my-3 space-y-1.5 pl-5 text-sm leading-6 text-slate-700 ${ordered ? "list-decimal" : "list-disc marker:text-[#E8231A]"}`}>
          {items.map((it, ii) => <li key={ii}>{inline(it, `li${key}-${ii}`)}</li>)}
        </Tag>
      );
      continue;
    }

    // paragraphe
    const para: string[] = [trimmed];
    i++;
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|>|\||```|([-*•]|\d+[.)])\s)/.test(lines[i].trim())) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push(<p key={key++} className="my-3 text-sm leading-7 text-slate-700">{inline(para.join(" "), `p${key}`)}</p>);
  }

  return <div className={`ariba-md ${className}`}>{blocks}</div>;
}
