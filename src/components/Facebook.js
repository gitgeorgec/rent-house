import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'

class FacebookButton extends Component {
    state ={
        isLoggedin: false,
        userID:"",
        name:"",
        email:"",
        picture:"",
        accessToken: ""
    }
    
    responseFacebook = response => {
        console.log(response)
        // this.setState({
            //     isLoggedin: true,
            //     userID: response.userID,
            //     name: response.name,
            //     email: response.email,
            //     picture: response.picture.data.url,
            //     accessToken: response.accessToken
            // })
        // fackbookAuth
        this.props.facebookAuth({
            email: response.email,
            username: response.name,
            profileImageUrl: response.picture.data.url,
            accessToken: response.accessToken
        })
        }

    componentClicked = () => console.log('clicked')

    render() {
        // let fbContent
        // if(this.state.isLoggedin){
        //     fbContent = (
        //         <div style={{
        //             width:'400px',
        //             margin:'auto',
        //             background: '#f4f4f4',
        //             padding: '20px',
        //             color: 'black'
        //         }}>
        //             <img src={this.state.picture} alt={this.state.name}/>
        //             <h2>Welcome {this.state.name}</h2>
        //             <h4>Email {this.state.email}</h4>
        //         </div>
        //     )
        // } else {
        //     fbContent = (
        //         <FacebookLogin
        //         appId="235375220463729"
        //         autoLoad={false}
        //         fields="name,email,picture"
        //         callback={this.responseFacebook} />
        //     )
        // }

        return (
            <FacebookLogin
                appId="235375220463729"
                autoLoad={false}
                fields="name,email,picture"
                callback={this.responseFacebook} />
        )
    }
}

export default FacebookButton