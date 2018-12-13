import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { sendSearch } from "../store/actions/search"
import { getHouse } from "../store/actions/house"

class Card extends Component{
    handleClick=()=>{
        this.props.sendSearch({distination:this.props.title, geometry:this.props.geometry })
        this.props.getHouse("",{geometry:this.props.geometry, adult:1})
        this.props.history.push("houses")
    }

    render(){
        return (
            <div className="card" style={{cursor:"pointer"}} onClick={this.handleClick}>
                <div className="card-background" style={{backgroundImage:"url(" + this.props.img + ")"}}>
                    <img className="card-img-top" src={this.props.img} style={{opacity:0}} alt="" ></img>
                </div>
                <div className="card-img-overlay">
                    <p className="card-title text-center" style={{fontSize:"3rem", color:"#fff", fontWeight:"bolder",textShadow:"1px 1px 0 black"}}>{this.props.title}</p>
                </div>
            </div>
        )
    }
}

export default withRouter((connect(null,{sendSearch,getHouse})(Card)))