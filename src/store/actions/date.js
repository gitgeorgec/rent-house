import { SET_DATE } from "../actionTypes"

export function setDate(date){
    return {
        type: SET_DATE,
        date
    }
}