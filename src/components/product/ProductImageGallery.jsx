import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const ProductImageGallery = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const galleryImages = [
    product.image,
    ...(product.gallery || []) 
  ].slice(0, 4); 

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-4"
    >
      <div className="relative">
        <img 
          className="w-full h-96 object-cover rounded-2xl shadow-lg"
          alt={`${product.name} - Main View`}
         src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
        <Badge className="absolute top-4 left-4 bg-green-600 text-white">
          {product.ecoTag}
        </Badge>
        {product.originalPrice > product.price && (
          <Badge className="absolute top-4 right-4 bg-red-500 text-white">
            Sale
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {galleryImages.map((imgKey, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
              selectedImageIndex === index ? 'border-green-600' : 'border-gray-200'
            }`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <img 
              className="w-full h-20 object-cover"
              alt={`${product.name} thumbnail ${index + 1}`}
             src="https://images.unsplash.com/photo-1618063229822-53ae138e7f12" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductImageGallery;