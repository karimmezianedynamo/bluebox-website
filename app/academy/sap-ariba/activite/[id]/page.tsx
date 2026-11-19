import { notFound } from "next/navigation";
import { ACTIVITIES, getActivity } from "@/lib/ariba/program";
import ActivityView from "@/components/ariba/ActivityView";

export function generateStaticParams() {
  return ACTIVITIES.map((a) => ({ id: a.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const activity = getActivity(id);
  if (!activity) notFound();
  return <ActivityView id={activity.id} />;
}
