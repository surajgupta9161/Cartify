import { useState } from 'react'
import axios from 'axios'
import { Mail, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!email.trim()) {
      setError('Email is required')
      return
    }

    try {
      setLoading(true)
      setError('')
      setMessage('')

      const response = await axios.post(
        'http://localhost:3000/api/auth/resetpasswordotp',
        {
          email: email.trim().toLowerCase()
        },
        {
          withCredentials: true
        }
      )

      setMessage(response.data.message)

      navigate('/forgot-password/verify-reset-otp', {
        state: {
          email: email.trim().toLowerCase()
        }
      })
    } catch (error) {
      //   console.log(error)
      setError(
        error.response?.data?.message || 'Failed to send OTP. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#242323] px-4'>
      <div className='w-full max-w-md bg-[#2f2f2f] border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-xl'>
        <button
          onClick={() => navigate('/login')}
          className='flex items-center gap-2 text-gray-400 hover:text-white mb-6 cursor-pointer'
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        <div className='flex justify-center mb-4'>
          <div className='w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center'>
            <Mail size={27} className='text-blue-400' />
          </div>
        </div>

        <h2 className='text-2xl font-semibold text-white text-center'>
          Forgot Password?
        </h2>

        <p className='text-gray-400 text-sm text-center mt-2 mb-6'>
          Enter your registered email and we'll send you an OTP.
        </p>

        {error && (
          <div className='mb-4 bg-red-500/10 text-red-400 px-4 py-3 rounded-lg text-sm'>
            {error}
          </div>
        )}

        {message && (
          <div className='mb-4 bg-green-500/10 text-green-400 px-4 py-3 rounded-lg text-sm'>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className='text-sm text-gray-300'>Email Address</label>

          <div className='relative mt-1'>
            <Mail
              size={19}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />

            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-full bg-[#242424] border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-blue-500'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full mt-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 py-3 rounded-lg text-white transition cursor-pointer'
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
