"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/context/TranslationContext";

const TranslatedText = ({ 
  text, 
  fallback, 
  className = "", 
  showLoading = false,
  children 
}) => {
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);
  const { currentLanguage, translateText, isInitialized } = useTranslation();

  useEffect(() => {
    const translate = async () => {
      if (!text || currentLanguage === "en" || !isInitialized) {
        setTranslatedText(text);
        return;
      }

      setIsLoading(true);
      try {
        const translated = await translateText(text, currentLanguage);
        setTranslatedText(translated || text);
      } catch (error) {
        console.error("Translation failed:", error);
        setTranslatedText(text); // Fallback to original text
      } finally {
        setIsLoading(false);
      }
    };

    translate();
  }, [text, currentLanguage, translateText, isInitialized]);

  // Show loading state or fallback during initialization
  if (!isInitialized) {
    return (
      <span className={className}>
        {fallback || children || text}
      </span>
    );
  }

  if (isLoading && showLoading) {
    return (
      <span className={`${className} animate-pulse bg-gray-200 rounded`}>
        {text}
      </span>
    );
  }

  return (
    <span className={className}>
      {translatedText || fallback || children || text}
    </span>
  );
};

export default TranslatedText;
