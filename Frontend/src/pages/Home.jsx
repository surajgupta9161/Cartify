import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import CategoryBar from '../components/Navbar/CategoryBar'
import ProductList from '../components/Products/ProductList'

const Home = () => {
  return (
    <div>
      {/* <h1>Home</h1> */}
      <div className='sticky top-0 z-50 pt-2 bg-[#242323] '>
        <Navbar />
        <CategoryBar />
      </div>
      <ProductList />
    </div>
  )
}

export default Home
