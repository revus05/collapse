"use client";

import { useGetCartQuery } from "entity/user";

export const CartPage = () => {
  const { data: response } = useGetCartQuery();

  if (!response) return null;

  const { data: product } = response;

  return (
    <div>
      {product.map((product) => (
        <span key={product.uuid}>{product.title}</span>
      ))}
    </div>
  );
};
