import React from 'react'

const Card=(props)=>{
    return (
        <div className="card border shadow">
            <div className="card-background" style={{backgroundImage:"url(" + props.image + ")"}}>
                <img className="card-img-top" src={props.image}  style={{opacity:0}} alt=""/>
            </div>
            <div className="card-body">
            <h4 className="card-title text-center" style={{fontWeight:"bolder"}}>{props.name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Address: {props.address}</li>
                <li className="list-group-item">Price: {props.price}</li>
                <li className="list-group-item">Owner: {props.owner}</li>
            </ul>
            </div>
            <div className="card-footer">
            <small className="text-muted">rank: {props.rank}</small>
            </div>
        </div>
    )
}

export default Card