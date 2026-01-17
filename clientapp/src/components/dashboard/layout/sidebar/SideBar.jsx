import React from 'react'
import { getMenuList } from './sidebarUtils'
import Image from '../../../custom/Image'
import { Link, NavLink, useLocation } from 'react-router-dom'

const SideBar = () => {

  const { pathname } = useLocation();

  
  return (
    <div className="dashboard-sidebar-layout">

      <div className="dashboard-sidebar-layout-wrapper">

        <div className="sidebar-top"></div>

        <div className="menu-list-wrapper">
          
          {
            getMenuList().slice(0, 1).map(item => {

              const { id, name, icon, route } = item

              return (
                <Link
                  key={id}
                  to={route}
                  className={`menu-item${pathname === route ? ' active' : ''}`}
                >
                  <Image src={`/images/icons/${icon}`} alt={name} />
                  <span>{name}</span>
                </Link>
              )
            })
          }
      
          {
            getMenuList().slice(1).map(item => {

              const { id, name, icon, route } = item

              return (
                <NavLink
                  key={id}
                  to={route}
                  className="menu-item"
                >
                  <Image src={`/images/icons/${icon}`} alt={name} />
                  <span>{name}</span>
                </NavLink>
              )
            })
          }

        </div>

      </div>

    </div>
  )
}

export default SideBar