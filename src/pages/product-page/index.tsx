import { makeStore } from "app/store";
import productApi from "entity/product/api";
import { ProductPage } from "pages/product-page/ui";
import type { FC } from "react";
import { withHomeLayout } from "widgets/layouts/home";

type ProductPageProps = {
  params: Promise<{ uuid: string }>;
};

const ProductServerPage: FC<ProductPageProps> = async ({ params }) => {
  const { uuid } = await params;

  const store = makeStore();

  store.dispatch(productApi.endpoints.getProductById.initiate(uuid));

  await Promise.all(store.dispatch(productApi.util.getRunningQueriesThunk()));

  const state = store.getState();

  const response =
    productApi.endpoints.getProductById.select(uuid)(state)?.data;

  const product = response?.data;

  if (!product) return null;

  return <ProductPage product={product} />;
};

export default withHomeLayout(ProductServerPage);
