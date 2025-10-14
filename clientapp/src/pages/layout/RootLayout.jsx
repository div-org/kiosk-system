import { Outlet } from 'react-router-dom'
import ModalsContainer from '../../components/common/modal/ModalsContainer'

const RootLayout = () => {
  return (
    <>
      
      <Outlet />
      
      <ModalsContainer />

    </>
  )
}

export default RootLayout