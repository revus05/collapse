"use client";

import { Camera, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import type { UserDTO } from "shared/api";
import { useAppSelector } from "shared/lib/hooks";
import { Button } from "shared/ui/button";
import { Field, FieldError, FieldLabel } from "shared/ui/field";
import { Input } from "shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "shared/ui/select";
import { useAvatarUpload } from "../model/use-avatar-upload";
import { useUpdateProfileForm } from "../model/use-update-profile-form";
import { useUpdateProfileSubmit } from "../model/use-update-profile-submit";

type UpdateProfileFormProps = {
  user: UserDTO;
};

export const UpdateProfileForm = ({ user }: UpdateProfileFormProps) => {
  const currentUser = useAppSelector((state) => state.userSlice.user) || user;
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useUpdateProfileForm(currentUser);
  const { onSubmit, isLoading } = useUpdateProfileSubmit();
  const { uploadAvatar, isLoading: isAvatarUploading } =
    useAvatarUpload(setValue);

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const image = watch("image");

  useEffect(() => {
    reset({
      image: currentUser.image || "",
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      middleName: currentUser.middleName,
      email: currentUser.email,
      phone: currentUser.phone,
      password: "",
      repeatPassword: "",
      currency: currentUser.currency,
    });
  }, [currentUser, reset]);

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    await uploadAvatar(event.target.files);
    event.target.value = "";
  };

  return (
    <div className="grid w-full gap-8 lg:grid-cols-[320px_1fr]">
      <section className="border bg-background/80 h-fit rounded-2xl p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <label className="group relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleAvatarChange}
              disabled={isAvatarUploading}
            />
            {image ? (
              <Image
                src={image}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                width={192}
                height={192}
                className="size-48 rounded-full object-cover"
              />
            ) : (
              <div className="bg-muted text-4xl flex size-48 items-center justify-center rounded-full font-semibold">
                {currentUser.firstName[0]}
                {currentUser.lastName[0]}
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 text-white transition group-hover:bg-black/45">
              <span className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                <Camera className="size-5" />
                <span>{isAvatarUploading ? "Загрузка..." : "Изменить"}</span>
              </span>
            </div>
          </label>

          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">
              {[
                currentUser.lastName,
                currentUser.firstName,
                currentUser.middleName,
              ]
                .filter(Boolean)
                .join(" ")}
            </h2>
            <p className="text-muted-foreground">{currentUser.role}</p>
          </div>
        </div>
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border bg-background/80 flex flex-col gap-6 rounded-2xl p-6"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Field>
            <FieldLabel>Фамилия</FieldLabel>
            <Input
              {...register("lastName")}
              aria-invalid={!!errors.lastName?.message}
            />
            <FieldError>{errors.lastName?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Имя</FieldLabel>
            <Input
              {...register("firstName")}
              aria-invalid={!!errors.firstName?.message}
            />
            <FieldError>{errors.firstName?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Отчество</FieldLabel>
            <Input
              {...register("middleName")}
              aria-invalid={!!errors.middleName?.message}
            />
            <FieldError>{errors.middleName?.message}</FieldError>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              {...register("email")}
              aria-invalid={!!errors.email?.message}
            />
            <FieldError>{errors.email?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Телефон</FieldLabel>
            <Input
              {...register("phone")}
              aria-invalid={!!errors.phone?.message}
            />
            <FieldError>{errors.phone?.message}</FieldError>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field orientation="horizontal">
            <div className="flex w-full gap-2">
              <div className="flex w-full flex-col gap-2">
                <FieldLabel>Новый пароль</FieldLabel>
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  aria-invalid={!!errors.password?.message}
                />
                <FieldError>{errors.password?.message}</FieldError>
              </div>
              <Button
                type="button"
                className="mt-7"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>
          </Field>

          <Field orientation="horizontal">
            <div className="flex w-full gap-2">
              <div className="flex w-full flex-col gap-2">
                <FieldLabel>Повторите пароль</FieldLabel>
                <Input
                  {...register("repeatPassword")}
                  type={showRepeatPassword ? "text" : "password"}
                  aria-invalid={!!errors.repeatPassword?.message}
                />
                <FieldError>{errors.repeatPassword?.message}</FieldError>
              </div>
              <Button
                type="button"
                className="mt-7"
                onClick={() => setShowRepeatPassword((prev) => !prev)}
              >
                {showRepeatPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>
          </Field>
        </div>

        <Field>
          <FieldLabel>Валюта</FieldLabel>
          <Controller
            control={control}
            name="currency"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите валюту" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BYN">BYN</SelectItem>
                  <SelectItem value="RUB">RUB</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{errors.currency?.message}</FieldError>
        </Field>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading || isAvatarUploading || !isDirty}
          >
            Сохранить изменения
          </Button>
        </div>
      </form>
    </div>
  );
};
