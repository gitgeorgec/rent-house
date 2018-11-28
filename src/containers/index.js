import React, { Component } from 'react';
import Jumbo from '../components/jumbotron'

class Index extends Component {

  render() {
    return (
      <div className="position-relative">
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