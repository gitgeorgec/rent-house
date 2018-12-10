import { MAKE_ORDER } from "../actionTypes"

const order = (state=[] , action) => {
    switch (action.type) {
        case MAKE_ORDER:
            return action.order
        default:
            return state;
    }
}

export default order