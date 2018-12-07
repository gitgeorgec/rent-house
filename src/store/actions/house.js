import { apiCall } from "../../service/api"
import { addError } from "./errors"
import { LOAD_HOUSES, DELETE_HOUSE } from "../actionTypes"
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

export const getHouse = (houseId="",query="") => (dispatch) =>{
    let search =""
    if(houseId)search = houseId
    if(query.adult){
        
        search = `?search=1&address=${query.distination}&accommodate=${query.adult+query.child}&date=${query.date.join(",")}`
        console.log(search)
    }
    return apiCall("get", `${URL}api/house/${search}`)
        .then(houses=>{
            dispatch(loadHosues(houses))
        })
        .catch(err=>{
            return dispatch(addError(err.error.message))
        })
}


export const addHouse = (houseData, userId) => (dispatch) =>{
    return apiCall("post",`${URL}api/user/${userId}/house/new`, houseData)
        .then(house=>{
            dispatch(loadHosues(house))
            return house
        })
        .catch(err=>{
            return dispatch(addError(err.error.message))
        })
}