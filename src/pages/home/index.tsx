import { makeStore } from "app/store";
import { productApi } from "entity/product";
import { HomePage } from "pages/home/ui";
import { withHomeLayout } from "widgets/layouts/home";

const HomeServerPage = async () => {
  const store = makeStore();

  store.dispatch(productApi.endpoints.getAllProducts.initiate());

  await Promise.all(store.dispatch(productApi.util.getRunningQueriesThunk()));

  const state = store.getState();

  const response = productApi.endpoints.getAllProducts.select()(state)?.data;

  const products = response?.data;

  if (!products) return null;

  return <HomePage products={products} />;
};

export default withHomeLayout(HomeServerPage);
