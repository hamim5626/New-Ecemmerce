"use client";

import offer from "../../../public/offer.png";
import Image from "next/image";
import SwiperCarousel from "../reusable/SwiperCarousel";
import useFetch from "@/hooks/use-fetch";

const AvailableOffers = () => {
  const { data: offers, loading, error } = useFetch("/get-all-offers");
  // const offers = [
  //   { id: 1, image: offer },
  //   { id: 2, image: offer },
  //   { id: 3, image: offer },
  //   { id: 4, image: offer },
  // ];

  return (
    <div className="">
      <SwiperCarousel
      title="Most Availed Offers"
      items={offers?.data}
      slidesPerView={2}
      viewAllLink="/offers"
      renderSlide={(offer) => (
        <Image
          src={offer.image}
          alt={`Offer ${offer.offer_name}`}
          className="w-full h-auto object-cover rounded"
          // placeholder="blur"
          width={1000}
          height={1000}
        />
      )}
    />
    <hr className="border-[#BEBEBE] mb-[160px]" />
    </div>
  );
};

export default AvailableOffers;
