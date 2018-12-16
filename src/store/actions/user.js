// import { apiCall } from "../../service/api"
import { UPDATE_USER_HOUSE, UPDATE_USER_ORDER, UPDATE_USER_COMMENT } from "../actionTypes"
// const URL = "https://mighty-waters-27861.herokuapp.com/"
// const URL = "http://localhost:8081/"

export const updateUserHouses = houses =>({
    type:UPDATE_USER_HOUSE,
    houses
})

export const updateUserOrders = orders =>({
    type:UPDATE_USER_ORDER,
    orders
})

export const updateUserComments = comments =>({
    type:UPDATE_USER_COMMENT,
    comments
})