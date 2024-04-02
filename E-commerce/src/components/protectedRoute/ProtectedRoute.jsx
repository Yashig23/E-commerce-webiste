import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"


// user
export const ProtectedRouteUser = ({children})=>{
       const user = localStorage.getItem('user')
       if(user){
        return children;
       }
       else{
        return <Navigate to={'/login'}/>
       }
}

//error
export const ProtectedRouteAdmin =({children})=>{
    const admin = JSON.parse(localStorage.getItem('user'))

    if(admin.user.email === 'guptayashi32@gmail.com'){
        return children
    }
    else{
        return <Navigate to={'/login'}/>
    }
}

