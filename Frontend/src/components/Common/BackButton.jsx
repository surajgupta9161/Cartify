import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BackButton = ({ className = '' }) => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      aria-label='Go back'
      className={`
        flex items-center justify-center
        w-10 h-10
        rounded-lg
        text-gray-300
        border border-gray-700
        cursor-pointer
        transition-all duration-200
        hover:bg-gray-700
        hover:text-white
        active:scale-95
        ${className}
      `}
    >
      <ArrowLeft size={20} />
    </button>
  )
}

export default BackButton
