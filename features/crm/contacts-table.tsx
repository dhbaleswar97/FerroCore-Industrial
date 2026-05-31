"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_CONTACTS } from "@/data/mock-crm";
import { formatDate, getInitials } from "@/lib/utils";
import type { Contact } from "@/types/crm";
import { Plus } from "lucide-react";

export function ContactsTable() {
  const columns = useMemo<ColumnDef<Contact, unknown>[]>(
    () => [
      {
        id: "name",
        header: "Contact",
        accessorKey: "fullName",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={row.original.avatar} alt={row.original.fullName} />
              <AvatarFallback>{getInitials(row.original.fullName)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{row.original.fullName}</p>
              <p className="text-xs text-muted-foreground">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <Badge variant={row.original.status === "active" ? "success" : "muted"}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        id: "lastContacted",
        header: "Last Contacted",
        accessorKey: "lastContactedAt",
        cell: ({ row }) =>
          row.original.lastContactedAt
            ? formatDate(row.original.lastContactedAt, "relative")
            : "—",
      },
      {
        id: "tags",
        header: "Tags",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="muted" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Contacts</h1>
          <p className="mt-1 text-muted-foreground">{MOCK_CONTACTS.length} contacts total</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Add Contact
        </Button>
      </div>
      <DataTable columns={columns} data={MOCK_CONTACTS} searchKey="fullName" />
    </div>
  );
}
