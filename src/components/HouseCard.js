import React, { Component } from 'react';
import { connect } from 'react-redux'
import { selectHouse, clearSelect } from '../store/actions/select'

class Card extends Component {
    
    handleClick=()=>{
        this.props.selectHouse([this.props])
    }

    handleClear=()=>{
        console.log("clicl")
        this.props.clearSelect()
    }

    render(){
        return (
            <div className="card border shadow" onClick={this.handleClick} >
                <div className="card-background" style={{backgroundImage:"url(" + this.props.image + ")"}}>
                    <img className="card-img-top" src={this.props.image}  style={{opacity:0}} alt=""/>
                </div>
                <div className="card-body">
                <h4 className="card-title text-center" style={{fontWeight:"bolder"}}>{this.props.name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Address: {this.props.address}</li>
                    <li className="list-group-item">Price: {this.props.price}</li>
                    <li className="list-group-item">Owner: {this.props.owner}</li>
                </ul>
                </div>
                <div className="card-footer">
                <small className="text-muted">rank: {this.props.rank}</small>
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