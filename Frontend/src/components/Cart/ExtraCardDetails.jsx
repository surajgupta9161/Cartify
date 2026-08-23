import DeliveryAddressCard from './DeliveryAddressCard'
import DeliveryPartnerCard from './DeliveryPartnerCard'
import OffersCard from './OfferCard'
import OrderSummary from './OrderSummary'
import SavingsCard from './SavingCard'

const ExtraCartDetails = ({ deliveryPartner, cartProducts, totalPrice }) => {
  return (
    <div className='space-y-4'>
      <OffersCard />

      <SavingsCard />

      <OrderSummary cartProducts={cartProducts} totalPrice={totalPrice} />

      <DeliveryPartnerCard deliveryPartner={deliveryPartner} />

      <DeliveryAddressCard />
    </div>
  )
}

export default ExtraCartDetails
