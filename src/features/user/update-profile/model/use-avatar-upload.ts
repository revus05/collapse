"use client";

import { useCloudinaryUpload } from "entity/file";
import type { UseFormSetValue } from "react-hook-form";
import type { UpdateProfileFormData } from "./schema";

export const useAvatarUpload = (
  setValue: UseFormSetValue<UpdateProfileFormData>,
) => {
  const { uploadFiles, isLoading } = useCloudinaryUpload();

  return {
    isLoading,
    uploadAvatar: async (files: FileList | null) => {
      if (!files || files.length === 0) {
        return;
      }

      try {
        const [image] = await uploadFiles([files[0]]);

        if (image) {
          setValue("image", image, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
        }
      } catch (error) {
        console.error("Ошибка загрузки аватара", error);
      }
    },
  };
};
