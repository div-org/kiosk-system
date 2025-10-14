import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from '../pages/layout/RootLayout'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/login/LoginPage'
import SignupPage from '../pages/signup/SignupPage'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../pages/dashboard/layout/DashboardLayout'
import DashboardPage from '../pages/dashboard/home/DashboardPage'
import PublicRoute from './PublicRoute'
import RegisterFromStorePage from '../pages/dashboard/register-from-store/RegisterFromStorePage'
import ManageStorePage from '../pages/dashboard/manage-store/ManageStorePage'
import CreateStorePage from '../pages/dashboard/create-store/CreateStorePage'

const AppRouter = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      Component: RootLayout,
      children: [
        { 
          index: true,
          element: (
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          )
        },
        { 
          path: '/login',
          element: (
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          )
        },
        { 
          path: '/signup',
          element: (
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          )
        },
        {
          path: 'dashboard',
          element: (
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          ),
          children: [
            { 
              index: true, 
              element: (
                <DashboardPage /> 
              )
            },
            {
              path: 'register-from-store',
              element: <RegisterFromStorePage />
            },
            {
              path: 'manage-store',
              element: <ManageStorePage />
            },
            {
              path: 'create-store',
              element: <CreateStorePage />
            },
          ]
        }
      ]
    }
  ])
  
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter