"use client";

import { signIn, useUpdateMeMutation } from "entity/user";
import { useAppDispatch } from "shared/lib/hooks";
import type { UpdateProfileFormData } from "./schema";

export const useUpdateProfileSubmit = () => {
  const [updateMe, { isLoading }] = useUpdateMeMutation();
  const dispatch = useAppDispatch();

  return {
    isLoading,
    onSubmit: async (data: UpdateProfileFormData) => {
      try {
        const response = await updateMe({
          image: data.image,
          firstName: data.firstName,
          lastName: data.lastName,
          middleName: data.middleName,
          email: data.email,
          phone: data.phone,
          password: data.password || undefined,
          currency: data.currency,
        }).unwrap();

        dispatch(signIn(response.data));
      } catch (error) {
        console.error("Ошибка обновления профиля", error);
      }
    },
  };
};
