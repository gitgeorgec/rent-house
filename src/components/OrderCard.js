import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'

class Orderpage extends Component{
  constructor(){
    super()
    this.state={
        show:false
    }
  }

  handleShowMore=()=>{
    this.setState({
      show:!this.state.show
    })
  }
	
  render(){
    const { order, begin, end, handleCancelOrder} = this.props
    const today = new Date()
    if(this.props.userControl){
      return (
        <div className="col-12 m-1 pt-2 pb-2 rounded border" style={today>this.props.lastDay?{opacity:"0.5"}:{}}>
          <span style={{fontSize:"1.5vw"}} onClick={this.handleShowMore}>ORDERNUMBER: {order._id}</span>  <br/>
          <span style={{fontSize:"1.2vw"}}>from:{begin} afternoon to:{end} morning</span> 
          <hr/>
            {this.state.show?
              <div className="clearfix" style={{fontSize:"1.2vw", transition:"0.2s"}}>
                customerName: {order.customer.username} <br/>
                customerPhone: {order.customerPhone} <br/>
                customerEmail: {order.customerEmail} <br/>
                accommodate: adult: {order.accommodate.adult} &nbsp; child: {order.accommodate.child} <br/>
                specialRequest: {order.specialRequest} <br/>
                <span style={{color:"red"}}>TOTAL &nbsp; <span style={{fontWeight:"bolder"}}>{order.date.length}</span> &nbsp; NIGHT <br/></span>
                <span style={{color:"red"}}> TOTAL PRICE: {order.house.price * order.date.length}</span>
                <div className="btn btn-secondary rounded float-right" data-id={order._id} onClick={this.handleShowMore}>{this.state.show?"show less":"show more"}</div>
              </div>
            :<div className="btn btn-secondary rounded" data-id={order._id} onClick={this.handleShowMore}>{this.state.show?"show less":"show more"}</div>}
          </div>
      )
    }else{
      return (
        <div className="col-12 m-1 pt-2 pb-2 rounded border" style={today>this.props.lastDay?{opacity:"0.5"}:{}}>
        <h2 style={{fontWeight:"bold"}}>{order.house.name} <span style={{fontSize:"0.8rem"}}>ORDERNUMBER: {order._id}</span></h2>
        <hr/>
            <div className="row">
                <div className={this.state.show?"col-md-6 col-12":"col-sm-4 col-6"} style={{transition:"0.5s"}}>
                    <img className="card-img shadow" style={{maxHeight:"50vh"}} src={order.house.image} alt=""/>
                </div>
                <div className={this.state.show?"col-md-6 col-12":""} style={{maxHeight:"50vh",minHeight:"200px"}}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key:"AIzaSyAjQDTCdLCWo2JBZiosUYNEox7R92t_Ts4"}}
                  center={
                  this.props.order.house.geometry
                  }
                  defaultZoom={17}>
                      <Marker
                      lat={this.props.order.house.geometry.lat}
                      lng={this.props.order.house.geometry.lng} 
                      text={""}
                      />
                  </GoogleMapReact>
                </div>
                <div className={this.state.show?"col-12":"col-sm-8 col-6"}>
                  {this.state.show?<div className="row" style={{fontSize:"2vw"}}>
                  <div className="col-6">
                    customerName: {order.customer.username} <br/>
                    customerPhone: {order.customerPhone} <br/>
                    customerEmail: {order.customerEmail} <br/>
                    adult: {order.accommodate.adult} &nbsp; child: {order.accommodate.child} <br/>
                    specialRequest: {order.specialRequest} <br/>
                  </div>
                  <div className="col-6">
                    ADDRESS: {order.house.address} <br/>
                    {begin} to {end} <br/>
                    TOTAL {order.date.length} NIGHT <br/>
                    OwnerName: {order.houseOwner.username} <br/>
                    OwnerEmail: {order.houseOwner.email} <br/>
                    <span style={{float:"right"}}>TOTAL PRICE: {order.house.price * order.date.length} <br/></span>
                  </div>
                  </div>:
                  <div style={{fontSize:"2vw"}}>
                    <div>from:<br/>{begin} afternoon <br/> 
                    to:<br/>{end} morning</div>
                  </div>}
                    {this.state.show?
                      <div className="d-flex p-0 justify-content-between col-12">
                        <div className="btn btn-info" onClick={this.handleShowMore}>show less</div>
                        {today<this.props.lastDay && <div className="btn btn-danger" data-id={order._id} onClick={handleCancelOrder}>cancel</div>}
                      </div>
                    :<div className="btn btn-info" data-id={order._id} onClick={this.handleShowMore}>show more</div>
                    }
                </div>
            </div>
        </div>
      )
    }
  }
}

export default Orderpage