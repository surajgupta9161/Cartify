import { MapPin } from 'lucide-react'
import { useUser } from '../../../context/UserContext'

const Address = ({ user }) => {
  const { orders = [] } = useUser()

  const latestOrder = orders[orders.length - 1]

  const address = user?.address || latestOrder?.shippingAddress

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

          {address ? (
            <div className='text-sm leading-6'>
              {address.fullName && (
                <p className='font-medium text-white'>{address.fullName}</p>
              )}

              <p>
                {address.addressLine}
                {address.city && `, ${address.city}`}
                {address.state && `, ${address.state}`}
                {address.postalCode && ` - ${address.postalCode}`}
              </p>

              {address.phone && (
                <p className='text-gray-400'>Phone: {address.phone}</p>
              )}
            </div>
          ) : (
            <p className='text-sm text-gray-400'>No address available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Address
