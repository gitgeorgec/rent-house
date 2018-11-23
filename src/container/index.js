import React, { Component } from 'react';
import Jumbo from '../component/jumbotron'
import Header from './header'

class Index extends Component {

  render() {
    return (
      <div className="position-relative">
        <Header/>
					<ul className="slideshow">
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				<Jumbo />
      </div>
    );
  }
}

export default Index;