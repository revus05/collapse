import { makeStore } from "app/store";
import { cartApi } from "entity/cart";
import { CartPage } from "pages/cart/ui";
import { withHomeLayout } from "widgets/layouts/home";

const CartServerPage = async () => {
  const store = makeStore();

  store.dispatch(cartApi.endpoints.getCart.initiate());

  await Promise.all(store.dispatch(cartApi.util.getRunningQueriesThunk()));

  const state = store.getState();

  const response = cartApi.endpoints.getCart.select()(state)?.data;

  const cartItems = response?.data ?? [];

  return <CartPage cartItems={cartItems} />;
};

export default withHomeLayout(CartServerPage);
