import React, { Component } from 'react'; 
import GoogleMap from './GoogleMap'
import { connect } from 'react-redux'
import { clearSelect } from '../store/actions/select'

class ShowHouse extends Component {
    handleClear=()=>{
        this.props.clearSelect()
    }

    handleOrder=()=>{
        this.props.history.push("/houses/order")
    }
	render(){
        if(this.props.select[0]){
            return(
                <div className="row p-3">
                    <h3 className="col-12">{this.props.select[0].name}</h3>
                    <hr/>
                    <div className="col-md-6">
                        <img style={{width:"100%"}} src={this.props.select[0].image} alt="" />
                        <p>address:{this.props.select[0].address}</p>
                        <p>price:{this.props.select[0].price}</p>
                        <p>owner:{this.props.select[0].owner}</p>
                        <p>aviliable date:</p>
                    </div>
                    <div className="col-md-6">
                        {/* <GoogleMap /> */}
                    </div>
                    <button className="col-12 btn btn-success" onClick={this.handleOrder}>order</button>
                    <button className="col-12 btn btn-danger" onClick={this.handleClear}>cancel</button>
                </div>
            )
        }else{
            return null
        }
	}

}

function mapStateToProps(state) {
	return {
        select: state.select,
        date: state.date
	}
}

export default connect(mapStateToProps,{ clearSelect })(ShowHouse)