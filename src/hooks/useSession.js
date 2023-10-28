import { useNavigate } from "react-router-dom";
import {isAuth} from '../middelware/ProtectedRoutes'
import {jwtDecode} from "jwt-decode"
import { useEffect } from "react";



export const useSession = ()=>{
    const session = isAuth()
    const decodedSession = session ? jwtDecode(session) : null;

    const navigate = useNavigate()

    const checkTokenExpirationTime = ()=>{
        if(session.exp){
            const convertUnixDateToMillisecond = decodedSession.exp * 1000
            const expirationDate = new Date(convertUnixDateToMillisecond)
            const currentDate = new Date()
    
            if(expirationDate < currentDate) {
                localStorage.clear()
                console.log('clear token');
            }
        }
    }

    useEffect(()=>{
        if(!session){
            navigate('/', {replace: true})
        } 
        checkTokenExpirationTime()
    },[navigate, session])

    return decodedSession
}

export default useSession;
