"use client"
import SectionBanner from "@/components/reusable/SectionBanner";
import Title from "@/components/reusable/Title";
import Image from "next/image";
import offer from "../../../public/offer.png";
import NewsLetter from "@/components/home/NewsLetter";
import useFetch from "@/hooks/use-fetch";
import { useState } from "react";

const OffersPage = () => {
  const { data: offers, loading, error } = useFetch("/get-all-offers");
  const [showAll, setShowAll] = useState(false);
  // const offers = {
  //   status: true,
  //   message: "Offers retrieved successfully",
  //   data: [
  //     { id: 1, image: offer },
  //     { id: 2, image: offer },
  //     { id: 3, image: offer },
  //     { id: 4, image: offer },
  //     { id: 5, image: offer },
  //     { id: 6, image: offer },
  //     { id: 7, image: offer },
  //     { id: 8, image: offer },
  //     { id: 9, image: offer },
  //     { id: 10, image: offer },
  //     { id: 11, image: offer },
  //   ],
  // }
  // console.log(offers);
  
  // Get the offers to display based on showAll state
  const displayedOffers = showAll 
    ? offers?.data 
    : offers?.data?.slice(0, 4);
  
  return (
    <>
      <SectionBanner title="Offers" />
      <div className="md:mt-[120px] mt-[60px]">
        <div className="container">
          <Title title="Most Availed Offers" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[21.34px] gap-y-[32.01px] mt-[40px]">
            {displayedOffers?.map((offer, index) => (
              <div key={index}>
                <Image
                  src={offer.image}
                  alt={`Offer ${offer.offer_name}`}
                  className="w-full h-auto object-cover rounded"
                  // placeholder="blur"
                  width={1000}
                  height={1000}
                />
              </div>
            ))}
          </div>
          {offers?.data?.length > 4 && (
            <div className="flex justify-center items-center mt-5 mb-[26px]">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-[16px] md:text-[20px] font-medium text-heading font-kaiseiHarunoUmi hover:text-primary transition-colors"
              >
                {showAll ? "Show Less" : "View All"}
              </button>
            </div>
          )}
        </div>
      </div>
      <hr className=" border-[#BEBEBE] mb-[120px]" />
      <NewsLetter/>
    </>
  );
};

export default OffersPage;
