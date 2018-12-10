import { SELECT_HOUSE, CLEAR_SELECT } from "../actionTypes"

export default function(state={},action){
    switch (action.type) {
        case SELECT_HOUSE:
            return action.house
        case CLEAR_SELECT:
            return {}
        default:
            return state;
    }
}