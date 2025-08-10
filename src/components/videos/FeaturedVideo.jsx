"use client";
import useFetch from "@/hooks/use-fetch";
import HeroVideoDialog from "../magicui/hero-video-dialog";
import Title from "../reusable/Title";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";

const FeaturedVideo = () => {
  const { data: featuredVideo, loading, error } = useFetch("/get-featured-video");
  const [showAllVideos, setShowAllVideos] = useState(false);


  // Handle loading state
  if (loading) {
    return (
      <div className="mt-[120px]">
        <div className="container">
          <Title title="Featured Video" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-[40px]">
            <div className="md:row-span-2 md:col-span-2">
              <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
            <div className="flex flex-col gap-3.5 md:col-span-1">
              <div className="h-32 bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="h-32 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="mt-[120px]">
        <div className="container">
          <Title title="Featured Video" />
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load featured videos</p>
          </div>
        </div>
      </div>
    );
  }

  const videos = featuredVideo?.data || [];

  // Function to render a single video
  const renderVideo = (video, index) => {
    if (!video) return null;

    return (
      <div key={index} className="relative">
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc={video.youtube_link}
          thumbnailSrc={video.thumbnail}
          thumbnailAlt={video.title}
        />
        <HeroVideoDialog
          className="hidden dark:block"
          animationStyle="from-center"
          videoSrc={video.youtube_link}
          thumbnailSrc={video.thumbnail}
          thumbnailAlt={video.title}
        />
      </div>
    );
  };

  return (
    <div className="mt-[120px]">
      <div className="">
        <div className="container">
          <Title title="Featured Video" />

          {/* Featured videos section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-[40px]">
            {/* First video - spans 2 rows on desktop, full width on mobile */}
            <div className="md:row-span-2 md:col-span-2">
              <div className="">{renderVideo(videos[0], 0)}</div>
            </div>
            {/* Second video - top right on desktop, stacked on mobile */}
            <div className="flex flex-col gap-6 md:col-span-1">
              <div className="">{renderVideo(videos[1], 1)}</div>
              <div className="">{renderVideo(videos[2], 2)}</div>
            </div>
          </div>

          {/* Additional videos section */}
          {showAllVideos && videos.length > 3 && (
            <div className="mt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.slice(3).map((video, index) => (
                  <div key={index + 3} className="relative">
                    {renderVideo(video, index + 3)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View All button */}
        {videos.length > 3 && (
          <div>
            <div className="flex justify-center items-center mt-5 mb-[26px]">
              <Button
                variant="ghost"
                onClick={() => setShowAllVideos(!showAllVideos)}
                className="text-[16px] md:text-[20px] font-medium text-heading font-kaiseiHarunoUmi cursor-pointer hover:underline"
              >
                {showAllVideos ? "Show Less" : "View All"}
              </Button>
            </div>
            <hr className="border-[#BEBEBE] my-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedVideo;
