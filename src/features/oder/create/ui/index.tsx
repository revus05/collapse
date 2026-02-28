"use client";

import { useCreateOrderSubmit } from "features/oder/create/model/useSignInSubmit";
import Image from "next/image";
import type { FC } from "react";
import type { CartItemDTO } from "shared/api";
import { useAppSelector } from "shared/lib/hooks";
import { Button } from "shared/ui/button";

type CreateOrderFormProps = {
  cartItems: CartItemDTO[];
};

export const CreateOrderForm: FC<CreateOrderFormProps> = ({ cartItems }) => {
  const userCurrency =
    useAppSelector((state) => state.userSlice.user?.currency) || "BYN";

  const totalOrderAmount = cartItems.reduce(
    (prev, cartItem) =>
      prev +
      ((userCurrency === "BYN"
        ? cartItem.product.priceBYN
        : cartItem.product.priceRUB) ?? 0),
    0,
  );

  const { onSubmit } = useCreateOrderSubmit();

  return (
    <>
      <div className="border px-4 py-3 w-full h-fit">
        {cartItems.length === 0 && (
          <span className="text-white/70 text-center">Корзина пуста</span>
        )}
        {cartItems.map((cartItem) => (
          <div key={cartItem.uuid} className="flex gap-4">
            <Image
              src={cartItem.product.images?.[0] || ""}
              alt={`${cartItem.product.title} photo`}
              width={200}
              height={150}
              className="h-32 w-fit"
            />
            <div className="flex flex-col justify-between">
              <h1 className="text-2xl font-bold">{cartItem.product.title}</h1>
              <span>
                {(userCurrency === "BYN"
                  ? cartItem.product.priceBYN
                  : cartItem.product.priceRUB) ?? 0}{" "}
                {userCurrency}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="border px-4 py-3 h-fit flex flex-col gap-2">
        <h3 className="font-bold text-xl">Итого:</h3>
        <span className="whitespace-nowrap">
          Сумма: {totalOrderAmount} {userCurrency}
        </span>
        <Button
          onClick={() =>
            onSubmit({
              orderItemsUuids: cartItems.map((cartItem) => cartItem.uuid),
            })
          }
        >
          Заказать
        </Button>
      </div>
    </>
  );
};
