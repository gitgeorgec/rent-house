import { combineReducers } from "redux"
import currentUser from "./currentUser"
import errors from "./errors"
import date from "./dateReducer"
import houses from "./houseReducer"
import search from "./searchReducer"
import select from "./selectReducer"
import order from "./orderReducer"

const rootReducer = combineReducers({
	currentUser,
	errors,
	date,
	houses,
	search,
	select,
	order
})

export default rootReducer