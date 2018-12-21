import React ,{ Component } from 'react'


class CommentCard extends Component{

    render(){
        const { comment } = this.props
        return(
            <div className="m-2" style={{display:"flex",justifyContent:"space-around"}}>
                <div>
                    <img className="rounded-circle m-2" style={{width:"75px", height:"75px",background:'#fff'}} src={comment.user.profileImageUrl} alt=""/>
                </div>
                <div className="m-2" style={{fontSize:"1rem", display:"flex",width:"80%", justifyContent:"space-between", alignItems:"center"}}>
                    <p>{comment.text}</p>
                    <p>rate: {comment.rank}</p>
                </div>
            </div>
        )
    }
}

export default CommentCard