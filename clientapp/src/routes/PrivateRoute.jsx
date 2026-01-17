import { Navigate } from 'react-router-dom'
import { useLoginData } from '../redux/features/login/loginSlice'





const PrivateRoute = ({
  children
}) => {


  const { loginStatus } = useLoginData()



  


  return loginStatus ? children : <Navigate to='/login' />



}

export default PrivateRoute