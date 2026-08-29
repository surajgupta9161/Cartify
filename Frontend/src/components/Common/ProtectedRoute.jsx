import { Navigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { useCart } from '../../context/CartContext'

import SearchLoader from './SearchLoader'
import Retry from './Retry'

const ProtectedRoute = ({ children }) => {
  const { user, loading, error, fetchUser, fetchOrders } = useUser()
  const { fetchCart } = useCart()

  const handleRetry = async () => {
    const userData = await fetchUser()

    if (userData) {
      await Promise.all([fetchCart(), fetchOrders()])
    }
  }

  if (loading) {
    return <SearchLoader />
  }

  if (error) {
    return <Retry onRetry={handleRetry} />
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRoute
