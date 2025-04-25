import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/userSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Helmet } from 'react-helmet-async';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { loading, error, userInfo } = useSelector((state) => state.user);
  
  const redirect = location.search ? location.search.split('=')[1] : '/';
  
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
    }
  };
  
  return (
    <div className="container mx-auto px-4 max-w-md">
      <Helmet>
        <title>Register | ShopMERN</title>
      </Helmet>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        
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
                required
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
                required
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
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control pl-10"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaLock />
              </div>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control pl-10"
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary w-full mb-4">
            Register
          </button>
          
          <div className="text-center">
            Have an Account?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              className="text-primary-600 hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
