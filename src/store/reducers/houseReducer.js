import { LOAD_HOUSES, DELETE_HOUSE } from "../actionTypes"

const houses = (state= [], action) => {
    switch (action.type) {
        case LOAD_HOUSES:
            return action.houses
        case DELETE_HOUSE:
            return {
                houses:state.filter(house => house._id !== action.id)
            }
        default:
            return state;
    }
}

export default houses