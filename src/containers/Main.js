import React from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser, facebookAuth } from "../store/actions/auth"
import { addHouse, getHouse } from "../store/actions/house"
import { removeError } from '../store/actions/errors'
import Index from './Index'
import AuthForm from '../components/AuthForm'
import Header from './Header'
import Houses from './Houses'
import PostForm from '../components/PostForm'

const Main = props => {
    const { authUser,facebookAuth, errors, removeError, addHouse, getHouse, currentUser, houses, date} = props
    return (
        <React.Fragment>
            <Header  currentUser ={ currentUser }/>
            <Switch>
                <Route exact path="/rent-house" render={() => (<Redirect to="/"/>)} />    
                <Route exact path="/" render={props=><Index {...props}/>}/>
                <Route exact path="/houses" render={props=>{
                    return (
                        <Houses date={date} getHouse = {getHouse} houses = {houses} {...props}/>
                    )
                }}/>
                <Route exact path="/:id/house/new" render={props=>{
                    return (
                        <PostForm date={date} currentUser ={ currentUser } addHouse={ addHouse } {...props}/>
                    )
                }}/>
                <Route exact path="/signin" render={props=>{
                    return (
                        <AuthForm removeError={ removeError } errors={ errors } onAuth={ authUser } facebookAuth={ facebookAuth } buttonText="Log in" heading="Welcome Back." {...props}/>
                    )
                }} />
                <Route exact path="/signup" render={props=>{
                    return (
                        <AuthForm  removeError={ removeError } errors={ errors } onAuth={ authUser } facebookAuth={ facebookAuth } buttonText="sign up" heading="Join Today." signUp {...props}/>
                    )
                }} />
            </Switch>
        </React.Fragment>          
    )
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors,
        houses: state.houses,
        date: state.date
    }
}

export default withRouter(connect(mapStateToProps, { authUser,facebookAuth ,removeError, addHouse, getHouse})(Main))
