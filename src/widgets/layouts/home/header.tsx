import Image from "next/image";
import Link from "next/link";
import { paths } from "shared/navigation/paths";
import logo from "../../../../public/images/logo.png";

export const Header = () => {
  return (
    <header className="border-b fixed bg-background/80 backdrop-blur-2xl w-full">
      <div className="2xl:w-360 w-full 2xl:px-0 px-2 mx-auto flex justify-between items-center py-2">
        <Link href={paths.home}>
          <Image
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt="logo"
            className="h-8 w-fit select-none"
          />
        </Link>

        <div className="flex gap-4 items-center">
          <span>Максим</span>
          <div className="size-8 bg-gray-400 rounded-full shrink-0" />
        </div>
      </div>
    </header>
  );
};
