import { SEND_SEARCH } from "../actionTypes"

export default (state = {}, action) => {
    switch(action.type){
        case SEND_SEARCH:
            return action.searchKeys
        default:
            return state
    }
}

