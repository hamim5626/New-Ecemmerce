"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import Title from "./Title";

const SwiperCarousel = ({
  title,
  items,
  renderSlide,
  slidesPerView = 2,
  viewAllLink,
  className,
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={className}>
      <div className={`container mx-auto px-4`}>
        {/* Header and Arrows */}
        <div className="flex justify-between items-center">
          <Title title={title} />
          <div className="flex gap-6">
            <button
              ref={prevRef}
              className="bg-white hover:bg-gray-100 border cursor-pointer p-3 rounded-full transition"
            >
              <ArrowLeft className="text-heading" size={16} />
            </button>
            <button
              ref={nextRef}
              className="bg-white hover:bg-gray-100 border cursor-pointer p-3 rounded-full transition"
            >
              <ArrowRight className="text-heading" size={16} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView },
          }}
          className="mt-8"
        >
          {items?.map((item, index) => (
            <SwiperSlide key={index}>{renderSlide(item, index)}</SwiperSlide>
          ))}
        </Swiper>

        {/* View All */}
        {viewAllLink && (
          <div className="flex justify-center items-center mt-5 mb-[26px]">
            <a
              href={viewAllLink}
              className="text-[16px] md:text-[20px] font-medium text-heading font-kaiseiHarunoUmi cursor-pointer hover:underline"
            >
              View All
            </a>
          </div>
        )}

        {/* <hr className="border-[#BEBEBE] mb-[160px]" /> */}
      </div>
    </div>
  );
};

export default SwiperCarousel;
