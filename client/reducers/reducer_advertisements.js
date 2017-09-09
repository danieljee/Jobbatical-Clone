import _ from 'lodash';
import {FETCH_ADVERTISEMENTS} from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_ADVERTISEMENTS:
			return _.mapKeys(action.payload.data, 'id');
		default:
			return state;
	}
}