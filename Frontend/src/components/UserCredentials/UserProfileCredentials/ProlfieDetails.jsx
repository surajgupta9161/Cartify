import { User } from 'lucide-react'
import React from 'react'

const ProlfieDetails = () => {
  return (
    <button className='w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#3a3939] transition text-left'>
      <User size={19} />
      Profile Details
    </button>
  )
}

export default ProlfieDetails
