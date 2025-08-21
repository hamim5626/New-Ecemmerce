"use client";

import { useState } from "react";
import { useTranslation } from "@/context/TranslationContext";
import TranslatedText from "@/components/reusable/TranslatedText";
import LanguageSwitcher from "@/components/reusable/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TranslationDemo() {
  const { t, currentLanguage, translateText, isLoading, isInitialized } = useTranslation();
  const [customText, setCustomText] = useState("Hello, welcome to our e-commerce store!");
  const [translatedCustomText, setTranslatedCustomText] = useState("");
  const [isTranslatingCustom, setIsTranslatingCustom] = useState(false);

  // Show loading state until translations are initialized
  if (!isInitialized) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Initializing translations...</p>
        </div>
      </div>
    );
  }

  const handleCustomTranslation = async () => {
    if (!customText.trim()) return;
    
    setIsTranslatingCustom(true);
    try {
      const translated = await translateText(customText, currentLanguage);
      setTranslatedCustomText(translated || customText);
    } catch (error) {
      console.error("Custom translation failed:", error);
      setTranslatedCustomText("Translation failed");
    } finally {
      setIsTranslatingCustom(false);
    }
  };

  const sampleTexts = [
    { key: "home", label: "Navigation" },
    { key: "products", label: "Products" },
    { key: "addToCart", label: "Actions" },
    { key: "checkout", label: "Checkout" },
    { key: "newsletter", label: "Marketing" },
    { key: "loading", label: "Status" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Translation Demo
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Test the multi-language functionality of your e-commerce application
        </p>
        
        <div className="flex justify-center mb-6">
          <LanguageSwitcher variant="outline" size="lg" />
        </div>
        
        <div className="text-sm text-gray-500">
          Current Language: <span className="font-semibold">{currentLanguage.toUpperCase()}</span>
          {isLoading && <span className="ml-2 text-blue-600">(Translating...)</span>}
        </div>
      </div>

      <Tabs defaultValue="common" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="common">Common Texts</TabsTrigger>
          <TabsTrigger value="custom">Custom Translation</TabsTrigger>
          <TabsTrigger value="info">API Info</TabsTrigger>
        </TabsList>

        <TabsContent value="common" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Common Application Texts</CardTitle>
              <CardDescription>
                These texts are automatically translated when you change the language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleTexts.map((item) => (
                  <div key={item.key} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-700 mb-2">{item.label}</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-500">English:</span>
                        <p className="font-medium">{t(item.key)}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Current Language:</span>
                        <p className="font-medium text-blue-600">
                          {currentLanguage === "en" ? "Same as English" : t(item.key)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Text Translation</CardTitle>
              <CardDescription>
                Enter any text and translate it to the current language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter text to translate:
                  </label>
                  <Textarea
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Enter text to translate..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button 
                  onClick={handleCustomTranslation}
                  disabled={isTranslatingCustom || !customText.trim()}
                  className="w-full"
                >
                  {isTranslatingCustom ? "Translating..." : "Translate"}
                </Button>

                {translatedCustomText && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="font-semibold text-gray-700 mb-2">Translation Result:</h3>
                    <p className="text-lg">{translatedCustomText}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Translation API Information</CardTitle>
              <CardDescription>
                Details about the Google Translate API integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Supported Languages</h3>
                    <ul className="space-y-1 text-sm">
                      <li>🇺🇸 English (EN) - Default</li>
                      <li>🇪🇸 Spanish (ES)</li>
                      <li>🇫🇷 French (FR)</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-700 mb-2">API Features</h3>
                    <ul className="space-y-1 text-sm">
                      <li>Real-time translation</li>
                      <li>Automatic language detection</li>
                      <li>Fallback to English</li>
                      <li>Error handling</li>
                    </ul>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50">
                  <h3 className="font-semibold text-blue-800 mb-2">Setup Required</h3>
                  <p className="text-sm text-blue-700">
                    Make sure you have set up your <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY</code> 
                    in the <code className="bg-blue-100 px-1 rounded">.env.local</code> file. 
                    See <code className="bg-blue-100 px-1 rounded">TRANSLATION_SETUP.md</code> for detailed instructions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
