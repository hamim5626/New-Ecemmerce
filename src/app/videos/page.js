import NewsLetter from "@/components/home/NewsLetter";
import PopularVideo from "@/components/home/PopularVideo";
import SectionBanner from "@/components/reusable/SectionBanner";
import FeaturedVideo from "@/components/videos/FeaturedVideo";

const Videos = () => {
  return (
    <div>
      <SectionBanner title="Videos" />
      <FeaturedVideo />
      <div className="mt-[160px]">
        <PopularVideo />
      </div>
      <NewsLetter />
    </div>
  );
};

export default Videos;