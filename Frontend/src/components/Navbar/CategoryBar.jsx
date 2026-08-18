import { useState } from 'react'
import {
  Grid2X2,
  House,
  Laptop,
  Smartphone,
  Apple,
  Sparkles,
  Shirt,
  Gamepad2
} from 'lucide-react'
import './CategoryBar.css'

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const categoryStyle = `
    category-item
    flex items-center gap-1 cursor-pointer px-4 py-2 rounded-lg
    transition-all duration-300
    active:scale-95
  `

  return (
    <div className='flex flex-row sm:gap-10 mt-4 pb-1 overflow-x-auto whitespace-nowrap scrollbar-hide category-scroll border-b border-gray-600'>
      <div
        className={`${categoryStyle} ${
          activeCategory === 'All' ? 'active-category' : ''
        }`}
        onClick={() => setActiveCategory('All')}
      >
        <Grid2X2 size={18} />
        <span>All</span>
      </div>

      <div
        className={`${categoryStyle} ${
          activeCategory === 'Home' ? 'active-category' : ''
        }`}
        onClick={() => setActiveCategory('Home')}
      >
        <House size={18} />
        <span>Home</span>
      </div>

      <div
        className={`${categoryStyle} ${
          activeCategory === 'Electronics' ? 'active-category' : ''
        }`}
        onClick={() => setActiveCategory('Electronics')}
      >
        <Laptop size={18} />
        <span>Electronics</span>
      </div>

      <div
        className={`${categoryStyle} ${
          activeCategory === 'Mobiles' ? 'active-category' : ''
        }`}
        onClick={() => setActiveCategory('Mobiles')}
      >
        <Smartphone size={18} />
        <span>Mobiles</span>
      </div>

      <div
        className={`${categoryStyle} ${
          activeCategory === 'Fresh' ? 'active-category' : ''
        }`}
        onClick={() => setActiveCategory('Fresh')}
      >
        <Apple size={18} />
        <span>Fresh</span>
      </div>

      <div
        className={`${categoryStyle} ${
          activeCategory === 'Beauty' ? 'active-category' : ''
        }`}
        onClick={() => setActiveCategory('Beauty')}
      >
        <Sparkles size={18} />
        <span>Beauty</span>
      </div>

      <div
        className={`${categoryStyle} ${
          activeCategory === 'Fashion' ? 'active-category' : ''
        }`}
        onClick={() => setActiveCategory('Fashion')}
      >
        <Shirt size={18} />
        <span>Fashion</span>
      </div>

      <div
        className={`${categoryStyle} ${
          activeCategory === 'Toys' ? 'active-category' : ''
        }`}
        onClick={() => setActiveCategory('Toys')}
      >
        <Gamepad2 size={18} />
        <span>Toys</span>
      </div>
    </div>
  )
}

export default CategoryBar
