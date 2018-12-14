import React, { Component } from 'react';


class Datebox extends Component{

    handleClick=()=>{
        //dispatch select date
        if(this.props.selected){
            this.props.setDate(this.props.date.filter(i=>i!==this.props.time))
        }else{
            this.props.setDate([...this.props.date, this.props.time])
        }
    }
    // handleClick=()=>{
	// 	let selectData
	// 	if(this.props.firstClick){
	// 		this.props.setDate([this.props.time])
	// 	}else{
    //         if(this.props.time>this.props.date[0]){
    //             let beginDay = this.props.date[0]
    //             selectData = [beginDay]
	// 			while(beginDay<this.props.time){
    //                 console.log(this.props)
    //                 beginDay+=86400000
    //                 selectData.push(beginDay)
    //             }
    //             this.props.setDate(selectData)
	// 		}else if(this.props.time<this.props.date[0]){
    //             let beginDay = this.props.time
    //             selectData = [beginDay]
    //             while(beginDay<this.props.date[0]){
    //                 beginDay+=86400000
    //                 selectData.push(beginDay)
    //             }
    //             this.props.setDate(selectData)
	// 		}else{
				
	// 		}
	// 	}
	// }

    render(){
        if(this.props.unavailableDate){
            return(
                <div 
                    className="text-center pointer" 
                    style={{
                        width:"70px",
                        color:"white", 
                        background:"#094074", 
                        border:this.props.date.indexOf(parseInt(this.props.time))>-1?"1px soild black":"",
                        transition:"0.2s"}}  
                    data-time={this.props.time}
                    >
                        {this.props.monthDate}
                </div>
            )
        }else{
            return(
            <div 
                className="text-center pointer" 
                style={{
                    width:"70px",
                    color:this.props.selected?"white":"black", 
                    background:this.props.selected?"#FE9000":"", 
                    border:this.props.date.indexOf(parseInt(this.props.time))>-1?"1px soild black":"",
                    transition:"0.2s"}}  
                data-time={this.props.time}
                onClick={this.handleClick}
                >
                    {this.props.monthDate}
            </div>
            )
        }
    }
}

export default Datebox