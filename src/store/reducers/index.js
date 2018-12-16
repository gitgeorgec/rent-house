import { combineReducers } from "redux"
import currentUser from "./currentUser"
import errors from "./errors"
import date from "./dateReducer"
import houses from "./houseReducer"
import search from "./searchReducer"
import select from "./selectReducer"
import user from "./userReducer"

const rootReducer = combineReducers({
	currentUser,
	errors,
	date,
	houses,
	search,
	select,
	user
})

export default rootReducer