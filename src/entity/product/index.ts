export {
  default as productApi,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "./api";
export {
  getCatalogProductByUuid,
  getCatalogProducts,
  searchCatalogProducts,
  testProducts,
} from "./lib/catalog";
