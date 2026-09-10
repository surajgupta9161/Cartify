import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const offers = [
  {
    id: 1,
    title: 'Latest Smartphones',
    subtitle: 'Upgrade Your Everyday',
    description: 'Powerful performance, premium cameras and stunning displays.',
    price: 'Starting ₹12,999',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    badge: 'New Arrival'
  },
  {
    id: 2,
    title: 'Premium Headphones',
    subtitle: 'Feel Every Beat',
    description: 'Immersive sound with deep bass and all-day comfort.',
    price: 'From ₹1,499',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    badge: 'Best Seller'
  },
  {
    id: 3,
    title: 'Smart Watches',
    subtitle: 'Style Meets Technology',
    description: 'Track fitness, calls, notifications and more.',
    price: 'Starting ₹1,999',
    image:
      'https://images.unsplash.com/photo-1627789871933-f26b1cb24b8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    badge: 'Trending'
  },
  {
    id: 4,
    title: 'Latest Laptops',
    subtitle: 'Work. Play. Create.',
    description: 'Fast performance for work, study and entertainment.',
    price: 'From ₹34,999',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    badge: 'Hot Deal'
  }
]

const ProductOfferSlider = () => {
  const [visibleCards, setVisibleCards] = useState(
    window.innerWidth >= 768 ? 2 : 1
  )

  const [index, setIndex] = useState(0)
  const [transition, setTransition] = useState(true)

  const sliderRef = useRef(null)

  const extendedOffers = [...offers, ...offers.slice(0, visibleCards)]

  useEffect(() => {
    const handleResize = () => {
      const cards = window.innerWidth >= 768 ? 2 : 1

      setVisibleCards(cards)
      setIndex(0)
      setTransition(false)

      requestAnimationFrame(() => {
        setTransition(true)
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => prev + 1)
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (index === offers.length) {
      const timeout = setTimeout(() => {
        setTransition(false)
        setIndex(0)

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransition(true)
          })
        })
      }, 700)

      return () => clearTimeout(timeout)
    }
  }, [index])

  const nextSlide = () => {
    if (index >= offers.length) return

    setIndex(prev => prev + 1)
  }

  const previousSlide = () => {
    if (index === 0) {
      setTransition(false)
      setIndex(offers.length)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true)
          setIndex(offers.length - 1)
        })
      })

      return
    }

    setIndex(prev => prev - 1)
  }

  const cardWidth = 100 / visibleCards

  return (
    <section className='relative w-full mt-5'>
      <div className='overflow-hidden'>
        <div
          ref={sliderRef}
          className={`flex ${
            transition ? 'transition-transform duration-700 ease-in-out' : ''
          }`}
          style={{
            transform: `translateX(-${index * cardWidth}%)`
          }}
        >
          {extendedOffers.map((offer, i) => (
            <div
              key={`${offer.id}-${i}`}
              className='shrink-0 px-2'
              style={{
                width: `${cardWidth}%`
              }}
            >
              <div
                className='  h-37.5 sm:h-45 lg:h-45 rounded-2xl overflow-hidden border border-white/10 bg-linear-to-br  from-[#111827]
                  via-[#1f2937]
                  to-[#111827]

                  shadow-lg

                  flex
                  items-center
                  justify-between

                  px-4
                  sm:px-5
                  py-3

                  relative
                '
              >
                {/* LEFT CONTENT */}

                <div
                  className='
                    w-[60%]
                    h-full

                    relative
                    z-10

                    flex
                    flex-col
                    justify-center
                  '
                >
                  <span
                    className='
                      inline-block
                      w-fit

                      text-[8px]
                      sm:text-[10px]

                      px-2
                      py-0.5

                      rounded-full

                      bg-white/10
                      text-yellow-300

                      mb-1
                    '
                  >
                    {offer.badge}
                  </span>

                  <p
                    className='
                      text-gray-400
                      text-[9px]
                      sm:text-xs

                      leading-tight
                    '
                  >
                    {offer.subtitle}
                  </p>

                  <h2
                    className='
                      text-sm
                      sm:text-base
                      lg:text-lg

                      font-bold
                      text-white

                      mt-0.5

                      leading-tight
                      line-clamp-1
                    '
                  >
                    {offer.title}
                  </h2>

                  <p
                    className='
                      hidden
                      sm:block

                      text-gray-400
                      text-[10px]
                      lg:text-xs

                      mt-1

                      leading-tight
                      line-clamp-1
                    '
                  >
                    {offer.description}
                  </p>

                  <p
                    className='
                      text-green-400
                      font-semibold

                      text-[10px]
                      sm:text-xs

                      mt-1
                    '
                  >
                    {offer.price}
                  </p>

                  <button
                    className='
                      mt-2
                      w-fit

                      bg-white
                      text-black

                      px-3
                      py-1

                      rounded-md

                      text-[9px]
                      sm:text-[10px]

                      font-semibold

                      cursor-pointer

                      hover:bg-gray-200

                      transition
                    '
                  >
                    Shop Now
                  </button>
                </div>

                {/* RIGHT IMAGE */}

                <div
                  className='
                    w-[35%]

                    h-23.75
                    sm:h-31.25
                    lg:h-33.75

                    flex
                    items-center
                    justify-center

                    relative
                    z-10
                  '
                >
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className='
                      w-full
                      h-full

                      object-contain

                      rounded-lg
                    '
                  />
                </div>

                {/* BACKGROUND GLOW */}

                <div
                  className='
                    absolute

                    -right-10
                    top-1/2

                    -translate-y-1/2

                    w-52
                    h-52

                    rounded-full

                    bg-blue-500/10

                    blur-3xl
                  '
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LEFT ARROW */}

      <button
        onClick={previousSlide}
        className='
          absolute

          left-1
          top-1/2

          -translate-y-1/2

          z-20

          w-8
          h-8

          sm:w-9
          sm:h-9

          flex
          items-center
          justify-center

          rounded-full

          bg-black/60
          text-white

          backdrop-blur

          cursor-pointer

          hover:bg-black/80

          transition
        '
      >
        <ChevronLeft size={18} />
      </button>

      {/* RIGHT ARROW */}

      <button
        onClick={nextSlide}
        className='
          absolute

          right-1
          top-1/2

          -translate-y-1/2

          z-20

          w-8
          h-8

          sm:w-9
          sm:h-9

          flex
          items-center
          justify-center

          rounded-full

          bg-black/60
          text-white

          backdrop-blur

          cursor-pointer

          hover:bg-black/80

          transition
        '
      >
        <ChevronRight size={18} />
      </button>
    </section>
  )
}

export default ProductOfferSlider
