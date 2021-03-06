import React, { Component } from 'react';
import FacebookButton from './Facebook'

class AuthForm extends Component{
  constructor(props){
    super(props)
    this.state = {
        email:"",
        username:"",
        password:"",
        profileImageUrl:""
    }
  }

  handleSubmit = e =>{
    e.preventDefault()
    const authType = this.props.signUp?"signup":"signin"
    this.props.onAuth(authType,this.state)
      .then((res)=>{
        if(res.username)this.props.history.goBack()
      })
      .catch(()=>{
        return
      })
  }

  handleChange = e =>{
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  style={
    fontWeight: "700",
    fontSize: "calc(.27548vw + 12.71074px)",
    display: "inline-block",
    textTransform: "uppercase",
    height:"3rem",
    padding:0
  }

  render(){
    const {heading, errors, signUp, history, removeError} = this.props
    history.listen(() => {
      removeError()
    })
    return (
      <div className="col-md-6 mx-auto" style={{position:"relative", top:"70px"}}>
        <h1 className="text-center">{heading}</h1>
        {errors.message && <div className="alert alert-danger">{errors.message}</div>}
        <form className="col-md-9 mx-auto col-sm-12" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="Email">Email address</label>
            <input name="email" type="email" className="form-control" id="Email" placeholder="Enter email" onChange={this.handleChange} value={this.state.email}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          {!signUp?"":
          <React.Fragment>
            <div className="form-group">
              <label htmlFor="Username">username</label>
              <input name="username" type="text" className="form-control" id="Username" placeholder="Enter email" onChange={this.handleChange} value={this.state.username}/>
            </div>
            <div className="form-group">
              <label htmlFor="ProfileImageUrl">profileImageUrl</label>
              <input name="profileImageUrl" type="text" className="form-control" id="ProfileImageUrl" placeholder="Enter email" onChange={this.handleChange} value={this.state.profileImageUrl}/>
            </div>
          </React.Fragment>
          }
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input name="password" type="password" className="form-control" id="Password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success form-control" style={this.style}>Submit</button>
          </div>
          <div className="form-group">
            <FacebookButton text={this.props.signUp?"signUp":"login"} facebookAuth={this.props.facebookAuth} history={ this.props.history } />
          </div>
        </form>
      </div>
    )
  }
}

export default AuthForm