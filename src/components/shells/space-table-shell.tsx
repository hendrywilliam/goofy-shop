"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { type Space } from "@prisma/client";
import TableHostingData from "@/components/tables/table-hosting-data";

interface SpaceTableShellProps {
  data: Space[];
}

export default function SpaceTableShell({ data }: SpaceTableShellProps) {
  const column: ColumnDef<Space>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "createdAt",
      header: "Created at",
      cell: (info) => info.getValue(),
    },
  ];

  return <TableHostingData data={data} columns={column} />;
}
