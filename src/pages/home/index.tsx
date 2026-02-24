import Image from "next/image";
import { ProductsList } from "widgets/home/products-list";
import { SortDropdown } from "widgets/home/sort-dropdown";
import { withHomeLayout } from "widgets/layouts/home";
import banner from "../../../public/images/banner.png";

const HomePage = async () => {
  return (
    <main className="grow flex flex-col gap-4">
      <div className="flex flex-col gap-4 relative">
        <Image
          src={banner.src}
          width={1728}
          height={864}
          alt="home banner"
          className="-z-1 select-none"
        />
        <div
          className={
            "absolute top-1/2 -translate-y-1/2 flex flex-col gap-2 px-32"
          }
        >
          <h3 className="text-4xl font-bold">13-15 февраля</h3>
          <span className="text-lg">Скидка 15% по промокоду</span>
          <span className="text-4xl font-bold text-red-500">LOVE</span>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <SortDropdown />
      </div>

      <ProductsList />
    </main>
  );
};

export default withHomeLayout(HomePage);
