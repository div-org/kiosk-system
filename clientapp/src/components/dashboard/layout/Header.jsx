import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { setLoginData } from '../../../redux/features/login/loginSlice';
import Button from '../../custom/Button';

const Header = () => {

  const dispatch = useDispatch()



  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(setLoginData({}))
  }
  
  
  
  return (
    <div className='header-container'>

      <div className="header-wrapper">

        <div className="logo-container">
          <Link to='/dashboard'>
            <h1>KIOSK</h1>
          </Link>
        </div>

        <div className="header-navigation-wrapper">
          <NavLink to='/dashboard'>Home</NavLink>
          <NavLink to='/dashboard/manage-store'>Manage Store</NavLink>
          <NavLink to='/dashboard/booking'>Booking</NavLink>
          <NavLink to='/dashboard/tracker'>Tracker</NavLink>
        </div>

        <div className="btn-container">          
          <Button
            onClick={handleLogout}
          >Logout</Button>
        </div>

      </div>

    </div>
  )
}

export default Header