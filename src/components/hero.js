"use client"
import { ArrowUpRight, Star } from "lucide-react"
import BackgrounImage from "../../public/heroSection.jpg"
import SideIMage from "../../public/heroSideimage.png"
import Review1 from "../../public/reciew1.png"
import Review2 from "../../public/reciew2.png"
import Review3 from "../../public/reciew3.png"
import Review4 from "../../public/reciew4.png"
import Sideanimation from "../../public/hero-side-animation.png"
import useFetch from "@/hooks/use-fetch"
import Link from "next/link"

export default function Hero() {
  const { data, loading, error } = useFetch("/get-banner");
  // const {banner_image, banner_subtitle, banner_title, button_text, button_url} = data?.data
  return (
    <section
      style={{ backgroundImage: `url(${BackgrounImage.src})` }}
      className="bg-cover bg-center flex items-center justify-center text-white pt-10 md:py-[80px] min-h-screen relative overflow-hidden"
    >
      <div className="container w-full px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 lg:gap-0 relative min-h-[600px] lg:min-h-auto">
          {/* Left Content */}
          <div className="flex-1 lg:max-w-[60%]">
            <h1 className="text-neutral-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-normal font-prate leading-tight lg:leading-[134.40px] max-w-full lg:max-w-[800px] mb-4 md:mb-[21px] mt-8 md:mt-20 tracking-tight">
              {data?.data?.banner_title}
            </h1>
            <p className="text-neutral-900 text-lg md:text-xl lg:text-2xl font-normal font-lato leading-relaxed md:leading-9 mb-8 md:mb-[83px] max-w-full lg:max-w-[600px]">
              {data?.data?.banner_subtitle}
            </p>

            {/* Responsive Button */}
            <div className="mb-8 md:mb-12">
              <Link href={data?.data?.button_url ? data?.data?.button_url : "/"} className="relative flex items-center group cursor-pointer">
                <div className="relative">
                  <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                      <defs>
                        <mask id="textMask">
                          <rect width="100%" height="100%" fill="white" />
                          <rect x="60" y="35" width="70" height="30" fill="black" />
                        </mask>
                      </defs>
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#2D2D2D"
                        strokeWidth="2"
                        mask="url(#textMask)"
                        className="group-hover:stroke-[#F88C44] transition-colors duration-300"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ArrowUpRight className="text-[#F88C44] w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>
                  <span className="absolute top-1/2 left-[60px] md:left-[70px] transform -translate-y-1/2 text-[#2D2D2D] text-base md:text-lg font-medium tracking-wide group-hover:text-[#F88C44] transition-colors duration-300 whitespace-nowrap">
                    {data?.data?.button_text}
                  </span>
                </div>
              </Link>
            </div>

            {/* Reviews Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-[30px]">
              <div className="flex items-center justify-start relative w-[140px] sm:w-[176px] h-[48px] sm:h-[64px]">
                <img
                  src={Review1.src || "/placeholder.svg"}
                  alt="Review Image"
                  className="w-[48px] h-[48px] sm:w-[64px] sm:h-[64px] rounded-full border-2 border-white absolute top-0 left-[0%]"
                />
                <img
                  src={Review2.src || "/placeholder.svg"}
                  alt="Review Image"
                  className="w-[48px] h-[48px] sm:w-[64px] sm:h-[64px] rounded-full border-2 border-white absolute top-0 left-[25%]"
                />
                <img
                  src={Review3.src || "/placeholder.svg"}
                  alt="Review Image"
                  className="w-[48px] h-[48px] sm:w-[64px] sm:h-[64px] rounded-full border-2 border-white absolute top-0 left-[50%]"
                />
                <img
                  src={Review4.src || "/placeholder.svg"}
                  alt="Review Image"
                  className="w-[48px] h-[48px] sm:w-[64px] sm:h-[64px] rounded-full border-2 border-white absolute top-0 left-[75%]"
                />
              </div>
              <div>
                <div className="flex items-center gap-[5px] mb-1">
                  <div className="flex items-center gap-[5px]">
                    <Star className="fill-[#CFA54B] w-[20px] sm:w-[28px] stroke-0" />
                    <Star className="fill-[#CFA54B] w-[20px] sm:w-[28px] stroke-0" />
                    <Star className="fill-[#CFA54B] w-[20px] sm:w-[28px] stroke-0" />
                    <Star className="fill-[#CFA54B] w-[20px] sm:w-[28px] stroke-0" />
                    <Star className="fill-[#CFA54B] w-[20px] sm:w-[28px] stroke-0" />
                  </div>
                  <p className="text-neutral-900 text-lg sm:text-xl font-medium font-lato leading-loose">
                    (2.5K Reviews)
                  </p>
                </div>
                <h4 className="text-neutral-900 text-base sm:text-lg font-normal font-lato leading-relaxed">
                  Happy Customers
                </h4>
              </div>
            </div>
          </div>

          {/* Right Images - Visible on both mobile and desktop */}
          <div className="">
            {/* Mobile positioning */}
            <div className=" relative h-[300px] sm:h-[400px]">
              <img
                src={SideIMage.src || "/placeholder.svg"}
                alt="Hero Image"
                className="absolute right-0 bottom-0 h-auto max-w-[100%]"
              />
              <img
                src={Sideanimation.src || "/placeholder.svg"}
                alt="Hero Animation"
                className="absolute right-[50px] sm:right-[80px] bottom-[90px] sm:bottom-[150px] animate-spin w-[70px] h-[70px] sm:w-[70px] sm:h-[70px]"
              />
            </div>

            {/* Desktop positioning */}
            <div className="hidden lg:block">
              <img
                // src={SideIMage.src}
                src={data?.data?.banner_image}
                alt="Hero Image"
                className="absolute right-[-52px] bottom-[-180px] max-w-[70%] xl:max-w-[75%]"
              />
              <img
                src={Sideanimation.src}
                alt="Hero Animation"
                className="absolute right-[70px] bottom-[115px] animate-spin w-[60px] h-[60px] xl:w-auto xl:h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
