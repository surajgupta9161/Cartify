import { User, Mail, Package } from 'lucide-react'

import { useUser } from '../../../context/UserContext'
import UserLogout from '../UserAccessCredentials/UserLogout'
import ProfileDetails from './ProlfieDetails'
import Address from './Address'
import Settings from './Settings'
import BackButton from '../../Common/BackButton'
import Orders from './Orders'

const UserProfile = () => {
  const { user, orders } = useUser()

  return (
    <div className='min-h-screen py-8'>
      <div className='grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start '>
        {/* LEFT SIDE */}
        <div className='bg-[#2d2c2c] border border-gray-700 rounded-2xl p-6 h-fit lg:sticky lg:top-6  relative'>
          <BackButton className='absolute top-4 left-4' />
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
            <ProfileDetails />
            <Settings />
            <Address user={user} />
            <UserLogout />
          </div>
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
          <Orders orders={orders} />
        </div>
      </div>
    </div>
  )
}

export default UserProfile
