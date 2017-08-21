const variables = function(req, res, next){
	//isAuthenticated only checks whether req.user is set or not
	if (req.isAuthenticated()){
		req.locals.user = req.user;
		req.locals.session = req.session;
	}
	next();
};

/*
	This middleware will be used to redirect unauthenticated users if they are trying to access services that are only allowed for authenticated users.
*/
const loggedIn = function(req, res, next){
	req.isAuthenticated()? next(): res.redirect('/login');
};

/*
	This middleware will be used to redirect users if they are 'Logged in' but trying to access services for users that are not logged in.
*/
const notLoggedIn = function(req, res, next){
	console.log('notloggedin');
	!req.isAuthenticated()? next(): res.redirect('/');
};

const isAdmin = function(req, res, next){
	(!req.isAuthenticated() || req.user.role	!= 'Admin') ? res.redirect('/') : next();
};

module.exports = {
	variables: variables,
	loggedIn: loggedIn,
	notLoggedIn: notLoggedIn,
	isAdmin: isAdmin
};
