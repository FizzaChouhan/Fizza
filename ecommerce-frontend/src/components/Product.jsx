// import { Link } from 'react-router-dom';
// import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
// import products from '../../../ecommerce-backend/data/products';

// const Product = ({ products }) => {
//   // Calculate discount price if applicable
//   const discountedPrice = products.discount 
//     ? (products.price - (products.price * products.discount / 100)).toFixed(2) 
//     : null;
  
//   return (
//     <div className="card group transition-transform hover:-translate-y-1 hover:shadow-lg">
//       <Link to={`/products/${products._id}`}>
//         <div className="relative overflow-hidden">
//           <img 
//             src={products.imageUrl || "/placeholder.svg"} 
//             alt={products.name} 
//             className="w-full h-64 object-cover object-center transition-transform group-hover:scale-105"
//           />
          
//           {products.discount > 0 && (
//             <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//               {products.discount}% OFF
//             </div>
//           )}
          
//           {products.countInStock === 0 && (
//             <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
//               Out of Stock
//             </div>
//           )}
//         </div>
//       </Link>
      
//       <div className="p-4">
//         <Link to={`/products/${products._id}`}>
//           <h2 className="text-lg font-semibold mb-2 hover:text-primary-600 line-clamp-2 h-14">
//             {products.name}
//           </h2>
//         </Link>
        
//         <div className="mb-2 flex text-yellow-400">
//           {[...Array(5)].map((_, index) => {
//             const value = index + 1;
//             return (
//               <span key={index}>
//                 {products.rating >= value ? (
//                   <FaStar />
//                 ) : products.rating >= value - 0.5 ? (
//                   <FaStarHalfAlt />
//                 ) : (
//                   <FaRegStar />
//                 )}
//               </span>
//             );
//           })}
//           <span className="ml-1 text-xs text-gray-500">
//             ({products.numReviews} {products.numReviews === 1 ? 'review' : 'reviews'})
//           </span>
//         </div>
        
//         <div className="flex justify-between items-center">
//           <div>
//             {discountedPrice ? (
//               <div className="flex items-center">
//                 <span className="text-lg font-bold text-primary-600">${discountedPrice}</span>
//                 <span className="ml-2 text-sm text-gray-500 line-through">${products.price}</span>
//               </div>
//             ) : (
//               <span className="text-lg font-bold">${products.price}</span>
//             )}
//           </div>
          
//           <Link 
//             to={`/products/${products._id}`}
//             className="btn btn-primary text-sm"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default products;

import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Product = ({ product }) => {
  if (!product) {
    return null; // In case no product data is passed, don't render
  }

  // Calculate discount price if applicable
  const discountedPrice = product.discount 
    ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
    : null;

  return (
    <div className="card group transition-transform hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden">
          <img 
            src={product.imageUrl
              } 
            alt={product.name || 'Product Image'} 
            className="w-full h-64 object-cover object-center transition-transform group-hover:scale-105"
          />
          
          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </div>
          )}
          
          {product.countInStock === 0 && (
            <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold mb-2 hover:text-primary-600 line-clamp-2 h-14">
            {product.name || 'Product Name'}
          </h2>
        </Link>
        
        <div className="mb-2 flex text-yellow-400">
          {[...Array(5)].map((_, index) => {
            const value = index + 1;
            return (
              <span key={index}>
                {product.rating >= value ? (
                  <FaStar />
                ) : product.rating >= value - 0.5 ? (
                  <FaStarHalfAlt />
                ) : (
                  <FaRegStar />
                )}
              </span>
            );
          })}
          <span className="ml-1 text-xs text-gray-500">
            ({product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'})
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            {discountedPrice ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-primary-600">${discountedPrice}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${product.price}</span>
              </div>
            ) : (
              <span className="text-lg font-bold">${product.price}</span>
            )}
          </div>
          
          <Link 
            to={`/product/${product._id}`}
            className="btn btn-primary text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
