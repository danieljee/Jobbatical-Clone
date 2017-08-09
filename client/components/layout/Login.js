import React from 'react'
import style from '../../util/style'
import APIManager from '../../util/APIManager'

class Login extends React.Component{

	login(){
		var email = document.getElementById('loginEmail').value;
		var password = document.getElementById('loginPassword').value;
		var errors = document.getElementsByClassName('formErrorMessage');
		for(let i=0; i<errors.length; i++){
			errors[i].style.display = 'none';
		}
		/*
			Client-side validation here!
		*/
		APIManager.post('/login', {email:email, password:password}, function(err, result){
			if (err){
				//Server-side input validation function will return an array if there are invalid inputs.
				//So if it's not an array, it will be a simply string message indicating other errors.
				if (!Array.isArray(err)){
					document.getElementById('loginError').style.display = 'block';
					document.getElementById('loginError').innerHTML = err;
					return
				}
				for(let i=0; i<err.length; i++){
					let errorMessage = document.getElementById(err[i].param + 'Error');
					errorMessage.style.display = 'block';
					errorMessage.innerHTML = err[i].msg
				}
				return
			}

			//Should server redirect?
			console.log('login successful!');
		});
	}

	render(){
		return(
			<div className='container'>
				<div style={style.login} id='loginDiv'>
						<a href='/oAuth/facebook'>Login with Facebook</a>
						<a href='/oAuth/google'>Login with Google</a>

						<label htmlFor='loginEmail'>Email</label>
						<div className='formErrorMessage' id='emailError'></div>
						<input type='text' className='form-control' name='email' id='loginEmail'/>
						<label htmlFor='loginPassword'>Password</label>
						<div className='formErrorMessage' id='passwordError'></div>
						<input type='password' className='form-control' name='password' id='loginPassword'/>
						<div className='formErrorMessage' id='loginError'></div>
						<button onClick={this.login.bind(this)} className='btn btn-success'>Login!</button>

				</div>
			</div>
		)
	}
}
export default Login
