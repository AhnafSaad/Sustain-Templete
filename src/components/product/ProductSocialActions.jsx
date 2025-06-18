import React from 'react';
import { Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ProductSocialActions = () => {
  const { toast } = useToast();

  const handleWishlist = () => {
    toast({
      title: "🚧 Wishlist feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleShare = () => {
    toast({
      title: "🚧 Share feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleWishlist}
        className="border-gray-300 text-gray-600 hover:bg-gray-50"
        aria-label="Add to wishlist"
      >
        <Heart className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="border-gray-300 text-gray-600 hover:bg-gray-50"
        aria-label="Share product"
      >
        <Share2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ProductSocialActions;