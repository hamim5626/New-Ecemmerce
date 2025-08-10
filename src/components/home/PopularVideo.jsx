"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import offer from "../../../public/offer.png";
import Title from "../reusable/Title";
import { useRef } from "react";
import HeroVideoDialog from "../magicui/hero-video-dialog";
import useFetch from "@/hooks/use-fetch";
import Link from "next/link";

const PopularVideo = () => {
  const { data: videos, loading, error } = useFetch("/get-popular-video");
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // const offers = [
  //   { id: 1, image: offer },
  //   { id: 2, image: offer },
  //   { id: 3, image: offer },
  //   { id: 4, image: offer },
  // ];

  return (

    <>
      <div className="container mx-auto px-4">
      {/* <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Svle5DEvElM?si=q_4uj5Y62yhBMT4g&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
        <div className="flex justify-between items-center">
          <Title title="Popular Videos" />
          <div className="flex gap-6">
            <button
              ref={prevRef}
              className="bg-white hover:bg-gray-100 border cursor-pointer p-3 rounded-full  transition"
            >
              <ArrowLeft className="text-heading" size={16} />
            </button>
            <button
              ref={nextRef}
              className="bg-white hover:bg-gray-100 border cursor-pointer p-3 rounded-full  transition"
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
            // Reassign navigation elements once refs are defined
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
          }}
          className="mt-8"
        >
          {videos?.data?.map((video) => (
            <SwiperSlide key={video.id}>
              <div className="">
                <HeroVideoDialog
                  className="block dark:hidden"
                  animationStyle="from-center"
                  videoSrc={video.youtube_link}
                  thumbnailSrc={video.thumbnail}
                  thumbnailAlt="Hero Video"
                />
                {/* <HeroVideoDialog
                  className="hidden dark:block"
                  animationStyle="from-center"
                  videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                  thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                  thumbnailAlt="Hero Video"
                /> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All */}
        <div className="flex justify-center items-center mt-5 mb-[26px]">
          <Link href="/videos" className="text-[16px] md:text-[20px] font-medium text-heading font-kaiseiHarunoUmi cursor-pointer hover:underline">
            View All
          </Link>
        </div>
      </div>

      <hr className="border-[#BEBEBE] mb-[160px]" />
    </>
  );
};

export default PopularVideo;
