import { Link } from "react-router-dom"
import { FaHome, FaSearch, FaShoppingCart } from "react-icons/fa"

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="relative mx-auto w-40 h-40 mb-4">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-bold text-red-500">404</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Page Not Found</h1>
          <p className="text-gray-600 mb-8">Oops! The page you're looking for doesn't exist or has been moved.</p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition-colors"
          >
            <FaHome className="mr-2" /> Back to Homepage
          </Link>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              <FaSearch className="mr-2" /> Browse Products
            </Link>
            <Link
              to="/cart"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              <FaShoppingCart className="mr-2" /> View Cart
            </Link>
          </div>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          <p>
            If you believe this is an error, please{" "}
            <Link to="/contact" className="text-blue-600 hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
