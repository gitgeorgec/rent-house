import { combineReducers } from "redux"
import currentUser from "./currentUser"
import errors from "./errors"
import date from "./dateReducer"
import house from "./houseReducer"

const rootReducer = combineReducers({
	currentUser,
	errors,
	date,
	house
})

export default rootReducer