import { ProductPage } from "pages/product-page";

type ProductPageProps = {
  params: Promise<{ uuid: string }>;
};

export default async function ProductServerPage({ params }: ProductPageProps) {
  const { uuid } = await params;

  return <ProductPage uuid={uuid} />;
}
