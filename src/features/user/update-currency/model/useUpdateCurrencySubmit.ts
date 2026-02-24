"use client";

import { useUpdateCurrencyMutation } from "entity/user";
import { updateUserCurrency } from "entity/user/model";
import { useAppDispatch } from "shared/lib/hooks";

export const useUpdateCurrencySubmit = () => {
  const [updateCurrency, { isLoading }] = useUpdateCurrencyMutation();
  const dispatch = useAppDispatch();

  return {
    onSubmit: async (data: { currency: "BYN" | "RUB" }) => {
      try {
        dispatch(updateUserCurrency(data.currency));
        const res = await updateCurrency(data).unwrap();
        if (res?.data) {
          dispatch(updateUserCurrency(res.data.currency));
        }
      } catch (error) {
        console.error(error);
      }
    },
    isLoading,
  };
};
