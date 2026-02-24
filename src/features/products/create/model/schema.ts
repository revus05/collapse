import { colorValues } from "shared/constants";
import z from "zod";

const priceSchema = z
  .string()
  .trim()
  .refine((val) => !Number.isNaN(Number(val)), {
    message: "Цена должна быть числом",
  })
  .refine((val) => val !== "0", {
    message: "Цена не может быть 0",
  })
  .refine((val) => Number(val) >= 0, {
    message: "Цена не может быть отрицательной",
  });

export const productSchema = z.object({
  title: z.string().trim().nonempty("Название обязательно"),
  description: z.string().trim().nonempty("Описание обязательно"),
  insideColors: z
    .array(z.enum(colorValues))
    .min(1, "Выберите хотя бы один цвет"),
  outsideColors: z
    .array(z.enum(colorValues))
    .min(1, "Выберите хотя бы один цвет"),

  priceBYN: priceSchema.nonempty("Цена необходима"),
  priceRUB: priceSchema.nonempty("Цена необходима"),

  discountPriceBYN: priceSchema,
  discountPriceRUB: priceSchema,

  images: z.array(z.url()).min(1, "Загрузите изображение"),
});

export type ProductFormData = z.infer<typeof productSchema>;
