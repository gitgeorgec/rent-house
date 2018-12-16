import { UPDATE_USER_HOUSE, UPDATE_USER_ORDER, UPDATE_USER_COMMENT} from "../actionTypes"

const order = (state={houses:[],orders:[],comments:[]} , action) => {
    switch (action.type) {
        case UPDATE_USER_HOUSE:
            return {
                ...state,
                houses:action.houses
            }
        case UPDATE_USER_ORDER:
            return {
                ...state,
                orders:action.orders
            }
        case UPDATE_USER_COMMENT:
            return {
                ...state,
                comments:action.comments
            }
        default:
            return state;
    }
}

export default order