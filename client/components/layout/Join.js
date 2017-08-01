import React from 'react'
import style from '../../util/style'
import APIManager from '../../util/APIManager'

class Join extends React.Component{
	
	signUp(){
		//need client-side validation
		var params = { //would put this in the component state. Later in redux store.
			firstName: document.getElementById('firstName').value,
			lastName: document.getElementById('lastName').value,
			email: document.getElementById('email').value,
			password: document.getElementById('password').value
		}
		
		var errorMessages = document.getElementsByClassName('formErrorMessage');
		for(let i=0; i<errorMessages.length; i++){
			errorMessages[i].style.display = 'none';
		}
		
		APIManager.post('/join', params, function(err, result){
			if (err){
				if (!Array.isArray(err)){ //if the error is simply a message
					document.getElementById('signUpError').style.display = 'block';
					document.getElementById('signUpError').innerHTML = err;
					return
				}
				for(let i=0; i<err.length; i++){
					let errorMessage = document.getElementById(err[i].param + 'Error');
					errorMessage.style.display = 'block';
					errorMessage.innerHTML = err[i].msg
				}
				return
			}
			//Should I redirect at the server when registration is successful? 
			console.log("Sign up successful!");
		})
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
							<label htmlFor='firstName'>First Name</label>
							<div className='formErrorMessage' id='firstNameError'></div>
							<input style={style.join.fname} className='form-control' type='text' name='firstName' id='firstName'/>
						</div>
						<div className='col-md-6 col-sm-6 col-xs-12'>
							<label htmlFor='lastName'>Last Name</label>
							<div className='formErrorMessage' id='lastNameError'></div>
							<input style={style.join.lname} className='form-control' type='text' name='lastName' id='lastName'/>
						</div>
						<div className='col-md-12'>
							<label htmlFor='email'>Email</label>
							<div className='formErrorMessage' id='emailError'></div>
							<input className='form-control' type='text' name='email' id='email'/>
						</div>
						<div className='col-md-12'>
							<label htmlFor='password'>Password</label>
							<div className='formErrorMessage' id='passwordError'></div>
							<input className='form-control' type='password' name='password' id='password'/>
						</div>
					</div>
						<div className='formErrorMessage' id='signUpError'></div>
						<button className='btn btn-success' onClick={this.signUp.bind(this)}>Sign Up!</button>
				</div>
			</div>
		)
	}
}

export default Join