import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { logout } from '../redux/slices/userSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  
  const logoutHandler = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };
  
  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };
  
  return (
    <header className="bg-primary-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">ShopMERN</Link>
          </div>
          
          <div className="hidden md:block w-full max-w-md mx-8">
            <form onSubmit={submitHandler} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pr-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 rounded-r-full text-gray-600 hover:text-primary-600"
              >
                <FaSearch />
              </button>
            </form>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="flex items-center hover:text-primary-200 relative">
              <FaShoppingCart className="text-xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
              <span className="ml-1 hidden sm:inline">Cart</span>
            </Link>
            
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center hover:text-primary-200 focus:outline-none"
                >
                  <FaUser className="text-xl mr-1" />
                  <span className="hidden sm:inline">{userInfo.name}</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    
                    {userInfo.isAdmin && (
                      <>
                        <Link
                          to="/admin/userlist"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Users
                        </Link>
                        <Link
                          to="/admin/productlist"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Products
                        </Link>
                        <Link
                          to="/admin/orderlist"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Orders
                        </Link>
                      </>
                    )}
                    
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        logoutHandler();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center hover:text-primary-200">
                <FaUser className="text-xl mr-1" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
            
            <button
              className="md:hidden text-xl focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-600">
            <form onSubmit={submitHandler} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pr-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 rounded-r-full text-gray-600 hover:text-primary-600"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
