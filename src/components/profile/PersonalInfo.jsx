"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

const PersonalInfo = ({ initialData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      first_name: initialData?.first_name || "",
      last_name: initialData?.last_name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
      town: initialData?.town || "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const token = JSON.parse(localStorage.getItem('auth_user'));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/update-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.token}`,
          },
          body: JSON.stringify({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            town: data.town,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
      } else {
        throw new Error(result.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const token = JSON.parse(localStorage.getItem('auth_user'));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/delete-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Account deleted successfully!");
        // Optionally redirect or clear user session
      } else {
        const result = await response.json();
        throw new Error(result.message || "Failed to delete account");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }

  };

  return (
    <div className="bg-[#FAF6ED] px-[30px] py-7 font-inter">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-[47.54px]">
          {/* First Name */}
          <div>
            <label htmlFor="first_name" className="text-[22px] text-heading font-medium">
              First Name
            </label>
            <Input
              id="first_name"
              {...register("first_name", { required: "First name is required" })}
              className="w-full !text-[24.008px] mt-3 bg-white h-[75px] placeholder:text-[24.008px]"
              placeholder="Enter first name"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="last_name" className="text-[22px] text-heading font-medium">
              Last Name
            </label>
            <Input
              id="last_name"
              {...register("last_name", { required: "Last name is required" })}
              className="w-full !text-[24.008px] mt-3 bg-white h-[75px] placeholder:text-[24.008px]"
              placeholder="Enter last name"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="text-[22px] text-heading font-medium">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full !text-[24.008px] mt-3 bg-white h-[75px] placeholder:text-[24.008px]"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="text-[22px] text-heading font-medium">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9+\- ]+$/,
                  message: "Invalid phone number",
                },
              })}
              className="w-full !text-[24.008px] mt-3 bg-white h-[75px] placeholder:text-[24.008px]"
              placeholder="Enter phone number (e.g. +96551234567)"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="text-[22px] text-heading font-medium">
              Address
            </label>
            <Input
              id="address"
              {...register("address", { required: "Address is required" })}
              className="w-full !text-[24.008px] mt-3 bg-white h-[75px] placeholder:text-[24.008px]"
              placeholder="Enter address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Town/City */}
          <div>
            <label htmlFor="town" className="text-[22px] text-heading font-medium">
              Town/City
            </label>
            <Input
              id="town"
              {...register("town", { required: "Town/City is required" })}
              className="w-full !text-[24.008px] mt-3 bg-white h-[75px] placeholder:text-[24.008px]"
              placeholder="Enter town/city"
            />
            {errors.town && (
              <p className="text-red-500 text-sm mt-1">{errors.town.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="flex-1 bg-black hover:bg-gray-800 text-white py-3 text-[22px] font-medium h-[75px]"
          >
            {isSubmitting ? "Updating..." : "Update Account"}
          </Button>
          <Button
            type="button"
            onClick={handleDeleteAccount}
            variant="outline"
            className="flex-1 border-2 border-heading bg-white hover:bg-gray-50 text-heading py-3 text-[22px] font-medium h-[75px]"
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;