import { apiCall } from "../../service/api"
import { addError } from "./errors"
import { LOAD_HOUSES, DELETE_HOUSE, LOADING, SELECT_HOUSE } from "../actionTypes"
// const URL = "https://mighty-waters-27861.herokuapp.com/"
const URL = "http://localhost:8081/"

export const loadHosues = houses =>({
    type:LOAD_HOUSES,
    houses
})

export const deleteHouse = houseId =>({
    type:DELETE_HOUSE,
    houseId
})

export const loading = () =>({
    type:LOADING
})

export const selectHouse = hosue =>({
    type:SELECT_HOUSE,
    hosue
})

export const getHouse = (houseId="",query="") => (dispatch) =>{
    dispatch(loading())
    let search =""
    if(houseId)search = houseId
    if(Object.keys(query).length>1){
        let accommodate = parseInt(query.adult)+parseInt(query.child)
        search = `?search=1&address=${query.distination}&accommodate=${accommodate>1?accommodate:1}&date=${query.date.join(",")}`
    }
    console.log(`${URL}api/house/${search}`)
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
    dispatch(loading())
    return apiCall("post",`${URL}api/user/${userId}/house/new`, houseData)
        .then(house=>{
            dispatch(loadHosues([house]))
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