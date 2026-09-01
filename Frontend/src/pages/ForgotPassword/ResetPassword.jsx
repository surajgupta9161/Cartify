import { useState } from 'react'
import axios from 'axios'
import { Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../api/axios'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const email = location.state?.email

  const handleSubmit = async e => {
    e.preventDefault()

    setError('')

    if (!email) {
      setError('Reset session not found. Please start again.')
      return
    }

    if (!password || !confirmPassword) {
      setError('All fields are required')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)

      const response = await api.post('/api/auth/resetpassword', {
        email,
        newpassword: password,
        confirmpassword: confirmPassword
      })
      setMessage(response.data.message || 'Password reset successfully')
      setTimeout(() => {
        navigate('/login', {
          replace: true
        })
      }, 1000)
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Password reset failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#242323] px-4'>
      <div className='w-full max-w-md bg-[#2f2f2f] border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-xl'>
        <div className='flex justify-center mb-4'>
          <div className='w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center'>
            <LockKeyhole size={28} className='text-blue-400' />
          </div>
        </div>

        <h2 className='text-2xl font-semibold text-white text-center'>
          Reset Password
        </h2>

        <p className='text-gray-400 text-sm text-center mt-2 mb-6'>
          Create a new password for your account
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

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='text-sm text-gray-300'>New Password</label>

            <div className='relative mt-1'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Enter new password'
                className='w-full bg-[#242424] border border-gray-600 rounded-lg px-4 py-3 pr-11 text-white outline-none focus:border-blue-500'
              />

              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <div>
            <label className='text-sm text-gray-300'>Confirm Password</label>

            <div className='relative mt-1'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder='Confirm new password'
                className='w-full bg-[#242424] border border-gray-600 rounded-lg px-4 py-3 pr-11 text-white outline-none focus:border-blue-500'
              />

              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'
              >
                {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg transition cursor-pointer'
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
