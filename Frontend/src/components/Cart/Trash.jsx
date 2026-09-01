import { Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useUser } from '../../context/UserContext'
import api from '../../api/axios'
const Trash = ({ id }) => {
  const { fetchCart } = useCart()
  const { fetchUser } = useUser()
  const handleDelete = async id => {
    console.log('Product Id By trash: ', id)
    try {
      const response = await api.delete(`/api/cart/removefromcart/${id}`)
      if (response.status === 200) {
        await fetchUser()
        await fetchCart()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button
        onClick={() => handleDelete(id)}
        className='text-red-400 hover:text-red-500
        cursor-pointer transition'
      >
        <Trash2 size={19} />
      </button>
    </div>
  )
}

export default Trash
