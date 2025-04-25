import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color = 'text-yellow-400' }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span key={index} className={color}>
            {value >= ratingValue ? (
              <FaStar />
            ) : value >= ratingValue - 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        );
      })}
      {text && <span className="ml-1 text-sm text-gray-600">{text}</span>}
    </div>
  );
};

export default Rating;

