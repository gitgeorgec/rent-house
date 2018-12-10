import { apiCall } from "../../service/api"
import { MAKE_ORDER } from "../actionTypes"
// const URL = "https://mighty-waters-27861.herokuapp.com/"
const URL = "http://localhost:8081/"

export const makeOrder = order =>({
    type:MAKE_ORDER,
    order
})

export const sendOrderRequset = ( type,userId, orderData) => (dispatch) =>{
    return apiCall(type, `${URL}api/order/${userId}/new`, orderData)
        .then(order=>{
            dispatch(makeOrder(order))
            return order
        })
        .catch(err=>{
            console.log(err)
            return err
        })
}