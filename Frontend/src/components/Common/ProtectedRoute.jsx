import { Navigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

import SearchLoader from './SearchLoader'
import Retry from './Retry'

const ProtectedRoute = ({ children }) => {
  const { user, loading, error } = useUser()

  if (loading) {
    return <SearchLoader />
  }

  if (error) {
    return <Retry />
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRoute
