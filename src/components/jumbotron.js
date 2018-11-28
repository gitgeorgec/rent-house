import React, { Component } from 'react';
import MainFrom from './mainform'
import Calender from "../components/calender"
class Jumbo extends Component {

	render(){
		return(
			<div className="container shadow position-relative" style={{background:"rgba(255,255,255,0.8)", top: "3rem"}}>
				<div className="jumbotron position-relative" style={{background:"rgba(0,0,0,0)"}}>
					<h1 className="display-3 text">RENT HOUSE</h1>
					<p className="lead">The best way to find a house and start a vacation</p>
					<div className="row mx-auto">
						<div className="col-md-1 d-md-block d-sm-none"></div>
						<div className="col-md-5 col-sm-10 col-xs-12">
							<MainFrom />
						</div>
						<div className="col-md-5 col-sm-10 col-xs-12 rounded">
							<h2 className="text-center m-2">Select your day</h2>
							<Calender />
						</div>
					</div>
				</div>
			</div>
		)
	}

}
export default Jumbo;