"use client";

import { useAddToCartMutation } from "entity/cart";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import { toast } from "sonner";
import { getApiError } from "shared/api";
import type { ProductDTO } from "shared/api";
import { type Colors, colors, colorsHex } from "shared/constants/colors";
import { cn } from "shared/lib/cn";
import { useAppSelector } from "shared/lib/hooks";
import { paths } from "shared/navigation/paths";
import { Button } from "shared/ui/button";

type ProductPageProps = {
  product: ProductDTO;
};

export const ProductPage: FC<ProductPageProps> = ({ product }) => {
  const router = useRouter();
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const currency =
    useAppSelector((state) => state.userSlice.user?.currency) || "BYN";

  const [quantity, setQuantity] = useState(1);
  const [selectedInsideColor, setSelectedInsideColor] = useState<Colors>(
    product.insideColors[0],
  );
  const [selectedOutsideColor, setSelectedOutsideColor] = useState<Colors>(
    product.outsideColors[0],
  );
  const [activeImage, setActiveImage] = useState(0);

  const price = currency === "BYN" ? product.priceBYN : product.priceRUB;
  const discountPrice =
    currency === "BYN" ? product.discountPriceBYN : product.discountPriceRUB;
  const hasDiscount =
    discountPrice != null && Number(discountPrice) > 0 && discountPrice < price;
  const finalUnitPrice = hasDiscount ? discountPrice : price;
  const totalPrice = Number(finalUnitPrice) * quantity;

  const handleQuantityDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productUuid: product.uuid,
        quantity,
        insideColor: selectedInsideColor,
        outsideColor: selectedOutsideColor,
      }).unwrap();

      toast.success("Добавлено в корзину", {
        description: `${product.title} × ${quantity}`,
        action: {
          label: "Перейти",
          onClick: () => router.push(paths.cart),
        },
      });
    } catch (error) {
      const apiError = getApiError(error);
      toast.error("Не удалось добавить в корзину", {
        description: apiError.message,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] w-full gap-8">
      <div className="flex flex-col gap-3">
        <Image
          src={product.images[activeImage] || product.images[0]}
          width={1000}
          height={1500}
          alt={`${product.title} photo`}
          className="w-full h-fit"
        />
        {product.images.length > 1 && (
          <div className="flex gap-2 flex-wrap">
            {product.images.map((src, idx) => (
              <button
                type="button"
                key={src}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "size-16 overflow-hidden border cursor-pointer",
                  activeImage === idx
                    ? "border-accent border-2"
                    : "border-white/20",
                )}
              >
                <Image
                  src={src}
                  width={100}
                  height={100}
                  alt={`${product.title} preview ${idx + 1}`}
                  className="size-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grow flex flex-col gap-4">
        <h1 className="text-4xl font-bold">{product.title}</h1>

        {product.tags?.length ? (
          <div className="flex gap-2 flex-wrap">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/20 px-2 py-0.5 text-xs uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <span className="whitespace-break-spaces">{product.description}</span>

        <div className="flex flex-col gap-2">
          <h4>Цвет сумки: {colors[selectedOutsideColor]}</h4>
          <div className="flex gap-2">
            {product.outsideColors.map((color) => (
              <button
                type="button"
                key={color}
                title={colors[color]}
                className={cn(
                  "size-8 rounded-full cursor-pointer",
                  selectedOutsideColor === color && "border-2 border-accent",
                )}
                style={{ background: colorsHex[color] }}
                onClick={() => setSelectedOutsideColor(color)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4>Цвет подкладки: {colors[selectedInsideColor]}</h4>
          <div className="flex gap-2">
            {product.insideColors.map((color) => (
              <button
                type="button"
                key={color}
                title={colors[color]}
                className={cn(
                  "size-8 rounded-full cursor-pointer",
                  selectedInsideColor === color && "border-2 border-accent",
                )}
                style={{ background: colorsHex[color] }}
                onClick={() => setSelectedInsideColor(color)}
              />
            ))}
          </div>
        </div>
        <div>
          <h4>Цена</h4>
          {hasDiscount ? (
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-accent">
                {discountPrice} {currency}
              </span>
              <span className="line-through text-white/60">
                {price} {currency}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold">
              {price} {currency}
            </span>
          )}
        </div>
        <div>
          <h4>Количество</h4>
          <div className="border flex gap-1 w-fit items-center">
            <Button
              onClick={handleQuantityDecrease}
              className="size-8"
              disabled={quantity <= 1}
            >
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
        {quantity > 1 && (
          <div className="text-sm text-white/70">
            Итого: {totalPrice} {currency}
          </div>
        )}
        <Button
          className="w-fit"
          variant="glowing"
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? "Добавление..." : "В корзину"}
        </Button>
      </div>
    </div>
  );
};
