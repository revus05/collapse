import { getMeOnServer } from "entity/user/lib";
import { notFound, redirect } from "next/navigation";
import type React from "react";
import type { FC, ReactNode } from "react";
import { paths } from "shared/navigation/paths";
import { AdminAside } from "widgets/layouts/admin/aside";
import { Header } from "widgets/layouts/admin/header";

type AdminLayoutType = {
  children: ReactNode;
};

const AdminLayout: FC<AdminLayoutType> = async ({ children }) => {
  const user = await getMeOnServer();

  if (!user) {
    redirect(paths.signIn);
  }

  if (user.role !== "ADMIN") {
    notFound();
  }

  return (
    <main className={"flex flex-col gap-8"}>
      <div className={"h-12.25 relative"}>
        <Header />
      </div>
      <div className={"2xl:w-360 w-full 2xl:px-0 px-2 mx-auto flex gap-8 grow"}>
        <AdminAside />
        {children}
      </div>
    </main>
  );
};

export const withAdminLayout = (Component: React.FC) => {
  const WrappedComponent = () => (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );

  WrappedComponent.displayName = `withAuthLayout(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};
