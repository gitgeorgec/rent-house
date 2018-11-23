import React, { Component } from 'react';
// import {NavLink, Link } from 'react-router-dom';



class Dropdown extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:"",
        }
    }

    handleClick=()=>{
        if(this.props.add){
            this.props.add()
        }
    }

    handleLogout(e){
        if(this.props.logout){
            this.props.logout()
        }
    }

    render() {

      return (
        <div className="collapse navbar-collapse justify-content-end" id="Dropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                    {/* <NavLink exact className="nav-link" to="/"> */}
                    {/* </NavLink> */}
                    <i className="fas fa-home"></i> Home
                </li>
                <li className="nav-item">
                    {/* <NavLink exact className="nav-link" to="/search"> */}
                    {/* </NavLink> */}
                    <i className="fas fa-search"></i> Search
                </li>
                <li className="nav-item">
                    {/* <NavLink exact className="nav-link" to="/user"> */}
                    {/* </NavLink> */}
                    <i className="fas fa-user"></i> User
                </li>
                <li className="nav-item">
                    {/* <NavLink exact className="nav-link" to="/about"> */}
                    {/* </NavLink> */}
                    <i className="fas fa-book"></i> About
                </li>
                <li className="nav-item">
                    {/* {/* <Link className="nav-link" to="/" onClick={this.handleLogout.bind(this)}> */}
                    {/* </Link> */}
                    <i className="fas fa-sign-out-alt"></i> Log Out
                </li>
                 
            </ul>

        </div>
      )
    }
}

export default Dropdown;