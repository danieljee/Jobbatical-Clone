import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './components/layout/Login'
import Join from './components/layout/Join'
class AppRouter extends React.Component{
	render(){
		return(
			<Switch>
				<Route path='/login' component={Login}/>
				<Route path='/join' component={Join}/>
			</Switch>
		)
	}
}

export default AppRouter