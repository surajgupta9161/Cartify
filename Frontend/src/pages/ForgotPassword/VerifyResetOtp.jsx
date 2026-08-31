import axios from 'axios'
import { ShieldCheck, ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const VerifyResetOtp = () => {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [timer, setTimer] = useState(60)
  const [resendLoading, setResendLoading] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const email = location.state?.email

  const handleChange = e => {
    const value = e.target.value.replace(/\D/g, '')

    if (value.length <= 6) {
      setOtp(value)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    setMessage('')
    setError('')

    if (!email) {
      setError('Email not found. Please request OTP again.')
      return
    }

    if (!otp) {
      setError('OTP is required')
      return
    }

    if (otp.length !== 6) {
      setError('Please enter a 6 digit OTP')
      return
    }

    try {
      setLoading(true)

      const response = await axios.post(
        'http://localhost:3000/api/auth/verifyresetpasswordotp',
        {
          email,
          otp
        },
        {
          withCredentials: true
        }
      )

      setMessage(response.data.message)

      setTimeout(() => {
        navigate('/forgot-password/reset-password', {
          state: { email },
          replace: true
        })
      }, 1000)
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'OTP verification failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (timer <= 0) return

    const interval = setInterval(() => {
      setTimer(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  const handleResendOtp = async () => {
    if (timer > 0 || resendLoading) return

    try {
      setResendLoading(true)
      setError('')
      setMessage('')

      const response = await axios.post(
        'http://localhost:3000/api/auth/resetpasswordotp',
        { email },
        {
          withCredentials: true
        }
      )

      setMessage(response.data.message)

      // OTP resend hone ke baad fir 60 sec wait
      setTimer(60)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to resend OTP')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#242323] px-4'>
      <div className='w-full max-w-md bg-[#2f2f2f] border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-xl'>
        <button
          onClick={() => navigate('/forgot-password')}
          className='flex items-center gap-2 text-gray-400 hover:text-white mb-6 cursor-pointer'
        >
          <ArrowLeft size={18} />
          Change Email
        </button>

        <div className='flex justify-center mb-4'>
          <div className='w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center'>
            <ShieldCheck size={28} className='text-blue-400' />
          </div>
        </div>

        <h2 className='text-2xl font-semibold text-white text-center'>
          Verify OTP
        </h2>

        <p className='text-sm text-gray-400 text-center mt-2'>
          Enter the 6 digit OTP sent to
        </p>

        <p className='text-sm text-blue-400 text-center mt-1 mb-6'>
          {email || 'your email'}
        </p>

        {error && (
          <div className='mb-4 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 text-sm'>
            {error}
          </div>
        )}

        {message && (
          <div className='mb-4 px-4 py-3 rounded-lg bg-green-500/10 text-green-400 text-sm'>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className='text-sm text-gray-300'>OTP</label>

          <input
            type='text'
            inputMode='numeric'
            value={otp}
            onChange={handleChange}
            maxLength={6}
            placeholder='Enter 6 digit OTP'
            className='w-full mt-1 bg-[#242424] border border-gray-600 rounded-lg px-4 py-3 text-white text-center text-xl tracking-[8px] outline-none focus:border-blue-500'
          />

          <button
            type='submit'
            disabled={loading}
            className='w-full mt-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg transition cursor-pointer'
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className='text-center mt-5'>
          <p className='text-gray-400 text-sm'>Didn't receive the OTP?</p>

          {timer > 0 ? (
            <p className='text-gray-500 text-sm mt-1'>
              Resend OTP in <span className='text-blue-400'>{timer}s</span>
            </p>
          ) : (
            <button
              type='button'
              onClick={handleResendOtp}
              disabled={resendLoading}
              className='text-blue-400 hover:text-blue-300 text-sm mt-1 cursor-pointer disabled:opacity-50'
            >
              {resendLoading ? 'Sending...' : 'Resend OTP'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyResetOtp
