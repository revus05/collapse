"use client";

import { useGetCartQuery } from "entity/cart";
import { CreateOrderForm } from "features/oder/create/ui";
import type { FC } from "react";
import type { CartItemDTO } from "shared/api";
import { CartItemsList } from "widgets/cart/items-list/ui";

type CartPageProps = {
  cartItems: CartItemDTO[];
};

export const CartPage: FC<CartPageProps> = ({ cartItems: initialItems }) => {
  const { data: response } = useGetCartQuery();
  const cartItems = response?.data ?? initialItems;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 w-full">
      <CartItemsList cartItems={cartItems} />
      <CreateOrderForm cartItems={cartItems} />
    </div>
  );
};
