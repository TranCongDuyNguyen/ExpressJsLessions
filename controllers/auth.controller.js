
const User = require("../models/users.model");

module.exports.index = (req, res) => {
	res.render("auth/login");	
}

module.exports.loginPost = async function(req, res){
	var errors = [];
	var email = req.body.email;
	var pw = req.body.pw;

	var user = User.findOne({email: email});
	if(!user){
		errors.push("Email does not exist!");
		res.render("auth/login", {errors: errors, values: req.body});
		return;
	}

	var user = User.findOne({pw: pw});
	if(!user){
		errors.push("Wrong password!");
		res.render("auth/login", {errors: errors, values: req.body});
		return;
	}
	res.cookie("sessionId", user.id, {signed: true}); //server creates cookie for session, cookie value is user.id
	res.redirect("/user");
}