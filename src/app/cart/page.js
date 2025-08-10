"use client"
import { useState } from "react";
import CartTable from "@/components/cart/CartTable";
import RelatedProducts from "@/components/products/RelatedProducts";
import SectionBanner from "@/components/reusable/SectionBanner";

const CartPage = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <div>
      <SectionBanner title="Shopping Cart" />
      <CartTable onProductSelect={handleProductSelect} />
      <RelatedProducts id={selectedProductId} className="py-[120px]" />
    </div>
  );
};

export default CartPage;
