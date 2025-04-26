import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopProducts } from '../redux/slices/productSlice';
import Loader from './Loader';
import Message from './Message';

const ProductCarousel = () => {
  const dispatch = useDispatch();
  
  const { topProducts, loading, error } = useSelector((state) => state.product);
  
  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);
  
  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (topProducts.length === 0) return null;
  
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <div className="flex overflow-x-auto snap-x scrollbar-hide">
          {topProducts.map((product) => (
            <div 
              key={product._id} 
              className="min-w-full snap-center relative"
            >
              <Link to={`/product/${product._id}`}>
                <img 
                  src={product.imageUrl } 
                  alt={product.name} 
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h2 className="text-white text-xl md:text-2xl font-bold mb-2">{product.name}</h2>
                  <p className="text-white text-sm md:text-base">${product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
