"use client"; // Assuming this is a client component

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReviewCard from "@/components/common/ReviewCard";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useAppSelector } from "@/lib/hooks/redux";
import { Loader2 } from "lucide-react";
import { Review } from "@/types/review.types";

const ReviewsContent = ({ productId }: { productId: string }) => {
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("authToken");
  const userId = useAppSelector((state) => state.user._id);

  const resetForm = () => {
    setRating(null);
    setReviewText("");
    setIsWritingReview(false);
  };

  // Fetch reviews for the product
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ROOT_API}/reviews/product/${productId}`
        );
        if (response.data && Array.isArray(response.data.reviews)) {
          setReviews(response.data.reviews);
        } else {
          setError("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleButtonClick = () => {
    if (!isWritingReview) {
      setIsWritingReview(true);
    } else if (rating && reviewText) {
      handleSubmitReview();
    }
  };

  const handleSubmitReview = async () => {
    if (!rating || !reviewText) return;

    setIsSubmitting(true);

    try {
      const reviewData = {
        product: productId,
        user: userId,
        rating,
        review: reviewText,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ROOT_API}/reviews`,
        reviewData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.success && response.data.data) {
        // Fetch the updated reviews to ensure we have the complete review object with user details
        const updatedResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_ROOT_API}/reviews/product/${productId}`
        );

        if (
          updatedResponse.data &&
          Array.isArray(updatedResponse.data.reviews)
        ) {
          setReviews(updatedResponse.data.reviews);
          // Reset form after successful submission
          resetForm();
        }
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    (isWritingReview && (!rating || !reviewText)) || isSubmitting;

  // Simple star rating component
  const StarRating = () => (
    <div className="flex gap-1 mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className={`text-2xl ${
            rating && star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          disabled={isSubmitting}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <section>
      <div className="flex items-center justify-between flex-col sm:flex-row mb-5 sm:mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <h3 className="text-xl sm:text-2xl font-bold text-black mr-2">
            All Reviews
          </h3>
          <span className="text-sm sm:text-base text-black/60">
            ({reviews.length})
          </span>
        </div>
        <div className="flex items-center space-x-2.5">
          <Select defaultValue="latest">
            <SelectTrigger className="min-w-[120px] font-medium text-xs sm:text-base px-4 py-3 sm:px-5 sm:py-4 text-black bg-[#F0F0F0] border-none rounded-full h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="most-relevant">Most Relevant</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="button"
            className="sm:min-w-[166px] px-4 py-3 sm:px-5 sm:py-4 rounded-full bg-black font-medium text-xs sm:text-base h-12"
            onClick={handleButtonClick}
            disabled={isSubmitDisabled}
          >
            {isWritingReview ? (
              isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </div>
              ) : (
                "Submit Review"
              )
            ) : (
              "Write a Review"
            )}
          </Button>
        </div>
      </div>

      {isWritingReview && (
        <div className="mb-6 p-4 border rounded-lg">
          <div className="flex items-center space-x-2">
            <StarRating />
            <div className="text-xs text-black/60">{rating ? rating : 0}/5</div>
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-2 border rounded-md resize-none h-24"
            disabled={isSubmitting}
          />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : reviews.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No reviews yet</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5 sm:mb-9">
          {reviews.map((review) =>
            review && review._id ? (
              <ReviewCard
                key={review._id}
                data={review}
                isDate
                className="h-full"
              />
            ) : null
          )}
        </div>
      )}

      {reviews.length > 0 && (
        <div className="w-full px-4 sm:px-0 text-center">
          <Link
            href="#"
            className="inline-block w-[230px] px-11 py-4 border rounded-full hover:bg-black hover:text-white text-black transition-all font-medium text-sm sm:text-base border-black/10"
          >
            Load More Reviews
          </Link>
        </div>
      )}
    </section>
  );
};

export default ReviewsContent;
