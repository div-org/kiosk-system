import React, { useState } from 'react'
import Button from '../custom/Button';
import handleApiRequest from '../../api/handleApiRequest';
import { useDomain } from '../../redux/features/domain/domainSlice';
import { api } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { alertType, showGlobalAlertModal } from '../../redux/features/global-alert/globalAlertSlice';
import InputGroup from '../custom/input/InputGroup';
import Loader from '../loader/Loader';
import ContainerLoader from '../loader/ContainerLoader';
import { FcGoogle } from 'react-icons/fc';
import Linear from '../common/Linear';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  password: ''
}

const SignupForm = ({
  storePage = false
}) => {

  const navigate = useNavigate()

  const dispatch = useDispatch()
  
  const domain = useDomain()

  const [values, setValues] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { firstname, lastname, email, password, password_confirmation } = values;
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    setIsLoading(true)

    try {
      const url = storePage ? `${domain}/${api.userStore}` : `${domain}/${api.users}`;

      let payload = {
        firstname,
        lastname,
        email,
        password,
        password_confirmation
      }

      if (storePage) {
        payload = { 
          ...payload,
          fromStore: true,
          password: 'defaultpassword',
          password_confirmation: 'defaultpassword'
        };
      }

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }

      const res = await handleApiRequest({ 
        method: 'POST',
        url,
        headers: storePage ? headers : {},
        payload
      });
      
      const { data, message, error } = res;

      if (error === 0) {
        if (storePage) {
          dispatch(showGlobalAlertModal({ message: JSON.stringify(data), type: alertType.success }))
          navigate('/dashboard')
        } else {
          dispatch(showGlobalAlertModal({ message: 'Account Created Successfully', type: alertType.success }))
          navigate('/login')
        }
      } else {
        dispatch(showGlobalAlertModal({ message: JSON.stringify(message), type: alertType.error }))
      }
      console.log(res)
    } catch (error) {
      console.log(error)

      if (error.code) {
        dispatch(showGlobalAlertModal({ message: error.message, type: alertType.error }))
        return
      }
      
      dispatch(showGlobalAlertModal({ message: JSON.stringify(error.response.data.message), type: alertType.error }))
    } finally {
      setIsLoading(false)
    }
  }

  const changeValue = (e, key) => {
    const { value } = e.target;
    
    setValues(p => ({
      ...p,
      [key]: value
    }));
  }
  
  return (
    <div className='signup-container'>
      
      <form className='signup-form' onSubmit={handleSubmit}>

        <ContainerLoader
          isLoading={isLoading}
        />

        <div className="logo-container">
          <h1>
            {storePage ? 'Register From Store' : 'DIV KIOSK SIGNUP'}
          </h1>
        </div>

        <div className="row-w">

          <div className="col-h">
        
            <InputGroup
              label='First Name'
              type='firstname'
              value={firstname}
              onChange={e => changeValue(e, 'firstname')}
              placeholder='Enter your First Name'
            />

          </div>


          <div className="col-h">

            <InputGroup
              label="Last Name"
              type="lastname"
              value={lastname}
              onChange={e => changeValue(e, 'lastname')}
              placeholder='Enter your Last Name'
            />

          </div>

        </div>

        <InputGroup
          label="Email"
          type="email"
          value={email}
          onChange={e => changeValue(e, 'email')}
          placeholder='Enter Email'
        />

        {
          !storePage && 
          <div className="row-w">

            <div className='col-h'>

              <InputGroup
                label="Password"
                type="password"
                value={password}
                onChange={e => changeValue(e, 'password')}
                placeholder='Enter your Password'
              />

            </div>
            

            <div className="col-h">

              <InputGroup
                label="Password Confirmation"
                type="password"
                value={password_confirmation}
                onChange={e => changeValue(e, 'password_confirmation')}
                placeholder='Enter your Password'
              />

            </div>

          </div>
        }

        <div className="btn-container">

          <Button type="submit">Sign Up</Button>

          <Linear text='or' />

          <Button
            variant='white'
            className='btn-google'
          >
            <FcGoogle />
            Sign Up with Google
          </Button>

        </div>


        {
          !storePage &&
          <div className="to-login">
            <p>Already have an account? <Link to='/login'>Sign In</Link></p>
          </div>
        }

      </form>
      
    </div>
  )
}

export default SignupForm