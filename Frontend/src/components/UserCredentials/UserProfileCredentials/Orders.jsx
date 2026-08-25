import { CalendarDays, CreditCard, Package, PackageOpen } from 'lucide-react'
import React from 'react'
import ShopingButton from '../../Common/ShopingButton'

const Orders = ({ orders }) => {
  return (
    <div className='space-y-4'>
      {orders?.length === 0 && (
        <div className='w-full flex flex-col items-center justify-center py-16 px-5 bg-[#2d2c2c] border border-gray-700 rounded-2xl'>
          <div className='w-16 h-16 flex items-center justify-center rounded-full bg-blue-500/10 mb-4'>
            <PackageOpen size={32} className='text-blue-400' />
          </div>

          <h2 className='text-xl font-semibold mb-2'>No Orders Yet</h2>

          <p className='text-gray-400 text-sm text-center max-w-sm'>
            You haven't placed any orders yet. Start shopping and your orders
            will appear here.
          </p>

          <ShopingButton />
        </div>
      )}
      {orders?.map(order => (
        <div
          key={order._id}
          className='bg-[#2d2c2c] border border-gray-700 rounded-2xl p-5 hover:border-gray-500 transition'
        >
          {/* CARD HEADER */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-700 pb-4'>
            <div>
              <p className='text-gray-400 text-sm'>Order ID</p>

              <h3 className='font-semibold mt-1'>#{order?._id}</h3>
            </div>

            <span
              className={`
                      px-3 py-1 rounded-full text-sm w-fit
                      ${
                        order.orderStatus === 'Delivered'
                          ? 'bg-green-500/10 text-green-400'
                          : order.orderStatus === 'Shipped'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }
                    `}
            >
              {order.orderStatus}
            </span>
          </div>

          {/* ORDER DETAILS */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-5'>
            {/* DATE */}
            <div>
              <p className='text-gray-400 text-sm'>Date</p>

              <div className='flex items-center gap-2 mt-1'>
                <CalendarDays size={16} />
                <span className='text-sm sm:text-base'>
                  {new Date(order.createdAt).toLocaleDateString('en-IN')}
                </span>
              </div>
            </div>

            {/* ITEMS */}
            <div>
              <p className='text-gray-400 text-sm'>Items</p>

              <div className='flex items-center gap-2 mt-1'>
                <Package size={16} />
                <span>{order.orderItems?.length}</span>
              </div>
            </div>

            {/* PAYMENT */}
            <div>
              <p className='text-gray-400 text-sm'>Payment</p>

              <div className='flex items-center gap-2 mt-1'>
                <CreditCard size={16} />
                <span>{order.paymentInfo}</span>
              </div>
            </div>

            {/* TOTAL */}
            <div>
              <p className='text-gray-400 text-sm'>Total</p>

              <p className='font-semibold text-lg mt-1'>₹{order.totalPrice}</p>
            </div>
          </div>

          {/* FOOTER */}
          <div className='flex justify-end mt-5'>
            <button className='px-4 py-2 rounded-lg border border-gray-600 hover:bg-[#3a3939] transition'>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Orders
