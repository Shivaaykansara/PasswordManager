import { useEffect } from "react"
import { useAuth } from "../store/auth"
import { Navigate } from "react-router-dom"

const Logout = () => {
    const {Logout} = useAuth()
    useEffect(()=>{
        Logout()
    },[Logout])
  return <Navigate to='/login'/>
}

export default Logout
