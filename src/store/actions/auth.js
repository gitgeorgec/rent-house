import { apiCall, setDefaultToken} from "../../service/api"
import { SET_CURRENT_USER } from  "../actionTypes" 
import { addError, removeError } from './errors'

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function setAuthorizationToken(token){
    setDefaultToken(token)
}

export function logout(){
    return dispatch =>{
        localStorage.clear()
        setAuthorizationToken(false)
        dispatch(setCurrentUser({}))
    }
}

export function authUser(type, userData){
    return dispatch => {
        return apiCall("post",`http://localhost:8081/api/auth/${type}`,userData)
        .then(({token, ...user})=>{
            localStorage.setItem("jwtToken", token);
            setAuthorizationToken(token)
            dispatch(setCurrentUser(user))
            dispatch(removeError())
        })
        .catch(err=>{
            console.log(err)
            return dispatch(addError(err.error.message))
        })
    }
}
