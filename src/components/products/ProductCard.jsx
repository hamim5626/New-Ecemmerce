'use client'
import axios from "axios";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const ProductCard = ({ product, isWishlist, onWishlistChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlist = async () => {
    // Check if user is authenticated
    const token = localStorage.getItem("auth_user");
    if (!token) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist/create`,
        {
          product_id: product.id,
        },
        {
          headers: {
            "Authorization": `Bearer ${JSON.parse(token).token}`,
          },
        }
      );

      console.log("Wishlist updated:", response.data);

      // Call the callback to update parent component state
      if (onWishlistChange) {
        onWishlistChange(product.id, true);
      }
      toast.success(response.data.message);
      // Optional: Show success message
      // You could use a toast notification here instead
      console.log("Product added to wishlist successfully!");

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
    <Link href={`/products/${product.id}`}>
      <div
        key={product.id}

        className="group relative block overflow-hidden"
      >
        <div className="relative border px-[57px] md:h-[450px] py-[52px]">
          {product.product_image ? (
            <Image
              src={product.product_image}
              alt="product image"
              className="max-h-max object-contain mx-auto w-full"
              width={1000}
              height={1000}
              quality={100}
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-400 text-center">
                <div className="w-16 h-16 mx-auto mb-2 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📷</span>
                </div>
                <p className="text-sm">No image available</p>
              </div>
            </div>
          )}

          {/* Heart Icon */}
          {isWishlist ? (
            <div className="absolute top-4 right-4 p-2 rounded-full bg-[#F5F5F5] shadow-md border border-primary opacity-100 transition-opacity duration-300 z-10">
              <Heart className="h-5 w-5 text-red-500 fill-red-500 z-10" />
            </div>
          ) : (
            <div
              onClick={!isLoading ? handleWishlist : undefined}
              className={`absolute top-4 right-4 p-2 rounded-full bg-white shadow-md border border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
            >
              <Heart className={`h-5 w-5 text-primary z-10 ${isLoading ? 'animate-pulse' : ''
                }`} />
            </div>
          )}
        </div>

        <div className="relative bg-white pt-3">
          <h3 className="text-[21.342px] font-lato leading-[32.01px] text-heading group-hover:underline group-hover:underline-offset-4">
            {product.product_name}
          </h3>

          <div className="flex items-center gap-x-[5.34px]">
            <p className="text-[21.342px] font-lato leading-[32.01px] text-heading">
              ${product.discount_price}
            </p>
            <p className="text-[21.342px] font-lato leading-[32.01px] text-secondary line-through">
              ${product.regular_price}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
