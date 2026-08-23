const OrderSummary = ({ cartProducts, totalPrice }) => {
  return (
    <div className='px-6 py-3 rounded-2xl bg-white/5 border border-gray-700/50'>
      <h2 className='text-xl font-semibold mb-2'>Order Summary</h2>

      <div className='flex justify-between text-gray-400 mb-2'>
        <span>Items</span>
        <span>{cartProducts.length}</span>
      </div>

      <div className='flex justify-between text-gray-400 mb-2'>
        <span>Subtotal</span>
        <span>₹{totalPrice}</span>
      </div>

      <div className='flex justify-between text-gray-400 mb-2'>
        <span>Delivery</span>
        <span className='text-green-400'>Free</span>
      </div>

      <div className='border-t border-gray-700 pt-2 flex justify-between'>
        <span className='font-semibold text-lg'>Total</span>

        <span className='font-bold text-xl text-blue-400'>₹{totalPrice}</span>
      </div>
    </div>
  )
}

export default OrderSummary
