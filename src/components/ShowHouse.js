import React, { Component } from 'react'; 
// import GoogleMap from './GoogleMap'
import { connect } from 'react-redux'
import { clearSelect } from '../store/actions/select'
import { apiCall } from '../service/api'
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'

class ShowHouse extends Component {
    constructor(props){
        super(props)
        this.state={
            comment:""
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleClear=()=>{
        this.props.clearSelect()
    }

    handleOrder=()=>{
        this.props.history.push("/houses/order")
    }

    handleComment=(e)=>{
        e.preventDefault()
        const URL = "http://localhost:8081/"
        let data = {
            houseId:this.props.select[0].houseId,
            comment:this.state.comment
        }
        apiCall("post",`${URL}api/comment/${this.props.currentUser.user.id}/new`,data)
        .then(res=>console.log(res))
    }

	render(){
            return(
				<div className="position-fixed" style={{
					zIndex:this.props.select[0]?"200":"-1", 
					background:"rgba(0,0,0,0.5)",
					transition:"0.3s",
					width:"100vw",
					height:this.props.select[0]?"100vh":0,
					// transform:this.props.select[0]?"scale(1)":"scale(0)",
					opacity:this.props.select[0]?1:0, 
					top:"0%",
					overflow:"scroll"}}>
                    <div className="row p-3 m-3 mx-auto container" style={{background:"white"}}>
                        <h3 className="col-12">{this.props.select[0]?this.props.select[0].name:""}</h3>
                        <hr/>
						{this.props.select[0]?
                        <div className="col-md-6">
                            <img style={{width:"100%"}} src={this.props.select[0].image} alt="" />
                            <p>address:{this.props.select[0].address}</p>
                            <p>price:{this.props.select[0].price}</p>
                            <p>owner:{this.props.select[0].owner}</p>
                            <p>aviliable date:</p>
                        </div>:""}
                        <div className="col-md-6">
                        <div style={{ height: "100%", width: '100%', minHeight:"400px"}}>
                            <GoogleMapReact
							// bootstrapURLKeys={{ key:"AIzaSyAjQDTCdLCWo2JBZiosUYNEox7R92t_Ts4"}}
                            defaultCenter={{
								lat: 25.0171194,
                                lng: 121.4710123
							}}
                            center={this.props.select[0]?this.props.select[0].geometry:{
								lat: 22.0171194,
                                lng: 123.4710123
							}}
                            defaultZoom={17}>
								{this.props.select[0]?
                                <Marker
                                lat={this.props.select[0].geometry.lat}
                                lng={this.props.select[0].geometry.lng} 
                                text={""}
								/>
								:""}
                            </GoogleMapReact>
                        </div>
                        </div>
                        <button className="col-12 btn btn-success" onClick={this.handleOrder}>order</button>
                        <button className="col-12 btn btn-danger" onClick={this.handleClear}>cancel</button>
                        <form onSubmit={this.handleComment}>
                            <div className="from-group">
                                <label htmlFor="comment">Comment</label>
                                <textarea className="form-control" id="comment" rows="4" name="comment" value={this.state.comment} onChange={this.handleChange}></textarea>
                            </div>
                            <div className="from-group col-12 mb-3 mt-2">
                                <button type="submit" className="btn btn-primary mt-2 form-control">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
	}

}

function mapStateToProps(state) {
	return {
        select: state.select,
        date: state.date,
        currentUser: state.currentUser
	}
}

export default connect(mapStateToProps,{ clearSelect })(ShowHouse)