"use client";

import { flexRender } from "@tanstack/react-table";
import { useGetAllOrdersForAdminQuery } from "entity/order";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shared/ui/table";
import { useOrdersTable } from "./model/useOrdersTable";
import { useOrdersTableActions } from "./model/useOrdersTableActions";
import { useOrderTableColumns } from "./model/useOrderTableColumns";

export const OrderList = () => {
  const { data: response } = useGetAllOrdersForAdminQuery();
  const { handleOrderDelete, handleStatusChange } = useOrdersTableActions();
  const columns = useOrderTableColumns({
    onDelete: handleOrderDelete,
    onStatusChange: handleStatusChange,
  });

  const table = useOrdersTable({
    data: response?.data || [],
    columns,
  });

  if (!response) return null;

  return (
    <div className="border w-full">
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
              <TableCell colSpan={columns.length}>Нет заказов.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
