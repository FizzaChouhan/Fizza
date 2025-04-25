
import { PRODUCTS_URL, UPLOADS_URL } from "../../../constants.js"
import { apiSlice } from "./apiSlice.js"
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword = "", pageNumber = 1, category = "", sortField = "name", sortDirection = "asc" }) => ({
        url: PRODUCTS_URL,
        params: { keyword, pageNumber, category, sortField, sortDirection },
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useUploadProductImageMutation,
  useGetTopProductsQuery,
} = productsApiSlice
