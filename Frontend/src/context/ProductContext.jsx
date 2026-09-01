import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(false)
      const response = await api.get(`/api/product/?category=${activeCategory}`)
      let productdata = response.data.products
      // console.log(productdata)
      setProducts(productdata)
    } catch (error) {
      setError(true)
      console.log('Product fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [activeCategory])

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        activeCategory,
        fetchProducts,
        setActiveCategory
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  return useContext(ProductContext)
}
