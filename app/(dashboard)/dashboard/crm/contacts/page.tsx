import type { Metadata } from "next";
import { ContactsTable } from "@/features/crm/contacts-table";

export const metadata: Metadata = { title: "Contacts" };

export default function ContactsPage() {
  return <ContactsTable />;
}
