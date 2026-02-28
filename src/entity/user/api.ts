import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type ApiResponse,
  baseQuery,
  type ProductDTO,
  type SignInUserRequestDTO,
  type UpdateCurrencyRequestDTO,
  type UserDTO,
} from "shared/api";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery("users"),
  endpoints: (builder) => ({
    signUpUser: builder.mutation<ApiResponse<UserDTO>, SignInUserRequestDTO>({
      query: (body) => ({
        url: "/sign-up",
        method: "POST",
        body,
      }),
    }),
    signInUser: builder.mutation<ApiResponse<UserDTO>, SignInUserRequestDTO>({
      query: (body) => ({
        url: "/sign-in",
        method: "POST",
        body,
      }),
    }),
    signOutUser: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: "/sign-out",
        method: "POST",
      }),
    }),
    updateCurrency: builder.mutation<
      ApiResponse<UserDTO>,
      UpdateCurrencyRequestDTO
    >({
      query: (body) => ({
        url: "/update-currency",
        method: "POST",
        body,
      }),
    }),
    toggleInCart: builder.mutation<ApiResponse<ProductDTO>, string>({
      query: (uuid) => ({
        url: `/toggle-in-cart/${uuid}`,
        method: "POST",
      }),
    }),
    getCart: builder.query<ApiResponse<ProductDTO[]>, void>({
      query: () => ({
        url: `/get-cart`,
        method: "GET",
      }),
    }),
  }),
});

export default userApi;
export const {
  useSignInUserMutation,
  useSignUpUserMutation,
  useSignOutUserMutation,
  useUpdateCurrencyMutation,
  useToggleInCartMutation,
  useGetCartQuery,
} = userApi;
