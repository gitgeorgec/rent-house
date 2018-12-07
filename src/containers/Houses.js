import React, { Component } from 'react';
import HouseCard from '../components/HouseCard'
import MainForm from '../components/Mainform'
class Houses extends Component {
    constructor(props){
      super(props)
      this.state = {
        loading:true,
        houses:[],
        search:{}
      }
    }

    
    componentDidMount(){
      this.props.getHouse("",{...this.props.search, date:[...this.props.date]})
      .then(()=>{
        if(this.props.houses){
          this.setState({
            loading:false,
            houses:[...this.props.houses],
            search: this.props.search
          })
        }
      })
    }

    static getDerivedStateFromProps(nextProps, prevState){
      if(JSON.stringify(prevState.search)===JSON.stringify(nextProps.search)){
        console.log("equal")
      }else{
        console.log("not equal")
      }
      return null
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
        <h1>distination: {this.props.search.distination}</h1> 
          <MainForm {...this.props}/>
          <h1 className="text-center">Found Houses</h1>
          <hr/>
          <div className="row">
            <div className="card-columns">
              {JSON.stringify(this.state.search)===JSON.stringify(this.props.search)?<div>not same</div>:<div>same</div> }
              {this.state.loading?<h3 className="text-center">loading</h3>:houseList(this.state.houses)}
              {!this.state.loading&&this.state.houses.length === 0?<div className="text-center">not found</div>:""}
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Houses;