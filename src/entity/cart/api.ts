import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type AddToCartRequestDTO,
  type ApiResponse,
  baseQuery,
  type CartItemDTO,
} from "shared/api";

const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQuery("cart"),
  endpoints: (builder) => ({
    addToCart: builder.mutation<ApiResponse<CartItemDTO>, AddToCartRequestDTO>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
    getCart: builder.query<ApiResponse<CartItemDTO[]>, void>({
      query: (body) => ({
        url: "",
        method: "GET",
        body,
      }),
    }),
  }),
});

export default cartApi;

export const { useGetCartQuery, useAddToCartMutation } = cartApi;
