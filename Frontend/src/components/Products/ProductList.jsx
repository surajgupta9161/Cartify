import { useMemo } from 'react'
import { useProduct } from '../../context/ProductContext'
import { Star } from 'lucide-react'
import SearchLoader from '../Common/SearchLoader'
import AddToCart from './AddToCart'
import { useNavigate } from 'react-router-dom'
import Retry from '../Common/Retry'

const ProductList = () => {
  const { products, loading, error, fetchProducts } = useProduct()
  const navigate = useNavigate()

  const sections = useMemo(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5)

    return [
      {
        title: 'New Arrivals',
        subtitle: 'Fresh products just added',
        products: shuffled.slice(0, 8)
      },
      {
        title: 'Top Rated',
        subtitle: 'Loved by our customers',
        products: [...products].sort((a, b) => b.rating - a.rating).slice(0, 8)
      },
      {
        title: 'Popular Picks',
        subtitle: 'Trending products for you',
        products: shuffled.slice(2, 10)
      },
      {
        title: 'Latest Deals',
        subtitle: 'Great products at great prices',
        products: [...products].sort((a, b) => a.price - b.price).slice(0, 8)
      }
    ]
  }, [products])

  if (loading) {
    return <SearchLoader />
  }

  if (error) {
    return <Retry onRetry={fetchProducts} />
  }

  return (
    <div className='mt-5 mb-8 space-y-6'>
      {sections.map((section, sectionIndex) => (
        <section
          key={sectionIndex}
          className='
            bg-[#2b2b2b]
            border border-white/10
            rounded-xl
            py-4
          '
        >
          {/* HEADER */}
          <div className='px-4 mb-3'>
            <h2 className='text-base sm:text-lg font-semibold text-white'>
              {section.title}
            </h2>

            <p className='text-[11px] sm:text-xs text-gray-400 mt-0.5'>
              {section.subtitle}
            </p>
          </div>

          {/* HORIZONTAL PRODUCTS */}
          <div
            className='
              flex
              gap-3
              overflow-x-auto
              px-4
              pb-2

              snap-x
              snap-mandatory

              scroll-smooth

              [&::-webkit-scrollbar]:hidden
              [-ms-overflow-style:none]
              scrollbar-none
            '
          >
            {section.products.map(product => (
              <div
                key={`${section.title}-${product._id}`}
                onClick={() => navigate(`/product/${product._id}`)}
                className='
                  min-w-33.75
                  w-33.75

                  sm:min-w-38.75
                  sm:w-38.75

                  md:min-w-42.5
                  md:w-42.5

                  bg-[#222]

                  rounded-lg
                  overflow-hidden

                  border
                  border-white/5

                  cursor-pointer

                  snap-start

                  hover:border-white/20
                  hover:-translate-y-0.5

                  transition-all
                  duration-200
                '
              >
                {/* IMAGE */}
                <div className='relative'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='
                      w-full

                      h-27.5
                      sm:h-31.25
                      md:h-35

                      object-cover
                    '
                  />

                  {/* PRICE */}
                  <div
                    className='
                      absolute
                      top-1.5
                      right-1.5

                      bg-black/80
                      text-white

                      px-2
                      py-0.5

                      rounded-full

                      text-[9px]
                      sm:text-[10px]

                      font-semibold
                      z-10
                    '
                  >
                    ₹{product.price}
                  </div>

                  {/* ADD TO CART */}
                  <AddToCart
                    productId={product._id}
                    className='
                      absolute
                      bottom-1.5
                      right-1.5
                    '
                  />
                </div>

                {/* DETAILS */}
                <div className='p-2'>
                  <h3
                    className='
                      text-xs
                      sm:text-sm

                      font-semibold
                      text-white

                      line-clamp-1
                    '
                  >
                    {product.name}
                  </h3>

                  <p
                    className='
                      text-[9px]
                      sm:text-[10px]

                      text-gray-400

                      mt-0.5

                      line-clamp-2
                      leading-tight
                    '
                  >
                    {product.description}
                  </p>

                  {/* RATING */}
                  <div className='flex items-center gap-1 mt-1.5'>
                    <Star
                      size={11}
                      className='text-yellow-400 fill-yellow-400'
                    />

                    <span className='text-[10px] font-medium'>
                      {product.rating}
                    </span>

                    <span className='text-[9px] text-gray-500'>
                      ({product.numReviews})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default ProductList
