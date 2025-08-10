"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import axios from "axios";

const ProductDescription = ({
  description,
}) => {
  const { id } = useParams();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    review_content: "",
    rating_point: 5,
  });

  // Fetch product reviews function
  const fetchReviews = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-review`,
        {
          params: { product_id: id }
        }
      );
      if (response.data && Array.isArray(response.data)) {
        setReviews(response.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      // If the endpoint doesn't exist, we'll use mock data for now
      setReviews([
        {
          id: 1,
          user: {
            name: "Jhon Abraham",
            profile_photo: "/reciew1.png"
          },
          review_content: "negatives. But the structure wasfrom the funny the century rather. initial all the made, have spare to negatives. WeVe created a full-stack structure for our working workflow processes, were from the funny the century initial all the made, have spare to negatives.",
          rating_point: 4,
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          user: {
            name: "Jhon Abraham",
            profile_photo: "/reciew2.png"
          },
          review_content: "negatives. But the structure wasfrom the funny the century rather. initial all the made, have spare to negatives. WeVe created a full-stack structure for our working workflow processes, were from the funny the century initial all the made, have spare to negatives.",
          rating_point: 4,
          created_at: new Date().toISOString()
        },
        {
          id: 3,
          user: {
            name: "Jhon Abraham",
            profile_photo: "/reciew3.png"
          },
          review_content: "negatives. But the structure wasfrom the funny the century rather. initial all the made, have spare to negatives. WeVe created a full-stack structure for our working workflow processes, were from the funny the century initial all the made, have spare to negatives.",
          rating_point: 4,
          created_at: new Date().toISOString()
        },
        {
          id: 4,
          user: {
            name: "Jhon Abraham",
            profile_photo: "/reciew4.png"
          },
          review_content: "negatives. But the structure wasfrom the funny the century rather. initial all the made, have spare to negatives. WeVe created a full-stack structure for our working workflow processes, were from the funny the century initial all the made, have spare to negatives.",
          rating_point: 4,
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch product reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, [id]);

  // Handle review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      toast.error("You must be logged in to submit a review");
      return;
    }

    if (!reviewForm.review_content.trim()) {
      toast.error("Please enter your review");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/store-review`,
        {
          product_id: id,
          review_content: reviewForm.review_content,
          rating_point: reviewForm.rating_point
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data.status) {
        toast.success("Review submitted successfully! wait for admin approval");
        setReviewForm({ review_content: "", rating_point: 5 });
        // Refresh reviews
        fetchReviews();
      } else {
        throw new Error(response.data.message || "Failed to submit review");
      }
    } catch (error) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const openAllReviews = () => {
    setShowAllReviews(true);
  };

  const closeAllReviews = () => {
    setShowAllReviews(false);
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating_point, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      const rating = Math.floor(review.rating_point);
      if (distribution[rating] !== undefined) {
        distribution[rating]++;
      }
    });
    return distribution;
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="description" className="w-full">
        {/* Tabs Header */}
        <div className="overflow-x-auto">
          <TabsList className="flex min-w-max sm:min-w-0 gap-6 sm:gap-[60px] md:gap-[93px] w-full bg-transparent border-b border-gray-200 rounded-none h-auto p-0 justify-start">
            <TabsTrigger
              value="description"
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary  data-[state=active]:border-b-primary data-[state=active]:shadow-none text-heading hover:text-gray-900 rounded-none border-b-2 border-transparent pb-2 pt-2 sm:pb-3 sm:pt-3 max-w-max text-[18px] sm:text-[22px] md:text-[26px] font-inter data-[state=active]:font-semibold whitespace-nowrap"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="review"
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary  data-[state=active]:border-b-primary data-[state=active]:shadow-none text-heading hover:text-gray-900 rounded-none border-b-2 border-transparent pb-2 pt-2 sm:pb-3 sm:pt-3 max-w-max text-[18px] sm:text-[22px] md:text-[26px] font-inter data-[state=active]:font-semibold whitespace-nowrap"
            >
              Review
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tabs Content */}
        <TabsContent
          value="description"
          className="mt-4 sm:mt-6 text-[16px] sm:text-[18px] md:text-[20px] font-inter text-heading leading-relaxed space-y-4"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </TabsContent>

        <TabsContent
          value="review"
          className="mt-4 sm:mt-6"
        >
          {/* Review Form */}
          {user?.token && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-heading mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm(prev => ({ ...prev, rating_point: star }))}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${star <= reviewForm.rating_point
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                            }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {reviewForm.rating_point} out of 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <Textarea
                    value={reviewForm.review_content}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, review_content: e.target.value }))}
                    placeholder="Share your thoughts about this product..."
                    className="w-full h-32 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </div>
          )}

          {/* Reviews Summary and See All Button */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-heading">
                Customer Reviews ({reviews.length})
              </h3>
              {reviews.length > 0 && (
                <Button
                  onClick={openAllReviews}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  See All Reviews
                </Button>
              )}
            </div>

            {/* Rating Summary */}
            {reviews.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{getAverageRating()}</div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.round(parseFloat(getAverageRating()))
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">out of 5</div>
                  </div>
                  <div className="flex-1">
                    {Object.entries(getRatingDistribution()).reverse().map(([rating, count]) => (
                      <div key={rating} className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600 w-4">{rating}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${(count / reviews.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reviews List (Limited to 3) */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading reviews...</p>
              </div>
            ) : reviews.length > 0 ? (
              reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">

                    <div className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center bg-green-500 text-white font-bold">
                      {review.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>

                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-heading">{review.user?.name || "User"}</h4>
                      <span className="text-sm text-gray-500">
                        {formatDate(review.created_at)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating_point
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {review.review_content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No reviews yet. Be the first to review this product!
              </div>
            )}

            {/* Show more reviews hint */}
            {reviews.length > 3 && (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-2">
                  Showing 3 of {reviews.length} reviews
                </p>
                <Button
                  onClick={openAllReviews}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  View All {reviews.length} Reviews
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

                {/* All Reviews Modal */}
          {showAllReviews && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-2xl font-bold text-heading">All Customer Reviews</h2>
                    <p className="text-gray-600 mt-1">
                      {reviews.length} reviews • Average rating: {getAverageRating()}/5
                    </p>
                  </div>
                  <Button
                    onClick={closeAllReviews}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div
                      key={review.id}
                      className="p-6 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex-shrink-0">

                            <div className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center bg-green-500 text-white font-bold">
                              {review.user?.name?.charAt(0).toUpperCase() || "U"}
                            </div>

                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <h4 className="text-lg font-semibold text-heading">
                              {review.user?.name || "User"}
                            </h4>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {formatDate(review.created_at)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${i < review.rating_point
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                                  }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                              {review.rating_point}/5
                            </span>
                          </div>

                          <p className="text-gray-700 leading-relaxed text-base">
                            {review.review_content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No reviews available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
