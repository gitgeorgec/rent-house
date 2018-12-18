import React, { Component } from 'react';
import Calender from './Calender'
import { apiCall } from "../service/api"
import { Link } from 'react-router-dom'

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
        error:""
    }
  }

  componentDidMount(){
    this.setState({
      error:""
    })
  }

  componentWillUnmount(){
    this.props.clearSelect()
  }

  handleSubmit = e =>{
    e.preventDefault()
    if(parseInt(this.state.adult)+parseInt(this.state.child)>this.props.select.accommodate){
      this.setState({
        error:"too many people"
      })
      return 
    }
		let order = {
			email: this.state.email,
			phone: this.state.phone,
			houseId: this.props.select._id,
			houseOwner: this.props.select.owner._id,
			date: this.props.date,
      specialRequest: this.state.specialRequest,
      accommodate: {
        adult:this.state.adult,
        child:this.state.child
      },
      price:this.props.select.price * this.props.date.length
		}
    const URL = "http://localhost:8081/"
    apiCall("post", `${URL}api/order/${this.props.currentUser.user.id}/new`, order)
      .then(res=>{
        if(res.customer){
          this.setState({
            finish:true,
          })
        }else{
          console.log(res)
          console.log("some thing wrong")
        }
      })
      .catch(err=>{
          console.log(err)
          return err
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
  
  handleLeave= ()=>{
    this.props.clearSelect()
  }
	
  render(){
    const {heading, errors, history, removeError} = this.props
    history.listen(() => {
      removeError()
    })
    return (
      <div className="row container mx-auto">
      <div className="col-12" >
        <h1 className="text-center">{this.props.select.name}</h1><hr/>
      </div>
      {this.state.error.length>0?<div className="alert alert-danger position-absolute" style={{zIndex:10, top:0, width:"100vw"}}>{this.state.error}</div>:""}
      {this.state.finish?
      <div style={{width:"100vw", height:"100vh", position:"fixed", zIndex:"200",display:"flex", background:"rgba(0,0,0,0.6)",justifyContent:"center", left:0, fontSize:"1.2rem", fontWeight:"bolder"}}>
        <div>success <br/> 
        <Link to="/" style={{color:"#fff"}} onClick={this.handleLeave}>back home page</Link>
        <Link to="/user" style={{color:"#fff"}} onClick={this.handleLeave}>see my order</Link>
        </div>
      </div>:""}
				<div className="col-md-6">
					<img src={this.props.select.image} alt="" style={{width:"100%",maxHeight:"50vh"}}/>
          <div className="text-center" style={{fontSize:"2rem", fontWeight:"bolder"}}>
            PRICE: {this.props.select.price * this.props.date.length} <br/>
            TOTAL {this.props.date.length} NIGHT <br/>
            ACCOMMODATE {parseInt(this.state.adult)+parseInt(this.state.child)} / {this.props.select.accommodate}
          </div>
				</div>
        <h1 className="text-center">{heading}</h1>

        <form className="col-md-6 col-sm-12" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="Email">Email Address</label>
            <span className="float-right">
              <input type="checkbox" id="CheckSame" onChange={this.handleSelect} checked={this.state.same}/>
              <label className="form-check-label" htmlFor="CheckSame">Same as My account</label>
            </span>
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
						<Calender unavailableDate={this.props.select.unavailableDate}/>
					</div>

          <div className="form-group">
            <button type="submit" className="btn btn-success form-control mt-2" >SEND OREDR</button>
            {errors.message && <div className="alert alert-danger">{errors.message}</div>}
          </div>
        </form>
      </div>
    )
  }
}

export default OrderForm