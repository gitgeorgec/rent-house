import { SELECT_HOUSE, CLEAR_SELECT } from "../actionTypes"

export const selectHouse = house =>({
    type:SELECT_HOUSE,
    house
})

export const clearSelect = () =>({
    type: CLEAR_SELECT
})