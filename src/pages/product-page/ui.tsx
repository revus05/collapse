"use client";

import { useToggleInCartMutation } from "entity/user";
import Image from "next/image";
import { type FC, useState } from "react";
import type { ProductDTO } from "shared/api";
import { type Colors, colorsHex } from "shared/constants/colors";
import { cn } from "shared/lib/cn";
import { useAppSelector } from "shared/lib/hooks";
import { Button } from "shared/ui/button";

type ProductPageProps = {
  product: ProductDTO;
};

export const ProductPage: FC<ProductPageProps> = ({ product }) => {
  const [toggleInCart] = useToggleInCartMutation();
  const currency =
    useAppSelector((state) => state.userSlice.user?.currency) || "BYN";

  const [quantity, setQuantity] = useState(1);
  const [selectedInsideColors, setSelectedInsideColors] = useState<Colors>(
    product.insideColors[0],
  );

  const [selectedOutsideColors, setSelectedOutsideColors] = useState<Colors>(
    product.outsideColors[0],
  );

  const handleQuantityDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="grid grid-cols-[2fr_3fr] w-full gap-8">
      <Image
        src={product.images[0]}
        width={1000}
        height={1500}
        alt={`${product.title} photo`}
        className="w-full h-fit"
      />
      <div className="grow flex flex-col gap-4">
        <h1 className="text-4xl font-bold">{product.title}</h1>
        <span className="whitespace-break-spaces">{product.description}</span>
        <div className="flex flex-col gap-2">
          <h4>Цвет сумки</h4>
          <div className="flex gap-2">
            {product.outsideColors.map((color) => (
              <button
                type="button"
                key={color}
                className={cn(
                  "size-8 rounded-full cursor-pointer",
                  selectedOutsideColors === color && "border-2 border-accent",
                )}
                style={{ background: colorsHex[color] }}
                onClick={() => setSelectedOutsideColors(color)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4>Цвет подкладки</h4>
          <div className="flex gap-2">
            {product.insideColors.map((color) => (
              <button
                type="button"
                key={color}
                className={cn(
                  "size-8 rounded-full cursor-pointer",
                  selectedInsideColors === color && "border-2 border-accent",
                )}
                style={{ background: colorsHex[color] }}
                onClick={() => setSelectedInsideColors(color)}
              />
            ))}
          </div>
        </div>
        <div>
          <h4>Цена</h4>
          <span>
            {currency === "BYN" ? product.priceBYN : product.priceRUB}{" "}
            {currency}
          </span>
        </div>
        <div>
          <h4>Количество</h4>
          <div className="border flex gap-1 w-fit items-center">
            <Button onClick={handleQuantityDecrease} className="size-8">
              -
            </Button>
            <div className="size-8 flex items-center justify-center">
              <span>{quantity}</span>
            </div>
            <Button onClick={handleQuantityIncrease} className="size-8">
              +
            </Button>
          </div>
        </div>
        <Button
          className="w-fit"
          variant="glowing"
          onClick={() => toggleInCart(product.uuid)}
        >
          Заказать
        </Button>
      </div>
    </div>
  );
};
