import { getProducts } from "entity/product";
import Image from "next/image";
import Link from "next/link";
import { paths } from "shared/navigation/paths";
import { SearchBar } from "widgets/home/search-bar";
import { SortDropdown } from "widgets/home/sort-dropdown";
import { withHomeLayout } from "widgets/layouts/home";

const HomePage = async () => {
  const products = await getProducts();
  return (
    <main className="grow flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <SearchBar />
        <SortDropdown />
      </div>

      <section className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <Link href={`${paths.product}/${product.id}`} key={product.id}>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-128 object-cover rounded-t"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-lg font-bold text-[#a300ff]">
                {product.price} BYN
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default withHomeLayout(HomePage);
