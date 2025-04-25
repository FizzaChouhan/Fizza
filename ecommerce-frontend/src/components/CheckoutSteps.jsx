import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-between mb-8">
      <div className={`flex flex-col items-center ${step1 ? 'text-primary-600' : 'text-gray-400'}`}>
        {step1 ? (
          <Link to="/login" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
              <FaCheck />
            </div>
          </Link>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
            1
          </div>
        )}
        <span className="mt-1 text-sm">Sign In</span>
      </div>
      
      <div className={`flex-1 border-t border-gray-300 self-center mx-2`}></div>
      
      <div className={`flex flex-col items-center ${step2 ? 'text-primary-600' : 'text-gray-400'}`}>
        {step2 ? (
          <Link to="/shipping" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
              <FaCheck />
            </div>
          </Link>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
            2
          </div>
        )}
        <span className="mt-1 text-sm">Shipping</span>
      </div>
      
      <div className={`flex-1 border-t border-gray-300 self-center mx-2`}></div>
      
      <div className={`flex flex-col items-center ${step3 ? 'text-primary-600' : 'text-gray-400'}`}>
        {step3 ? (
          <Link to="/payment" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
              <FaCheck />
            </div>
          </Link>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
            3
          </div>
        )}
        <span className="mt-1 text-sm">Payment</span>
      </div>
      
      <div className={`flex-1 border-t border-gray-300 self-center mx-2`}></div>
      
      <div className={`flex flex-col items-center ${step4 ? 'text-primary-600' : 'text-gray-400'}`}>
        {step4 ? (
          <Link to="/placeorder" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
              <FaCheck />
            </div>
          </Link>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
            4
          </div>
        )}
        <span className="mt-1 text-sm">Place Order</span>
      </div>
    </div>
  );
};

export default CheckoutSteps;
