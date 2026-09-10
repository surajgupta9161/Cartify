import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import CategoryBar from '../components/Navbar/CategoryBar'
import ProductList from '../components/Products/ProductList'
import UpdateBanner from './UpdatesBanner/UpdateBanner'

const HomePage = () => {
  return (
    <div>
      {/* <h1>Home</h1> */}
      <div className='sticky top-0 z-50 pt-2 bg-[#242323] '>
        <Navbar />
        <CategoryBar />
      </div>
      <UpdateBanner />
      <ProductList />
    </div>
  )
}

export default HomePage
