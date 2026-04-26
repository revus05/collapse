"use client";

import {
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "entity/order";
import { toast } from "sonner";
import { getApiError, type OrderStatus } from "shared/api";

export const useOrdersTableActions = () => {
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateStatus] = useUpdateOrderStatusMutation();

  return {
    handleOrderDelete: async (uuid: string) => {
      try {
        await deleteOrder(uuid).unwrap();
        toast.success("Заказ удалён");
      } catch (error) {
        const apiError = getApiError(error);
        toast.error("Не удалось удалить заказ", {
          description: apiError.message,
        });
      }
    },
    handleStatusChange: async (uuid: string, status: OrderStatus) => {
      try {
        await updateStatus({ uuid, body: { status } }).unwrap();
        toast.success("Статус обновлён");
      } catch (error) {
        const apiError = getApiError(error);
        toast.error("Не удалось обновить статус", {
          description: apiError.message,
        });
      }
    },
  };
};
