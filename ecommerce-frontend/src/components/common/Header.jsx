import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          ShopMERN
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/cart" className="flex items-center">
                <i className="fas fa-shopping-cart mr-1"></i> Cart
                {cartItems.length > 0 && (
                  <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                )}
              </Link>
            </li>
            {user ? (
              <li className="relative group">
                <button className="flex items-center">
                  {user.name} <i className="fas fa-caret-down ml-1"></i>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg hidden group-hover:block">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login">
                  <i className="fas fa-user mr-1"></i> Sign In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;