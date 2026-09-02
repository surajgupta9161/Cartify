import { Check, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

const AddToCart = ({ productId, className = '' }) => {
  const { cart, setCart, fetchCart } = useCart()
  const { fetchUser, user } = useUser()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const isAdded = cart?.some(item => item.product?._id === productId)

  const handleCart = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    if (loading) return

    const previousCart = cart

    // 1. PEHLE UI UPDATE
    if (isAdded) {
      setCart(prev => prev.filter(item => item.product?._id !== productId))
    } else {
      setCart(prev => [
        ...prev,
        {
          product: {
            _id: productId
          },
          quantity: 1
        }
      ])
    }

    try {
      setLoading(true)

      // 2. USKE BAAD API CALL
      if (isAdded) {
        await api.delete(`/api/cart/removefromcart/${productId}`)
      } else {
        await api.post('/api/cart/addtocart', {
          productId
        })
      }

      // 3. SERVER SE FINAL SYNC
      await Promise.all([fetchUser(), fetchCart()])
    } catch (error) {
      console.log('Cart update failed:', error)

      // 4. API FAIL HUI TO UI WAPAS PURANI STATE ME
      setCart(previousCart)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={e => {
        e.stopPropagation()
        handleCart()
      }}
      disabled={loading}
      className={`
        rounded-lg font-semibold
        transition active:scale-95

        ${
          isAdded
            ? 'bg-green-600 text-white px-3 py-1 text-sm cursor-pointer hover:bg-red-600'
            : 'bg-white text-pink-600 border border-pink-600 px-5 py-1.5 hover:bg-pink-50 cursor-pointer'
        }

        ${loading ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {isAdded ? (
        <span className='flex items-center gap-1'>
          <Check size={14} />
          Added
        </span>
      ) : (
        <span className='flex items-center gap-1'>
          <ShoppingCart size={20} />
          ADD
        </span>
      )}
    </button>
  )
}

export default AddToCart
