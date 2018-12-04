import { SET_DATE } from '../actionTypes'

export default function setDate(state =[], action){
    switch(action.type){
        case SET_DATE:
            return action.date
        default:
            return state
    }
}