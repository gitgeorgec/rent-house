import React, { Component } from 'react';

class MainForm extends Component {
	constructor(props){
		super(props)
		this.state={
			begin:"",
			end:""
		}
	}

	render(){
		return(
			<form style={{background:"rgba(22,22,22,0.7)", color:"#fff"}} className="p-3 shadow rounded">
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
						<input type="date" className="form-control" id="beginDay" value={this.state.begin} readOnly/>
					</div>
					<div className="form-group col-md-12">
						<label htmlFor="endDay">to</label>
						<input type="date" className="form-control" id="endDay" value={this.state.end} readOnly/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-12">
						<label htmlFor="inputCity">distination</label>
						<input type="text" className="form-control" id="inputCity"/>
					</div>
				</div>
				<button type="submit" className="btn btn-primary col-12">Sign in</button>
			</form>
		)
	}

}
export default MainForm;