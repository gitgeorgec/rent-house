import { SEND_SEARCH } from "../actionTypes"

export function sendSearch(searchKeys){
    return {
        type:SEND_SEARCH,
        searchKeys
    }
}

