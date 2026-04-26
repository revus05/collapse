import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type AddToCartRequestDTO,
  type ApiResponse,
  baseQuery,
  type CartItemDTO,
  type UpdateCartItemRequestDTO,
} from "shared/api";

const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQuery("cart"),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    addToCart: builder.mutation<ApiResponse<CartItemDTO>, AddToCartRequestDTO>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["cart"],
    }),
    getCart: builder.query<ApiResponse<CartItemDTO[]>, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    updateCartItem: builder.mutation<
      ApiResponse<CartItemDTO>,
      { uuid: string; body: UpdateCartItemRequestDTO }
    >({
      query: ({ uuid, body }) => ({
        url: `/${uuid}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["cart"],
    }),
    deleteCartItem: builder.mutation<ApiResponse<void>, string>({
      query: (uuid) => ({
        url: `/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export default cartApi;

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
