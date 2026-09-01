import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const fetchCart = async () => {
    try {
      setLoading(true)
      setError(false)
      const response = await api.get('/api/cart/getcart')
      setLoading(false)
      // console.log(response.data.cart)
      setCart(response.data.cart)
    } catch (error) {
      setLoading(false)
      setError(true)
      console.log('Cart fetch error:', error)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loading,
        setLoading,
        fetchCart,
        error
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
