"use client";

import { flexRender } from "@tanstack/react-table";
import { useGetAllUsersByAdminQuery } from "entity/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shared/ui/table";
import { useUsersTable } from "./model/useUsersTable";
import { useUsersTableActions } from "./model/useUsersTableActions";
import { useUserTableColumns } from "./model/useUserTableColumns";

export const UserList = () => {
  const { data: response } = useGetAllUsersByAdminQuery();
  const { handleUserDelete } = useUsersTableActions();
  const columns = useUserTableColumns({ onDelete: handleUserDelete });

  const table = useUsersTable({
    data: response?.data || [],
    columns,
  });

  if (!response) return null;

  return (
    <div className="border">
      <Table className="table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} style={{ width: header.getSize() }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    ) || "—"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
