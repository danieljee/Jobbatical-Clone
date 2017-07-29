var UserController = require('./UserController');
var ApplicationController = require('./ApplicationController');
var MessageController = require('./MessageController');
var AdvertisementController = require('./AdvertisementController');
module.exports = {
	User: UserController,
	Application: ApplicationController,
	Message: MessageController,
	Advertisement: AdvertisementController
}