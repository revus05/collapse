import z from "zod";

export const updateProfileSchema = z
  .object({
    image: z.string().trim().optional(),
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
      .trim()
      .refine((val) => val.length === 0 || val.length >= 8, {
        message: "Минимальная длина пароля 8 символов",
      }),
    repeatPassword: z.string().trim(),
    currency: z.enum(["BYN", "RUB"]),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Пароли не совпадают",
    path: ["repeatPassword"],
  });

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
