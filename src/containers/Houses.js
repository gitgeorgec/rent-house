import React, { Component } from 'react';
import HouseList from './HouseList'
import MainForm from '../components/Mainform'
import Calender from '../components/Calender';
import ShowHouse from '../components/ShowHouse'
// import GoogleMap from '../components/GoogleMap';
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker'
class Houses extends Component {
  // constructor(){
  //   super()
  //   this.state={
  //     showFrom:false
  //   }
  // }

  componentWillMount(){
    this.props.getHouse("",{...this.props.search, date:[...this.props.date]})
    this.props.clearSelect()
    // this.setState({
    //   showFrom:false
    // })
  }

  // handleShowFrom=()=>{
  //   this.setState({
  //     showFrom:!this.state.showFrom
  //   })
  // }

  render() {
    return (
      <div className="row m-0 position-relative" style={{top:"70px"}}>
        <div className="col-12 back_deepblue d-flex justify-content-between p-3 position-fixed" style={{color:"#fff", fontSize:"1rem", zIndex:100}}>
          <span>distination:  {this.props.search.distination?this.props.search.distination:"ALL"}</span>
          <div>
            <span>checkin: {this.props.search.begin?this.props.search.begin:"Not select"}</span> <br/>
            <span>checkout: {this.props.search.end?this.props.search.end:"Not select"}</span>
          </div>
          <div>
            <span>adult: {this.props.search.adult?this.props.search.adult:1}</span>	<br/>
            <span>child: {this.props.search.child?this.props.search.child:0}</span>
          </div>
        </div>
        <div className="row m-0 position-relative" style={{top:"90px"}}>
          <div 
          className="d-none d-md-block col-md-3 position-fixed"
          style={{
            zIndex:"120", 
            background:"#fff",
            transition:"0.5s",
            }}>
              <MainForm />
              <Calender />
          </div>
          <div className="d-none d-md-block col-md-3"></div>
          <div className="col-md-6">
            <div className="row justify-content-center">
              {this.props.houses.loading?
              <div className="lds-facebook">
                <div></div><div></div><div></div>
              </div>
              :<div className="card-columns" style={{minHeight:"80vh"}}>
                <HouseList houses={this.props.houses.data}/>
              </div>
              }
            </div>
            <hr/>
            next page
          </div>
          <div className="col-md-3 d-none d-md-block "></div>
          <div className="col-md-3 position-fixed d-none d-md-block " style={{right:0, height:"80vh"}}>
            <GoogleMapReact
              // bootstrapURLKeys={{ key:"AIzaSyAjQDTCdLCWo2JBZiosUYNEox7R92t_Ts4"}}
              defaultCenter={{
                  lat: 25.0171194,
                  lng: 121.4710123
              }}
              center={
                this.props.houses.data.length>0?
                this.props.houses.data[0].geometry
                :
                {lat: 25.0171194,lng: 121.4710123}
              }
              defaultZoom={10}>
                  {this.props.houses.data?this.props.houses.data.map(house=>{
                    return (
                      <Marker
                      key={house._id}
                      lat={house.geometry.lat}
                      lng={house.geometry.lng} 
                      text={""}
                      />
                      )
                    }):""}
            </GoogleMapReact>
          </div>
          <ShowHouse {...this.props}/>
        </div>
      </div>
    )}
  }
  
  export default Houses;