import { apiCall, setDefaultToken, URL} from "../../service/api"
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
        return apiCall("post",`${URL}api/auth/${type}`,userData)
        .then(({token, ...user})=>{
            localStorage.setItem("jwtToken", token);
            setAuthorizationToken(token)
            dispatch(setCurrentUser(user))
            dispatch(removeError())
            return user
        })
        .catch(err=>{
            console.log(err)
            return dispatch(addError(err.error.message))
        })
    }
}

export function checkAuth(id){
    return apiCall("get",`${URL}${id}`)
}

export function facebookAuth(userData){
    return dispatch => {
        return apiCall("post", `${URL}api/auth/authWithFacebook`,userData)
        .then(({token, ...user})=>{
            localStorage.setItem("jwtToken", token);
            setAuthorizationToken(token)
            dispatch(setCurrentUser(user))
            dispatch(removeError())
            return user
        })
        .catch(err=>{
            console.log(err)
            if(err.error.message){
                return dispatch(addError(err.error.message))
            }else {
                return dispatch(addError(err))
            }
        })
    }
}
