import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { text, target } = await request.json();

    if (!text || !target) {
      return NextResponse.json(
        { message: "Text and target language required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          target: target,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.data?.translations?.[0]?.translatedText) {
      throw new Error("Invalid response from Google Translate API");
    }

    return NextResponse.json({ 
      translation: data.data.translations[0].translatedText,
      success: true 
    });

  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { 
        message: "Translation failed", 
        error: error.message,
        success: false 
      },
      { status: 500 }
    );
  }
}
