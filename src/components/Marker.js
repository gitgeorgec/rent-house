import React, {Component} from 'react';


export default class MyGreatPlaceWithHover extends Component {

  render() {
    const K_SIZE= 160
    const greatPlaceStyle = {
        // initially any map object has left top corner at lat lng coordinates
        // it's on you to set object origin to 0,0 coordinates
        position: 'absolute',
        width: K_SIZE,
        height: K_SIZE,
        left: -K_SIZE / 2,
        top: -K_SIZE,
        // left: "-50%",
        // top: "-50%",
      
        border: '5px solid #f44336',
        // borderRadius: K_SIZE,
        backgroundColor: 'white',
        textAlign: 'center',
        color: '#3f51b5',
        fontSize: 14,
        fontWeight: 'bold',
        padding: 2,
        cursor: 'pointer'
      };
      
    return (
      <div style={{position:"relative"}} onClick={this.props.handle}>
        
        <div className="pin1"></div>
        {this.props.$hover?
        <div style={greatPlaceStyle}>
          {this.props.name}
          <div>
            <img src={this.props.img} style={{width:"100%", height:"100%", maxHeight:"60px"}} alt=""/>
          </div>
        </div>
        :null}
      </div>
    );
  }
}