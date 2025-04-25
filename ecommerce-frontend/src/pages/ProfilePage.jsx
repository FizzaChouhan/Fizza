import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/slices/userSlice';
import { listMyOrders } from '../redux/slices/orderSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Helmet } from 'react-helmet-async';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const dispatch = useDispatch();
  
  const { loading, error, userInfo, success } = useSelector((state) => state.user);
  const { loading: loadingOrders, error: errorOrders, orders } = useSelector(
    (state) => state.order
  );
  
  useEffect(() => {
    if (!userInfo) {
      return;
    }
    
    setName(userInfo.name);
    setEmail(userInfo.email);
    
    dispatch(listMyOrders());
  }, [dispatch, userInfo]);
  
  useEffect(() => {
    if (success) {
      toast.success('Profile updated successfully');
    }
  }, [success]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: userInfo._id,
          name,
          email,
          password: password ? password : undefined,
        })
      );
      setPassword('');
      setConfirmPassword('');
    }
  };
  
  return (
    <div className="container mx-auto px-4">
      <Helmet>
        <title>User Profile | ShopMERN</title>
      </Helmet>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">User Profile</h2>
            
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control pl-10"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control pl-10"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaLock />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control pl-10 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaLock />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control pl-10 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary w-full">
                Update
              </button>
            </form>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">My Orders</h2>
            
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant="danger">{errorOrders}</Message>
            ) : orders && orders.length === 0 ? (
              <Message>You have no orders</Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        DATE
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TOTAL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        PAID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        DELIVERED
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${order.totalPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {order.isPaid ? (
                            <span className="badge badge-success">
                              {order.paidAt.substring(0, 10)}
                            </span>
                          ) : (
                            <span className="badge badge-danger">Not Paid</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {order.isDelivered ? (
                            <span className="badge badge-success">
                              {order.deliveredAt.substring(0, 10)}
                            </span>
                          ) : (
                            <span className="badge badge-danger">Not Delivered</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Link
                            to={`/order/${order._id}`}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
