import { combineReducers } from "redux"
import currentUser from "./currentUser"
import errors from "./errors"
import date from "./dateReducer"
import houses from "./houseReducer"
import search from "./searchReducer"

const rootReducer = combineReducers({
	currentUser,
	errors,
	date,
	houses,
	search
})

export default rootReducer