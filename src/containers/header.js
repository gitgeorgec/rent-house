import React, { Component } from 'react';
import Dropdown from '../components/Dropdown'
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux'


class Header extends Component {
    render() {
      return (
        <header className="back_purple position-fixed" style={{width:"100%", zIndex:100}}>
            <nav className="navbar navbar-expand-lg navbar-light">
                <NavLink className="navbar-brand" to={"/"}>
                    <h2 style={{color:"#fff"}}><i className="fas fa-home"></i>Rent House</h2>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Dropdown">
                    <span className="navbar-toggler-icon"></span>
                </button>
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