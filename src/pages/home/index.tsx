import { makeStore } from "app/store";
import { getCatalogProducts, productApi } from "entity/product";
import { HomePage } from "pages/home/ui";
import { withHomeLayout } from "widgets/layouts/home";

const HomeServerPage = async () => {
  const store = makeStore();

  store.dispatch(productApi.endpoints.getAllProducts.initiate());

  await Promise.all(store.dispatch(productApi.util.getRunningQueriesThunk()));

  const state = store.getState();

  const response = productApi.endpoints.getAllProducts.select()(state)?.data;
  const products = getCatalogProducts(response?.data);

  return <HomePage products={products} />;
};

export default withHomeLayout(HomeServerPage);
