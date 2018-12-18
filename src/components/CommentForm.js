import React, { Component } from 'react'
import { apiCall } from "../service/api"

class CommentForm extends Component{
    constructor(){
        super()
        this.state={
            comment:"",
            rank:0,
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmitComment=(e)=>{
        e.preventDefault()
        const URL = "http://localhost:8081/"
        let data = {
            houseId:this.props.house._id,
            comment:this.state.comment,
            orderId:this.props.orderId,
            rank:this.state.rank
        }
        apiCall("post",`${URL}api/comment/${this.props.userId}/new`,data)
        .then(res=>{
            if(res._id){
                let commentData = [...this.props.comments,res]
                let orderDate = this.props.orders.map(order=>{
                    if(order._id===this.props.orderId){
                        order.rank = this.state.rank
                    }
                    return order
                })
                this.props.updateUserComments(commentData)
                this.props.updateUserOrders(orderDate)
            }
        })
    }
    render(){
        return(
            <form onSubmit={this.handleSubmitComment} >
                <textarea name="comment" onChange={this.handleChange} id="" value={this.state.comment}/>
                <input type="range" name="rank" onChange={this.handleChange} value={this.state.rank}  min="1" max="100"/>
                <button type="submit" className="btn btn-success" style={{display:"block"}}>comment</button>
            </form>
        )
    } 
}

export default CommentForm