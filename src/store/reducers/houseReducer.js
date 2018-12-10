import { LOAD_HOUSES, DELETE_HOUSE, LOADING } from "../actionTypes"

const houses = (state= {data:[],loading:false, select:{}}, action) => {
    switch (action.type) {
        case LOADING:
            return {data:[],loading:true}
        case LOAD_HOUSES:
            return {
                data:action.houses,
                loading:false
            }
        case DELETE_HOUSE:
            return {
                houses:state.filter(house => house._id !== action.id),
                loading:false
            }
        default:
            return state;
    }
}

export default houses