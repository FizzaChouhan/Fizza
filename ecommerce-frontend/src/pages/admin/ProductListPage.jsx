"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaEdit, FaTrash, FaPlus, FaSort, FaSortUp, FaSortDown } from "react-icons/fa"
import { toast } from "react-toastify"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import Paginate from "../../components/Paginate"
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../redux/slices/productsApiSlice"

const ProductListPage = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState("")
  const [category, setCategory] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword,
    pageNumber: page,
    category,
    sortField,
    sortDirection,
  })

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login")
    }
  }, [userInfo, navigate])

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        const result = await createProduct().unwrap()
        navigate(`/admin/product/${result.product._id}/edit`)
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap()
        refetch()
        toast.success("Product deleted successfully")
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const sortHandler = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="inline ml-1" />
    return sortDirection === "asc" ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    refetch()
  }

  const categories = data?.categories || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={createProductHandler}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Create Product
        </button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
            Search
          </button>
        </form>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            setPage(1)
          }}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortHandler("_id")}>
                    ID {getSortIcon("_id")}
                  </th>
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortHandler("name")}>
                    Name {getSortIcon("name")}
                  </th>
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortHandler("price")}>
                    Price {getSortIcon("price")}
                  </th>
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortHandler("category")}>
                    Category {getSortIcon("category")}
                  </th>
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortHandler("brand")}>
                    Brand {getSortIcon("brand")}
                  </th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{product._id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded mr-3"
                        />
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">${product.price}</td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4">{product.brand}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-3">
                        <Link to={`/admin/product/${product._id}/edit`} className="text-blue-600 hover:text-blue-800">
                          <FaEdit className="text-lg" />
                        </Link>
                        <button onClick={() => deleteHandler(product._id)} className="text-red-600 hover:text-red-800">
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Paginate
              pages={data.pages}
              page={data.page}
              isAdmin={true}
              keyword={keyword ? keyword : ""}
              setPage={setPage}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ProductListPage
