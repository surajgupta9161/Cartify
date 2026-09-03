import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../../../context/CartContext'
import api from '../../../api/axios'

const QuantityControl = ({ productId, quantity }) => {
  const { cart, setCart, fetchCart } = useCart()
  const [loading, setLoading] = useState(false)

  // CART SE CURRENT QUANTITY
  const currentItem = cart.find(item => item.product?._id === productId)

  const currentQuantity = currentItem?.quantity ?? quantity

  const updateQuantity = async action => {
    if (loading) return

    // QUANTITY 1 HAI TO DECREASE BILKUL NAHI HOGA
    if (action === 'decrease' && currentQuantity <= 1) {
      return
    }

    const previousCart = cart

    // PEHLE UI UPDATE
    setCart(prev =>
      prev.map(item => {
        if (item.product?._id !== productId) return item

        if (action === 'increase') {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }

        if (action === 'decrease') {
          return {
            ...item,
            quantity: item.quantity - 1
          }
        }

        return item
      })
    )

    try {
      setLoading(true)

      await api.patch(`/api/cart/updatecartquantity/${productId}`, {
        action
      })

      await fetchCart()
    } catch (error) {
      console.log('Quantity update error:', error)

      setCart(previousCart)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={() => updateQuantity('decrease')}
        disabled={loading || currentQuantity <= 1}
        className='w-8 h-8 flex items-center justify-center
        rounded-md bg-gray-700 hover:bg-gray-600
        cursor-pointer
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:bg-gray-700'
      >
        <Minus size={16} />
      </button>

      <span className='min-w-6 text-center font-semibold'>
        {currentQuantity}
      </span>

      <button
        onClick={() => updateQuantity('increase')}
        disabled={loading}
        className='w-8 h-8 flex items-center justify-center
        rounded-md bg-gray-700 hover:bg-gray-600
        cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <Plus size={16} />
      </button>
    </div>
  )
}

export default QuantityControl
