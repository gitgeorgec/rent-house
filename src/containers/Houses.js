import React, { Component } from 'react';
import HouseList from './HouseList'
import MainForm from '../components/Mainform'
import Calender from '../components/Calender';
import ShowHouse from '../components/ShowHouse'
// import GoogleMap from '../components/GoogleMap';
class Houses extends Component {
    
    componentDidMount(){
      this.props.getHouse("",{...this.props.search, date:[...this.props.date]})
    }

    render() {
      return (
        <div className="container m-3 mx-auto">
        <h1>distination: {this.props.search.distination}</h1> 
        <div className="row">
          <div className="col-6">
            <MainForm />
          </div>
          <div className="col-6">
            {/* <GoogleMap /> */}
          </div>
          <div className="col-12">
            <Calender />
          </div>
        </div>
        <ShowHouse {...this.props}/>
          <h1 className="text-center">{!this.props.houses.loading&&this.props.houses.data.length === 0?"NOT FOUND":"Found Houses"}</h1>
          <hr/>
          <div className="row">
            <div className="card-columns">
              {this.props.houses.loading?<h3 className="text-center">loading</h3>:
              <HouseList houses={this.props.houses.data}/>
              }
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Houses;