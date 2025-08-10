import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch favicon from your external API
    const response = await fetch('https://mohammednashadmin.softvencefsd.xyz/api/get-favicon', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching favicon:', error);
    
    // Return fallback response if external API fails
    return NextResponse.json({
      status: false,
      message: "Failed to fetch favicon",
      data: {
        favicon: "/favicon.ico" // Fallback to local favicon
      },
      code: 500
    }, { status: 500 });
  }
}
