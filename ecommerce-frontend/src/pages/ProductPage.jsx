import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  fetchProductDetails, 
  createProductReview, 
  resetProductDetails 
} from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Helmet } from 'react-helmet-async';
import { FaShoppingCart, FaArrowLeft, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [activeImg, setActiveImg] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading, error, product, success } = useSelector(
    (state) => state.product
  );
  
  const { userInfo } = useSelector((state) => state.user);
  
  useEffect(() => {
    if (success) {
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
      dispatch(resetProductDetails());
    }
    
    dispatch(fetchProductDetails(id));
    
    return () => {
      dispatch(resetProductDetails());
    };
  }, [dispatch, id, success]);
  
  useEffect(() => {
    if (product && product.image) {
      setActiveImg(product.image);
    }
  }, [product]);
  
  const addToCartHandler = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty,
      })
    );
    toast.success(`${product.name} added to cart`);
    navigate('/cart');
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview({
        productId: id,
        review: {
          rating,
          comment,
        },
      })
    );
  };
  
  // Calculate discount price if applicable
  const discountedPrice = product.discount 
    ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
    : null;
  
  return (
    <div className="container mx-auto px-4">
      <Link to="/" className="inline-flex items-center mb-4 text-primary-600 hover:text-primary-700">
        <FaArrowLeft className="mr-2" /> Back to Products
      </Link>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Helmet>
            <title>{product.name} | ShopMERN</title>
            <meta name="description" content={product.description} />
          </Helmet>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Product Images */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                <img
                  src={activeImg || product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              
              {/* Additional product images would go here */}
              {/* <div className="flex space-x-2">
                {[product.image, ...additionalImages].map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImg(img)}
                    className={`border-2 rounded overflow-hidden ${activeImg === img ? 'border-primary-500' : 'border-gray-200'}`}
                  >
                    <img src={img || "/placeholder.svg"} alt={`${product.name} view ${index}`} className="w-16 h-16 object-cover" />
                  </button>
                ))}
              </div> */}
            </div>
            
            {/* Product Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                
                <div className="mb-4">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} ${product.numReviews === 1 ? 'review' : 'reviews'}`}
                  />
                </div>
                
                <div className="mb-4">
                  {discountedPrice ? (
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-primary-600">${discountedPrice}</span>
                      <span className="ml-2 text-lg text-gray-500 line-through">${product.price}</span>
                      <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold">${product.price}</span>
                  )}
                </div>
                
                <div className="border-t border-b py-4 my-4">
                  <p className="text-gray-700">{product.description}</p>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Brand:</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span>Category:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={`font-medium ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Price:</span>
                    <span className="font-bold">
                      {discountedPrice ? `$${discountedPrice}` : `$${product.price}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span>Status:</span>
                    <span>
                      {product.countInStock > 0 ? (
                        <span className="text-green-600">In Stock</span>
                      ) : (
                        <span className="text-red-600">Out Of Stock</span>
                      )}
                    </span>
                  </div>
                  
                  {product.countInStock > 0 && (
                    <div className="flex justify-between mb-4">
                      <span>Quantity:</span>
                      <select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="form-control w-20"
                      >
                        {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  <button
                    onClick={addToCartHandler}
                    className="btn btn-primary w-full flex items-center justify-center"
                    disabled={product.countInStock === 0}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              {product.reviews.length === 0 && (
                <Message>No Reviews</Message>
              )}
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review._id} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-between">
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                    </div>
                    <p className="text-gray-600 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Write a Customer Review</h2>
              {userInfo ? (
                <form onSubmit={submitHandler} className="bg-white rounded-lg shadow-md p-4">
                  <div className="mb-4">
                    <label className="form-label">Rating</label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className={`text-2xl ${
                            star <= rating ? 'text-yellow-400' : 'text-gray-300'
                          } focus:outline-none`}
                        >
                          <FaStar />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="comment" className="form-label">Comment</label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="form-control"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              ) : (
                <Message>
                  Please <Link to="/login" className="text-primary-600 hover:underline">sign in</Link> to write a review
                </Message>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
