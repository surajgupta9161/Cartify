import { Minus, Plus } from 'lucide-react'
import Trash from './Trash'
const CartItems = ({ cartProducts, updateQuantity }) => {
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
              ₹{item.product.price}
            </p>

            {/* QUANTITY */}
            <div className='flex items-center gap-3 mt-1'>
              <button
                onClick={() => updateQuantity(item.product._id, 'decrease')}
                className='w-8 h-8 flex items-center justify-center
                        rounded-lg bg-white/10 hover:bg-white/20
                        cursor-pointer transition'
              >
                <Minus size={16} />
              </button>

              <span className='w-6 text-center'>{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item.product._id, 'increase')}
                className='w-8 h-8 flex items-center justify-center
                        rounded-lg bg-white/10 hover:bg-white/20
                        cursor-pointer transition'
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className='flex flex-col justify-between items-end'>
            <Trash id={item.product._id} />

            <p className='font-semibold whitespace-nowrap'>
              ₹{item.product.price * item.quantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartItems
