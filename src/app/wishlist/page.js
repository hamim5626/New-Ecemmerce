"use client"
import SectionBanner from "@/components/reusable/SectionBanner";
import ProductCard from "@/components/products/ProductCard";
import Title from "@/components/reusable/Title";
import NewsLetter from "@/components/home/NewsLetter";
import ProtectedRoute from "@/components/reusable/ProtectedRoute";
import axios from "axios";
import { useEffect, useState } from "react";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("auth_user");  
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist`,{
        headers: {
          "Authorization": `Bearer ${JSON.parse(token).token}`,
        },
      });
      console.log(res.data.data);
      setWishlist(res.data.data);
    };
    fetchWishlist();
  }, []);
  console.log(wishlist);
  return (
    <ProtectedRoute>
      <SectionBanner title="Wish List" />
      <div className="mt-[120px] mb-[120px]">
        <div className="container mx-auto p-4 md:p-8 font-inter">
          <Title title="Wish List" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[21.34px] gap-y-[32.01px] mt-[40px]">
            {wishlist?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlist={true}
              />
            ))}
          </div>
        </div>
      </div>
      <NewsLetter/>
    </ProtectedRoute>
  );
};

export default WishlistPage;
