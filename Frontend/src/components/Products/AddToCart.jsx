import axios from 'axios'
import { Check } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useUser } from '../../context/UserContext'

const AddToCart = ({ productId }) => {
  const { cart, fetchCart } = useCart()
  const { fetchUser } = useUser()

  // Check product already cart me hai ya nahi
  const isAdded = cart?.some(item => item.product?._id === productId)

  const addToCart = async () => {
    // Already added hai to request mat bhejo
    if (isAdded) return

    try {
      const response = await axios.post(
        'http://localhost:3000/api/cart/addtocart',
        { productId },
        { withCredentials: true }
      )

      if (response.status === 200) {
        await fetchCart()
        await fetchUser()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      onClick={addToCart}
      disabled={isAdded}
      className={`
        absolute bottom-2 right-2
        rounded-lg font-semibold
        transition active:scale-95
        ${
          isAdded
            ? 'bg-green-600 text-white border border-green-600 px-3 py-1 text-sm cursor-default'
            : 'bg-white text-pink-600 border border-pink-600 px-5 py-1.5 hover:bg-pink-50 cursor-pointer'
        } 
    `}
    >
      {isAdded ? (
        <span className='flex items-center gap-1'>
          <Check size={16} />
          Added
        </span>
      ) : (
        'ADD'
      )}
    </button>
  )
}

export default AddToCart
