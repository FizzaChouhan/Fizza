import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../redux/slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';

const PaymentPage = () => {
  const { shippingAddress, paymentMethod: savedPaymentMethod } = useSelector(
    (state) => state.cart
  );
  
  const [paymentMethod, setPaymentMethod] = useState(savedPaymentMethod || 'PayPal');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };
  
  return (
    <div className="container mx-auto px-4 max-w-md">
      <Helmet>
        <title>Payment Method | ShopMERN</title>
      </Helmet>
      
      <CheckoutSteps step1 step2 step3 />
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
        
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label className="form-label">Select Method</label>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <label htmlFor="PayPal" className="ml-3 flex items-center text-gray-700">
                  <FaPaypal className="text-blue-500 mr-2" /> PayPal or Credit Card
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Stripe"
                  name="paymentMethod"
                  value="Stripe"
                  checked={paymentMethod === 'Stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <label htmlFor="Stripe" className="ml-3 flex items-center text-gray-700">
                  <FaCreditCard className="text-purple-500 mr-2" /> Stripe
                </label>
              </div>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary w-full">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
