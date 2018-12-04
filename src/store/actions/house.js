import { apiCall } from "../../service/api"
import { addError } from "./errors"
import {LOADING, LOAD_HOUSES, DELETE_HOUSE } from "../actionTypes"

export const loading = (isLoading) =>({
    type:LOADING,
    isLoading
})

export const loadHosues = houses =>({
    type:LOAD_HOUSES,
    houses
})

export const deleteHouse = houseId =>({
    type:DELETE_HOUSE,
    houseId
})

export const getHouse = (houseId="") => (disptch) =>{
    disptch(loading(true))
    return apiCall("get", `http://localhost:8081/api/house${"/"+houseId}`)
        .then(houses=>{
            disptch(loadHosues(houses))
        })
        .catch(err=>{
            disptch(loading(false))
            disptch(addError(err.message))
        })
}

export const addHouse = (houseData, userId) => (disptch) =>{
    disptch(loading(true))
    return apiCall("post",`http://localhost:8081/api/user/${userId}/house/new`, houseData)
        .then(house=>{
            console.log(house)
            disptch(loadHosues(house))
        })
        .catch(err=>disptch(addError(err.message)))
}