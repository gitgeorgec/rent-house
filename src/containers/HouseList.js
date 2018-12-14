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
                  name={house.name} 
                  address={house.address}
                  geometry={house.geometry}
                  price={house.price} 
                  houseId={house._id}
                  owner={house.owner.username}
                  ownerImg={house.owner.image}
                  ownerId = {house.owner._id}
                  image={house.image}
                  unavailableDate= {house.unavailableDate}
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