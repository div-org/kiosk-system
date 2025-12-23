import React, { useState } from 'react'
import Button from '../custom/Button';
import { api } from '../../api/api';
import { useDomain } from '../../redux/features/domain/domainSlice';
import { useDispatch } from 'react-redux';
import handleApiRequest from '../../api/handleApiRequest';
import { setLoginData } from '../../redux/features/login/loginSlice';
import { alertType, showGlobalAlertModal } from '../../redux/features/global-alert/globalAlertSlice';
import Checkbox from '../custom/Checkbox';
import { Link } from 'react-router-dom';
import { formatLoginData } from '../../redux/features/login/loginUtils';
import { validMail } from '../../utils/helper';
import InputGroup from '../custom/input/InputGroup';
import Loader from '../loader/Loader';
import ContainerLoader from '../loader/ContainerLoader';
import { FcGoogle } from 'react-icons/fc';
import Linear from '../common/Linear';

const initialState = {
  email: '',
  password: '',
}

const LoginForm = () => {

  const dispatch = useDispatch();
  const domain = useDomain()

  const [values, setValues] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = values;

  const checkValidation = () => {
    let errors = {}

    if (!validMail(email)) {
      errors.email = 'Please input valid email'
    }

    if (!email.trim()) {
      errors.email = 'Cannot be empty'
    }

    if (!password) {
      errors.password = 'Cannot be empty'
    }

    return errors
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = checkValidation()

    if (Object.values(newErrors).length > 0) {
      return
    }

    setIsLoading(true)

    try {
      setIsLoading(true)

      const url = `${domain}/${api.login}`;

      const payload = {
        email,
        password
      }

      const res = await handleApiRequest({ method: 'POST', url, payload });

      const { error, message, data } = res
      
      if (error === 0) {
        const { token } = data
        localStorage.setItem('authToken', token)
        
        const obj = formatLoginData(data)
        dispatch(setLoginData(obj))
      } else {
        dispatch(showGlobalAlertModal({ message, type: alertType.error}))
      }
      
    } catch (error) {
      console.log(error)
      dispatch(showGlobalAlertModal({ message: error.message, type: alertType.error}))
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
    <div className='login-container'>

      <div className="login-form-wrapper">

        <form className='login-form' onSubmit={handleSubmit}>

          <ContainerLoader
            isLoading={isLoading}
          />

          <div className="login-message">
            <h1>Welcome Back!</h1>
            <p>Please enter your details.</p>
          </div>

          <InputGroup
            label='Email'
            type='email'
            value={email}
            onChange={e => changeValue(e, 'email')}
            disabled={isLoading}
            placeholder='Enter your Email'
          />

          <InputGroup
            label='Password'
            type='password'
            value={password}
            onChange={e => changeValue(e, 'password')}
            disabled={isLoading}
            placeholder='Enter Password'
          />


          <div className="action-container">
            <Checkbox 
              label='Remember me'
              id='remember-me'
              name='remember-me'
            />

            <Link to="/forgot-password">Forgot Password?</Link>
          </div>


          <div className="btn-container">
            <Button 
              type="submit"
              disabled={isLoading}
            >
              Sign In
            </Button>

            <Linear text='or' />

            <Button
              variant='white'
              className='btn-google'
            >
              <FcGoogle />
              Sign In with Google
            </Button>
          </div>


          <div className="to-sign-up">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>

        </form>
        
      </div>
      

      <div className="right-content">

      </div>
      
    </div>
  )
}

export default LoginForm