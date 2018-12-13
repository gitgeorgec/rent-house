import { LOAD_HOUSES, LOADING } from "../actionTypes"

const houses = (state= {data:[],loading:false}, action) => {
    switch (action.type) {
        case LOADING:
            return {data:[],loading:action.loading}
        case LOAD_HOUSES:
            return {
                data:action.houses,
                loading:false
            }
        default:
            return state;
    }
}

export default houses