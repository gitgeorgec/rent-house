import React, { Component } from 'react';
import UserOrderList from "../components/UserOrderList"
import UserCommentList from "../components/UserCommentList"
import UserHouseList from "../components/UserHouseList"
import { apiCall,URL } from "../service/api"

class User extends Component{
  constructor(props){
    super(props)
    this.state={
        page:"order",
        mode:"customer"
    }
  }

  componentWillMount(){
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

  handleModeChange = (e) => {
      this.setState({
          mode:e.target.dataset.mode,
          page:e.target.dataset.mode==='customer'?'order':'house'
      })
  }

  render(){
    return (
        <div className="row mx-auto container shadow" style={{position:"relative", fontWeight:"bolder",top:"90px"}}>  
            <div className="container row m-2">
                <div className="col-md-3 col-4">
                    <img src={this.props.currentUser.user.profileImageUrl} style={{minWidth:"100px", maxWidth:"200px", width:"100%"}} alt=""/>
                    <div className="text-center">
                    ({this.state.mode})
                    </div>
                </div>
                <div className="col-md-9 col-8">
                    <h1>HEllO {this.props.currentUser.user.username}</h1>
                    email: {this.props.currentUser.user.email}
                    <div className="d-flex" style={{width:"100%", flexDirection:"column"}}>
                        <div className="btn btn-info m-1" data-mode="customer" onClick={this.handleModeChange}>CUSTOME MODE</div>
                        <div className="btn btn-warning m-1" data-mode="host"  onClick={this.handleModeChange}>HOST MODE</div>
                    </div>
                </div>
            </div>
            <nav className="nav nav-tabs" id="nav-tab" role="tablist" style={{width:"100%", fontSize:"1rem"}}>
                {/* <div className="nav-item nav-link active" data-toggle="tab" onClick={this.handlePageChange}>user</div> */}
                {this.state.mode==='customer'?
                <React.Fragment>
                    <div className="nav-item nav-link active" data-toggle="tab" onClick={this.handlePageChange}>order</div>
                    <div className="nav-item nav-link" data-toggle="tab" onClick={this.handlePageChange}>comment</div>
                </React.Fragment>
                :<div className="nav-item nav-link active" data-toggle="tab" onClick={this.handlePageChange}>house</div>
                }
            </nav>
            {this.state.mode==='customer'?
            <main style={{width:"100%",minHeight:"80vh"}}>
                {/* {this.state.page==="user"?
                :""} */}
                {this.state.page==="order"?
                <UserOrderList 
                orders = {this.props.user.orders} 
                currentUser={this.props.currentUser}
                updateUserOrders= {this.props.updateUserOrders}/>
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
            : <main style={{width:"100%",minHeight:"80vh"}}>
                {this.state.page==="house"?
                <UserHouseList 
                houses = {this.props.user.houses} 
                currentUser={this.props.currentUser}
                updateUserHouses ={this.props.updateUserHouses}/>
                :""}
            </main>
            }
        </div>

      )
  }
}

export default User