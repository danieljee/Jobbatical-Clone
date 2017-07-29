import React from 'react'
import {Link} from 'react-router-dom'

class Header extends React.Component{
	render(){
		return(
			<div>
				<nav className="navbar navbar-toggleable-md navbar-light">
					<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
						<Link className="navbar-brand" to="/">Jobbatical Clone</Link>
						<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
							<li className="nav-item">
								<Link className="nav-link" to="/explore">EXPLORE JOBS</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/saved">MY SAVED JOBS</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/applications">MY APPLICATIONS</Link>
							</li>
						</ul>
					</div>
					<div id="userNav">
						<ul className="navbar-nav ml-auto mt-2 ml-lg-0">
							<li className="nav-item">
								<Link className="nav-link" to="/login">LOGIN</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/join">JOIN</Link>
							</li>
						</ul>
					</div>
					
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
				</nav>
			</div>
		)
	}
}
export default Header