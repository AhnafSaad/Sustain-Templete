import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProductReviews = ({ reviews, onWriteReview }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews ({reviews.length})</h2>
        <Button onClick={onWriteReview} className="bg-green-600 hover:bg-green-700 text-white">
          Write a Review
        </Button>
      </div>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-3 p-4 bg-gray-50 rounded-lg shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                {review.verified && (
                  <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                    Verified Purchase
                  </Badge>
                )}
              </div>
              <p className="text-gray-700 italic">"{review.comment}"</p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="font-medium">{review.name}</span>
                <span>{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-4">Be the first to review this product!</p>
      )}
    </div>
  );
};

export default ProductReviews;