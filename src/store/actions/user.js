import { UPDATE_USER_HOUSE, UPDATE_USER_ORDER, UPDATE_USER_COMMENT } from "../actionTypes"

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
