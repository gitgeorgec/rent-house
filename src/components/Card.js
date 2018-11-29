import React from 'react'

const Card=(props)=>{
    return (
        <div className="card">
            <div className="card-background" style={{backgroundImage:"url(" + props.img + ")"}}>
                <img className="card-img-top" src={props.img} style={{opacity:0}} alt="" ></img>
            </div>
            <div className="card-img-overlay">
                <p className="card-title text-center" style={{fontSize:"3rem", color:"#fff", fontWeight:"bolder",textShadow:"1px 1px 0 black"}}>{props.title}</p>
            </div>
        </div>
    )
}

export default Card