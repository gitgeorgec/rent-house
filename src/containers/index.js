import React from 'react';
import Jumbo from './Jumbotron'
import Card from '../components/Card'
import NewYorkImg from "../img/tuan-nguyen-1176823-unsplash.jpg"
import LondonImg from "../img/luca-micheli-422053-unsplash.jpg"
import TaipeiImg from "../img/remi-yuan-569408-unsplash.jpg"

const Index = () => {
    return (
			<React.Fragment>
				<Jumbo />
				<br />
				<div className="container mx-auto position-relative shadow">
					<h1 className="mt-3 m-3 p-2">Top City</h1>
					<hr/>
					<div className="card-deck p-2">
						<Card img={NewYorkImg} title="New York"/>
						<Card img={LondonImg} title="London"/>
						<Card img={TaipeiImg} title="Taipei"/>
					</div>
				</div>
				<br />				
				<br />
			</React.Fragment>
    );
}

export default Index;