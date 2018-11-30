import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'

const AnyReactComponent = ({ text }) => <div className="border">{text}</div>;

class GoogleMap extends Component {
	static defaultProps = {
		center: {
			lat: 25.0171194,
			lng: 121.4710123
		},
		zoom: 13
	};
  constructor(){
    super()
    this.state={
      center:{
				lat:24.1333828,
				lng:120.6611994
			}
    }
	}
	
	onClick = ({x, y, lat, lng, event}) => {
		console.log(x, y, lat, lng, event)
		this.setState({
			center:{lat,lng}
		})
	}


  onChildMouseEnter(){

	}

	onChildMouseLeave(){

	}

  render() {
		// const facilityPins = this.props.facilities.map((facility, i)=>{
		// 	if(facility.latitude === null || facility.longitude === null){
		// 		return null
		// 	} else {
		// 		return <facilityPin onClick={()=>this.setPinAsCenter(facility)} key={i} onChildMouseEnter={this.onChildMouseEnter} onChildMouseLeave={this.onChildMouseLeave} facility={facility} hover={this.state.hover} lat={facility.latitude} lng={facility.longitude} />
		// 	}
		// })


    return (
      <div style={{ height: "50vh", width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyAjQDTCdLCWo2JBZiosUYNEox7R92t_Ts4"}}
          defaultCenter={{
						lat: 25.0171194,
						lng: 121.4710123
					}}
          defaultZoom={15}
          // center={this.state.center}
					onChildMouseEnter={this.onChildMouseEnter}
					onChildMouseLeave={this.onChildMouseLeave}
					onClick={this.onClick}
        >

          <AnyReactComponent
						lat={24.1233828}
						lng={120.3611994}
						text={'Hello World'}
          />
					<Marker
					lat={this.state.center.lat}
					lng={this.state.center.lng} 
					text={"1"}
					/>
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;