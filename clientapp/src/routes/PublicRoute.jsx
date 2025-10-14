import { Navigate } from 'react-router-dom'
import { useLoginData } from '../redux/features/login/loginSlice'

const PublicRoute = ({
  children
}) => {

  const { loginStatus } = useLoginData()
  
  

  return loginStatus ? <Navigate to='/dashboard' /> : children

}

export default PublicRoute