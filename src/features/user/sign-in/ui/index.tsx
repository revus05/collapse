"use client";

import { useSignInForm, useSignInSubmit } from "features/user/sign-in";
import Link from "next/link";
import { paths } from "shared/navigation/paths";
import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";

export const SignInForm = () => {
  const { register, handleSubmit } = useSignInForm();

  const { onSubmit, isLoading } = useSignInSubmit();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-bg-neutral-primary/70 flex w-100 flex-col gap-6 rounded-2xl border p-8 shadow-sm backdrop-blur-[32px]"
    >
      <h2 className="text-xl font-semibold">Вход</h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Input {...register("email")} type="email" placeholder={"Email"} />
          <Input {...register("password")} placeholder={"Пароль"} />
        </div>
        <Link
          href={paths.signUp}
          className={"text-text-neutral-tertiary font-semibold"}
        >
          Создать аккаунт
        </Link>
        <Button className={"mx-auto"} type={"submit"} disabled={isLoading}>
          Отправить
        </Button>
      </div>
    </form>
  );
};
