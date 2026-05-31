import type { Metadata } from "next";
import { ActivitiesFeed } from "@/features/crm/activities-feed";

export const metadata: Metadata = { title: "Activities" };

export default function ActivitiesPage() {
  return <ActivitiesFeed />;
}
