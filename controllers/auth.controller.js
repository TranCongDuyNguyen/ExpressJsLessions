const db = require("../db.js");



module.exports.index = (req, res) => {
	res.render("auth/login");	
}

module.exports.loginPost = (req, res) => {
	var errors = [];
	var email = req.body.email;
	var pw = req.body.pw;
	var user = db.get("users").find({email: email}).value();
	if(!user){
		errors.push("Email does not exist!");
		res.render("auth/login", {errors: errors, values: req.body});
		return;
	}
	var user = db.get("users").find({pw: pw}).value();
	if(!user){
		errors.push("Wrong password!");
		res.render("auth/login", {errors: errors, values: req.body});
		return;
	}
	res.cookie("sessionId", user.id, {signed: true});
	res.redirect("/user");
}