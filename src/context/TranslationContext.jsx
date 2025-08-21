"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useTranslate } from "@/hooks/use-translate";

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { translate, error, clearError } = useTranslate();

  // Language mappings
  const languageMap = {
    EN: "en",
    ES: "es", 
    FR: "fr",
  };

  // Common text that needs translation
  const commonTexts = {
    en: {
      home: "Home",
      aboutUs: "About Us",
      products: "Products",
      videos: "Videos",
      offers: "Offers",
      blog: "Blog",
      contact: "Contact",
      translationDemo: "Translation Demo",
      search: "Search",
      wishlist: "Wishlist",
      cart: "Cart",
      profile: "Profile",
      login: "Login",
      logout: "Logout",
      addToCart: "Add to Cart",
      buyNow: "Buy Now",
      viewDetails: "View Details",
      readMore: "Read More",
      subscribe: "Subscribe",
      newsletter: "Newsletter",
      featured: "Featured",
      popular: "Popular",
      new: "New",
      sale: "Sale",
      price: "Price",
      quantity: "Quantity",
      total: "Total",
      checkout: "Checkout",
      continue: "Continue",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      confirm: "Confirm",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      noResults: "No results found",
      emptyCart: "Your cart is empty",
      emptyWishlist: "Your wishlist is empty",
    },
  };

  // Initialize translations on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTranslations(commonTexts);
      setIsInitialized(true);
    }
  }, []);

  // Translate text to current language
  const t = useCallback((key, fallback = key) => {
    if (!isInitialized) {
      return fallback;
    }
    
    if (currentLanguage === "en") {
      return translations.en?.[key] || fallback;
    }
    
    return translations[currentLanguage]?.[key] || fallback;
  }, [currentLanguage, translations, isInitialized]);

  // Change language and translate common texts
  const changeLanguage = useCallback(async (languageCode) => {
    const targetLang = languageMap[languageCode] || languageCode.toLowerCase();
    
    if (targetLang === currentLanguage) return;
    
    setCurrentLanguage(targetLang);
    setIsLoading(true);
    
    try {
      // Translate common texts to new language
      const newTranslations = { ...translations };
      newTranslations[targetLang] = {};
      
      const textKeys = Object.keys(commonTexts.en);
      
      for (const key of textKeys) {
        const englishText = commonTexts.en[key];
        const translatedText = await translate(englishText, targetLang);
        
        if (translatedText) {
          newTranslations[targetLang][key] = translatedText;
        } else {
          newTranslations[targetLang][key] = englishText; // Fallback to English
        }
      }
      
      setTranslations(newTranslations);
    } catch (err) {
      console.error("Failed to translate texts:", err);
      // Keep current translations if translation fails
    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage, translations, translate]);

  // Translate specific text
  const translateText = useCallback(async (text, targetLang = currentLanguage) => {
    if (!text || targetLang === "en") return text;
    
    try {
      const translated = await translate(text, targetLang);
      return translated || text;
    } catch (err) {
      console.error("Translation failed:", err);
      return text; // Return original text if translation fails
    }
  }, [currentLanguage, translate]);

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    translateText,
    isLoading,
    error,
    clearError,
    languageMap,
    isInitialized,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
