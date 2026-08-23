import { MapPin, Pencil } from 'lucide-react'
const DeliveryAddressCard = () => {
  return (
    <div className='p-5 rounded-2xl bg-white/5 border border-gray-700/50'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex items-start gap-3'>
          <div className='w-10 h-10 shrink-0 rounded-xl bg-purple-500/10 flex items-center justify-center'>
            <MapPin size={20} className='text-purple-400' />
          </div>

          <div>
            <h3 className='font-semibold'>Delivery Address</h3>

            <p className='text-sm text-gray-300 mt-2'>Suraj Gupta</p>

            <p className='text-sm text-gray-400 mt-1 leading-6'>
              123, Your Address, Your City, Uttar Pradesh - 000000
            </p>

            <p className='text-sm text-gray-400 mt-1'>
              Mobile: +91 XXXXX XXXXX
            </p>
          </div>
        </div>

        <button
          className='shrink-0 w-9 h-9 rounded-lg
          bg-white/10 hover:bg-white/20
          flex items-center justify-center
          text-gray-300 hover:text-white
          cursor-pointer transition'
        >
          <Pencil size={16} />
        </button>
      </div>
    </div>
  )
}

export default DeliveryAddressCard
