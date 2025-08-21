# Google Translate API Setup Guide

This guide will help you set up Google Translate API integration for your e-commerce application.

## Prerequisites

1. A Google Cloud Platform account
2. A project with billing enabled
3. Google Translate API enabled

## Step 1: Enable Google Translate API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Navigate to "APIs & Services" > "Library"
4. Search for "Cloud Translation API"
5. Click on "Cloud Translation API" and click "Enable"

## Step 2: Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Optional) Restrict the API key to only Cloud Translation API for security

## Step 3: Set Environment Variable

Create a `.env.local` file in your project root and add:

```bash
NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY=your_actual_api_key_here
```

**Important:** Never commit your `.env.local` file to version control!

## Step 4: Test the Integration

1. Start your development server
2. Change the language in the navbar
3. Check the browser console for any errors
4. Verify that text is being translated

## API Usage Limits

- Google Translate API has usage limits and costs
- Free tier: 500,000 characters per month
- Paid tier: $20 per million characters
- Monitor your usage in Google Cloud Console

## Supported Languages

The application currently supports:
- English (EN) - Default
- Spanish (ES)
- French (FR)

## Troubleshooting

### Common Issues:

1. **"Translation failed" error**
   - Check if your API key is correct
   - Verify the API is enabled
   - Check billing status

2. **No translations appearing**
   - Check browser console for errors
   - Verify environment variable is loaded
   - Check network tab for API calls

3. **Slow translation loading**
   - This is normal for first-time translations
   - Subsequent translations are faster
   - Consider implementing translation caching

## Security Best Practices

1. **Restrict API Key**: Limit your API key to only Cloud Translation API
2. **Environment Variables**: Never expose API keys in client-side code
3. **Rate Limiting**: Consider implementing rate limiting on your API routes
4. **Monitoring**: Monitor API usage and costs regularly

## Cost Optimization

1. **Cache Translations**: Store translated text to avoid repeated API calls
2. **Batch Requests**: Group multiple translations into single API calls
3. **User Preferences**: Store user language preferences locally
4. **Fallback**: Use English text when translation fails

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Google Cloud Console settings
3. Check the API quota and billing status
4. Review the Google Translate API documentation
