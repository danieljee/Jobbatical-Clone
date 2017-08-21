import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './components/layout/Login';
import Join from './components/layout/Join';
import Profile from './components/layout/Profile';
import Advertisement from './components/layout/Advertisement';

class AppRouter extends React.Component{
	render(){
		return(
			<Switch>
				<Route path='/login' component={Login}/>
				<Route path='/join' component={Join}/>
				<Route path='/profile' component={Profile}/>
				<Route path="/advertisement" component={Advertisement}/>
			</Switch>
		)
	}
}

export default AppRouter;