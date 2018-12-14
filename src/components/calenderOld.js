import React, { Component } from 'react';
const month_olympic = [31,29,31,30,31,30,31,31,30,31,30,31];
const month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];
const monthName =["January","Febrary","March","April","May","June","July","Auguest","September","October","November","December"];

class Calender extends Component {
	constructor(props){
		super(props)
		this.state={
			showYear:"",
			showMonth:"",
			showDate:"",
			today:"",
			dateData:[]
		}
	}

	componentWillMount(){
		let time = new Date()
		this.setState({
			showYear: time.getFullYear(),
			showMonth: time.getMonth(),
			showDate: time.getDate(),
			today:time.getTime()
		})
	}

	componentDidMount(){
		this.renderDate(this.state.showYear, this.state.showMonth)
	}

	getStartWeekDay(year, month){
    let startDay = new Date(year,month,1)
    return startDay.getDay()
	}

	getMonthDate(year,month){
    if((year%4===0 && year%100!==0)||(year%400 ===0 && year%3200 !==0)){
        return month_olympic[month]
    }else{
        return month_normal[month]
    }
	}

	getdateTime(year, month,i){
		return new Date(year,month,i)
	}

	renderDate(year, month, selectDay){
    let totalDate = this.getMonthDate(year,month)
		let startDay = this.getStartWeekDay(year, month)
		let leaveDay = 42-startDay-totalDate
		let today = this.state.today
		let arr=[]
		for(let i=0; i< startDay; i++){
			arr.push(<div className="text-center" style={{width:"70px",color:"rgba(0,0,0,0)"}} key={i}>0</div>)
		}
		for(let i=0; i< totalDate; i++){
			if(today<this.getdateTime(year, month,i)){
				arr.push(
				<div 
					className="text-center rounded-circle pointer" 
					style={{width:"70px",color:selectDay===i?"white":"black", background:selectDay===i?"#FE9000":"", transition:"0.2s"}}  
					key={startDay+i} 
					onClick={this.renderDate.bind(this,year,month,i)}
				>
					{i+1}
				</div>)
			} else {
				arr.push(
					<div 
						className="text-center rounded-circle" 
						style={{width:"70px",color:"gray"}}  
						key={startDay+i} 
					>
						{i+1}
					</div>)
			}
		}

		for(let i=0; i<leaveDay; i++){
			arr.push(<div className="text-center" style={{width:"70px",color:"rgba(0,0,0,0)"}} key={totalDate+startDay+i}>00</div>)
		}
		this.setState({
			showYear:year,
			showMonth:month,
			dateData:arr
		})
	}

	handlePrev(){
		this.state.showMonth>1?this.renderDate(this.state.showYear, this.state.showMonth-1):this.renderDate(this.state.showYear-1, 11)
	}

	handleNext(){
		this.state.showMonth<11?this.renderDate(this.state.showYear, this.state.showMonth+1):this.renderDate(this.state.showYear+1, 0)
	}


	render() {
		return (
			<div className="shadow rounded">
				<header>
					<h3 className="text-center d-flex justify-content-between">
						<span onClick={this.handlePrev.bind(this)} className="pointer" style={{color:"#094074"}}>
							<i id="prev" className="fas fa-arrow-circle-left"></i>
						</span>
						&nbsp;{this.state.showYear} {monthName[this.state.showMonth]}&nbsp;
						<span onClick={this.handleNext.bind(this)}  className="pointer" style={{color:"#094074"}}>
							<i id="next" className="fas fa-arrow-circle-right"></i>
						</span>
					</h3>
				</header>
				<div className="col-12 d-flex justify-content-around">
					<div className="badge badge-info">MON</div>
					<div className="badge badge-info">TUE</div>
					<div className="badge badge-info">WED</div>
					<div className="badge badge-info">THU</div>
					<div className="badge badge-info">FRI</div>
					<div className="badge badge-info">SAT</div>
					<div className="badge badge-info">SUN</div>
				</div>
				<div className="col-12 d-flex flex-column">
					<div className="d-flex justify-content-around">{this.state.dateData.filter((date,i)=>i<7)}</div>
					<div className="d-flex justify-content-around">{this.state.dateData.filter((date,i)=>i>6&&i<14)}</div>
					<div className="d-flex justify-content-around">{this.state.dateData.filter((date,i)=>i>13&&i<21)}</div>
					<div className="d-flex justify-content-around">{this.state.dateData.filter((date,i)=>i>20&&i<28)}</div>
					<div className="d-flex justify-content-around">{this.state.dateData.filter((date,i)=>i>27&&i<35)}</div>
					<div className="d-flex justify-content-around">{this.state.dateData.filter((date,i)=>i>34&&i<42)}</div>
				</div>
			</div>
		);
	}
}
    
export default Calender;