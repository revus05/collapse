"use client";

import {
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "entity/cart";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import type { CartItemDTO } from "shared/api";
import { colors, colorsHex } from "shared/constants/colors";
import { useAppSelector } from "shared/lib/hooks";
import { Button } from "shared/ui/button";

type CartItemsListProps = {
  cartItems: CartItemDTO[];
};

export const CartItemsList: FC<CartItemsListProps> = ({ cartItems }) => {
  const userCurrency =
    useAppSelector((state) => state.userSlice.user?.currency) || "BYN";

  const [updateCartItem, { isLoading: isUpdating }] =
    useUpdateCartItemMutation();
  const [deleteCartItem, { isLoading: isDeleting }] =
    useDeleteCartItemMutation();

  const disabled = isUpdating || isDeleting;

  const handleDecrease = (item: CartItemDTO) => {
    if (item.quantity <= 1) return;
    updateCartItem({ uuid: item.uuid, body: { quantity: item.quantity - 1 } });
  };

  const handleIncrease = (item: CartItemDTO) => {
    updateCartItem({ uuid: item.uuid, body: { quantity: item.quantity + 1 } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="border px-4 py-10 w-full text-center text-white/70">
        Корзина пуста
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {cartItems.map((cartItem) => {
        const unitPrice =
          (userCurrency === "BYN"
            ? cartItem.product.priceBYN
            : cartItem.product.priceRUB) ?? 0;
        const lineTotal = unitPrice * cartItem.quantity;

        return (
          <div
            key={cartItem.uuid}
            className="border px-4 py-3 flex gap-4 w-full"
          >
            <Image
              src={cartItem.product.images?.[0] || ""}
              alt={`${cartItem.product.title} photo`}
              width={200}
              height={150}
              className="h-32 w-fit"
            />
            <div className="flex flex-col justify-between grow gap-2">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">{cartItem.product.title}</h2>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <span className="flex items-center gap-1.5">
                    Сумка
                    <span
                      className="inline-block size-4 rounded-full border border-white/30"
                      style={{ background: colorsHex[cartItem.outsideColor] }}
                      title={colors[cartItem.outsideColor]}
                    />
                  </span>
                  <span className="flex items-center gap-1.5">
                    Подкладка
                    <span
                      className="inline-block size-4 rounded-full border border-white/30"
                      style={{ background: colorsHex[cartItem.insideColor] }}
                      title={colors[cartItem.insideColor]}
                    />
                  </span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDecrease(cartItem)}
                    disabled={disabled || cartItem.quantity <= 1}
                  >
                    <Minus />
                  </Button>
                  <span className="min-w-8 text-center">
                    {cartItem.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleIncrease(cartItem)}
                    disabled={disabled}
                  >
                    <Plus />
                  </Button>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm text-white/70">
                    {unitPrice} {userCurrency} × {cartItem.quantity}
                  </span>
                  <span className="text-lg font-bold">
                    {lineTotal} {userCurrency}
                  </span>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteCartItem(cartItem.uuid)}
                  disabled={disabled}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
