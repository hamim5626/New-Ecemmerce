import { useState, useCallback } from "react";
import translationCache from "@/lib/translationCache";

export const useTranslate = () => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);

  const translate = useCallback(async (text, targetLanguage) => {
    if (!text || !targetLanguage) {
      setError("Text and target language are required");
      return null;
    }

    // Check cache first
    const cached = translationCache.get(text, targetLanguage);
    if (cached) {
      translationCache.recordHit();
      return cached;
    }

    translationCache.recordMiss();
    setIsTranslating(true);
    setError(null);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          target: targetLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Translation failed");
      }

      if (!data.success) {
        throw new Error(data.message || "Translation failed");
      }

      // Cache the successful translation
      translationCache.set(text, targetLanguage, data.translation);

      return data.translation;
    } catch (err) {
      setError(err.message);
      console.error("Translation error:", err);
      return null;
    } finally {
      setIsTranslating(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getCacheStats = useCallback(() => {
    return translationCache.getStats();
  }, []);

  const clearCache = useCallback(() => {
    translationCache.clear();
  }, []);

  return {
    translate,
    isTranslating,
    error,
    clearError,
    getCacheStats,
    clearCache,
  };
};
