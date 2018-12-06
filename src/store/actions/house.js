import { apiCall } from "../../service/api"
import { addError } from "./errors"
import { LOAD_HOUSES, DELETE_HOUSE } from "../actionTypes"
const URL = "https://mighty-waters-27861.herokuapp.com/"
// const URL = "http://localhost:8081/"

export const loadHosues = houses =>({
    type:LOAD_HOUSES,
    houses
})

export const deleteHouse = houseId =>({
    type:DELETE_HOUSE,
    houseId
})

export const getHouse = (houseId="") => (disptch) =>{
    return apiCall("get", `${URL}api/house/${houseId}`)
        .then(houses=>{
            disptch(loadHosues(houses))
        })
        .catch(err=>{
            disptch(addError(err.message))
        })
}


export const addHouse = (houseData, userId) => (disptch) =>{
    return apiCall("post",`${URL}api/user/${userId}/house/new`, houseData)
        .then(house=>{
            console.log(house)
            disptch(loadHosues(house))
        })
        .catch(err=>disptch(addError(err.message)))
}