import React from 'react';
import { Star } from 'lucide-react';

const StarRatingInput = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={starValue}
            className={`w-6 h-6 cursor-pointer ${
              starValue <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onClick={() => setRating(starValue)}
            aria-label={`Rate ${starValue} out of 5 stars`}
          />
        );
      })}
    </div>
  );
};

export default StarRatingInput;