"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import Title from "../reusable/Title";
import useFetch from "@/hooks/use-fetch";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";

export default function FeatureProduct() {
  const { data: products, loading, error } = useFetch("/get-featured-products");

  const layout = [
    { product: products?.data?.[0], className: "lg:row-span-2" },
    { product: products?.data?.[1], className: "" },
    { product: products?.data?.[2], className: "lg:col-start-2 lg:row-start-2" },
    {
      product: products?.data?.[3],
      className: "lg:row-span-2 lg:col-start-3 lg:row-start-1",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4">
        <Title title="Featured Product" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 pt-10">
          {layout.map(({ product, className }, index) => (
            product ? (
              <div key={index} className={`${className}`}>
                <ProductCard product={product} />
              </div>
            ) : null
          ))}
        </div>

        <div className="flex justify-center items-center mt-5 mb-[26px]">
          <Link href="/products" className="text-[16px] md:text-[20px] font-medium text-heading font-kaiseiHarunoUmi">
            View All
          </Link>
        </div>
      </div>
      <hr className="border-[#BEBEBE] mb-[160px]" />
    </>
  );
}

function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlist = async () => {
    const token = localStorage.getItem("auth_user");
    if (!token) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/create`,
        { product_id: product.id },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token}`,
          },
        }
      );

      if (response.data.status === true) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      if (error.response?.code === 401) {
        alert("Please login again to continue");
      } else {
        alert("Failed to add product to wishlist. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group relative block w-full h-full overflow-hidden shadow-md">
      <div className="relative h-full min-h-[480px] w-full">
        <Image
          src={product?.product_image || "/placeholder.png"}
          alt="product-image"
          fill
          className="object-cover"
        />
        <div
          onClick={!isLoading ? handleWishlist : undefined}
          className={`absolute top-4 right-4 p-2 rounded-full bg-white shadow-md border border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
        >
          <Heart
            className={`h-5 w-5 text-primary z-10 ${isLoading ? "animate-pulse" : ""
              }`}
          />
        </div>
      </div>

      <Link href={`/products/${product.id}`}>
        <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-[16px] md:text-[24px] font-semibold text-heading font-inter">
              {product?.product_name}
            </h3>
            <span className="text-[16px] md:text-[24px] font-semibold text-heading font-inter">
              KD {product?.regular_price?.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
