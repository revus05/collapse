"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppSelector } from "shared/lib/hooks";
import z from "zod";

export const createOrderSchema = z.object({
  phone: z.string().trim().min(1, "Телефон обязателен"),
  address: z.string().trim().min(1, "Адрес доставки обязателен"),
  comment: z.string().trim().optional(),
});

export type CreateOrderFormData = z.infer<typeof createOrderSchema>;

export const useCreateOrderForm = () => {
  const userPhone = useAppSelector((state) => state.userSlice.user?.phone);

  return useForm<CreateOrderFormData>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      phone: userPhone || "",
      address: "",
      comment: "",
    },
    mode: "onSubmit",
  });
};
