import { ShoppingCart, ArrowLeft } from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import axios from 'axios'
import ExtraCartDetails from './ExtraCardDetails'
import CartItems from './CartItems'
import OrderNow from './OrderNow'
import ShopingButton from '../Common/ShopingButton'

const Cart = () => {
  const navigate = useNavigate()

  const { cart, fetchCart } = useCart()

  const cartProducts = cart || []

  const totalPrice = cartProducts.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

  const deliveryPartner = {
    assigned: true,
    name: 'Rahul Sharma',
    phone: '+91 98765 43210'
  }

  const updateQuantity = async (productId, action) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/cart/updatecartquantity/${productId}`,
        {
          action
        },
        {
          withCredentials: true
        }
      )

      await fetchCart()
    } catch (error) {
      console.log('Update quantity error:', error)
    }
  }

  return (
    <div className='min-h-screen pt-4 pb-15 lg:pb-8'>
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className='mb-2 flex items-center gap-2 text-gray-400
        hover:text-white cursor-pointer transition'
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* TITLE */}
      <div className='flex items-center gap-3 mb-3'>
        <ShoppingCart size={25} />

        <h1 className='text-xl font-semibold'>My Cart</h1>

        <span className='bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm'>
          {cartProducts.length} Items
        </span>
      </div>

      {/* EMPTY CART */}
      {cartProducts.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-24'>
          <ShoppingCart size={70} className='text-gray-500 mb-5' />

          <h2 className='text-xl font-semibold'>Your cart is empty</h2>

          <p className='text-gray-400 mt-2'>Add some products to your cart.</p>

          <ShopingButton />
        </div>
      ) : (
        <>
          {/* MAIN */}
          <div className='grid lg:grid-cols-[1fr_360px] gap-8 pb-8'>
            {/* ================= CART PRODUCTS ================= */}
            <div
              className='   space-y-4
                lg:h-[75vh]
                lg:overflow-y-auto
                lg:overscroll-contain
                lg:pr-2
                [&::-webkit-scrollbar]:hidden
                scrollbar-none'
            >
              <CartItems
                cartProducts={cartProducts}
                updateQuantity={updateQuantity}
              />

              {/* MOBILE EXTRA CARDS */}
              <div className='lg:hidden space-y-4 pt-2'>
                <ExtraCartDetails
                  deliveryPartner={deliveryPartner}
                  cartProducts={cartProducts}
                  totalPrice={totalPrice}
                />
              </div>
            </div>

            {/* ================= DESKTOP RIGHT SIDE ================= */}
            <div className='hidden lg:block'>
              <div
                className='sticky top-24 space-y-4
                max-h-[75vh] overflow-y-auto
                [&::-webkit-scrollbar]:hidden
                scrollbar-none'
              >
                <ExtraCartDetails
                  deliveryPartner={deliveryPartner}
                  cartProducts={cartProducts}
                  totalPrice={totalPrice}
                />
              </div>
            </div>
          </div>
          <OrderNow totalPrice={totalPrice} />
        </>
      )}
    </div>
  )
}

export default Cart
