import { useProduct } from '../../context/ProductContext'
import { Star } from 'lucide-react'
import SearchLoader from '../Common/SearchLoader'
import AddToCart from './AddToCart'
import { useNavigate } from 'react-router-dom'
import Retry from '../Common/Retry'

const ProductList = () => {
  const { products, loading, error, fetchProducts } = useProduct()
  const navigate = useNavigate()

  if (loading) {
    return <SearchLoader />
  }

  if (error) {
    return <Retry onRetry={fetchProducts} />
  }

  return (
    <div className='grid grid-cols-2 mt-4 md:grid-cols-4 mb-5 gap-5'>
      {products.map(product => (
        <div
          onClick={() => navigate(`/product/${product._id}`)}
          key={product._id}
        >
          {/* Image Container */}
          <div className='relative'>
            {/* Price */}
            <div className='absolute top-2 right-2 bg-black text-white px-3 py-1 rounded-full text-sm font-semibold z-10'>
              ₹{product.price}
            </div>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-52 object-cover rounded-xl'
            />

            {/* Add To Cart */}
            <AddToCart
              productId={product._id}
              className='absolute bottom-2 right-2'
            />
          </div>

          {/* Product Details */}
          <div className='mt-3'>
            <h2 className='text-lg font-semibold'>{product.name}</h2>

            <p className='text-sm text-gray-400 mt-1'>{product.description}</p>

            {/* Rating */}
            <div className='flex items-center gap-1 mt-2'>
              <Star size={15} className='text-yellow-400 fill-yellow-400' />

              <span className='text-sm font-medium'>{product.rating}</span>

              <span className='text-xs text-gray-400'>
                ({product.numReviews})
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList
