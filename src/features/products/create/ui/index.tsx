"use client";

import Image from "next/image";
import { Controller } from "react-hook-form";
import { colors } from "shared/constants";
import { Button } from "shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "shared/ui/dialog";
import { Field, FieldError, FieldLabel } from "shared/ui/field";
import { Input } from "shared/ui/input";
import { MultiSelect } from "shared/ui/multiselect";
import { Textarea } from "shared/ui/textarea";
import { useCreateProductForm } from "../model/useCreateProductForm";
import { useCreateProductSubmit } from "../model/useCreateProductSubmit";
import { useImageUpload } from "../model/useImageUpload";

export const CreateProductForm = ({
  productUuid,
}: {
  productUuid?: string;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useCreateProductForm();

  const images = watch("images");

  const { onSubmit, isLoading } = useCreateProductSubmit(productUuid);

  const {
    upload,
    remove,
    isLoading: isUploading,
  } = useImageUpload(setValue, getValues);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Добавить товар</Button>
        </DialogTrigger>
        <DialogContent className="!max-w-fit">
          <DialogHeader>
            <DialogTitle>Новый товар</DialogTitle>
            <DialogDescription>
              Заполните поля формы чтобы создать новый товар в магазине
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-128 flex flex-col gap-4"
          >
            <Field>
              <FieldLabel>Название</FieldLabel>
              <Input
                {...register("title")}
                placeholder={"Сумка KARMA"}
                aria-invalid={!!errors.title?.message}
              />
              <FieldError>{errors.title?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Цвет сумки</FieldLabel>
              <Controller
                control={control}
                name="outsideColors"
                render={({ field }) => (
                  <MultiSelect
                    values={Object.entries(colors).map(([value, label]) => ({
                      label,
                      value,
                    }))}
                    selected={field.value}
                    onValuesChangeAction={field.onChange}
                    aria-invalid={!!errors.outsideColors?.message}
                  />
                )}
              />
              <FieldError>{errors.outsideColors?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Цвет подкладки</FieldLabel>
              <Controller
                control={control}
                name="insideColors"
                render={({ field }) => (
                  <MultiSelect
                    values={Object.entries(colors).map(([value, label]) => ({
                      label,
                      value,
                    }))}
                    selected={field.value}
                    onValuesChangeAction={field.onChange}
                    aria-invalid={!!errors.insideColors?.message}
                  />
                )}
              />
              <FieldError>{errors.insideColors?.message}</FieldError>
            </Field>

            <div className="flex gap-4">
              <Field>
                <FieldLabel>Цена BYN</FieldLabel>
                <Input
                  {...register("priceBYN")}
                  type="number"
                  placeholder={"1000"}
                  aria-invalid={!!errors.priceBYN?.message}
                />
                <FieldError>{errors.priceBYN?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel>Цена BYN со скидкой</FieldLabel>
                <Input
                  {...register("discountPriceBYN")}
                  type="number"
                  placeholder={"800"}
                  aria-invalid={!!errors.discountPriceBYN?.message}
                />
                <FieldError>{errors.discountPriceBYN?.message}</FieldError>
              </Field>
            </div>

            <div className="flex gap-4">
              <Field>
                <FieldLabel>Цена RUB</FieldLabel>
                <Input
                  {...register("priceRUB")}
                  type="number"
                  placeholder={"1000"}
                  aria-invalid={!!errors.priceRUB?.message}
                />
                <FieldError>{errors.priceRUB?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel>Цена RUB со скидкой</FieldLabel>
                <Input
                  {...register("discountPriceRUB")}
                  type="number"
                  placeholder={"800"}
                  aria-invalid={!!errors.discountPriceRUB?.message}
                />
                <FieldError>{errors.discountPriceRUB?.message}</FieldError>
              </Field>
            </div>

            <Field>
              <FieldLabel>Описание</FieldLabel>
              <Textarea
                {...register("description")}
                placeholder={"Описание"}
                aria-invalid={!!errors.description?.message}
                className="max-h-64"
              />
              <FieldError>{errors.description?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Изображения</FieldLabel>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => upload(e.target.files)}
                aria-invalid={!!errors.images?.message}
              />
              <FieldError>{errors.images?.message}</FieldError>
            </Field>

            <div className="flex gap-2 flex-wrap">
              {images?.map((img) => (
                <div key={img} className="relative">
                  <Image
                    src={img}
                    width={60}
                    height={100}
                    alt="product image"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white px-1"
                    onClick={() => remove(img)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <Button type="submit" disabled={isLoading || isUploading}>
              Добавить
            </Button>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
};
