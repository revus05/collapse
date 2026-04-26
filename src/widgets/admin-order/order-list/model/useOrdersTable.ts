"use client";

import {
  getCoreRowModel,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import type { OrderDTO } from "shared/api";

type UseOrdersTableParams = Pick<TableOptions<OrderDTO>, "columns" | "data">;

export const useOrdersTable = ({ columns, data }: UseOrdersTableParams) =>
  useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
