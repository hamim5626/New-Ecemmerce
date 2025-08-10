"use client";

import ProductDescription from "@/components/products/ProductDescription";
import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import SectionBanner from "@/components/reusable/SectionBanner";
import NewsLetter from "@/components/home/NewsLetter";
import RelatedProducts from "@/components/products/RelatedProducts";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/product-details`,
          { id }
        );
        console.log("Product Details Response:", res.data);
        setProduct(res.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading)
    return (
      <div className="container py-20 text-center text-lg font-medium">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="container py-20 text-center text-red-500 font-medium">
        {error}
      </div>
    );

  const galleryImages = product?.data?.gallery_images || [];
  const description = product?.data?.description || "";
  const shortDescription = product?.data?.short_description || "";
  const additionalDescription = product?.data?.additional_description || "";

  return (
    <div>
      {/* Page Banner */}
      <SectionBanner title="Product Details" />

      {/* Main Product Section */}
      <div className="container px-3 md:px-5">
        <div
          style={{
            background:
              "var(--Gradient, linear-gradient(92deg, #F1FAFE 0%, #F8DAB0 100%))",
          }}
          className="p-3 md:p-6 lg:p-[30px] mt-10 md:mt-[120px] rounded-xl"
        >
          <div className="bg-white rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[44px] p-3 md:p-6 lg:p-[30px]">
              {/* Product Images */}
              <div>
                <ProductGallery gallery={galleryImages} />
              </div>

              {/* Product Info */}
              <div>
                <ProductInfo product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-10 md:mt-20 mb-10 md:mb-[64px]">
          <ProductDescription
            description={description}
            short_description={shortDescription}
            additional_description={additionalDescription}
          />
        </div>
      </div>

      {/* Related Products */}
      <div className="py-10 md:py-[120px]">
        <RelatedProducts id={id} />
      </div>

      {/* Newsletter */}
      <div className="mt-10 md:mt-[64px]">
        <NewsLetter />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
