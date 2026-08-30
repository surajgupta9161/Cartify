import { RefreshCw, WifiOff } from 'lucide-react'
import { useUser } from '../../context/UserContext'
import { useCart } from '../../context/CartContext'

const Retry = ({ onRetry }) => {
  const { fetchUser, fetchOrders } = useUser()
  const { fetchCart } = useCart()

  const handleRetry = async () => {
    const userData = await fetchUser()

    if (userData) {
      await Promise.all([fetchCart(), fetchOrders()])
    }
  }
  return (
    <div className='min-h-100 flex flex-col items-center justify-center gap-3 text-center'>
      <WifiOff size={45} className='text-gray-400' />

      <h2 className='text-xl font-semibold'>Unable to load products</h2>

      <p className='text-sm text-gray-400'>
        Network is slow or server is not responding.
      </p>

      <button
        onClick={onRetry || handleRetry}
        className='flex items-center gap-2 px-5 py-2
        bg-blue-600 hover:bg-blue-700
        text-white rounded-lg
        cursor-pointer transition active:scale-95'
      >
        <RefreshCw size={18} />
        Retry
      </button>
    </div>
  )
}

export default Retry
