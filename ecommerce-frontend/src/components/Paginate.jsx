import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '', category = '' }) => {
  if (pages <= 1) return null;

  const getPageUrl = (pageNumber) => {
    if (isAdmin) {
      return `/admin/productlist/${pageNumber}`;
    }
    
    if (keyword) {
      return `/search/${keyword}/page/${pageNumber}`;
    }
    
    if (category) {
      return `/category/${category}/page/${pageNumber}`;
    }
    
    return `/page/${pageNumber}`;
  };

  return (
    <div className="flex justify-center mt-8">
      <ul className="flex space-x-1">
        {[...Array(pages).keys()].map((x) => (
          <li key={x + 1}>
            <Link
              to={getPageUrl(x + 1)}
              className={`px-3 py-2 rounded-md ${
                x + 1 === page
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {x + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paginate;
