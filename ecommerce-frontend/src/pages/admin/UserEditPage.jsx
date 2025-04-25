"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaArrowLeft } from "react-icons/fa"
import { toast } from "react-toastify"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import FormContainer from "../../components/FormContainer"
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../redux/slices/usersApiSlice"

const UserEditPage = () => {
  const { id: userId } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId)

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login")
      return
    }

    if (user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user, userInfo, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin,
      }).unwrap()

      toast.success("User updated successfully")
      refetch()
      navigate("/admin/userlist")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/admin/userlist" className="flex items-center text-blue-600 hover:underline mb-4">
        <FaArrowLeft className="mr-1" /> Back to Users
      </Link>

      <FormContainer>
        <h1 className="text-2xl font-bold mb-6">Edit User</h1>

        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">{error?.data?.message || error.error}</Message>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-700">
                Admin
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loadingUpdate}
            >
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </div>
  )
}

export default UserEditPage
