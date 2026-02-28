"use client";

import { useCreateOrderMutation } from "entity/order";
import type { CreateOrderRequestDTO } from "shared/api";

export const useCreateOrderSubmit = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  return {
    onSubmit: async (data: CreateOrderRequestDTO) => {
      try {
        const res = await createOrder(data).unwrap();
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    },
    isLoading,
  };
};
