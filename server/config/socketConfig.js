const user = require('../crud')['user'];
const room = require('../crud')['room'];

//Admins only receive and send message via the messenger page.
//The popup feature is enabled to customers
//When they openthe popup chat, the socket connection is established
//Must verify if the customer is registered
//When they send messages, it goes to the admin
//Admin can view the list of customers who has sent him the message

/*
  Option 1:
    If the chat popup component did mount, initiate socket connection with admin
    create a new random unique room id and for both client and admin to join
    store in the database the new room.
    if the user disconnects, send message to admin to disconnect from the room.
    Delete the room from the database.
*/

module.exports = function (app){
  const io = app.io;
};
