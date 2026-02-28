import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type ApiResponse,
  baseQuery,
  type CreateOrderRequestDTO,
  type OrderDTO,
} from "shared/api";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQuery("order"),
  endpoints: (builder) => ({
    createOrder: builder.mutation<ApiResponse<OrderDTO>, CreateOrderRequestDTO>(
      {
        query: (body) => ({
          url: "",
          method: "POST",
          body,
        }),
      },
    ),
  }),
});

export default orderApi;

export const { useCreateOrderMutation } = orderApi;
