import axios from 'axios';

export const FETCH_ADVERTISEMENTS = 'fetch_advertisements';

//need to look into what root url would be
const ROOT_URL = '/api';

export function fetchAdvertisements() {
	const request = axios.get(`${ROOT_URL}/advertisement`);
	return {
		type: FETCH_ADVERTISEMENTS,
		payload:request
	};
}