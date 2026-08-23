import { useNavigate } from 'react-router-dom'
import { useUser } from '../../../context/UserContext'
import { useState } from 'react'
import { LogOut } from 'lucide-react'
import axios from 'axios'

const UserLogout = () => {
  const [showLogoutWarning, setShowLogoutWarning] = useState(false)
  const { setLoading, setOrders, setUser } = useUser()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      setLoading(true)
      const res = await axios.post(
        'http://localhost:3000/api/auth/logout',
        {},
        { withCredentials: true }
      )
      setLoading(false)
      if (res.status === 200) {
        setUser(null)
        setOrders([])
        navigate('/')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <div>
      <button
        onClick={() => setShowLogoutWarning(true)}
        className='w-full flex items-center cursor-pointer justify-center gap-2 mt-5 px-4 py-3 rounded-xl bg-red-200/10 text-red-400 hover:bg-red-500/20 transition'
      >
        <LogOut size={19} />
        Logout
      </button>
      {showLogoutWarning && (
        <div className='fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
          <div className='w-[90%] max-w-sm rounded-2xl border border-gray-700 bg-[#10233f] p-6 shadow-2xl'>
            <h2 className='text-xl font-semibold text-white'>Confirm Logout</h2>

            <p className='mt-2 text-sm text-gray-400'>
              Are you sure you want to logout?
            </p>

            <div className='mt-6 flex justify-end gap-3'>
              <button
                onClick={() => setShowLogoutWarning(false)}
                className='cursor-pointer rounded-lg bg-gray-700 px-5 py-2 text-gray-200 transition hover:bg-gray-600'
              >
                No
              </button>

              <button
                onClick={handleLogout}
                className='cursor-pointer rounded-lg bg-red-500 px-5 py-2 text-white transition hover:bg-red-600'
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserLogout
