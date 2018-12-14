import React, { Component } from 'react';
import CommentForm from "../components/CommentForm"
import { apiCall } from "../service/api"

class User extends Component{
  constructor(props){
    super(props)
    this.state={
        houses:[],
        orders:[],
        comments:[],
        page:"user"
    }
  }

  componentWillMount(){
    const URL = "http://localhost:8081/"
    apiCall("get", `${URL}api/user/${this.props.currentUser.user.id}/`)
    .then((res)=>{
        this.setState({
            houses:res.houses,
            orders:res.orders,
            comments:res.comments
        })
    })
  }

  handlePageChange = (e) =>{
      this.setState({
          page:e.target.innerText
        })
  }

  handleRemoveHouse = (e) =>{
    const URL = "http://localhost:8081/"
    apiCall("delete",`${URL}api/user/${this.props.currentUser.user.id}/house/${e.target.dataset.id}`)
    .then(res=>{
        if(res._id){
            let houseData = this.props.houses.data.filter(house=>house._id !== res._id)
            this.props.loadHosues(houseData)
            let filterState = this.state.houses.filter(house=>house._id !== res._id)
            this.setState({
                houses:filterState
            })
        }
    })
  }

  handleCancelOrder = (e) =>{
    const URL = "http://localhost:8081/"
    apiCall("delete",`${URL}api/order/${this.props.currentUser.user.id}/${e.target.dataset.id}`)
    .then(res=>{
        if(res._id){
            let filterState = this.state.orders.filter(order=>order._id !== res._id)
            this.setState({
                orders:filterState
            })
        }
    })
  }

  handleRemoveComment=(e)=>{
    const URL = "http://localhost:8081/"
    apiCall("delete",`${URL}api/comment/${this.props.currentUser.user.id}/${e.target.dataset.id}`)
    .then(res=>{
        if(res._id){
            let filterState = this.state.comments.filter(comment=>comment._id !== res._id)
            this.setState({
                comments:filterState
            })
        }
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
            let lastDay = (new Date(order.date[order.date.length -1]+86400000))
            let begin = `${firstDay.getFullYear()}-${firstDay.getMonth()+1}-${firstDay.getDate()}`
            let end = `${lastDay.getFullYear()}-${lastDay.getMonth()+1}-${lastDay.getDate()}`
            if(order.house){
                return (
                <div key={order._id} className="col-12">
                    <div className="row m-1 pt-2 pb-2 border rounded">
                        <div className="col-sm-4 col-6">
                            <img className="card-img shadow" src={order.house.image} alt=""/>
                        </div>
                        <div className="col-sm-8 col-6">
                            <h4>{order.house.name}&nbsp;</h4>
                            Address: {order.house.address} <br/>
                            Price: ${order.price}
                            <div className="m-2 p-1">
                                <span className="float-right d-inline-block">
                                from : {begin} afternoon to {end} morning
                                <div className="btn btn-danger" data-id={order._id} onClick={this.handleCancelOrder}>cancel</div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>)
            }else {
                return (
                <div key={order._id} className="col-12">
                    <div className="row m-1 pt-2 pb-2 rounded" style={{border:"1px solid red"}}>
                        <div className="col-sm-3 col-6">
                            <img className="card-img shadow" src={order.houseOwner.profileImageUrl} alt=""/>
                        </div>
                        <div className="col-sm-9 col-6">
                            <h4>House had been removed</h4>
                            phouse owner contact<br/>
                            email:{order.houseOwner.email}<br/>
                            name:{order.houseOwner.username}   
                            <div className="m-2 p-1">
                                <span className="float-right d-inline-block">
                                from : {begin} to {end}
                                <div className="btn btn-danger" data-id={order._id} onClick={this.handleCancelOrder}>cancel</div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>)
            }
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
                        <div className="m-2 p-1">
                            <div className="btn btn-danger" data-id={house._id} onClick={this.handleRemoveHouse}>DELETE</div>
                        </div>
                    </div>
                </div>
            </div>)
        })
    }

    const comment = () => {
        let comments = this.state.comments.map(comment=>{
            return (
            <div key={comment._id} className="col-12">
                <div className="row m-1 pt-2 pb-2 border rounded">
                    <div className="col-sm-4 col-6">
                        <img className="card-img shadow" src={comment.house.image} alt=""/>
                    </div>
                    <div className="col-sm-8 col-6">
                        <h4>{comment.text}&nbsp;</h4>
                        <div className="m-2 p-1">
                            <div className="btn btn-danger" data-id={comment._id} onClick={this.handleRemoveComment}>DELETE</div>
                        </div>
                    </div>
                </div>
            </div>)
        })
        let orders = this.state.orders.map(order=>{
            let firstDay = (new Date(order.date[0]))
            let lastDay = (new Date(order.date[order.date.length -1]+86400000))
            let begin = `${firstDay.getFullYear()}-${firstDay.getMonth()+1}-${firstDay.getDate()}`
            let end = `${lastDay.getFullYear()}-${lastDay.getMonth()+1}-${lastDay.getDate()}`
            let today = new Date()
            if(!order.rank){
                // && today>lastDay
                return (
                <div key={order._id} className="col-12">
                    <div className="justify-content-center rounded" style={{background:"rgba(0,0,0,0.3", position:"absolute", height:"100%",width:"100%",left:0, zIndex:10, display:"flex", alignItems:"center"}}>
                    <CommentForm houseId = {order.house._id} userId ={this.props.currentUser.user.id} orderId={order._id}/>
                    </div>
                    <div className="row m-1 pt-2 pb-2 border rounded">
                        <div className="col-sm-4 col-6">
                            <img className="card-img shadow" src={order.house.image} alt=""/>
                        </div>
                        <div className="col-sm-8 col-6">
                            <h4>{order.house.name}</h4>
                            <div className="m-2 p-1">
                                from : {begin} afternoon to {end} morning
                            </div>
                        </div>
                    </div>
                </div>)
            }else {
                return null
            }
        })
        return (
        <div>
            {orders}
            {comments}
        </div>)
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