import { CreateOrderForm } from "features/oder/create/ui";
import type { FC } from "react";
import type { CartItemDTO } from "shared/api";

type CartPageProps = {
  cartItems: CartItemDTO[];
};

export const CartPage: FC<CartPageProps> = ({ cartItems }) => {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-8 w-full">
      <CreateOrderForm cartItems={cartItems} />
    </div>
  );
};
