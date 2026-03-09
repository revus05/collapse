"use client";

import { useCloudinaryUpload } from "entity/file";
import type { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import type { ProductFormData } from "./schema";

export const useImageUpload = (
  setValue: UseFormSetValue<ProductFormData>,
  getValues: UseFormGetValues<ProductFormData>,
) => {
  const { uploadFiles, isLoading } = useCloudinaryUpload();

  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    try {
      const newImagePaths = await uploadFiles(files);

      setValue("images", [...getValues("images"), ...newImagePaths], {
        shouldValidate: true,
      });
    } catch (error) {
      console.error("Ошибка при загрузке изображений:", error);
    }
  };

  const remove = (url: string) => {
    setValue(
      "images",
      getValues("images").filter((i) => i !== url),
      {
        shouldValidate: true,
      },
    );
  };

  return { upload, remove, isLoading };
};
