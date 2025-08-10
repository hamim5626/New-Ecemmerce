import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Validate the email format
    // 2. Check if the email exists in your database
    // 3. Generate an OTP
    // 4. Send the OTP via email
    // 5. Store the OTP in your database with expiration

    // For now, we'll simulate the API call
    console.log('Sending OTP to:', email);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        success: true, 
        message: 'OTP sent successfully',
        data: { email }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
} 