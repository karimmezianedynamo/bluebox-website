import { notFound } from "next/navigation";
import { MODULES } from "@/lib/ariba/modules";
import ModuleDetail from "@/components/ariba/ModuleDetail";

export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = MODULES.find((m) => m.slug === slug);
  if (!mod) notFound();
  return <ModuleDetail moduleId={mod.id} />;
}
