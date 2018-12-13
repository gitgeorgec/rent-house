import React, { Component } from 'react';
import HouseList from './HouseList'
import MainForm from '../components/Mainform'
import Calender from '../components/Calender';
import ShowHouse from '../components/ShowHouse'
// import GoogleMap from '../components/GoogleMap';
class Houses extends Component {
  constructor(){
    super()
    this.state={
      showFrom:false
    }
  }

  componentWillMount(){
    if(!this.props.houses.loading&&this.props.houses.data.length===0){
        this.props.getHouse("",{...this.props.search, date:[...this.props.date]})
    }
  }

  handleShowFrom=()=>{
    this.setState({
      showFrom:!this.state.showFrom
    })
  }

  render() {
    return (
      <React.Fragment>
        <ShowHouse {...this.props}/>
        <div className="container m-3 mx-auto">
        <h1>distination: {this.props.search.distination?this.props.search.distination:"ALL"}</h1>
        <button onClick={this.handleShowFrom}> click</button>
        <div className="row position-absolute mx-auto p-3" 
        style={{
          zIndex:"120", 
          background:"#fff",
          transition:"0.5s",
          opacity:this.state.showFrom?1:0, 
          transform:this.state.showFrom?"scale(1)":"scale(0)"}}>
          <div className="col-6">
            <MainForm />
          </div>
          <div className="col-6">
            <Calender />
          </div>
          {/* <div className="col-12">
            <GoogleMap />
          </div> */}
        </div>
          <h1 className="text-center">{!this.props.houses.loading&&this.props.houses.data.length === 0?"NOT FOUND":"Found Houses"}</h1>
          <hr/>
          <div className="row">
            <div className="card-columns" style={{minHeight:"80vh"}}>
              {this.props.houses.loading?<h3 className="text-center">loading</h3>:
              <HouseList houses={this.props.houses.data}/>
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    )}
  }
  
  export default Houses;