import { MapPin } from 'lucide-react'
import React from 'react'

const Address = ({ user }) => {
  return (
    <div>
      <button className='w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#3a3939] transition text-left'>
        <MapPin size={19} />
        Address
      </button>
      {/* ADDRESS CARD */}
      <div className='bg-[#242323] rounded-xl p-4 mt-4'>
        <p className='text-sm text-gray-400 mb-2'>Default Address</p>

        <div className='flex items-start gap-2'>
          <MapPin size={18} className='mt-1 text-blue-400 shrink-0' />

          <p className='text-sm leading-6'>{user?.address}</p>
        </div>
      </div>
    </div>
  )
}

export default Address
