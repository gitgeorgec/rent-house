import React, { Component } from 'react';
import Calender from './Calender'

class OrderForm extends Component{
  constructor(props){
    super(props)
    this.state = {
        email:"",
				phone:"",
				same:false,
				specialRequest:""
    }
	}

  handleSubmit = e =>{
		e.preventDefault()
		let order = {
			email: this.state.email,
			phone: this.state.phone,
			houseId: this.props.select[0].id,
			houseOwner: this.props.select[0].ownerId,
			date: this.props.date,
			specialRequest: this.state.specialRequest,
		}
		this.props.sendOrderRequset("post", this.props.currentUser.user.id, order)
  }

  handleChange = e =>{
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleSelect =()=>{
      if(this.state.same){
				this.setState({
					same:false,
					email:""
				})
			}else{				
				this.setState({
					same:true,
					email:this.props.currentUser.user.email
				})
			}
	}
	
  render(){
    const {heading, errors, history, removeError} = this.props
    history.listen(() => {
      removeError()
		})
    return (
      <div className="col-md-6 mx-auto row">
				<div className="col-12">
					<img src={this.props.select[0].image} alt="" style={{width:"100%"}}/>
				</div>
        <h1 className="text-center">{heading}</h1>
        {errors.message && <div className="alert alert-danger">{errors.message}</div>}
        <form className="col-md-9 mx-auto col-sm-12" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="CheckSame" onChange={this.handleSelect} checked={this.state.same}/>
            <label className="form-check-label" htmlFor="CheckSame">Same as My account</label>
        </div>
          <div className="form-group">
            <label htmlFor="Email">Email address</label>
            <input name="email" type="email" className="form-control" id="Email" placeholder="Enter email" onChange={this.handleChange} value={this.state.email}/>
          </div>
          <div className="form-group">
            <label htmlFor="Phone">Phone Number</label>
            <input name="phone" type="text" className="form-control" id="Phone" placeholder="Phone Number" onChange={this.handleChange} value={this.state.phone}/>
          </div>
          <div className="form-group">
            <label htmlFor="Phone">Phone Number</label>
            <textarea name="specialRequest" type="text" className="form-control" id="specialRequest" placeholder="Special Request" onChange={this.handleChange} value={this.state.specialRequest}/>
          </div>
					<div>
						<Calender />
					</div>
          <div className="form-group">
            <button type="submit" className="btn btn-success form-control mt-2" >Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default OrderForm