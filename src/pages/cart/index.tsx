import { makeStore } from "app/store";
import { cartApi } from "entity/cart";
import { CartPage } from "pages/cart/ui";
import { withHomeLayout } from "widgets/layouts/home";

const CartServerPage = async () => {
  const store = makeStore();

  store.dispatch(cartApi.endpoints.getCart.initiate());

  const res = await Promise.all(
    store.dispatch(cartApi.util.getRunningQueriesThunk()),
  );

  console.log(res);

  const state = store.getState();

  const response = cartApi.endpoints.getCart.select()(state)?.data;

  const cartItems = response?.data;

  if (!cartItems) return null;

  return <CartPage cartItems={cartItems} />;
};

export default withHomeLayout(CartServerPage);
