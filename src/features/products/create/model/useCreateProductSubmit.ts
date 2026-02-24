"use client";

import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "entity/product";
import type { ProductFormData } from "./schema";

export const useCreateProductSubmit = (productUuid?: string) => {
  const [createProduct, createState] = useCreateProductMutation();
  const [updateProduct, updateState] = useUpdateProductMutation();

  return {
    isLoading: createState.isLoading || updateState.isLoading,

    onSubmit: async (data: ProductFormData) => {
      try {
        if (productUuid) {
          await updateProduct({
            uuid: productUuid,
            body: data,
          }).unwrap();
        } else {
          await createProduct(data).unwrap();
        }
      } catch (e) {
        console.error("Ошибка сохранения продукта", e);
      }
    },
  };
};
