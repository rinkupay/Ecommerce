import React from 'react'
import {Navigate} from 'react-router-dom'
import { useSelector } from "react-redux";


const AdminRoute = ({children}) => {

    const {isLoggedIn,userDetails} = useSelector((state)=>state.userRed);

    if(!isLoggedIn){
        return <Navigate to={"/login"}/>
    } 

    if(isLoggedIn && userDetails.user.role === 'admin'){
        return children;
    }
  
}

export default AdminRoute
