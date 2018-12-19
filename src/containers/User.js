import React, { Component } from 'react';
import UserOrderList from "../components/UserOrderList"
import UserCommentList from "../components/UserCommentList"
import UserHouseList from "../components/UserHouseList"
import { apiCall } from "../service/api"
import UserCard from '../components/UserCard'

class User extends Component{
  constructor(props){
    super(props)
    this.state={
        page:"user"
    }
  }

  componentWillMount(){
    const URL = "http://localhost:8081/"
    apiCall("get", `${URL}api/user/${this.props.currentUser.user.id}/`)
    .then((res)=>{
        this.props.updateUserHouses(res.houses)
        this.props.updateUserOrders(res.orders)
        this.props.updateUserComments(res.comments)
    })
  }

  handlePageChange = (e) =>{
    this.setState({
        page:e.target.innerText
    })
  }

  render(){
    // const user = () =>{
    //     return (
    //     <div className="row">
    //         <div className="col-md-3" style={{maxWidth:"150px", borderRadius:"50%"}}>
    //             <img src={this.props.currentUser.user.profileImageUrl ||`https://robohash.org/${this.props.currentUser.user.id}?size=200x200`} alt="profileImageUrl" style={{width:"100%", borderRadius:"50%"}}/>
    //         </div>
    //         <div className="col-md-9 p-2" style={{fontSize:"1rem"}}>
    //             <table>
    //             <tbody>
    //                 <tr>
    //                     <td>Username:</td>
    //                     <td> {this.props.currentUser.user.username}</td>
    //                 </tr>
    //                 <tr>
    //                     <td className="text-right">email:</td>
    //                     <td> {this.props.currentUser.user.email}</td>
    //                 </tr>
    //             </tbody>
    //             </table>
    //         </div>
    //     </div>)
    // }

    return (
        <div className="row mx-auto container shadow" style={{position:"relative", fontWeight:"bolder",top:"90px"}}>  
                <nav className="nav nav-tabs" id="nav-tab" role="tablist" style={{width:"100%", fontSize:"1rem"}}>
                    <div className="nav-item nav-link active" data-toggle="tab" onClick={this.handlePageChange}>user</div>
                    <div className="nav-item nav-link" data-toggle="tab" onClick={this.handlePageChange}>order</div>
                    <div className="nav-item nav-link" data-toggle="tab" onClick={this.handlePageChange}>house</div>
                    <div className="nav-item nav-link" data-toggle="tab" onClick={this.handlePageChange}>comment</div>
                </nav>
            <main style={{width:"100%",minHeight:"80vh"}}>
                {this.state.page==="user"?
                // user()
                <UserCard user={this.props.currentUser.user}/>
                :""}
                {this.state.page==="order"?
                <UserOrderList 
                orders = {this.props.user.orders} 
                currentUser={this.props.currentUser}
                updateUserOrders= {this.props.updateUserOrders}/>
                :""}
                {this.state.page==="house"?
                <UserHouseList 
                houses = {this.props.user.houses} 
                currentUser={this.props.currentUser}
                updateUserHouses ={this.props.updateUserHouses}/>
                :""}
                {this.state.page==="comment"?
                <UserCommentList 
                comments = {this.props.user.comments} 
                orders = {this.props.user.orders} 
                currentUser={this.props.currentUser}
                updateUserComments = {this.props.updateUserComments}
                updateUserOrders= {this.props.updateUserOrders}/>
                :""}
            </main>
        </div>

      )
  }
}

export default User