"use client";
import { ColumnDef, Row } from "@tanstack/react-table";

import DataTableRowActions from "@/components/careprovider/dashboard/dataTableRowAction";

interface request {
  id: string;
  requestDetails: string;
  requestId: string;
}

export const onRequest = (props: any) => {
  return props;
};

export const columns: ColumnDef<request>[] = [
  {
    accessorKey: "requestDetails",
    header: "Request Details",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} onRequest={onRequest} />,
  },
];
