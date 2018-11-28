import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import Index from './index'
import AuthFrom from '../components/AuthForm'
import Header from './header'

const Main = props => {
    return (
        <React.Fragment>
            <Header/>
            <Switch>
                <Route exact path="/" render={props=><Index {...props}/>} />
                <Route exact path="/signin" render={props=>{
                    return (
                        <AuthFrom buttonText="Log in" heading="Welcome Back." {...props}/>
                    )
                }} />
                <Route exact path="/signup" render={props=>{
                    return (
                        <AuthFrom buttonText="sign up" heading="Join Today." signUp {...props}/>
                    )
                }} />
            </Switch>
        </React.Fragment>          
    )
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, null)(Main))