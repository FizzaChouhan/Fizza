import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import { FaMapMarkerAlt, FaCity, FaGlobe, FaMailBulk } from 'react-icons/fa';

const ShippingPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };
  
  return (
    <div className="container mx-auto px-4 max-w-md">
      <Helmet>
        <title>Shipping | ShopMERN</title>
      </Helmet>
      
      <CheckoutSteps step1 step2 />
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Shipping</h1>
        
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="address" className="form-label">Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaMapMarkerAlt />
              </div>
              <input
                type="text"
                id="address"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control pl-10"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="city" className="form-label">City</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaCity />
              </div>
              <input
                type="text"
                id="city"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-control pl-10"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="postalCode" className="form-label">Postal Code</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaMailBulk />
              </div>
              <input
                type="text"
                id="postalCode"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="form-control pl-10"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="country" className="form-label">Country</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <FaGlobe />
              </div>
              <input
                type="text"
                id="country"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-control pl-10"
                required
              />
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

export default ShippingPage;
