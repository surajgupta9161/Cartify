import { Settings2 } from 'lucide-react'
import React from 'react'

const Settings = () => {
  return (
    <button className='w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#3a3939] transition text-left'>
      <Settings2 size={19} />
      Settings
    </button>
  )
}

export default Settings
