import React, { Component } from 'react';
// import {NavLink} from 'react-router-dom';

class PostList extends Component {
    render() {
      return (
        <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
          <ul className="list-group" id="messages">
          </ul>
        </div>
      </div>
      );
    }
  }
  
  export default PostList;