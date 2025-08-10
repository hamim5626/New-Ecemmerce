import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Cart utility functions
export const cartUtils = {
  // Get cart from localStorage
  getCart: () => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (error) {
      console.error('Error getting cart from localStorage:', error);
      return [];
    }
  },

  // Save cart to localStorage
  saveCart: (cart) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      return true;
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
      return false;
    }
  },

  // Add item to cart
  addToCart: (product, quantity = 1) => {
    const cart = cartUtils.getCart();
    const existingProductIndex = cart.findIndex(
      item => item.product_id === product.id
    );

    if (existingProductIndex !== -1) {
      // Product already exists, replace quantity (not add)
      cart[existingProductIndex].quantity = quantity;
    } else {
      // Add new product to cart
      const cartItem = {
        product_id: product.id,
        product_name: product.product_name,
        product_image: product.product_image,
        regular_price: product.regular_price,
        discount_price: product.discount_price,
        quantity: quantity,
        added_at: new Date().toISOString()
      };
      cart.push(cartItem);
    }

    return cartUtils.saveCart(cart);
  },

  // Add to existing quantity (for multiple "Add to Cart" clicks)
  addToExistingQuantity: (product, quantity = 1) => {
    const cart = cartUtils.getCart();
    const existingProductIndex = cart.findIndex(
      item => item.product_id === product.id
    );

    if (existingProductIndex !== -1) {
      // Product already exists, add to existing quantity
      cart[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to cart
      const cartItem = {
        product_id: product.id,
        product_name: product.product_name,
        product_image: product.product_image,
        regular_price: product.regular_price,
        discount_price: product.discount_price,
        quantity: quantity,
        added_at: new Date().toISOString()
      };
      cart.push(cartItem);
    }

    return cartUtils.saveCart(cart);
  },

  // Remove item from cart
  removeFromCart: (productId) => {
    const cart = cartUtils.getCart();
    const updatedCart = cart.filter(item => item.product_id !== productId);
    return cartUtils.saveCart(updatedCart);
  },

  // Update item quantity
  updateQuantity: (productId, quantity) => {
    const cart = cartUtils.getCart();
    const productIndex = cart.findIndex(item => item.product_id === productId);
    
    if (productIndex !== -1) {
      if (quantity <= 0) {
        cart.splice(productIndex, 1); // Remove item if quantity is 0 or less
      } else {
        cart[productIndex].quantity = quantity;
      }
      return cartUtils.saveCart(cart);
    }
    return false;
  },

  // Get cart total
  getCartTotal: () => {
    const cart = cartUtils.getCart();
    return cart.reduce((total, item) => {
      const price = item.discount_price || item.regular_price;
      return total + (price * item.quantity);
    }, 0);
  },

  // Get cart count (number of unique products)
  getCartCount: () => {
    const cart = cartUtils.getCart();
    return cart.length; // Return number of unique products, not total quantity
  },

  // Clear cart
  clearCart: () => {
    localStorage.removeItem('cart');
  }
};
