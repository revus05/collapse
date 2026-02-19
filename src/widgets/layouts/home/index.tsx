import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";
import type { FC, ReactNode } from "react";
import { paths } from "shared/navigation/paths";
import { Aside } from "./aside";
import { Footer } from "./footer";
import { Header } from "./header";

type HomeLayoutType = {
  children: ReactNode;
};

const HomeLayout: FC<HomeLayoutType> = async ({ children }) => {
  const cookiesObj = await cookies();

  const jwt = cookiesObj.get("jwt")?.value;

  if (!jwt) {
    redirect(paths.signIn);
  }

  return (
    <main>
      <div className={"h-12.25 relative"}>
        <Header />
      </div>
      <div className={"2xl:w-360 w-full 2xl:px-0 px-2 mx-auto flex gap-8 grow"}>
        <Aside />
        {children}
      </div>
      <Footer />
    </main>
  );
};

export const withHomeLayout = (Component: React.FC) => {
  const WrappedComponent = () => (
    <HomeLayout>
      <Component />
    </HomeLayout>
  );

  WrappedComponent.displayName = `withHomeLayout(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};
