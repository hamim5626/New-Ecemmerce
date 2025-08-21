"use client";

import { useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/context/TranslationContext";

const languages = [
  { code: "EN", label: "English", flag: "🇺🇸", lang: "en" },
  { code: "ES", label: "Español", flag: "🇪🇸", lang: "es" },
  { code: "FR", label: "Français", flag: "🇫🇷", lang: "fr" },
];

const LanguageSwitcher = ({ 
  variant = "default", 
  size = "default",
  className = "",
  showLabel = true,
  showFlag = true,
  showCheckmark = true
}) => {
  const { currentLanguage, changeLanguage, isLoading, isInitialized } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Don't render until initialized to prevent hydration mismatch
  if (!isInitialized) {
    return (
      <Button
        variant="ghost"
        className={`flex items-center gap-2 px-3 py-2 hover:opacity-80 ${className}`}
        disabled
      >
        <Globe className="h-4 w-4" />
        {showLabel && "EN"}
        <ChevronDown className="h-4 w-4" />
      </Button>
    );
  }

  const currentLanguageCode = languages.find(
    lang => lang.lang === currentLanguage
  )?.code || "EN";

  const handleLanguageChange = async (langCode) => {
    setIsOpen(false);
    await changeLanguage(langCode);
  };

  const buttonVariants = {
    default: "flex items-center gap-2 px-3 py-2 hover:opacity-80",
    outline: "flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50",
    ghost: "flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md",
  };

  const buttonSizes = {
    sm: "text-sm",
    default: "text-base",
    lg: "text-lg",
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
          disabled={isLoading}
        >
          <Globe className="h-4 w-4" />
          {showLabel && currentLanguageCode}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 bg-white text-gray-900 font-inter z-[200]"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="cursor-pointer flex items-center gap-2 hover:bg-gray-50 p-2"
          >
            {showFlag && <span className="text-lg">{lang.flag}</span>}
            <span className="flex-1">{lang.label}</span>
            {showCheckmark && currentLanguageCode === lang.code && (
              <Check className="h-4 w-4 text-green-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
