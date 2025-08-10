import Hero from "@/components/hero";
import Empower from "@/components/Empower";
import Image from "next/image";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import AvailableOffers from "@/components/home/AvailableOffers";
import OurReviews from "@/components/home/OurReviews";
import Support from "@/components/home/Support";
import PopularVideo from "@/components/home/PopularVideo";
import BlogPost from "@/components/home/BlogPost";
import NewsLetter from "@/components/home/NewsLetter";
import blog1 from "../../public/blog1.png";
import blog2 from "../../public/blog2.png";
import OtpVerify from "@/components/otp-verify/OtpVerify";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="">
      <Hero/>
      <Empower/>
      {/* <FeaturedProduct/> */}
      <FeaturedProduct/>
      <AvailableOffers/>
      <OurReviews/>
      <Support/>
      <PopularVideo/>
      <BlogPost/> 
      <NewsLetter/>
      {/* <Dialog open={true}>
        <DialogTrigger asChild>
          <Button variant="outline">Open OTP Verification</Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <OtpVerify />
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
