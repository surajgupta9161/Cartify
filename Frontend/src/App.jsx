import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import UserRegister from './components/UserCredentials/UserAccessCredentials/UserRegister'
import UserLogin from './components/UserCredentials/UserAccessCredentials/UserLogin'
import UserProfile from './components/UserCredentials/UserProfileCredentials/UserProfile'
import { useUser } from './context/UserContext'
import Cart from './components/Cart/Cart'

const App = () => {
  const { user } = useUser()
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<UserRegister />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/profile' element={user ? <UserProfile /> : <UserLogin />} />
      <Route path='/cart' element={user ? <Cart /> : <UserLogin />} />
    </Routes>
  )
}

export default App
