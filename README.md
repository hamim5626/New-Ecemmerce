# Mohammed Nash - E-commerce Platform

A modern, responsive e-commerce website built with Next.js 15 and React 19, featuring a beautiful UI with Tailwind CSS and comprehensive e-commerce functionality.

## 🚀 Features

### Core E-commerce Features
- **Product Catalog**: Browse and search products with detailed product pages
- **Shopping Cart**: Add/remove items with real-time cart management
- **User Authentication**: Complete signup/login system with OTP verification
- **User Profile**: Personal information management and order history
- **Wishlist**: Save favorite products for later
- **Order Management**: Track orders and view order history
- **Checkout Process**: Complete checkout flow with payment integration

### Additional Features
- **Blog Section**: Read beauty and skincare related articles
- **Video Content**: Featured video sections for product demonstrations
- **Newsletter Subscription**: Stay updated with latest offers
- **Reviews & Ratings**: Customer reviews and testimonials
- **Offers & Promotions**: Special deals and discount sections
- **Contact & Support**: Customer service and contact forms
- **Responsive Design**: Mobile-first approach with modern UI

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React version with new features
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript (configurable)

### UI Components & Libraries
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Swiper** - Touch slider for carousels
- **Embla Carousel** - Lightweight carousel library
- **Sonner** - Toast notifications
- **Motion** - Animation library

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler for development

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mohammednash
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your environment variables to `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog section
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── contact/           # Contact page
│   ├── products/          # Product catalog
│   ├── profile/           # User profile
│   ├── search/            # Search functionality
│   └── wishlist/          # User wishlist
├── components/            # Reusable React components
│   ├── ui/               # Base UI components
│   ├── home/             # Home page components
│   ├── products/         # Product-related components
│   ├── auth/             # Authentication components
│   └── reusable/         # Shared components
├── context/              # React Context providers
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions and configurations
```

## 🎨 Key Components

### Authentication System
- **Login/Register**: Complete authentication flow
- **OTP Verification**: Secure one-time password verification
- **Password Reset**: Forgot password functionality
- **Profile Management**: User account settings

### Product Management
- **Product Gallery**: Image carousels and zoom functionality
- **Product Details**: Comprehensive product information
- **Related Products**: Smart product recommendations
- **Product Search**: Advanced search and filtering

### Shopping Experience
- **Cart Management**: Add/remove items with quantity control
- **Wishlist**: Save and manage favorite products
- **Checkout Flow**: Multi-step checkout process
- **Order Tracking**: Real-time order status updates

## 🚀 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎯 Key Features Implementation

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

### Performance Optimization
- Next.js Image optimization
- Code splitting and lazy loading
- Optimized bundle size

### Accessibility
- WCAG compliant components
- Keyboard navigation support
- Screen reader friendly

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_SITE_URL=your_site_url
```

### Tailwind Configuration
The project uses Tailwind CSS 4 with custom configurations for:
- Custom color palette
- Typography scales
- Animation utilities
- Component variants

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation



**Built with ❤️ using Next.js and React**
