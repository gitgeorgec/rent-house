import { combineReducers } from "redux"
import setDate from "./dateReducer"

const rootReducer = combineReducers({
	date:setDate,
})

export default rootReducer