import React from 'react';
import Jumbo from './Jumbotron'
import Card from '../components/Card'
import NewYorkImg from "../img/tuan-nguyen-1176823-unsplash.jpg"
import LondonImg from "../img/luca-micheli-422053-unsplash.jpg"
import TaipeiImg from "../img/remi-yuan-569408-unsplash.jpg"

const Index = () => {
	const NewYorkGeo = {lat:40.697403,lng:-74.1201069}
	const LondonGeo = {lat:51.5285578,lng:-0.2420232}
	const TaipeiGeo = {lat:25.0171605,lng:121.3659506}
    return (
			<React.Fragment>
				<Jumbo />
				<br />
				<div className="container mx-auto position-relative shadow">
					<h1 className="mt-3 m-3 p-2">Top City</h1>
					<hr/>
					<div className="card-deck p-2">
						<Card img={NewYorkImg} title="New York" geometry={NewYorkGeo}/>
						<Card img={LondonImg} title="London" geometry={LondonGeo}/>
						<Card img={TaipeiImg} title="Taipei" geometry={TaipeiGeo}/>
					</div>
				</div>
				<br />				
				<br />
			</React.Fragment>
    );
}

export default Index;