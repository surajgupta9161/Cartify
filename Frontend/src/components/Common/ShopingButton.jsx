import React from 'react'
import { useNavigate } from 'react-router-dom'
const ShopingButton = () => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/')}
      className='mt-6 px-6 py-2.5 cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium'
    >
      Start Shopping
    </button>
  )
}

export default ShopingButton
