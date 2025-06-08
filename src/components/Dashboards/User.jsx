import React from 'react'
import DashboardHeader from '../DashboardHeader'
import Navbar from '../User Dashboard/Navbar'
import { Outlet, Route, Routes } from 'react-router-dom'
import Dining from '../User Dashboard/Dining/Dining'

function User() {
  return (
    <>
    <DashboardHeader/>
    <Navbar/>
    <div>
      <Outlet/>
    </div>
    
    </>
  )
}

export default User