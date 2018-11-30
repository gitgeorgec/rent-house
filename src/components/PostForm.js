import React, { Component } from 'react'; 
import GoogleMap from './GoogleMap'

class Post extends Component {

	render(){
		return(
            <div className="container">
                <h1>Post House</h1>
                <div className="row">
                    <form className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <div className="col-md-6">
                        <GoogleMap/>
                    </div>
                </div>

            </div>
		)
	}

}
export default Post;