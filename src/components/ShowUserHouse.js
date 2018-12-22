import React, { Component } from 'react'; 
import { connect } from 'react-redux'
import { selectHouse, clearSelect } from '../store/actions/select'
import { apiCall, URL } from "../service/api"
import GoogleMapReact from 'google-map-react';
import Calender from './Calender'
import Marker from './Marker'
import CommentCard from './CommentCard'
import OrderCard from "./OrderCard"
class ShowHouse extends Component {
    constructor(props){
        super(props)
        this.state={
            house:"",
        }
    }

    componentWillMount(){
        apiCall("get",`${URL}api/user/${this.props.currentUser.user.id}/house/${this.props.match.params.id}`)
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
                <div className="row mx-auto position-relative" style={{top:"90px"}} onClick={this.handleStopPropagation}>
                    <div className="col-12 text-center">
                        <h1 style={{fontWeight:"bolder"}}>{this.state.house.name}</h1>
                        <hr/>
                    </div>
                    <div className="col-md-3">
                        <img style={{width:"100%",maxHeight:"50vh"}} src={this.state.house.image} alt="" />
                        <h6>{this.state.house.address}</h6>
                        <div className="m-2" style={{minHeight:"20vh"}}>
                            <h3>description</h3><hr/>
                            {this.state.house.description}
                            <h3>UnavailableDate</h3><hr/>
                            <Calender unavailableDate={this.state.house.unavailableDate} unselectable/>
                        </div>
                    </div>
                    <div className="col-md-9 row" style={{fontSize:"1.2rem"}}>
                        <div className="col-md-8 m-0">
                            <h3 className="text-center">Orders</h3> <hr/>
                            {this.state.house.orders.map(order=>{
                                let firstDay = (new Date(order.date[0]))
                                let lastDay = (new Date(order.date[order.date.length -1]+86400000))
                                let begin = `${firstDay.getFullYear()}-${firstDay.getMonth()+1}-${firstDay.getDate()}`
                                let end = `${lastDay.getFullYear()}-${lastDay.getMonth()+1}-${lastDay.getDate()}`
                                return (
                                    <OrderCard
                                    key= {order._id}
                                    begin = {begin}
                                    end = {end}
                                    order = {order}
                                    lastDay = {lastDay}
                                    userControl
                                    />
                                    )
                                })}
                        </div>
                        <div className="col-md-4 m-0 text-center">
                            <h3>Comments</h3><hr/>
                            {this.state.house.comments.map(comment=>{
                                return(
                                    <CommentCard key={comment._id} comment ={ comment }/>
                                )
                            })}
                            <div style={{width:'100%', minHeight:"300px", height:"100%", maxHeight:"600px"}}>
                                <GoogleMapReact
                                center={
                                    this.state.house.geometry
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

export default connect(mapStateToProps,{ clearSelect, selectHouse })(ShowHouse)