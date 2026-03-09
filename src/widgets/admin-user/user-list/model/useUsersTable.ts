"use client";

import {
  getCoreRowModel,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import type { UserDTO } from "shared/api";

type UseUsersTableParams = Pick<TableOptions<UserDTO>, "columns" | "data">;

export const useUsersTable = ({ columns, data }: UseUsersTableParams) =>
  useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
