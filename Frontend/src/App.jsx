import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import UserRegister from './pages/Auth/UserRegister'
import UserLogin from './pages/Auth/UserLogin'
import ProductDetails from './components/Products/ProductDetails'
import PageNotFound from './components/Common/PageNotFound'
import ProfilePage from './pages/ProfilePage'
import CartPage from './pages/CartPage'
import VerifyOtp from './pages/Auth/VerifyOtp'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import VerifyResetOtp from './pages/ForgotPassword/VerifyResetOtp'
import ResetPassword from './pages/ForgotPassword/ResetPassword'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/register'>
        <Route index element={<UserRegister />} />
        <Route path='verify-otp' element={<VerifyOtp />} />
      </Route>
      <Route path='/login' element={<UserLogin />} />
      <Route path='/forgot-password'>
        <Route index element={<ForgotPassword />} />
        <Route path='verify-reset-otp' element={<VerifyResetOtp />} />
        <Route path='reset-password' element={<ResetPassword />} />
      </Route>
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default App
