"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const signUpSchema = z
  .object({
    firstName: z.string().trim().nonempty("Имя обязательно"),
    lastName: z.string().trim().nonempty("Фамилия обязательна"),
    middleName: z.string().trim().nonempty("Отчество обязательно"),
    email: z
      .string()
      .trim()
      .nonempty("Email обязателен")
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Некорректный email адрес",
      }),
    phone: z
      .string()
      .trim()
      .nonempty("Телефон обязателен")
      .refine((val) => /^(\+7\d{10}|\+375\d{9})$/.test(val), {
        message: "Некорректный телефон",
      }),
    password: z
      .string()
      .min(8, "Минимальная длина пароля 8 символов")
      .max(64, "Максимальная длина пароля 64 символа")
      .trim(),
    repeatPassword: z
      .string()
      .min(8, "Минимальная длина пароля 8 символов")
      .max(64, "Максимальная длина пароля 64 символа")
      .trim(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Пароли не совпадают",
    path: ["repeatPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const useSignUpForm = () =>
  useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });
