import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
        </Link>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <i
              key={index}
              className={`fas fa-star ${
                index < product.rating ? 'text-yellow-500' : 'text-gray-300'
              }`}
            ></i>
          ))}
          <span className="ml-1 text-gray-600">({product.numReviews} reviews)</span>
        </div>
        <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
        <Link
          to={`/product/${product._id}`}
          className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;