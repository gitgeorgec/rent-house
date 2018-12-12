import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'

// const AnyReactComponent = ({ text }) => <div className="border">{text}</div>;
// const google = window.google;

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
				lat:25.0415527,
				lng:121.536762
			},
			zoom:15
    }
	}
	
	// componentDidMount(){
	// 	this.initMap()
	// }

	// initMap() {
	// 	let map =new google.maps.Map(document.getElementById('map'), {
	// 		center: this.state.center,
	// 		zoom: 15
	// 	});
	// 	let marker = new google.maps.Marker({
	// 		position: this.state.center,
	// 		map,
	// 	});
		
	// 	let infowindow = new google.maps.InfoWindow({
	// 		content: "secretMessage"
	// 	});
		
	// 	let state = this.state
	// 	let setState = this.setState.bind(this)

	// 	map.addListener('click',function(e){
	// 		console.log(e.latLng.lat())
	// 		console.log(e.latLng.lng())
	// 		setState({
	// 			center:{
	// 				lat:e.latLng.lat(),
	// 				lng:e.latLng.lng()
	// 			}
	// 		})
	// 	}.bind(this))
		
	// 	marker.addListener("click",function(){
	// 		infowindow.open(marker.get('map'), marker);
	// 		// map.setZoom(20);
	// 		marker.position(state.center);
	// 		console.log(marker.getPosition())
	// 	})
	// }

	onClick = ({x, y, lat, lng, event}) => {
		console.log(x, y, lat, lng, event)
		this.setState({
			center:{lat,lng},
		})
	}

  // onChildMouseEnter(){
	// 	this.setState({
	// 		zoom:15
	// 	})
	// }

	// onChildMouseLeave(){
	// 	this.setState({
	// 		zoom:10
	// 	})
	// }

  render() {
		// const facilityPins = this.props.facilities.map((facility, i)=>{
		// 	if(facility.latitude === null || facility.longitude === null){
		// 		return null
		// 	} else {
		// 		return <facilityPin onClick={()=>this.setPinAsCenter(facility)} key={i} onChildMouseEnter={this.onChildMouseEnter} onChildMouseLeave={this.onChildMouseLeave} facility={facility} hover={this.state.hover} lat={facility.latitude} lng={facility.longitude} />
		// 	}
		// })


    return (
      <div style={{ height: "50vh", width: '100%' }} id="map">
        <GoogleMapReact
          // bootstrapURLKeys={{ key:"AIzaSyAjQDTCdLCWo2JBZiosUYNEox7R92t_Ts4"}}
          defaultCenter={this.state.center}
					defaultZoom={this.state.zoom}
					zoom={this.state.zoom}
          center={this.state.center}
					onChildMouseEnter={this.onChildMouseEnter}
					onChildMouseLeave={this.onChildMouseLeave}
					onClick={this.onClick}
        >

          {/* <AnyReactComponent
						lat={24.1233828}
						lng={120.3611994}
						text={'Hello World'}
          /> */}
					<Marker
					lat={this.state.center.lat}
					lng={this.state.center.lng} 
					text={""}
					/>
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;