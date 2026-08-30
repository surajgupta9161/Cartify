import ProtectedRoute from '../components/Common/ProtectedRoute'
import Cart from '../components/Cart/Cart'

const CartPage = () => {
  return (
    <div>
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    </div>
  )
}

export default CartPage
