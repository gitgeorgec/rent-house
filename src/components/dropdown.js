import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

class Dropdown extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:"",
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
            <ul className="navbar-nav" style={{color:"#fff"}}>
                <li className="nav-item" style={{marginLeft:"1rem"}}>
                    <NavLink exact className="nav-link" to="/">
                    <i className="fas fa-home"></i> Home
                    </NavLink>
                </li>
                <li className="nav-item" style={{marginLeft:"1rem"}}>
                    <NavLink exact className="nav-link" to="/search">
                    <i className="fas fa-search"></i> Search
                    </NavLink>
                </li>
                <li className="nav-item" style={{marginLeft:"1rem"}}>
                    <NavLink exact className="nav-link" to="/user">
                    <i className="fas fa-user"></i> User
                    </NavLink>
                </li>
                <li className="nav-item" style={{marginLeft:"1rem"}}>
                    <NavLink exact className="nav-link" to="/about">
                    <i className="fas fa-book"></i> About
                    </NavLink>
                </li>
                <li className="nav-item" style={{marginLeft:"1rem"}}>
                    <NavLink exact className="nav-link" to="/signup">
                    <i className="fas fa-book"></i> signup
                    </NavLink>
                </li>
                <li className="nav-item" style={{marginLeft:"1rem"}}>
                    <NavLink exact className="nav-link" to="/signin">
                    <i className="fas fa-book"></i> signin
                    </NavLink>
                </li>
                <li className="nav-item" style={{marginLeft:"1rem"}}>
                    <Link className="nav-link" to="/" onClick={this.handleLogout.bind(this)}>
                    <i className="fas fa-sign-out-alt"></i> Log Out
                    </Link>
                </li>
                 
            </ul>

        </div>
      )
    }
}

export default Dropdown;