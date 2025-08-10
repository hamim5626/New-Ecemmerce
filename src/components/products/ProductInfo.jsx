"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cartUtils } from "@/lib/utils";

// Helper function to safely truncate HTML content to specified character limit
const truncateHtml = (htmlString, maxLength) => {
  if (!htmlString) return "";
  
  // Create a temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  
  // Get text content without HTML tags
  const textContent = tempDiv.textContent || tempDiv.innerText || '';
  
  // Truncate to maxLength characters
  if (textContent.length <= maxLength) {
    return htmlString;
  }
  
  // Truncate and add ellipsis
  const truncatedText = textContent.substring(0, maxLength) + '...';
  
  // Return the truncated text (since we're truncating, we don't preserve HTML structure)
  return truncatedText;
};

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const addToCart = () => {
    setIsAddingToCart(true);

    try {
      const existingCart = cartUtils.getCart() || [];
      const existingProductIndex = existingCart.findIndex(
        (item) => item.product_id === product?.data?.id
      );

      const success = cartUtils.addToCart(product?.data, quantity);

      if (success) {
        if (existingProductIndex !== -1) {
          toast.success(
            `Quantity updated to ${quantity} for ${product?.data?.product_name || "product"}`
          );
        } else {
          toast.success(
            `${product?.data?.product_name || "Product"} (${quantity}) added to cart!`
          );
        }
      } else {
        toast.error("Failed to add product to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const data = product?.data || {};
  const inventories = data?.inventories || [];

  return (
    <div>
      <div>
        <h1 className="text-[24px] font-inter font-semibold text-heading">
          {data.product_name || "Unnamed Product"}
        </h1>
        <p
          dangerouslySetInnerHTML={{
            __html: truncateHtml(data.description || "<p>No description available.</p>", 100),
          }}
          className="text-secondary text-[20px] font-normal font-inter leading-[30px] mt-4"
        ></p>
      </div>

      <div className="space-y-[34px] mt-[34px]">
        <div className="text-sm">
          <span className="text-heading font-inter font-semibold text-[20px]">
            Brand :{" "}
          </span>
          <span className="text-heading font-inter font-medium text-[18px]">
            {data.brand || "N/A"}
          </span>
        </div>

        {data.weight && (
          <div className="text-sm">
            <span className="text-heading font-inter font-semibold text-[20px]">
              Weight :{" "}
            </span>
            <span className="text-heading font-inter font-medium text-[18px]">
              {data.weight} {data.weight_unit}
            </span>
          </div>
        )}

        <div className="text-sm">
          <span className="text-heading font-inter font-semibold text-[20px]">
            Product Code :{" "}
          </span>
          <span className="text-heading font-inter font-medium text-[18px]">
            {data.product_code || "N/A"}
          </span>
        </div>

        <div className="text-sm">
          <span className="text-heading font-inter font-semibold text-[20px]">
            Availability :{" "}
          </span>
          <span className="text-heading font-inter font-medium text-[18px]">
            {inventories[0]?.stock_status === "1" ? "In stock" : "Out of stock"}
          </span>
        </div>

        <div className="flex items-center gap-[25px]">
          {data.discount_price && data.discount_price !== data.regular_price ? (
            <>
              <div className="text-heading font-inter font-semibold text-[20px]">
                KD {data.discount_price}
              </div>
              <div className="font-inter font-normal text-[16px] line-through text-secondary">
                KD {data.regular_price}
              </div>
            </>
          ) : (
            <div className="text-heading font-inter font-semibold text-[20px]">
              KD {data.regular_price || "N/A"}
            </div>
          )}
        </div>
      </div>

      <div className="md:flex items-center gap-2 pt-[34px]">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="bg-[#E5E5E5] h-[50px] w-[50px] rounded-[8px]"
            onClick={() => handleQuantityChange(1)}
          >
            <Plus className="h-[13px] w-[13px]" />
          </Button>
          <span className="flex items-center justify-center h-[50px] w-[50px] text-center text-[20px] font-inter font-medium bg-[#fff] rounded-[8px] border border-[#E5E5E5]">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="bg-[#E5E5E5] h-[50px] w-[50px] rounded-[8px]"
            onClick={() => handleQuantityChange(-1)}
          >
            <Minus className="h-[13px] w-[13px]" />
          </Button>
        </div>

        <div className="mt-10 md:mt-0 flex items-center gap-4">
          <Button
            onClick={addToCart}
            disabled={isAddingToCart}
            className={`bg-heading hover:bg-gray-800 text-white text-[18px] font-inter font-medium w-[164px] h-[50px] ${
              isAddingToCart ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isAddingToCart ? "Adding..." : "Add To Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
