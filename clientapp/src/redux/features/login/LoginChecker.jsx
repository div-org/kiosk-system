import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadingStatus } from '../../../utils/helper'
import { getLogin } from './loginSlice'




const LoginChecker = ({
  children
}) => {
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.login)



  useEffect(() => {
    if (status === loadingStatus.idle) {
      dispatch(getLogin())
    }
  }, [status])




  if (status !== loadingStatus.done) {
    return
  }


  return (
    <>
      {
        children
      }
    </>
  )
}

export default LoginChecker