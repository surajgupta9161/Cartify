// import React from 'react'
import ProtectedRoute from '../components/Common/ProtectedRoute'
import UserProfile from '../components/UserCredentials/UserProfileCredentials/UserProfile'

const ProfilePage = () => {
  return (
    <div>
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    </div>
  )
}

export default ProfilePage
