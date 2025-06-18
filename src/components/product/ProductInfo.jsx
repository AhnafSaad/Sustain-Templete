import React from 'react';
import { Star, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; 
import ProductSocialActions from '@/components/product/ProductSocialActions';

const ProductInfo = ({ product, reviewsCount, onWriteReview }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="border-green-600 text-green-600">
          {product.category}
        </Badge>
        <ProductSocialActions />
      </div>

      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-gray-600">({reviewsCount > 0 ? reviewsCount : product.reviews} reviews)</span>
        <Button 
            variant="link"
            className="text-green-600 hover:underline p-0 h-auto text-sm"
            onClick={onWriteReview}
        >
            Write a review
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-3xl font-bold text-green-600">${product.price}</span>
        {product.originalPrice > product.price && (
          <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
        )}
        {product.originalPrice > product.price && (
          <Badge className="bg-red-500 text-white">
            Save ${(product.originalPrice - product.price).toFixed(2)}
          </Badge>
        )}
      </div>

      <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Key Features:</h3>
        <div className="grid grid-cols-1 gap-2">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;