import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const fetchCart = async () => {
    try {
      setLoading(true)
      setError(false)
      const response = await axios.get(
        'http://localhost:3000/api/cart/getcart',
        {
          withCredentials: true,
          timeout: 10000
        }
      )
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
