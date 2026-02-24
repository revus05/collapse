"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "entity/product";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import type { ProductDTO } from "shared/api";
import { paths } from "shared/navigation/paths";
import { Button } from "shared/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shared/ui/table";

export const ProductList = () => {
  const router = useRouter();

  const { data: response } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const columns: ColumnDef<ProductDTO>[] = [
    {
      accessorKey: "images",
      header: "Картинки",
      size: 100,
      cell: ({ row }) => {
        const images = row.original.images;
        const title = row.original.title;

        return (
          <Image
            src={images[0]}
            alt={`${title} image`}
            width={100}
            height={200}
          />
        );
      },
    },
    {
      accessorKey: "title",
      header: "Название",
    },
    {
      accessorKey: "description",
      header: "Описание",
      size: 420,
      cell: ({ row }) => (
        <p className="line-clamp-5 whitespace-break-spaces wrap-break-word">
          {row.original.description || "—"}
        </p>
      ),
    },
    {
      accessorKey: "priceBYN",
      header: "Цена BYN",
      size: 100,
    },
    {
      accessorKey: "discountPriceBYN",
      header: "Скидка BYN",
      size: 100,
      cell: ({ row }) => <span>{row.original.discountPriceBYN || "—"}</span>,
    },
    {
      accessorKey: "priceRUB",
      header: "Цена RUB",
      size: 100,
    },
    {
      accessorKey: "discountPriceRUB",
      header: "Скидка RUB",
      size: 100,
      cell: ({ row }) => <span>{row.original.discountPriceRUB || "—"}</span>,
    },
    {
      accessorKey: "delete",
      header: "",
      size: 56,
      cell: ({ row }) => (
        <Button onClick={(e) => handleProductDelete(e, row.original.uuid)}>
          <Trash />
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: response?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (uuid: string) => {
    router.push(`${paths.product}/${uuid}`);
  };

  const handleProductDelete = (e: React.MouseEvent, uuid: string) => {
    e.stopPropagation();
    deleteProduct(uuid);
  };

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
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => handleRowClick(row.original.uuid)}
                className="cursor-pointer"
              >
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
