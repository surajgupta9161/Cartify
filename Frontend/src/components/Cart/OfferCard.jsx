import { ChevronRight, Tag } from 'lucide-react'
const OffersCard = () => {
  return (
    <div className='p-5 rounded-2xl bg-white/5 border border-gray-700/50'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center'>
            <Tag size={20} className='text-orange-400' />
          </div>

          <div>
            <h3 className='font-semibold'>Offers & Coupons</h3>

            <p className='text-xs text-gray-400 mt-1'>
              Save more with available offers
            </p>
          </div>
        </div>

        <ChevronRight size={20} className='text-gray-500' />
      </div>
    </div>
  )
}

export default OffersCard
