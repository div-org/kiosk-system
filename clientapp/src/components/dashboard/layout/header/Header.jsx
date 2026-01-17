import { useDispatch } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { setLoginData } from '../../../../redux/features/login/loginSlice';
import Button from '../../../custom/Button';
import { getHeaderPageName } from './headerPageName';
import UserProfileButton from './UserProfileButton';
import Image from '../../../custom/Image';

const Header = () => {
  
  const { pathname } = useLocation();


  const dispatch = useDispatch()



  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(setLoginData({}))
  }
  

  const pageInfo = getHeaderPageName(pathname);
  
  
  return (
    <div className='header-container'>

      <div className="header-wrapper">

        <div className="page-name-container">

          {pageInfo?.icon &&
            <Image 
              src={`/images/icons/${pageInfo?.icon}`}
              className="page-icon"
              alt='Kiosk System Logo'
            />
          }

          <h1>{pageInfo?.name}</h1>

        </div>


        {/* <div className="header-navigation-wrapper">
          <NavLink to='/dashboard'>Home</NavLink>
          <NavLink to='/dashboard/manage-store'>Manage Store</NavLink>
          <NavLink to='/dashboard/booking'>Booking</NavLink>
          <NavLink to='/dashboard/tracker'>Tracker</NavLink>
        </div> */}


        <UserProfileButton />

      </div>

    </div>
  )
}

export default Header