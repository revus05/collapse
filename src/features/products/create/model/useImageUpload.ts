"use client";

import { useUploadFileMutation } from "entity/file";
import type { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import type { ProductFormData } from "./schema";

export const useImageUpload = (
  setValue: UseFormSetValue<ProductFormData>,
  getValues: UseFormGetValues<ProductFormData>,
) => {
  const [uploadImage, { isLoading }] = useUploadFileMutation();

  const upload = async (files: FileList | null) => {
    if (!files) return;

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadImage(formData).unwrap();

      setValue("images", [...getValues("images"), res.data.filepath], {
        shouldValidate: true,
      });
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
