import React, { Component } from 'react'; 
// import GoogleMap from './GoogleMap'

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:"",
            address:"",
            image:"",
            price:0,
            description:""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const userId = this.props.currentUser.user.id
        let house = {...this.state}
        this.props.addHouse(house,userId)
        .then(this.props.history.push("/Houses"))
    }

    handleChange = (e) => [
        this.setState({
            [e.target.name]:e.target.value
        })
    ]

	render(){
		return(
            <div className="container">
                <h1>Post House</h1>
                <div className="row">
                    <form className="col-md-6" onSubmit={this.handleSubmit}>
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
                        <div className="from-group">
                            <label htmlFor="description">Example textarea</label>
                            <textarea className="form-control" id="description" rows="4" name="description" value={this.state.description} onChange={this.handleChange}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Submit</button>
                    </form>
                    <div className="col-md-6">
                        {/* <GoogleMap/> */}
                    </div>
                </div>

            </div>
		)
	}

}
export default Post;