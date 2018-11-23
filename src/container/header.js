import React, { Component } from 'react';
import Dropdown from '../component/dropdown.js'
// import {NavLink} from 'react-router-dom';

class Header extends Component {
    render() {
      return (
        <header className="back_purple" >
            <nav className="navbar navbar-expand-lg navbar-light">
                {/* <NavLink className="navbar-brand" to="/">
                </NavLink> */}
                <h2><i className="fas fa-home"></i>Rent House</h2>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Dropdown">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Dropdown {...this.props} />
            </nav>
        </header>
      );
    }
  }
  
  export default Header;