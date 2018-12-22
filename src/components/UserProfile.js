import React ,{ Component } from 'react'

class UserProfile extends Component{

    render(){
        return(
        <div className="container row m-2">
            <div className="col-3">
                <img src={this.props.user.profileImageUrl} style={{minWidth:"100px", maxWidth:"200px", width:"100%"}} alt=""/>
                email: {this.props.user.email}
            </div>
            <div className="col-9">
                <h1>HEllO {this.props.user.username}</h1>
                <div className="d-flex" style={{width:"100%", flexDirection:"column"}}>
                    <div className="btn btn-warning m-1">edit</div>
                    <div className="btn btn-info m-1">click</div>
                </div>
            </div>
        </div>
        )
    }
}

export default UserProfile