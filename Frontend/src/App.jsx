import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import UserRegister from './components/UserCredentials/UserAccessCredentials/UserRegister'
import UserLogin from './components/UserCredentials/UserAccessCredentials/UserLogin'
import UserProfile from './components/UserCredentials/UserProfileCredentials/UserProfile'
import Cart from './components/Cart/Cart'
import ProductDetails from './components/Products/ProductDetails'
import ProtectedRoute from './components/Common/ProtectedRoute'
import PageNotFound from './components/Common/PageNotFound'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<UserRegister />} />
      <Route path='/login' element={<UserLogin />} />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/cart'
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default App
