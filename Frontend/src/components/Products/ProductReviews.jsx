import { useState } from 'react'
import { Star, UserRound, ChevronDown, ChevronUp } from 'lucide-react'

const ProductReviews = ({ product }) => {
  const [showAll, setShowAll] = useState(false)

  const reviews = [
    {
      id: 1,
      name: 'Rahul',
      rating: 5,
      comment: 'Great product! Quality is really good.',
      date: '10 Sep 2026'
    },
    {
      id: 2,
      name: 'Aman',
      rating: 4,
      comment: 'Good product and worth the price.',
      date: '08 Sep 2026'
    },
    {
      id: 3,
      name: 'Priya',
      rating: 4,
      comment: 'Product quality is nice. Satisfied with the purchase.',
      date: '05 Sep 2026'
    },
    {
      id: 4,
      name: 'Rohit',
      rating: 5,
      comment: 'Amazing product. Delivery was also very fast.',
      date: '02 Sep 2026'
    },
    {
      id: 5,
      name: 'Neha',
      rating: 4,
      comment: 'Nice product. Packaging and quality were good.',
      date: '30 Aug 2026'
    }
  ]

  // Initially 2, button click ke baad all
  const visibleReviews = showAll ? reviews : reviews.slice(0, 2)

  return (
    <div className='mt-10'>
      {/* HEADING */}
      <h2 className='text-lg sm:text-xl font-semibold text-white'>
        Ratings & Reviews
      </h2>

      <p className='text-xs text-gray-400 mt-1'>
        See what customers think about this product
      </p>

      {/* RATING SUMMARY */}
      <div className='mt-4 bg-[#2d2c2c] rounded-xl p-4 flex items-center gap-5'>
        <div>
          <div className='flex items-center gap-1'>
            <span className='text-3xl font-bold text-white'>
              {product.rating}
            </span>

            <Star size={20} className='text-yellow-400' fill='currentColor' />
          </div>

          <p className='text-xs text-gray-400 mt-1'>
            {product.numReviews} Reviews
          </p>
        </div>

        <div className='h-12 w-px bg-gray-600' />

        <div>
          <p className='text-sm text-gray-300'>Overall Rating</p>

          <div className='flex gap-0.5 mt-1'>
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={15}
                className={
                  star <= Math.round(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-600'
                }
                fill='currentColor'
              />
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className='mt-5 space-y-3'>
        {visibleReviews.map(review => (
          <div key={review.id} className='bg-[#2d2c2c] rounded-xl p-4'>
            {/* USER */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-[#242323] flex items-center justify-center'>
                  <UserRound size={16} />
                </div>

                <div>
                  <p className='text-sm font-medium text-white'>
                    {review.name}
                  </p>

                  <p className='text-[10px] text-gray-500'>Verified Buyer</p>
                </div>
              </div>

              <span className='text-[10px] text-gray-500'>{review.date}</span>
            </div>

            {/* STARS */}
            <div className='flex gap-0.5 mt-3'>
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={12}
                  className={
                    star <= review.rating ? 'text-yellow-400' : 'text-gray-600'
                  }
                  fill='currentColor'
                />
              ))}
            </div>

            {/* COMMENT */}
            <p className='text-xs sm:text-sm text-gray-300 mt-2 leading-5'>
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* SEE ALL REVIEWS */}
      {reviews.length > 2 && (
        <div className='flex justify-center mt-5'>
          <button
            onClick={() => setShowAll(prev => !prev)}
            className='
              flex items-center gap-1.5
              border border-gray-600
              text-gray-300
              hover:text-white
              hover:border-gray-400
              px-5 py-2
              rounded-lg
              text-xs sm:text-sm
              transition
              cursor-pointer
            '
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp size={15} />
              </>
            ) : (
              <>
                See All Reviews
                <ChevronDown size={15} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductReviews
