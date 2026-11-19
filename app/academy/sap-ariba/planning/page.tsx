import { Suspense } from "react";
import Planning from "@/components/ariba/Planning";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-sm text-slate-500">Chargement du planning…</p>}>
      <Planning />
    </Suspense>
  );
}
