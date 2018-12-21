import React, { Component } from 'react';

class Card extends Component {
    
    handleClick=()=>{
        window.open("./houses/"+this.props.house._id)
    }

    render(){
        return (
            <div className="card border shadow" onClick={this.handleClick} >
                <div className="card-background" style={{backgroundImage:"url(" + this.props.house.image + ")"}}>
                    <img className="card-img-top" src={this.props.house.image}  style={{opacity:0}} alt=""/>
                </div>
                <div className="card-body">
                <h4 className="card-title text-center" style={{fontWeight:"bolder"}}>{this.props.house.name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Address: {this.props.house.address}</li>
                    <li className="list-group-item">Price: {this.props.house.price}</li>
                </ul>
                </div>
            </div>
        )
    }
}

export default (Card)