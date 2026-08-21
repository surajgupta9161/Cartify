import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3000/api/auth/me', {
        withCredentials: true
      })
      console.log(response.data.user)
      setUser(response.data.user)
    } catch (error) {
      setLoading(false)
      console.log('User fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        'http://localhost:3000/api/order/myorders',
        {
          withCredentials: true
        }
      )
      setLoading(false)
      console.log(response.data.orders)
      setOrders(response.data.orders)
    } catch (error) {
      setLoading(false)
      console.log('Orders fetch error:', error)
      setOrders([])
    }
  }

  useEffect(() => {
    fetchUser()
    fetchOrders()
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        orders,
        setOrders,
        setUser,
        fetchOrders,
        fetchUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
