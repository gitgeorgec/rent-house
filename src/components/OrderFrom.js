import React, { Component } from 'react';
import Calender from './Calender'

class OrderForm extends Component{
  constructor(props){
    super(props)
    this.state = {
        finish:false,
        email:"",
				phone:"",
				same:false,
        specialRequest:"",
        adult:1,
        child:0,
    }
	}

  handleSubmit = e =>{
		e.preventDefault()
		let order = {
			email: this.state.email,
			phone: this.state.phone,
			houseId: this.props.select[0].houseId,
			houseOwner: this.props.select[0].ownerId,
			date: this.props.date,
      specialRequest: this.state.specialRequest,
      accommodate: {
        adult:this.state.adult,
        child:this.state.child
      }
		}
    this.props.sendOrderRequset("post", this.props.currentUser.user.id, order)
    .then(res=>{
      if(res.customer){
        this.setState({
          finish:true,
        })
      }
    })
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
      {this.state.finish?<div className="alert alert-success">success</div>:""}
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
            <input name="email" type="email" className="form-control" id="Email" placeholder="Enter email" onChange={this.handleChange} value={this.state.email} readOnly={this.state.same}/>
          </div>
          <div className="form-group">
            <label htmlFor="Phone">Phone Number</label>
            <input name="phone" type="text" className="form-control" id="Phone" placeholder="Phone Number" onChange={this.handleChange} value={this.state.phone}/>
          </div>
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="adultNum">Adult</label>
              <select className="form-control" id="adultNum" name="adult" onChange={this.handleChange} value={this.state.adult}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>
            <div className="form-group col-6">
              <label htmlFor="childrenNum">Child</label>
              <select className="form-control" id="childrenNum" name="child" onChange={this.handleChange}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="Phone">Special Request</label>
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