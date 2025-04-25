import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '../redux/slices/productSlice';
import Product from './Product';
import Loader from './Loader';
import Message from './Message';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  
  const { featuredProducts, loading, error } = useSelector((state) => state.product);
  
  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);
  
  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (featuredProducts.length === 0) return null;
  
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
