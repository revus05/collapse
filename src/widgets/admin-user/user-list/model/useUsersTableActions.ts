"use client";

import { useDeleteUserByAdminMutation } from "entity/user";

export const useUsersTableActions = () => {
  const [deleteUser] = useDeleteUserByAdminMutation();

  return {
    handleUserDelete: async (uuid: string) => {
      try {
        await deleteUser(uuid).unwrap();
      } catch (error) {
        console.error("Ошибка удаления пользователя", error);
      }
    },
  };
};
