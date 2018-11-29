import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class MainForm extends Component {
	constructor(props){
		super(props)
		this.state={
			begin:"",
			end:""
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.date[0]){
			let firstDay = nextProps.date[0]
			let lastDay = nextProps.date[nextProps.date.length-1]
			this.setState({
				begin:`${firstDay.year}-${Math.floor((firstDay.month+1)/10)}${(firstDay.month+1)%10}-${Math.floor((firstDay.monthDate+1)/10)}${(firstDay.monthDate+1)%10}`,
				end:`${lastDay.year}-${Math.floor((lastDay.month+1)/10)}${(lastDay.month+1)%10}-${Math.floor((lastDay.monthDate+1)/10)}${(lastDay.monthDate+1)%10}`
			})
		}
	}

	handleSubmit(e){
		e.preventDefault()
		console.log(e.target.adult.value)
		console.log(e.target.child.value)
		console.log(e.target.firstDay.value)
		console.log(e.target.lastDay.value)
		console.log(e.target.distination.value)
		this.props.history.push("/Houses")
	}

	render(){
		return(
			<form style={{background:"rgba(22,22,22,0.7)", color:"#fff"}} className="p-3 shadow rounded" onSubmit={this.handleSubmit.bind(this)}>
				<h3 style={{color:"white"}}>Plan your next jounery</h3>
				<hr/>
				<div className="form-row">
					<div className="form-group col-6">
						<label htmlFor="adultNum">Adult</label>
						<select className="form-control" id="adultNum" name="adult">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
							<option>6</option>
						</select>
					</div>
					<div className="form-group col-6">
						<label htmlFor="childrenNum">Child</label>
						<select className="form-control" id="childrenNum" name="child">
							<option>0</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
							<option>6</option>
						</select>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-12">
						<label htmlFor="beginDay">start</label>
						<input type="date" className="form-control" name="firstDay" id="beginDay" value={this.state.begin} readOnly placeholder="First Day"/>
					</div>
					<div className="form-group col-md-12">
						<label htmlFor="endDay">to</label>
						<input type="date" className="form-control" name="lastDay" id="endDay" value={this.state.end} readOnly placeholder="Last Day"/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-12">
						<label htmlFor="inputCity">distination</label>
						<input type="text" className="form-control" name="distination" id="inputCity"/>
					</div>
				</div>
				<button type="submit" className="btn btn-primary col-12">Find House</button>
			</form>
		)
	}

}

function mapStateToProps(state) {
	return {
		date: state.date,
	}
}


export default withRouter(connect(mapStateToProps)(MainForm));