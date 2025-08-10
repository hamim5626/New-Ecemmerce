import Image from "next/image"

const OrderCard = ({ order }) => {
  return (
    <div className="bg-[#fff] p-6 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold text-black">{order.orderId}</span>
          <span className="text-gray-500 text-sm">{order.orderDate}</span>
        </div>
        <span className="text-lg font-semibold text-black">{order.totalAmount}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* Product Info */}
        <div className="flex items-center gap-4">
          <Image
            src={order.productImage || "/placeholder.svg"}
            alt={order.productName}
            width={80}
            height={80}
            className="rounded-lg object-cover bg-gray-300"
          />
          <div>
            <h3 className="text-base font-medium text-black">{order.productName}</h3>
            <p className="text-gray-500 text-sm">{order.productWeight}</p>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="space-y-1">
          <h3 className="text-base font-medium text-black">Shipping Info</h3>
          <p className="text-gray-500 text-sm">{order.shippingLocation}</p>
          <p className="text-gray-500 text-sm">{order.shippingAddress}</p>
        </div>

        {/* Order Status */}
        <div className="space-y-2">
          <h3 className="text-base font-medium text-black">Order Status</h3>
          <div className="flex justify-between text-sm">
            <span className="text-primary font-medium">Confirmed</span>
            <span className="text-gray-500">Shipped</span>
            <span className="text-gray-500">Delivered</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: order.statusProgress }} // Example: '33.33%' for confirmed
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard
