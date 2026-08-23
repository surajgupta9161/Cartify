import { Truck } from 'lucide-react'
const DeliveryPartnerCard = ({ deliveryPartner }) => {
  return (
    <div className='p-5 rounded-2xl bg-white/5 border border-gray-700/50'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center'>
          <Truck size={20} className='text-blue-400' />
        </div>

        <div>
          <h3 className='font-semibold'>Delivery Partner</h3>

          {deliveryPartner.assigned ? (
            <>
              <p className='text-sm text-gray-300 mt-1'>
                {deliveryPartner.name}
              </p>

              <p className='text-xs text-gray-400 mt-1'>
                {deliveryPartner.phone}
              </p>
            </>
          ) : (
            <p className='text-sm text-gray-400 mt-1'>
              Partner will be assigned after order confirmation
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DeliveryPartnerCard
