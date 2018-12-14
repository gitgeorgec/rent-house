import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { sendSearch } from "../store/actions/search"
import { getHouse } from "../store/actions/house"

class MainForm extends Component {
	constructor(props){
		super(props)
		this.state={
			adult:1,
			child:0,
			distination:"",
			begin:"",
			end:""
		}
	}
	componentDidMount(){
		this.setState({
			adult:this.props.search.adult,
			child:this.props.search.child,
			distination:this.props.search.distination?this.props.search.distination:""
		})
	}
	// componentWillReceiveProps(nextProps){
	// 	if(nextProps.date[0]){
	// 		let firstDay = nextProps.date[0]
	// 		let lastDay = nextProps.date[nextProps.date.length-1]
	// 		this.setState({
	// 			begin:`${firstDay.year}-${Math.floor((firstDay.month+1)/10)}${(firstDay.month+1)%10}-${Math.floor((firstDay.monthDate+1)/10)}${(firstDay.monthDate+1)%10}`,
	// 			end:`${lastDay.year}-${Math.floor((lastDay.month+1)/10)}${(lastDay.month+1)%10}-${Math.floor((lastDay.monthDate+1)/10)}${(lastDay.monthDate+1)%10}`
	// 		})
	// 	}
	// }

	static getDerivedStateFromProps(nextProps){
		if(nextProps.date[0]){
			let firstDay = new Date(nextProps.date[0])
			let lastDay = new Date(nextProps.date[nextProps.date.length-1]+86400000)
			return{
				begin:`${firstDay.getFullYear()}-${Math.floor((firstDay.getMonth()+1)/10)}${(firstDay.getMonth()+1)%10}-${Math.floor((firstDay.getDate())/10)}${(firstDay.getDate())%10}`,
				end:`${lastDay.getFullYear()}-${Math.floor((lastDay.getMonth()+1)/10)}${(lastDay.getMonth()+1)%10}-${Math.floor((lastDay.getDate())/10)}${(lastDay.getDate())%10}`
			}
		}else{
			return {
				begin: "yyyy-MM-dd",
				end: "yyyy-MM-dd"
			}
		}
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

	async handleSubmit(e){
		e.preventDefault()
		console.log({...this.state})
		let geometry = ""
		if(this.state.distination){
			geometry = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.distination}&key=AIzaSyAjQDTCdLCWo2JBZiosUYNEox7R92t_Ts4`)
			.then(res=>res.json())
			.then(res=>{
				return res.results[0].geometry.location
			})
		}
		this.props.sendSearch({...this.state,geometry})
		this.props.getHouse("",{...this.state, date:[...this.props.date], geometry})
		if(this.props.location.pathname !== "/Houses")this.props.history.push("/houses")
	}

	render(){
		return(
			<form style={{background:"rgba(22,22,22,0.7)", color:"#fff"}} className="p-3 shadow rounded" onSubmit={this.handleSubmit.bind(this)}>
				<h3 style={{color:"white"}}>Plan your next jounery</h3>
				<hr/>
				<div className="form-row">
					<div className="form-group col-6">
						<label htmlFor="adultNum">Adult</label>
						<select className="form-control" id="adultNum" name="adult" onChange={this.handleChange} value={this.state.adult}>
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
						<select className="form-control" id="childrenNum" name="child" onChange={this.handleChange}>
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
						<input type="text" className="form-control" name="distination" id="inputCity" onChange={this.handleChange} value={this.state.distination}/>
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
		search: state.search
	}
}


export default withRouter(connect(mapStateToProps,{sendSearch, getHouse})(MainForm));