"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { formatUserDate } from "entity/user";
import { Trash } from "lucide-react";
import type { OrderDTO, OrderStatus } from "shared/api";
import { colors, colorsHex } from "shared/constants/colors";
import { Button } from "shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "shared/ui/select";

const statusLabels: Record<OrderStatus, string> = {
  NEW: "Новый",
  PROCESSING: "В обработке",
  COMPLETED: "Выполнен",
  CANCELLED: "Отменён",
};

const statusOptions: OrderStatus[] = [
  "NEW",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
];

type UseOrderTableColumnsParams = {
  onDelete: (uuid: string) => void;
  onStatusChange: (uuid: string, status: OrderStatus) => void;
};

export const useOrderTableColumns = ({
  onDelete,
  onStatusChange,
}: UseOrderTableColumnsParams): ColumnDef<OrderDTO>[] => [
  {
    accessorKey: "createdAt",
    header: "Дата",
    size: 140,
    cell: ({ row }) => formatUserDate(row.original.createdAt),
  },
  {
    accessorKey: "user",
    header: "Покупатель",
    size: 220,
    cell: ({ row }) => {
      const user = row.original.user;
      const fullName = [user.lastName, user.firstName, user.middleName]
        .filter(Boolean)
        .join(" ");
      return (
        <div className="flex flex-col">
          <span>{fullName || "—"}</span>
          <span className="text-xs text-white/60">{user.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Телефон",
    size: 140,
  },
  {
    accessorKey: "address",
    header: "Адрес",
    size: 220,
    cell: ({ row }) => (
      <span className="whitespace-pre-wrap break-words">
        {row.original.address}
      </span>
    ),
  },
  {
    accessorKey: "orderItems",
    header: "Позиции",
    size: 280,
    cell: ({ row }) => {
      const items = row.original.orderItems;
      return (
        <details>
          <summary className="cursor-pointer">{items.length} шт.</summary>
          <ul className="mt-2 flex flex-col gap-2">
            {items.map((item) => (
              <li key={item.uuid} className="flex flex-col gap-1 text-xs">
                <span>
                  {item.product.title} × {item.quantity}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-white/60">Снаружи:</span>
                  <span
                    title={colors[item.outsideColor]}
                    className="size-3 rounded-full border border-white/20"
                    style={{ background: colorsHex[item.outsideColor] }}
                  />
                  <span className="text-white/60">Внутри:</span>
                  <span
                    title={colors[item.insideColor]}
                    className="size-3 rounded-full border border-white/20"
                    style={{ background: colorsHex[item.insideColor] }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </details>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Сумма",
    size: 120,
    cell: ({ row }) => (
      <span>
        {row.original.totalAmount} {row.original.currency}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Статус",
    size: 160,
    cell: ({ row }) => (
      <Select
        value={row.original.status}
        onValueChange={(value) =>
          onStatusChange(row.original.uuid, value as OrderStatus)
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              {statusLabels[status]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    accessorKey: "comment",
    header: "Комментарий",
    size: 200,
    cell: ({ row }) => row.original.comment || "—",
  },
  {
    accessorKey: "delete",
    header: "",
    size: 56,
    cell: ({ row }) => (
      <Button onClick={() => onDelete(row.original.uuid)}>
        <Trash />
      </Button>
    ),
  },
];
