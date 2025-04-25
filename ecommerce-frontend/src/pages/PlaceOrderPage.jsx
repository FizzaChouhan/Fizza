import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from "../components/ui/button.jsx"
import { Card, CardHeader, CardContent } from "../components/ui/Card"
import Message from '../components/Message.jsx';
import CheckoutSteps from '../components/CheckoutSteps.jsx';
import Loader from '../components/Loader.jsx';
import { useCreateOrderMutation } from '../redux/slices/ordersApiSlice.js';
import { clearCartItems } from '../redux/slices/cartSlice.js';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Place Order</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="p-4 shadow-md">
              <h2 className="text-lg font-semibold mb-3">Shipping</h2>
              <p className="mb-2">
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </Card>

            <Card className="p-4 shadow-md">
              <h2 className="text-lg font-semibold mb-3">Payment Method</h2>
              <p className="mb-2">
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </Card>

            <Card className="p-4 shadow-md">
              <h2 className="text-lg font-semibold mb-3">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div className="space-y-4">
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center py-2 border-b last:border-b-0">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <Link 
                          to={`/product/${item.product}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="text-right">
                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card className="p-4 shadow-md">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div>Items</div>
                  <div>${cart.itemsPrice}</div>
                </div>

                <div className="flex justify-between">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice}</div>
                </div>

                <div className="flex justify-between">
                  <div>Tax</div>
                  <div>${cart.taxPrice}</div>
                </div>

                <div className="flex justify-between font-bold border-t pt-2">
                  <div>Total</div>
                  <div>${cart.totalPrice}</div>
                </div>

                {error && (
                  <div className="my-3">
                    <Message variant="error">{error.data?.message || error.error}</Message>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    disabled={cart.cartItems.length === 0 || isLoading}
                    onClick={placeOrderHandler}
                    className="w-full"
                  >
                    {isLoading ? <Loader small /> : 'Place Order'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;

               

