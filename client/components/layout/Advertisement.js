import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchAdvertisements} from '../../actions';


class Advertisement extends Component {
	componentDidMount() {
		this.props.fetchAdvertisements(); 
	}

	render() {

		return (
			<div>Hello there!!</div>
			);
	}
}
// ES6 says that fetchAdvertisements : fetchAdvertisements can be written as below
export default connect(null, {fetchAdvertisements})(Advertisement);