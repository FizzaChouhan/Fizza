import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, calculatePrices } from '../redux/slices/cartSlice';
import Message from '../components/Message';
import { Helmet } from 'react-helmet-async';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector((state) => state.cart);
  
  useEffect(() => {
    dispatch(calculatePrices());
  }, [dispatch, cartItems]);
  
  const removeFromCartHandler = (id) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      dispatch(removeFromCart(id));
    }
  };
  
  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };
  
  return (
    <div className="container mx-auto px-4">
      <Helmet>
        <title>Shopping Cart | ShopMERN</title>
      </Helmet>
      
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">
            <FaShoppingCart className="mx-auto text-5xl mb-4" />
            <p className="text-xl">Your cart is empty</p>
          </div>
          <Link to="/" className="btn btn-primary">
            <FaArrowLeft className="mr-2" /> Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cartItems.map((item) => (
                <div key={item.product} className="flex flex-col md:flex-row border-b last:border-b-0 p-4">
                  <div className="md:w-24 md:h-24 mb-4 md:mb-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  
                  <div className="md:ml-4 flex-grow">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-lg font-semibold hover:text-primary-600"
                    >
                      {item.name}
                    </Link>
                    
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                  
                  <div className="flex items-center mt-4 md:mt-0">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart({
                            ...item,
                            qty: Number(e.target.value),
                          })
                        )
                      }
                      className="form-control w-20 mr-4"
                    >
                      {[...Array(Math.min(item.countInStock, 10)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}):</span>
                  <span>${itemsPrice?.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shippingPrice?.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${taxPrice?.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              
              <button
                type="button"
                className="btn btn-primary w-full"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
