import { Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import api from '../../api/axios'
import { useState } from 'react'

const Trash = ({ id }) => {
  const { cart, setCart } = useCart()
  const [loading, setLoading] = useState(false)

  const handleDelete = async id => {
    if (loading) return

    const previousCart = cart

    // UI SE TURANT REMOVE
    setCart(prev => prev.filter(item => item.product?._id !== id))

    try {
      setLoading(true)

      // API CALL
      await api.delete(`/api/cart/removefromcart/${id}`)
    } catch (error) {
      console.log('Remove cart error:', error)

      // API FAIL → ITEM WAPAS
      setCart(previousCart)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        disabled={loading}
        onClick={() => handleDelete(id)}
        className='text-red-400 hover:text-red-500
        cursor-pointer transition
        disabled:cursor-not-allowed'
      >
        <Trash2 size={19} />
      </button>
    </div>
  )
}

export default Trash
