import { apiCall } from "../../service/api"
import { addError } from "./errors"
import { LOAD_HOUSES, LOADING } from "../actionTypes"
// const URL = "https://mighty-waters-27861.herokuapp.com/"
const URL = "http://localhost:8081/"

export const loadHosues = houses =>({
    type:LOAD_HOUSES,
    houses
})

export const loading = loading =>({
    type:LOADING,
    loading
})

export const getHouse = (houseId="",query="") => (dispatch) =>{
    dispatch(loading(true))
    let search =""
    if(houseId)search = houseId
    if(Object.keys(query).length>1){
        let accommodate = parseInt(query.adult)+parseInt(query.child)
        search = `?search=1${query.geometry?"&geometry="+query.geometry.lat+","+query.geometry.lng:""}${accommodate?"&accommodate="+accommodate:""}&date=${query.date?query.date.join(","):""}`
    }
    return apiCall("get", `${URL}api/house/${search}`)
    .then(houses=>{
            dispatch(loadHosues(houses))
        })
        .catch(err=>{
            if(err.error){
                return dispatch(addError(err.error.message))
            }else {
                return dispatch(addError(err))
            }
        })
}


export const addHouse = (houseData, userId) => (dispatch) =>{
    dispatch(loading(true))
    return apiCall("post",`${URL}api/user/${userId}/house/new`, houseData)
        .then(house=>{
            dispatch(loading(false))
            return house
        })
        .catch(err=>{
            if(err.error){
                return dispatch(addError(err.error.message))
            }else {
                return dispatch(addError(err))
            }
        })
}