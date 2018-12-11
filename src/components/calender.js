import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setDate } from '../store/actions/date'

const month_olympic = [31,29,31,30,31,30,31,31,30,31,30,31];
const month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];
const monthName =["January","Febrary","March","April","May","June","July","Auguest","September","October","November","December"];

class Calender extends Component {
	constructor(props){
		super(props)
		this.state={
			showYear:"",
			showMonth:"",
			today:"",
			dateData:[],
			dataIndicate:0,
			firstClick:true,
		}
	}

	componentWillMount(){
		let time = new Date()
		let dates = this.addMonthDate(time.getFullYear(), time.getMonth())
		this.setState({
			showYear: time.getFullYear(),
			showMonth: time.getMonth(),
			showDate: time.getDate(),
			today:time.getTime(),
			dateData:dates
		})
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

	addMonthDate(year, month){
		let arr = this.state.dateData.splice("")
		let monthDate = this.getMonthDate(year,month)
		let startDay = this.getStartWeekDay(year, month)
		let leaveDay = 42-startDay-monthDate
		let selectedDateTime = this.props.date
		for(let i=0; i< startDay; i++){
			arr.push({year,month,monthDate:-1,select:false})
		}
		for(let i=0; i<monthDate;i++){
			let time = new Date(year,month,i+1).getTime()
			arr.push({
				year,
				month,
				monthDate:i,
				time:new Date(year,month,i+1).getTime(),
				select:selectedDateTime.indexOf(time)<0?false:true})
		}
		for(let i=0; i<leaveDay; i++){
			arr.push({year,month,monthDate:-1,select:false})
		}
		return arr
	}

	createElem(idx){
		let date = this.state.dateData
		let startIdx = idx*42
		let arr=[]
		for(let i=startIdx;i<startIdx+42;i++){
			if(date[i].monthDate+1!==0){
				if(date[i].time<this.state.today){
					arr.push(<div className="text-center" style={{width:"70px",color:"rgba(0,0,0,0.5)"}} key={i}>{date[i].monthDate+1}</div>)
				}else{
					arr.push(<div 
					className="text-center pointer" 
					style={{
						width:"70px",
						color:date[i].select?"white":"black", 
						background:date[i].select?"#FE9000":"", 
						border:this.props.date.indexOf(parseInt(date[i].time))>-1?"1px soild black":"",
						transition:"0.2s"}}  
					key={i}
					data-time={date[i].time}
					onClick={this.handleClick.bind(this)}
					>
						{date[i].monthDate+1}
					</div>)
				}
			}else{
				arr.push(<div className="text-center" style={{width:"70px",color:"rgba(0,0,0)"}} key={i}></div>)
			}
		}
		return arr
	}

	handleNext(){
		if(this.state.showMonth<11){
			this.setState({
				showMonth:this.state.showMonth+1,
				dataIndicate:this.state.dataIndicate +1,
				dateData:this.state.dateData.length/42-1 === this.state.dataIndicate?this.addMonthDate(this.state.showYear, this.state.showMonth+1):this.state.dateData
			})
		}else{
			this.setState({
				showYear:this.state.showYear +1,
				showMonth:0,
				dataIndicate:this.state.dataIndicate +1,
				dateData:this.state.dateData.length/42-1 === this.state.dataIndicate?this.addMonthDate(this.state.showYear+1, 0):this.state.dateData
			})
		}
	}

	handlePrev(){
		if(this.state.showMonth>0){
			this.setState({
				showMonth:this.state.showMonth-1,
				dataIndicate:this.state.dataIndicate -1,
			})
		}else{
			this.setState({
				showYear:this.state.showYear -1,
				showMonth:11,
				dataIndicate:this.state.dataIndicate -1,
			})
		}
	}

	handleClick(e){
		let selectData
		if(this.state.firstClick){
			selectData = this.state.dateData.map(i=>i.time === parseInt(e.target.dataset.time)||i.time === parseInt(e.target.dataset.time)+86400000?{...i, select:true}:{...i, select:false})
		}else{
			let beginDay = this.state.dateData.find(i=>i.select ===true)
			if(e.target.dataset.time>beginDay.time){
				selectData = this.state.dateData.map(i=>i.time >=beginDay.time&& i.time <=parseInt(e.target.dataset.time)?{...i, select:true}:{...i, select:false})
			}else if(e.target.dataset.time<beginDay.time){
				selectData = this.state.dateData.map(i=>i.time <=beginDay.time&& i.time >=parseInt(e.target.dataset.time)?{...i, select:true}:{...i, select:false})
			}else{
				selectData = this.state.dateData
			}
		}
		this.props.setDate(selectData.filter(i=>i.select).map(i=>i.time))
		this.setState({
			firstClick:!this.state.firstClick,
			dateData:selectData
		})
	}

	handleClear(){
		this.props.setDate([])
		let dateData = this.state.dateData.map(i=>{
				return {...i,select:false}
			})
		this.setState({
			dateData
		})
	}

	render() {
		return (
			<div className="shadow rounded">
				<header>
					<h3 className="text-center d-flex justify-content-between">
							<span onClick={this.state.dataIndicate>0?this.handlePrev.bind(this):null} className="pointer" style={{color:"#094074"}}>
									<i id="prev" className="fas fa-arrow-circle-left"></i>
							</span>
						&nbsp;{this.state.showYear} {monthName[this.state.showMonth]}&nbsp;
						<span onClick={this.handleNext.bind(this)}  className="pointer" style={{color:"#094074"}}>
							<i id="next" className="fas fa-arrow-circle-right"></i>
						</span>
					</h3>
				</header>
				<div className="col-12 d-flex justify-content-around">
					<div className="badge badge-info">SUN</div>
					<div className="badge badge-info">MON</div>
					<div className="badge badge-info">TUE</div>
					<div className="badge badge-info">WED</div>
					<div className="badge badge-info">THU</div>
					<div className="badge badge-info">FRI</div>
					<div className="badge badge-info">SAT</div>
				</div>
				<div className="col-12 d-flex flex-column">
					<div className="d-flex justify-content-around">{this.createElem(this.state.dataIndicate).filter((date,i)=>i<7)}</div>
					<div className="d-flex justify-content-around">{this.createElem(this.state.dataIndicate).filter((date,i)=>i>6&&i<14)}</div>
					<div className="d-flex justify-content-around">{this.createElem(this.state.dataIndicate).filter((date,i)=>i>13&&i<21)}</div>
					<div className="d-flex justify-content-around">{this.createElem(this.state.dataIndicate).filter((date,i)=>i>20&&i<28)}</div>
					<div className="d-flex justify-content-around">{this.createElem(this.state.dataIndicate).filter((date,i)=>i>27&&i<35)}</div>
					<div className="d-flex justify-content-around">{this.createElem(this.state.dataIndicate).filter((date,i)=>i>34&&i<42)}</div>
				</div>
				<div className="btn btn-warning" onClick={this.handleClear.bind(this)}>clear</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		date: state.date
	}
}

export default connect(mapStateToProps,{ setDate })(Calender);
// export default connect(mapStateToProps,{ setDate })(Calender);
// export default Calender