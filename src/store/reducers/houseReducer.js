import {LOADING, LOAD_HOUSES, DELETE_HOUSE } from "../actionTypes"

const house = (state= {hosue:[], isLoading:false}, action) => {
    switch (action.type) {
        case LOADING:
            return {
                isLoading:action.isLoading
            }
        case LOAD_HOUSES:
            return {
                isLoading:false,
                house:action.houses
            }
        case DELETE_HOUSE:
            return {
                houses:state.filter(house => house._id !== action.id)
            }
        default:
            return state;
    }
}

export default house