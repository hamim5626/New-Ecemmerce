"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";
import useFetch from "@/hooks/use-fetch";

// Custom TikTok icon component since it's not in Lucide
const TikTokIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.05z" />
  </svg>
);

const Footer = () => {
  const { data: socialData, loading, error } = useFetch("/social");
  const aboutUsLinks = [
    { href: "/our-shops", label: "Our Shops" },
    { href: "/contacts", label: "Contacts" },
    { href: "/artists", label: "Artists" },
    { href: "/local-givings", label: "Local Giving's" },
    { href: "/press", label: "Press" },
  ];

  const getHelpLinks = [
    { href: "/delivery-information", label: "Delivery Information" },
    { href: "/terms-conditions", label: "Terms & Conditions" },
    { href: "/returns-refunds", label: "Return's & Refunds" },
    { href: "/privacy-notice", label: "Privacy Notice" },
    { href: "/shopping-faqs", label: "Shopping FAQs" },
  ];

  const iconMap = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    tiktok: TikTokIcon,
  };

  return (
    <footer className="bg-[#161616] text-white py-15  font-inter">
      <div className="container pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Section - Logo and Social Icons */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-serif italic text-[#CFA54B] mb-2">
                Allurdevine
              </h2>
            </div>

            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-3">
              {socialData?.data?.map((social, id) => {
                const IconComponent =
                  iconMap[social.name?.toLowerCase()] || TikTokIcon;

                return (
                  <Link
                    key={id}
                    href={social.url}
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:border-[#CFA54B] hover:text-[#CFA54B] transition-all duration-300"
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section - Footer Links */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            {/* About Us Column */}
            <div className="md:border-l  border-secondary flex md:justify-self-end md:pl-6">
              <div>
                <h3 className="text-[18px] md:text-[20px] font-medium mb-6 text-white">
                  About Us
                </h3>
                <ul className="space-y-4">
                  {aboutUsLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-secondary hover:text-primary transition-colors duration-300 text-[16px] md:text-[18px] tracking-[3%]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Get Help Column */}
            <div className="md:border-l  border-secondary flex md:justify-self-end md:pl-6">
              <div>
                <h3 className="text-[18px] md:text-[20px] font-medium mb-6 text-white">
                  Get Help
                </h3>
                <ul className="space-y-4">
                  {getHelpLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-secondary hover:text-primary transition-colors duration-300 text-[16px] md:text-[18px] tracking-[3%]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-[#292929] mt-10" />
      </div>
    </footer>
  );
};
export default Footer;
