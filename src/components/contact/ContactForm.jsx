"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      full_name: "",
      subject: "",
      email_address: "",
      comment: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-in-touch/store`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: data.full_name,
            subject: data.subject,
            email_address: data.email_address,
            comment: data.comment,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit form");
      }

      if (result.status === true) {
        toast.success(result.message, {
          description: "We'll get back to you soon",
        });
        reset();
      } else {
        // Handle field-specific errors from API
        const errorMessages = [];
        if (result.data?.errors) {
          Object.values(result.data.errors).forEach((errorArray) => {
            errorMessages.push(...errorArray);
          });
        }
        toast.error(errorMessages.join(", ") || result.message || "Submission failed");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="mt-10">
      <h1 className="text-heading font-inter font-semibold text-[30px]">
        Get In Touch with Enquires & Offers
      </h1>
      <p className="text-secondary font-inter font-normal text-[16px] mt-4">
        Do You Need Assistance Placing you Order Or Making A Purchase?
      </p>
      <p className="text-secondary font-inter font-normal text-[16px] mb-10">
        Have Questions before Making A Purchase?
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 max-w-[520px] font-inter text-[16px] text-secondary"
      >
        <div>
          <Input
            type="text"
            className={"h-[45px] rounded-none"}
            placeholder="Full name"
            {...register("full_name", { required: "Full name is required" })}
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
          )}
        </div>

        <div>
          <Input
            type="text"
            className={"h-[45px] rounded-none"}
            placeholder="Subject"
            {...register("subject", { required: "Subject is required" })}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <Input
            type="email"
            className={"h-[45px] rounded-none"}
            placeholder="Email Address"
            {...register("email_address", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email_address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email_address.message}
            </p>
          )}
        </div>

        <div>
          <Textarea
            className={"h-[128px] rounded-none"}
            placeholder="Enter your message"
            {...register("comment", { required: "Message is required" })}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className={
              "bg-heading text-white font-inter font-medium text-[16px] rounded-none max-w-max hover:bg-heading/90"
            }
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;