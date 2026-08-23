const OrderNow = ({ totalPrice }) => {
  return (
    <div
      className='fixed bottom-2 left-1/2 -translate-x-1/2 z-50
        w-[90%] max-w-sm
        bg-[#071321] border border-gray-700/70
        px-3 py-2 rounded-2xl
        shadow-[0_-8px_30px_rgba(0,0,0,0.25)]'
    >
      <div className='flex items-center justify-between gap-5'>
        <div>
          <p className='text-xs text-gray-400'>Total Price</p>

          <p className='text-xl font-bold text-white'>₹{totalPrice}</p>
        </div>

        <button
          className='bg-blue-600 hover:bg-blue-700
            text-white px-5 py-3 rounded-xl
            font-semibold cursor-pointer transition'
        >
          Place Order
        </button>
      </div>
    </div>
  )
}

export default OrderNow
