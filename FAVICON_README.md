# Dynamic Favicon Implementation

This project now includes a dynamic favicon system that automatically fetches and sets the favicon from your API.

## How It Works

1. **DynamicFavicon Component** (`src/components/reusable/DynamicFavicon.jsx`)
   - Automatically fetches the favicon from `/api/get-favicon` on page load
   - Sets the favicon dynamically in the document head
   - Includes fallback handling if the API fails

2. **API Route** (`src/app/api/get-favicon/route.js`)
   - Proxies requests to your external API: `https://mohammednashadmin.softvencefsd.xyz/api/get-favicon`
   - Returns the favicon URL from the API response
   - Includes error handling and fallback responses

3. **Layout Integration** (`src/app/layout.js`)
   - Includes the DynamicFavicon component in the document head
   - Ensures the favicon is set on every page

## Features

- ✅ **Dynamic Loading**: Favicon is fetched from your API on each page load
- ✅ **Automatic Fallback**: If API fails, creates a simple SVG favicon with "M" (for Mohammed Nash)
- ✅ **Error Handling**: Graceful fallback if the external API is unavailable
- ✅ **Console Logging**: Debug information in browser console
- ✅ **Cross-Browser Support**: Works with modern browsers

## API Response Format

The system expects your API to return data in this format:
```json
{
  "status": true,
  "message": "Favicon fetched successfully",
  "data": {
    "favicon": "https://example.com/path/to/favicon.jpg"
  },
  "code": 200
}
```

## Testing

1. Open your website in a browser
2. Check the browser tab - you should see the favicon from your API
3. Open browser console to see favicon loading logs
4. If API fails, you'll see the fallback "M" favicon

## Customization

- **Change API URL**: Modify the URL in `src/app/api/get-favicon/route.js`
- **Modify Fallback**: Edit the SVG in the `setDefaultFavicon` function
- **Add More Icon Types**: Extend the component to handle different icon formats

## Troubleshooting

- **Favicon not showing**: Check browser console for errors
- **API errors**: Verify the external API endpoint is accessible
- **CORS issues**: Ensure your API allows requests from your domain
