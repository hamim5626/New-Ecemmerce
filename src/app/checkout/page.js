"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight } from "lucide-react";
import SectionBanner from "@/components/reusable/SectionBanner";
import ProtectedRoute from "@/components/reusable/ProtectedRoute";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CheckoutForm = () => {
  const [checkoutData, setCheckoutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load checkout data from localStorage
    const loadCheckoutData = () => {
      try {
        const storedData = localStorage.getItem("checkout_data");
        if (storedData) {
          const data = JSON.parse(storedData);
          setCheckoutData(data);
        } else {
          // If no checkout data, redirect to cart
          toast.error(
            "No checkout data found. Please add items to cart first."
          );
          router.push("/cart");
        }
      } catch (error) {
        console.error("Error loading checkout data:", error);
        toast.error("Error loading checkout data");
        router.push("/cart");
      } finally {
        setIsLoading(false);
      }
    };

    loadCheckoutData();
  }, [router]);

  const handleOrderNow = () => {
    // Here you would typically submit the order to your backend
    toast.success("Order placed successfully!");
    // Clear checkout data and cart
    localStorage.removeItem("checkout_data");
    localStorage.removeItem("cart");
    router.push("/");
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading checkout data...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!checkoutData) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Checkout Data
            </h2>
            <p className="text-gray-600 mb-6">
              Please add items to your cart first.
            </p>
            <button
              onClick={() => router.push("/cart")}
              className="bg-heading text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div>
        <SectionBanner title="Checkout" />
        <div className="container mx-auto p-4 md:p-8 font-inter">
          <div className="flex flex-col md:flex-row gap-10 my-[120px] justify-between">
            {/* Shipping Address Section */}
            <div
              style={{
                background:
                  "var(--Gradient, linear-gradient(92deg, #F1FAFE 0%, #F8DAB0 100%))",
              }}
              className="p-3 md:p-[30px] rounded-lg max-h-max md:w-[899px]"
            >
              <div className="bg-white p-6 rounded-lg space-y-[34px]">
                <h2 className="text-heading font-inter text-[22px] font-semibold mb-5">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-heading mb-1"
                    >
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      className="w-full h-[50px] border border-[#E5E5E5] rounded-[8px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-heading mb-1"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      className="w-full h-[50px] border border-[#E5E5E5] rounded-[8px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="emailAddress"
                      className="block text-sm font-medium text-heading mb-1"
                    >
                      Email Address
                    </label>
                    <Input
                      id="emailAddress"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full h-[50px] border border-[#E5E5E5] rounded-[8px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-heading mb-1"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full h-[50px] border border-[#E5E5E5] rounded-[8px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-heading mb-1"
                    >
                      Address
                    </label>
                    <Input
                      id="address"
                      placeholder="Enter your address"
                      className="w-full h-[50px] border border-[#E5E5E5] rounded-[8px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="townCity"
                      className="block text-sm font-medium text-heading mb-1"
                    >
                      Town/City
                    </label>
                    <Input
                      id="townCity"
                      placeholder="Enter your town/city"
                      className="w-full h-[50px] border border-[#E5E5E5] rounded-[8px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-heading mb-1"
                    >
                      State
                    </label>
                    <Input
                      id="state"
                      placeholder="Enter your state"
                      className="w-full h-[50px] border border-[#E5E5E5] rounded-[8px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-heading mb-1"
                    >
                      Zip Code
                    </label>
                    <Input
                      id="zipCode"
                      placeholder="Enter your zip code"
                      className="w-full h-[50px] border border-[#E5E5E5] rounded-[8px]"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4 mb-[34px]">
                  <Checkbox id="saveDetails" />
                  <label
                    htmlFor="saveDetails"
                    className="text-[18px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-secondary"
                  >
                    Save your details for future order purpose
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary & Payment Section */}
            <div
              style={{
                background:
                  "var(--Gradient, linear-gradient(92deg, #F1FAFE 0%, #F8DAB0 100%))",
              }}
              className="p-3 md:p-[30px] rounded-lg md:w-[681px]"
            >
              <div className="bg-white p-6 rounded-lg space-y-6">
                <h2 className="text-heading font-inter text-[22px] font-semibold mb-6 text-center">
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {checkoutData.items.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex justify-between items-center text-sm"
                    >
                      <div className="flex items-center gap-2">
                        {/* <img
                          src={item.product_image || "/placeholder.svg"}
                          alt={item.product_name}
                          className="w-8 h-8 object-cover rounded"
                        /> */}
                        <span className="font-medium">{item.product_name}</span>
                        <span className="text-gray-500">x{item.quantity}</span>
                      </div>
                      <span className="font-medium">
                        KD{" "}
                        {(
                          parseFloat(
                            item.discount_price || item.regular_price
                          ) * item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="border-[#DBDBDB]" />
                <div className="space-y-4 mb-6 text-[18px] text-heading font-inter">
                  <div className="flex justify-between items-center">
                    <span className="">Subtotal</span>
                    <span className="">
                      KD {checkoutData.subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="">Delivery Charge</span>
                    <span className="">
                      KD {checkoutData.deliveryCharge.toFixed(2)}
                    </span>
                  </div>
                  <hr className="border-[#DBDBDB]" />
                  <div className="flex justify-between items-center text-lg">
                    <span className="">Total</span>
                    <span className="font-bold">
                      KD {checkoutData.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl font-medium text-black mb-4">Payment</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border border-gray-300 rounded-md p-3">
                    <span className="text-heading">Credit Card</span>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cardNumber" className="sr-only">
                      Card Number
                    </label>
                    <Input
                      id="cardNumber"
                      placeholder="Card Number"
                      className="w-full h-[50px] border border-[#E5E5E5] rounded-[8px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expirationDate" className="sr-only">
                        Expiration Date
                      </label>
                      <Input
                        id="expirationDate"
                        placeholder="Expiration Date"
                        className="w-full h-[50px] border border-[#E5E5E5] rounded-[8px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="securityCode" className="sr-only">
                        Security Code
                      </label>
                      <Input
                        id="securityCode"
                        placeholder="Security Code"
                        className="w-full h-[50px] border border-[#E5E5E5] rounded-[8px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cardholderName" className="sr-only">
                      Cardholder Name
                    </label>
                    <Input
                      id="cardholderName"
                      placeholder="Cardholder Name"
                      className="w-full h-[50px] border border-[#E5E5E5] rounded-[8px]"
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white py-[25px] text-lg font-medium mt-6"
                  onClick={handleOrderNow}
                >
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CheckoutForm;
