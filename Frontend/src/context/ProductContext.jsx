import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      setLoading(true)

      const response = await axios.get(
        `http://localhost:3000/api/product/?category=${activeCategory}`
      )
      let productdata = response.data.products
      console.log(productdata)
      setProducts(productdata)
    } catch (error) {
      setLoading(false)
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
        activeCategory,
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
