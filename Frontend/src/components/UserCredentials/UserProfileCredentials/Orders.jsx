import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CreditCard,
  MapPin,
  Package,
  PackageOpen
} from 'lucide-react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ShopingButton from '../../Common/ShopingButton'

const Orders = ({ orders }) => {
  const navigate = useNavigate()
  const [openItemId, setOpenItemId] = useState(null)

  // Har orderItem ko separate card bana rahe hain
  const orderedProducts =
    orders?.flatMap(
      order =>
        order.orderItems?.map((item, index) => {
          const product = typeof item.product === 'object' ? item.product : null

          return {
            orderId: order._id,

            itemId: item._id || `${order._id}-${index}`,

            productId:
              typeof item.product === 'object'
                ? item.product?._id
                : item.product,

            name: product?.name || item.name,

            image: product?.image || null,

            category: product?.category || null,

            description: product?.description || null,

            qty: item.qty,

            price: item.price,

            itemTotal: item.price * item.qty,

            orderStatus: order.orderStatus,

            paymentInfo: order.paymentInfo,

            isPaid: order.isPaid,

            createdAt: order.createdAt,

            shippingAddress: order.shippingAddress
          }
        }) || []
    ) || []

  const handleViewDetails = itemId => {
    setOpenItemId(prev => (prev === itemId ? null : itemId))
  }

  const handleProductClick = productId => {
    if (!productId) return

    navigate(`/product/${productId}`)
  }

  const getStatusStyle = status => {
    if (status === 'Delivered') {
      return 'bg-green-500/10 text-green-400'
    }

    if (status === 'Shipped') {
      return 'bg-blue-500/10 text-blue-400'
    }

    if (status === 'Cancelled') {
      return 'bg-red-500/10 text-red-400'
    }

    return 'bg-yellow-500/10 text-yellow-400'
  }

  // NO ORDERS
  if (!orders || orderedProducts.length === 0) {
    return (
      <div
        className='
          w-full
          flex
          flex-col
          items-center
          justify-center
          py-16
          px-5
          bg-[#2d2c2c]
          border
          border-gray-700
          rounded-2xl
        '
      >
        <div
          className='
            w-16
            h-16
            flex
            items-center
            justify-center
            rounded-full
            bg-blue-500/10
            mb-4
          '
        >
          <PackageOpen size={32} className='text-blue-400' />
        </div>

        <h2 className='text-xl font-semibold text-white mb-2'>No Orders Yet</h2>

        <p
          className='
            text-gray-400
            text-sm
            text-center
            max-w-sm
          '
        >
          You haven't placed any orders yet. Start shopping and your orders will
          appear here.
        </p>

        <ShopingButton />
      </div>
    )
  }

  return (
    <div>
      {/* ORDER COUNT - jitne cards utne orders */}
      <div className='flex items-center gap-2 mb-4'>
        <Package size={17} className='text-gray-400' />

        <p className='text-sm text-gray-400'>
          {orderedProducts.length}{' '}
          {orderedProducts.length === 1 ? 'Order' : 'Orders'}
        </p>
      </div>

      {/* ORDER CARDS */}
      <div className='space-y-4'>
        {orderedProducts.map(item => {
          const isOpen = openItemId === item.itemId

          return (
            <div
              key={item.itemId}
              className='
                bg-[#2d2c2c]
                border
                border-gray-700
                rounded-2xl
                overflow-hidden
                hover:border-gray-500
                transition
              '
            >
              {/* MAIN CARD */}
              <div className='p-3 sm:p-4 md:p-5'>
                <div className='flex gap-3 sm:gap-5'>
                  {/* PRODUCT IMAGE */}
                  <div
                    onClick={() => handleProductClick(item.productId)}
                    className='
                      w-22.5
                      h-22.5
                      sm:w-28
                      sm:h-28
                      md:w-32
                      md:h-32
                      shrink-0
                      bg-[#242323]
                      rounded-xl
                      overflow-hidden
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                    '
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className='
                          w-full
                          h-full
                          object-contain
                          p-2
                          hover:scale-105
                          transition
                          duration-300
                        '
                      />
                    ) : (
                      <Package size={30} className='text-gray-500' />
                    )}
                  </div>

                  {/* PRODUCT INFO */}
                  <div className='flex-1 min-w-0'>
                    {item.category && (
                      <p className='text-[10px] sm:text-xs text-blue-400 mb-1'>
                        {item.category}
                      </p>
                    )}

                    {/* PRODUCT NAME */}
                    <h3
                      onClick={() => handleProductClick(item.productId)}
                      className='
                        text-sm
                        sm:text-base
                        md:text-lg
                        font-semibold
                        text-white
                        truncate
                        cursor-pointer
                        hover:text-blue-400
                        transition
                      '
                    >
                      {item.name}
                    </h3>

                    {/* PRICE + QUANTITY */}
                    <div className='flex flex-wrap items-center gap-2 mt-2'>
                      <p className='text-sm sm:text-base font-semibold text-white'>
                        ₹{item.price}
                      </p>

                      <span className='text-xs text-gray-500'>
                        × {item.qty}
                      </span>

                      <span className='text-xs text-gray-600'>•</span>

                      <p className='text-xs sm:text-sm text-gray-400'>
                        Total ₹{item.itemTotal}
                      </p>
                    </div>

                    {/* ORDER DATE */}
                    <div className='flex items-center gap-1.5 mt-2 text-gray-400'>
                      <CalendarDays size={14} />

                      <span className='text-[10px] sm:text-xs'>
                        Ordered on{' '}
                        {new Date(item.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    {/* MOBILE STATUS */}
                    <div className='mt-3 sm:hidden'>
                      <span
                        className={`
                          inline-flex
                          px-2.5
                          py-1
                          rounded-full
                          text-[10px]
                          font-medium
                          ${getStatusStyle(item.orderStatus)}
                        `}
                      >
                        {item.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* DESKTOP STATUS */}
                  <div className='hidden sm:block'>
                    <span
                      className={`
                        inline-flex
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        whitespace-nowrap
                        ${getStatusStyle(item.orderStatus)}
                      `}
                    >
                      {item.orderStatus}
                    </span>
                  </div>
                </div>

                {/* BOTTOM SECTION */}
                <div
                  className='
                    flex
                    items-center
                    justify-between
                    gap-3
                    mt-4
                    pt-3
                    border-t
                    border-gray-700
                  '
                >
                  {/* ORDER ID */}
                  <div className='min-w-0'>
                    <p className='text-[9px] sm:text-[10px] text-gray-500'>
                      Order ID
                    </p>

                    <p className='text-[9px] sm:text-xs text-gray-400 truncate'>
                      #{item.orderId}
                    </p>
                  </div>

                  {/* VIEW DETAILS */}
                  <button
                    onClick={() => handleViewDetails(item.itemId)}
                    className='
                      flex
                      items-center
                      gap-1.5
                      px-3
                      py-1.5
                      sm:px-4
                      sm:py-2
                      border
                      border-gray-600
                      rounded-lg
                      text-[10px]
                      sm:text-xs
                      text-gray-200
                      hover:bg-[#3a3939]
                      transition
                      cursor-pointer
                      shrink-0
                    '
                  >
                    {isOpen ? 'Hide Details' : 'View Details'}

                    {isOpen ? (
                      <ChevronUp size={15} />
                    ) : (
                      <ChevronDown size={15} />
                    )}
                  </button>
                </div>
              </div>

              {/* EXPANDED DETAILS */}
              {isOpen && (
                <div
                  className='
                    bg-[#272626]
                    border-t
                    border-gray-700
                    p-4
                    sm:p-5
                  '
                >
                  {/* DESCRIPTION */}
                  {item.description && (
                    <div className='mb-5'>
                      <p className='text-xs text-gray-500 mb-1'>
                        Product Description
                      </p>

                      <p className='text-xs sm:text-sm text-gray-400 leading-6'>
                        {item.description}
                      </p>
                    </div>
                  )}

                  {/* DETAILS GRID */}
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {/* QUANTITY */}
                    <div>
                      <p className='text-[10px] sm:text-xs text-gray-500'>
                        Quantity
                      </p>

                      <p className='text-xs sm:text-sm text-white mt-1'>
                        {item.qty}
                      </p>
                    </div>

                    {/* PRICE */}
                    <div>
                      <p className='text-[10px] sm:text-xs text-gray-500'>
                        Product Price
                      </p>

                      <p className='text-xs sm:text-sm text-white mt-1'>
                        ₹{item.price}
                      </p>
                    </div>

                    {/* PAYMENT METHOD */}
                    <div>
                      <p className='text-[10px] sm:text-xs text-gray-500'>
                        Payment
                      </p>

                      <div className='flex items-center gap-1.5 mt-1 text-gray-300'>
                        <CreditCard size={14} />

                        <p className='text-xs sm:text-sm'>{item.paymentInfo}</p>
                      </div>
                    </div>

                    {/* TOTAL */}
                    <div>
                      <p className='text-[10px] sm:text-xs text-gray-500'>
                        Total
                      </p>

                      <p className='text-sm sm:text-base font-semibold text-white mt-1'>
                        ₹{item.itemTotal}
                      </p>
                    </div>
                  </div>

                  {/* DELIVERY ADDRESS */}
                  {item.shippingAddress && (
                    <div
                      className='
                        mt-5
                        bg-[#323131]
                        border
                        border-gray-700
                        rounded-xl
                        p-3
                        sm:p-4
                      '
                    >
                      <div className='flex items-center gap-2 mb-2'>
                        <MapPin size={16} className='text-blue-400' />

                        <p className='text-xs sm:text-sm font-semibold text-white'>
                          Delivery Address
                        </p>
                      </div>

                      <p className='text-xs sm:text-sm text-gray-400 leading-6'>
                        {item.shippingAddress.addressLine}

                        {item.shippingAddress.city &&
                          `, ${item.shippingAddress.city}`}

                        {item.shippingAddress.postalCode &&
                          ` - ${item.shippingAddress.postalCode}`}
                      </p>
                    </div>
                  )}

                  {/* PAYMENT STATUS + VIEW PRODUCT */}
                  <div className='mt-4 flex items-center justify-between gap-3'>
                    <div>
                      <p className='text-[10px] text-gray-500'>
                        Payment Status
                      </p>

                      <p
                        className={`
                          text-xs
                          mt-1
                          ${item.isPaid ? 'text-green-400' : 'text-yellow-400'}
                        `}
                      >
                        {item.isPaid ? 'Paid' : 'Payment Pending'}
                      </p>
                    </div>

                    <button
                      onClick={() => handleProductClick(item.productId)}
                      className='
                        px-3
                        py-2
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        rounded-lg
                        text-xs
                        font-medium
                        transition
                        cursor-pointer
                      '
                    >
                      View Product
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
