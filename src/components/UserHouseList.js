import React, { Component } from 'react'
import { apiCall } from "../service/api"

class HouseList extends Component{

    handleRemoveHouse = (e) =>{
        const URL = "http://localhost:8081/"
        apiCall("delete",`${URL}api/user/${this.props.currentUser.user.id}/house/${e.target.dataset.id}`)
        .then(res=>{
            if(res._id){
                let houseData = this.props.houses.filter(house=>house._id !== res._id)
                this.props.updateUserHouses(houseData)
            }
        })
    }

    render(){
        return this.props.houses.map(house=>{
            return (
            <div key={house._id} className="col-12">
                <div className="row m-1 pt-2 pb-2 border rounded">
                    <div className="col-sm-4 col-6">
                        <img className="card-img shadow" src={house.image} alt=""/>
                    </div>
                    <div className="col-sm-8 col-6">
                        <h4>{house.name}&nbsp;</h4>
                        Address: {house.address} <br/>
                        Price: ${house.price}
                        <div className="m-2 p-1">
                            <div className="btn btn-info" data-id={house._id} >SHOW MORE</div>
                            {/* <div className="btn btn-danger" data-id={house._id} onClick={this.handleRemoveHouse}>DELETE</div> */}
                        </div>
                    </div>
                </div>
            </div>)
        })
    }
}

export default HouseList