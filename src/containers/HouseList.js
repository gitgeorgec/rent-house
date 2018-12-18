import React, { Component } from 'react';
import HouseCard from '../components/HouseCard'

class HouseList extends Component {
    render() {
        const houseList = (houses)=>{
            let arr=[]
            if(houses){
              arr = houses.map((house,i)=>{
                return <HouseCard 
                  key={i}
                  house={house}
                  />
              })
            }
            return arr
          }
    
      return (
        houseList(this.props.houses)
      );
    }
  }

export default HouseList;