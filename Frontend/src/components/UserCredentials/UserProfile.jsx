import {
  User,
  Mail,
  MapPin,
  Settings,
  LogOut,
  Package,
  CalendarDays,
  CreditCard,
  PackageOpen,
  ArrowLeft
} from 'lucide-react'

import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const UserProfile = () => {
  const { user, orders, loading, setLoading, setOrders, setUser } = useUser()

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
    <div className='min-h-screen py-8 relative'>
      <div className='grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start '>
        {/* LEFT SIDE */}
        <div className='bg-[#2d2c2c] border border-gray-700 rounded-2xl p-6 h-fit lg:sticky lg:top-6'>
          {/* PROFILE */}
          <div className='flex flex-col items-center border-b border-gray-700 pb-6 '>
            <div className='w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-4'>
              <User size={38} />
            </div>

            <h2 className='text-xl font-semibold'>{user?.name}</h2>

            <div className='flex items-center gap-2 text-gray-400 mt-2'>
              <Mail size={16} />
              <span className='text-sm'>{user?.email}</span>
            </div>
          </div>

          {/* OPTIONS */}
          <div className='mt-6 space-y-3'>
            <button className='w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#3a3939] transition text-left'>
              <User size={19} />
              Profile Details
            </button>

            <button className='w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#3a3939] transition text-left'>
              <MapPin size={19} />
              Address
            </button>

            <button className='w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#3a3939] transition text-left'>
              <Settings size={19} />
              Settings
            </button>

            {/* ADDRESS CARD */}
            <div className='bg-[#242323] rounded-xl p-4 mt-4'>
              <p className='text-sm text-gray-400 mb-2'>Default Address</p>

              <div className='flex items-start gap-2'>
                <MapPin size={18} className='mt-1 text-blue-400 shrink-0' />

                <p className='text-sm leading-6'>{user?.address}</p>
              </div>
            </div>

            {/* LOGOUT */}
            <button
              onClick={() => handleLogout()}
              className='w-full flex items-center cursor-pointer justify-center gap-2 mt-5 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition'
            >
              <LogOut size={19} />
              Logout
            </button>
          </div>
          <button
            onClick={() => navigate('/')}
            className='flex absolute top-10 left-2 items-center gap-2 px-2 py-2 rounded-xl
             bg-[#333232] border border-gray-700 hover:bg-[#3a3939]
             transition cursor-pointer font-medium'
          >
            <ArrowLeft size={19} />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className='min-w-0'>
          {/* ORDER HEADER */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5'>
            <div>
              <h1 className='text-2xl font-bold'>My Orders</h1>

              <p className='text-gray-400 text-sm mt-1'>
                View and manage your orders
              </p>
            </div>

            <div className='flex items-center gap-2 text-gray-400'>
              <Package size={20} />
              <span>{orders?.length} Orders</span>
            </div>
          </div>

          {/* ORDER CARDS */}
          <div className='space-y-4'>
            {orders?.length === 0 && (
              <div className='w-full flex flex-col items-center justify-center py-16 px-5 bg-[#2d2c2c] border border-gray-700 rounded-2xl'>
                <div className='w-16 h-16 flex items-center justify-center rounded-full bg-blue-500/10 mb-4'>
                  <PackageOpen size={32} className='text-blue-400' />
                </div>

                <h2 className='text-xl font-semibold mb-2'>No Orders Yet</h2>

                <p className='text-gray-400 text-sm text-center max-w-sm'>
                  You haven't placed any orders yet. Start shopping and your
                  orders will appear here.
                </p>

                <button
                  onClick={() => navigate('/')}
                  className='mt-6 px-6 py-2.5 cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium'
                >
                  Start Shopping
                </button>
              </div>
            )}
            {orders.map(order => (
              <div
                key={order._id}
                className='bg-[#2d2c2c] border border-gray-700 rounded-2xl p-5 hover:border-gray-500 transition'
              >
                {/* CARD HEADER */}
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-700 pb-4'>
                  <div>
                    <p className='text-gray-400 text-sm'>Order ID</p>

                    <h3 className='font-semibold mt-1'>#{order?._id}</h3>
                  </div>

                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm w-fit
                      ${
                        order.orderStatus === 'Delivered'
                          ? 'bg-green-500/10 text-green-400'
                          : order.orderStatus === 'Shipped'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }
                    `}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                {/* ORDER DETAILS */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-5'>
                  {/* DATE */}
                  <div>
                    <p className='text-gray-400 text-sm'>Date</p>

                    <div className='flex items-center gap-2 mt-1'>
                      <CalendarDays size={16} />
                      <span className='text-sm sm:text-base'>
                        {new Date(order.createdAt).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div>
                    <p className='text-gray-400 text-sm'>Items</p>

                    <div className='flex items-center gap-2 mt-1'>
                      <Package size={16} />
                      <span>{order.orderItems?.length}</span>
                    </div>
                  </div>

                  {/* PAYMENT */}
                  <div>
                    <p className='text-gray-400 text-sm'>Payment</p>

                    <div className='flex items-center gap-2 mt-1'>
                      <CreditCard size={16} />
                      <span>{order.paymentInfo}</span>
                    </div>
                  </div>

                  {/* TOTAL */}
                  <div>
                    <p className='text-gray-400 text-sm'>Total</p>

                    <p className='font-semibold text-lg mt-1'>
                      ₹{order.totalPrice}
                    </p>
                  </div>
                </div>

                {/* FOOTER */}
                <div className='flex justify-end mt-5'>
                  <button className='px-4 py-2 rounded-lg border border-gray-600 hover:bg-[#3a3939] transition'>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
