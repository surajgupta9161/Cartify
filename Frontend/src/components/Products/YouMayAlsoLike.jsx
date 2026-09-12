import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useProduct } from '../../context/ProductContext'
import AddToCart from './AddToCart'

const YouMayAlsoLike = ({ currentProduct }) => {
  const { products } = useProduct()
  const navigate = useNavigate()
  const scrollRef = useRef(null)

  // Current product ki category ko hata kar
  // different categories ke products
  const suggestedProducts = products
    .filter(
      item =>
        item._id !== currentProduct._id &&
        item.category !== currentProduct.category
    )
    .slice(0, 12)

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -220,
      behavior: 'smooth'
    })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 220,
      behavior: 'smooth'
    })
  }

  if (suggestedProducts.length === 0) return null

  return (
    <div className='mt-10'>
      {/* HEADER */}
      <div className='flex items-center justify-between mb-3'>
        <div>
          <h2 className='text-lg sm:text-xl font-semibold text-white'>
            You May Also Like
          </h2>

          <p className='text-xs text-gray-400 mt-0.5'>
            Products you might be interested in
          </p>
        </div>

        {/* ARROWS */}
        <div className='flex gap-1.5'>
          <button
            onClick={scrollLeft}
            className='w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center
            rounded-full bg-[#2d2c2c] hover:bg-gray-600
            transition cursor-pointer'
          >
            <ChevronLeft size={17} />
          </button>

          <button
            onClick={scrollRight}
            className='w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center
            rounded-full bg-[#2d2c2c] hover:bg-gray-600
            transition cursor-pointer'
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div
        ref={scrollRef}
        className='
          flex gap-3
          overflow-x-auto
          scroll-smooth
          pb-1
          scrollbar-none
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        '
      >
        {suggestedProducts.map(item => (
          <div
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
            className='
              min-w-32.5 w-32.5
              sm:min-w-37.5 sm:w-37.5
              bg-[#2d2c2c]
              rounded-lg
              overflow-hidden
              cursor-pointer
              hover:-translate-y-0.5
              transition
            '
          >
            {/* IMAGE */}
            <div className='bg-[#242323] h-26.25 sm:h-30 overflow-hidden'>
              <img
                src={item.image}
                alt={item.name}
                className='w-full h-full object-contain p-1'
              />
            </div>

            {/* DETAILS */}
            <div className='p-1.5'>
              {/* CATEGORY */}
              <p className='text-[8px] sm:text-[9px] text-pink-400 truncate'>
                {item.category}
              </p>

              {/* NAME */}
              <h3 className='text-[10px] sm:text-[11px] font-medium text-white truncate mt-0.5'>
                {item.name}
              </h3>

              {/* RATING + PRICE */}
              <div className='flex items-center justify-between mt-1'>
                <div className='flex items-center gap-0.5 bg-green-600 px-1 py-px rounded'>
                  <span className='text-[8px]'>{item.rating}</span>

                  <Star size={7} fill='currentColor' />
                </div>

                <p className='text-[11px] sm:text-xs font-semibold text-white'>
                  ₹{item.price}
                </p>
              </div>

              {/* ADD TO CART */}
              <div onClick={e => e.stopPropagation()} className='mt-1.5'>
                <AddToCart
                  productId={item._id}
                  className='w-full flex justify-center'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default YouMayAlsoLike
