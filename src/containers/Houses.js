import React, { Component } from 'react';
import HouseCard from '../components/HouseCard'

class PostList extends Component {
    constructor(props){
      super(props)
      this.state = {
        loading:true,
        houses:[]
      }
    }

    componentWillMount(){
      this.props.getHouse()
      .then(()=>{
        console.log(this.props.date)
        if(this.props.houses){
          this.setState({
            loading:false,
            houses:[...this.props.houses]
        })
      }
      })
    }

    render() {
      const houseList = (houses)=>{
        let arr=[]
        arr = houses.map((house,i)=>{
          return <HouseCard 
            key={i}
            name={house.name} 
            address={house.address} 
            price={house.price} 
            owner={house.owner.username}
            ownerImg={house.owner.image}
            image={house.image}/>
        })
        return arr
      }
      return (
        <div className="container m-3 mx-auto">
        <h1>All Houses</h1>
        <div className="row">
          <div className="card-columns">
            {this.state.loading?"loading":houseList(this.state.houses)}
          </div>
        </div>
      </div>
      );
    }
  }
  
  export default PostList;