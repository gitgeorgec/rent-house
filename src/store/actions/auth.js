import { apiCall } from "../../service/api"
import { SET_CURRENT_USER } from  "../actionTypes" 

export function setCurrentUser(User){
    return {
        type: SET_CURRENT_USER,
        user
    }
}

// export async function authUser(type, userData){
//     return await apiCall("post",`https://localhost8081/api/auth/${type}`,userData).then(
//         ({ token, ...user }) => {
//             localStorage.setItem("jwtToken", token)
//             store.dispatch(setCurrentUser(user))
//         }
//     )
// }
