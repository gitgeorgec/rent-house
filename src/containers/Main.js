import React from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser, facebookAuth } from "../store/actions/auth"
import { addHouse, getHouse, loadHosues } from "../store/actions/house"
import { removeError } from '../store/actions/errors'
import { updateUserHouses, updateUserOrders, updateUserComments } from '../store/actions/user'
import { setDate } from '../store/actions/date'
import { clearSelect } from '../store/actions/select'
import { sendSearch } from "../store/actions/search"
import Index from './Index'
import AuthForm from '../components/AuthForm'
import Header from './Header'
import Houses from './Houses'
import PostForm from '../components/PostForm'
import OrderForm from '../components/OrderFrom'
import User from './User'

const Main = props => {
    const { authUser,
        facebookAuth, 
        errors, 
        removeError, 
        addHouse, 
        getHouse,
        loadHosues,
        currentUser, 
        houses, 
        date, 
        search, 
        select, 
        setDate,
        clearSelect,
        sendSearch,
        updateUserHouses,
        updateUserOrders,
        updateUserComments,
        user} = props
    return (
        <React.Fragment>
            <Header  currentUser ={ currentUser }/>
            <Switch>
                <Route exact path="/rent-house" render={() => (<Redirect to="/"/>)} />    
                <Route exact path="/" render={props=><Index {...props}/>}/>
                <Route exact path="/houses" render={props=>{
                    return (
                        <Houses 
                        search = { search }
                        date= { date } 
                        getHouse = { getHouse } 
                        houses = { houses }
                        clearSelect = { clearSelect }
                        {...props}/>
                    )
                }}/>
                <Route exact path="/:id/house/new" render={props=>{
                    if(currentUser.isAuthenticated){
                        return (
                            <PostForm date={date} 
                            removeError={ removeError } 
                            errors={ errors } 
                            currentUser ={ currentUser } 
                            addHouse={ addHouse } 
                            setDate ={ setDate }
                            sendSearch = { sendSearch }
                            {...props}/>
                        )
                    }else{
                        return (<Redirect to="/signin"/>)
                    }
                }}/>
                <Route exact path="/signin" render={props=>{
                    return (
                        <AuthForm removeError={ removeError } 
                        errors={ errors } 
                        onAuth={ authUser } 
                        facebookAuth={ facebookAuth } 
                        buttonText="Log in" 
                        heading="Welcome Back." {...props}/>
                    )
                }} />
                <Route exact path="/signup" render={props=>{
                    return (
                        <AuthForm  removeError={ removeError } 
                        errors={ errors } 
                        onAuth={ authUser } 
                        facebookAuth={ facebookAuth } 
                        buttonText="sign up" 
                        heading="Join Today." 
                        signUp {...props}/>
                    )
                }} />
                <Route exact path="/houses/order" render={props=>{
                    if(currentUser.isAuthenticated){
                        if(select.length>0){
                            return (
                               <OrderForm date={ date } 
                               removeError={ removeError } 
                               errors={ errors } 
                               currentUser={ currentUser }  
                               select={ select } 
                               {...props}/>
                           )
                        }else{
                            return (<Redirect to="/houses"/>)
                        }
                    }else{
                        return (<Redirect to="/signin"/>)
                    }
                }} /> 
                <Route exact path="/user" render={props=>{
                    if(currentUser.isAuthenticated){
                        return (<User
                            currentUser={ currentUser }
                            houses = { houses }
                            loadHosues = {loadHosues}
                            updateUserHouses ={ updateUserHouses }
                            updateUserOrders ={ updateUserOrders }
                            updateUserComments={ updateUserComments }
                            user = { user }
                            {...props}/>)
                    }else{
                        return (<Redirect to="/signin"/>)
                    }
                }}/>
            </Switch>
        </React.Fragment>          
    )
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors,
        houses: state.houses,
        date: state.date,
        search: state.search,
        select: state.select,
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, 
    { authUser,
    facebookAuth ,
    removeError, 
    addHouse, 
    getHouse, 
    setDate,
    loadHosues, 
    clearSelect,
    sendSearch,
    updateUserHouses,
    updateUserOrders,
    updateUserComments})(Main))
