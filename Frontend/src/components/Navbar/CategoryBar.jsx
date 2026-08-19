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

import { useProduct } from '../../context/ProductContext'
import './CategoryBar.css'

const CategoryBar = () => {
  const { activeCategory, setActiveCategory } = useProduct()

  const categories = [
    { name: 'All', icon: Grid2X2 },
    { name: 'Home', icon: House },
    { name: 'Electronics', icon: Laptop },
    { name: 'Mobiles', icon: Smartphone },
    { name: 'Grocery', icon: Apple },
    { name: 'Beauty', icon: Sparkles },
    { name: 'Fashion', icon: Shirt },
    { name: 'Toys', icon: Gamepad2 }
  ]

  return (
    <div className='flex flex-row sm:gap-10 pb-1 overflow-x-auto whitespace-nowrap scrollbar-hide category-scroll border-b border-gray-600 '>
      {categories.map(({ name, icon: Icon }) => (
        <div
          key={name}
          className={`
            category-item
            flex items-center gap-1 cursor-pointer px-4 py-2 rounded-lg
            transition-all duration-300
            active:scale-95
            ${activeCategory === name ? 'active-category' : ''}
          `}
          onClick={() => setActiveCategory(name)}
        >
          <Icon size={18} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  )
}

export default CategoryBar
