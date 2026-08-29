import { useEffect, useState } from 'react'
import {
  Search,
  Shirt,
  Smartphone,
  Apple,
  Sparkles,
  Laptop,
  Gamepad2
} from 'lucide-react'

const SearchLoader = () => {
  const icons = [
    <Shirt size={22} />,
    <Smartphone size={22} />,
    <Apple size={22} />,
    <Sparkles size={22} />,
    <Laptop size={22} />,
    <Gamepad2 size={22} />
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % icons.length)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <div className='relative w-24 h-24'>
        {/* Main Search Icon */}
        <Search
          size={70}
          strokeWidth={1.5}
          className='absolute top-2 left-2 text-gray-400'
        />

        {/* Changing Icon */}
        <div
          key={index}
          className='absolute top-7 left-7 text-white animate-pulse'
        >
          {icons[index]}
        </div>
      </div>

      <p className='text-sm text-gray-400'>Searching products...</p>
    </div>
  )
}

export default SearchLoader
