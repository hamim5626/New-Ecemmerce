"use client"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { cartUtils } from "@/lib/utils"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"

const CartTable = ({ onProductSelect }) => {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadCartData()
  }, [])

  useEffect(() => {
    if (cartItems.length > 0 && onProductSelect) {
      onProductSelect(cartItems[0].product_id)
    }
  }, [cartItems, onProductSelect])

  const loadCartData = () => {
    try {
      const cartData = cartUtils.getCart()
      setCartItems(cartData)
    } catch (error) {
      console.error('Error loading cart data:', error)
      toast.error('Failed to load cart data')
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = (productId, change) => {
    const item = cartItems.find(item => item.product_id === productId)
    if (!item) return

    const newQuantity = Math.max(1, item.quantity + change)
    
    try {
      const success = cartUtils.updateQuantity(productId, newQuantity)
      if (success) {
        setCartItems(prevItems => 
          prevItems.map(item => 
            item.product_id === productId 
              ? { ...item, quantity: newQuantity }
              : item
          )
        )
        toast.success('Quantity updated successfully')
      } else {
        toast.error('Failed to update quantity')
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
      toast.error('Failed to update quantity')
    }
  }

  const removeItem = (productId) => {
    try {
      const success = cartUtils.removeFromCart(productId)
      if (success) {
        setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId))
        toast.success('Item removed from cart')
      } else {
        toast.error('Failed to remove item')
      }
    } catch (error) {
      console.error('Error removing item:', error)
      toast.error('Failed to remove item')
    }
  }

  const clearCart = () => {
    try {
      cartUtils.clearCart()
      setCartItems([])
      toast.success('Cart cleared successfully')
    } catch (error) {
      console.error('Error clearing cart:', error)
      toast.error('Failed to clear cart')
    }
  }

  const handleProductClick = (productId) => {
    if (onProductSelect) {
      onProductSelect(productId)
    }
  }

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.discount_price || item.regular_price)
    return total + (price * item.quantity)
  }, 0)

  const deliveryCharge = subtotal > 0 ? 5.0 : 0
  const total = subtotal + deliveryCharge

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    const checkoutData = {
      items: cartItems,
      subtotal,
      deliveryCharge,
      total
    }
    localStorage.setItem('checkout_data', JSON.stringify(checkoutData))
    router.push('/checkout')
  }

  if (isLoading) {
    return (
      <div className="container mt-[120px] p-8">
        <div className="text-center">Loading cart...</div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="mt-[120px] p-8 font-inter">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart to get started!</p>
          <Link href="/products" className="bg-heading hover:bg-gray-800 text-white px-6 py-4 rounded-md inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="container px-4 md:px-8 lg:px-16">
        <div
          style={{
            background: "var(--Gradient, linear-gradient(92deg, #F1FAFE 0%, #F8DAB0 100%))",
          }}
          className="p-3 md:p-[30px] mt-[120px] rounded-md"
        >
          <div className="bg-white rounded-md shadow-md">
            {/* Table for md and up */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 font-inter text-heading text-base">
                    <th className="text-center py-3 pl-3 md:pl-6 w-24 md:w-32">Image</th>
                    <th className="text-left py-3 px-2 md:px-6">Product Name</th>
                    <th className="text-left py-3 px-2 md:px-6 w-24 md:w-32">Price</th>
                    <th className="text-center py-3 px-2 md:px-6 w-32">Quantity</th>
                    <th className="text-center py-3 px-2 md:px-6 w-24 md:w-32">Total</th>
                    <th className="text-center py-3 px-2 md:px-6 w-20 md:w-28">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.product_id}
                      className="border-b border-gray-100 font-inter text-heading text-sm"
                    >
                      <td className="py-3 pl-3 md:pl-6">
                        <img
                          src={item.product_image || "/placeholder.svg"}
                          alt={item.product_name}
                          className="w-20 h-20 md:w-28 md:h-24 object-cover rounded border bg-gray-400"
                        />
                      </td>
                      <td className="py-3 px-2 md:px-6">
                        <div>
                          <div
                            className="font-medium text-heading text-sm md:text-base leading-6 cursor-pointer hover:text-blue-600 hover:underline"
                            onClick={() => handleProductClick(item.product_id)}
                          >
                            {item.product_name}
                          </div>
                          <div className="text-xs md:text-sm text-gray-500">Code: {item.product_id}</div>
                        </div>
                      </td>
                      <td className="py-3 px-2 md:px-6 text-heading text-sm md:text-base leading-6">
                        ${parseFloat(item.discount_price || item.regular_price).toFixed(2)}
                      </td>
                      <td className="py-3 px-2 md:px-6 text-center">
                        <div className="flex items-center gap-2 md:gap-4 justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="bg-[#E5E5E5] h-10 w-10 md:h-[50px] md:w-[50px] rounded-[8px] p-0"
                            onClick={() => updateQuantity(item.product_id, -1)}
                          >
                            <Minus className="h-4 w-4 md:h-[13px] md:w-[13px]" />
                          </Button>
                          <span className="flex items-center justify-center h-10 w-10 md:h-[50px] md:w-[50px] text-center text-sm md:text-lg font-inter font-medium bg-white rounded-[8px] border border-[#E5E5E5]">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="bg-[#E5E5E5] h-10 w-10 md:h-[50px] md:w-[50px] rounded-[8px] p-0"
                            onClick={() => updateQuantity(item.product_id, 1)}
                          >
                            <Plus className="h-4 w-4 md:h-[13px] md:w-[13px]" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-3 px-2 md:px-6 text-center text-heading font-medium text-sm md:text-base">
                        ${(parseFloat(item.discount_price || item.regular_price) * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-3 px-2 md:px-6 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded"
                          onClick={() => removeItem(item.product_id)}
                          aria-label={`Remove ${item.product_name} from cart`}
                        >
                          <Trash2 size={20} className="h-6 w-6 md:h-10 md:w-10" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile stacked cards for small screens */}
            <div className="md:hidden space-y-4 p-4">
              {cartItems.map(item => (
                <div key={item.product_id} className="border rounded-md p-4 bg-white shadow">
                  <div className="flex gap-4">
                    <img
                      src={item.product_image || "/placeholder.svg"}
                      alt={item.product_name}
                      className="w-24 h-24 object-cover rounded border bg-gray-400 flex-shrink-0"
                    />
                    <div className="flex flex-col flex-grow">
                      <div
                        className="font-semibold text-lg cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={() => handleProductClick(item.product_id)}
                      >
                        {item.product_name}
                      </div>
                      <div className="text-gray-500 text-sm mb-2">Code: {item.product_id}</div>
                      <div className="text-heading font-medium mb-2">${parseFloat(item.discount_price || item.regular_price).toFixed(2)}</div>
                      <div className="flex items-center gap-3 mb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-[#E5E5E5] h-8 w-8 rounded"
                          onClick={() => updateQuantity(item.product_id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-[#E5E5E5] h-8 w-8 rounded"
                          onClick={() => updateQuantity(item.product_id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="font-semibold text-heading mb-2">
                        Total: ${(parseFloat(item.discount_price || item.regular_price) * item.quantity).toFixed(2)}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-500 hover:bg-red-50 w-full"
                        onClick={() => removeItem(item.product_id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="mt-8 max-w-md md:max-w-lg lg:max-w-xl ml-auto px-4 md:px-0">
          <div
            style={{
              background: "var(--Gradient, linear-gradient(92deg, #F1FAFE 0%, #F8DAB0 100%))",
            }}
            className="p-3 md:p-10 rounded-md"
          >
            <div className="bg-white p-6 font-inter rounded-md shadow-md">
              <h2 className="text-2xl md:text-3xl font-medium text-heading mb-6 text-center">Order Summary</h2>

              <div className="space-y-4 mb-6 text-base md:text-lg">
                <div className="flex justify-between items-center">
                  <span className="text-heading">Price</span>
                  <span className="font-medium">KD {subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-heading">Delivery Charge</span>
                  <span className="font-medium">KD {deliveryCharge.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-heading">Subtotal</span>
                  <span className="font-medium">KD {subtotal.toFixed(2)}</span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between items-center text-lg md:text-xl">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">KD {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-black hover:bg-gray-800 text-white py-5 text-lg font-medium rounded"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="w-full border-red-500 text-red-500 hover:bg-red-50 py-5 text-lg font-medium rounded"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartTable
