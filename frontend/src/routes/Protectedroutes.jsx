import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protectedroutes = ({children}) => {
    const isAuth = false;
    const navigate = useNavigate();

    useEffect(() => {
      if(!isAuth) navigate('/login')
    }, [])
    
    
  return (
    children
  )
}

export default Protectedroutes
