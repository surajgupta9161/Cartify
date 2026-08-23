import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { UserRound } from 'lucide-react'
import { ShoppingCart } from 'lucide-react'
import { Sun, Moon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const Navbar = () => {
  const [placeholder, setPlaceholder] = useState('')
  const navigate = useNavigate()
  const { user } = useUser()

  useEffect(() => {
    const texts = [
      'Search food...',
      'Search clothes...',
      'Search electronics...',
      'Search beauty products...',
      'Search groceries...'
    ]

    let textIndex = 0
    let charIndex = 0
    let timeoutId

    const typeText = () => {
      const currentText = texts[textIndex]
      if (charIndex < currentText.length) {
        setPlaceholder(currentText.slice(0, charIndex + 1))
        charIndex++

        timeoutId = setTimeout(typeText, 100)
      }
      // Text complete hone ke baad wait
      else {
        timeoutId = setTimeout(() => {
          // Next text par jao
          textIndex = (textIndex + 1) % texts.length

          // Character count reset
          charIndex = 0

          // Dobara typing start
          typeText()
        }, 1500)
      }
    }

    // Pehli baar start
    typeText()

    // Component unmount hone par timer clean
    return () => clearTimeout(timeoutId)
  }, [])

  const [darkMode, setDarkMode] = useState(true)

  const changeTheme = () => {
    setDarkMode(!darkMode)

    document.body.classList.toggle('light')
  }

  return (
    <div className='flex items-center justify-around  pb-2 gap-3 sm:gap-5 w-full border-b border-gray-600'>
      {/* Logo */}
      <div className='shrink-0'>
        <img
          src='/cartifyLogo.png'
          alt='Cartify Logo'
          className='w-10 h-10 sm:w-14 sm:h-14 object-contain'
        />
      </div>

      {/* Search */}
      <div className='flex-1 ml-1 sm:ml-5 max-w-80 sm:max-w-150 relative'>
        <Search
          size={20}
          className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
        />

        <input
          type='text'
          placeholder={placeholder}
          className='w-full pl-12 pr-5 sm:py-3 py-2 rounded-full
          bg-[#333333]
          text-white
          placeholder-gray-400
          border border-gray-600
          outline-none
          focus:border-gray-400
          focus:ring-2 focus:ring-gray-500/30
          transition'
        />
      </div>
      {/*Profile */}
      <div
        onClick={() => navigate('/profile')}
        className='flex flex-col items-center cursor-pointer'
      >
        {/* Profile Icon */}
        <div className='flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#333333] border border-gray-600 hover:bg-[#444444] transition active:scale-95 '>
          <UserRound size={21} className='text-gray-300' />
        </div>

        {/* Profile Text */}
        <span className='text-sm text-gray-300 mt-1'>Profile</span>
      </div>

      {/** Cart */}
      <div
        onClick={() => navigate('/cart')}
        className='flex flex-col items-center cursor-pointer '
      >
        {/* Cart Icon */}

        <div className='relative active:scale-95'>
          <div className='flex items-center justify-center w-7 h-7 sm:w-7 sm:h-7 rounded-full bg-[#333333] border border-gray-600 hover:bg-[#444444] transition'>
            <ShoppingCart size={21} className='text-gray-300' />
          </div>

          {/* Cart Item Count */}
          {user?.cart?.length > 0 && (
            <span
              className='absolute -top-1 -right-1 flex items-center justify-center
            w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-600 text-white text-xs font-bold'
            >
              {user?.cart?.length}
            </span>
          )}
        </div>

        {/* Cart Text */}
        <span className='text-sm text-gray-300 mt-1'>Cart</span>
      </div>

      {/**Theme Change */}

      {/* <div className='flex items-center'>
        <button
          onClick={changeTheme}
          className='flex items-center justify-center w-10 h-10 rounded-full bg-[#333333] border border-gray-600 hover:bg-[#444444] transition'
        >
          {darkMode ? (
            <Sun size={20} className='text-yellow-400' />
          ) : (
            <Moon size={20} className='text-gray-700' />
          )}
        </button>
      </div> */}
    </div>
  )
}

export default Navbar
