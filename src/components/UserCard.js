import React ,{ Component } from 'react'


class UserCard extends Component{

    render(){
        return(
        <div className="clearfix p-2" style={{width:"100%",fontSize:"1rem", fontWeight:"bold",height:"15vh", minHeight:"120px"}}>
            <img className="float-left rounded-circle mr-3" src={this.props.user.profileImageUrl} style={{width:"75px", maxHeight:"75px"}} alt=""/>
            <div>
            name: {this.props.user.username} <br/>
            email: {this.props.user.email}
            </div>
        </div>
        )
    }
}

export default UserCard