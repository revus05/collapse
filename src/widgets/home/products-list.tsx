"use client";

import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import type { ProductDTO } from "shared/api";
import { useAppSelector } from "shared/lib/hooks";
import { paths } from "shared/navigation/paths";

type ProductsListProps = {
  products: ProductDTO[];
};

export const ProductsList: FC<ProductsListProps> = ({ products }) => {
  const user = useAppSelector((state) => state.userSlice.user);

  return (
    <section className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <Link href={`${paths.product}/${product.uuid}`} key={product.uuid}>
          <Image
            src={product.images[0]}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-128 object-cover rounded-t"
          />
          <div className="p-4 space-y-2">
            <h3 className="text-xl font-semibold">{product.title}</h3>
            <p className="text-lg font-bold text-[#a300ff]">
              {!user
                ? `${product.priceBYN} BYN`
                : user.currency === "BYN"
                  ? product.priceBYN
                  : product.priceRUB}{" "}
              {user?.currency}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
};
