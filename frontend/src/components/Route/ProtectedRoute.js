import React from 'react'
import {Navigate} from 'react-router-dom'
import { useSelector } from "react-redux";



const ProtectedRoute = ({ children}) => {
  const {isLoggedIn} = useSelector((state)=>state.userRed)
  if(!isLoggedIn){
    return <Navigate  to={"/login"}/>
  }
  return children;
}

export default ProtectedRoute
