import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'

class FacebookButton extends Component {
    
    responseFacebook = response => {
        if(response.accessToken){
            this.props.facebookAuth({
                email: response.email,
                username: response.name,
                profileImageUrl: response.picture.data.url,
                accessToken: response.accessToken
                })
                .then(this.props.history.push("/"))
            }
        }

    componentClicked = () => console.log('clicked')

    render() {
        return (
            <FacebookLogin
                appId="235375220463729"
                autoLoad={false}
                fields="name,email,picture"
                callback={this.responseFacebook} 
                buttonStyle={{width:"100%", height:"3rem", padding:0}}
                textButton={this.props.text+" with facebook"}
                icon="fa-facebook-f"/>
        )
    }
}

export default FacebookButton