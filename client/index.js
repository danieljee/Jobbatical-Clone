import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';
//import App from './App'

//Testing this out
import reducers from './reducers';
import Header from './components/layout/Header';
import Login from './components/layout/Login';
import Join from './components/layout/Join';
import Profile from './components/layout/Profile';
import Advertisement from './components/layout/Advertisement';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
 
ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div>
		   		<Header/>
				<Switch>
					<Route path='/login' component={Login}/>
					<Route path='/join' component={Join}/>
					<Route path='/profile' component={Profile}/>
					<Route path='/advertisement' component={Advertisement}/>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>
, document.getElementById('root'));
