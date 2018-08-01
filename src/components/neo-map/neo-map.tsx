import * as React from 'react';
import './neo-map.css';
import { NasaApiService } from '../../services';

export interface INeoMapState {
	neos: any[]
}

export class NeoMap extends React.Component <{}, INeoMapState> {

	private MAP_SIZE = {
		x: 400,
		y: 400,
	};
	private CENTER_COORDS = {
		x: Math.floor(this.MAP_SIZE.x / 2),
		y: Math.floor(this.MAP_SIZE.y / 2),
	};

	private START_DATE = '2018-07-10';
	private STOP_DATE = '2018-07-11';

	constructor(props: any) {
		super(props);
		this.state = {
			neos: []
		};
	}

	componentDidMount() {
		NasaApiService.getNeosData(this.START_DATE, this.STOP_DATE).then((data) => {
			this.setState({
				neos: data[this.START_DATE]
			});
		});
	}

	getNeosCoordinates = (neos: any[]) => {
		const data = [];
		for( let i = 0; i < neos.length; i++) {
			const radius = Math.floor((neos[i].estimated_diameter.meters.estimated_diameter_max + neos[i].estimated_diameter.meters.estimated_diameter_max) / 200);
			const rand = 100 + Math.floor(neos[i].close_approach_data[0].miss_distance.kilometers / 600000);
			const datai = {
				radius: radius + 10,
				xi: rand * Math.sin(2 * Math.PI * i / neos.length) + this.CENTER_COORDS.x,
				yi: rand * Math.cos(2 * Math.PI * i / neos.length) + this.CENTER_COORDS.y,
			};

			data.push(datai);
		}
		return data;
	};

	render() {
		const neoElements = this.getNeosCoordinates(this.state.neos).map((coordinates, index) => {
			return <circle className='neo-map__neo' cx={coordinates.xi} cy={coordinates.yi} r={coordinates.radius} fill='orange' key={index}/>;
		});

		return (
			<div className='neo-map'>
				<svg width={this.MAP_SIZE.x} height={this.MAP_SIZE.y} className='neo-map__content'>
					<circle className='neo-map__earth' cx={this.CENTER_COORDS.x} cy={this.CENTER_COORDS.y} r='40' fill='blue' />
					{neoElements}
				</svg>

			</div>
		)
	}
}
