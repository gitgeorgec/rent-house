import React, { Component } from 'react';

class AuthForm extends Component{
  constructor(props){
    super(props)
    this.state = {
        email:"",
        username:"",
        password:"",
        profileImageUrl:""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(){
    console.log("updata")
    console.log(this.state.email,this.state.password)
    if(this.state.email==="test@test.com"&&this.state.password==="test"){
      document.querySelector("button").click()
    }
  }

  async handleSubmit(e){
    
  }

  handleChange = e =>{
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleTestLogin(){
    this.setState({
      email:"test@test.com",
      username:"test",
      password:"test",
    })
  }

  render(){
    return (
      <React.Fragment>
        <h1 className="text-center">{this.props.heading}</h1>
        <form className="col-md-9 mx-auto col-sm-12" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="Email">Email address</label>
            <input name="email" type="email" className="form-control" id="Email" placeholder="Enter email" onChange={this.handleChange} value={this.state.email}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          {this.props.signUp?"":
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
            <button type="submit" className="btn btn-primary form-control">Submit</button>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

export default AuthForm