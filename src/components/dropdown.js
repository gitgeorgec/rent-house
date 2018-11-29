import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { logout } from '../store/actions/auth'
import { connect } from 'react-redux'

class Dropdown extends Component {
    handleLogout(){
        if(this.props.logout){
            this.props.logout()
        }
    }

    render() {
      return (
        <div className="collapse navbar-collapse justify-content-end" id="Dropdown">
            <ul className="navbar-nav" style={{color:"#fff"}}>
                {this.props.currentUser.isAuthenticated?
                <React.Fragment>
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
                        <Link className="nav-link" to="/" onClick={this.handleLogout.bind(this)}>
                        <i className="fas fa-sign-out-alt"></i> Log Out
                        </Link>
                    </li>
                </React.Fragment>:
                <React.Fragment>
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
                </React.Fragment>}
            </ul>

        </div>
      )
    }
}

export default connect(null, { logout })(Dropdown);