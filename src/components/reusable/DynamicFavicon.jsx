'use client';

import { useEffect } from 'react';

const DynamicFavicon = () => {
  useEffect(() => {
    const setFavicon = async () => {
      try {
        // Fetch favicon from your API
        const response = await fetch('/api/get-favicon');
        const data = await response.json();
        
        if (data.status && data.data.favicon) {
          // Create link element for favicon
          let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = data.data.favicon;
          
          // Append to head if it doesn't exist
          if (!document.querySelector("link[rel*='icon']")) {
            document.head.appendChild(link);
          }
          
          console.log('Favicon set successfully:', data.data.favicon);
        } else {
          console.log('No favicon data received, using fallback');
          setDefaultFavicon();
        }
      } catch (error) {
        console.error('Error fetching favicon:', error);
        // Fallback to default favicon if API fails
        setDefaultFavicon();
      }
    };

    const setDefaultFavicon = () => {
      // Create a simple SVG favicon as fallback
      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
          <rect width="32" height="32" fill="#4F46E5"/>
          <text x="16" y="22" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="white">M</text>
        </svg>
      `;
      
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      // Set the SVG as favicon
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/svg+xml';
      link.rel = 'icon';
      link.href = url;
      
      if (!document.querySelector("link[rel*='icon']")) {
        document.head.appendChild(link);
      }
      
      console.log('Fallback favicon set');
    };

    setFavicon();
  }, []);

  return null; // This component doesn't render anything
};

export default DynamicFavicon;
