import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../../constants.js"

// Create the apiSlice
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // Include credentials in the request
    credentials: "include",
    // Prepare headers for each request
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the auth state
      const token = getState().auth.userInfo?.token

      // If we have a token, add it to the headers
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ["Product", "Order", "User", "Products", "Orders", "Users"],
  endpoints: (builder) => ({}),
})
