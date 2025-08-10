"use client"
import useFetch from "@/hooks/use-fetch";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";


const ContactDetails = () => {
  const { data: contactDetails, loading, error } = useFetch("/contact-us");
  
  // Define contact items based on API response
  const contactItems = [
    {
      icon: "/mailbox.svg",
      title: "Email",
      description: contactDetails?.data?.email || "Not available",
    },
    {
      icon: "/phone.svg",
      title: "Hotline",
      description: contactDetails?.data?.hotline || "Not available",
    },
    {
      icon: "/map.svg",
      title: "Address",
      description: contactDetails?.data?.address || "Not available",
    },
  ];

  if (error) {
    return (
      <div
        className="md:py-[130px] py-[50px] md:pl-[307px] pl-[20px]"
        style={{
          background: "linear-gradient(28deg, #F1FAFE 38.91%, #F8DAB0 118.26%)",
        }}
      >
        <p className="text-red-500">Failed to load contact details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div
      className="md:py-[130px] py-[50px] md:pl-[307px] pl-[20px]"
      style={{
        background: "linear-gradient(28deg, #F1FAFE 38.91%, #F8DAB0 118.26%)",
      }}
    >
      <h1 className="text-[24px] font-inter font-bold uppercase text-heading">
        Contact Us
      </h1>
      <h6 className="text-[20px] font-inter font-normal text-heading mt-[12px]">
        Our Branch Office -
      </h6>
      
      <div className="mt-[60px]">
        {loading ? (
          <div className="flex flex-col gap-[40px]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-[13.44px]">
                <Skeleton className="w-[33.33px] h-[30px]" />
                <div className="space-y-2">
                  <Skeleton className="w-[100px] h-[20px]" />
                  <Skeleton className="w-[200px] h-[16px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-[40px]">
            {contactItems.map((item, index) => (
              <div key={index} className="flex items-center gap-[13.44px]">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={33.33}
                  height={30}
                  className="min-w-[33.33px]"
                />
                <div>
                  <h6 className="text-[18px] font-inter font-medium text-heading">
                    {item.title}
                  </h6>
                  <p className="text-[16px] font-inter font-normal text-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDetails;