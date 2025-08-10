# Loading System Documentation

This document describes the comprehensive loading system implemented throughout the application.

## Overview

The loading system provides consistent loading states, skeletons, and user feedback across the entire application. It includes:

- **Global Loading Context**: Manages loading states across the application
- **Loading Components**: Reusable loading UI components
- **Skeleton Components**: Placeholder content while data loads
- **Button Loading States**: Interactive loading states for buttons
- **Global Loading Indicators**: Top-level loading indicators

## Components

### 1. LoadingSpinner
A simple spinning loader with different sizes.

```jsx
import { LoadingSpinner } from "@/components/ui/loading";

<LoadingSpinner size="sm" /> // h-4 w-4
<LoadingSpinner size="default" /> // h-6 w-6
<LoadingSpinner size="lg" /> // h-8 w-8
<LoadingSpinner size="xl" /> // h-12 w-12
```

### 2. ButtonLoading
A button component with built-in loading state.

```jsx
import { ButtonLoading } from "@/components/ui/loading";

<ButtonLoading 
  loading={isLoading}
  onClick={handleClick}
  className="bg-primary text-white"
>
  {isLoading ? "Loading..." : "Submit"}
</ButtonLoading>
```

### 3. IconButtonLoading
A button with an icon that shows loading spinner when loading.

```jsx
import { IconButtonLoading } from "@/components/ui/loading";
import { ShoppingCart } from "lucide-react";

<IconButtonLoading
  icon={ShoppingCart}
  loading={isLoading}
  onClick={handleClick}
  className="bg-primary text-white"
/>
```

### 4. Specialized Button Components

#### CartButtonLoading
```jsx
import { CartButtonLoading } from "@/components/ui/loading";

<CartButtonLoading
  loading={isLoading}
  onClick={handleAddToCart}
  className="custom-styles"
/>
```

#### WishlistButtonLoading
```jsx
import { WishlistButtonLoading } from "@/components/ui/loading";

<WishlistButtonLoading
  loading={isLoading}
  onClick={handleWishlist}
  className="custom-styles"
/>
```

### 5. Skeleton Components

#### ProductCardSkeleton
```jsx
import { ProductCardSkeleton } from "@/components/ui/loading";

<ProductCardSkeleton className="custom-styles" />
```

#### ProductGridSkeleton
```jsx
import { ProductGridSkeleton } from "@/components/ui/loading";

<ProductGridSkeleton count={6} className="mt-8" />
```

#### NewsletterSkeleton
```jsx
import { NewsletterSkeleton } from "@/components/ui/loading";

<NewsletterSkeleton className="mb-8" />
```

#### BlogPostSkeleton
```jsx
import { BlogPostSkeleton } from "@/components/ui/loading";

<BlogPostSkeleton className="mb-4" />
```

#### ReviewSkeleton
```jsx
import { ReviewSkeleton } from "@/components/ui/loading";

<ReviewSkeleton className="mb-6" />
```

#### FormSkeleton
```jsx
import { FormSkeleton } from "@/components/ui/loading";

<FormSkeleton className="space-y-4" />
```

### 6. Section Loading

#### SectionLoading
A wrapper component that shows skeleton or spinner while loading.

```jsx
import { SectionLoading, ProductGridSkeleton } from "@/components/ui/loading";

<SectionLoading 
  loading={loading} 
  skeleton={ProductGridSkeleton}
  className="mt-8"
>
  {/* Your content here */}
</SectionLoading>
```

### 7. Page Loading Overlay

#### PageLoadingOverlay
Shows a full-screen loading overlay.

```jsx
import { PageLoadingOverlay } from "@/components/ui/loading";

<PageLoadingOverlay loading={isLoading}>
  {/* Your page content */}
</PageLoadingOverlay>
```

## Global Loading System

### LoadingContext
Manages global loading states across the application.

```jsx
import { useLoading } from "@/context/LoadingContext";

const { 
  globalLoading,
  setGlobalLoading,
  setLoading,
  getLoading,
  clearLoading,
  clearAllLoading,
  isAnyLoading,
  getAllLoadingStates
} = useLoading();
```

### Global Loading Indicators

#### GlobalLoadingIndicator
Shows a progress bar at the top of the page when any loading is active.

#### FullScreenLoading
Shows a full-screen loading overlay for global loading states.

## Usage Examples

### 1. Product Card with Loading
```jsx
import { WishlistButtonLoading } from "@/components/ui/loading";

function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlist = async () => {
    setIsLoading(true);
    try {
      // API call
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <WishlistButtonLoading
        loading={isLoading}
        onClick={handleWishlist}
        className="absolute top-4 right-4"
      />
    </div>
  );
}
```

### 2. Section with Skeleton Loading
```jsx
import { SectionLoading, ProductGridSkeleton } from "@/components/ui/loading";

function ProductsSection() {
  const { data: products, loading } = useFetch("/api/products");

  return (
    <SectionLoading 
      loading={loading} 
      skeleton={() => <ProductGridSkeleton count={6} />}
    >
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionLoading>
  );
}
```

### 3. Form with Loading Button
```jsx
import { ButtonLoading } from "@/components/ui/loading";

function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Submit form
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" />
      <ButtonLoading
        type="submit"
        loading={isLoading}
        className="bg-primary text-white"
      >
        {isLoading ? "Sending..." : "Send"}
      </ButtonLoading>
    </form>
  );
}
```

## Best Practices

1. **Always provide loading states** for async operations
2. **Use appropriate skeleton components** for better UX
3. **Disable interactive elements** during loading
4. **Show meaningful loading messages** to users
5. **Use the global loading context** for app-wide loading states
6. **Clean up loading states** in useEffect cleanup functions

## Integration with useFetch

The `useFetch` hook automatically integrates with the global loading system:

```jsx
const { data, loading, error } = useFetch("/api/products");
// loading state is automatically managed globally
```

## Customization

All loading components accept className props for custom styling:

```jsx
<LoadingSpinner className="text-blue-500" />
<ButtonLoading className="bg-red-500 text-white" />
<ProductCardSkeleton className="border-2 border-gray-300" />
```

## Performance Considerations

1. **Lazy load skeletons** when not needed
2. **Use appropriate loading states** for different operations
3. **Clean up loading states** to prevent memory leaks
4. **Optimize skeleton rendering** for large lists

## Accessibility

All loading components include proper ARIA attributes:

- `aria-label` for screen readers
- `disabled` states during loading
- Proper focus management
- Loading announcements for screen readers 