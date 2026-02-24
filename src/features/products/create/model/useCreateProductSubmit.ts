"use client";

import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "entity/product";
import type { ProductRequestDTO } from "shared/api";
import type { ProductFormData } from "./schema";

export const useCreateProductSubmit = (productUuid?: string) => {
  const [createProduct, createState] = useCreateProductMutation();
  const [updateProduct, updateState] = useUpdateProductMutation();

  return {
    isLoading: createState.isLoading || updateState.isLoading,

    onSubmit: async (data: ProductFormData) => {
      const body: ProductRequestDTO = {
        ...data,
        priceRUB: +data.priceRUB,
        priceBYN: +data.priceBYN,
        discountPriceBYN: +data.discountPriceBYN,
        discountPriceRUB: +data.discountPriceRUB,
      };
      try {
        if (productUuid) {
          await updateProduct({
            uuid: productUuid,
            body,
          }).unwrap();
        } else {
          await createProduct(body).unwrap();
        }
      } catch (e) {
        console.error("Ошибка сохранения продукта", e);
      }
    },
  };
};
