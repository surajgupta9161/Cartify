import Trash from './Trash'
import QuantityControl from '../Cart/Quantity/QuantityControl'

const CartItems = ({ cartProducts }) => {
  return (
    <div>
      {cartProducts.map(item => (
        <div
          key={item._id}
          className='flex gap-4 mb-2 sm:gap-5 p-3 rounded-2xl
          bg-white/5 border border-gray-700/50'
        >
          {/* IMAGE */}
          <img
            src={item.product?.image}
            alt={item.product?.name}
            className='w-20 h-20 sm:w-28 sm:h-28
            object-cover rounded-xl'
          />

          {/* DETAILS */}
          <div className='flex-1 min-w-0'>
            <h2 className='text-sm sm:text-lg font-semibold truncate'>
              {item.product?.name}
            </h2>

            <p className='text-gray-400 text-sm mt-0.5'>
              {item.product?.category}
            </p>

            <p className='text-blue-400 font-semibold mt-0.5'>
              ₹{item.product?.price}
            </p>

            {/* QUANTITY */}
            <div className='mt-1'>
              <QuantityControl
                productId={item.product?._id}
                quantity={item.quantity}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className='flex flex-col justify-between items-end'>
            <Trash id={item.product?._id} />

            <p className='font-semibold whitespace-nowrap'>
              ₹{item.product?.price * item.quantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartItems
