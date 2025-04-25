import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Message from '../../components/Message.jsx'
import Loader from '../../components/Loader.jsx'
import Paginate from '../../components/Paginate.jsx'
import { 
  useGetUsersQuery, 
  useDeleteUserMutation 
} from '../../redux/slices/usersApiSlice.js'

const UserListPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [sortField, setSortField] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  
  const { data, isLoading, error, refetch } = useGetUsersQuery({
    keyword,
    pageNumber: page,
    sortField,
    sortDirection
  })
  
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()
  
  const { userInfo } = useSelector((state) => state.auth)
  
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }
  }, [userInfo, navigate])
  
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap()
        refetch()
        toast.success('User deleted successfully')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  
  const sortHandler = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="inline ml-1" />
    return sortDirection === 'asc' ? 
      <FaSortUp className="inline ml-1" /> : 
      <FaSortDown className="inline ml-1" />
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    refetch()
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>
      
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search users..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>
      
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
                  <th 
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => sortHandler('_id')}
                  >
                    ID {getSortIcon('_id')}
                  </th>
                  <th 
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => sortHandler('name')}
                  >
                    Name {getSortIcon('name')}
                  </th>
                  <th 
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => sortHandler('email')}
                  >
                    Email {getSortIcon('email')}
                  </th>
                  <th 
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => sortHandler('isAdmin')}
                  >
                    Admin {getSortIcon('isAdmin')}
                  </th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{user._id}</td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">
                      <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                        {user.email}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500 inline" />
                      ) : (
                        <FaTimes className="text-red-500 inline" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center space-x-3">
                        <Link
                          to={`/admin/user/${user._id}/edit`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit className="text-lg" />
                        </Link>
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="text-red-600 hover:text-red-800"
                          disabled={user._id === userInfo._id}
                        >
                          <FaTrash className={`text-lg ${user._id === userInfo._id ? 'opacity-50 cursor-not-allowed' : ''}`} />
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
              keyword={keyword ? keyword : ''} 
              setPage={setPage}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default UserListPage
