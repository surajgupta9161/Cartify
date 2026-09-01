import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import api from '../api/axios'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchUser = async () => {
    try {
      setLoading(true)
      setError(false)
      const response = await api.get('/api/auth/me')
      setUser(response.data.user)
      return response.data.user
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        // user actually logged in nahi hai
        setUser(null)
      } else {
        // network error / server down / timeout
        setError(true)
      }
      console.log('User fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(false)
      const response = await api.get('/api/order/myorders')
      setLoading(false)
      // console.log(response.data.orders)
      setOrders(response.data.orders)
    } catch (error) {
      setOrders([])

      setLoading(false)
      console.log('Order fetch error:', error)
      setOrders([])
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        orders,
        setOrders,
        fetchOrders,
        fetchUser,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
