import React from 'react'
import style from '../../util/style'
class Join extends React.Component{
	
	signUp(){
		
	}
	
	render(){
		//Add a responsive slider that changes the form depending on the user type.
		return(
			<div className='container'>
				<div style={style.join}>
					<div className='row'>
						<div id='col-md-12'>
							<button className='btn btn-default'>Sign up with Facebook</button>
							<button className='btn btn-default'>Sign up with Google</button>
						</div>
						<div className='col-md-6 col-sm-6 col-xs-12'>
							<label for='firstName'>First Name</label>
							<input style={style.join.fname} className='form-control' type='text' id='firstName'/>
						</div>
						<div className='col-md-6 col-sm-6 col-xs-12'>
							<label for='lastName'>Last Name</label>
							<input style={style.join.lname} className='form-control' type='text' id='lastName'/>
						</div>
						<div className='col-md-12'>
							<input className='form-control' type='text' id='email'/>
						</div>
						<div className='col-md-12'>
							<input className='form-control' type='password' id='password'/>
						</div>
					</div>
						
						<button className='btn btn-success' onClick={this.signUp.bind(this)}>Sign Up!</button>
				</div>
			</div>
		)
	}
}

export default Join