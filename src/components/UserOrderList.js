import React, { Component } from 'react'
import { apiCall,URL } from "../service/api"
import OrderCard from "../components/OrderCard"

class OrderList extends Component{

    handleCancelOrder = (e) =>{
        apiCall("delete",`${URL}api/order/${this.props.currentUser.user.id}/${e.target.dataset.id}`)
        .then(res=>{
            if(res._id){
                let orderData = this.props.orders.filter(order=>order._id !== res._id)
                this.props.updateUserOrders(orderData)
            }
        })
      }

    render(){
        return this.props.orders.map(order=>{
            let firstDay = (new Date(order.date[0]))
            let lastDay = (new Date(order.date[order.date.length -1]+86400000))
            let begin = `${firstDay.getFullYear()}-${firstDay.getMonth()+1}-${firstDay.getDate()}`
            let end = `${lastDay.getFullYear()}-${lastDay.getMonth()+1}-${lastDay.getDate()}`
            if(order.house){
                return (
                <OrderCard
                    key= {order._id}
                    begin = {begin}
                    end = {end}
                    order = {order}
                    lastDay = {lastDay}
                    handleCancelOrder = {this.handleCancelOrder}
                />
                )
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
}

export default OrderList