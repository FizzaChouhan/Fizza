// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProductDetails } from '../redux/slices/productSlice';
// import { addToCart } from '../redux/slices/cartSlice';

// const ProductDetailPage = () => {
//   const [qty, setQty] = useState(1);
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { product, isLoading, isError } = useSelector((state) => state.product);

//   useEffect(() => {
//     dispatch(getProductDetails(id));
//   }, [dispatch, id]);

//   const addToCartHandler = () => {
//     dispatch(
//       addToCart({
//         product: product._id,
//         name: product.name,
//         image: product.image,
//         price: product.price,
//         countInStock: product.countInStock,
//         qty,
//       })
//     );
//     navigate('/cart');
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="bg-red-100 text-red-700 p-4 rounded-lg">
//         Error loading product details
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 flex items-center text-blue-500 hover:underline"
//       >
//         <i className="fas fa-arrow-left mr-1"></i> Go Back
//       </button>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <img
//             src={product.image || "/placeholder.svg"}
//             alt={product.name}
//             className="w-full rounded-lg"
//           />
//         </div>

//         <div>
//           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//           <div className="flex items-center mb-4">
//             {[...Array(5)].map((_, index) => (
//               <i
//                 key={index}
//                 className={`fas fa-star ${
//                   index < product.rating ? 'text-yellow-500' : 'text-gray-300'
//                 }`}
//               ></i>
//             ))}
//             <span className="ml-1 text-gray-600">
//               ({product.numReviews} reviews)
//             </span>
//           </div>

//           <div className="border-t border-b py-4 my-4">
//             <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
//           </div>

//           <p className="mb-4">{product.description}</p>

//           <div className="border-t py-4">
//             <div className="flex items-center mb-4">
//               <span className="mr-4">Status:</span>
//               {product.countInStock > 0 ? (
//                 <span className="text-green-500">In Stock</span>
//               ) : (
//                 <span className="text-red-500">Out of Stock</span>
//               )}
//             </div>

//             {product.countInStock > 0 && (
//               <div className="flex items-center mb-4">
//                 <span className="mr-4">Quantity:</span>
//                 <select
//                   value={qty}
//                   onChange={(e) => setQty(Number(e.target.value))}
//                   className="border rounded p-2"
//                 >
//                   {[...Array(product.countInStock).keys()].map((x) => (
//                     <option key={x + 1} value={x + 1}>
//                       {x + 1}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             <button
//               onClick={addToCartHandler}
//               disabled={product.countInStock === 0}
//               className={`w-full py-2 px-4 rounded ${
//                 product.countInStock === 0
//                   ? 'bg-gray-300 cursor-not-allowed'
//                   : 'bg-blue-500 hover:bg-blue-600 text-white'
//               }`}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetailPage = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, isLoading, isError } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  const addToCartHandler = () => {
    if (!product) return;

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
    navigate('/cart');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        Error loading product details.
      </div>
    );
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price || 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-blue-500 hover:underline"
      >
        <i className="fas fa-arrow-left mr-1"></i> Go Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name || "Product"}
            className="w-full rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name || "No Name"}</h1>

          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`fas fa-star ${
                  index < (product.rating || 0) ? 'text-yellow-500' : 'text-gray-300'
                }`}
              ></i>
            ))}
            <span className="ml-1 text-gray-600">
              ({product.numReviews || 0} reviews)
            </span>
          </div>

          <div className="border-t border-b py-4 my-4">
            <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
          </div>

          <p className="mb-4">{product.description || "No description available."}</p>

          <div className="border-t py-4">
            <div className="flex items-center mb-4">
              <span className="mr-4">Status:</span>
              {product.countInStock > 0 ? (
                <span className="text-green-500">In Stock</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </div>

            {product.countInStock > 0 && (
              <div className="flex items-center mb-4">
                <span className="mr-4">Quantity:</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border rounded p-2"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`w-full py-2 px-4 rounded ${
                product.countInStock === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
