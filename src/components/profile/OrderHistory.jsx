import p1 from "../../../public/p1.png"
import OrderCard from "./OrderCard"

export default function OrderHistory() {
  const orders = [
    {
      id: 1,
      orderId: "demo order",
      orderDate: "June 14, 2025",
      totalAmount: "KD 10",
      productImage: p1,
      productName: "Beauty Oil",
      productWeight: "Weigh : 200ml",
      shippingLocation: "Los angels",
      shippingAddress: "1 Bluxome St #307 CA, USA",
      statusProgress: "33.33%", // For 'Confirmed'
    },
    {
      id: 2,
      orderId: "demo order",
      orderDate: "June 14, 2025",
      totalAmount: "KD 10",
      productImage: p1,
      productName: "Beauty Oil",
      productWeight: "Weigh : 200ml",
      shippingLocation: "Los angels",
      shippingAddress: "1 Bluxome St #307 CA, USA",
      statusProgress: "33.33%",
    },
    {
      id: 3,
      orderId: "demo order",
      orderDate: "June 14, 2025",
      totalAmount: "KD 10",
      productImage: p1,
      productName: "Beauty Oil",
      productWeight: "Weigh : 200ml",
      shippingLocation: "Los angels",
      shippingAddress: "1 Bluxome St #307 CA, USA",
      statusProgress: "33.33%",
    },
    {
      id: 4,
      orderId: "demo order",
      orderDate: "June 14, 2025",
      totalAmount: "KD 10",
      productImage: p1,
      productName: "Beauty Oil",
      productWeight: "Weigh : 200ml",
      shippingLocation: "Los angels",
      shippingAddress: "1 Bluxome St #307 CA, USA",
      statusProgress: "66.66%",
    },
  ]

  return (
    <div className=" bg-[#FAF6ED] p-[20.34px]">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}
