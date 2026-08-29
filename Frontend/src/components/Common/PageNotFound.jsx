import { ArrowLeft, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='text-center'>
        <h1 className='text-8xl font-bold text-blue-500'>404</h1>

        <h2 className='text-2xl font-semibold mt-4'>Page Not Found</h2>

        <p className='text-gray-400 mt-2'>
          The page you're looking for doesn't exist.
        </p>

        <div className='flex items-center justify-center gap-3 mt-6'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 px-5 py-2.5 rounded-lg
            bg-gray-700 hover:bg-gray-600 transition cursor-pointer'
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={() => navigate('/')}
            className='flex items-center gap-2 px-5 py-2.5 rounded-lg
            bg-blue-600 hover:bg-blue-700 transition cursor-pointer'
          >
            <Home size={18} />
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
