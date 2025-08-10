"use client"
import p1 from "../../../public/p1.png";
import p2 from "../../../public/p2.png";
import p3 from "../../../public/p3.png";
import p4 from "../../../public/p4.png";
import SwiperCarousel from "../reusable/SwiperCarousel";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";

const RelatedProducts = ({ className, id }) => {
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      // Don't fetch if no ID is provided
      if (!id) {
        setRelatedProducts(null);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/related-product`,
          { id }
        );
        setRelatedProducts(res.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setRelatedProducts(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Don't render anything if no ID is provided
  if (!id) {
    return null;
  }

  if (loading) {
    return <div className="container py-20">Loading related products...</div>;
  }

  if (error) {
    return <div className="container py-20 text-red-500">{error}</div>;
  }

  // Don't render if no related products
  if (!relatedProducts || !relatedProducts.data || relatedProducts.data.length === 0) {
    return null;
  }

  return (
    <SwiperCarousel
      title="Related Products"
      items={relatedProducts.data}
      slidesPerView={4}
      className={className}
      //   viewAllLink="/products"
      renderSlide={(product) => <ProductCard product={product} />}
    />
  );
};

export default RelatedProducts;
