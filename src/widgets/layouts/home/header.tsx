"use client";

import { SignOutButton } from "features/user/sign-out";
import { UpdateCurrencySelect } from "features/user/update-currency";
import { Shield, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppSelector } from "shared/lib/hooks";
import { paths } from "shared/navigation/paths";
import { Popover, PopoverContent, PopoverTrigger } from "shared/ui/popover";
import { Tabs } from "shared/ui/tabs";
import { SearchBar } from "widgets/home/search-bar";
import logo from "../../../../public/images/logo.png";

export const Header = () => {
  const isAuth = !!useAppSelector((state) => state.userSlice.user);
  const firstName = useAppSelector((state) => state.userSlice.user?.firstName);
  const userRole = useAppSelector((state) => state.userSlice.user?.role);

  const [tab, setTab] = useState<
    "bags" | "sales" | "new" | "limited" | "cloths" | "accessories"
  >("bags");

  return (
    <header className="border-b fixed bg-background/80 backdrop-blur-2xl w-full z-50">
      <div className="2xl:w-360 w-full 2xl:px-0 px-2 mx-auto flex justify-between items-center py-2 gap-32">
        <Link href={paths.home} className="shrink-0">
          <Image
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt="logo"
            className="h-8 w-fit select-none"
          />
        </Link>

        <SearchBar />

        {isAuth ? (
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex gap-4 items-center cursor-pointer">
                <span>{firstName}</span>
                <div className="size-8 bg-gray-400 rounded-full shrink-0" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0 gap-0" align="end">
              {userRole === "ADMIN" && (
                <Link
                  href={paths.adminProducts}
                  className="flex items-center gap-1 hover:bg-secondary px-4 py-2"
                >
                  <Shield /> <span>Админ-панель</span>
                </Link>
              )}
              <Link
                href={paths.profile}
                className="flex items-center gap-1 hover:bg-secondary px-4 py-2"
              >
                <User /> <span>Профиль</span>
              </Link>
              <SignOutButton />
            </PopoverContent>
          </Popover>
        ) : (
          <Link
            href={paths.signIn}
            className="text-text-neutral-tertiary text-sm hover:underline hover:bg-accent/20 hover:text-accent w-fit"
          >
            Войти
          </Link>
        )}
      </div>
      <div className="2xl:w-360 w-full 2xl:px-0 px-2 mx-auto flex justify-between items-center py-2">
        <Tabs
          tab={tab}
          tabs={[
            { label: "Сумки", value: "bags" },
            { label: "Скидки", value: "sales" },
            { label: "Новинки", value: "new" },
            { label: "Лимитированные", value: "limited" },
            { label: "Одежда", value: "cloths" },
            { label: "Аксессуары", value: "accessories" },
          ]}
          setTab={setTab}
        />
        <div className="flex gap-4 items-center">
          <UpdateCurrencySelect />
          <Link href={paths.cart}>
            <ShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
};
