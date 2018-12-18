import React, { Component } from 'react'; 
import Calender from './Calender'
// import GoogleMap from './GoogleMap'

class Post extends Component {
	constructor(props){
		super(props)
		this.state = {
			name:"",
			address:"",
			image:"",
			price:0,
			accommodate:2,
			description:"",
			unavailableDate:[],
		}
	}
	
	componentWillMount(){
		this.props.sendSearch([])
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		let geometry = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.address}&key=AIzaSyAjQDTCdLCWo2JBZiosUYNEox7R92t_Ts4`)
		.then(res=>res.json())
		.then(res=>{
			return res.results[0].geometry.location
		})
		const userId = this.props.currentUser.user.id
		let house = {...this.state, unavailableDate: this.props.date, geometry}
		this.props.addHouse(house,userId)
		.then(res=>{
			if(res.name){
				this.props.setDate([])
				this.props.history.push("/Houses")
			}
		})
	}
    
	handleChange = (e) => {
		this.setState({
			[e.target.name]:e.target.value
		})
	}

render(){
	const {errors, history, removeError} = this.props
	history.listen(() => {
		removeError()
	})
	return(
		<div className="container">
		{errors.message && <div className="alert alert-danger">{errors.message}</div>}
			<h1>Post House</h1>
			<div className="row">
				<form className="col-12 border shadow row" onSubmit={this.handleSubmit}>
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="HouseName">House Name</label>
								<input type="text" className="form-control" id="HouseName" name="name" placeholder="House Name"
									value={this.state.name} onChange={this.handleChange}/>
							</div>
							<div className="form-group">
								<label htmlFor="address">Address</label>
								<input type="text" className="form-control" id="address" placeholder="Address" name="address"
									value={this.state.address} onChange={this.handleChange}/>
							</div>
							<div className="form-group">
								<label htmlFor="picture">Image Url</label>
								<input type="text" className="form-control" id="picture" placeholder="Image Url" name="image"
									value={this.state.image} onChange={this.handleChange}/>
							</div>
							<div className="form-group">
								<label htmlFor="price">Price</label>
								<input type="number" className="form-control" id="price" placeholder="Price" name="price" value={this.state.price} onChange={this.handleChange}/>
							</div>
							<div className="form-group">
								<label htmlFor="accommodate">accommodate</label>
								<input type="number" className="form-control" id="price" placeholder="Price" name="accommodate" value={this.state.accommodate} onChange={this.handleChange}/>
							</div>
							<div className="from-group">
								<label htmlFor="description">Description</label>
								<textarea className="form-control" id="description" rows="4" name="description" value={this.state.description} onChange={this.handleChange}></textarea>
							</div>
						</div>
						<div className="col-md-6">
							<div className="mt-3 mb-2">
								<h3 className="text-center">Not Available Date</h3>
								<Calender setUnavailableDate/>
							</div>
							{/* <GoogleMap/> */}
							<img src={this.state.image} alt="" style={{width:"100%"}}/>
						</div>
						<div className="from-group col-12 mb-3 mt-2">
							<button type="submit" className="btn btn-primary mt-2 form-control">Submit</button>
						</div>
					</form>
				</div>
		</div>)
	}
}
export default Post;