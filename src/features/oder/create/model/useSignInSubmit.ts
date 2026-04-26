"use client";

import { useCreateOrderMutation } from "entity/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getApiError } from "shared/api";
import { paths } from "shared/navigation/paths";
import type { CreateOrderRequestDTO } from "shared/api";

export const useCreateOrderSubmit = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const router = useRouter();

  return {
    onSubmit: async (data: CreateOrderRequestDTO) => {
      try {
        await createOrder(data).unwrap();
        toast.success("Заказ оформлен", {
          description: "Мы свяжемся с вами по указанному телефону",
        });
        router.push(paths.profile);
      } catch (error) {
        const apiError = getApiError(error);
        toast.error("Не удалось оформить заказ", {
          description: apiError.message,
        });
      }
    },
    isLoading,
  };
};
