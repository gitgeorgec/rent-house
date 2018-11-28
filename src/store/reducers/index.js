import { combineReducers } from "redux"
import currentUser from "./currentUser"
import errors from "./errors"
import date from "./dateReducer"

const rootReducer = combineReducers({
	currentUser,
	errors,
	date,
})

export default rootReducer