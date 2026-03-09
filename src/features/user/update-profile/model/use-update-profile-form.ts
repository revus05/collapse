"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { UserDTO } from "shared/api";
import { type UpdateProfileFormData, updateProfileSchema } from "./schema";

export const useUpdateProfileForm = (user: UserDTO) =>
  useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onSubmit",
    defaultValues: {
      image: user.image || "",
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      email: user.email,
      phone: user.phone,
      password: "",
      repeatPassword: "",
      currency: user.currency,
    },
  });
