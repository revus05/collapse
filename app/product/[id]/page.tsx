import { getProducts } from "entity/product";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const products = await getProducts();

  return <span>{products.find((product) => product.id === id)?.name}</span>;
}
