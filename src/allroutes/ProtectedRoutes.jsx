
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes() {
    const {token} = useSelector((store)=>store.loginReducer);
  return (
    <>
    { token!==''?<Outlet/>:<Navigate to={'/login'}/>}
    </>
  )
     
}
