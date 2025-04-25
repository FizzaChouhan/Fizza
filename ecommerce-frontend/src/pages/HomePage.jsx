import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../redux/slices/productSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import FeaturedProducts from '../components/FeaturedProducts';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  const { keyword, pageNumber = 1, category } = useParams();
  
  const dispatch = useDispatch();
  
  const { 
    products, 
    page, 
    pages, 
    categories,
    loading, 
    error 
  } = useSelector((state) => state.product);
  
  useEffect(() => {
    dispatch(fetchProducts({ keyword, pageNumber, category }));
    dispatch(fetchCategories());
  }, [dispatch, keyword, pageNumber, category]);
  
  return (
    <div className="container mx-auto px-4">
      <Helmet>
        <title>ShopMERN | Home</title>
        <meta name="description" content="Find the best products for the cheapest prices" />
      </Helmet>
      
      {!keyword && !category ? (
        <>
          <ProductCarousel />
          <FeaturedProducts />
        </>
      ) : (
        <div className="mb-4">
          <Link to="/" className="btn btn-outline">
            Go Back
          </Link>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row">
        {/* Categories sidebar */}
        <div className="w-full md:w-64 mb-6 md:mb-0 md:mr-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className={`block hover:text-primary-600 ${!category ? 'font-semibold text-primary-600' : ''}`}
                >
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <Link 
                    to={`/category/${cat}`} 
                    className={`block hover:text-primary-600 ${category === cat ? 'font-semibold text-primary-600' : ''}`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">
            {keyword 
              ? `Search Results for "${keyword}"` 
              : category 
                ? `${category} Products` 
                : 'Latest Products'}
          </h1>
          
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : products.length === 0 ? (
            <Message>No products found</Message>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
              <Paginate 
                pages={pages} 
                page={Number(page)} 
                keyword={keyword ? keyword : ''} 
                category={category ? category : ''}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
