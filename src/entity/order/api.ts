import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type ApiResponse,
  baseQuery,
  type CreateOrderRequestDTO,
  type OrderDTO,
  type UpdateOrderStatusRequestDTO,
} from "shared/api";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQuery("order"),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<ApiResponse<OrderDTO>, CreateOrderRequestDTO>(
      {
        query: (body) => ({
          url: "",
          method: "POST",
          body,
        }),
        invalidatesTags: ["orders"],
      },
    ),
    getAllOrdersForAdmin: builder.query<ApiResponse<OrderDTO[]>, void>({
      query: () => ({
        url: "/admin",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    updateOrderStatus: builder.mutation<
      ApiResponse<OrderDTO>,
      { uuid: string; body: UpdateOrderStatusRequestDTO }
    >({
      query: ({ uuid, body }) => ({
        url: `/admin/${uuid}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation<ApiResponse<void>, string>({
      query: (uuid) => ({
        url: `/admin/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export default orderApi;

export const {
  useCreateOrderMutation,
  useGetAllOrdersForAdminQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
