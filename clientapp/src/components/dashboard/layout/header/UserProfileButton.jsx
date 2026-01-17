import React from 'react'
import { useLoginData } from '../../../../redux/features/login/loginSlice'

const UserProfileButton = () => {

  const { firstname } = useLoginData();
    
  
  return (
    <div className='user-profile-container'>

      <div className="user-profile-btn">

        {firstname.charAt(0).toUpperCase()}
        
      </div>


      <div className="user-profile-options">



      </div>
      
      
    </div>
  )
}

export default UserProfileButton