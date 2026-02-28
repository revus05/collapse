import { ProductPage } from "pages/product-page/ui";
import type { FC } from "react";
import { withHomeLayout } from "widgets/layouts/home";

type ProductPageProps = {
  params: Promise<{ uuid: string }>;
};

const ProductServerPage: FC<ProductPageProps> = async ({ params }) => {
  const { uuid } = await params;

  return <ProductPage uuid={uuid} />;
};

export default withHomeLayout(ProductServerPage);
