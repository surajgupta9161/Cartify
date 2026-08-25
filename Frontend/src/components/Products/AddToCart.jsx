import axios from 'axios'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useUser } from '../../context/UserContext'

const AddToCart = ({ productId }) => {
  const { cart, fetchCart } = useCart()
  const { fetchUser } = useUser()
  const [loading, setLoading] = useState(false)

  const isAdded = cart?.some(item => item.product?._id === productId)

  const handleCart = async () => {
    if (loading) return

    try {
      setLoading(true)

      if (isAdded) {
        await axios.delete(
          `http://localhost:3000/api/cart/removefromcart/${productId}`,
          {
            withCredentials: true
          }
        )
      } else {
        await axios.post(
          'http://localhost:3000/api/cart/addtocart',
          { productId },
          {
            withCredentials: true
          }
        )
      }
      await fetchUser()
      await fetchCart()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCart}
      disabled={loading}
      className={`
        absolute bottom-2 right-2
        rounded-lg font-semibold
        transition active:scale-95

        ${
          isAdded
            ? 'bg-green-600 text-white px-3 py-1 text-sm cursor-pointer hover:bg-red-600'
            : 'bg-white text-pink-600 border border-pink-600 px-5 py-1.5 hover:bg-pink-50 cursor-pointer'
        }

        ${loading ? 'opacity-60 cursor-not-allowed' : ''}
      `}
    >
      {loading ? (
        '...'
      ) : isAdded ? (
        <span className='flex items-center gap-1'>
          <Check size={14} />
          Added
        </span>
      ) : (
        'ADD'
      )}
    </button>
  )
}

export default AddToCart
