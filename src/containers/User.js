import React, { Component } from 'react';
import { apiCall } from "../service/api"

class User extends Component{
  constructor(props){
    super(props)
    this.state={
        houses:[],
        orders:[],
        page:"user"
    }
  }

  componentWillMount(){
    const URL = "http://localhost:8081/"
    apiCall("get", `${URL}api/user/${this.props.currentUser.user.id}/`)
    .then((res)=>{
        this.setState({
            houses:res.houses,
            orders:res.orders
        })
    })
  }

  handlePageChange = (e) =>{
      this.setState({
          page:e.target.innerText
        })
  }

  render(){
    const user = () =>{
        return (
        <div className="row">
            <div className="col-md-3" style={{maxWidth:"150px", borderRadius:"50%"}}>
                <img src={this.props.currentUser.user.profileImageUrl ||`https://robohash.org/${this.props.currentUser.user.id}?size=200x200`} alt="profileImageUrl" style={{width:"100%", borderRadius:"50%"}}/>
            </div>
            <div className="col-md-9 p-2" style={{fontSize:"1rem"}}>
                <table>
                <tbody>
                    <tr>
                        <td>Username:</td>
                        <td> {this.props.currentUser.user.username}</td>
                    </tr>
                    <tr>
                        <td className="text-right">email:</td>
                        <td> {this.props.currentUser.user.email}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>)
    }

    const order = () => {
        return this.state.orders.map(order=>{
            let firstDay = (new Date(order.date[0]))
            let lastDay = (new Date(order.date[1]))
            let begin = `${firstDay.getFullYear()}-${firstDay.getMonth()+1}-${firstDay.getDate()}`
            let end = `${lastDay.getFullYear()}-${lastDay.getMonth()+1}-${lastDay.getDate()}`
            return (
            <div key={order._id} className="col-12">
                <div className="row m-1 pt-2 pb-2 border rounded">
                    <div className="col-sm-4 col-6">
                        <img className="card-img shadow" src={order.house.image} alt=""/>
                    </div>
                    <div className="col-sm-8 col-6">
                        <h4>{order.house.name}&nbsp;</h4>
                        Address: {order.house.address} <br/>
                        Price: ${order.house.price}
                        <div className="m-2 p-1">
                        <span className="float-right d-inline-block">
                        from : {begin} to {end}
                        </span>
                        </div>
                    </div>
                </div>
            </div>)
        })
    }

    const house = () => {
        return this.state.houses.map(house=>{
            return (
            <div key={house._id} className="col-12">
                <div className="row m-1 pt-2 pb-2 border rounded">
                    <div className="col-sm-4 col-6">
                        <img className="card-img shadow" src={house.image} alt=""/>
                    </div>
                    <div className="col-sm-8 col-6">
                        <h4>{house.name}&nbsp;</h4>
                        Address: {house.address} <br/>
                        Price: ${house.price}
                    </div>
                </div>
            </div>)
        })
    }

    const comment = () => {
        return (
            <div>
                comment
            </div>
        )
    }

    return (
        <div className="row mx-auto container mt-2 shadow" style={{position:"relative", fontWeight:"bolder"}}>  
                <nav className="nav nav-tabs" id="nav-tab" role="tablist" style={{width:"100%", fontSize:"1rem"}}>
                    <div className="nav-item nav-link active" data-toggle="tab" onClick={this.handlePageChange}>user</div>
                    <div className="nav-item nav-link" data-toggle="tab" onClick={this.handlePageChange}>order</div>
                    <div className="nav-item nav-link" data-toggle="tab" onClick={this.handlePageChange}>house</div>
                    <div className="nav-item nav-link" data-toggle="tab" onClick={this.handlePageChange}>comment</div>
                </nav>
            <main style={{width:"100%",minHeight:"80vh"}}>
                {this.state.page==="user"?user():""}
                {this.state.page==="order"?order():""}
                {this.state.page==="house"?house():""}
                {this.state.page==="comment"?comment():""}
            </main>
            
        </div>
      )
  }
}

export default User