"use client";

import { searchCatalogProducts, useGetAllProductsQuery } from "entity/product";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { paths } from "shared/navigation/paths";
import { Button } from "shared/ui/button";
import { Field } from "shared/ui/field";
import { Input } from "shared/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
} from "shared/ui/popover";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const { data: response } = useGetAllProductsQuery();
  const products = searchCatalogProducts(response?.data, deferredQuery).slice(
    0,
    6,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div className="w-full max-w-2xl">
          <Field orientation="horizontal" className="w-full">
            <Input
              type="text"
              value={query}
              placeholder="Поиск модели..."
              className="flex-1"
              onFocus={() => setOpen(true)}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpen(true);
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(true)}
            >
              <Search />
            </Button>
          </Field>
        </div>
      </PopoverAnchor>

      <PopoverContent
        align="center"
        sideOffset={8}
        className="w-[min(42rem,calc(100vw-2rem))]"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <PopoverHeader>
          <PopoverTitle>Поиск по каталогу</PopoverTitle>
          <PopoverDescription>
            {deferredQuery.trim()
              ? `Результаты по запросу "${deferredQuery.trim()}".`
              : "Начните вводить название, описание или тег товара."}
          </PopoverDescription>
        </PopoverHeader>

        <div className="flex flex-col">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.uuid}
                href={`${paths.product}/${product.uuid}`}
                className="hover:bg-muted flex items-center gap-3 rounded-xl p-2 transition"
                onClick={() => setOpen(false)}
              >
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={64}
                  height={64}
                  className="size-16 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-medium">{product.title}</p>
                  <p className="text-muted-foreground line-clamp-2 text-xs">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-muted-foreground rounded-xl border border-dashed p-4 text-sm">
              Ничего не найдено. Попробуйте изменить запрос.
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
