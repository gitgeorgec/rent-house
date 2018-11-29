import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { authUser } from "../store/actions/auth"
import { removeError } from '../store/actions/errors'
import Index from './index'
import AuthFrom from '../components/AuthForm'
import Header from './header'
import Houses from './Houses'

const Main = props => {
    const { authUser, errors, removeError } = props
    return (
        <React.Fragment>
            <Header/>
            <Switch>
                <Route exact path="/" render={props=><Index {...props}/>} />
                <Route exact path="/houses" render={props=><Houses {...props}/>} />
                <Route exact path="/signin" render={props=>{
                    return (
                        <AuthFrom removeError={ removeError } errors={ errors } onAuth={ authUser } buttonText="Log in" heading="Welcome Back." {...props}/>
                    )
                }} />
                <Route exact path="/signup" render={props=>{
                    return (
                        <AuthFrom  removeError={ removeError } errors={ errors } onAuth={ authUser }  buttonText="sign up" heading="Join Today." signUp {...props}/>
                    )
                }} />
            </Switch>
        </React.Fragment>          
    )
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, { authUser ,removeError})(Main))