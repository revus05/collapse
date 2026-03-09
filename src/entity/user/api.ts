import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type AdminCreateUserRequestDTO,
  type AdminUpdateUserRequestDTO,
  type ApiResponse,
  baseQuery,
  type SignInUserRequestDTO,
  type UpdateCurrencyRequestDTO,
  type UpdateMeRequestDTO,
  type UserDTO,
} from "shared/api";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery("users"),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getAllUsersByAdmin: builder.query<ApiResponse<UserDTO[]>, void>({
      query: () => ({
        url: "/admin",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    createUserByAdmin: builder.mutation<
      ApiResponse<UserDTO>,
      AdminCreateUserRequestDTO
    >({
      query: (body) => ({
        url: "/admin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    updateUserByAdmin: builder.mutation<
      ApiResponse<UserDTO>,
      { uuid: string; body: AdminUpdateUserRequestDTO }
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/${uuid}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUserByAdmin: builder.mutation<ApiResponse<void>, string>({
      query: (uuid) => ({
        url: `/admin/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    updateMe: builder.mutation<ApiResponse<UserDTO>, UpdateMeRequestDTO>({
      query: (body) => ({
        url: "/me",
        method: "PUT",
        body,
      }),
    }),
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
  }),
});

export default userApi;
export const {
  useCreateUserByAdminMutation,
  useDeleteUserByAdminMutation,
  useGetAllUsersByAdminQuery,
  useSignInUserMutation,
  useSignUpUserMutation,
  useSignOutUserMutation,
  useUpdateMeMutation,
  useUpdateUserByAdminMutation,
  useUpdateCurrencyMutation,
} = userApi;
