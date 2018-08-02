import axios from 'axios';

export class NasaApiService {
	static getNeosData = (startDate: string, stopDate: string) => {
		return axios.get(`https://still-sands-71245.herokuapp.com/nasa/neos/${startDate}/${stopDate}`).then((data) => {
			return data.data.near_earth_objects;
		}).catch((error) => {
			console.log('ERROR: ', error);
		});
	};
}