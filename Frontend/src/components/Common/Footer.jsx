import { Link } from 'react-router-dom'

import {
  ShoppingBag,
  Code2,
  BriefcaseBusiness,
  Camera,
  Mail,
  MapPin,
  Phone,
  Heart,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Globe
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className='
        mt-8
        w-screen
        relative
        left-1/2
        -translate-x-1/2
        bg-[#1c1c1c]
        border-t border-gray-800
      '
    >
      {/* ================= FEATURES ================= */}

      <div className='border-b border-gray-800'>
        <div
          className='
            max-w-7xl mx-auto
            px-3 sm:px-6 lg:px-8
            py-2 sm:py-3

            grid
            grid-cols-4

            gap-1 sm:gap-3
          '
        >
          {/* DELIVERY */}
          <div className='flex flex-col sm:flex-row items-center gap-1 sm:gap-2'>
            <div
              className='
                w-6 h-6
                sm:w-8 sm:h-8

                rounded-md

                bg-blue-500/10

                flex items-center justify-center
              '
            >
              <Truck size={13} className='text-blue-400' />
            </div>

            <div className='text-center sm:text-left'>
              <p className='text-[8px] sm:text-xs font-medium text-white'>
                Delivery
              </p>

              <p className='hidden sm:block text-[9px] text-gray-500'>
                Fast & reliable
              </p>
            </div>
          </div>

          {/* PAYMENT */}
          <div className='flex flex-col sm:flex-row items-center gap-1 sm:gap-2'>
            <div
              className='
                w-6 h-6
                sm:w-8 sm:h-8

                rounded-md

                bg-green-500/10

                flex items-center justify-center
              '
            >
              <ShieldCheck size={13} className='text-green-400' />
            </div>

            <div className='text-center sm:text-left'>
              <p className='text-[8px] sm:text-xs font-medium text-white'>
                Secure
              </p>

              <p className='hidden sm:block text-[9px] text-gray-500'>
                Safe payment
              </p>
            </div>
          </div>

          {/* RETURNS */}
          <div className='flex flex-col sm:flex-row items-center gap-1 sm:gap-2'>
            <div
              className='
                w-6 h-6
                sm:w-8 sm:h-8

                rounded-md

                bg-orange-500/10

                flex items-center justify-center
              '
            >
              <RotateCcw size={13} className='text-orange-400' />
            </div>

            <div className='text-center sm:text-left'>
              <p className='text-[8px] sm:text-xs font-medium text-white'>
                Returns
              </p>

              <p className='hidden sm:block text-[9px] text-gray-500'>
                Easy returns
              </p>
            </div>
          </div>

          {/* PAYMENT OPTIONS */}
          <div className='flex flex-col sm:flex-row items-center gap-1 sm:gap-2'>
            <div
              className='
                w-6 h-6
                sm:w-8 sm:h-8

                rounded-md

                bg-purple-500/10

                flex items-center justify-center
              '
            >
              <CreditCard size={13} className='text-purple-400' />
            </div>

            <div className='text-center sm:text-left'>
              <p className='text-[8px] sm:text-xs font-medium text-white'>
                Payment
              </p>

              <p className='hidden sm:block text-[9px] text-gray-500'>
                Multiple options
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}

      <div
        className='
          max-w-7xl mx-auto
          px-3 sm:px-6 lg:px-8
          py-4 sm:py-5
        '
      >
        <div
          className='
            grid
            grid-cols-2
            lg:grid-cols-4

            gap-x-4
            gap-y-4

            lg:gap-7
          '
        >
          {/* ================= BRAND ================= */}

          <div className='col-span-2 lg:col-span-1'>
            <div className='flex items-center justify-between'>
              <Link to='/' className='flex items-center gap-2'>
                <div
                  className='
                    w-7 h-7
                    sm:w-9 sm:h-9

                    rounded-lg

                    bg-blue-600

                    flex items-center justify-center
                  '
                >
                  <ShoppingBag size={15} className='text-white' />
                </div>

                <h2 className='text-base sm:text-xl font-bold text-white'>
                  Cartify
                </h2>
              </Link>

              {/* SOCIAL ICONS MOBILE SIDE */}
              <div className='flex items-center gap-1.5'>
                <a
                  href='https://github.com/surajgupta9161'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='GitHub'
                  className='
                    w-7 h-7
                    rounded-md
                    bg-[#292929]
                    text-gray-400
                    flex items-center justify-center
                    hover:text-white
                  '
                >
                  <Code2 size={12} />
                </a>

                <a
                  href='https://www.linkedin.com/in/suraj-gupta9161'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='LinkedIn'
                  className='
                    w-7 h-7
                    rounded-md
                    bg-[#292929]
                    text-gray-400
                    flex items-center justify-center
                    hover:text-blue-400
                  '
                >
                  <BriefcaseBusiness size={12} />
                </a>
                <a
                  href='https://portfolio-o3by.onrender.com/'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='Portfolio'
                  title='Portfolio'
                  className='
                    w-7 h-7
                    rounded-md
                    bg-[#292929]
                    text-gray-400
                    flex items-center
                    justify-center
                    hover:bg-blue-500
                    hover:text-white
                    transition
                '
                >
                  <Globe size={12} />
                </a>

                <a
                  href='https://www.instagram.com/5urajgupta/'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='Instagram'
                  className='
                    w-7 h-7
                    rounded-md
                    bg-[#292929]
                    text-gray-400
                    flex items-center justify-center
                    hover:text-pink-400
                  '
                >
                  <Camera size={12} />
                </a>
              </div>
            </div>

            {/* DESCRIPTION - MOBILE HIDDEN */}
            <p
              className='
                hidden sm:block

                text-xs
                text-gray-400

                mt-2
                leading-5

                max-w-sm
              '
            >
              Shop smarter with Cartify. Discover quality products, exciting
              deals and enjoy a simple and secure shopping experience.
            </p>
          </div>

          {/* ================= QUICK LINKS ================= */}

          <div>
            <h3 className='text-xs sm:text-sm font-semibold text-white mb-2'>
              Quick Links
            </h3>

            <div className='flex flex-col gap-1.5'>
              <Link
                to='/'
                className='flex items-center gap-0.5 text-[10px] sm:text-xs text-gray-400 hover:text-blue-400'
              >
                <ChevronRight size={9} />
                Home
              </Link>

              <Link
                to='/cart'
                className='flex items-center gap-0.5 text-[10px] sm:text-xs text-gray-400 hover:text-blue-400'
              >
                <ChevronRight size={9} />
                My Cart
              </Link>

              <Link
                to='/profile'
                className='flex items-center gap-0.5 text-[10px] sm:text-xs text-gray-400 hover:text-blue-400'
              >
                <ChevronRight size={9} />
                Profile
              </Link>

              <Link
                to='/profile'
                className='flex items-center gap-0.5 text-[10px] sm:text-xs text-gray-400 hover:text-blue-400'
              >
                <ChevronRight size={9} />
                Orders
              </Link>
            </div>
          </div>

          {/* ================= CATEGORIES ================= */}

          <div>
            <h3 className='text-xs sm:text-sm font-semibold text-white mb-2'>
              Categories
            </h3>

            <div className='flex flex-col gap-1.5'>
              {['Electronics', 'Mobiles', 'Fashion', 'Grocery'].map(
                category => (
                  <Link
                    key={category}
                    to='/'
                    className='
                    flex
                    items-center
                    gap-0.5

                    text-[10px]
                    sm:text-xs

                    text-gray-400

                    hover:text-blue-400
                  '
                  >
                    <ChevronRight size={9} />

                    {category}
                  </Link>
                )
              )}

              {/* DESKTOP EXTRA */}
              <Link
                to='/'
                className='
                  hidden sm:flex
                  items-center gap-0.5
                  text-xs text-gray-400
                  hover:text-blue-400
                '
              >
                <ChevronRight size={9} />
                Beauty
              </Link>

              <Link
                to='/'
                className='
                  hidden sm:flex
                  items-center gap-0.5
                  text-xs text-gray-400
                  hover:text-blue-400
                '
              >
                <ChevronRight size={9} />
                Toys
              </Link>
            </div>
          </div>

          {/* ================= CONTACT ================= */}

          <div className='col-span-2 lg:col-span-1'>
            <h3 className='text-xs sm:text-sm font-semibold text-white mb-2'>
              Contact
            </h3>

            <div
              className='
                grid
                grid-cols-3
                lg:grid-cols-1

                gap-2
              '
            >
              {/* EMAIL */}
              <div className='flex items-center gap-1.5 min-w-0'>
                <Mail size={11} className='text-blue-400 shrink-0' />

                <span className='text-[9px] sm:text-[10px] text-gray-400 truncate'>
                  support@cartify.com
                </span>
              </div>

              {/* PHONE */}
              <div className='flex items-center gap-1.5 min-w-0'>
                <Phone size={11} className='text-green-400 shrink-0' />

                <span className='text-[9px] sm:text-[10px] text-gray-400 truncate'>
                  +91 98765 43210
                </span>
              </div>

              {/* LOCATION */}
              <div className='flex items-center gap-1.5'>
                <MapPin size={11} className='text-red-400 shrink-0' />

                <span className='text-[9px] sm:text-[10px] text-gray-400'>
                  India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}

        <div
          className='
            border-t border-gray-800

            mt-3
            pt-2.5

            flex
            items-center
            justify-between

            gap-2
          '
        >
          <p className='text-[8px] sm:text-[10px] text-gray-500'>
            © {currentYear} Cartify. All rights reserved.
          </p>

          <p
            className='
              text-[8px]
              sm:text-[10px]

              text-gray-500

              flex
              items-center
              gap-1
            '
          >
            Made with
            <Heart size={9} className='text-red-500' fill='currentColor' />
            for shopping
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
