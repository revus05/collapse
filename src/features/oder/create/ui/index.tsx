"use client";

import { useCreateOrderForm } from "features/oder/create/model/useCreateOrderForm";
import { useCreateOrderSubmit } from "features/oder/create/model/useSignInSubmit";
import type { FC } from "react";
import type { CartItemDTO } from "shared/api";
import { useAppSelector } from "shared/lib/hooks";
import { Button } from "shared/ui/button";
import { FieldError } from "shared/ui/field";
import { Input } from "shared/ui/input";
import { Label } from "shared/ui/label";
import { Textarea } from "shared/ui/textarea";

type CreateOrderFormProps = {
  cartItems: CartItemDTO[];
};

export const CreateOrderForm: FC<CreateOrderFormProps> = ({ cartItems }) => {
  const userCurrency =
    useAppSelector((state) => state.userSlice.user?.currency) || "BYN";

  const totalOrderAmount = cartItems.reduce((prev, cartItem) => {
    const price =
      (userCurrency === "BYN"
        ? cartItem.product.priceBYN
        : cartItem.product.priceRUB) ?? 0;
    return prev + price * cartItem.quantity;
  }, 0);

  const totalCount = cartItems.reduce((s, ci) => s + ci.quantity, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCreateOrderForm();

  const { onSubmit, isLoading } = useCreateOrderSubmit();

  const disabled = cartItems.length === 0 || isLoading;

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({
          orderItemsUuids: cartItems.map((cartItem) => cartItem.uuid),
          phone: data.phone,
          address: data.address,
          comment: data.comment,
        }),
      )}
      className="border px-4 py-3 h-fit flex flex-col gap-4 w-full"
    >
      <h3 className="font-bold text-xl">Оформление заказа</h3>

      <div className="flex flex-col gap-2">
        <Label htmlFor="order-phone">Телефон</Label>
        <Input
          id="order-phone"
          {...register("phone")}
          placeholder="+375 XX XXX-XX-XX"
          aria-invalid={!!errors.phone?.message}
        />
        <FieldError>{errors.phone?.message}</FieldError>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="order-address">Адрес доставки</Label>
        <Input
          id="order-address"
          {...register("address")}
          placeholder="Город, улица, дом, квартира"
          aria-invalid={!!errors.address?.message}
        />
        <FieldError>{errors.address?.message}</FieldError>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="order-comment">Комментарий</Label>
        <Textarea
          id="order-comment"
          {...register("comment")}
          placeholder="Дополнительные пожелания"
        />
      </div>

      <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
        <span className="text-sm text-white/70">Позиций: {totalCount}</span>
        <span className="text-lg font-bold">
          Итого: {totalOrderAmount} {userCurrency}
        </span>
      </div>

      <Button type="submit" variant="glowing" disabled={disabled}>
        {isLoading ? "Оформление..." : "Заказать"}
      </Button>
    </form>
  );
};
