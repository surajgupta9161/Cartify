import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ShieldCheck, ArrowLeft } from 'lucide-react'
import { useUser } from '../../context/UserContext'
import { useCart } from '../../context/CartContext'

const VerifyOtp = () => {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [timer, setTimer] = useState(60)

  const { fetchUser, fetchOrders } = useUser()
  const { fetchCart } = useCart()

  const navigate = useNavigate()
  const location = useLocation()

  const email = location.state?.email

  if (!email) {
    return <Navigate to='/register' replace />
  }

  useEffect(() => {
    if (timer <= 0) return

    const interval = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  const handleChange = e => {
    const value = e.target.value.replace(/\D/g, '')

    if (value.length <= 6) {
      setOtp(value)
    }

    setMessage('')
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!otp) {
      setMessage('OTP is required')
      return
    }

    if (otp.length !== 6) {
      setMessage('Enter a valid 6 digit OTP')
      return
    }

    try {
      setLoading(true)
      setMessage('')

      await axios.post(
        'http://localhost:3000/api/auth/verifyotp',
        {
          email,
          otp
        },
        {
          withCredentials: true
        }
      )

      const userData = await fetchUser()

      if (userData) {
        await Promise.all([fetchCart(), fetchOrders()])
      }

      navigate('/')
    } catch (error) {
      console.log(error)

      setMessage(error.response?.data?.message || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (timer > 0 || resendLoading) return

    try {
      setResendLoading(true)
      setMessage('')

      const response = await axios.post(
        'http://localhost:3000/api/auth/resendotp',
        {
          email
        },
        {
          withCredentials: true
        }
      )

      setMessage(response.data.message || 'OTP resent successfully')

      // timer dobara 1 minute se start
      setTimer(60)

      // old entered OTP clear
      setOtp('')
    } catch (error) {
      console.log(error)

      setMessage(error.response?.data?.message || 'Failed to resend OTP')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className='min-h-[80vh] flex items-center justify-center'>
      <div className='w-full max-w-md bg-[#2d2c2c] p-8 rounded-2xl shadow-xl border border-gray-700 relative'>
        <button
          type='button'
          onClick={() => navigate(-1)}
          className='absolute top-5 left-5 text-gray-400 hover:text-white cursor-pointer'
        >
          <ArrowLeft size={22} />
        </button>

        <div className='flex justify-center mb-4'>
          <div className='bg-blue-500/10 p-4 rounded-full'>
            <ShieldCheck size={38} className='text-blue-500' />
          </div>
        </div>

        <h1 className='text-3xl font-bold text-center mb-2'>Verify OTP</h1>

        <p className='text-gray-400 text-center mb-7'>
          Enter the OTP sent to
          <span className='text-white block mt-1'>{email || 'your email'}</span>
        </p>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <input
            type='text'
            inputMode='numeric'
            value={otp}
            onChange={handleChange}
            placeholder='Enter 6 digit OTP'
            maxLength={6}
            className='w-full bg-[#242323] border border-gray-600 rounded-xl py-3 px-4 outline-none focus:border-blue-500 text-center text-xl tracking-[8px]'
          />

          {message && (
            <p className='text-center text-sm text-red-400'>{message}</p>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <div className='text-center'>
            {timer > 0 ? (
              <p className='text-sm text-gray-400'>
                Resend OTP in{' '}
                <span className='text-white font-semibold'>{timer}s</span>
              </p>
            ) : (
              <button
                type='button'
                onClick={handleResendOtp}
                disabled={resendLoading}
                className='text-sm text-blue-400 hover:text-blue-300 hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {resendLoading ? 'Sending OTP...' : 'Resend OTP'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerifyOtp
