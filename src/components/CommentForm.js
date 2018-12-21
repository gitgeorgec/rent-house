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
            <div className="col-12 mt-1 p-0" style={this.props.show?{transition:"0.2s",transformOrigin:"top"}:{height:0,transform:"scaleY(0)",transition:"0.2s"}}>
                <h3>comment <button className="btn btn-danger float-right rounded" style={{display:"block"}} onClick={this.props.handleShowCommetFrom}>X</button></h3>
                
            <form onSubmit={this.handleSubmitComment} >
                <textarea rows="10" style={{boxSize:"border-box", width:"100%"}} name="comment" onChange={this.handleChange} id="" value={this.state.comment}/>
                <div>
                    <h1>rate :{this.state.rank}</h1>
                    <input type="range" name="rank" onChange={this.handleChange} value={this.state.rank}  min="1" max="100"/>
                    <button type="submit" className="btn btn-success float-right" style={{display:"block"}}>comment</button>
                </div>
            </form>
            </div>
        )
    } 
}

export default CommentForm