import React, { Component } from 'react'; 
// import GoogleMap from './GoogleMap'
import { connect } from 'react-redux'
import { clearSelect } from '../store/actions/select'
import GoogleMapReact from 'google-map-react';
import Calender from './Calender'
import Marker from './Marker'
import UserCard from './UserCard'

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
        this.props.history.push("/houses/order/"+this.props.select._id)
        // window.open("./houses/order/"+this.props.select._id)
    }
    
    handleStopPropagation=(e)=>{
        e.stopPropagation()
    }

	render(){
        return(
            <div className="position-fixed" style={{
                zIndex:this.props.select.name?"200":"-1", 
                background:"rgba(0,0,0,0.5)",
                transition:"0.3s",
                width:"100vw",
                height:this.props.select.name?"100vh":0,
                opacity:this.props.select.name?1:0, 
                top:"0%",
                overflow:"scroll"}}
                onClick={this.handleClear}>
                <div className="row p-3 m-3 mx-auto container position-relative" style={{background:"white", minHeight:"90vh", zIndex:"300"}}
                onClick={this.handleStopPropagation}>
                    <h2 className="col-12" style={{fontWeight:"bolder"}}>{this.props.select?this.props.select.name:""}</h2>
                    <span className="position-absolute btn btn-danger border rounded" style={{right:"15px"}} onClick={this.handleClear}>X</span>
                    <hr/>
                    {this.props.select.name?
                    <div className="col-md-6">
                        <img style={{width:"100%",maxHeight:"50vh"}} src={this.props.select.image} alt="" />
                    </div>
                    :""}
                    <div className="col-md-6">
                        <div style={{width:'100%', minHeight:"300px", height:"100%"}}>
                            <GoogleMapReact
                            // bootstrapURLKeys={{ key:"AIzaSyAjQDTCdLCWo2JBZiosUYNEox7R92t_Ts4"}}
                            // defaultCenter={{
                            //     lat: 25.0171194,
                            //     lng: 121.4710123
                            // }}
                            center={
                            // this.props.select.name?
                            this.props.select.geometry
                            // :{lat: 22.0171194,lng: 123.4710123}
                            }
                            defaultZoom={17}>
                                {this.props.select.name?
                                <Marker
                                lat={this.props.select.geometry.lat}
                                lng={this.props.select.geometry.lng} 
                                text={""}
                                />
                                :""}
                            </GoogleMapReact>
                        </div>
                    </div>
                    <div className="col-md-12 text-center" style={{fontSize:"1.2rem"}}>
                        <div className="m-2">
                        <h3>address</h3><hr/>
                        {this.props.select.address}
                        </div>
                        <div className="m-2" style={{minHeight:"20vh"}}>
                        <h3>description</h3><hr/>
                        {this.props.select.description}
                        </div>
                    </div>
                    <div className="col-md-4 m-0 text-center">
                    <h3>Landlord</h3><hr/>
                    {this.props.select.owner?
                        <UserCard user={this.props.select.owner}/>:""}
                    </div>
                    {this.props.select.comments?
                    <div className="col-md-4 m-0 text-center">
                        <h3>comments</h3><hr/>
                        {this.props.select.comments.map(comment=>{
                            return(
                                    <div key={comment._id} className="m-2" style={{display:"flex",justifyContent:"space-around"}}>
                                    <div>
                                        <img className="rounded-circle m-2" style={{width:"75px", height:"75px",background:'#fff'}} src={comment.user.profileImageUrl} alt=""/>
                                    </div>
                                    <div className="m-2" style={{fontSize:"1rem", display:"flex",width:"80%", justifyContent:"space-between", alignItems:"center"}}>
                                        <p>{comment.text}</p>
                                        <p>rate: {comment.rank}</p>
                                    </div>
                                    </div>
                            )
                        })}
                    </div>
                    :""}
                    <div className="col-md-4 m-0 text-center">
                        <h3>UnavailableDate</h3><hr/>
                        <Calender unavailableDate={this.props.select.unavailableDate} unselectable/>
                    </div>
                        <button className="btn btn-success m-3 rounded" style={{width:"100%", fontSize:"1.2rem", fontWeight:"bolder"}} onClick={this.handleOrder}>Reserve (price:{this.props.select.price} /night)</button>
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