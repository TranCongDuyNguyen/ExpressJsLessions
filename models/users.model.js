const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	name: String,
	phone: String,
	email: String,
	pw: String,
	avatar: String
});
//define model with its name, using schema and mapping collection
var User = mongoose.model('User', userSchema, 'users');

module.exports = User;