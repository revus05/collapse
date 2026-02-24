"use client";

import { useGetProductByIdQuery } from "entity/product";
import type { FC } from "react";

type ProductPageProps = {
  uuid: string;
};

export const ProductPage: FC<ProductPageProps> = ({ uuid }) => {
  const { data: response } = useGetProductByIdQuery(uuid);

  if (!response) return null;

  const { data: product } = response;

  return <span>{product.title}</span>;
};
