const variables = function(req, res, next){
	//isAuthenticated only checks whether req.user is set or not
	if (req.isAuthenticated()){
		req.locals.user = req.user;
		req.locals.session = req.session;
	}
	next();
}

/*
	This middleware will be used to redirect unauthenticated users if they are trying to access services that are only allowed for authenticated users.
*/
const loggedIn = function(req, res, next){
	req.isAuthenticated()? next(): res.redirect('/');
}

/*
	This middleware will be used to redirect users if they are 'Logged in' but trying to access services for users that are not logged in. 
*/
const notLoggedIn = function(req, res, next){
	!req.isAuthenticated()? next(): res.redirect('/');
}

module.exports = {
	variables: variables,
	loggedIn: loggedIn,
	notLoggedIn: notLoggedIn
}