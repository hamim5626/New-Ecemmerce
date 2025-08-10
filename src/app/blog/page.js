import BlogPost from "@/components/home/BlogPost";
import SectionBanner from "@/components/reusable/SectionBanner";
import blog1 from "../../../public/blog1.png";
import blog2 from "../../../public/blog2.png";
import NewsLetter from "@/components/home/NewsLetter";
const Blog = () => {

  return (
    <div className="">
      <SectionBanner title="Blog" />
      <div className="mt-[120px]">
        <BlogPost />
        <div className="mt-[160px]">
          <NewsLetter />
        </div>
      </div>
    </div>
  );
};

export default Blog;
