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
        if(this.props.select[0]){
            return(
                <div className="row p-3">
                    <h3 className="col-12">{this.props.select[0].name}</h3>
                    <hr/>
                    <div className="col-md-6">
                        <img style={{width:"100%"}} src={this.props.select[0].image} alt="" />
                        <p>address:{this.props.select[0].address}</p>
                        <p>price:{this.props.select[0].price}</p>
                        <p>owner:{this.props.select[0].owner}</p>
                        <p>aviliable date:</p>
                        
                    </div>
                    <div className="col-md-6">
                    <div style={{ height: "100%", width: '100%', minHeight:"400px"}}>
                        <GoogleMapReact
                        defaultCenter={{
                            lat: 25.0171194,
                            lng: 121.4710123
                        }}
                        center={this.props.select[0].geometry}
					    defaultZoom={18}>
                            <Marker
                            lat={this.props.select[0].geometry.lat}
                            lng={this.props.select[0].geometry.lng} 
                            text={""}
                            />
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
            )
        }else{
            return null
        }
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