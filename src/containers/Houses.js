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
    this.props.getHouse("",{...this.props.search, date:[...this.props.date]})
    this.props.clearSelect()
    this.setState({
      showFrom:false
    })
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
        <h1 className="back_deepblue" style={{color:"#fff"}}>distination:  {this.props.search.distination?this.props.search.distination:"ALL"} , checkin: {this.props.search.begin?this.props.search.begin:"Not select"} ,checkout: {this.props.search.end?this.props.search.end:"Not select"}, adult: {this.props.search.adult?this.props.search.adult:1}, child: {this.props.search.child?this.props.search.child:0}</h1>
        <button onClick={this.handleShowFrom}>click</button>
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
          <h1 className="text-center">{!this.props.houses.loading&&this.props.houses.data.length === 0?"NOT FOUND":""}</h1>
          <hr/>
          <div className="row justify-content-center">
            {this.props.houses.loading?
            <div className="lds-facebook"><div></div><div></div><div></div></div>
            :<div className="card-columns" style={{minHeight:"80vh"}}>
              <HouseList houses={this.props.houses.data}/>
            </div>
            }
          </div>
          <hr/>
          next page
        </div>
      </React.Fragment>
    )}
  }
  
  export default Houses;