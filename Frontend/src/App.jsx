import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import UserRegister from './pages/Auth/UserRegister'
import UserLogin from './pages/Auth/UserLogin'
import ProductDetails from './components/Products/ProductDetails'
import PageNotFound from './components/Common/PageNotFound'
import ProfilePage from './pages/ProfilePage'
import CartPage from './pages/CartPage'
import VerifyOtp from './pages/Auth/VerifyOtp'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/register'>
        <Route index element={<UserRegister />} />
        <Route path='verify-otp' element={<VerifyOtp />} />
      </Route>
      <Route path='/login' element={<UserLogin />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default App
