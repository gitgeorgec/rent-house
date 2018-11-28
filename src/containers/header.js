import React, { Component } from 'react';
import Dropdown from '../components/dropdown.js'
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux'


class Header extends Component {
    render() {
      return (
        <header className="back_purple" >
            <nav className="navbar navbar-expand-lg navbar-light">
                <NavLink className="navbar-brand" to="/">
                    <h2 style={{color:"#fff"}}><i className="fas fa-home"></i>Rent House</h2>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Dropdown">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </NavLink>
                <Dropdown {...this.props} />
            </nav>
        </header>
      );
    }
  }

  function mapStateToProps(state){
      return {
          currentUser: state.currentUser
      }
  }
  
  export default connect(mapStateToProps, null)(Header);