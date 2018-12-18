import React, { Component } from 'react';
import { connect } from 'react-redux'
import { selectHouse, clearSelect } from '../store/actions/select'

class Card extends Component {
    
    handleClick=()=>{
        this.props.selectHouse(this.props.house)
    }

    handleClear=()=>{
        this.props.clearSelect()
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

function mapStateToProps(state) {
	return {
		select: state.select
	}
}

export default connect(mapStateToProps,{ selectHouse,clearSelect })(Card)