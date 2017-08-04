import React from 'react'
import APIManager from '../../util/APIManager'

class Profile extends React.Component{
	constructor(){
		super()
		
		this.state = {
			currentUser: {}
		}
		this.setCurrentUser.bind(this);
	}
	
	componentDidMount(){
		APIManager.get('/api/currentUser', {}, function(err, result){
			err ? console.log(err): this.setCurrentUser(result);
		});
	}
	
	setCurrentUser(user){
		console.log(user);
		this.setState({
			currentUser: user
		});
	}
	
	render(){
		return(
			<div>
				<p>profile</p>
				{this.state.currentUser.email}
			</div>
		)
	}
}

export default Profile;