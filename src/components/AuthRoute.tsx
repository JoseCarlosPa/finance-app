import React, {useEffect, useState} from 'react'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import {useNavigate} from "react-router-dom";

const AuthRoute = (props: any) =>{

  const {children} = props;
  const auth = getAuth()
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    AuthCheck()
    return () => AuthCheck()

  },[auth])

  const AuthCheck = onAuthStateChanged(auth,(user)=>{
    if(user){
      setLoading(false)
    }else{
      console.error('unauthorized')
      navigate('/login')
    }
  })

  if(loading){
    return <p>Cargando...</p>
  }

  return (<>{children}</>);
}
export default React.memo(AuthRoute)