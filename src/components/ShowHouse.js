import React, { Component } from 'react'; 
import { connect } from 'react-redux'
import { selectHouse, clearSelect } from '../store/actions/select'
import { sendSearch } from '../store/actions/search'
import { setDate } from '../store/actions/date'
import GoogleMapReact from 'google-map-react';
import Calender from './Calender'
import Marker from './Marker'
import UserCard from './UserCard'
import { apiCall, URL } from "../service/api"
import OrderForm from './OrderFrom'
import CommentCard from './CommentCard'
class ShowHouse extends Component {
    constructor(props){
        super(props)
        this.state={
            house:"",
        }
    }

    componentWillMount(){
        apiCall("get",`${URL}api/house/${this.props.match.params.id}`)
        .then((house)=>{
            this.setState({
                house
            })
        })
    }

    handleClear=()=>{
        this.props.clearSelect()
    }

    handleOrder=()=>{
        this.props.selectHouse(this.state.house)
    }

    handleStopPropagation=(e)=>{
        e.stopPropagation()
    }

	render(){
        if(!this.state.house){
            return <h1>not found</h1>
        }else{
            return(
                <div className="row mx-auto container position-relative" style={{top:"90px"}} onClick={this.handleStopPropagation}>
                    <div className="col-12">
                        <h1 style={{fontWeight:"bolder"}}>{this.state.house.name}</h1>
                        <h6>{this.state.house.address}</h6>
                    </div>
                    <div className="col-md-6">
                        <img style={{width:"100%",maxHeight:"50vh"}} src={this.state.house.image} alt="" />
                    </div>
                    <div className="col-md-6">
                        <div style={{width:'100%', minHeight:"300px", height:"100%"}}>
                            <GoogleMapReact
                            // bootstrapURLKeys={{ key:"AIzaSyAjQDTCdLCWo2JBZiosUYNEox7R92t_Ts4"}}
                            // defaultCenter={{
                            //     lat: 25.0171194,
                            //     lng: 121.4710123
                            // }}
                            center={
                            // this.state.house.name?
                            this.state.house.geometry
                            // :{lat: 22.0171194,lng: 123.4710123}
                            }
                            defaultZoom={17}>
                                <Marker
                                lat={this.state.house.geometry.lat}
                                lng={this.state.house.geometry.lng} 
                                name={this.state.house.name}
                                img={this.state.house.image}
                                text={""}
                                />
                            </GoogleMapReact>
                        </div>
                    </div>
                    <div className="col-md-12 text-center" style={{fontSize:"1.2rem"}}>
                        <div className="m-2" style={{minHeight:"20vh"}}>
                        <h3>description</h3><hr/>
                        {this.state.house.description}
                        </div>
                    </div>
                    <div className="col-md-8 m-0 text-center">
                    <h3>Landlord</h3><hr/>
                        <UserCard user={this.state.house.owner}/>
                        <h3>comments</h3><hr/>
                        {this.state.house.comments.map(comment=>{
                            return(
                                <CommentCard key={comment._id} comment ={ comment }/>
                            )
                        })}
                    </div>
                    <div className="col-md-4 m-0 text-center">
                        <h3>UnavailableDate</h3><hr/>
                        <Calender unavailableDate={this.state.house.unavailableDate} unselectable/>
                    </div>
                        <button className="btn btn-success m-3 rounded" style={{width:"100%", fontSize:"1.2rem", fontWeight:"bolder"}} onClick={this.handleOrder}>Reserve (price:{this.state.house.price} /night)</button>
                    <div style={{
                        position:"fixed",
                        zIndex:this.props.select.name?"200":"-1", 
                        background:"rgba(0,0,0,0.5)",
                        transition:"0.3s",
                        width:"100vw",
                        height:this.props.select.name?"100vh":0,
                        opacity:this.props.select.name?1:0, 
                        top:0,
                        left:0,
                        overflow:"scroll"}}
                        >
                        <OrderForm {...this.props}/>
                    </div>
                </div>
            )
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

export default connect(mapStateToProps,{ clearSelect, selectHouse, sendSearch,setDate })(ShowHouse)