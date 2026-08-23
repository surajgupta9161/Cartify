import { Trash2 } from 'lucide-react'
import axios from 'axios'
import { useCart } from '../../context/CartContext'
const Trash = ({ id }) => {
  const { fetchCart } = useCart()
  const handleDelete = async id => {
    console.log('Product Id By trash: ', id)
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/cart/removefromcart/${id}`,
        { withCredentials: true }
      )
      if (response.status === 200) {
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
