"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { formatUserDate } from "entity/user";
import { Trash } from "lucide-react";
import Image from "next/image";
import type { UserDTO } from "shared/api";
import { Button } from "shared/ui/button";

type UseUserTableColumnsParams = {
  onDelete: (uuid: string) => void;
};

export const useUserTableColumns = ({
  onDelete,
}: UseUserTableColumnsParams): ColumnDef<UserDTO>[] => [
  {
    accessorKey: "image",
    header: "Фото",
    size: 88,
    cell: ({ row }) => {
      const image = row.original.image;
      const fullName = [
        row.original.lastName,
        row.original.firstName,
        row.original.middleName,
      ]
        .filter(Boolean)
        .join(" ");

      if (!image) {
        return <div className="size-14 rounded-full bg-muted" />;
      }

      return (
        <Image
          src={image}
          alt={fullName || row.original.email}
          width={56}
          height={56}
          className="size-14 rounded-full object-cover"
        />
      );
    },
  },
  {
    accessorKey: "lastName",
    header: "ФИО",
    size: 220,
    cell: ({ row }) =>
      [row.original.lastName, row.original.firstName, row.original.middleName]
        .filter(Boolean)
        .join(" "),
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 220,
  },
  {
    accessorKey: "phone",
    header: "Телефон",
    size: 160,
  },
  {
    accessorKey: "role",
    header: "Роль",
    size: 100,
  },
  {
    accessorKey: "currency",
    header: "Валюта",
    size: 100,
  },
  {
    accessorKey: "createdAt",
    header: "Создан",
    size: 160,
    cell: ({ row }) => <span>{formatUserDate(row.original.createdAt)}</span>,
  },
  {
    accessorKey: "updatedAt",
    header: "Обновлен",
    size: 160,
    cell: ({ row }) => <span>{formatUserDate(row.original.updatedAt)}</span>,
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
