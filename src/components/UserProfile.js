import React ,{ Component } from 'react'

class UserProfile extends Component{

    render(){
        return(
        <div className="container row m-2">
            <div className="col-3">
                <img src={this.props.user.profileImageUrl} style={{minWidth:"100px", maxWidth:"300px", width:"100%"}} alt=""/>
                email: {this.props.user.email}
            </div>
            <div className="col-9">
                <h1>HEllO I am {this.props.user.username}</h1>
            </div>
            <div className="col-12 d-flex" style={{width:"100%", flexDirection:"column"}}>
                <div className="btn btn-warning m-1">edit</div>
                <div className="btn btn-info m-1">click</div>
                <div className="btn btn-success m-1">hello</div>
            </div>
        </div>
        )
    }
}

export default UserProfile