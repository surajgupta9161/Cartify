import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star } from 'lucide-react'
import AddToCart from './AddToCart'
import api from '../../api/axios'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProduct = async () => {
    try {
      setLoading(true)

      const response = await api.get(`/api/product/${id}`)

      setProduct(response.data.product)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className='min-h-[70vh] flex items-center justify-center'>
        <p className='text-gray-400'>Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='min-h-[70vh] flex items-center justify-center'>
        <p className='text-red-400'>Product not found</p>
      </div>
    )
  }

  return (
    <div className='py-6'>
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 mb-5 text-gray-300 hover:text-white cursor-pointer'
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#2d2c2c] p-5 sm:p-7 rounded-2xl'>
        {/* PRODUCT IMAGE */}
        <div className='bg-[#242323] rounded-2xl overflow-hidden'>
          <img
            src={product.image}
            alt={product.name}
            className='w-full h-80 sm:h-105 object-contain p-5'
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className='flex flex-col'>
          {/* CATEGORY */}
          <span className='w-fit bg-blue-500/15 text-blue-400 px-3 py-1 rounded-full text-sm mb-3'>
            {product.category}
          </span>

          {/* NAME */}
          <h1 className='text-2xl sm:text-3xl font-semibold text-white'>
            {product.name}
          </h1>

          {/* RATING */}
          <div className='flex items-center gap-2 mt-3'>
            <div className='flex items-center gap-1 bg-green-600 px-2 py-1 rounded-md'>
              <span className='text-sm font-medium'>{product.rating}</span>

              <Star size={14} fill='currentColor' />
            </div>

            <span className='text-sm text-gray-400'>
              {product.numReviews} Reviews
            </span>
          </div>

          {/* PRICE */}
          <div className='mt-5'>
            <p className='text-3xl font-bold text-white'>₹{product.price}</p>
          </div>

          {/* DESCRIPTION */}
          <div className='mt-6'>
            <h2 className='text-lg font-semibold mb-2'>Product Description</h2>

            <p className='text-gray-400 leading-7'>{product.description}</p>
          </div>

          {/* STOCK */}
          <div className='mt-5'>
            {product.stock > 0 ? (
              <p className='text-green-400'>
                In Stock ({product.stock} available)
              </p>
            ) : (
              <p className='text-red-400'>Out of Stock</p>
            )}
          </div>

          {/* ADD TO CART */}
          <AddToCart
            productId={product._id}
            className='mt-auto w-full sm:w-fit flex items-center justify-center gap-2
            bg-blue-600 hover:bg-blue-700
            disabled:bg-gray-600 disabled:cursor-not-allowed
            px-7 py-3 rounded-xl
            font-medium transition cursor-pointer'
            disabled={product.stock === 0}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
