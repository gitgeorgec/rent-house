import React, { Component } from 'react'
import CommentForm from "../components/CommentForm"
import { apiCall, URL } from "../service/api"

class UserCommentList extends Component{
    constructor(){
        super()
        this.state={
            show:false
        }
    }

    handleRemoveComment=(e)=>{
        apiCall("delete",`${URL}api/comment/${this.props.currentUser.user.id}/${e.target.dataset.id}`)
        .then(res=>{
            if(res._id){
                console.log(res)
                let commentsData = this.props.comments.filter(comment=>comment._id !== res._id)
                let orderData = this.props.orders.map(order=>{
                    if(res.order === order._id){
                        order.rank = null
                    }
                    return order
                })
                this.props.updateUserComments(commentsData)
                this.props.updateUserOrders(orderData)
            }
        })
    }

    handleShowCommetFrom=()=>{
        this.setState({
            show:!this.state.show
        })
    }

    render(){
        const comment = () => {
            let comments = this.props.comments.map(comment=>{
                return (
                <div key={comment._id} className="col-12">
                    <div className="row m-1 pt-2 pb-2 border rounded">
                        <div className="col-sm-4 col-6">
                            <img className="card-img shadow" src={comment.house.image} alt=""/>
                        </div>
                        <div className="col-sm-8 col-6">
                            <h4>{comment.house.name}</h4>
                            <h4>{comment.text}&nbsp;</h4>
                            <div className="m-2 p-1">
                                <div className="btn btn-danger" data-id={comment._id} onClick={this.handleRemoveComment}>DELETE</div>
                            </div>
                        </div>
                    </div>
                </div>)
            })
            let orders = this.props.orders.map(order=>{
                let firstDay = (new Date(order.date[0]))
                let lastDay = (new Date(order.date[order.date.length -1]+86400000))
                let begin = `${firstDay.getFullYear()}-${firstDay.getMonth()+1}-${firstDay.getDate()}`
                let end = `${lastDay.getFullYear()}-${lastDay.getMonth()+1}-${lastDay.getDate()}`
                let today = new Date()
                if(!order.rank&& today>lastDay){
                    return (
                    <div key={order._id} className="col-12">
                        <div className="row m-1 pt-2 pb-2 border rounded">
                            <div className="col-sm-4 col-6">
                                <img className="card-img shadow" src={order.house.image} alt=""/>
                            </div>
                            <div className="col-sm-8 col-6">
                                <h4>{order.house.name}</h4>
                                <div className="m-2 p-1">
                                    from : {begin} afternoon to {end} morning
                                </div>
                                {!this.state.show && <div className="btn btn-success" onClick={this.handleShowCommetFrom}>comment</div>}
                            </div>
                            <div className="col-12 row mx-auto" style={{width:"100%"}}>
                                <CommentForm 
                                house = {order.house} 
                                userId ={this.props.currentUser.user.id} 
                                orderId={order._id}
                                updateUserComments ={this.props.updateUserComments}
                                updateUserOrders = {this.props.updateUserOrders}
                                comments ={this.props.comments}
                                orders = {this.props.orders}
                                show = {this.state.show}
                                handleShowCommetFrom = {this.handleShowCommetFrom}
                                />
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
        return(
            comment()
        )
    }
}

export default UserCommentList