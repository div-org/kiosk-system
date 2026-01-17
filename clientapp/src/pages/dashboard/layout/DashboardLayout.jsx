import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../../components/dashboard/layout/header/Header'
import SideBar from '../../../components/dashboard/layout/sidebar/SideBar'

const DashboardLayout = () => {
  return (
    <div className='dashboard-layout'>

      <SideBar />

      <div className="dashboard-layout-wrapper">

        <Header />

        <div className="dashboard-content">
          <Outlet />
        </div>
        
      </div>
      
    </div>
  )
}

export default DashboardLayout