"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import model from "../../../public/nlproductm.png";
import product2 from "../../../public/product.png";
import cart from "../../../public/cart.svg";
import Title from "../reusable/Title";
import { useRef, useState } from "react";
import { toast } from "sonner"
import useFetch from "@/hooks/use-fetch";
import { cartUtils } from "@/lib/utils";


const NewsLetter = ({ className }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: products, loading, error } = useFetch("/get-featured-products");
  // const offers = [
  //   { id: 1, image: model },
  //   { id: 2, image: model },
  //   { id: 3, image: model },
  //   { id: 4, image: model },
  // ];

  const handleAddToCart = (product) => {
    try {
      // Check if product already exists in cart
      const existingCart = cartUtils.getCart();
      const existingProductIndex = existingCart.findIndex(
        item => item.product_id === product.id
      );
      
      // Use utility function to add/update cart with quantity 1
      const success = cartUtils.addToCart(product, 1);
      
      if (success) {
        if (existingProductIndex !== -1) {
          toast.success(`Quantity updated for ${product.product_name}`);
        } else {
          toast.success(`${product.product_name} added to cart!`);
        }
      } else {
        toast.error('Failed to add product to cart. Please try again.');
      }
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletter-store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.status === true) {
        toast(data.data);
        setEmail("");
      } else {
        toast.error(data.data.errors.email[0] || "Subscription failed. Please try again.");
      }
    } catch (error) {
      toast("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`mb-[80px] ${className}`}>
      <div className="container mx-auto">
        {/* Header and Arrows */}
        <div className="lg:flex justify-end items-center px-4 lg:px-15 relative lg:top-20 top-[520px] z-40">
          <div className="flex justify-self-end gap-6">
            <button
              ref={prevRef}
              className="bg-white hover:bg-gray-100 border cursor-pointer p-3 rounded-full transition"
              aria-label="Previous offer"
            >
              <ArrowLeft className="text-heading" size={16} />
            </button>
            <button
              ref={nextRef}
              className="bg-white hover:bg-gray-100 border cursor-pointer p-3 rounded-full transition"
              aria-label="Next offer"
            >
              <ArrowRight className="text-heading" size={16} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 px-4 pt-10 lg:px-15 justify-between items-center bg-[#F8DAB0]">
          <div className="">
            <h1 className="text-[44px] font-inter text-heading font-bold">
              Subscribe our newsletter
            </h1>
            <p className="text-heading text-[21.33px] mt-4 font-normal leading-[32px] font-lato">
              The ideal way to stay in contact and learn about our exclusive
              Offers.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full lg:w-[413px] mt-[30px]">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white px-6 py-4 text-heading placeholder:text-heading font-inter text-[16px] font-normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit"
                className="bg-heading text-white mt-4 px-6 py-4 rounded-none font-inter font-semibold hover:bg-opacity-90 transition disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
          <div className="">
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
                0: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
              }}
              className="mt-8"
            >
              {products?.data?.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="">
                    <div className="flex flex-col lg:flex-row">
                      <Image
                        src={model}
                        alt={product.product_name}
                        className="w-[500px] flex h-auto object-cover order-2 lg:order-1 border"
                        placeholder="blur"
                      />
                      <div className="bg-white p-4 max-h-max  rounded-[24px] order-1 lg:order-2 border">
                        <div className="flex justify-between items-center gap-6">
                          <div className="">
                            <div>
                              <h4 className="text-[18px] font-inter text-heading">
                                {product.product_name}
                              </h4>
                              <h4 className="text-[20px] font-inter text-heading font-semibold leading-[29px]">
                                KD {product.regular_price}
                              </h4>
                            </div>
                            <div 
                              className="max-w-max pl-[11px] pr-3 py-3 rounded-full border bg-[#2B2627] mt-[35px] cursor-pointer hover:bg-opacity-80 transition"
                              onClick={() => handleAddToCart(product)}
                            >
                              <Image
                                src={cart}
                                alt="cart"
                                className="w-[24px] h-[25px]"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="bg-[#2B2627] w-[148px] h-[153px] rounded-[12px] px-9 flex items-center justify-center">
                              <Image
                                src={product.product_image}
                                // alt="product"
                                className="w-[100px] h-[100px] object-cover"
                                width={100}
                                height={100}
                                alt={product.product_name}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;