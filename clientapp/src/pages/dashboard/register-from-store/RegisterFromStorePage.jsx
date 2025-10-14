import React from 'react'
import SignupForm from '../../../components/signup/SignupForm'

const RegisterFromStorePage = () => {
  return (
    <div className='register-from-store-page'>

      <div className="page-content">

        <SignupForm storePage={true} />
        
      </div>
      
    </div>
  )
}

export default RegisterFromStorePage