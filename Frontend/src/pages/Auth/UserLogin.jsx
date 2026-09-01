import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { useCart } from '../../context/CartContext'
import api from '../../api/axios'

const UserLogin = () => {
  const navigate = useNavigate()

  const { fetchUser, fetchOrders } = useUser()
  const { fetchCart } = useCart()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))

    setMessage('')
  }

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: ''
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)

    return !newErrors.email && !newErrors.password
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setLoading(true)
      setMessage('')

      const response = await api.post('/api/auth/login', {
        email: formData.email.trim(),
        password: formData.password
      })

      await fetchUser()
      await fetchOrders()
      await fetchCart()

      console.log(response.data)

      setMessage(response.data.message)

      navigate('/')
    } catch (error) {
      console.log(error)

      setMessage(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-[80vh] flex items-center justify-center'>
      <div className='w-full max-w-md bg-[#2d2c2c] p-8 rounded-2xl shadow-xl border border-gray-700 relative'>
        <button type='button' onClick={() => navigate('/')}>
          <X
            size={24}
            className='cursor-pointer absolute top-5 right-5 hover:text-red-500 transition'
          />
        </button>

        <h1 className='text-3xl font-bold text-center mb-2'>Welcome Back</h1>

        <p className='text-gray-400 text-center mb-7'>
          Login to your Cartify account
        </p>

        <form onSubmit={handleSubmit} noValidate className='space-y-5'>
          {/* EMAIL */}
          <div>
            <div className='relative'>
              <Mail
                size={19}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
              />

              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                className={`w-full bg-[#242323] border rounded-xl py-3 pl-11 pr-4 outline-none transition ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-gray-600 focus:border-blue-500'
                }`}
              />
            </div>

            {errors.email && (
              <p className='text-red-400 text-sm mt-1 ml-1'>{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <div className='relative'>
              <Lock
                size={19}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
              />

              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className={`w-full bg-[#242323] border rounded-xl py-3 pl-11 pr-12 outline-none transition ${
                  errors.password
                    ? 'border-red-500'
                    : 'border-gray-600 focus:border-blue-500'
                }`}
              />

              <button
                type='button'
                onClick={() => setShowPassword(prev => !prev)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            {errors.password && (
              <p className='text-red-400 text-sm mt-1 ml-1'>
                {errors.password}
              </p>
            )}
          </div>

          {/* FORGOT PASSWORD */}
          <div className='text-right'>
            <span
              onClick={() => navigate('/forgot-password')}
              className='text-sm text-blue-400 cursor-pointer hover:underline'
            >
              Forgot Password?
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 cursor-pointer hover:bg-blue-700 transition py-3 rounded-xl font-semibold disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* BACKEND MESSAGE */}
          {message && (
            <p className='text-center text-sm text-yellow-400'>{message}</p>
          )}
        </form>

        <p className='text-center text-gray-400 mt-6 text-sm'>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className='text-blue-400 cursor-pointer hover:underline'
          >
            Register
          </span>
        </p>
      </div>
    </div>
  )
}

export default UserLogin
