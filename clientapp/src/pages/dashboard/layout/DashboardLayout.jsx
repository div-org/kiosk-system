import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../../components/dashboard/layout/Header'
import SideBar from '../../../components/dashboard/layout/SideBar'

const DashboardLayout = () => {
  return (
    <div className='dashboard-layout'>

      <Header />

      <div className="dashboard-layout-wrapper">

        <SideBar />

        <div className="dashboard-content">
          <Outlet />
        </div>
        
      </div>
      
    </div>
  )
}

export default DashboardLayout