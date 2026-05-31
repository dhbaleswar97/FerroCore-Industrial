import type { Metadata } from "next";
import { SystemGuide } from "@/components/marketing/system-guide";

export const metadata: Metadata = {
  title: "User Manual & System Guide",
  description:
    "Complete interactive guide to the FerroCore Industrial Platform — covering platform overview, user roles, CRM workflows, lead management, admin operations, and daily best practices.",
};

export default function GuidePage() {
  return <SystemGuide />;
}
