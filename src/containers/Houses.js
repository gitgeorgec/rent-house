import React, { Component } from 'react';
import HouseCard from '../components/HouseCard'
import firstImg from "../img/daniil-silantev-574966-unsplash.jpg"
import secondImg from "../img/douglas-sheppard-522206-unsplash.jpg"
import thirdImg from "../img/dan-gold-220226-unsplash.jpg"
// import {NavLink} from 'react-router-dom';

class PostList extends Component {
    render() {
      const houseList = ()=>{
        let arr =[]
        for(let i = 0; i<17; i++){
            if(i%4===0){
              arr.push(<HouseCard key={i} name="house" address="taipei" price="100" owner="Jack" image={firstImg}/>)
            }else if(i%3===0){
              arr.push(<HouseCard key={i} name="house" address="taipei" price="100" owner="Jack" image={secondImg}/>)
            }else{ 
              arr.push(<HouseCard key={i} name="house" address="taipei" price="100" owner="Jack" image={thirdImg}/>)
            }
          }
        return arr
      }
      return (
        <div className="container m-3 mx-auto">
        <div className="row">
          <div className="card-columns">
            {houseList()}
          </div>
        </div>
      </div>
      );
    }
  }
  
  export default PostList;