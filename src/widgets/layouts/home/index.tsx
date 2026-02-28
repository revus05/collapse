import type { ComponentType, FC, ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

type HomeLayoutType = {
  children: ReactNode;
};

const HomeLayout: FC<HomeLayoutType> = async ({ children }) => {
  return (
    <main className={"flex flex-col gap-8 grow"}>
      <div className={"h-24.25 relative"}>
        <Header />
      </div>
      <div className={"2xl:w-360 w-full 2xl:px-0 px-2 mx-auto flex gap-8 grow"}>
        {children}
      </div>
      <Footer />
    </main>
  );
};

export const withHomeLayout = <P extends object>(
  Component: ComponentType<P>,
) => {
  const WrappedComponent = async (props: P) => (
    <HomeLayout>
      <Component {...props} />
    </HomeLayout>
  );

  WrappedComponent.displayName = `withHomeLayout(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};
