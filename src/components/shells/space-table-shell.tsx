"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { type Space } from "@prisma/client";
import TableHostingData from "@/components/table/table-hosting-data";

interface SpaceTableShellProps {
  data: Space[];
}

export default function SpaceTableShell({ data }: SpaceTableShellProps) {
  //@ts-ignore
  const column: ColumnDef<Space>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "latitude",
      header: "Latitude",
      cell: (info) => info.getValue(),
    },
  ];

  return (
    <div>
      <TableHostingData data={data} columns={column} />
    </div>
  );
}
