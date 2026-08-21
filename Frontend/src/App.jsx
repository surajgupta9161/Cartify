import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import UserRegister from './components/UserCredentials/UserRegister'
import UserLogin from './components/UserCredentials/UserLogin'
import UserProfile from './components/UserCredentials/UserProfile'
import { useUser } from './context/UserContext'

const App = () => {
  const { user } = useUser()
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<UserRegister />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/profile' element={user ? <UserProfile /> : <UserLogin />} />
    </Routes>
  )
}

export default App
