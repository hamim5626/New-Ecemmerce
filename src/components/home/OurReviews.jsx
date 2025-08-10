"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Title from "../reusable/Title";
import useFetch from "@/hooks/use-fetch";
import Skeleton from "react-loading-skeleton"; // Add a skeleton loader component

export default function ReviewsCarousel() {
  const { data: reviews, loading, error } = useFetch("/get-admin/review");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Safely get reviews data or default to empty array
  const reviewData = reviews?.data || [];

  // Calculate visible reviews based on device type
  const getVisibleReviews = () => {
    if (loading || error) return [];
    if (isMobile) {
      return reviewData.length > 0 ? [reviewData[currentIndex]] : [];
    }
    // For desktop, show current-1, current, current+1
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(reviewData.length, currentIndex + 2);
    return reviewData.slice(start, end);
  };

  const visibleReviews = getVisibleReviews();

  const nextSlide = () => {
    if (isMobile) {
      setCurrentIndex((prev) => Math.min(prev + 1, reviewData.length - 1));
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, reviewData.length - 2));
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(isMobile ? 0 : 1, prev - 1));
  };

  // Loading state
  if (loading) {
    return (
      <section className="bg-[#F8DAB0] py-16 lg:py-20">
        <div className="container px-4">
          <Title title="Our Reviews" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} height={300} className="rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-[#F8DAB0] py-16 lg:py-20">
        <div className="container px-4">
          <Title title="Our Reviews" />
          <p className="text-center py-10 text-red-500">
            Failed to load reviews. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  // No reviews state
  if (reviewData.length === 0) {
    return (
      <section className="bg-[#F8DAB0] py-16 lg:py-20">
        <div className="container px-4">
          <Title title="Our Reviews" />
          <p className="text-center py-10 text-gray-500">
            No reviews available yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F8DAB0] py-16 lg:py-20">
      <div className="container px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <Title title="Our Reviews" />

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={prevSlide}
              disabled={isMobile ? currentIndex <= 0 : currentIndex <= 1}
              variant="outline"
              size="icon"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Previous review"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            </Button>
            <Button
              onClick={nextSlide}
              disabled={
                isMobile
                  ? currentIndex >= reviewData.length - 1
                  : currentIndex >= reviewData.length - 2
              }
              variant="outline"
              size="icon"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Next review"
            >
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Reviews Container */}
        <div className="relative">
          {/* Desktop: 3-column layout */}
          <div
            className={`hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 transition-all duration-300 ${
              isMobile ? "opacity-0" : "opacity-100"
            }`}
            aria-live="polite"
          >
            {visibleReviews.map((review, index) => {
              const isActive = index === 1 && !isMobile;
              const isLeft = index === 0 && !isMobile;
              const isRight = index === 2 && !isMobile;

              return (
                <div
                  key={`${review.id}-${currentIndex}-${index}`}
                  className={`
                    bg-white rounded-lg px-[46px] py-[38px] transition-all duration-300 transform h-full
                    ${
                      isActive
                        ? "scale-105 shadow-lg z-10 py-[52px]"
                        : "scale-95 opacity-90 shadow-md"
                    }
                    ${isLeft ? "translate-x-2" : ""}
                    ${isRight ? "-translate-x-2" : ""}
                    hover:scale-[1.02] hover:shadow-lg
                  `}
                  aria-hidden={!isActive && !isMobile}
                >
                  {/* Profile Section */}
                  <div className="flex items-center gap-[14px] mb-[25px]">
                    <img
                      src={review.photo}
                      alt={review.name}
                      className="w-[60px] h-[60px] rounded-full object-cover border-2 border-gray-100"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-semibold text-[20px] font-inter text-heading mb-[8px]">
                        {review.name}
                      </h3>
                      <p className="text-[14px] text-secondary font-inter">
                        {review.profession}
                      </p>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="mb-[20px]">
                    <p className="text-[16px] text-secondary font-inter leading-[24px]">
                      {review.review_content}
                    </p>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1" aria-label={`Rating: ${review.rating_point} out of 5`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating_point
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: Single slide */}
          <div
            className={`md:hidden transition-all duration-300 ${
              isMobile ? "opacity-100" : "opacity-0"
            }`}
            aria-live="polite"
          >
            {visibleReviews.map((review, index) => (
              <div
                key={`${review.id}-mobile-${index}`}
                className="bg-white rounded-lg px-[46px] py-[38px] shadow-lg mx-auto max-w-md"
              >
                {/* Profile Section */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={review.photo}
                    alt={review.name}
                    className="w-[60px] h-[60px] rounded-full object-cover border-2 border-gray-100"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-semibold text-[20px] font-inter text-heading mb-[8px]">
                      {review.name}
                    </h3>
                    <p className="text-[14px] text-secondary font-inter">
                      {review.profession}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <div className="my-5">
                  <p className="text-[16px] text-secondary font-inter leading-[24px]">
                    {review.review_content}
                  </p>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1" aria-label={`Rating: ${review.rating_point} out of 5`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating_point
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}