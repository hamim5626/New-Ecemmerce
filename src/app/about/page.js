import AboutSection from "@/components/about/AboutSection";
import DeliveryInfo from "@/components/about/DeliveryInfo";
import NewsLetter from "@/components/home/NewsLetter";
import SectionBanner from "@/components/reusable/SectionBanner";

export default function AboutPage() {
  return (
    <div>
      <SectionBanner title="About Us" />
      <DeliveryInfo/>
      <AboutSection/>
      <NewsLetter/>
    </div>
  );
}