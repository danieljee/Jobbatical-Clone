import {combineReducers} from 'redux';
import AdvertisementsReducer from './reducer_advertisements';

const rootReducer = combineReducers({
	advertisements: AdvertisementsReducer
});

export default rootReducer;