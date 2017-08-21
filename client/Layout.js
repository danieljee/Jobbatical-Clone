import React from 'react';
import Header from './components/layout/Header';
import AppRouter from './AppRouter';

class Layout extends React.Component{
	render(){
		return(
			<div>
				<Header/>
				<AppRouter/>
			</div>
		)
	}
}

export default Layout