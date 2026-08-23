import { BadgeIndianRupee } from 'lucide-react'
const SavingsCard = () => {
  return (
    <div className='p-5 rounded-2xl bg-green-500/5 border border-green-500/20'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center'>
          <BadgeIndianRupee size={20} className='text-green-400' />
        </div>

        <div>
          <p className='text-sm text-gray-400'>Saving on this order</p>

          <p className='font-semibold text-green-400 mt-1'>
            Free delivery applied
          </p>
        </div>
      </div>
    </div>
  )
}

export default SavingsCard
