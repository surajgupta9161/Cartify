import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star } from 'lucide-react'

import AddToCart from './AddToCart'
import SimilarProducts from './SimilarProducts'
import YouMayAlsoLike from './YouMayAlsoLike'
import ProductReviews from './ProductReviews'

import api from '../../api/axios'
import SearchLoader from '../Common/SearchLoader'

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
      console.log('Product fetch error:', error)
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [id])

  if (loading) {
    return (
      <div className='min-h-[70vh] flex items-center justify-center'>
        <SearchLoader />
      </div>
    )
  }

  if (!product) {
    return (
      <div className='min-h-[70vh] flex flex-col gap-4 items-center justify-center'>
        <p className='text-red-400'>Product not found</p>

        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer'
        >
          <ArrowLeft size={17} />
          Go Back
        </button>
      </div>
    )
  }

  const discount = 20

  const originalPrice = Math.round(product.price / (1 - discount / 100))

  return (
    <div className='py-6'>
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className='
          flex items-center gap-2
          mb-5
          text-sm sm:text-base
          text-gray-300
          hover:text-white
          transition
          cursor-pointer
        '
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* MAIN PRODUCT SECTION */}
      <div
        className='
          grid grid-cols-1
          md:grid-cols-2
          gap-6 lg:gap-10
          bg-[#2d2c2c]
          p-4 sm:p-6 lg:p-8
          rounded-2xl
        '
      >
        {/* PRODUCT IMAGE */}
        <div
          className='
    relative
    bg-[#242323]
    rounded-2xl
    overflow-hidden
    flex items-center
    justify-center
  '
        >
          {/* BADGES */}
          <div className='absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 sm:gap-2'>
            <span className='bg-blue-600 text-white text-[9px] sm:text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full'>
              New Arrival
            </span>

            <span className='bg-red-600 text-white text-[9px] sm:text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full'>
              Hot Deal
            </span>

            <span className='bg-yellow-400 text-black text-[9px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-full'>
              {discount}% OFF
            </span>
          </div>

          {/* IMAGE */}
          <img
            src={product.image}
            alt={product.name}
            className='
      w-full
      h-[320px]
      sm:h-[400px]
      lg:h-[460px]
      object-contain
    '
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className='flex flex-col'>
          {/* CATEGORY */}
          <span
            className='
              w-fit
              bg-blue-500/15
              text-blue-400
              px-3 py-1
              rounded-full
              text-xs sm:text-sm
              mb-3
            '
          >
            {product.category}
          </span>

          {/* PRODUCT NAME */}
          <h1
            className='
              text-xl
              sm:text-3xl
              lg:text-4xl
              font-semibold
              text-white
              leading-tight
            '
          >
            {product.name}
          </h1>

          {/* SMALL PRODUCT TEXT */}
          <p
            className='
              text-xs
              sm:text-sm
              text-gray-400
              mt-2
              leading-5
            '
          >
            Premium quality product with reliable performance and great value.
          </p>

          {/* RATING */}
          <div className='flex items-center gap-2 mt-4'>
            <div
              className='
                flex items-center gap-1
                bg-green-600
                px-2 py-1
                rounded-md
              '
            >
              <span className='text-xs sm:text-sm font-medium'>
                {product.rating}
              </span>

              <Star size={13} fill='currentColor' />
            </div>

            <span className='text-xs sm:text-sm text-gray-400'>
              {product.numReviews} Customer Reviews
            </span>
          </div>

          {/* PRICE */}
          <div className='mt-5'>
            <div className='flex items-end flex-wrap gap-2 sm:gap-3'>
              <p
                className='
                  text-2xl
                  sm:text-3xl
                  lg:text-4xl
                  font-bold
                  text-white
                '
              >
                ₹{product.price}
              </p>

              <p
                className='
                  text-sm sm:text-base
                  text-gray-500
                  line-through
                  mb-1
                '
              >
                ₹{originalPrice}
              </p>

              <span
                className='
                  text-green-400
                  text-xs sm:text-sm
                  font-semibold
                  mb-1
                '
              >
                {discount}% OFF
              </span>
            </div>

            <p className='text-[10px] sm:text-xs text-gray-500 mt-1'>
              Inclusive of all taxes
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className='mt-5 sm:mt-6'>
            <h2
              className='
                text-base
                sm:text-lg
                font-semibold
                text-white
                mb-2
              '
            >
              Product Description
            </h2>

            <p
              className='
                text-xs
                sm:text-base
                text-gray-400
                leading-5
                sm:leading-7
              '
            >
              {product.description}
            </p>
          </div>

          {/* STOCK */}
          <div className='mt-5'>
            {product.stock > 0 ? (
              <div>
                <p className='text-sm sm:text-base text-green-400 font-medium'>
                  In Stock
                </p>

                <p className='text-xs text-gray-400 mt-1'>
                  Only {product.stock} items available
                </p>
              </div>
            ) : (
              <p className='text-sm sm:text-base text-red-400 font-medium'>
                Out of Stock
              </p>
            )}
          </div>

          {/* EXTRA INFO */}
          <div
            className='
              grid grid-cols-2
              gap-2 sm:gap-3
              mt-5
            '
          >
            <div
              className='
                bg-[#242323]
                rounded-lg
                p-2.5 sm:p-3
              '
            >
              <p className='text-[10px] sm:text-xs text-gray-500'>Delivery</p>

              <p className='text-xs sm:text-sm text-white mt-0.5'>
                Fast Delivery
              </p>
            </div>

            <div
              className='
                bg-[#242323]
                rounded-lg
                p-2.5 sm:p-3
              '
            >
              <p className='text-[10px] sm:text-xs text-gray-500'>Payment</p>

              <p className='text-xs sm:text-sm text-white mt-0.5'>
                Secure Payment
              </p>
            </div>
          </div>

          {/* ADD TO CART */}
          <div className='mt-6 lg:mt-auto lg:pt-6'>
            <AddToCart
              productId={product._id}
              disabled={product.stock === 0}
              className='
                w-full
                sm:w-fit
                flex
                items-center
                justify-center
                gap-2

                px-7 py-3

                lg:px-14
                lg:py-4

                text-sm
                lg:text-lg

                bg-blue-600
                hover:bg-blue-700

                disabled:bg-gray-600
                disabled:cursor-not-allowed

                rounded-xl
                font-semibold
                transition
                cursor-pointer
              '
            />
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <ProductReviews product={product} />

      {/* SIMILAR PRODUCTS */}
      <SimilarProducts currentProduct={product} />

      {/* YOU MAY ALSO LIKE */}
      <YouMayAlsoLike currentProduct={product} />
    </div>
  )
}

export default ProductDetails
