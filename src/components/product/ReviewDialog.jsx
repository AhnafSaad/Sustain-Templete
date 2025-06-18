import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import StarRatingInput from '@/components/product/StarRatingInput';
import { useToast } from '@/components/ui/use-toast';

const ReviewDialog = ({ isOpen, onOpenChange, productName, onSubmit, userName, isUserLoggedIn }) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState(userName);
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setName(userName); 
  }, [userName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUserLoggedIn) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please log in to submit a review."
      });
      onOpenChange(false);
      return;
    }
    if (rating === 0 || !name.trim() || !comment.trim()) {
      toast({
        variant: "destructive",
        title: "Incomplete Review",
        description: "Please provide a rating, name, and comment."
      });
      return;
    }
    onSubmit({ rating, name, comment });
    setRating(0);
    setComment('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write a Review for {productName}</DialogTitle>
          <DialogDescription>
            Share your thoughts about this product with other customers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating-modal" className="text-right">
              Rating
            </Label>
            <div className="col-span-3">
              <StarRatingInput rating={rating} setRating={setRating} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name-modal" className="text-right">
              Name
            </Label>
            <Input
              id="name-modal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              disabled={!!isUserLoggedIn && !!userName} 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="comment-modal" className="text-right">
              Comment
            </Label>
            <Textarea
              id="comment-modal"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="col-span-3"
              placeholder="Tell us more about your experience..."
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Submit Review</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;