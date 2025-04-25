"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaEye, FaSort, FaSortUp, FaSortDown } from "react-icons/fa"
import Message from "../../components/Message.jsx"
import Loader from "../../components/Loader.jsx"
import Paginate from "../../components/Paginate.jsx"
import { useGetOrdersQuery } from "../../redux/slices/ordersApiSlice.js"

const OrderListPage = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState("")
  const [sortField, setSortField] = useState("createdAt")
  const [sortDirection, setSortDirection] = useState("desc")
  const [filterPaid, setFilterPaid] = useState("")
  const [filterDelivered, setFilterDelivered] = useState("")

  const { data, isLoading, error, refetch } = useGetOrdersQuery({
    keyword,
    pageNumber: page,
    sortField,
    sortDirection,
    filterPaid,
    filterDelivered,
  })

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login")
    }
  }, [userInfo, navigate])

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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex flex-1">
          <input
            type="text"
            placeholder="Search orders by ID or customer name..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
            Search
          </button>
        </form>

        <select
          value={filterPaid}
          onChange={(e) => {
            setFilterPaid(e.target.value)
            setPage(1)
          }}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Payment Status</option>
          <option value="true">Paid</option>
          <option value="false">Not Paid</option>
        </select>

        <select
          value={filterDelivered}
          onChange={(e) => {
            setFilterDelivered(e.target.value)
            setPage(1)
          }}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Delivery Status</option>
          <option value="true">Delivered</option>
          <option value="false">Not Delivered</option>
        </select>
      </div>

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
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortHandler("user.name")}>
                    User {getSortIcon("user.name")}
                  </th>
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortHandler("createdAt")}>
                    Date {getSortIcon("createdAt")}
                  </th>
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortHandler("totalPrice")}>
                    Total {getSortIcon("totalPrice")}
                  </th>
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortHandler("isPaid")}>
                    Paid {getSortIcon("isPaid")}
                  </th>
                  <th className="py-3 px-4 text-left cursor-pointer" onClick={() => sortHandler("isDelivered")}>
                    Delivered {getSortIcon("isDelivered")}
                  </th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{order._id}</td>
                    <td className="py-3 px-4">{order.user ? order.user.name : "User deleted"}</td>
                    <td className="py-3 px-4">{formatDate(order.createdAt)}</td>
                    <td className="py-3 px-4">${order.totalPrice}</td>
                    <td className="py-3 px-4">
                      {order.isPaid ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {formatDate(order.paidAt)}
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Not Paid</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {order.isDelivered ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {formatDate(order.deliveredAt)}
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Not Delivered</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Link to={`/order/${order._id}`} className="text-blue-600 hover:text-blue-800">
                        <FaEye className="text-lg inline" />
                      </Link>
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

export default OrderListPage
